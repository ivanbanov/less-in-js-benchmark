import { rspack } from "@rspack/core";
import ReactRefreshPlugin from "@rspack/plugin-react-refresh";
import swcrc from "./.swcrc.json" with { type: "json" };
import merge from "lodash.merge";

const { $schema, ...swcConfig } = swcrc;

const isProduction = process.env.NODE_ENV === "production";

export default {
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
          {
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
  plugins: [
    // new rspack.CssExtractRspackPlugin({})
    new ReactRefreshPlugin(),
    new rspack.HtmlRspackPlugin({
      template: "./src/index.html",
    }),
  ],
};
