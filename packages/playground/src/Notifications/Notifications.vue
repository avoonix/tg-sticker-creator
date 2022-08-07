<template>
  <div class="notification-container">
    <v-snackbar app absolute bottom right :value="open" :timeout="-1">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="closeNotification">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useNotification } from "./notify";

export default defineComponent({
  props: {},
  setup(props, context) {
    const { notification, closeNotification, open } = useNotification();

    const text = computed(
      () => notification.value?.text || "missing notification text"
    );

    return {
      notification,
      closeNotification,
      open,
      text,
    };
  },
});
</script>

<style lang="scss" scoped>
.notification-container {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 10;
}
</style>
