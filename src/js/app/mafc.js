import React, {Fragment, Component} from 'react'
import {NormalPage} from '../app'

import {Master, Pressure, Pause, quart, quarts} from './mafc-utils'


const MAFC = {
	'potage-permentier': (
			<Fragment>
				<h2>Potage Parmentier <Master/><br/><small>[Leek or Onion and Potato Soup]</small></h2>
				<p>Leek and potato soup smells good, tastes good, and is simplicity itself
				to make. It is also versatile as a soup base; add water cress and you have a
				water-cress soup, or stir in cream and chill it for a <i>vichyssoise</i>. To change the
				formula a bit, add carrots, string beans, cauliflower, broccoli, or anything else
				you think would go with it, and vary the proportions as you wish.</p>
				<p>For about {quarts(2)} serving 6 to 8 people:</p>
				<ul className="recipe">
					<li>
						<ul>
							<li>A {quart(3,4)} saucepan<Pressure> or pressure cooker</Pressure></li>
							<li>3 to 4 cups or 1 lb. peeled potatoes, sliced or diced</li>
							<li>3 cups or 1 lb. thinly sliced leeks including the tender green; or yellow onions</li>
							<li>{quarts(2)} of water</li>
							<li>1 Tb salt</li>
						</ul>
						<p><Pressure alt="S">Either s</Pressure>immer the vegetables, water, and salt together,
						partially covered, for 40 to 50 minutes until
						the vegetables are tender<Pressure>; or cook under 15 pounds
						pressure for 5 minutes, release pressure, and simmer
						uncovered for 15 minutes</Pressure>.</p>
					</li>
					<li>
						<p>Mash the vegetables in the soup with a fork, or pass
						the soup through a food mill. Correct seasoning. <Pause/> Set
						aside uncovered until just before serving, then
						reheat to the simmer.</p>
					</li>
					<li>
						<ul>
							<li>4 to 6 Tb whipping cream or 2 to 3 Tb softened butter</li>
							<li>2 to 3 Tb minced parsley or chives</li>
						</ul>
						<p>Off heat and just before serving, stir in the cream or
						butter by spoonfuls. Pour into a tureen or soup cups
						and decorate with the herbs.</p>
					</li>
				</ul>
			</Fragment>
		),
}

class MAFCPage extends NormalPage {
	constructor(app, context) {
		super(app, context, "Martin's French Cooking", '2018-03-10', 'mafc')
	}

	main() {
		return (
			<Fragment>
				<h1>French Cooking</h1>
				<p>All text on this page is derived from the 1961 classic <i>Mastering the Art of
				French Cooking</i> by Julia Child, Louisette Bertholle, and Simone Beck.</p>
				{MAFC[this.context.params.id]}
			</Fragment>
		)
	}

}




export default function(app) {
	//app.menu.push({key:'maths', text:'Maths', href:"/maths-links"})
	//new MAFCPage(app)

	app.add_page('/mafc/:id', MAFCPage)
}
