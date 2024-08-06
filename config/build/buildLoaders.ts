import { RuleSetRule } from "webpack";
import { BuildOptions } from "./types/config";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

export function buildLoaders(buildOptions: BuildOptions): RuleSetRule[] {
  //Если не используется TS, то нужен babel-loader
  return [
    {
      test: /\.s[ac]ss$/i,
      use: [
        buildOptions.isDev ? "style-loader" : MiniCssExtractPlugin.loader,

        {
          loader: "css-loader",
          options: {
            modules: {
              namedExport: false,
              exportLocalsConvention: "as-is",
              auto: (resPath: string) =>
                resPath.endsWith(".module.scss") ||
                resPath.endsWith(".module.sass"),

              localIdentName: buildOptions.isDev
                ? "[path][name]___[local]"
                : "[hash:base64:8]",
            },
          },
        },

        "sass-loader",
      ],
    },
    {
      test: /\.tsx?$/,
      use: "ts-loader",
      exclude: /node_modules/,
    },
  ];
}
