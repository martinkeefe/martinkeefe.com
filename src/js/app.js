import React, {Fragment, Component} from 'react'
import ReactDOM from 'react-dom'
import page from 'page'
import StickySidebar from './lib/sticky-sidebar'


const app = new (class App {
	constructor(elem_id='app') {
		this.el =  document.getElementById(elem_id)
		this.menu = []
	}

	use(imp) {
		imp.default(this)
	}

	render(dom) {
		//console.log(dom)
		ReactDOM.render(dom, this.el)
	}

	set_title(title) {
		var el = document.getElementsByTagName('title')[0]
		el.innerHTML = title
	}

	// Routing
	add_route(path, ...funcs) {
		page(path, ...funcs)
	}

	show(path) {
		page.show(path)
	}

	redirect(path1,path2) {
		page.redirect(path1,path2)
	}

	start() {
		page()
	}

	add_page(path, klass, props={}) {
		this.add_route(path, context => {
			const page = new klass(this, context, props)
			app.render(page.render())
		})
	}
})()

export default app


function Link(props) {
	if (props.here.props.context.pathname === props.to) {
		return props.children
	}
	else {
		return <a href={props.to}>{props.children}</a>
	}
}


class SideNav extends Component {
	render(def=this.props.items) {
		const items = def.map(item => {
			if (item.sub && item.ident === this.props.ident) {
				return <li key={item.ident}>{item.text}{this.render(item.sub)}</li>
			}
			if (item.ident === this.props.ident) {
				return <li key={item.ident}>{item.text}</li>
			}
			return <li key={item.ident}><Link here={this.props.here} to={item.href}>{item.text}</Link></li>
		})

		return <ul>{items}</ul>
	}
}


export class NormalPage extends Component {
	constructor(props) {
		super(props)
		this.sticky = null
	}

	main() {
		return null
	}

	side() {
		return null
	}

	render() {
		this.props.app.set_title(this.props.title)

	    return (
	        <Fragment>
	            <nav id="sidebar" className="side">
	            	<div className="sidebar__inner">
		            	<Link here={this} to="/"><img src={require('../img/martian.png')}/></Link>
		            	<SideNav here={this} items={this.props.app.menu} ident={this.props.ident}/>
		            	{this.side()}
		            </div>
	            </nav>
	            <div className="body">
	            	{this.main()}
	            	<div className="update">Last update: {this.props.date}</div>
	            </div>
	        </Fragment>
	    )
	}

	update() {
		if (!this.sticky) {
			this.sticky = new StickySidebar('#sidebar', {
			        containerSelector: '#app',
			        innerWrapperSelector: '.sidebar__inner',
			        topSpacing: 20,
			        bottomSpacing: 20
			    });
			//console.log('new StickySidebar')
		}
		else {
			this.sticky.updateSticky()
			//console.log('updateSticky')
		}
	}

	componentDidMount() {
		this.update()
	}

	componentDidUpdate() {
		this.update()
	}

	componentWillUnmount() {
		if (this.sticky) {
			this.sticky.destroy()
			this.sticky = null
		}
	}
}
