import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdiSvg",
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      dark: {
        primary: "#ff55c8",
        secondary: "#ffd4f1",
        accent: "#316ac6",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
      },
    },
    dark: true,
  },
});
