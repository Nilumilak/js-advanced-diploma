const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader',
                ],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'main.html',
        }),
        new MiniCSSExtractPlugin(),
    ],
};
