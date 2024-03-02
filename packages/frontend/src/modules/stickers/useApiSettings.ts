import { useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { paletteAtom } from "../palette/ColorList";
import { configAtom } from "./configAtom";
import { mergeConfig } from "./utilities/merge";

export const useApiSettings = () => {
  const router = useRouter();
  const [userSettings, setUserSettings] = useState({});
  const [userSettingsLoaded, setUserSettingsLoaded] = useState(false);
  const setPalette = useSetAtom(paletteAtom);
  const setConfig = useSetAtom(configAtom);

  const getSetting = async ({ id }: { id: string }): Promise<any> => {
    switch (id) {
      case "8775b344-5ad5-4d65-99d5-b81f8e679e12":
        return JSON.parse(
          '{"emojis": "🫂🤗", "palette": [{"id": 1, "name": "color 0", "color": "#42C5D6"}, {"id": 2, "name": "color 0", "color": "#C2EAF0"}], "sticker": "hug", "settings": {"ych": {"active": true}, "body": {"active": true}, "head": {"active": true}, "base.hug": {"active": true}, "body.base": {"fill": {"paletteId": 1}}, "eyes.open": {"active": true}, "head.base": {"fill": {"paletteId": 2}}, "upper-leg": {"active": true}, "body.belly": {"fill": {"paletteId": 2}, "active": true}, "peek.candy": {"active": true}, "body.throat": {"fill": {"paletteId": 2}, "active": true}, "ears.canine": {"active": true}, "face.muzzle": {"active": true}, "feet.mammal": {"active": true}, "hair.fluffy": {"active": true}, "tail.canine": {"active": true}, "arms.regular": {"active": true}, "base.popping": {"active": true, "duration": 18}, "base.headpats": {"active": true, "duration": 300}, "hands.primate": {"active": true}, "base.halloween": {"active": true}, "effect.outline": {"width": 14, "active": true}, "upper-leg.base": {"fill": {"paletteId": 1}}, "face.muzzle.top": {"fill": {"paletteId": 1}, "active": true}, "head.half.upper": {"fill": {"paletteId": 1}, "active": true}, "base.attribution": {"active": true, "primary": {"paletteId": 1}, "secondary": {"paletteId": 2}}, "ears.canine.base": {"fill": {"paletteId": 1}}, "face.muzzle.base": {"fill": {"paletteId": 2}}, "feet.mammal.base": {"fill": {"paletteId": 1}}, "feet.mammal.toes": {"fill": {"paletteId": 2}}, "hair.fluffy.base": {"fill": {"paletteId": 2}}, "tail.canine.base": {"fill": {"paletteId": 1}}, "arms.regular.base": {"fill": {"paletteId": 1}}, "ears.canine.inner": {"fill": {"paletteId": 2}}, "face.muzzle.snout": {"fill": "#121D1F"}, "face.muzzle.tongue": {"fill": "#D1828E", "active": false}, "hands.primate.base": {"fill": {"paletteId": 2}}, "eyes.open.left.iris": {"fill": "#7FC456", "active": true}, "eyes.open.left.pupil": {"active": true}, "eyes.open.right.iris": {"fill": "#7FC456", "active": true}, "head.eyes-and-cheeks": {"fill": "#FFFFFF"}, "eyes.open.right.pupil": {"active": true}, "upper-leg.inner-thigh": {"fill": {"paletteId": 2}, "active": true}}}',
        );
      case "b28b1f41-10aa-4e37-a0c3-3bcca310cbe5":
        return JSON.parse(
          '{"emojis": "👋🥰💕", "palette": [], "sticker": "headpats", "settings": {"ych": {"active": true}, "body": {"active": true}, "head": {"active": true}, "eyes.open": {"active": true}, "ears.canine": {"active": true}, "face.muzzle": {"active": true}, "feet.mammal": {"active": true}, "hair.fluffy": {"active": true}, "tail.canine": {"active": true}, "arms.regular": {"active": true}, "base.headpats": {"active": true, "duration": 300}, "hands.primate": {"active": true}, "effect.outline": {"width": 20, "active": true}, "eyes.open.left.pupil": {"active": true}, "eyes.open.right.pupil": {"active": true}}}',
        );
      default:
        throw new Error("not found");
    }
  };

  useEffect(() => {
    const id = router.query.config && String(router.query.config);
    if (!id) return;
    console.log("getting settings ...");
    getSetting({ id })
      .then((resp) => {
        console.log("server response", resp);
        setUserSettings(resp.settings);
        setPalette(resp.palette);

        setConfig((old) => {
          const merged = mergeConfig(old, resp.settings);
          setUserSettingsLoaded(true);
          return merged;
        });
      })
      .catch((e) => {
        console.log(e);
        setUserSettingsLoaded(true);
      });
  }, [router.query.config]);

  return {
    userSettings,
    userSettingsLoaded,
  };
};
