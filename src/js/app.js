import React, {Fragment, Component} from 'react'
import ReactDOM from 'react-dom'
import page from 'page'


const app = new (class App {
	constructor(elem_id='app') {
		this.el =  document.getElementById(elem_id)
		this.menu = []
	}

	use(imp) {
		imp.default(this)
	}

	render(dom) {
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
	console.log('Link', props.here.context.pathname, props.to)
	if (props.here.context.pathname === props.to) {
		return props.children
	}
	else {
		//const click = e => {
		//	e.preventDefault()
  		//	app.nav_to(props.to)
		//}
		return (
			<a href={props.to}>
				{props.children}
			</a>
		)
	}
}


class SideNav extends Component {
	render(def=this.props.items) {
		const items = def.map(item => {
			if (item.sub && item.key === this.props.ident) {
				return <li key={item.key}>{item.text}{this.render(item.sub)}</li>
			}
			if (item.key === this.props.key) {
				return <li key={item.key}>{item.text}</li>
			}
			return <li key={item.key}><Link here={this.props.here} to={item.href}>{item.text}</Link></li>
		})

		return <ul>{items}</ul>
	}
}


export class NormalPage extends Component {
	constructor(app, context, title, date, key, props={}) {
		super(Object.assign({}, {app, title, date, key}, props))
		this.context = context
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
	            <nav className="side">
	            	<Link here={this} to="/"><img src={require('../img/martian.png')}/></Link>
	            	<SideNav here={this} items={this.props.app.menu} ident={this.props.key}/>
	            	{this.side()}
	            </nav>
	            <div className="body">
	            	{this.main()}
	            	<div className="update">Last update: {this.props.date}</div>
	            </div>
	        </Fragment>
	    )
	}
}
