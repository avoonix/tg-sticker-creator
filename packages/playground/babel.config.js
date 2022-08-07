module.exports = {
  presets: [
    ["@vue/cli-plugin-babel/preset", { jsx: false }],
    ["@babel/preset-env"],
  ],
  plugins: [["@babel/plugin-syntax-dynamic-import"]],
};
