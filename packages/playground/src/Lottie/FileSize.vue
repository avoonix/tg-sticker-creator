<template>
  <v-progress-linear
    :indeterminate="size === 0"
    height="30"
    :value="sizePercentage"
  >
   {{ sizePercentage }}% ({{ sizeInKb(size) }}KB) used of Telegram's 64KB limit 
  </v-progress-linear>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
  watch,
} from "vue";
import { calculateFileSize } from "../Lottie/calculateFileSize";
import LottieRenderer from "../Lottie/LottieRenderer.vue";
import { Lottie } from "tg-sticker-creator";
import DownloadButton from "@/Lottie/DownloadButton.vue";

export const sizeInKb = (bytes: number) =>
  Math.round((bytes / (1 << 10)) * 10) / 10;

export default defineComponent({
  components: { LottieRenderer, DownloadButton },
  props: {
    lottie: {
      type: Object as PropType<Lottie>,
      required: false,
    },
  },
  setup(props, context) {
    const size = ref(0);

    const sizePercentage = computed(() =>
      Math.round((size.value / (64 << 10)) * 100)
    );

    const recalculateSize = async () => {
      size.value = 0;
      size.value = props.lottie ? await calculateFileSize(props.lottie) : 0;
    };

    watch(() => props.lottie, recalculateSize, { immediate: true });

    return {
      sizePercentage,
      size,
      sizeInKb,
      recalculateSize,
    };
  },
});
</script>
