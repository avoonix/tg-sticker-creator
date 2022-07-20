import { defineNuxtPlugin } from "#app";
import { createVuetify } from "vuetify";
import { VApp, VBtn, VMain } from "vuetify/components";

// Import everything
// import * as components from 'vuetify/components'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      VApp,
      VBtn,
      VMain,
    },
    directives: {},
  });
  nuxtApp.vueApp.use(vuetify);
});
