<template>
  <v-main>
    <v-slide-y-transition mode="out-in">
      <router-view />
    </v-slide-y-transition>
  </v-main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>
