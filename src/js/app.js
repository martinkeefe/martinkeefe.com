import {start} from './app/lib'

import front from './app/front'
import mnm from './app/mnm'
import jax from './app/jax'
import parasurf from './app/parasurf'
import pubs from './app/pubs'

//MathJax.Hub.Config({
//	extensions: ["tex2jax.js"],
//	"HTML-CSS": { scale: 90, availableFonts: [], webFont: "TeX"}
//});

const FUNC = {
	'front' : front,
	'jax' : jax,
	'parasurf' : parasurf,
	'mnm' : mnm,
	'canvas-demo' : null,
	'js-qref' : null,
	'pubs' : pubs,
}

start(FUNC)
