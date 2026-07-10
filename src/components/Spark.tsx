import React from "react";
import {useCurrentFrame, useVideoConfig, spring, interpolate} from "remotion";
import {tokens} from "../theme";

/**
 * Claude's radial sunburst / spark mark. This is the ONE place Clay is used —
 * "Clay is Claude's color", reserved for the brand mark only.
 */
export const Spark: React.FC<{size?: number; delay?: number}> = ({
  size = 96,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, delay, config: {damping: 12, stiffness: 120, mass: 0.6}});
  const scale = interpolate(enter, [0, 1], [0.4, 1]);
  const rotate = interpolate(enter, [0, 1], [-45, 0]);

  const rays = 8;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{transform: `scale(${scale}) rotate(${rotate}deg)`}}
    >
      {Array.from({length: rays}).map((_, i) => {
        const angle = (i * 360) / rays;
        return (
          <rect
            key={i}
            x={47}
            y={8}
            width={6}
            height={34}
            rx={3}
            fill={tokens.brand}
            transform={`rotate(${angle} 50 50)`}
          />
        );
      })}
      <circle cx={50} cy={50} r={9} fill={tokens.brand} />
    </svg>
  );
};
