const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	/* Aquí indicamos el elemento inicial de nuestra app.
	O sea, nuestro punto de entrada */
	entry: './src/index.js',

	/* Ahora indicamos cual va a ser el archivo de salida,
	donde va a estar todo el código que compile */
	output: {
		/* Aquí indicamos donde queremos que se guarde el proyecto */
		path: path.resolve(__dirname, 'dist'),
		/* Y colocamos el nombre del .js que va guardar */
		filename: '[name].[contenthash].js',
		assetModuleFilename: 'assets/fonts/[hash][ext][query]'
	},
	/* Activar el modo desarrollo del archivo */
	mode: 'development',
	devtool: 'source-map',
	/* Vamos a indicar con extensiones vamos a trabajar en
	este proyecto */
	resolve: {
		/* Importante pasar las extensiones con las que vamos a
		trabajar, como .jsx (React.js)  */
		extensions: ['.js'],
		alias: {
			'@utils' :path.resolve(__dirname, 'src/utils/'),
			'@templates' :path.resolve(__dirname, 'src/templates/'),
			'@styles' :path.resolve(__dirname, 'src/styles/'),
			'@images' :path.resolve(__dirname, 'src/assets/images/'),
		}
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css|.styl$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'stylus-loader'
				],
			},
			{
				test: /\.png/,
				type: 'asset/resource'
			},
			{
				test: /\.(woff | woff2)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000,
						mimetype: "application/font-woff",
						name: "[name].[contenthast].[ext]",
						outputPath: "./assets/fonts/",
						publicPath: "../assets/fonts/",
						esModule: false,
					}
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: './public/index.html',
			filename: './index.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'assets/[name].[contenthash].css'
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "src", "assets/images"),
					to: "assets/images"
				}
			]
		}),
		new Dotenv(),
		new BundleAnalyzerPlugin(),
	],
	devServer: {
		static: path.join(__dirname, 'dist'),
		compress: true,
		historyApiFallback: true,
		port: 3006,
	},
}