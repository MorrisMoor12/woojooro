import React from "react";
import {useCurrentFrame, useVideoConfig, spring, interpolate} from "remotion";
import {SafeArea} from "../../layout/SafeArea";
import {Hi} from "../SubtitleBar";
import {CountUp} from "../CountUp";
import {tokens} from "../../theme";
import {closure, SRC} from "../../data/metrics";
import {koCount} from "../../util/format";

const COLS = 10;
const ROWS = 12;
const TOTAL = COLS * ROWS;

/** Scene 6 — a grid of shops; ~9% go dark one by one. */
export const ClosureGridScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const offCount = Math.round(TOTAL * closure.rate); // ~11 cells

  // deterministic scatter of which cells close (not clustered)
  const offSet = React.useMemo(() => {
    const set = new Set<number>();
    let seed = 7;
    while (set.size < offCount) {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      set.add(seed % TOTAL);
    }
    return set;
  }, [offCount]);

  const offOrder = React.useMemo(() => Array.from(offSet), [offSet]);

  return (
    <SafeArea
      source={SRC.closure}
      subtitle={
        <>
          2025년 폐업한 가게 <Hi color={tokens.danger}>97만 곳.</Hi> 열 곳 중 한
          곳이 문을 닫았습니다.
        </>
      }
    >
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 48}}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gap: 16,
          }}
        >
          {Array.from({length: TOTAL}).map((_, i) => {
            const orderIdx = offOrder.indexOf(i);
            const isOff = orderIdx >= 0;
            const fade = isOff
              ? spring({frame, fps, delay: 20 + orderIdx * 8, config: {damping: 200}})
              : 0;
            const bg = isOff
              ? interpolateColor(fade, tokens.textSecondary, tokens.surface2)
              : tokens.textSecondary;
            const scale = isOff ? interpolate(fade, [0, 1], [1, 0.82]) : 1;
            return (
              <div
                key={i}
                style={{
                  width: 62,
                  height: 62,
                  borderRadius: 12,
                  backgroundColor: bg,
                  transform: `scale(${scale})`,
                }}
              />
            );
          })}
        </div>

        <div style={{display: "flex", alignItems: "baseline", gap: 18}}>
          <CountUp to={closure.count} format={koCount} color={tokens.danger} size={120} suffix="곳" />
        </div>
      </div>
    </SafeArea>
  );
};

/** Tiny two-color lerp so we don't pull in extra deps for one gradient. */
function interpolateColor(t: number, from: string, to: string): string {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  const r = Math.round(a[0] + (b[0] - a[0]) * t);
  const g = Math.round(a[1] + (b[1] - a[1]) * t);
  const bl = Math.round(a[2] + (b[2] - a[2]) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}
