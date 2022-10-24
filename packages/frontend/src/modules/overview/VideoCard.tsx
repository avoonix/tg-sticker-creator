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
import { useRouter } from "next/router";
import { FC, useCallback } from "react";
import EmojiList from "../emojis/EmojiList";
import style from "./index.module.css";
import { VideoEntry } from "./VideoEntry";

interface Props {
  entry: VideoEntry;
}

const VideoCard: FC<Props> = ({ entry }) => {
  const router = useRouter();

  const handleNavigation = useCallback(() => {
    router.push(
      `/edit/${entry.stickerId}?config=${encodeURIComponent(
        entry.settingId || "",
      )}`,
    );
  }, [entry, router]);

  return (
    <Card>
      <IllustratedMessage height="100%">
        <video
          autoPlay
          playsInline
          muted
          loop
          className={style.stickerVideo}
          src={entry.url}
          style={{ aspectRatio: 1 }}
        />
      </IllustratedMessage>
      <Text slot="detail">TGS</Text>
      <Heading>{entry.name}</Heading>
      <Content>
        <Flex direction="column" gap="size-300">
          <EmojiList emojis={entry.emojis} />
          <Flex
            direction="row"
            gap="size-100"
            justifyContent="end"
            width="100%"
          >
            <Button elementType="a" variant="cta" onPress={handleNavigation}>
              <Edit />
              <Text>Customize</Text>
            </Button>
          </Flex>
        </Flex>
      </Content>
    </Card>
  );
};

export default VideoCard;
