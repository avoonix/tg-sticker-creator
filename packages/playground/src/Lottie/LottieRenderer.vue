<template>
  <div>
    <fixed-aspect-ratio-box :ratio="1">
      <loader style="position: absolute" v-if="loading" />
      <div ref="div" />
    </fixed-aspect-ratio-box>
    <div v-if="controls">
      <v-slider label="Playback Speed" v-model="speed" min="0" max="2" step="0.01" thumb-label />
      <v-slider
        label="Frame"
        class="no-transition-slider"
        v-model="frame"
        min="0"
        :max="frames"
        step="1"
        :thumb-label="true"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Loader from "@/App/Loader.vue";
import {
  defineComponent,
  onBeforeUnmount,
  ref,
  watch,
  nextTick,
  PropType,
} from "vue";
import lottie, { AnimationItem } from "lottie-web";
import { Lottie } from "tg-sticker-creator";
import FixedAspectRatioBox from "./FixedAspectRatioBox.vue";

export default defineComponent({
  components: { Loader, FixedAspectRatioBox },
  props: {
    lottie: {
      type: Object as PropType<Lottie>,
      required: false,
    },
    controls: {
      type: Boolean,
      default: false,
    },
    paused: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const div = ref<HTMLDivElement>();
    let animation: AnimationItem | null = null;
    const speed = ref(1);
    const frame = ref(0);
    const frames = ref(2);

    const loading = ref(true);

    const clear = () => {
      if (animation) {
        animation.destroy();
        animation = null;
        loading.value = true;
      }
    };

    // const frames = computed(() => animation.value?.totalFrames || 2);

    watch(
      () => props.paused,
      () => {
        handlePaused();
      }
    );

    const handlePaused = () => {
      if (
        typeof animation?.isPaused === "boolean" &&
        animation.isPaused !== props.paused
      ) {
        if (props.paused) {
          animation.pause();
        } else {
          animation.play();
        }
      }
    };

    const play = (animationData: any) => {
      clear();
      if (!animationData) return;
      try {
        if (!div.value) throw new Error("div missing");
        animation = lottie.loadAnimation({
          container: div.value,
          renderer: "svg",
          animationData,
          loop: true,
          autoplay: true,
        });
        animation.setSpeed(speed.value);
        frame.value = 0;
        frames.value = animation.totalFrames;
        animation.addEventListener("enterFrame", () => {
          if (props.paused) {
            handlePaused();
          } else {
            if (animation) frame.value = animation.currentFrame;
          }
        });
        animation.addEventListener("error", (event) => {
          console.log("lottie error event", event); // TODO: display errors
        });
        loading.value = false;
      } catch (error) {
        console.log(error);
      }
    };

    watch(speed, () => {
      animation?.setSpeed(speed.value);
    });

    watch(frame, () => {
      if (
        Math.round(frame.value) !== Math.round(animation?.currentFrame || 0)
      ) {
        animation?.goToAndPlay(frame.value, true);
      }
    });

    onBeforeUnmount(() => {
      clear();
    });

    watch(
      () => props.lottie,
      async () => {
        await nextTick();
        const animationData = props.lottie?.toPlain({precision: Infinity});
        await nextTick();
        play(animationData);
      },
      {
        immediate: true,
        deep: true,
      }
    );

    return {
      div,
      speed,
      frame,
      frames,
      loading,
    };
  },
});
</script>

<style scoped>
.no-transition-slider :deep(.v-slider__track-fill),
.no-transition-slider :deep(.v-slider__thumb-container) {
  transition: none !important;
}
</style>
