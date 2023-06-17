import {
  Button,
  Content,
  Flex,
  Heading,
  IllustratedMessage,
  Text,
} from "@adobe/react-spectrum";
import { Card } from "@react-spectrum/card";
import Edit from "@spectrum-icons/workflow/Edit";
import Export from "@spectrum-icons/workflow/Export";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useCallback } from "react";
import EmojiList from "../emojis/EmojiList";
import style from "./index.module.css";
import { VideoEntry } from "./VideoEntry";
import Link from "next/link";
import SpectrumLink from "../editor/SpectrumLink";

interface Props {
  entry: VideoEntry;
}

const VideoCard: FC<Props> = ({ entry }) => {
  const router = useRouter();

  const url = (step: number) =>
    `/edit/${entry.stickerId}/step/${step}?config=${encodeURIComponent(
      entry.settingId || "",
    )}`;

  return (
    <Card>
      <IllustratedMessage height="100%">
        <img
          className={style.stickerVideo}
          src={entry.url}
          style={{ aspectRatio: 1 }}
          alt="Sticker Preview"
          loading="lazy"
        />
      </IllustratedMessage>
      <Text slot="detail">TGS</Text>
      <Heading>{entry.name}</Heading>
      <Content>
        <Flex direction="column" gap="size-300">
          <EmojiList emojis={entry.emojis} />
          <Flex
            direction="column"
            gap="size-100"
            justifyContent="end"
            width="100%"
          >
            <Button elementType={SpectrumLink} variant="cta" href={url(1)}>
              <Edit />
              <Text>Customize</Text>
            </Button>
            <Button elementType={SpectrumLink} variant="cta" href={url(4)}>
              <Export />
              <Text>Export</Text>
            </Button>
          </Flex>
        </Flex>
      </Content>
    </Card>
  );
};

export default VideoCard;
