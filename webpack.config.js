const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "none",
  entry: {
    "graphology-gremlin": ["./src/index.ts"],
    "rgraphology-gremlin.min": "./src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "./lib/umd"),
    filename: "[name].js",
    library: "graphology-gremlin",
    libraryTarget: "umd",
    globalObject: "this",
  },
  devtool: "source-map",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
      }),
    ],
  },
  stats: {
    errorDetails: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
  externals: {
    graphology: "graphology",
  },
};
