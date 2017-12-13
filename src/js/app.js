import {title} from './app/lib'

// =============================================================================
// Derived from https://github.com/miazukee/restlite

var routes = [];
var error404 = '#404';

function route() {
	//var r = window.location.hash.substr(1).split('?');
	var r = window.location.pathname.substr(1);
	//var a = r[1];
	//r = r[0];
	if(routes[r] !== undefined)
		routes[r](); //a);
	else if(routes[error404] !== undefined)
		routes[error404](); //a);
}

function navto(r) {
	console.log('NAVTO', r);
	history.pushState({}, '', r);
	route();
}

export function render(id, path, success) {
	if (path) {
		var el = document.getElementById(id);
		el.innerHTML = require('../html/' + path + '.html')
		if (success) {
			success();
		}

		var host = window.location.href.split('/')[2];
		for (var i = 0; i < document.links.length; i++) {
			var link = document.links[i];
			if (link.href) {
				var href = link.href.split('/');
				//console.log(href)
				if (href[2] === host && !href[3].endsWith('#')) {
					(function(dst) {
						link.onclick = e => {
							e.preventDefault();
							e.stopPropagation();
							navto(dst);
						};
					})('/' + href.slice(3).join('/'));
				}
			}
		}
	}
}

//window.addEventListener('hashchange', function() {
window.addEventListener('popstate', e => {
	console.log('POPSTATE');
	route();
});


export function start() {
	console.log('START');

	// cols: 'route','ttl','outer','inner','fn','args','tags','date'
	const data = require('../data/index.csv')

	data.forEach(r => {
		routes[r.route] = function() {
			title(r.ttl);
			var done = null;
			if (r.fn) {
				const fn = require(`./app/${r.fn}`).default
				done = () => fn.apply(window, r.args.split('|'));
			}
			render('content', r.outer, () => {
				if (r.date) {
					var els = document.getElementsByClassName('body');
					if (els.length > 0) {
						els[0].insertAdjacentHTML('beforeend', '<div class="update">Last update: '+r.date+'</div>');
					}
				}
				if (r.inner) {
					render('body', r.outer + '/' + r.inner, done);
				} else if (done) {
					done();
				}
			});
		};
	});
	// Redirect old MNM pages
	['08','09','11','14','15','18','22','23','25','27','29','31','33','34'].forEach(mnm => {
		routes['music/mnm'+mnm] = routes['mnm-'+mnm];
	})
	route();
}

// =============================================================================

