module.exports = {
  presets: [
    ["@vue/cli-plugin-babel/preset", { jsx: false }],
    ["@babel/preset-react"],
    ["@babel/preset-env"],
  ],
  plugins: [["transform-react-jsx"], ["@babel/plugin-syntax-dynamic-import"]],
};
