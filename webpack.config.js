const webpack = require('webpack')
//var ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname),
    entry: './src/index.ts',
    output: {
        //filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        modules: [
            path.resolve(__dirname, 'src'), 
            'node_modules',
        ],
    },
    module: {
        rules: [
            //{test: /\.(css|sass|scss)$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap')},
            {test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader'},
            {test: /\.tsx?$/, exclude: /node_modules/, use: 'awesome-typescript-loader'},
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.(png|svg|jpg|gif)$/, use: {loader: 'url-loader', options: {limit: 4096}}},
            {test: /\.(woff|woff2|eot|ttf|otf)$/, use: 'file-loader'},
            {test: /\.html$/, use: 'html-loader'},
            {test: /\.(c|d|t)sv$/, use: 'dsv-loader?delimiter=;'},
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Martin\'s Stuff',
            favicon: './src/favicon.ico',
            template: './src/index.html',
        }),
        new webpack.optimize.SplitChunksPlugin(),
    ],
    devtool: 'source-map'
}
