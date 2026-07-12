import { Image } from "@react-pdf/renderer";
import type { ImageProps } from "@react-pdf/renderer";

type Props = ImageProps & {
  width?: number | string;
  height?: number | string;
  fit?: "cover" | "contain" | "fill" | "none" | "scale-down";
};

export function PdfImage({ width, height, fit = "cover", style, ...props }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const merged: any = {
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
    objectFit: fit,
    ...(style as object),
  };
  return <Image style={merged} {...props} />;
}
