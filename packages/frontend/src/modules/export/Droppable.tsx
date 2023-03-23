import { useClipboard, useDrop } from "@react-aria/dnd";
import { useRef } from "react";
import { FocusRing, mergeProps, useButton } from "react-aria";
import dropzoneStyles from "./Droppable.module.scss";
import { classNames } from "@react-spectrum/utils";
import { DropItem } from "@react-types/shared";
import { useSetAtom } from "jotai";
import { configAtom } from "../stickers/configAtom";
import { mergeConfig } from "../stickers/utilities/merge";
import { paletteAtom } from "../palette/ColorList";

export function Droppable({ children }: any) {
  const setConfig = useSetAtom(configAtom);
  const setPalette = useSetAtom(paletteAtom);
  const type = "file";
  const ref: any = useRef();
  const { dropProps, isDropTarget } = useDrop({
    ref,
    onDrop: (e) => handleDropItems(e.items),
    getDropOperation(types, allowedOperations) {
      return !type || types.has(type) ? allowedOperations[0] : "cancel";
    },
  });

  const { clipboardProps } = useClipboard({
    onPaste: (items) => handleDropItems(items),
  });

  const { buttonProps } = useButton(
    {
      elementType: "div",
      onPress: () => {
        // TODO: trigger file input
      },
    },
    ref,
  );

  const handleDropItems = async (items: DropItem[]) => {
    for (const item of items) {
      if (item.kind === "file") {
        handleFile(await item.getFile());
        return;
      }
    }
  };

  const handleFile = async (file: File) => {
    const text = await file.text();
    try {
      const { settings, palette } = JSON.parse(text);
      setPalette(palette);
      setConfig((old) => {
        const merged = mergeConfig(old, settings);
        return merged;
      });
      console.log(settings);
    } catch (err: any) {
      console.log(err);
      alert("file invalid");
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) =>
          e.target.files?.length && handleFile(e.target.files[0])
        }
      />
      <FocusRing focusRingClass={classNames(dropzoneStyles, "focus-ring")}>
        <div
          {...mergeProps(dropProps, buttonProps, clipboardProps)}
          ref={ref}
          className={classNames(dropzoneStyles, "spectrum-Dropzone", {
            "is-dragged": isDropTarget,
          })}
        >
          Drop here
          {children}
        </div>
      </FocusRing>
    </div>
  );
}
