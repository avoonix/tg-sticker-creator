<template>
  <full-page-layout
    class="d-flex flex-row fill-height"
    style="justify-content: stretch;"
  >
    <script-editor class="grow" style="height: 100%" :script.sync="script" />
    <!-- <script-editor style="height: 100%" :script.sync="script" /> -->
    <!-- <script-editor style="height: 100%" :script.sync="script" /> -->
  </full-page-layout>
</template>

<script lang="ts">
import FullPageLayout from "@/App/FullPageLayout.vue";
import { hideFullscreenLoaderOnMount } from "@/App/loader";
import { defaultScript } from "@/ScriptEditor/defaultScript";
import { defineComponent, ref } from "vue";
import ScriptEditor from "../ScriptEditor/ScriptEditor.vue";

export default defineComponent({
  components: {
    ScriptEditor,
    FullPageLayout,
  },
  props: {},
  setup(props, context) {
    hideFullscreenLoaderOnMount();
    const script = ref<string>(defaultScript);

    return {
      script,
    };
  },
});
</script>
