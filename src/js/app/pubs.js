import React, {Fragment, Component} from 'react'
import {NormalPage} from '../app'

import 'leaflet'

import '../../css/leaflet.css'
//import '../../css/fontawesome-all.min.css'
import '../../css/leaflet-beautify-marker-icon.css'

import '../lib/L.LabelTextCollision'
import '../lib/leaflet-beautify-marker-icon'
//import '../lib/L.OSGraticule'

//------------------------------------------------------------------------------

const CENTRE = new L.LatLng(51.23, -0.34); // Dorking
//var CENTRE = new L.LatLng(51.3182612,-0.2323152); // Banstead
const RADIUS = 15000;
const STATES = ['bone','gone','dead','open','limbo']; // In drawing order
const COLOR = {
		open: '#4A4',
		limbo:'#F00',
		dead: '#CA0',
		gone: '#C0F',
		bone: '#66F',
	}

const IMGS = {
	'/img/pub/burgh-heath-sheepshearers-arms.jpg': require('../../img/pub/burgh-heath-sheepshearers-arms.jpg'),
	'/img/pub/leatherhead-kings-head-2a.png': require('../../img/pub/leatherhead-kings-head-2a.png'),
	'/img/pub/leatherhead-prince-of-wales-a.png': require('../../img/pub/leatherhead-prince-of-wales-a.png'),
	'/img/pub/leatherhead-rising-sun-1a.png': require('../../img/pub/leatherhead-rising-sun-1a.png'),
	'/img/pub/reigate-eagle-map.png': require('../../img/pub/reigate-eagle-map.png'),
};
//const IMG_SRCS = [
//	'/img/pub/burgh-heath-sheepshearers-arms.jpg',
//	'/img/pub/leatherhead-kings-head-2a.png',
//	'/img/pub/leatherhead-prince-of-wales-a.png',
//	'/img/pub/leatherhead-rising-sun-1a.png',
//	'/img/pub/reigate-eagle-map.png',
//];

//var map_url = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/dark_labels_under/{z}/{x}/{y}.png';
//var map_url2 = 'http://nls-{s}.tileserver.com/nls/{z}/{x}/{y}.jpg';
//var map_url = 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png';
//var map_url = 'https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png';
var map_url = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png'
//var map_att = '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution" target="_blank">CARTO</a>';
//var map_att = 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
var map_att = 'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>';


//------------------------------------------------------------------------------

class PubWatchMap extends Component {
	constructor(props) {
		super(props)

		this.state = {
			data: [],
			renderer: null,
			map: null,
			tile_layer: null,
			circle: null,
			//dots: [],
			solo: null,
			checked: {open:true, limbo:true, dead:true, gone:true, bone:true},
		}

		this._mapNode = null
		this.DOTS = []

		this.draw_data = this.draw_data.bind(this)
	}

	componentDidMount() {
		this.load_data()
		this.init()
	}

	componentWillUnmount() {
    	// code to run just before unmounting the component
    	// this destroys the Leaflet map object & related event listeners
    	this.state.map.remove();
  	}

    load_data() {
		const data = []

		const index = {}
		let pubs = require('../../data/pubs.csv')
		pubs.forEach(pub => {
			if (pub._id) {
				index[pub._id] = pub
			}
		})

		pubs = require('../../data/pubs.json')
		pubs.features.forEach(feat => {
			if (feat.geometry && feat.properties._id && index[feat.properties._id]) {
				const pub = Object.assign({}, index[feat.properties._id], {lat: feat.geometry.coordinates[1], lon: feat.geometry.coordinates[0]})
				data.push(pub)
			}
			else {
				console.warn(feat.properties._id, feat.geometry, index[feat.properties._id])
			}
		});

		this.setState({data})
    }

    init() {
	    if (this.state.map)
	    	return;

		const renderer = new L.LabelTextCollision({
		  	collisionFlg : true
		});

		const map = L.map(this._mapNode, {
			center: CENTRE,
			maxBounds: CENTRE.toBounds(2*RADIUS + 5000),
			zoom: 11,
			renderer : renderer,
		});

		//L.osGraticule({redraw:'move'}).addTo(MAP);

		const tile_layer = L.tileLayer(map_url, {
		    attribution: map_att,
		    minZoom: 11,
		    maxZoom: 18,
		    //subdomains: '0123',
		    //subdomains: 'abc',
		}).addTo(map);

		//L.control.scale().addTo(map);

		const circle = L.circle(CENTRE, {
			radius: RADIUS,
			fill: false,
			color: '#FF0'// '#AAA',
		}).addTo(map);

	    // set our state to include the tile layer
	    this.setState({renderer, map, tile_layer, circle}, this.draw_data);
  	}

