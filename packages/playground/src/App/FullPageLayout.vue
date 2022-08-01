<template>
  <div class="fill-page">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {},
  setup(props, context) {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.fill-page {
  height: calc(100vh - 48px);
  // overflow: hidden;
  display: flex;
}
</style>
