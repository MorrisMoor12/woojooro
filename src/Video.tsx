import React from "react";
import {AbsoluteFill, Series} from "remotion";
import {tokens} from "./theme";
import {HookScene} from "./components/scenes/HookScene";
import {CountUpScene} from "./components/scenes/CountUpScene";
import {MetroMapScene} from "./components/scenes/MetroMapScene";
import {BarRaceScene} from "./components/scenes/BarRaceScene";
import {GaugeScene} from "./components/scenes/GaugeScene";
import {ClosureGridScene} from "./components/scenes/ClosureGridScene";
import {KeywordScene} from "./components/scenes/KeywordScene";

/**
 * 65s / 1950f @ 30fps. Scene durations mirror the narration timecode table.
 */
export const SCENES = [
  {id: "hook", durationInFrames: 120, Comp: HookScene},
  {id: "countup", durationInFrames: 210, Comp: CountUpScene},
  {id: "map", durationInFrames: 330, Comp: MetroMapScene},
  {id: "barrace", durationInFrames: 330, Comp: BarRaceScene},
  {id: "gauge", durationInFrames: 330, Comp: GaugeScene},
  {id: "closure", durationInFrames: 330, Comp: ClosureGridScene},
  {id: "keyword", durationInFrames: 300, Comp: KeywordScene},
] as const;

export const TOTAL_FRAMES = SCENES.reduce((n, s) => n + s.durationInFrames, 0);

export const Video: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: tokens.bgCanvas}}>
      <Series>
        {SCENES.map(({id, durationInFrames, Comp}) => (
          <Series.Sequence key={id} durationInFrames={durationInFrames}>
            <Comp />
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};
