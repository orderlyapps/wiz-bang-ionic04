import { Link } from "@react-pdf/renderer";
import type { LinkProps } from "@react-pdf/renderer";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<LinkProps> & {
  color?: string;
};

export function PdfLink({ children, color, style, ...props }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const merged: any = {
    fontSize: 11,
    color: color ?? "#0066cc",
    textDecoration: "underline",
    ...(style as object),
  };
  return (
    <Link style={merged} {...props}>
      {children}
    </Link>
  );
}
