const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = {
    entry: {
        main: './src/assets/scripts/index.js',
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
    ],
}

module.exports = config
