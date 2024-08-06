import webpack, { WebpackPluginInstance } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { BuildOptions } from "./types/config";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

export function buildPlugins(
  buildOptions: BuildOptions
): WebpackPluginInstance[] {
  return [
    new HtmlWebpackPlugin({
      template: buildOptions.paths.html,
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css",
    }),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(buildOptions.isDev),
    }),
  ];
}
