import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware, compose, Reducer, ReducersMapObject } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'

import { NavLink, Redirect } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import StickySidebar from 'sticky-sidebar'

//------------------------------------------------------------------------------

export class App {
    el: Element
    routes = []
    menu = []
    reducers = {}
    page = null

    constructor(elem_id: string = 'root') {
        this.el = ((document.getElementById(elem_id) || document.body as any) as Element)
    }

    use(imp: {default: (app: App) => void}) {
        imp.default(this)
    }

    add_nav(nav: Object) {
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
    sub?: Array<NavItem>
}
interface  NavProps {
    items: Array<NavItem>,
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
                <nav id="sidebar" className="side">
                    <NavLink to="/"><span>Home</span><img src={require('img/martian.png')} /></NavLink>
                    <SideNav items={app.menu} ident={this.props.ident} />
                    {this.props.side}
                </nav>
                <div className="body">
                    {this.props.children}
                    <div className="update">Last update: {this.props.date}</div>
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
