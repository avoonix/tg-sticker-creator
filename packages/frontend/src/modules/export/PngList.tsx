import { Button, Content, Image, Text } from "@adobe/react-spectrum";
import { Card } from "@react-spectrum/card";
import { Grid, repeat } from "@react-spectrum/layout";
import Download from "@spectrum-icons/workflow/Download";
import download from "downloadjs";
import { uniqBy } from "lodash";
import { FC, useEffect, useState } from "react";
import { Lottie } from "tg-sticker-creator";
import { ImageMime, renderImages } from "./pngRenderer";

interface Props {
  lottie: Lottie;
}

const PngList: FC<Props> = (props) => {
  const [images, setImages] = useState<{ blob: Blob; src: string }[]>([]);

  const [progress, setProgress] = useState({ percentage: 0 });

  useEffect(() => {
    renderImages(
      props.lottie,
      ImageMime.png,
      {
        width: 512,
        height: 512,
        transparent: true,
        speed: 1,
        fps: 60,
        backgroundColor: "#000000",
      },
      (p) => setProgress(p),
    ).then(async (im) =>
      setImages(
        uniqBy(
          await Promise.all(
            im.map(async (i) => ({
              blob: i,
              data: await i.text(),
              src: URL.createObjectURL(i),
            })),
          ),
          (v) => v.data,
        ),
      ),
    );
  }, [props.lottie]);

  if (!images.length) {
    return <>Rendering: {Math.round(progress.percentage * 100)}%</>;
  }

  return (
    <Grid
      columns={{
        base: repeat("auto-fit", "size-3000"),
        L: repeat("auto-fit", "size-3600"),
      }}
      autoRows={{ base: "size-4000" }}
      gap={{ base: "size-100", L: "size-350" }}
      width="100%"
      justifyContent="center"
    >
      {images.map((entry, idx) => (
        <Card key={idx}>
          <Image src={entry.src} />

          <Text slot="detail">Frame {idx}</Text>

          <Content>
            <Button
              variant="secondary"
              onPress={() =>
                download(entry.blob, `frame${idx}.png`, entry.blob.type)
              }
            >
              <Download />
              <Text>Download</Text>
            </Button>
          </Content>
        </Card>
      ))}
    </Grid>
  );
};

export default PngList;
