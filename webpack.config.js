const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
      main : path.resolve(__dirname, "src/index.js"),
      event : path.join(__dirname, "src/event.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename:'index.html', 
      template: path.resolve(__dirname, "src/index.html"),
      chunks : ["main"]
    }),
    new HtmlWebpackPlugin({
        filename:'event.html', 
        template: path.resolve(__dirname, "src/event.html"),
        chunks : ["event"]
      })
  ],
  devtool: "source-map",
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, './dist'),
    open: true,
    port: 4000
  }
};