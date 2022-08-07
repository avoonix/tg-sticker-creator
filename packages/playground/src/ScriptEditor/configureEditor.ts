import libTypes from "!!raw-loader!../../generated/tg-sticker-creator.d.ts";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { configureTheme } from "./theme";
import { addExtraLibs, updateLibFile } from "./registerLibs";
import { BuilderColorProvider } from "./BuilderColorProvider";
import { TgslibHoverProvider } from "./TgslibHoverProvider";

export const arrayToType = (arr: string[]) =>
  arr.map((s) => `"${s.replaceAll('"', '\\"')}"`).join("|");

const generateGlobalDeclaration = () => `
import { Lottie, create as c, enums as en, easings as ea } from "tg-sticker-creator";

declare global {
  const animation: Lottie;
  const create: typeof c;
  const enums: typeof en;
  const easings: typeof ea;
}
`;

export const configureMonacoEditorOnce = (() => {
  let configured = false;
  return () => {
    if (!configured) configureMonacoEditor();
    configured = true;
  };
})();

export const configureMonacoEditor = () => {
  configureTheme();
  // https://github.com/microsoft/TypeScript/tree/master/lib
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    // lib: ["es2020"],
    // allowSyntheticDefaultImports: true,
    // isolatedModules: false,
    allowJs: true,
    esModuleInterop: true,
    strict: true,
    target: monaco.languages.typescript.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.System,
    noEmit: true,
    typeRoots: ["node_modules/@types"],
    alwaysStrict: true,
    skipLibCheck: true,
    strictNullChecks: false,
  });

  addExtraLibs([
    { content: libTypes, path: `/node_modules/@types/tg-sticker-creator/index.d.ts` },
  ]);

  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    diagnosticCodesToIgnore: [1375],
    //   noSemanticValidation: false,
    //   noSuggestionDiagnostics: false,
    //   onlyVisible: false,
    //   noSyntaxValidation: false,
  });

  updateLibFile(generateGlobalDeclaration(), "/lib/global.d.ts");

  const provider = new BuilderColorProvider();
  monaco.languages.registerColorProvider("typescript", provider);

  monaco.languages.registerHoverProvider(
    "typescript",
    new TgslibHoverProvider()
  );
};
