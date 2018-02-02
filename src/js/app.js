import React, {Fragment} from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router, Route, Link, NavLink, Switch} from 'react-router-dom'

import {$i} from './app/lib'
import ShadeBob from './app/shadebob'



const Techie = () => (
		<Fragment>
			<hr/>
			<p style={{fontSize: 14+'px', textAlign: 'justify'}}>Techie Note: This site is a simple static single page app hosted on Amazon S3.
			  If you’re curious you can browse the source code on <a href="https://github.com/martinkeefe/martinkeefe.com-webpack">GitHub</a>.</p>
		</Fragment>
	)

const Martian = () => <img src={require('../img/martian.png')}/>
const MartianLink = () => <Link to="/"><Martian/></Link>

const MathNav = () => (
    	<ul>
			<li><NavLink to="/parasurf-intro">Parametric Surfaces</NavLink></li>
			<li><NavLink to="/mathjax-guide-1">MathJax Guide</NavLink></li>
			<li><NavLink to="/tiling-gloss">Tiling Glossary</NavLink></li>
		</ul>
	)

const Nav = () => (
		<ul>
            <li><NavLink to="/mnm-09">Monday Night Martin</NavLink></li>
            <li>
            	<NavLink to="/maths-links">Maths</NavLink>
	        	<Route path="/maths-links" component={MathNav}/>
	        	<Route path="/tiling-gloss" component={MathNav}/>
            </li>
            <li><NavLink to="/pub-watch">Pub Watch</NavLink></li>
            <li><NavLink to="/film-2018">Film Picks</NavLink></li>
		</ul>
	)

render((
	<Router>
    	<Fragment>
	        <nav className="side">
	        	<Switch>
	        		<Route exact path="/" component={Martian}/>
	        		<Route path="*" component={MartianLink}/>
	        	</Switch>
	        	<Nav/>
	        	<Route exact path="/" component={Techie}/>
	        </nav>
        	<Route exact path="/" component={ShadeBob}/>
    	</Fragment>
	</Router>
), $i('content'))




// =============================================================================

//import choo from 'choo'
//import html from 'choo/html'
//import raw from 'choo/html/raw'
//import Nanocomponent from 'nanocomponent'
//import {h, render, Component} from 'preact'
//import Router from 'preact-router'
//import Match from 'preact-router/match'
//import { Link } from 'preact-router/match';

//import mnm from './app/mnm'
//import film from './app/film'


// =============================================================================

//class Page extends Nanocomponent {
//	constructor() {
//		super()
//	}
//
//	createElement(r) {
//		if (r.fn) {
//			const f = require(`./app/${r.fn}`).default
//			this.fn = () => {
//				const main = f.apply(window, r.args.split('|'));
//				if (main) {
//					const body = $q('.body')[0];
//					const last = body.children[0];
//					main.forEach(el => body.insertBefore(el, last));
//				}
//			};
//		}
//
//		let outer = html``;
//		if (r.outer) {
//			outer = require('../html/' + r.outer + '.html')
//
//			if (r.inner) {
//				const inner = require('../html/' + r.outer + '/' + r.inner + '.html')
//				outer = strerp(outer, {inner})
//			}
//
//			if (r.date) {
//				const foot = `<div class="update">Last update: ${r.date}</div>`;
//				outer = strerp(outer, {foot})
//			}
//
//			outer = html`<div id="content">${raw(outer)}</div>`
//		}
//		return outer
//	}
//
//	load() {
//		if (this.fn) {
//			this.fn()
//		}
//	}
//}

//------------------------------------------------------------------------------

//const app = choo()

//let HOME = front;
//const MNM = {};
//
//require('../data/index.csv').forEach(r => {
//	const page = new Page();
//	const view = (state, emit) => {
//		emit('DOMTitleChange', r.ttl);
//		return page.render(r);
//	};
//	app.route('/'+r.route, view);
//
//	if (r.route === '') {
//		HOME = view;
//	}
//	if (r.route.startsWith('mnm-')) {
//		const mnm = r.route.split('-')[1];
//		MNM[mnm] = view;
//	}
//});

//app.route('/', front)

//mnm(app)
//film(app)

// Redirect unknown pages
//app.route('*', front)

//app.mount('#content');

