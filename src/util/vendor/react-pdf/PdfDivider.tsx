import { View } from "@react-pdf/renderer";

type Props = {
  color?: string;
  thickness?: number;
  marginVertical?: number;
};

export function PdfDivider({ color = "#e0e0e0", thickness = 1, marginVertical = 8 }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dividerStyle: any = {
    borderBottomWidth: thickness,
    borderBottomColor: color,
    borderBottomStyle: "solid",
    marginVertical,
  };
  return <View style={dividerStyle} />;
}
