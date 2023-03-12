const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require("path");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";
  const isDev = !isProd;

  const filename = (ext) =>
    isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`;

  return {
    target: "web",
    context: path.resolve(__dirname, "src"),
    entry: {
      // main: ['@babel/polyfill', './script.js'],
      main: ["@babel/polyfill", "./script.ts"],
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: filename("js"),
      clean: true,
    },
    devServer: {
      port: 3000,
      open: true,
      hot: true,
      watchFiles: "./",
    },
    resolve: {
      extensions: [".js"],
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@core": path.resolve(__dirname, "src", "core"),
      },
    },
    devtool: isDev ? "source-map" : false,
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
    optimization: {
      minimizer: ["...", new CssMinimizerPlugin()],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
      new CopyPlugin({
        patterns: [{ from: "static", to: "static" }],
      }),
      new MiniCssExtractPlugin({
        filename: filename("css"),
      }),
    ],
  };
};
