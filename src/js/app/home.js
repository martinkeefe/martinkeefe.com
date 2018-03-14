import React, {Fragment} from 'react'
import {NormalPage} from '../app'
import ShadeBob from './shadebob'


class HomePage extends NormalPage {
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
	app.add_route('', context => {
		app.render(<HomePage {...{app, context}} title="Martin's Stuff" date="2018-02-03"/>)
	})
}
