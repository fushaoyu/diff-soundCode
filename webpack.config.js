const path = require('path');

module.exports = {
    entry: "./src/index", // string | object | array
    output: {
        publicPath:"xuni",
        filename: "bundle.js", // string
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: false,
        port: 8090,
        open: true,
        watchContentBase: true
    }
}