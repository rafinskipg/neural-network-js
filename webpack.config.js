'use strict';

const path = require('path');
const nodeExternals = require('webpack-node-externals')

module.exports = {
    mode: 'production',
    target: 'node',

    entry: {
        main: path.resolve('./src/main.js')
    },

    output: {
        filename: '[name].bundle.node.js',
        path: path.resolve('./public/dist'),
        libraryTarget: 'commonjs'
    },

    externals: [nodeExternals()],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }
};
