import React from 'react'
import {NormalPage} from 'app'
import PubsUI, {ui_reducer} from 'app/pubs-ui'
import PubsMap, {list_reducer} from 'app/pubs-map'

import 'css/leaflet.css'

//------------------------------------------------------------------------------




//------------------------------------------------------------------------------

const PubWatchPage = props => {
    return (
        <NormalPage title="Martin's Pub Watch" date="2018-03-03">
			<h1>Pub Watch</h1>

			<p>Keeping an eye on the slow extinction of the British pub. Here is a map of
			   public watering holes, past and present, in Dorking and the
			   surrounding area.</p>

			<PubsUI/>

			<PubsMap/>

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

    app.add_reducers('pubs', {ui:ui_reducer, list:list_reducer})
}
