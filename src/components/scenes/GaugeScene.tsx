import React from "react";
import {useCurrentFrame, useVideoConfig, spring, interpolate} from "remotion";
import {SafeArea} from "../../layout/SafeArea";
import {Hi} from "../SubtitleBar";
import {poppins} from "../../fonts";
import {tokens} from "../../theme";
import {risk, SRC} from "../../data/metrics";
import {pct} from "../../util/format";

/** Scene 5 — delinquency gauge (1.6%, a 4-year high) + "+50% overdue" chip. */
export const GaugeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // gauge sweeps a 180° arc; 1.6% mapped onto a 0..3% dial
  const p = spring({frame, fps, config: {damping: 200, mass: 0.9}});
  const dialMax = 3;
  const shown = interpolate(p, [0, 1], [0, risk.delinquencyRate]);
  // needle sweeps the top semicircle: 180deg (left) -> 0deg (right) as value grows
  const alpha = ((180 - (shown / dialMax) * 180) * Math.PI) / 180;

  const chip = spring({frame, fps, delay: 54, config: {damping: 13, stiffness: 140}});
  const chipScale = interpolate(chip, [0, 1], [0.5, 1]);

  const R = 200;
  const cx = 250;
  const cy = 250;

  return (
    <SafeArea
      source={SRC.delinquency}
      subtitle={
        <>
          못 갚는 대출이 1년 새 <Hi color={tokens.danger}>50% 급증.</Hi> 가장
          위험한 건, 의외로 20대 사장님.
        </>
      }
    >
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 40}}>
        <svg width={500} height={300} viewBox="0 0 500 300">
          {/* track */}
          <path
            d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`}
            fill="none"
            stroke={tokens.surface2}
            strokeWidth={30}
            strokeLinecap="round"
          />
          {/* value arc */}
          <path
            d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`}
            fill="none"
            stroke={tokens.danger}
            strokeWidth={30}
            strokeLinecap="round"
            strokeDasharray={Math.PI * R}
            strokeDashoffset={Math.PI * R * (1 - shown / dialMax)}
          />
          {/* needle */}
          <line
            x1={cx}
            y1={cy}
            x2={cx + R * 0.86 * Math.cos(alpha)}
            y2={cy - R * 0.86 * Math.sin(alpha)}
            stroke={tokens.textPrimary}
            strokeWidth={8}
            strokeLinecap="round"
          />
          <circle cx={cx} cy={cy} r={16} fill={tokens.textPrimary} />
        </svg>

        <div style={{display: "flex", alignItems: "baseline", gap: 20}}>
          <span
            style={{
              fontFamily: poppins,
              fontWeight: 500,
              fontSize: 150,
              color: tokens.danger,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {pct(Number(shown.toFixed(1)))}
          </span>
          <span style={{fontFamily: poppins, fontSize: 34, color: tokens.textSecondary}}>
            연체율 · 4년 만에 최고
          </span>
        </div>

        <div
          style={{
            transform: `scale(${chipScale})`,
            padding: "18px 30px",
            borderRadius: 16,
            backgroundColor: tokens.dangerTint,
            color: tokens.danger,
            fontFamily: poppins,
            fontWeight: 500,
            fontSize: 40,
          }}
        >
          못 갚는 대출 +{risk.overdueGrowth}%
        </div>
      </div>
    </SafeArea>
  );
};
