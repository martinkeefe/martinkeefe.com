import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware, compose, Reducer, ReducersMapObject } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'

import { NavLink, Redirect } from 'react-router-dom'
import { renderRoutes, RouteConfig } from 'react-router-config'

import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import { StyleSheet, css } from 'aphrodite-jss'
import StickySidebar from 'sticky-sidebar'

//------------------------------------------------------------------------------

export class App {
    el: Element
    routes: RouteConfig[] = []
    menu: NavItem[] = []
    reducers: ReducersMapObject = {}
    page = null

    constructor(elem_id: string = 'root') {
        this.el = ((document.getElementById(elem_id) || document.body as any) as Element)
    }

    use(imp: {default: (app: App) => void}) {
        imp.default(this)
    }

    add_nav(nav: NavItem) {
        this.menu.push(nav)
    }

    add_route(path: string, component: React.ComponentType<Object>, exact: boolean = false) {
        this.routes.push({ path, component, exact })
    }

    add_reducer<S>(key: string, reducer: Reducer<S>) {
        this.reducers[key] = reducer
    }

    add_reducers(key: string, reducers: ReducersMapObject) {
        this.reducers[key] = combineReducers(reducers)
    }

    // https://github.com/ReactTraining/react-router/issues/5138
    redirect(path1: string, path2: string) {
        this.add_route(path1, () => <Redirect to={path2} />)
    }

    start() {
        // Create a history of your choosing (we're using a browser history in this case)
        const history = createHistory()

        // Build the middleware for intercepting and dispatching navigation actions
        const middleware = routerMiddleware(history)

        // Add the reducer to your store on the `router` key
        // Also apply our middleware for navigating
        const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose
        const store = createStore(
            combineReducers({
                ...this.reducers,
                router: routerReducer
            }),
            /* preloadedState, */
            composeEnhancers(
                applyMiddleware(middleware)
            )
        )

        ReactDOM.render(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    {renderRoutes(this.routes)}
                </ConnectedRouter>
            </Provider>,
            this.el
        )
    }

    // Horrible hack!!
    update_sticky() {
        if (this.page && this.page.sticky) {
            this.page.sticky.updateSticky()
        }
    }
}

const app = new App()

export default app

//------------------------------------------------------------------------------

function set_title(title) {
    var el = document.getElementsByTagName('title')[0]
    el.innerHTML = title
}


interface NavItem {
    href: string,
    text: string,
    ident: string,
    sub?: NavItem[]
}
interface  NavProps {
    items: NavItem[],
    ident: string,
}

class SideNav extends React.Component<NavProps> {

    render(def = this.props.items) {
        const items = def.map(item => {
            if (item.sub && item.ident === this.props.ident) {
                return <li key={item.ident}>{item.text}{this.render(item.sub)}</li>
            }
            if (item.ident === this.props.ident) {
                return <li key={item.ident}>{item.text}</li>
            }
            return <li key={item.ident}><NavLink to={item.href}>{item.text}</NavLink></li>
        })

        return <ul>{items}</ul>
    }
}

//------------------------------------------------------------------------------

const styles = StyleSheet.create({
    side: {
        '& img': {
            visibility: 'hidden',
            //width: '180px',
            height: 0,
            //margin: 0,
            '@media (min-width: 43em)': {
                visibility: 'visible !important',
                width: '180px !important',
                height: '180px !important',                        
            }
        },
        '& span': {
            //visibility: 'visible',
            '@media (min-width: 43em)': {
                visibility: 'hidden',                
            }
        },
        '& h2, h3, h4': {
            margin: '18px 0',
        },
        '& ul': {
            listStyleType: 'none',
            paddingLeft: '11px',
            margin: 0,
            '@media (min-width: 43em)': {
                margin: '1em 0 0 0 !important',
            },
            '& li': {
                marginTop: '0.25em',
                marginBottom: '0.25em',
                lineHeight: '1.25em',
                marginLeft: '6px',
                textIndent: '-9px',
                fontSize: '16px',
                '&:before': {
                    content: '"»"',
                    display: 'inline-block',
                    width: '9px',
                    fontSize: '20px',
                },
            },
            '& ul': {

                '@media (min-width: 43em)': {
                    margin: 0,
                }
            }
        },
        '& ol': {
            paddingLeft: '1em',
            margin: '1em 0 0 0',
            '& li': {
                marginBottom: '0.5em',
                lineHeight: '1.25em',
                fontSize: '16px',
            },                                                        
        },  
        '@media (min-width: 43em)': {
            //visibility: 'visible',
            width: '180px',
            marginRight: '54px',              
        },        
    },
    body: {
        flex: 1,

    },
    update: {
        color: 'rgb(98,95,111)', /* 10PB 4/2 */
        marginTop: '1em',
        //fontSize: '80%',
        paddingTop: '0.25em',
        borderTop: 'rgb(98,95,111) 1px solid',
        '& span': {
            fontStyle: 'italic',            
        }    
    },
})

export interface PageProps {
    title: string,
    ident?: string,
    children: JSX.Element[] | JSX.Element,
    side?: JSX.Element[] | JSX.Element,
    date: string,
}

export class NormalPage extends React.Component<PageProps> {
    sticky = null

    constructor(props: PageProps) {
        super(props)
        app.page = this // Horrible hack!!
    }

    render() {
        set_title(this.props.title)

        return (
            <React.Fragment>
                <nav id="sidebar" className={css(styles.side)}>
                    <NavLink to="/"><span>Home</span><img src={require('img/martian.png')} /></NavLink>
                    <SideNav items={app.menu} ident={this.props.ident} />
                    {this.props.side}
                </nav>
                <div className={css(styles.body)}>
                    {this.props.children}
                    <div className={css(styles.update)}>Last update: {this.props.date}</div>
                </div>
            </React.Fragment>
        )
    }

    // Stickyness
    componentDidMount() {
        //console.log('NormalPage','componentDidMount')
        this.update()
    }

    componentDidUpdate() {
        //console.log('NormalPage','componentDidUpdate')
        this.update()
    }

    update() {
        if (!this.sticky) {
            this.sticky = new StickySidebar('#sidebar', {
                containerSelector: '#root',
                innerWrapperSelector: '.sidebar__inner',
                topSpacing: 20,
                bottomSpacing: 20,
                minWidth: 700,
            })
            //console.log('new StickySidebar')
        }
        else {
            this.sticky.updateSticky()
            //console.log('updateSticky')
        }
    }

    componentWillUnmount() {
        if (this.sticky) {
            this.sticky.destroy()
            this.sticky = null
        }
    }
}
