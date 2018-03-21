import React from 'react'
import {NormalPage} from '../app'


const MathLinkPage = props => {
	return (
		<NormalPage title="Martin's Maths Links" date="2016-09-17" ident="maths">
			<h1>Maths Links</h1>

			<div className="card">
				<img src={require("../../img/math-bourke.png")} />
				<p><a href="http://paulbourke.net/">Paul Bourke</a>: The inspiration for my
				own web site. Paul has been adding stuff to his site since the 90s. Wonderful
				collection of articles on 2D and 3D maths as well as some source code for C
				and POV-Ray.</p>
			</div>

			<div className="card">
				<img src={require("../../img/math-bugman.png")} />
				<p><a href="http://www.bugman123.com/index.html">Paul Nylander</a>: Lots of
				great images and animations, often with Mathmatica and POV-Ray code.</p>
			</div>

			<div className="card">
				<img src={require("../../img/math-miqel.png")} />
				<p><a href="http://web.archive.org/web/20160110200622/http://miqel.com/fractals_math_patterns/visual_math_varieties.html">Michael
				Coleman</a>: An eclectic site full of interesting stuff. It seems to have
				disappeared so this is a link to the Wayback Machine.</p>
			</div>

			<div className="card">
				<img src={require("../../img/math-dim.png")} />
				<p><a href="http://www.dimensions-math.org/Dim_E.htm">Dimensions</a>: A walk
				through mathematics. A film for a wide audience in nine chapters. Two hours
				of maths, that take you gradually up to the fourth dimension. Mathematical
				vertigo guaranteed!</p>
			</div>

			<div className="card">
				<img src={require("../../img/math-jos.png")} />
				<p><a href="http://www.josleys.com/index.php">Jos Leys</a>:
				More images by one of the people responsible for
				the <a href="http://www.dimensions-math.org/">Dimensions</a> and <a href="http://www.chaos-math.org/">Chaos</a> films.</p>
			</div>

			<div className="card">
				<img src={require("../../img/math-beth.png")} />
				<p><a href="http://www.bathsheba.com/">Bathsheba Grossman</a>: The art of
				geometry. Stunning 3D printed metal sculptures and laser etched crystals.</p>
			</div>

			<div className="card">
				<img src={require("../../img/math-anti.png")} />
				<p><a href="http://www.antiprism.com/">Antiprism</a>: Open source polyhedron
				modelling software. Create, transform, analyse, and visualise polyhedra.</p>
			</div>
		</NormalPage>
	)
}


export default function(app) {
    app.add_route('/maths-links', MathLinkPage)

	app.add_nav({ident:'maths', text:'Maths', href:"/maths-links",
		//sub:[
		//	{href:"/parasurf/intro", text:"Parametric Surfaces", ident:'parasurf'},
		//	{href:"/mathjax-guide/1", text:"MathJax Guide", ident:'mathjax-guide'},
		//	{href:"/tiling-gloss", text:"Tiling Glossary", ident:'tiling'},
		//]
	})
}
