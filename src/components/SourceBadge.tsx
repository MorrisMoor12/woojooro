import React from "react";
import {poppins} from "../fonts";
import {tokens} from "../theme";

/** Muted attribution line. Uses the text-muted token, never opacity. */
export const SourceBadge: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontFamily: poppins,
      fontWeight: 400,
      fontSize: 24,
      color: tokens.textMuted,
    }}
  >
    <span
      style={{
        width: 8,
        height: 8,
        borderRadius: 8,
        backgroundColor: tokens.textMuted,
        display: "inline-block",
      }}
    />
    {children}
  </div>
);
