// http://javascript.crockford.com/remedial.html - supplant(object)
export function strerp(str, obj) {
	return str.replace(
		/\{\{([^{}]*)\}\}/g,
		function (a, b) {
			var r = obj[b];
			return typeof r === 'string' || typeof r === 'number' ? r : a;
		}
	);
};

// https://developers.google.com/web/fundamentals/getting-started/primers/promises#promisifying_xmlhttprequest
export function get(url) {
	// Return a new promise.
	return new Promise((resolve, reject) => {
		// Do the usual XHR stuff
		var req = new XMLHttpRequest();
		req.open('GET', url);

		req.onload = () => {
			// This is called even on 404 etc
			// so check the status
			if (req.status == 200) {
				// Resolve the promise with the response text
				resolve(req.response);
			}
			else {
				// Otherwise reject with the status text
				// which will hopefully be a meaningful error
				reject(Error(req.statusText));
			}
		};

		// Handle network errors
		req.onerror = () => {
			reject(Error("Network Error"));
		};

		// Make the request
		req.send();
	});
};

export function get_csv(url, cols) {
	return new Promise((resolve, reject) => {
		get(url).then(
			function(response) {
				var recs = response.trim('\n').split('\n').map(s => s.trim());

				if (cols == null && recs.length > 0) {
					cols = recs.shift().split(';');
				}

				var data = [];
				recs.forEach(rec => {
					var datum = {};
					rec.split(';').forEach((value, i) => datum[cols[i]] = value);
					data.push(datum);
				});

				resolve(data);
			}
		);

	});
};


function title(ttl) {
	var ttl_el = document.getElementsByTagName('title')[0];
	ttl_el.innerHTML = ttl;
}

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
};

function navto(r) {
	console.log('NAVTO', r);
	history.pushState({}, '', r);
	route();
};

export function render(id, path, success) {
	if (path) {
		get('/html/' + path + '.html')
			.then(response => {
				var el = document.getElementById(id);
				el.innerHTML = response;
				if (success) {
					success();
				}

				var host = window.location.href.split('/')[2];
				for (var i = 0; i < document.links.length; i++) {
					var link = document.links[i];
					if (link.href) {
						var href = link.href.split('/');
						//console.log(href)
						if (href[2] === host) {// && href[3] !== 'pub-watch#') {
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
			});
	}
};

//window.addEventListener('hashchange', function() {
window.addEventListener('popstate', e => {
	console.log('POPSTATE');
	route();
});


export function start(func) {
	console.log('START');
	//var cols = ['route','ttl','outer','inner','fn','args','tags','date'];
	get_csv('/data/index.csv').then(
		data => {
			data.forEach(r => {
				routes[r.route] = function() {
					title(r.ttl);
					var done = null;
					if (r.fn) {
						done = () => func[r.fn].apply(window, r.args.split('|'));
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
		},
		error => console.warn(error)
	);
}




function _mk_element(args, ns) {
    var el = args[0].split('.');
    var cls = (el.length > 1) ? el.slice(1) : [];
    var id = el[0].split('#');

    if (ns) {
        el = document.createElementNS(ns, id[0]);
    } else {
        el = document.createElement(id[0]);
    }
    if (id.length > 1) {
        el.setAttribute('id', id[1]);
    }
    if (cls) {
        if (cls.length > 0)
            el.setAttribute('class', cls.join(' '));
    }

    args.slice(1).forEach(function (arg) {
        if (arg != null) {
            if (arg.constructor == Object) {
                Object.keys(arg).forEach(function (key) {
                    //if (key === 'd') {
                    //    console.log(arg);
                    //}
                    el.setAttribute(key, arg[key]);
                });
            } else if (Array.isArray(arg)) {
                arg.forEach(function (a) {
                    if (typeof a === 'string')
                        a = document.createTextNode(a);
                    el.appendChild(a);
                });
            } else {
                if (typeof arg === 'string') {
                    //arg = s.replaceAll(arg, '&', 'and');
                    arg = document.createTextNode(arg);
                }
                el.appendChild(arg);
            }
        }
    });

    return el;
}

export function $h(...args) {
    //var args = Array.prototype.slice.call(arguments);
    return _mk_element(args);
}

export function $v(...args) {
    //var args = Array.prototype.slice.call(arguments);
    return _mk_element(args, 'http://www.w3.org/2000/svg');
}

export function $i(id) { return document.getElementById(id); }

export function $(str) {
	// https://davidwalsh.name/convert-html-stings-dom-nodes
	return document.createRange().createContextualFragment(str)
}

export function $one(str) {
	// https://davidwalsh.name/convert-html-stings-dom-nodes
	return document.createRange().createContextualFragment(str).firstChild
}

