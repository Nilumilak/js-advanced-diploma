const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },

    plugins: [
        new MiniCSSExtractPlugin()
    ]
}