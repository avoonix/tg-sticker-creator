import { parse } from "acorn";
import { ancestor } from "acorn-walk";
import { CancellationToken, editor, languages, Range } from "monaco-editor/esm/vs/editor/editor.api";
import tinycolor from "tinycolor2";

import {parse as parseLoose} from "acorn-loose";
// import * as acornLoose from "acorn-loose/dist/acorn-loose.js";

const options: acorn.Options = {
  ecmaVersion: 2019,
  allowAwaitOutsideFunction: true,
};

export class BuilderColorProvider implements languages.DocumentColorProvider {
  provideDocumentColors(
    model: editor.ITextModel,
    token: CancellationToken
  ): languages.ProviderResult<languages.IColorInformation[]> {
    const colors: languages.IColorInformation[] = [];
    const parseColorNode = (node: any) => {
      if (node.type !== "Literal") return;
      const startPos = model.getPositionAt(node.start);
      const endPos = model.getPositionAt(node.end);
      try {
        const c = tinycolor(node.value);
        if (!c.isValid()) {
          return;
        }
        const range = Range.fromPositions(startPos, endPos);
        colors.push({
          color: {
            alpha: c.toRgb().a,
            blue: c.toRgb().b / 255,
            red: c.toRgb().r / 255,
            green: c.toRgb().g / 255,
          },
          range,
        });
      } catch (error) {
        console.log(error);
      }
    };
    try {
      let ast: ReturnType<typeof parse>;
      try {
        ast = parse(model.getValue(), options);
      } catch (error) {
        if (!(error instanceof SyntaxError)) {
          console.log(error);
        }
      }
      ast = parseLoose(model.getValue(), options);
      ancestor(ast, {
        CallExpression(node: any, state, ancestors) {
          if (node?.callee?.property?.name === "createColorInput") {
            if (node.arguments[1]) {
              parseColorNode(node.arguments[1]);
            }
          }
          if (node?.callee?.property?.name === "color") {
            if (node.arguments[0]) {
              parseColorNode(node.arguments[0]);
            }
          }
        },
      });
      return colors;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  provideColorPresentations(
    model: editor.ITextModel,
    colorInfo: languages.IColorInformation,
    token: CancellationToken
  ): languages.ProviderResult<languages.IColorPresentation[]> {
    const rgbArr = [
      colorInfo.color.red,
      colorInfo.color.green,
      colorInfo.color.blue,
    ];
    const isRatio =
      rgbArr.find((c) => Math.round(c) !== c) && !rgbArr.find((c) => c > 1);
    const raw = {
      r: rgbArr[0],
      g: rgbArr[1],
      b: rgbArr[2],
      a: colorInfo.color.alpha,
    };
    const color = isRatio ? tinycolor.fromRatio(raw) : tinycolor(raw);
    const hex = color.toHex8String();

    return [
      {
        label: `"${hex}"`,
      },
    ];
  }
}
