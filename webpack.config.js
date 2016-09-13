var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(__dirname, './components/index.jsx');
var BUILD_PATH = path.resolve(__dirname, './build');
var TEM_PATH = path.resolve(__dirname, './templates/index.html');

module.exports = {
	entry: {
//		'webpack/hot/dev-server',
//    	'webpack-dev-server/client?http://localhost:8080',
        app: APP_PATH,
        vendor: ['react', 'react-dom','react-umeditor']
    },	
	output: {
		path: BUILD_PATH,
		filename: '[name].js'
	},
    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
        new HtmlWebpackPlugin({
            title: 'Editor Demo',
            template: TEM_PATH,
            filename: 'index.html',
            chunks: ['app', 'vendor'],
            inject: 'body'
          })
    ],
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loaders: ['babel'],
            query: {
                "presets": ["react", "es2015"],
                "env": {
                    "development": {
                        "presets": ["react-hmre"]
                    }
                }
            }
		},{
			test: /\.less$/,
			loader: ['style','css','less']
		},{
    		test: /\.(png|jpg)$/,
    		loader: 'url?limit=50000'
    	}]
	}
}