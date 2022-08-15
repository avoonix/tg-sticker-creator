import { FC, useCallback, useId } from "react";
import { Card } from "@react-spectrum/card";
import {
  Button,
  Content,
  Flex,
  Heading,
  IllustratedMessage,
  Text,
  View,
} from "@adobe/react-spectrum";
import { VideoEntry } from "./VideoEntry";
import style from "./index.module.css";
import Edit from "@spectrum-icons/workflow/Edit";
import EmojiList from "../emojis/EmojiList";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  entry: VideoEntry;
}

const VideoCard: FC<Props> = ({ entry }) => {
  const router = useRouter();

  const handleNavigation = useCallback(() => {
    router.push("/edit");
  }, [entry]);

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
