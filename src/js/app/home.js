import React, {Fragment} from 'react'
import {NormalPage} from '../app'
import ShadeBob from './shadebob'


class HomePage extends NormalPage {
	constructor(app) {
		super(app, "/", "Martin's Stuff", '2018-02-03')
	}

	side() {
		return (
			<Fragment>
				<hr/>
				<p style={{fontSize: 14+'px', textAlign: 'justify'}}>Techie Note: This site is a simple static single page app hosted on Amazon S3.
				  If you’re curious you can browse the source code on <a href="https://github.com/martinkeefe/martinkeefe.com-webpack">GitHub</a>.</p>
			</Fragment>
		)
	}

	main() {
		return <ShadeBob/>
	}
}


export default function(app) {
	new HomePage(app)
}
