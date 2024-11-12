import webpack from "webpack";
import dotenv from "dotenv";
const env = dotenv.config().parsed;
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
const envKeys = Object.keys(env)?.reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});
export default {
  mode: "development",
  devServer: {
    hot: true,
    open: true,
  },
  devtool: "cheap-module-source-map",
  plugins: [new webpack.DefinePlugin(envKeys), new ReactRefreshWebpackPlugin()],
};
