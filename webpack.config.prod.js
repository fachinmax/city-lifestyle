const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { merge } = require('webpack-merge')
const configBase = require('./webpack.config.common.js')
const configProd = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './assets/scripts/[name].bundle.[contenthash].js',
    },
    module: {
        rules: [
            {
                test: /\.(?:sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './assets/styles/[name].[contenthash].css',
        }),
    ],
    mode: 'production',
}

module.exports = merge(configBase, configProd)
