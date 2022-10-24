import { useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSetting } from "../export/requests";
import { paletteAtom } from "../palette/ColorList";
import { configAtom } from "./useSticker";
import { mergeConfig } from "./utilities/merge";

export const useApiSettings = () => {
  const router = useRouter();
  const [userSettings, setUserSettings] = useState({});
  const [userSettingsLoaded, setUserSettingsLoaded] = useState(false);
  const setPalette = useSetAtom(paletteAtom);
  const [config, setConfig] = useAtom(configAtom);

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
  }, [router.query]);

  return {
    userSettings,
    userSettingsLoaded,
  };
};
