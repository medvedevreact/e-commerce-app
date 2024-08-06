import path from "path";
import { Configuration } from "webpack";
import { buildResolvers } from "./config/build/buildResolvers";
import { buildLoaders } from "./config/build/buildLoaders";
import { buildPlugins } from "./config/build/buildPlugins";
import {
  BuildEnv,
  BuildOptions,
  BuildPaths,
} from "./config/build/types/config";
import { buildDevServer } from "./config/build/buildDevServer";

export default (env: BuildEnv) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    build: path.resolve(__dirname, "build"),
    html: path.resolve(__dirname, "public", "index.html"),
  };

  const mode = env.mode || "development";
  const isDev = mode === "development";
  const port = env.port || 3001;

  const buildOptions: BuildOptions = {
    paths: paths,
    mode: mode,
    isDev: isDev,
    port: port,
  };

  const config: Configuration = {
    mode: mode,
    entry: buildOptions.paths.entry,
    output: {
      filename: "[name].[contenthash].js",
      path: buildOptions.paths.build,
      clean: true,
    },
    plugins: buildPlugins(buildOptions),
    module: {
      rules: buildLoaders(buildOptions),
    },
    resolve: {
      extensions: buildResolvers(),
    },
    devtool: "inline-source-map",
    devServer: buildDevServer(buildOptions),
  };

  return config;
};
