const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
	NoEmitOnErrorsPlugin,
	WatchIgnorePlugin
} = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
	mode: 'development',
	entry: {
		app: [
			'babel-polyfill',
			'./src/main.js'
		],
	},
	devtool: 'eval',

	output: {
		path: __dirname + '/dist',
		filename: '[name].js'
	},

	resolve: {
		modules: [
			'./src',
			'node_modules'
		]
	},

	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [autoprefixer()]
						}
					}
				]
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [autoprefixer()]
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'env',
							'react'
						],
						plugins: [
							'transform-class-properties',
							'transform-object-rest-spread'
						],
						cacheDirectory: true,
					}
				}
			}
		]
	},

	plugins: [
		new NoEmitOnErrorsPlugin(),
		new WatchIgnorePlugin(['./node_modules']),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
		})
	]
};
