import React from "react";
import {useCurrentFrame, useVideoConfig, spring, interpolate} from "remotion";
import {SafeArea} from "../../layout/SafeArea";
import {Hi} from "../SubtitleBar";
import {CountUp} from "../CountUp";
import {poppins} from "../../fonts";
import {tokens} from "../../theme";
import {debt, SRC} from "../../data/metrics";
import {koWon} from "../../util/format";

/** Scene 2 — the shock number: Seoul per-capita debt vs national average. */
export const CountUpScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const chip = spring({frame, fps, delay: 42, config: {damping: 200, mass: 0.6}});
  const chipOpacity = interpolate(chip, [0, 1], [0, 1]);

  return (
    <SafeArea
      source={SRC.loan}
      subtitle={
        <>
          <Hi color={tokens.danger}>4억 8천만 원.</Hi> 전국 평균보다 1억 4천만 원
          더 많습니다.
        </>
      }
    >
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 44}}>
        <CountUp to={debt.seoul} format={koWon} color={tokens.danger} size={128} suffix="원" />
        <div
          style={{
            opacity: chipOpacity,
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "16px 26px",
            borderRadius: 16,
            backgroundColor: tokens.surface1,
            border: `1px solid ${tokens.border}`,
            fontFamily: poppins,
            fontSize: 34,
            color: tokens.textSecondary,
          }}
        >
          전국 평균
          <span style={{color: tokens.textPrimary, fontWeight: 500}}>
            {koWon(debt.nationalAvg)}원
          </span>
        </div>
      </div>
    </SafeArea>
  );
};
