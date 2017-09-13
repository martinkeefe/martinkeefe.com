const webpack = require('webpack');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
	//entry: './src/js/main.jsx',
	entry: './src/js/app.js',
	output: {
		filename: 'js/app.bundle.js',
		path: '/my/web/sites/martinkeefe.com-webpack/pub'
	},
	resolve: {
		extensions: ['.js'],
		alias: {
            'three/TrackballControls': path.join(__dirname, 'node_modules/three/examples/js/controls/TrackballControls.js'),
            //'three/DragControls': path.join(__dirname, 'node_modules/three/examples/js/controls/DragControls.js'),
            //'three/OrbitControls': path.join(__dirname, 'node_modules/three/examples/js/controls/OrbitControls.js'),
        }
	},
	module: {
		loaders: [
			//{test: /\.(css|sass|scss)$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap')},
			{test: /\.(js)$/, exclude: /node_modules/, loader: 'babel-loader'}
		]
	},
	plugins: [
		//new ExtractTextPlugin('css/app.bundle.css'),
	    new webpack.DefinePlugin({
	        'process.env.NODE_ENV': '"development"',
	        'global': {} // bizarre lodash(?) webpack workaround
	        //'global.GENTLY': false // superagent client fix
	    }),
	    new webpack.ProvidePlugin({
            'THREE': 'three/build/three'
        })
	],
	//sassLoader: {
    //    includePaths: [ './src/css' ]
    //},
    devtool: 'source-map'
}


// https://github.com/webpack/extract-text-webpack-plugin/blob/webpack-1/README.md
// https://webpack.github.io/docs/tutorials/getting-started/
// https://shellmonger.com/2016/01/19/adding-sass-support-to-webpack/

// https://knooto.info/webpack-threejs/
