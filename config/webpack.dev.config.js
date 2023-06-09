const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.base.config");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  output: {
    filename: "js/[name].[hash:8].js",
    chunkFilename: "js/[name].js",
  },
  devServer: {
    open: true,
    port: 8000,
    compress: true,
    hot: true,
    inline: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
