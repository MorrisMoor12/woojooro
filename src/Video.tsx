import React from "react";
import {AbsoluteFill, Series, Audio, staticFile} from "remotion";
import {tokens} from "./theme";
import {RESOLVED_SCENES, TOTAL_FRAMES} from "./audio/narration";
import {Bgm} from "./components/Bgm";
import {HookScene} from "./components/scenes/HookScene";
import {CountUpScene} from "./components/scenes/CountUpScene";
import {MetroMapScene} from "./components/scenes/MetroMapScene";
import {BarRaceScene} from "./components/scenes/BarRaceScene";
import {GaugeScene} from "./components/scenes/GaugeScene";
import {ClosureGridScene} from "./components/scenes/ClosureGridScene";
import {KeywordScene} from "./components/scenes/KeywordScene";

const COMPONENTS: Record<string, React.FC> = {
  hook: HookScene,
  countup: CountUpScene,
  map: MetroMapScene,
  barrace: BarRaceScene,
  gauge: GaugeScene,
  closure: ClosureGridScene,
  keyword: KeywordScene,
};

export {TOTAL_FRAMES};

/**
 * Scene order + per-scene length come from src/audio/narration.ts.
 * Each scene carries its own narration clip (once dropped into public/audio/).
 */
export const Video: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: tokens.bgCanvas}}>
      <Bgm />
      <Series>
        {RESOLVED_SCENES.map((s) => {
          const Comp = COMPONENTS[s.id];
          return (
            <Series.Sequence key={s.id} durationInFrames={s.durationInFrames}>
              <Comp />
              {s.hasAudio ? <Audio src={staticFile(`audio/${s.file}`)} /> : null}
            </Series.Sequence>
          );
        })}
      </Series>
    </AbsoluteFill>
  );
};
