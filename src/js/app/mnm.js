import html from 'choo/html'
import raw from 'choo/html/raw'
import Nanocomponent from 'nanocomponent'
import {default_page,make_nav} from './lib'

const MNMS = [
	{num:'08', title:"Claudia’s Birthday", when:'September 2008', date:'2016-09-17'},
	{num:'09', title:"Minimalism and Modern Classical", when:'October 2008', date:'2016-09-17'},
	{num:'11', title:"Geof’s Birthday", when:'January 2009', date:'2016-09-17'},
	{num:'14', title:"’70s Albums", when:'April 2009', date:'2016-09-17'},
	{num:'15', title:"Astronomy Night", when:'May 2009', date:'2016-09-17'},
	{num:'18', title:"1969, the Shape of Things to Come", when:'October 2009', date:'2016-09-17'},
	{num:'22', title:"2009 Retrospective", when:'February 2010', date:'2016-09-17'},
	{num:'23', title:"Travel Broadens the Mind", when:'March 2010', date:'2016-09-17'},
	{num:'25', title:"Screen Gems", when:'June 2010', date:'2016-09-17'},
	{num:'27', title:"Cloak & Dagger, Music for Secret Agents", when:'August 2010', date:'2016-09-17'},
	{num:'29', title:"The Life Aquatic", when:'November 2010', date:'2016-09-17'},
	{num:'31', title:"The Hazards of Love", when:'February 2011', date:'2016-09-17'},
	{num:'33', title:"Genetic Drift", when:'July 2013', date:'2016-09-17'},
	{num:'34', title:"What Becomes of the Brokenhearted", when:'November 2013', date:'2016-09-17'},
]

function make_mnm_nav(here) {
	const ul = html`<ul></ul>`

	MNMS.forEach(mnm => {
		let li
		if (mnm.num === here) {
			li = html`<li>#${mnm.num}: ${mnm.title} (${mnm.when})</li>`
		}
		else {
			li = html`<li><a href="/mnm-${mnm.num}">#${mnm.num}: ${mnm.title}</a> (${mnm.when})</li>`
		}

		ul.appendChild(li)
	})

	return ul
}


class MondayPage extends Nanocomponent {
  	constructor(mnm) {
		super()
		this.mnm = mnm
		this.index = 0
  	}

	play() {
		console.log(' play', this.index, this.playlist.children.length);
		if (this.index < this.playlist.children.length) {
			this.playlist.children[this.index].classList.add('active');
	    	this.playlist.children[this.index].appendChild(this.audio);
	    	this.audio.setAttribute('src', this.playlist.children[this.index].src);
	    	this.audio.play();
	    }
	}

	stop() {
		console.log(' stop', this.index, this.playlist.children.length);
		if (this.index < this.playlist.children.length) {
			this.playlist.children[this.index].classList.remove('active');
			this.playlist.children[this.index].removeChild(this.audio);
		}
	}

	next(e) {
		console.log('next');
		this.stop();
		this.index++;
		this.play();
	}

	go_to(idx) {
		if (idx !== this.index) {
	    	this.stop();
		   	this.index = idx;
		   	this.play();
		}
	}

  	createElement() {
		this.playlist = html`<div class="playlist"></div>`
		this.audio = html`<audio controls onended="${() => this.next()}"></audio>`

		const recs = require('../../data/mnm/mnm'+this.mnm.num+'.csv')

		recs.slice(1).forEach((rec, i) => {
			const trk_num = ('0' + (i+1)).substr(-2);
		    const s3_src = `http://s3-eu-west-1.amazonaws.com/raiment57/mnm${this.mnm.num}/${trk_num}`
			const item = html`
				<div class="item" onclick="${() => this.go_to(i)}">
					<img src="${s3_src}.jpg">
					<div class="data">
						<p><big>${trk_num}</big></p>
						<p><b>${rec.art_name}</b></p>
						<p>“${rec.trk_name}”</p>
						<p><i>${rec.alb_name}</i>, ${rec.alb_year}</p>
					</div>
				</div>`
			item.src = s3_src + '.mp3';
			this.playlist.appendChild(item);
		});

		return default_page(
            make_nav('/', [
                ['', "Monday Night Martin", make_mnm_nav(this.mnm.num)],
                ['/maths-links', "Maths"],
                ['/pub-watch',   "Pub Watch"],
                ['/film-2018',   "Film Picks"],
            ]),
			html`<div class="body" id="mnm-${this.mnm.num}">
				<h1>Monday Night Martin</h1>
				<h2>${this.mnm.title} (${this.mnm.when})</h2>
				<p>${raw(recs[0].trk_name || '')}</p>
				${this.playlist}
			</div>`,
			this.mnm.date)
	}

	load() {
	  	this.play()
	}
}


const MNM = {}

export default function(app) {
	MNMS.forEach(mnm => {
		const page = new MondayPage(mnm)
		const view = (state,emit) => {
		    emit('DOMTitleChange', "Monday Night Martin - "+mnm.title)
			return page.render()
		}
		MNM[mnm.num] = view
		app.route('/mnm-'+mnm.num, view)
	})

	// Redirect old MNM pages
	app.route('/music/:mnm', (state, emit) => {
		const arg = state.params.mnm.substr(3);
		return MNM[arg](state, emit);
	})
}
