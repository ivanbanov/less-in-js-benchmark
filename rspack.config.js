import { experiments, rspack } from "@rspack/core";
import ReactRefreshPlugin from "@rspack/plugin-react-refresh";

const isProd = process.env.NODE_ENV === "production";

export default {
  module: {
    parser: {
      "css/auto": {
        namedExports: false,
      },
    },
    rules: [
      {
        test: /\.less$/,
        use: [
          // "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
              modules: true,
            },
          },
          "postcss-loader",
          "less-loader",
        ],
        type: "javascript/auto",
      },
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
            },
            transform: {
              react: {
                development: !isProd,
                refresh: !isProd,
              },
            },
          },
        },
        type: "javascript/auto",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json", ".html"],
  },
  plugins: [
    // new rspack.CssExtractRspackPlugin({})
    new ReactRefreshPlugin(),
    new rspack.HtmlRspackPlugin({
      template: "./src/index.html",
    }),
  ],
  experiments: {
    css: true,
  },
};
