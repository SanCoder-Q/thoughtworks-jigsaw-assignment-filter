const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const distFolder = path.join(__dirname, 'dist');

module.exports = {
    context: __dirname,
    entry: {
        background: './src/background/background',
        config: './src/options/config',
        vendor: './src/vender/vender'
    },
    output: {
        path: distFolder,
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    plugins:[
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new CopyWebpackPlugin([
            { from: 'src/manifest.json' },
            { from: 'src/readme.html' },
            { from: 'src/css', to: 'css' },
            { from: 'resources', to: 'resources' },
            { from: 'src/options/config.html' }
        ])
    ]
};
