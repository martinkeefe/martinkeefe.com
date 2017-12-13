const webpack = require('webpack');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
//const VendorChunkPlugin = require('webpack-vendor-chunk-plugin');

module.exports = {
	//entry: './src/js/main.jsx',
	entry: {//'./src/js/index.js',
		app: './src/js/index.js',
    	vendor: [
    		'three',
    		'three/TrackballControls',
    		'leaflet',
    		'./src/js/lib/L.LabelTextCollision',
    		//'./src/js/lib/L.OSGraticule',
    		'./src/js/lib/leaflet-beautify-marker-icon',
    		'./src/js/lib/xgui',
    	],
	},
	output: {
		filename: '[name].bundle.js',
		//path: '/my/web/sites/martinkeefe.com-webpack/dist'
		path: path.resolve(__dirname, 'dist')
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
		rules: [
			//{test: /\.(css|sass|scss)$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap')},
			{test: /\.(js)$/, exclude: /node_modules/, use: ['babel-loader']},
       		{test: /\.css$/, use: ['style-loader', 'css-loader']},
       		{test: /\.(png|svg|jpg|gif)$/, use: ['file-loader']},
       		{test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader']},
			{test: /\.html$/, use: ['html-loader']},
			{test: /\.(c|d|t)sv$/, use: ['dsv-loader?delimiter=;']},
		],
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		//new ExtractTextPlugin('css/app.bundle.css'),
	    new webpack.DefinePlugin({
	        'process.env.NODE_ENV': '"development"',
	        'global': {} // bizarre lodash(?) webpack workaround
	        //'global.GENTLY': false // superagent client fix
	    }),
	    new webpack.ProvidePlugin({
            'THREE': 'three/build/three'
        }),
        new HtmlWebpackPlugin({
       		title: 'Martin\'s Stuff',
       		favicon: './src/favicon.ico',
       		template: './src/index.html',
     	}),
     	//new UglifyJSPlugin(),
     	new webpack.optimize.CommonsChunkPlugin({
     		name: 'vendor' // Specify the common bundle's name.
     	}),
     	//new VendorChunkPlugin('vendor'),
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
