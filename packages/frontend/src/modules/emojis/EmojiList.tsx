import { FC } from "react";
import { Emoji } from "./Emoji";
import { Item, TagGroup } from "@react-spectrum/tag";
import { Icon, Text } from "@adobe/react-spectrum";

interface Props {
  emojis: Emoji[];
}

const EmojiList: FC<Props> = ({ emojis }) => {
  return (
    <TagGroup
      aria-label="tag group"
      items={emojis.map((e) => ({ key: e.encoded, label: e.name }))}
    >
      {(item) => (
        <Item key={item.key} textValue={item.label}>
          <Text>{item.key} {item.label}</Text>
        </Item>
      )}
    </TagGroup>
  );
};

export default EmojiList;
