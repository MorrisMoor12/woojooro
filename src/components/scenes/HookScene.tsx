import React from "react";
import {useCurrentFrame, useVideoConfig, spring, interpolate} from "remotion";
import {SafeArea} from "../../layout/SafeArea";
import {Hi} from "../SubtitleBar";
import {poppins} from "../../fonts";
import {tokens} from "../../theme";
import {SRC} from "../../data/metrics";

/** Scene 1 — a single question, no data yet. Just build curiosity. */
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const breathe = Math.sin((frame / fps) * Math.PI * 1.2) * 0.04 + 1;
  const enter = spring({frame, fps, config: {damping: 14, stiffness: 120, mass: 0.7}});
  const scale = interpolate(enter, [0, 1], [0.6, 1]) * breathe;

  return (
    <SafeArea
      source={SRC.loan}
      subtitle={
        <>
          서울 사장님 한 명당 <Hi color={tokens.danger}>빚</Hi>,{"\n"}얼마일 것
          같으세요?
        </>
      }
    >
      <div
        style={{
          width: 300,
          height: 300,
          borderRadius: 300,
          border: `3px solid ${tokens.border}`,
          backgroundColor: tokens.surface1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${scale})`,
        }}
      >
        <span
          style={{
            fontFamily: poppins,
            fontWeight: 500,
            fontSize: 190,
            color: tokens.danger,
          }}
        >
          ?
        </span>
      </div>
    </SafeArea>
  );
};
