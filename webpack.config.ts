import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'
import packageJson from './package.json' with { type: 'json' }
import CopyWebpackPlugin from 'copy-webpack-plugin'

const webpackConfig = (env): webpack.Configuration => ({
	entry: './src/index.tsx',
	...(env.production || !env.development ? {} : { devtool: 'eval-source-map' }),
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		plugins: [new TsconfigPathsPlugin()]
	},
	output: {
		path: path.join(import.meta.dirname, '/dist'),
		filename: 'build.js',
		publicPath: env.production ? '/neo-links/' : '/'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				options: {
					transpileOnly: true
				},
				exclude: /dist/
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html'
		}),
		new webpack.DefinePlugin({
			'process.env.PRODUCTION': env.production || !env.development,
			'process.env.NAME': JSON.stringify(packageJson.name),
			'process.env.VERSION': JSON.stringify(packageJson.version)
		}),
		new ForkTsCheckerWebpackPlugin(),
		new ESLintPlugin({ files: './src/**/*.{ts,tsx,js,jsx}', emitWarning: false }),
		new CopyWebpackPlugin({
			patterns: [{ from: 'public/styles.css', to: 'styles.css' }]
		})
	]
})

export default webpackConfig
