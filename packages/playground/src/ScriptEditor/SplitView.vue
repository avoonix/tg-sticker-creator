<template>
  <div class="split-view">
    <div :style="[{ width: `${sidebarWidth}px` }]" class="left">
      <slot name="left" />
    </div>
    <div class="view-divider primary" @mousedown="startDrag" />
    <div class="right">
      <slot name="right" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {},
  setup(props, context) {
    const start = {
      x: 0,
      y: 0,
      sidebarWidth: 0,
    };

    const sidebarWidth = ref(window.innerWidth / 3); // TODO: listen for resize

    const stopEvents = ["mouseup", "keydown", "resize", "scroll", "focusout"];

    const startDrag = (event: MouseEvent) => {
      start.x = event.x;
      start.y = event.y;
      start.sidebarWidth = sidebarWidth.value;

      registerListener(onMove, ["mousemove"]);
      registerListener(onStop, stopEvents);
    };

    const onMove = (event: MouseEvent) => {
      const delta = {
        x: event.x - start.x,
        y: event.y - start.y,
      };

      sidebarWidth.value = start.sidebarWidth + delta.x;
    };

    const onStop = (event: any) => {
      unregisterListener(onMove, ["mousemove"]);
      unregisterListener(onStop, stopEvents);
    };

    const registerListener = (listener: any, events: string[]) => {
      for (const event of events) {
        window.addEventListener(event, listener);
      }
    };

    const unregisterListener = (listener: any, events: string[]) => {
      for (const event of events) {
        window.removeEventListener(event, listener);
      }
    };

    return {
      startDrag,
      sidebarWidth,
    };
  },
});
</script>

<style lang="scss" scoped>
.split-view {
  display: flex;
  flex-direction: row;
  .view-divider {
    flex: 0 0 3px;
    position: relative;
    cursor: ew-resize;
    &::before {
      content: " ";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      transform: translate(-50%, -50%);
      border-left: 3px solid var(--v-primary-base);
      border-right: 3px solid var(--v-primary-base);
      z-index: 1;
      pointer-events: none;
      opacity: 0;
      transition: all 0.2s ease;
    }
    &:hover::before {
      opacity: 1;
    }
  }

  .right {
    flex: 3;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .left {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
}
</style>
