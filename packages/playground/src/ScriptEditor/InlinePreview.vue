<template>
  <div class="ma-4">
    <div>
      <v-btn @click="render" class="mb-2 mr-2">Update Preview</v-btn>
      <download-button class="mb-2" v-if="lottie" :lottie="lottie" />
    </div>
    <file-size :lottie="lottie" />
    To use this sticker on telegram, download and send it to
    <a href="https://t.me/Stickers" target="_blank">@Stickers</a>
    {{ error }}
    <lottie-renderer controls :lottie="lottie" />
    <lottie-tree v-if="lottie" :lottie="lottie" />
  </div>
</template>

<script lang="ts">
import { executeScript } from "@/Library/executeScript";
import { defineComponent, PropType, ref, watch } from "vue";
import { Lottie } from "tg-sticker-creator";
import LottieTree from "@/Lottie/LottieTree.vue";
import { useDebounce } from "./debounce";
import DownloadButton from "@/Lottie/DownloadButton.vue";
import FileSize from "@/Lottie/FileSize.vue";
import LottieRenderer from "@/Lottie/LottieRenderer.vue";

export default defineComponent({
  components: { LottieTree, DownloadButton, FileSize, LottieRenderer },
  props: {
    script: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    const lottie = ref<Lottie | null>(null);
    const error = ref<Error | null>(null);

    const render = async () => {
      lottie.value = null;
      const { animation, error: err } = await executeScript(props.script);
      lottie.value = animation;
      error.value = err;
      if (err) {
        throw err;
      }
    };

    const renderDebounced = useDebounce(render, 3000);

    watch(
      () => props.script,
      () => {
        renderDebounced();
      },
      { immediate: true }
    );

    return {
      lottie,
      render,
      error,
    };
  },
});
</script>
