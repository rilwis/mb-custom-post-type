const path = require('path');

// https://www.cssigniter.com/how-to-use-external-react-components-in-your-gutenberg-blocks/
const externals = {
	'react': 'React',
	'react-dom': 'ReactDOM',
};

const commonModules = {
	rules: [
		{
			test: /\.js/,
			exclude: /node_modules/,
			use: {
			loader: 'babel-loader',
				options: {
					plugins: ['@babel/plugin-transform-react-jsx', '@babel/plugin-proposal-class-properties']
				}
			}
		},
		{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}
	]
}

const CptConfig = {
	entry: './app/post-type/App.js',
	output: {
		filename: 'post-type.js',
		path: path.resolve( __dirname, './js' )
	},
	externals,
	module: commonModules
}

const CptResult = {
	entry: './app/post-type/Result.js',
	output: {
		filename: 'post-type-result.js',
		path: path.resolve( __dirname, './js' )
	},
	externals,
	module: commonModules
}

const TaxonomyConfig = {
	entry: './app/taxonomy/App.js',
	output: {
		filename: 'taxonomy.js',
		path: path.resolve( __dirname, './js' )
	},
	externals,
	module: commonModules
}

const TaxonomyResult = {
	entry: './app/taxonomy/Result.js',
	output: {
		filename: 'taxonomy-result.js',
		path: path.resolve( __dirname, './js' )
	},
	externals,
	module: commonModules
}

module.exports = [ CptConfig, CptResult, TaxonomyConfig, TaxonomyResult ];