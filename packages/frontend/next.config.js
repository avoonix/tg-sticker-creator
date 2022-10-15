const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const withTM = require("next-transpile-modules")([
  "@adobe/react-spectrum",
  "@react-spectrum/actiongroup",
  "@react-spectrum/breadcrumbs",
  "@react-spectrum/button",
  "@react-spectrum/buttongroup",
  "@react-spectrum/calendar",
  "@react-spectrum/checkbox",
  "@react-spectrum/combobox",
  "@react-spectrum/contextualhelp",
  "@react-spectrum/datepicker",
  "@react-spectrum/dialog",
  "@react-spectrum/divider",
  "@react-spectrum/form",
  "@react-spectrum/icon",
  "@react-spectrum/illustratedmessage",
  "@react-spectrum/image",
  "@react-spectrum/label",
  "@react-spectrum/layout",
  "@react-spectrum/link",
  "@react-spectrum/list",
  "@react-spectrum/listbox",
  "@react-spectrum/menu",
  "@react-spectrum/meter",
  "@react-spectrum/numberfield",
  "@react-spectrum/overlays",
  "@react-spectrum/picker",
  "@react-spectrum/progress",
  "@react-spectrum/provider",
  "@react-spectrum/radio",
  "@react-spectrum/slider",
  "@react-spectrum/searchfield",
  "@react-spectrum/statuslight",
  "@react-spectrum/switch",
  "@react-spectrum/table",
  "@react-spectrum/tabs",
  "@react-spectrum/text",
  "@react-spectrum/textfield",
  "@react-spectrum/theme-dark",
  "@react-spectrum/theme-default",
  "@react-spectrum/theme-light",
  "@react-spectrum/tooltip",
  "@react-spectrum/view",
  "@react-spectrum/well",
  "@react-spectrum/card",
  "@react-spectrum/color",
  "@react-spectrum/tag",
  "@react-spectrum/accordion",
  "@spectrum-icons/ui",
  "@spectrum-icons/workflow",
]);

module.exports = withTM({
  // Your Next.js configuration
  reactStrictMode: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: "raw-loader",
    });

    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(__dirname, "node_modules/@ffmpeg/core/dist"),
            to: path.join(__dirname, "public/ffmpeg"),
          },
          {
            from: path.join(__dirname, "node_modules/ccapture.js/build/CCapture.all.min.js"),
            to: path.join(__dirname, "public/CCapture.all.min.js"),
          },
          {
            from: path.join(__dirname, "node_modules/gif.js/dist/gif.worker.js"),
            to: path.join(__dirname, "public/gif.worker.js"),
          },
          {
            from: path.join(__dirname, "node_modules/gif.js/dist/gif.worker.js.map"),
            to: path.join(__dirname, "public/gif.worker.js.map"),
          },
        ],
      }),
    );

    return config;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "cross-origin-opener-policy", value: "same-origin" },
          // { key: "cross-origin-embedder-policy", value: "require-corp" },
          { key: "cross-origin-embedder-policy", value: "credentialless" },
        ],
      },
    ];
  },
});
