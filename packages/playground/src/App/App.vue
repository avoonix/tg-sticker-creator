<template>
  <v-app>
    <app-bar />
    <notifications />
    <main-view />
  </v-app>
</template>

<script lang="ts">
import Notifications from "@/Notifications/Notifications.vue";
import { defineComponent } from "vue";
import AppBar from "./AppBar.vue";
import MainView from "./MainView.vue";

export default defineComponent({
  components: {
    AppBar,
    MainView,
    Notifications,
  },
});
</script>

<style lang="scss">
:root {
  --background-color: #121212;
}

html {
  background-color: var(--background-color);
  overflow-y: auto;
}

* {
  box-sizing: border-box;
  scrollbar-color: var(--v-secondary-base) var(--background-color);
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: var(--background-color);
}

::-webkit-scrollbar-thumb {
  background: var(--v-secondary-base);
  border-radius: 10px;
  border: 3px var(--background-color) solid;
}

a {
  color: var(--v-secondary-base);
  text-decoration: none;
}

::selection {
  color: var(--background-color);
  background-color: var(--v-secondary-base);
}

.fill-width {
  width: 100%;
}
</style>
