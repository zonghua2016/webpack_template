const merge = require("webpack-merge");
const common = require("./webpack.base.config");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
// const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true, // 使用多进程提高构建速度
        extractComments: false, // 禁止生成license文件
        terserOptions: {
          compress: {
            // 删除console.log代码
            drop_console: true,
            pure_funcs: ["console.log"],
          },
          output: {
            comments: false, // 删除注释代码
          },
        },
      }),
    ],
    splitChunks: {
      chunks: "all",
      maxAsyncRequests: 8,
      maxInitialRequests: 6,
      minSize: 10000,
      cacheGroups: {
        react: {
          // 分离react和react-dom
          name: "chunk-react",
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/, // 匹配规则
          priority: 20, // 匹配优先级
        },
        vendors: {
          // 其他npm依赖（生产环境）
          name: "chunk-vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: "initial",
        },
        common: {
          // 组件公共抽离
          name: "chunk-common",
          minChunks: 2,
          priority: -20,
          chunks: "initial",
          reuseExistingChunk: true,
        },
      },
    },
  },
});
