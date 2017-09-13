import 'leaflet'

import {get_csv} from './lib'
import '../lib/L.LabelTextCollision'
//import '../lib/L.OSGraticule'

var CENTRE = new L.LatLng(51.23, -0.34); // Dorking
//var CENTRE = new L.LatLng(51.3182612,-0.2323152); // Banstead
var RADIUS = 12000;
var STATES = ['bone','gone','dead','open','limbo']; // In drawing order
	var COLOR = {
		open: '#4A4',
		limbo:'#F00',
		dead: '#CA0',
		gone: '#C0F',
		bone: '#66F',
	}

var MAP;
var RENDERER;
var DATA = [];
var DOTS = [];
var SOLO = null;

var map_url = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png';
var map_att = '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution" target="_blank">CARTO</a>';

function render(renderer) {
	DOTS.forEach(function(dot) {
		MAP.removeLayer(dot);
		//delete dot;
	});
	DOTS = [];

	STATES.forEach(function(status) {
		if (SOLO && status !== SOLO) {
			return;
		}

		var chk = document.getElementById(status+'-chk');
		if (!SOLO && !chk.checked) {
			return;
		}

		DATA.forEach(function(pub) {
			//if (pub.status === status && pub.lat && pub.lon) {
			if (pub.status === status && pub.lat && pub.lon && !pub.hide) {
				var latlng = new L.LatLng(pub.lat,pub.lon);
				if (CENTRE.distanceTo(latlng) > RADIUS) {
					return;
				}

				var circle = L.circleMarker([pub.lat, pub.lon], {
				    color: COLOR[pub.status],
				    opacity: 0.5,
				    //stroke: false,
				    fillColor: COLOR[pub.status],
				    fillOpacity: 1,
				    weight: 15,
				    radius: 3,
				    text: pub.name,
				    textColor: COLOR[pub.status],
				}).addTo(MAP);
				//circle.bindTooltip(pub.name + (pub.closed ? ' (' + pub.closed + ')' : ''));

				var popup = '<b>'+pub.name+'</b>';
				if (pub.url) {
					var url = pub.url.split('|').pop();
					popup = '<a href="'+url+'" target="_blank">'+popup+'</a>';
				}
				if (pub.closed) {
					popup += '<br/>closed: ' + pub.closed;
				}
				else if (pub.status !== 'open') {
					popup += '&nbsp; closed';
				}

				if (pub.prev) {
					popup += '<br/>formerly: ' + pub.prev.split('|').join(', ');
				}

				if (pub.img) {
					var img = pub.img.split('|').pop();
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

				circle.bindPopup('<div style="font-family: Lato, sans-serif; font-size: 14px; max-width: 150px;">'+popup+'</div>');

				DOTS.push(circle);
			}
		});
	});

	if (renderer) {
		renderer._update();
	}
}


function setup() {
	STATES.forEach(function(status) {
		var chk = document.getElementById(status+'-chk');
		chk.addEventListener('click', function(e) {
			render(RENDERER);
		});

		var btn = document.getElementById(status+'-btn');
		btn.addEventListener('click', function(e) {
			if (SOLO === status) {
				btn.checked = false;
				SOLO = null;
			}
			else {
				SOLO = status;
			}
			STATES.forEach(function(s) {
				var c = document.getElementById(s+'-chk');
				c.disabled = !!SOLO;
			});

			render(RENDERER);
		});
	})

	RENDERER = new L.LabelTextCollision({
	  	collisionFlg : true
	});

	MAP = L.map('mapid', {
		center: CENTRE,
		maxBounds: CENTRE.toBounds(2*RADIUS),
		zoom: 11,
		renderer : RENDERER,
	});

	//L.osGraticule({redraw:'move'}).addTo(MAP);

	L.tileLayer(map_url, {
	    attribution: map_att,
	    minZoom: 11,
	    maxZoom: 18,
	}).addTo(MAP);

	//L.control.scale().addTo(map);

	L.circle(CENTRE, {
		radius: RADIUS,
		fill: false,
		color: '#AAA',
	}).addTo(MAP);
}

export default function() {
	get_csv('/data/pubs.csv')
		.then(function(data) {
			DATA = data
			setup()
			render()
		});
};
