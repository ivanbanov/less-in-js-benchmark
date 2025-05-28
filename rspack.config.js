import { rspack, SwcJsMinimizerRspackPlugin } from "@rspack/core";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshPlugin from "@rspack/plugin-react-refresh";
import swcrc from "./.swcrc.json" with { type: "json" };
import merge from "lodash.merge";

const { $schema, ...swcConfig } = swcrc;

const isProduction = process.env.NODE_ENV === "production";

export default {
  mode: isProduction ? "production" : "development",
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json", ".html"],
  },
  experiments: {
    futureDefaults: true,
    css: false,
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          process.env.CSS === "extract"
            ? rspack.CssExtractRspackPlugin.loader
            : {
                loader: "style-loader",
                options: {
                  esModule: false,
                },
              },
          {
            loader: "css-loader",
            options: {
              sourceMap: isProduction,
              importLoaders: 1,
              modules: {
                mode: "global",
                exportGlobals: true,
                localIdentName: "[local]-[hash:base64:5]",
              },
            },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                math: "always",
              },
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        loader: "builtin:swc-loader",
        options: merge(swcConfig, {
          jsc: {
            minify: {
              compress: {
                defaults: isProduction,
                global_defs: {
                  "process.env.NODE_ENV": isProduction
                    ? "production"
                    : "development",
                  __DEV__: !isProduction,
                  __PROD__: isProduction,
                },
              },
            },
            transform: {
              react: {
                development: !isProduction,
                refresh: !isProduction,
              },
            },
          },
        }),
      },
    ],
  },
  optimization: {
    chunkIds: isProduction ? "deterministic" : "named",
    moduleIds: isProduction ? "deterministic" : "named",
    providedExports: isProduction,
    sideEffects: isProduction,
    usedExports: isProduction,
    concatenateModules: isProduction,
    runtimeChunk: isProduction && {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
    removeAvailableModules: isProduction,
    removeEmptyChunks: isProduction,
    realContentHash: isProduction,
    minimize: isProduction,
    minimizer: [
      new SwcJsMinimizerRspackPlugin({
        minimizerOptions: {
          format: {
            comments: false,
            ecma: 2021,
          },
        },
      }),
    ],

    innerGraph: false, //isProduction,
    mangleExports: isProduction,
  },
  devtool: false,
  plugins: [
    new rspack.CssExtractRspackPlugin({}),
    new ReactRefreshPlugin({ exclude: /node_modules/ }),
    new HtmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
      },
      scriptLoading: "blocking",
      template: "./src/index.html",
    }),
  ],
};
