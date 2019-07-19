const path = require('path')
const HtmlWebPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebPlugin({
          template: './src/index.html',
          filename: './index.html'
        })
    ],
    devServer: {
        contentBase: './dist',
        compress: true,
        port: 9000,
        watchContentBase: true,
        progress: true,
        disableHostCheck: true,
        publicPath: '/',
        historyApiFallback: true
    }
}