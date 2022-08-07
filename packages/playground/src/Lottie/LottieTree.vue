<template>
  <v-treeview :items="items" open-on-click>
    <template v-slot:prepend="{ item, open }">
      <v-icon v-if="item.icons">
        {{ icons[item.icons][open ? 1 : 0] }}
      </v-icon>
    </template>
    <template #append="{ item, leaf }">
      <span v-if="leaf">
        <tree-value :value="item.value" />
      </span>
    </template>
  </v-treeview>
</template>

<script lang="ts">
import {
  Layer,
  AnimatableValue,
  PreComp,
  Shape,
  LayerTransform,
  TransformShape,
  Lottie,
  PathKeyframe,
  ColorKeyframe,
  OffsetKeyframe,
  GradientKeyframe,
} from "tg-sticker-creator";
import { computed, defineComponent, PropType } from "vue";
import {
  mdiLayers,
  mdiLayersOutline,
  mdiShape,
  mdiShapeOutline,
} from "@mdi/js";
import TreeValue from "./TreeValue.vue";

interface TreeNode {
  name: any;
  value: any;
  children?: TreeNode[];
  id: number;
}

const id = () => Math.random();

const formatNameAndIndex = (
  name: string | undefined,
  idx: string | number | undefined
) => {
  if (name && idx) return `${name} (${idx})`;
  return name || idx || "unnamed";
};

export default defineComponent({
  components: { TreeValue },
  props: {
    lottie: {
      type: Object as PropType<Lottie>,
      required: true,
    },
  },
  setup(props, context) {
    const log = (key: string, val: any) => {
      if (typeof val === "object") {
        console.log(key, val);
      }
    };
    const transformLayers = (layers: Layer[]): TreeNode[] => {
      return layers.map((l) => {
        return {
          name: formatNameAndIndex(l.name, l.index),
          children: transformLayer(l),
          value: l,
          id: id(),
          icons: "layer",
        };
      });
    };

    const transformShapes = (shapes: Shape[]): TreeNode[] => {
      return shapes.map((s) => {
        return {
          name: `${s.name} (${s.type})`,
          children: transformShape(s),
          value: s,
          id: id(),
          icons: "group",
        };
      });
    };

    const transformOptionallyKeyframed = [
      "opacity",
      "rotation",
      "position",
      "anchorPoint",
      "scale",
      "skew",
      "skewAxis",
    ];

    const shapeOptionallyKeyframed = [
      "opacity",
      "color",
      "vertices",
      "width",
      "position",
      "size",
    ];

    const transformOptionallyKyframed = (
      val: AnimatableValue<any, any>
    ): TreeNode[] | undefined => {
      if (!val.animated) return undefined;

      const keyFrames = val.getValue(); // TODO: fix getValue type
      return keyFrames.map(
        (
          keyFrame:
            | PathKeyframe
            | ColorKeyframe
            | OffsetKeyframe
            | GradientKeyframe
        ) => {
          return {
            name: keyFrame.startTime,
            value: keyFrame.startValue,
            id: id(),
            // TODO: display bezier too?
          };
        }
      );
    };

    const transformTransform = (
      transform: TransformShape | LayerTransform
    ): TreeNode[] => {
      return Object.entries(transform).map(([key, value]) => {
        let children = undefined;

        if (transformOptionallyKeyframed.indexOf(key) !== -1 && value) {
          children = transformOptionallyKyframed(value);
        } else {
          log(key, value);
        }

        return {
          name: key,
          children,
          value,
          id: id(),
        };
      });
    };

    const transformShape = (shape: Shape): TreeNode[] => {
      if (shape instanceof TransformShape) {
        return transformTransform(shape);
      }
      return Object.entries(shape).map(([key, value]) => {
        let children = undefined;
        if (key === "shapes") {
          //   children = transformTransform(value);
          // } else if (key === "shapes") {
          children = transformShapes(value);
        } else if (shapeOptionallyKeyframed.indexOf(key) !== -1 && value) {
          children = transformOptionallyKyframed(value);
        } else {
          log(key, value);
        }
        return {
          name: key,
          children,
          value,
          id: id(),
        };
      });
    };

    const transformLayer = (layer: Layer): TreeNode[] => {
      return Object.entries(layer).map(([key, value]) => {
        let children = undefined;
        if (key === "transform") {
          children = transformTransform(value);
        } else if (key === "shapes") {
          children = transformShapes(value);
        } else {
          log(key, value);
        }
        return {
          name: key,
          children,
          value,
          id: id(),
        };
      });
    };

    const transformAsset = (asset: PreComp): TreeNode[] => {
      return Object.entries(asset).map(([key, value]) => {
        let children = undefined;
        if (key === "layers") {
          children = transformLayers(value);
        } else {
          log(key, value);
        }
        // TODO
        return {
          name: key,
          children,
          value,
          id: id(),
        };
      });
    };

    const items = computed(() => {
      return Object.entries(props.lottie).map<TreeNode>(([key, value]) => {
        let children = undefined;
        if (key === "layers") {
          const layers = value as Layer[];
          children = transformLayers(layers);
        } else if (key === "assets") {
          const assets = value as PreComp[];
          children = assets.map<TreeNode>((a) => ({
            name: a.id,
            children: transformAsset(a),
            value: a,
            id: id(),
          }));
        }
        return {
          name: key,
          children,
          value,
          id: id(),
        };
      });
    });

    const icons = {
      layer: [mdiLayers, mdiLayersOutline],
      group: [mdiShape, mdiShapeOutline],
    };

    return {
      items,
      icons,
    };
  },
});
</script>
