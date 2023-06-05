const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: { // 入口配置
    app: './src/index.js'
  },
  output: { // 出口配置
      filename: 'js/[name].[contenthash:8].js',
      path: path.resolve(__dirname, '../dist'),
      chunkFilename: 'js/[name].[contenthash:8].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      hash: false,
      title: 'webpack_test'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[id].[contenthash:8].css',
      ignoreOrder: true
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        options: {
          cacheDirectory: true
        },
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        options: {
          esModule: false,
          limit: 4096, // 配置低于4k的图片会转为base64格式
        },
        loader: 'url-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // 处理字体文件
        options: {
          esModule: false
        },
        loader: 'file-loader'
      },
    ]
  }
}