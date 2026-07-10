import {loadFont as loadPoppins} from "@remotion/google-fonts/Poppins";
import {loadFont as loadLora} from "@remotion/google-fonts/Lora";

// Weights limited to 400 / 500 per the design system (no 600/700).
export const poppins = loadPoppins("normal", {weights: ["400", "500"]}).fontFamily;

// Lora (serif) = "Claude's voice" — used for the narration subtitles.
export const lora = loadLora("normal", {weights: ["400", "500"]}).fontFamily;
