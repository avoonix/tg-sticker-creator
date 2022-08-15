import { Grid, repeat, View } from "@adobe/react-spectrum";
import { FC } from "react";
import VideoCard from "./VideoCard";
import { VideoEntry } from "./VideoEntry";

interface Props {
  videos: VideoEntry[];
}
const VideoCardList: FC<Props> = ({ videos }) => {
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
      {videos.map((entry, idx) => (
        <VideoCard key={idx} entry={entry} />
      ))}
    </Grid>
  );
};

export default VideoCardList;
