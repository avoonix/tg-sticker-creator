import { Breadcrumbs, Item } from "@adobe/react-spectrum";
import { useRouter } from "next/router";
import { FC } from "react";

interface Props {
  stickerName: string;
}

const StickerBreadcrumb: FC<Props> = ({ stickerName }) => {
  const folders = [
    { id: 1, label: "All Stickers" },
    { id: 2, label: stickerName },
  ];

  const router = useRouter();

  return (
    <div>
      <Breadcrumbs isMultiline onAction={() => router.push("/")}>
        {folders.map((f) => (
          <Item key={f.id}>{f.label}</Item>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default StickerBreadcrumb;
