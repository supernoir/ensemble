const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname),
	entry  : './js/index.js',
	output : {
		path    : path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	devtool  : 'source-map',
	devServer: {
		historyApiFallback: true
	},
	module: {
		rules: [
			{
				test   : /\.js$/,
				loader : 'babel-loader',
				exclude: /node_modules/,
				query  : {
					presets: ['@babel/preset-react', '@babel/preset-env']
				}
			},
			{
				test   : /\.(ttf|eot|woff|woff2)$/,
				loader : 'file-loader',
				options: {
					name: 'fonts/[name].[ext]'
				}
			},
			{
				test   : /\.(png|svg|jpg|gif)$/,
				loader : 'file-loader',
				options: {
					name: 'public/[name].[ext]'
				}
			},
			{
				test   : /\.(sass|scss)$/,
				exclude: /node_modules/,
				use    : ExtractTextPlugin.extract({
					use     : [{ loader: 'css-loader', options: { sourceMap: true } }, { loader: 'sass-loader', options: { sourceMap: true } }],
					fallback: 'style-loader'
				})
			}
		]
	},

	plugins: [
		new BrowserSyncPlugin({
			host  : 'localhost',
			port  : 3000,
			proxy: 'http://localhost:3001/',
			//server: { baseDir: ['public'] }
		}),
		new ExtractTextPlugin('style.css'),
		new HtmlWebpackPlugin({
			title   : 'Ensemble • by Mirage',
			filename: 'index.html',
			template: 'index.html'
		})
	]
};
