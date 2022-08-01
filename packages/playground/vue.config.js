const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const webpack = require("webpack");

const { exec } = require("child_process");

if (process.env.NODE_ENV === "development")
  exec(
    "yarn rollup -c rollup.types.config.js --watch",
    (err, stdout, stderr) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      }
    }
  );

module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: (config) => {
    config.plugin("monaco-editor-plugin").use(MonacoWebpackPlugin, [
      {
        languages: ["json", "javascript", "typescript"],
      },
    ]);

    config.module.rules.delete("eslint");

    config.plugin("disable-react-devtool-hint").use(webpack.DefinePlugin, [
      {
        __REACT_DEVTOOLS_GLOBAL_HOOK__: "({ isDisabled: true })",
      },
    ]);
  },
};
