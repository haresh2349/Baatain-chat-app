import { merge } from "webpack-merge";
import commonConfig from "./webpack.common.js";
import prodConfigs from "./webpack.prod.js";
import devConfigs from "./webpack.dev.js";
export default (envVars) => {
  const { env } = envVars;
  const envConfig = env === "prod" ? prodConfigs : devConfigs;
  const config = merge(commonConfig, envConfig);
  debugger;
  return config;
};
