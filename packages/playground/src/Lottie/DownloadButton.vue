<template>
  <v-btn @click="doDownload">Download</v-btn>
</template>

<script lang="ts">
import { objectToTgs } from "@/Library/tgsConverter";
import { defineComponent, ref } from "vue";
import download from "downloadjs";
import { Lottie } from "tg-sticker-creator";

export default defineComponent({
  props: {
    lottie: {
      type: Lottie,
      required: true,
    },
  },
  setup(props, context) {
    const doDownload = async () => {
      download(
        await objectToTgs(props.lottie),
        `${props.lottie.name || "sticker"}.tgs`,
        "application/gzip"
      );
    };
    return {
      doDownload,
    };
  },
});
</script>
