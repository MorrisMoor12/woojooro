import React from "react";
import {AbsoluteFill} from "remotion";
import {tokens} from "../theme";
import {SubtitleBar} from "../components/SubtitleBar";
import {SourceBadge} from "../components/SourceBadge";

/**
 * The 9:16 scaffold every scene sits on:
 *   top    — narration subtitle (Lora / Claude's voice)
 *   middle — the data visualization
 *   bottom — source badge, kept above the shorts UI safe zone
 */
export const SafeArea: React.FC<{
  subtitle: React.ReactNode;
  source: string;
  children: React.ReactNode;
}> = ({subtitle, source, children}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: tokens.bgCanvas,
        flexDirection: "column",
        // extra bottom padding = shorts UI safe zone (like/share/description)
        padding: "96px 72px 220px",
      }}
    >
      <div style={{flex: 1.3, display: "flex", alignItems: "flex-start"}}>
        <SubtitleBar>{subtitle}</SubtitleBar>
      </div>
      <div
        style={{
          flex: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </div>
      <div style={{flex: 0.5, display: "flex", alignItems: "flex-end"}}>
        <SourceBadge>{source}</SourceBadge>
      </div>
    </AbsoluteFill>
  );
};
