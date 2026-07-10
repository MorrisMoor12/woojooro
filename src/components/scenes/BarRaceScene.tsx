import React from "react";
import {useCurrentFrame, useVideoConfig, spring, interpolate} from "remotion";
import {SafeArea} from "../../layout/SafeArea";
import {Hi} from "../SubtitleBar";
import {poppins} from "../../fonts";
import {tokens} from "../../theme";
import {regions, SRC} from "../../data/metrics";
import {pct} from "../../util/format";

/** Scene 4 — 2-year debt growth as vertical bars racing up; Seoul wins. */
export const BarRaceScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const maxPct = Math.max(...regions.map((r) => r.growth));
  const maxBar = 620;

  return (
    <SafeArea
      source={SRC.loan}
      subtitle={
        <>
          빚 느는 <Hi color={tokens.danger}>속도</Hi>, 서울이 2년 새 8.3% — 평균의
          두 배입니다.
        </>
      }
    >
      <div style={{display: "flex", alignItems: "flex-end", gap: 56, height: maxBar + 120}}>
        {regions.map((r, i) => {
          const grow = spring({
            frame,
            fps,
            delay: 12 + i * 20,
            config: {damping: 200, mass: 0.9},
          });
          const h = interpolate(grow, [0, 1], [0, (r.growth / maxPct) * maxBar]);
          const isLead = r.key === "seoul";
          const tag = spring({frame, fps, delay: 78, config: {damping: 12, stiffness: 140}});

          return (
            <div key={r.key} style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 20}}>
              <span
                style={{
                  fontFamily: poppins,
                  fontWeight: 500,
                  fontSize: 52,
                  color: isLead ? tokens.danger : tokens.textSecondary,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {pct(r.growth)}
              </span>
              <div
                style={{
                  width: 120,
                  height: h,
                  borderRadius: "16px 16px 6px 6px",
                  backgroundColor: isLead ? tokens.danger : tokens.surface2,
                  border: isLead ? "none" : `1px solid ${tokens.border}`,
                  position: "relative",
                }}
              >
                {isLead ? (
                  <div
                    style={{
                      position: "absolute",
                      top: 18,
                      left: "50%",
                      transform: `translateX(-50%) scale(${interpolate(tag, [0, 1], [0.4, 1])})`,
                      padding: "6px 16px",
                      borderRadius: 10,
                      backgroundColor: "rgba(20, 20, 19, 0.28)",
                      color: tokens.textPrimary,
                      fontFamily: poppins,
                      fontWeight: 500,
                      fontSize: 30,
                      whiteSpace: "nowrap",
                    }}
                  >
                    1위
                  </div>
                ) : null}
              </div>
              <span style={{fontFamily: poppins, fontWeight: 400, fontSize: 44, color: tokens.textPrimary}}>
                {r.label}
              </span>
            </div>
          );
        })}
      </div>
    </SafeArea>
  );
};
