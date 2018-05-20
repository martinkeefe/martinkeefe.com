import React, {Fragment, Component} from 'react'
import {connect} from 'react-redux'
import {Map,TileLayer,Circle,CircleMarker,Marker} from 'react-leaflet'

import 'css/leaflet-beautify-marker-icon.css'
import 'lib/L.LabelTextCollision'
import 'lib/leaflet-beautify-marker-icon'

//------------------------------------------------------------------------------

import {COLOR} from 'app/pubs-ui'

const TILES = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png'
const ATT = 'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>';

const CENTRE = new L.LatLng(51.23, -0.34) // Dorking
const RADIUS = 15000
const STATES = ['bone','gone','dead','open','limbo']; // In drawing order

const IMGS = {
	'/img/pub/burgh-heath-sheepshearers-arms.jpg': require('img/pub/burgh-heath-sheepshearers-arms.jpg'),
	'/img/pub/leatherhead-kings-head-2a.png': require('img/pub/leatherhead-kings-head-2a.png'),
	'/img/pub/leatherhead-prince-of-wales-a.png': require('img/pub/leatherhead-prince-of-wales-a.png'),
	'/img/pub/leatherhead-rising-sun-1a.png': require('img/pub/leatherhead-rising-sun-1a.png'),
	'/img/pub/reigate-eagle-map.png': require('img/pub/reigate-eagle-map.png'),
}

//const RENDERER = new L.LabelTextCollision({collisionFlg : true})


//------------------------------------------------------------------------------
// Presentation

class PubsMap extends Component {
    componentWillMount() {
        this.props.fetch()
    }

    render() {
    	const {solo, checked, pubs} = this.props
        const {data, loading, error} = pubs

        if (loading) {
            return <div className="container"><h3>Loading...</h3></div>
        }
        else if (error) {
            return <div className="alert alert-danger">Error: {error.message}</div>
        }

		//const RENDERER = new L.LabelTextCollision({collisionFlg : true})
		const DOTS = []

		STATES.forEach(status => {
			if (solo && status !== solo) {
				return;
			}

			if (!solo && !checked[status]) {
				return;
			}

			data.forEach(pub => {
				if (pub.status === status && pub.lat && pub.lon && !pub.hide) {
					var latlng = new L.LatLng(pub.lat,pub.lon)
					if (CENTRE.distanceTo(latlng) > RADIUS) {
						return
					}

					//var label = <CircleMarker key={pub._id+'-label'} center={[pub.lat, pub.lon]} radius={0} text={pub.name} textColor={COLOR[pub.status]}/>

					var icon = L.divIcon({
						className: 'my-div-icon',
						html: pub.name,
					})
					var label = <Marker key={pub._id+'-label'}  position={[pub.lat, pub.lon]} icon={icon}/>


					if (pub.kind === 'bar') {
						icon = L.BeautifyIcon.icon({
							    iconShape: 'circle-dot',
							    borderColor: COLOR[pub.status],
							    borderWidth: 5,
						    })
					}
					else if (pub.kind === 'hotel') {
						icon = L.BeautifyIcon.icon({
							    iconShape: 'rectangle-dot',
							    borderColor: COLOR[pub.status],
							    borderWidth: 6,
						    })
					}
					else {
						icon = L.BeautifyIcon.icon({
							    iconShape: 'doughnut',
							    borderColor: COLOR[pub.status],
							    borderWidth: 5,
						    })
					}
					var circle = <Marker key={pub._id+'-circle'} position={[pub.lat, pub.lon]} icon={icon} title={pub.name} riseOnHover={true}/>

					//circle.bindPopup(make_popup(pub));

					DOTS.push(circle)
					DOTS.push(label)
				}
			})
		})

		return (
			<Map center={CENTRE} zoom={11} maxBounds={CENTRE.toBounds(2*RADIUS + 5000)} style={{height: '720px'}}>
				<TileLayer attribution={ATT} url={TILES} minZoom={11} maxZoom={18}/>
				<Circle center={CENTRE} radius={RADIUS} fill={false} color="#FF0"/>
				{DOTS}
			})
			</Map>
		)
	}
}


//------------------------------------------------------------------------------
// Actions

function fetch() {
    console.log('pubs',`fetch()`)
	const data = []

	const index = {}
	let pubs = require('data/pubs.csv')
	pubs.forEach(pub => {
		if (pub._id) {
			index[pub._id] = pub
		}
	})

	pubs = require('data/pubs.json')
	pubs.features.forEach(feat => {
		if (feat.geometry && feat.properties._id && index[feat.properties._id]) {
			const pub = Object.assign({}, index[feat.properties._id], {lat: feat.geometry.coordinates[1], lon: feat.geometry.coordinates[0]})
			data.push(pub)
		}
		else {
			console.warn(feat.properties._id, feat.geometry, index[feat.properties._id])
		}
	});

    return {type: 'PUBS_FETCH', payload: Promise.resolve(data)}
}

const fetchSuccess = pubs  => {
    console.log('pubs',`fetchSuccess([${pubs.length}])`)
	return {type: 'PUBS_FETCH_SUCCESS', pubs}
}
const fetchFailure = error => {
    console.log('pubs',`fetchFailure(${error})`)
	return {type: 'PUBS_FETCH_FAILURE', error}
}


//------------------------------------------------------------------------------
// Container

const state2props = state => ({
        pubs: state.pubs.list,
        solo: state.pubs.ui.solo,
        checked: state.pubs.ui.checked,
    })

const dispatch2props = dispatch => ({
        fetch: () => {
            dispatch(fetch()).payload
                .then(data => {
                    dispatch(fetchSuccess(data))
                })
                .catch(err => dispatch(fetchFailure(err)))
        }
    })

export default connect(state2props, dispatch2props)(PubsMap)


//------------------------------------------------------------------------------
// Reducer

const INITIAL_LIST_STATE = {
    data: [],
    error: null,
    loading: false
}

export function list_reducer(state=INITIAL_LIST_STATE, action) {
    switch(action.type) {
        case 'PUBS_FETCH':         return {...state, data: [], error: null, loading: true}
        case 'PUBS_FETCH_SUCCESS': return {...state, data: action.pubs, error:null, loading: false}
        case 'PUBS_FETCH_FAILURE': return {...state, data: [], error: action.error, loading: false}
        default: return state
    }
}
