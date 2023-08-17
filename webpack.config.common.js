const DotenvWebpackPlugin = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = {
    entry: {
        main: './src/assets/scripts/pages/index/index.js',
        compare: './src/assets/scripts/pages/compare/index.js',
    },
    output: {
        clean: true,
        assetModuleFilename: './assets/images/[name].[contenthash][ext]',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
            {
                test: /\.(?:jpg|jpeg|svg|png)$/,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['main'],
        }),
        new HtmlWebpackPlugin({
            template: './src/compare.html',
            filename: 'compare.html',
            chunks: ['compare'],
        }),
        new DotenvWebpackPlugin(),
    ],
}

module.exports = config
