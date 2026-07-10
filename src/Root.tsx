import React from "react";
import {Composition} from "remotion";
import {Video, TOTAL_FRAMES} from "./Video";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ShortsSelfEmployed"
      component={Video}
      durationInFrames={TOTAL_FRAMES}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
