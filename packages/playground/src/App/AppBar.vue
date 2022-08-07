<template>
  <v-app-bar app color="primary" dark dense elevate-on-scroll>
    <div class="d-flex align-center no-wrap">tg-sticker-creator Demo</div>

    <v-tabs right center-active show-arrows>
      <v-tabs-slider color="secondary"></v-tabs-slider>

      <v-tab
        v-for="item in items"
        :key="item.to"
        exact
        :to="item.to"
        class="secondary--text"
      >
        {{ item.title }}
      </v-tab>
    </v-tabs>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {},
  setup(props, context) {
    const items = [{ to: "/", title: "Example From Readme" }];
    return {
      items,
    };
  },
});
</script>

<style lang="scss" scoped>
.no-wrap {
  white-space: nowrap;
}
</style>
