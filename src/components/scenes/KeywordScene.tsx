import React from "react";
import {useCurrentFrame, useVideoConfig, spring, interpolate} from "remotion";
import {SafeArea} from "../../layout/SafeArea";
import {Hi} from "../SubtitleBar";
import {Spark} from "../Spark";
import {poppins} from "../../fonts";
import {tokens} from "../../theme";
import {solutions, SRC} from "../../data/metrics";

/**
 * Scene 7 — the turn. Red gives way to green (success). Three solution pills,
 * the Clay spark mark (Claude brand), and the CTA.
 */
export const KeywordScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <SafeArea
      source={SRC.closure}
      subtitle={
        <>
          살아남는 사람들은 딱 세 가지. 댓글에{" "}
          <Hi color={tokens.success}>업종</Hi>만 남겨주세요.
        </>
      }
    >
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 40}}>
        <Spark size={104} delay={4} />
        <div style={{display: "flex", flexDirection: "column", gap: 26, width: "100%"}}>
          {solutions.map((s, i) => {
            const enter = spring({
              frame,
              fps,
              delay: 18 + i * 18,
              config: {damping: 16, stiffness: 130, mass: 0.7},
            });
            const opacity = interpolate(enter, [0, 1], [0, 1]);
            const y = interpolate(enter, [0, 1], [30, 0]);
            return (
              <div
                key={s}
                style={{
                  opacity,
                  transform: `translateY(${y}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  padding: "30px 40px",
                  borderRadius: 20,
                  backgroundColor: tokens.successTint,
                  border: `1px solid ${tokens.success}`,
                }}
              >
                <span
                  style={{
                    fontFamily: poppins,
                    fontWeight: 500,
                    fontSize: 40,
                    color: tokens.success,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  0{i + 1}
                </span>
                <span style={{fontFamily: poppins, fontWeight: 500, fontSize: 56, color: tokens.textPrimary}}>
                  {s}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </SafeArea>
  );
};
