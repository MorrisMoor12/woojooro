import React from "react";
import {Audio, staticFile, interpolate} from "remotion";
import {TOTAL_FRAMES} from "../audio/narration";

/**
 * Background music bed under the whole timeline. Kept low so narration stays
 * dominant, with a short fade-in and a fade-out into the ending.
 */
export const Bgm: React.FC<{volume?: number}> = ({volume = 0.13}) => {
  return (
    <Audio
      src={staticFile("audio/bgm.wav")}
      volume={(f) =>
        interpolate(
          f,
          [0, 20, TOTAL_FRAMES - 50, TOTAL_FRAMES],
          [0, volume, volume, 0],
          {extrapolateLeft: "clamp", extrapolateRight: "clamp"},
        )
      }
    />
  );
};
