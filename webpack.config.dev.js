const path = require('path')
const { merge } = require('webpack-merge')
const configBase = require('./webpack.config.common.js')
const configDev = {
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: './assets/scripts/[name].js',
    },
    module: {
        rules: [
            {
                test: /\.(?:sa|sc|c)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    devServer: {
        open: true,
        hot: true,
        watchFiles: ['./src/**/*.html'],
    },
    devtool: 'source-map',
    mode: 'development',
}

module.exports = merge(configBase, configDev)