  	render() {
	    return (
            <Fragment>
				<table className="gui">
					<tbody>
						<tr key="open">
							<td><span style={{color: COLOR['open']}}>Alive</span></td>
							<td><input type="checkbox" checked={this.state.checked['open']} disabled={!!this.state.solo} onChange={e => this.click_chk(e, 'open')}/></td>
							<td><input type="radio" name="solo" checked={this.state.solo == 'open'} onClick={e => this.click_btn(e, 'open')}/></td>
							<td>Currently open or being refurbished.</td>
						</tr>
						<tr key="limbo">
							<td><span style={{color: COLOR['limbo']}}>In Limbo</span></td>
							<td><input type="checkbox" checked={this.state.checked['limbo']} disabled={!!this.state.solo} onChange={e => this.click_chk(e, 'limbo')}/></td>
							<td><input type="radio" name="solo" checked={this.state.solo == 'limbo'} onClick={e => this.click_btn(e, 'limbo')}/></td>
							<td>Closed but not converted to another use. Might reopen but on danger list.</td>
						</tr>
						<tr key="dead">
							<td><span style={{color: COLOR['dead']}}>Dead</span></td>
							<td><input type="checkbox" checked={this.state.checked['dead']} disabled={!!this.state.solo} onChange={e => this.click_chk(e, 'dead')}/></td>
							<td><input type="radio" name="solo" checked={this.state.solo == 'dead'} onClick={e => this.click_btn(e, 'dead')}/></td>
							<td>Closed and changed use. Could conceivably be resurrected.</td>
						</tr>
						<tr key="gone">
							<td><span style={{color: COLOR['gone']}}>Gone</span></td>
							<td><input type="checkbox" checked={this.state.checked['gone']} disabled={!!this.state.solo} onChange={e => this.click_chk(e, 'gone')}/></td>
							<td><input type="radio" name="solo" checked={this.state.solo == 'gone'} onClick={e => this.click_btn(e, 'gone')}/></td>
							<td>Demolished and/or converted to residential use. Gone forever.</td>
						</tr>
						<tr key="bone">
							<td><span style={{color: COLOR['bone']}}>Buried</span></td>
							<td><input type="checkbox" checked={this.state.checked['bone']} disabled={!!this.state.solo} onChange={e => this.click_chk(e, 'bone')}/></td>
							<td><input type="radio" name="solo" checked={this.state.solo == 'bone'} onClick={e => this.click_btn(e, 'bone')}/></td>
							<td>Disappeared at least 40 years ago.</td>
						</tr>
					</tbody>
				</table>

		        <div ref={node => this._mapNode = node} style={{height: '720px'}}/>
            </Fragment>
	    )
  	}

  	set_checked(status, state) {
    	this.setState((prevState, props) => {
    		const checked = Object.assign({}, prevState.checked)
    		checked[status] = state
    		return {checked}
    	})
  	}

    click_chk(e, status) {
    	this.set_checked(status, e.target.checked)
    }

    click_btn(e, status) {
		if (this.state.solo === status) {
			this.setState({solo: null})
		}
		else {
			this.setState({solo: status})
		}
    }

    componentDidUpdate(prevProps, prevState) {
    	this.draw_data()
    }

