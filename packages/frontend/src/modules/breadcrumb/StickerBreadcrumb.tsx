import { Breadcrumbs, Item } from "@adobe/react-spectrum";
import { FC, useState } from "react";

interface Props {}

const StickerBreadcrumb: FC<Props> = ({}) => {
  let folders = [
    { id: 1, label: "Home" },
    { id: 2, label: "Sticker X" },
    { id: 3, label: "Edit" },
  ];
  let [folderId, setFolderId] = useState<number>();
  return (
    <div>
      <Breadcrumbs onAction={(a) => setFolderId(a as number)}>
        {folders.map((f) => (
          <Item key={f.id}>{f.label}</Item>
        ))}
      </Breadcrumbs>
      <p>You pressed folder ID: {folderId}</p>
    </div>
  );
};

export default StickerBreadcrumb;
