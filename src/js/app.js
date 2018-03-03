import React, {Fragment, Component} from 'react'
import ReactDOM from 'react-dom'
import Navigo from 'navigo'


class App {
	constructor() {
		this.router = new Navigo(null)
	}

	render(dom) {
		ReactDOM.render(dom, document.getElementById('app'))
	}

	set_title(title) {
		var el = document.getElementsByTagName('title')[0]
		el.innerHTML = title
	}

	start() {
		this.router.resolve()
	}
}

const app = new App()

export default app


export function Link(props) {
	if (window.location.pathname === props.to) {
		return props.children
	}
	else {
		const click = e => {
			e.preventDefault()
  			app.router.navigate(props.to)
		}
		return (
			<a href={props.to} onClick={click}>
				{props.children}
			</a>
		)
	}
}



export class NormalPage extends Component {
	constructor(app, path, title, date, key, sub, props={}) {
		super(Object.assign({}, {app, path, title, date, key, sub}, props))
		app.router.on(path, () => app.render(this.render()))
	}

	main() {
		return null
	}

	side() {
		return null
	}

	render() {
		this.props.app.set_title(this.props.title)

		const top = [
			{key:'mnm', text:'Monday Night Martin', href:"/mnm-09"},
			//{key:'maths', text:'Maths', href:"/maths-links"},
			{key:'pub-watch', text:'Pub Watch', href:"/pub-watch"},
			{key:'film-pick', text:'Film Picks', href:"/film-2018"},
		]

	    return (
	        <Fragment>
	            <nav className="side">
	            	<Link to="/"><img src={require('../img/martian.png')}/></Link>
	            	{make_nav(top, this.props.key, this.props.sub)}
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

export function make_nav(top,key,sub) {
    const items = top.map(t => {
    	if (t.href) {
            return <li key={t.key}><Link to={t.href}>{t.text}</Link>{t.key === key ? sub : null}</li>
	    }
	    else {
            return <li key={t.key}>{t.text}{t.key === key ? sub : null}</li>
	    }
    })

    return <ul>{items}</ul>
}

