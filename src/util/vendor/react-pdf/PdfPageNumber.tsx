import { Text } from "@react-pdf/renderer";

type Props = {
  color?: string;
  fontSize?: number;
  align?: "left" | "center" | "right";
};

export function PdfPageNumber({ color, fontSize, align = "center" }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const merged: any = {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    fontSize: fontSize ?? 10,
    color: color ?? "#888888",
    textAlign: align,
  };
  return (
    <Text
      style={merged}
      render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
      fixed
    />
  );
}
