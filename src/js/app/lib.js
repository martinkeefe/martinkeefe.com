import {h,render} from 'preact'
//import html from 'choo/html'

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

export function default_page(side,body,date) {
    //const navs = []

	//let main =

    //if (Array.isArray(side)) {
	//    side.forEach(s => navs.push(s))
	//}
	//else {
	//	navs.push(side)
	//}

	//if (Array.isArray(body)) {
	//	body.forEach(b => main.appendChild(b))
	//}
	//else {
	//	main = body
	//}
    //main.appendChild()

    return
        <div id="content">
            <nav class="side">
            	<a href="/"><img src={require('../../img/martian.png')}/></a>
            	{side}
            </nav>
            <div class="body">{body}</div>
            <div class="update">Last update: {date}</div>
        </div>
}

export function make_nav(here,tree) {
    const lis = []

    tree.forEach(t => {
        let li
    	if (t.length == 2) {
	        const [href,text] = t
	        if (!href || href === here) {
	            li = <li>{text}</li>
	        }
	        else {
	            li = <li><a href={href}>{text}</a></li>
	        }
	    }
	    else if (t.length == 3) {
	        const [_,text,list] = t
            li = <li>{text}:{list}</li>
	    }
        lis.push(li)
    })

    return <ul>{lis}</ul>
}


// https://developers.google.com/web/fundamentals/getting-started/primers/promises#promisifying_xmlhttprequest
//export function get(url) {
//	// Return a new promise.
//	return new Promise((resolve, reject) => {
//		// Do the usual XHR stuff
//		var req = new XMLHttpRequest();
//		req.open('GET', url);
//
//		req.onload = () => {
//			// This is called even on 404 etc
//			// so check the status
//			if (req.status == 200) {
//				// Resolve the promise with the response text
//				resolve(req.response);
//			}
//			else {
//				// Otherwise reject with the status text
//				// which will hopefully be a meaningful error
//				reject(Error(req.statusText));
//			}
//		};
//
//		// Handle network errors
//		req.onerror = () => {
//			reject(Error("Network Error"));
//		};
//
//		// Make the request
//		req.send();
//	});
//};

//export function get_csv(url, cols) {
//	return new Promise((resolve, reject) => {
//		get(url).then(
//			function(response) {
//				var recs = response.trim('\n').split('\n').map(s => s.trim());
//
//				if (cols == null && recs.length > 0) {
//					cols = recs.shift().split(';');
//				}
//
//				var data = [];
//				recs.forEach(rec => {
//					var datum = {};
//					rec.split(';').forEach((value, i) => datum[cols[i]] = value);
//					data.push(datum);
//				});
//
//				resolve(data);
//			}
//		);
//
//	});
//};


//export function title(ttl) {
//	var ttl_el = document.getElementsByTagName('title')[0];
//	ttl_el.innerHTML = ttl;
//}




//function _mk_element(args, ns) {
//    var el = args[0].split('.');
//    var cls = (el.length > 1) ? el.slice(1) : [];
//    var id = el[0].split('#');
//
//    if (ns) {
//        el = document.createElementNS(ns, id[0]);
//    } else {
//        el = document.createElement(id[0]);
//    }
//    if (id.length > 1) {
//        el.setAttribute('id', id[1]);
//    }
//    if (cls) {
//        if (cls.length > 0)
//            el.setAttribute('class', cls.join(' '));
//    }
//
//    args.slice(1).forEach(function (arg) {
//        if (arg != null) {
//            if (arg.constructor == Object) {
//                Object.keys(arg).forEach(function (key) {
//                    //if (key === 'd') {
//                    //    console.log(arg);
//                    //}
//                    el.setAttribute(key, arg[key]);
//                });
//            } else if (Array.isArray(arg)) {
//                arg.forEach(function (a) {
//                    if (typeof a === 'string')
//                        a = document.createTextNode(a);
//                    el.appendChild(a);
//                });
//            } else {
//                if (typeof arg === 'string') {
//                    //arg = s.replaceAll(arg, '&', 'and');
//                    arg = document.createTextNode(arg);
//                }
//                el.appendChild(arg);
//            }
//        }
//    });
//
//    return el;
//}
//
//export function $h(...args) {
//    //var args = Array.prototype.slice.call(arguments);
//    return _mk_element(args);
//}
//
//export function $v(...args) {
//    //var args = Array.prototype.slice.call(arguments);
//    return _mk_element(args, 'http://www.w3.org/2000/svg');
//}

export function $i(id) { return document.getElementById(id); }

//export function $(str) {
//	// https://davidwalsh.name/convert-html-stings-dom-nodes
//	return document.createRange().createContextualFragment(str)
//}

export function $one(str) {
	// https://davidwalsh.name/convert-html-stings-dom-nodes
	return document.createRange().createContextualFragment(str).firstChild
}

export function $q(sel) {
    return document.querySelectorAll(sel)
}

