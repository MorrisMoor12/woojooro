import React from "react";
import {useCurrentFrame, useVideoConfig, spring, interpolate} from "remotion";
import {lora} from "../fonts";
import {tokens} from "../theme";

/** Narration caption. Serif (Lora) = Claude's voice. Soft fade+rise on entry. */
export const SubtitleBar: React.FC<{children: React.ReactNode}> = ({children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 200, mass: 0.6}});
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const y = interpolate(enter, [0, 1], [18, 0]);

  return (
    <div
      style={{
        fontFamily: lora,
        fontWeight: 400,
        fontSize: 56,
        lineHeight: 1.35,
        color: tokens.textPrimary,
        opacity,
        transform: `translateY(${y}px)`,
        maxWidth: "100%",
        wordBreak: "keep-all",
        whiteSpace: "pre-line",
      }}
    >
      {children}
    </div>
  );
};

/** Inline emphasis inside a subtitle, tinted by the scene's active role color. */
export const Hi: React.FC<{color: string; children: React.ReactNode}> = ({
  color,
  children,
}) => <span style={{color, fontWeight: 500}}>{children}</span>;
