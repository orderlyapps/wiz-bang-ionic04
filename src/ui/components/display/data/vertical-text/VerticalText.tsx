import type { ReactNode } from "react";
import type { Size } from "@util/types/Size";

const sizeMap: Record<Size, string> = {
  xs: "2rem",
  sm: "4rem",
  md: "6rem",
  lg: "8rem",
  xl: "10rem",
  "2xl": "14rem",
};

type Props = {
  children: ReactNode;
  /** Controls vertical alignment of text within the container. Defaults to "bottom". */
  align?: "top" | "bottom";
  /** Height of the container. Defaults to "md". */
  size?: Size;
};

/**
 * VerticalText
 *
 * Renders text rotated 90° counter-clockwise, suitable for column headers
 * or any vertical label use case.
 *
 * @prop children - The content to display vertically.
 * @prop align     - Vertical alignment of the text within its container.
 *               "bottom" (default) aligns text to the bottom; "top" aligns to the top.
 * @prop size   - Height of the container. Defaults to "md".
 */
export function VerticalText({ children, align = "bottom", size = "md" }: Props) {
  return (
    <div style={{ height: sizeMap[size] }}>
      <div
        style={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          display: "flex",
          justifyContent: align === "bottom" ? "flex-start" : "flex-end",
          height: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}
