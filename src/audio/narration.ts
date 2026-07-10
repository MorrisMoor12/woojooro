import scenes from "./scenes.json";
import manifest from "./manifest.json";

/**
 * Per-scene narration wiring.
 *
 * Drop `tts01.wav … tts07.wav` into `public/audio/`, then run
 * `npm run measure-audio`. That writes `manifest.json` with each clip's real
 * length, and every scene stretches to match its narration (+ a short tail).
 *
 * Until a clip exists, the scene falls back to its scripted frame length and
 * renders silently — so the project always renders.
 */

export const FPS = 30;
/** Extra frames held after speech ends so a scene doesn't cut on the last word. */
export const TAIL_FRAMES = 12;

type SceneDef = {id: string; file: string; fallbackFrames: number};
type ManifestEntry = {file: string; durationSec: number; durationInFrames: number};

const SCENES = scenes as SceneDef[];
const M = manifest as Record<string, ManifestEntry>;

export type ResolvedScene = {
  id: string;
  file: string;
  hasAudio: boolean;
  durationInFrames: number;
};

export const RESOLVED_SCENES: ResolvedScene[] = SCENES.map((s) => {
  const measured = M[s.id];
  return {
    id: s.id,
    file: s.file,
    hasAudio: Boolean(measured),
    durationInFrames: measured ? measured.durationInFrames : s.fallbackFrames,
  };
});

export const TOTAL_FRAMES = RESOLVED_SCENES.reduce(
  (n, s) => n + s.durationInFrames,
  0,
);
