import React from "react";
import {useCurrentFrame, useVideoConfig, spring, interpolate} from "remotion";
import {SafeArea} from "../../layout/SafeArea";
import {Hi} from "../SubtitleBar";
import {poppins} from "../../fonts";
import {tokens} from "../../theme";
import {regions, SRC} from "../../data/metrics";
import {koWon} from "../../util/format";

/**
 * Scene 3 — the "debt map". Stylized abstract regions (not real geography)
 * light up one by one. Swap these blocks for GeoJSON paths later if desired.
 */
export const MetroMapScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <SafeArea
      source={SRC.loan}
      subtitle={
        <>
          서울만? 아닙니다. 수도권 전체가 <Hi color={tokens.danger}>빨간불</Hi>
          입니다.
        </>
      }
    >
      <div style={{display: "flex", flexDirection: "column", gap: 28, width: "100%"}}>
        {regions.map((r, i) => {
          const enter = spring({
            frame,
            fps,
            delay: 16 + i * 24,
            config: {damping: 200, mass: 0.7},
          });
          const opacity = interpolate(enter, [0, 1], [0.15, 1]);
          const x = interpolate(enter, [0, 1], [-40, 0]);
          // color intensity scales with debt (Seoul deepest)
          const t = i === 0 ? 1 : i === 1 ? 0.66 : 0.42;

          return (
            <div
              key={r.key}
              style={{
                opacity,
                transform: `translateX(${x}px)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "34px 40px",
                borderRadius: 24,
                backgroundColor: tokens.surface1,
                borderLeft: `10px solid ${tokens.danger}`,
                filter: `saturate(${0.5 + t}) brightness(${0.85 + t * 0.15})`,
              }}
            >
              <span
                style={{
                  fontFamily: poppins,
                  fontWeight: 500,
                  fontSize: 64,
                  color: tokens.textPrimary,
                }}
              >
                {r.label}
              </span>
              <span
                style={{
                  fontFamily: poppins,
                  fontWeight: 500,
                  fontSize: 60,
                  color: tokens.danger,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {koWon(r.debt)}원
              </span>
            </div>
          );
        })}
      </div>
    </SafeArea>
  );
};
