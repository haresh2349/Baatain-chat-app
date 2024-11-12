import plugin from "eslint-plugin-react";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
export default {
  mode: "production",
  devtool: "source-map",
  plugins: [new BundleAnalyzerPlugin()],
};
