const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
      main : path.resolve(__dirname, "src/index.js"),
      event : path.join(__dirname, "src/event.js"),
      donation : path.join(__dirname, "src/donation.js"),
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
      },{
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/assets/images/*',
          to: 'assets/images/[name][ext]',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      filename:'index.html', 
      template: path.resolve(__dirname, "src/index.html"),
      chunks : ["main"]
    }),
    new HtmlWebpackPlugin({
        filename:'event.html', 
        template: path.resolve(__dirname, "src/event.html"),
        chunks : ["event"]
      }),
    new HtmlWebpackPlugin({
        filename:'donation.html', 
        template: path.resolve(__dirname, "src/donation.html"),
        chunks : ["donation"]
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