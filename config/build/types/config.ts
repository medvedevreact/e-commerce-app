export interface BuildPaths {
  entry: string;
  build: string;
  html: string;
}

export interface BuildOptions {
  paths: BuildPaths;
  mode: "development" | "production";
  isDev: boolean;
  port: number;
}
export interface BuildEnv {
  mode: "development" | "production";
  port: number;
}
