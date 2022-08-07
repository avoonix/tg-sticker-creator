import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { editor, languages } from "monaco-editor/esm/vs/editor/editor.api";
import { EasingArray, EasingName, easings } from "tg-sticker-creator";

const createViewBox = (paddingX: number, paddingY: number) =>
  `${-paddingX} ${-paddingY} ${1 + paddingX * 2} ${1 + paddingY * 2}`;
const viewBox = createViewBox(0.3, 0.1);

const generateSvg = (g: string, viewBox: string) => {
  const svg = `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="150" height="150" viewBox="${viewBox}">
${g}
</svg>
`;
  const input = svg
    .split("\n")
    .map((i) => i.trim())
    .join("");
  return "data:image/svg+xml;base64," + btoa(input);
};

const generateGroup = (easing: EasingArray) => {
  const handle1Y = 1 - easing[1];
  const handle2Y = 1 - easing[3];
  const handle1 = `M 0,1 L ${easing[0]},${handle1Y}`;
  const handle2 = `M 1,0 L ${easing[2]},${handle2Y}`;
  const easingPath = `M 0,1 c ${easing[0]},${-easing[1]} ${
    easing[2]
  },${-easing[3]} 1,-1`;

  return ` 
<g>
  <path d="${handle1}" style="fill: none; stroke: rgb(255, 85, 200); stroke-width: 0.01" />
  <path d="${handle2}" style="fill: none; stroke: rgb(255, 85, 200); stroke-width: 0.01" />

  <path d="${easingPath}" style="fill: none; stroke: rgb(255, 212, 241); stroke-width: 0.02" />

  <circle cx="${easing[0]}" cy="${handle1Y}" r="0.02" style="fill: rgb(255, 85, 200);" />
  <circle cx="${easing[2]}" cy="${handle2Y}" r="0.02" style="fill: rgb(255, 85, 200);" />
</g>
`;
};

export const easingToSvg = (easing: EasingArray) =>
  generateSvg(generateGroup(easing), viewBox);

export const isEasingName = (arg: any): arg is EasingName => arg in easings;

export class TgslibHoverProvider implements languages.HoverProvider {
  provideHover(
    model: editor.ITextModel,
    position: monaco.Position,
    token: monaco.CancellationToken
  ): languages.ProviderResult<languages.Hover> {
    const range = model.getLineContent(position.lineNumber);
    const word = model.getWordAtPosition(position);
    if (!word) return;
    if (!isEasingName(word.word)) return;
    const easing = easings[word.word];

    if (word) {
      return {
        contents: [
          { value: word.word },
          {
            value: `![easing](${easingToSvg(easing)})`,
          },
        ],
        range: new monaco.Range(
          position.lineNumber,
          word.startColumn,
          position.lineNumber,
          word.endColumn
        ),
      };
    }

    return null;
  }
}
