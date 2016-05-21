var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

    entry: {
        main: __dirname + '/src/js/main.js'
    },
    output: {
        path: __dirname + '/public',
        filename: 'main.js'
    },

    module: {
        loaders: [
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('style', 'css!stylus')
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                loader: 'file?name=[path][name].[ext]?[hash]'
            }
        ]
    },

    resolve: {
        root: __dirname
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: 'body',
            filename: 'index.html',
            template: __dirname + '/src/index.html'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('[name].css', {
            allChunks: true,
            disable: process.env.NODE_ENV == 'development'
        })
    ],

    devServer: {
        contentBase: './public',
        hot: true,
        inline: true
    }
};
