const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./client/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/index.html",
    }),
  ],
  resolve: {
    modules: [__dirname, "client", "node_modules"],
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png|svg|jpg|gif$/,
        use: ["file-loader"],
      },
    ],
  },
  devtool: 'eval-source-map',
  mode: process.env.NODE_ENV,
  devServer: {
    compress: true,
    port: 8080,
    historyApiFallback: true, // Enable history API fallback for React Router
    host: 'localhost',
    hot: true,
    static: {
        directory: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    proxy: {
        '/api/**': {
            target: 'HTTP://localhost:3000/',
            secure: false
        },
        '/assets/**': {
            target: 'HTTP://localhost:3000/',
            secure: false
        }
    }
  },

};