const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
	DefinePlugin,
	NoEmitOnErrorsPlugin,
	WatchIgnorePlugin
} = require('webpack');
const autoprefixer = require('autoprefixer');
const { join } = require('path');
const { NODE_ENV } = process.env;

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
		path: join(__dirname, 'dist'),
		filename: '[name].js'
	},

	resolve: {
		modules: [
			'./src',
			'node_modules'
		],
		alias: {
			components: join(__dirname, 'src', 'components'),
			containers: join(__dirname, 'src', 'containers'),
			layouts: join(__dirname, 'src', 'layouts'),
			reducers: join(__dirname, 'src', 'reducers'),
			store: join(__dirname, 'src', 'store'),
			utils: join(__dirname, 'src', 'utils'),
		},
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
		new DefinePlugin({
			__DEV__: NODE_ENV === 'development'
		}),
		new NoEmitOnErrorsPlugin(),
		new WatchIgnorePlugin(['./node_modules']),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
		})
	]
};
