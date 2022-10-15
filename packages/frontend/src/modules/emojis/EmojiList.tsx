import { Text } from "@adobe/react-spectrum";
import { Item, TagGroup } from "@react-spectrum/tag";
import { FC } from "react";
import { Emoji } from "./Emoji";

interface Props {
  emojis: Emoji[];
}

const EmojiList: FC<Props> = ({ emojis }) => {
  return (
    <TagGroup
      aria-label="tag group"
      items={emojis.map((e) => ({ key: e.encoded, label: e.name }))}
    >
      {(item: { key: string; label: string }) => (
        <Item key={item.key} textValue={item.label}>
          <Text>
            {item.key} {item.label}
          </Text>
        </Item>
      )}
    </TagGroup>
  );
};

export default EmojiList;
