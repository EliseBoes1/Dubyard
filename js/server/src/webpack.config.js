const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    module: {
        rule: [{
            test: /\.html$/,
            use: [{
                loader: "html-loader",
                options: {
                    minimize: true
                }
            }]
        }]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            output: "../../index.html",
        }),
    ]
}