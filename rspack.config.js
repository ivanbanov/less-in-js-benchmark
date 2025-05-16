import { experiments, rspack } from "@rspack/core";
import ReactRefreshPlugin from "@rspack/plugin-react-refresh";

const isProduction = process.env.NODE_ENV === "production";

export default {
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
                mode: (resourcePath) => {
                  if (/\.less$/i.test(resourcePath)) {
                    return "global";
                  }

                  if (/\.css$/i.test(resourcePath)) {
                    return "global";
                  }

                  return "global";
                },
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
        exclude: [/node_modules/],
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
            },
            transform: {
              react: {
                development: !isProduction,
                refresh: !isProduction,
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
};
