<template>
  <span>{{ displayValue }}</span>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    value: {},
  },
  setup(props, context) {
    const displayValue = computed(() => {
      if (props.value === undefined) return "undefined";
      if (props.value === null) return "null";
      return JSON.stringify(props.value);
    });
    return {
      displayValue,
    };
  },
});
</script>
