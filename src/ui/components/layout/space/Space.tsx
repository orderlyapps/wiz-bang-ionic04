import type { Size } from "@util/types/Size";

const sizeMap: Record<Size, string> = {
  xs: "0.5rem",
  sm: "1rem",
  md: "2.5rem",
  lg: "4rem",
  xl: "6rem",
  "2xl": "8rem",
};

interface SpaceProps {
  size?: Size;
  horizontal?: boolean;
}

export function Space({ size = "md", horizontal = false }: SpaceProps) {
  const value = sizeMap[size];
  const style = horizontal ? { display: "inline-block", width: value } : { height: value };
  return <div style={style} aria-hidden />;
}
