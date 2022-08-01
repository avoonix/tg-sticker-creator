import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

export const addExtraLibs = (libs: { content: string; path: string }[]) => {
  monaco.languages.typescript.typescriptDefaults.setExtraLibs(
    libs.map((l) => ({
      content: l.content,
      filePath: monaco.Uri.file(l.path).toString(true),
    }))
  );
  for (const lib of libs) {
    monaco.editor.createModel(
      lib.content,
      "typescript",
      monaco.Uri.file(lib.path)
    );
  }
};

export const updateLibFile = (source: string, path: string) => {
  const url = monaco.Uri.file(path);
  const libs = monaco.languages.typescript.typescriptDefaults.getExtraLibs();
  libs[url.toString()] = {
    content: source,
    version: 1,
  };
  const list = Object.entries(libs).map(([path, lib]) => ({
    content: lib.content,
    filePath: path,
  }));
  monaco.languages.typescript.typescriptDefaults.setExtraLibs(list);
};
