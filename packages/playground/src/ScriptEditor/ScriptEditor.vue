<template>
  <split-view>
    <template #left>
      <div style="width: 100%; height: 100%; overflow: scroll">
        <console-dialog />
        <inline-preview :script="script" />
      </div>
    </template>
    <template #right>
      <div ref="div" :style="{ height: '100%', width: '100%' }"></div>
    </template>
  </split-view>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import LottieRenderer from "@/Lottie/LottieRenderer.vue";
import ConsoleDialog from "./ConsoleDialog.vue";
import InlinePreview from "./InlinePreview.vue";
import SplitView from "./SplitView.vue";
import { configureMonacoEditorOnce } from "./configureEditor";

export default defineComponent({
  components: {
    LottieRenderer,
    ConsoleDialog,
    InlinePreview,
    SplitView,
  },
  props: {
    script: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    configureMonacoEditorOnce();

    const div = ref();
    const onChange = (val: any) => {
      val = String(val);
      if (props.script !== val) {
        context.emit("update:script", val);
      }
    };
    watch(
      () => props.script,
      () => {
        const model = editor.value?.getModel();
        if (!model) return;
        if (model.getValue() !== props.script) {
          model.setValue(props.script);
        }
      }
    );
    const editor = ref<monaco.editor.IStandaloneCodeEditor>();
    onMounted(() => {
      const mainFileUrl = monaco.Uri.file("main.tsx");
      const model =
        monaco.editor.getModel(mainFileUrl) ||
        monaco.editor.createModel(props.script, "typescript", mainFileUrl);
      model.setValue(props.script);
      model.onDidChangeContent(() => {
        onChange(model.getValue());
      });
      editor.value = monaco.editor.create(div.value, {
        model,
        automaticLayout: true,
        fontFamily: "Fira Code,Droid Sans Mono,Consolas,Lucida Console,Courier New,monospace",
        fontLigatures: true,
        codeLensFontFamily: "Fira Code,Droid Sans Mono,Consolas,Lucida Console,Courier New,monospace",
      });
    });

    const getScript = async () => {
      return editor.value?.getModel()?.getValue() || "";
    };

    return {
      div,
      getScript,
    };
  },
});
</script>
