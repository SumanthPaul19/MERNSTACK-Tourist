const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = function(_env, argv) {
const isProduction = argv.mode === "production";
const isDevelopment = !isProduction;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
  return {
    mode :"development",
    devtool: isDevelopment && "cheap-module-source-map",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "assets/js/[name].[contenthash:8].js",
      publicPath: "/"
    },
        module: {
          rules: [
            {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true,
                  cacheCompression: false,
                  envName: isProduction ? "production" : "development"
                }
              }
            },
                    {
                      test: /\.css$/,
                      use: [
                        isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                        "css-loader"
                      ]
                     },
 
                     {
                                test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg|jfif|PNG)$/,
                                  use: {
                                    loader: "url-loader",
                                    options: {
                                      limit: 8192,
                                      name: "static/media/[name].[hash:8].[ext]"
                                    }
                                  }
                                 },
          ]

 },
 resolve: {
  extensions: [".js", ".jsx"]
 
 },

 plugins: [
   isProduction &&
     new MiniCssExtractPlugin({
       filename: "assets/css/[name].[contenthash:8].css",
       chunkFilename: "assets/css/[name].[contenthash:8].chunk.css"
     }),
 new HtmlWebpackPlugin({
     template: path.resolve(__dirname, "public/index.html"),
     inject: true
 })
 
 ].filter(Boolean),
 optimization: {
           minimize: isProduction,
           minimizer: [
             new TerserWebpackPlugin({
               terserOptions: {
                 compress: {
                   comparisons: false
                 },
                 mangle: {
                   safari10: true
                 },
                 output: {
                   comments: false,
                   ascii_only: true
                 },
                 warnings: false
               }
             }),
             new OptimizeCssAssetsPlugin()
           ],
           splitChunks: {
                     chunks: "all",
                     minSize: 0,
                     maxInitialRequests: 20,
                     maxAsyncRequests: 20,
                     cacheGroups: {
                       vendors: {
                         test: /[\\/]node_modules[\\/]/,
                         name(module, chunks, cacheGroupKey) {
                           const packageName = module.context.match(
                             /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                           )[1];
                           return `${cacheGroupKey}.${packageName.replace("@", "")}`;
                         }
                       },
                       common: {
                         minChunks: 2,
                         priority: -10
                       }
                     }
                   },
                   runtimeChunk: "single"
     }
};
};
