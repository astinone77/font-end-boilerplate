const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const NODE_MODULES = path.resolve('node_modules');

module.exports = {
	entry:{
		meta:"./src/js/demo.js"
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:"js/[name].js",
		libraryTarget: "umd",
		publicPath: "/"
	},
	resolve:{
		modules: [ 'node_modules' ],
		extensions: ['.js', '.styl','.css']
	},
	target: "web", // enum
	module:{
		rules:[
			{
		        test: /\.(jsx?)$/,
		        loader: 'babel-loader',
		        exclude:[NODE_MODULES]
		    },
		    {
		    	test:/\.styl|css$/,
		    	use:[
		    		{
		    			loader:"style-loader"
		    		},
		    		{
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                    	loader:'stylus-loader'
                    }
                ],
                exclude:[NODE_MODULES]
		    },
		    {
		    	test:/\.(png|jpg|svg|gif)$/,
		    	loader:'file-loader',
		    	options:{
		    		outputPath:'images/'
		    		//useRelativePath:true
		    	}
		    }
		]
	},
	devServer: {
	  	contentBase: path.join(__dirname, "dist"),
	  	hot:true,
	  	compress: true,
	  	open:true,
	  	port: 9000
	},
	plugins: [
		new HtmlWebpackPlugin({
		  	template:'./src/demo.html'
	  	}),
	  	new webpack.HotModuleReplacementPlugin()
	]
}