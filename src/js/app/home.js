import React, {Fragment} from 'react'
import {NormalPage} from '../app'
import ShadeBob from './shadebob'


const HomePage = props => {
	const side = (
		<Fragment>
			<hr/>
			<p style={{fontSize: 14+'px', textAlign: 'justify'}}><b>Techie Note:</b> This site is a simple
			static single page app powered by <a href="https://reactjs.org/">React</a>, built
			with <a href="https://webpack.js.org/">WebPack</a> and <a href="https://babeljs.io/">Babel</a>, and hosted
			on <a href="https://aws.amazon.com/s3/">Amazon S3</a>.  If you’re curious you can browse
			the source code on <a href="https://github.com/martinkeefe/martinkeefe.com">GitHub</a>.</p>
		</Fragment>
	)

	return (
		<NormalPage title="Martin's Stuff" date="2018-03-14" side={side}>
			<ShadeBob/>
		</NormalPage>
	)
}


export default function(app) {
	app.add_route('/', HomePage, true)
}
