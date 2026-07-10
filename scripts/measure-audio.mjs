// Measures each narration clip in public/audio/ and writes src/audio/manifest.json.
// Scene length = ceil(speech seconds * fps) + TAIL_FRAMES, so every scene stretches
// to fit its narration. Uses Remotion's bundled ffprobe — no extra dependency.
//
//   npm run measure-audio
//
import {execSync} from "node:child_process";
import {existsSync, readFileSync, writeFileSync} from "node:fs";
import {dirname, join} from "node:path";
import {fileURLToPath} from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const FPS = 30;
const TAIL_FRAMES = 12;

const scenes = JSON.parse(
  readFileSync(join(ROOT, "src", "audio", "scenes.json"), "utf8"),
);

const manifest = {};
let found = 0;

for (const scene of scenes) {
  const audioPath = join(ROOT, "public", "audio", scene.file);
  if (!existsSync(audioPath)) {
    console.log(`·  ${scene.file.padEnd(12)} (missing — scene "${scene.id}" stays silent)`);
    continue;
  }
  const json = execSync(
    `npx remotion ffprobe "${audioPath}" -v quiet -print_format json -show_format`,
    {encoding: "utf8"},
  );
  const durationSec = parseFloat(JSON.parse(json).format.duration);
  const durationInFrames = Math.ceil(durationSec * FPS) + TAIL_FRAMES;
  manifest[scene.id] = {
    file: scene.file,
    durationSec: Number(durationSec.toFixed(2)),
    durationInFrames,
  };
  found += 1;
  console.log(
    `✓  ${scene.file.padEnd(12)} ${durationSec.toFixed(2)}s → ${durationInFrames}f  (${scene.id})`,
  );
}

writeFileSync(
  join(ROOT, "src", "audio", "manifest.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);

const totalFrames = scenes.reduce(
  (n, s) => n + (manifest[s.id]?.durationInFrames ?? s.fallbackFrames),
  0,
);
console.log(
  `\nwrote src/audio/manifest.json — ${found}/${scenes.length} clips, total ${(totalFrames / FPS).toFixed(1)}s`,
);
