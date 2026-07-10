import React from "react";
import {useCurrentFrame, useVideoConfig, spring, interpolate} from "remotion";
import {poppins} from "../fonts";
import {motion} from "../theme";

/**
 * Decelerating number count-up. Restraint over spectacle:
 * a spring settle + gentle scale-in, no violent shake.
 */
export const CountUp: React.FC<{
  to: number;
  format: (n: number) => string;
  color: string;
  size?: number;
  delay?: number;
  suffix?: string;
}> = ({to, format, color, size = 190, delay = 0, suffix = ""}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame, fps, delay, config: motion.countSpring});
  // round before formatting so intermediate floats never leak into 억/만 output
  const value = Math.round(interpolate(p, [0, 1], [0, to]));
  const scale = interpolate(p, [0, 1], [0.92, 1]);

  return (
    <div
      style={{
        fontFamily: poppins,
        fontWeight: 500,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: "-0.02em",
        color,
        transform: `scale(${scale})`,
        fontVariantNumeric: "tabular-nums",
        display: "flex",
        alignItems: "baseline",
        justifyContent: "center",
        gap: 8,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{whiteSpace: "nowrap"}}>{format(value)}</span>
      {suffix ? (
        <span style={{fontSize: size * 0.42, fontWeight: 400}}>{suffix}</span>
      ) : null}
    </div>
  );
};
