import choo from 'choo'
import html from 'choo/html'
import raw from 'choo/html/raw'
import Nanocomponent from 'nanocomponent'
import {strerp} from './app/lib'

// =============================================================================

class Page extends Nanocomponent {
	constructor() {
		super()
	}

	createElement(r) {
		if (r.fn) {
			const f = require(`./app/${r.fn}`).default
			this.fn = () => {
				f.apply(window, r.args.split('|'));
			};
		}

		let outer = html``;
		if (r.outer) {
			outer = require('../html/' + r.outer + '.html')

			if (r.inner) {
				const inner = require('../html/' + r.outer + '/' + r.inner + '.html')
				outer = strerp(outer, {inner})
			}

			if (r.date) {
				const foot = `<div class="update">Last update: ${r.date}</div>`;
				outer = strerp(outer, {foot})
			}

			outer = html`<div id="content">${raw(outer)}</div>`
		}
		return outer
	}

	load() {
		if (this.fn) {
			this.fn()
		}
	}
}

//------------------------------------------------------------------------------

const app = choo()

let HOME;
const MNM = {};

require('../data/index.csv').forEach(r => {
	const page = new Page();
	const view = (state, emit) => {
		emit('DOMTitleChange', r.ttl);
		return page.render(r);
	};
	app.route('/'+r.route, view);

	if (r.route === '') {
		HOME = view;
	}
	if (r.route.startsWith('mnm-')) {
		const mnm = r.route.split('-')[1];
		MNM[mnm] = view;
	}
});

// Redirect old MNM pages
app.route('/music/:mnm', (state, emit) => {
	const mnm = state.params.mnm.substr(3);
	return MNM[mnm](state, emit);
})

// Redirect unknown pages
app.route('*', HOME)

app.mount('#content');
