<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12"><h1>Not Found</h1></v-col>
        <v-col cols="12">
          <v-btn color="primary" to="/">Home</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { hideFullscreenLoaderOnMount } from "@/App/loader";
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
  props: {},
  setup(props, context) {
    hideFullscreenLoaderOnMount();
    return {};
  },
});
</script>
