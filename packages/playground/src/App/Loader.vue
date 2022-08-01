<template>
  <div
    class="loader-container"
    :style="`--loader-color: var(--v-${vuetifyColor}-base);`"
  >
    <span class="loader"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    vuetifyColor: {
      type: String,
      default: "secondary",
    },
  },
});
</script>

<style lang="scss" scoped>
// TODO: change dimensions to make it always centered for lottie-renderer
.loader-container {
  width: 100%;
  height: 100%;
  padding: 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

// .loader defined in index.html
</style>
