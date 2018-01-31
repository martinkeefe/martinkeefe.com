//import choo from 'choo'
//import html from 'choo/html'
//import raw from 'choo/html/raw'
//import Nanocomponent from 'nanocomponent'
import {h, render, Component} from 'preact'
//import Router from 'preact-router'
//import Match from 'preact-router/match'
//import { Link } from 'preact-router/match';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import ShadeBob from './app/front'
//import {$i} from './app/lib'
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

const Techie = () => (
	<div>
		<hr/>
    	<p style="font-size: 14px; text-align: justify;">Techie Note: This site is a simple static single page app hosted on Amazon S3.
    	  If you’re curious you can browse the source code on <a href="https://github.com/martinkeefe/martinkeefe.com-webpack">GitHub</a>.</p>
    </div>)

render((
	<Router>
    	<div id="content">
	        <nav class="side">
	        	<Link to="/"><img src={require('../img/martian.png')}/></Link>
	        	<Route path="/" component={Techie}/>
	        </nav>
        	<Route path="/" component={ShadeBob}/>
    	</div>
	</Router>
), document.body) //$i('content'))
