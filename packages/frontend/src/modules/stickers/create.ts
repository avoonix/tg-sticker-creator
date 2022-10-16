import { GroupShape, Lottie } from "tg-sticker-creator";
import { getEffect } from "./effects";
import { Group, StickerConfig } from "./execute";
import { complexShape, FilterDefinition, simpleShape } from "./utilities";

// **traits** are usually mutually exclusive whereas **patterns** are what defines their colors and markings
// "feet": ["feet.bird", "feet.mammal"], // reptile/dragon
// "face": ["face.beak", "face.muzzle"], // reptile/dragon
// "hair": ["hair.fluffy", "hair.none"], // long, short
// "ears": ["ears.canine", "ears.none"], // rodent, bunny
// "hands": ["hands.primate"], // hoofs, reptile, paws
// "eyes": ["eyes.open"], // closed
import _options from "./groups.json";
import _data from "./data.json";
import { getDefaultValues } from "./utilities/getDefaultValues";

const options = _options as {
  mutuallyExclusiveTraits: { [key: string]: string[] };
  optionalTraits: { [key: string]: string[] };
};

const data = _data as {
  defaultColors: Record<string, string>;
};

const filterTagRegex = /\[(?<name>\S+)\]/;

export async function createStepsNew(
  animation: Lottie,
): Promise<{ groups: Group[]; tags: string[]; defaultConfig: StickerConfig }> {
  const names = animation
    .all(["["], { match: "indexof" })
    .filter((it): it is GroupShape => it.is("GroupShape"))
    .map((it) => it.name)
    .filter((name): name is string => !!name);

  const flags: { [idx: string]: string[] } = {};

  const entries = names
    .map((name) => ({ match: filterTagRegex.exec(name), original: name }))
    .map(({ match, original }) => {
      const regex = /\{(?<flag>.*?)\}/g;
      let match2: RegExpExecArray | null = null;
      const name = match?.groups?.name;
      if (match && name) {
        while ((match2 = regex.exec(original))) {
          const flag = match2.groups?.flag;
          if (flag) {
            if (!flags[name]) flags[name] = [];
            flags[name].push(flag);
          }
        }
      }
      return name;
    })
    .filter((name): name is string => !!name)
    .map((name) => [name, true as boolean] as const);

  const allTraits = Object.fromEntries(
    [
      ...Object.entries(options.mutuallyExclusiveTraits),
      ...Object.entries(options.optionalTraits),
    ].flatMap((val) => val[1].map((v) => [v, val[0]])),
  );

  const features = Object.fromEntries(entries);
  const usedFeatures = Object.fromEntries(entries.map((a) => [a[0], false]));

  const groups: Group[] = [];

  const activeFeatures: any = {};

  const activePatterns: string[] = [];

  for (const key of Object.keys(features)) {
    const feature = allTraits[key];
    if (feature) {
      activeFeatures[feature] = true;
    } else {
      activePatterns.push(key);
    }
  }

  const defaultConfig: StickerConfig = {};

  for (const feature of Object.keys(activeFeatures)) {
    const t = options.mutuallyExclusiveTraits[feature];
    const o = options.optionalTraits[feature];
    const available: string[] = (t || o).filter((a) => features[a]);
    const alts: FilterDefinition[] = available.map((f): FilterDefinition => {
      const id = `feature.${feature}.${f}`;
      const effect = getEffect(f, id);
      return (
        effect ??
        complexShape(id, f, [
          {
            makeVisible: [[`[${f}]`]],
            colorable: [],
          },
        ])
      );
    });

    available.forEach((a) => (usedFeatures[a] = true));

    const altPatterns: FilterDefinition[] = activePatterns
      .filter((pattern) => available.find((a) => pattern.startsWith(a)))
      .map((pattern): FilterDefinition => {
        const parent = available.find((a) => pattern.startsWith(a))!; // TODO: duplicate line of code
        usedFeatures[pattern] = true;
        const id = `feature.${feature}.${pattern}`;
        const mandatory = !!flags[pattern]?.includes("mandatory");
        const parentId = `feature.${feature}.${parent}`;

        const step = simpleShape({
          id,
          displayName: pattern,
          paths: [[`[${pattern}]`]],
          visible: ({ config, enableIds, disableIds }) =>
            (config[parentId]?.active || enableIds.includes(parentId)) &&
            !disableIds.includes(parentId),
          mandatory,
          defaultColor: data.defaultColors[pattern] ?? "#ffffff",
          defaultPaletteId: undefined, // TODO: set default palette id
        });
        // if (mandatory) {
        //   defaultConfig[id] = {
        //     active: true,
        //     ...getDefaultValues(step.inputs),
        //   };
        // }
        return step;
      });

    if (!alts[0]) debugger;

    if (t) {
      // only a single selection allowed at a time
      defaultConfig[alts[0].id] = {
        active: true,
        ...getDefaultValues(alts[0].inputs),
      };
    }

    groups.push(
      {
        name: feature,
        steps: alts,
        multiple: !t,
      },
      {
        name: `${feature} patterns`,
        steps: altPatterns,
        multiple: true,
      },
    );
  }

  return {
    groups: groups.filter((g) => g.steps.length),
    tags: Object.keys(features),
    defaultConfig,
  };
}