    draw_data() {
		this.DOTS.forEach(dot => {
			this.state.map.removeLayer(dot);
			//delete dot;
		});
		this.DOTS = []

		STATES.forEach(status => {
			if (this.state.solo && status !== this.state.solo) {
				return;
			}

			if (!this.state.solo && !this.state.checked[status]) {
				return;
			}

			this.state.data.forEach(pub => {
				//if (pub.status === status && pub.lat && pub.lon) {
				if (pub.status === status && pub.lat && pub.lon && !pub.hide) {
					var latlng = new L.LatLng(pub.lat,pub.lon);
					if (CENTRE.distanceTo(latlng) > RADIUS) {
						return;
					}

					//var circle = L.circleMarker([pub.lat, pub.lon], {
					//    color: COLOR[pub.status],
					//    opacity: 0.5,
					//    //stroke: false,
					//    fillColor: COLOR[pub.status],
					//    fillOpacity: 1,
					//    weight: 15,
					//    radius: 3,
					//    text: pub.name,
					//    textColor: COLOR[pub.status],
					//}).addTo(MAP);
					////circle.bindTooltip(pub.name + (pub.closed ? ' (' + pub.closed + ')' : ''));
					var label = L.circleMarker([pub.lat, pub.lon], {
					//    color: COLOR[pub.status],
					//    opacity: 0.5,
					//    //stroke: false,
					//    fillColor: COLOR[pub.status],
					//    fillOpacity: 1,
					//    weight: 15,
					    radius: 0,
					    text: pub.name,
					    textColor: COLOR[pub.status],
					}).addTo(this.state.map);

					var circle;
					if (pub.kind === 'bar') {
						circle = L.marker([pub.lat, pub.lon], {
						    icon: L.BeautifyIcon.icon({
							    iconShape: 'circle-dot',
							    borderColor: COLOR[pub.status],
							    borderWidth: 5,
						    }),
						}).addTo(this.state.map);
					}
					else if (pub.kind === 'hotel') {
						circle = L.marker([pub.lat, pub.lon], {
						    icon: L.BeautifyIcon.icon({
							    iconShape: 'rectangle-dot',
							    borderColor: COLOR[pub.status],
							    borderWidth: 6,
						    }),
						}).addTo(this.state.map);
					}
					else {
						circle = L.marker([pub.lat, pub.lon], {
						    icon: L.BeautifyIcon.icon({
							    iconShape: 'doughnut',
							    borderColor: COLOR[pub.status],
							    borderWidth: 5,
						    }),
						}).addTo(this.state.map);
					}

					circle.bindPopup(make_popup(pub));

					this.DOTS.push(circle);
					this.DOTS.push(label);
				}
			});
		});

		if (this.state.renderer) {
			this.state.renderer._update();
		}
    }
}

//------------------------------------------------------------------------------

function make_popup(pub) {
	var popup = '<b>'+pub.name+'</b>';

	if (pub.url) {
		var url = pub.url.split('|').pop();
		popup = '<a href="'+url+'" target="_blank">'+popup+'</a>';
	}
	if (pub.status !== 'open') {
		if (pub.closed) {
			popup += '<br/>closed: ' + pub.closed;
		}
		else {
			popup += '&nbsp; closed';
		}
	}
	if (pub.prev) {
		popup += '<br/>formerly: ' + pub.prev.split('|').join(', ');
	}

	if (pub.img) {
		var img = pub.img.split('|').pop();
		img = IMGS[img] || img;
		popup += '<br/><a href="'+img+'" target="_blank"><img src="'+img+'" width="150"/></a>';
	}

	if (pub.addr) {
		popup += '<br/>' + pub.addr.split(',').join('<br/>');// map(function(a) {return '<br/>' + a;});
	}
	if (pub.town) {
		popup += '<br/>' + pub.town;
	}
	else if (pub.posttown) {
		popup += '<br/><span class="posttown">' + pub.posttown + '</span>';
	}
	if (pub.postcode && pub.postcode.length > 5) {
		popup += '<br/>' + pub.postcode;
	}

	// https://www.openstreetmap.org/?mlat=51.22601&mlon=-0.36434#map=17/51.22601/-0.36434&layers=N
	var osm = 'https://www.openstreetmap.org/?mlat=' + pub.lat + '&mlon=' + pub.lon + '#map=17/' + pub.lat + '/' + pub.lon
	popup += '<br/><a href="'+osm+'" target="_blank">Map</a>'

	if (pub.gsv) {
		popup += ' · <a href="'+pub.gsv+'" target="_blank">StreetView</a>';
	}

	return '<div style="font-family: Lato, sans-serif; font-size: 14px; max-width: 150px;">'+popup+'</div>'
}

//------------------------------------------------------------------------------

const PubWatchPage = props => {
    return (
        <NormalPage title="Martin's Pub Watch" date="2018-03-03">
			<h1>Pub Watch</h1>

			<p>Keeping an eye on the slow extinction of the British pub. Here is a map of
			   public watering holes, past and present, in Dorking and the
			   surrounding area.</p>

			<PubWatchMap/>

			<p>Basic data is from CAMRA's <a href="https://whatpub.com/">WhatPub</a> site.
			   Some use also made of information from <a href="http://www.closedpubs.co.uk/">The Lost
			   Pubs Project</a> and <a href="https://pubshistory.com/">UK Pub history</a>.</p>
        </NormalPage>
    )
}

//------------------------------------------------------------------------------

export default function(app) {
    app.add_route('/pub-watch', PubWatchPage)

	app.add_nav({ident:'pub-watch', text:'Pub Watch', href:"/pub-watch"})
}
