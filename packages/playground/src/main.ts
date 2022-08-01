import "firacode";
import "reflect-metadata";
import Vue from "vue";
import App from "./App/App.vue";
import { registerGlobalErrorHandlers } from "./Notifications/globalHandler";
import vuetify from "./plugins/vuetify";
import router from "./router";

registerGlobalErrorHandlers();

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
