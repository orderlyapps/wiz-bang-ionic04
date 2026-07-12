import {
  convertMillimetersToTwip,
  Document,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
  WidthType,
  BorderStyle,
  type IParagraphOptions,
  type IRunOptions,
  type ITableOptions,
  type ITableCellOptions,
  type ParagraphChild,
} from "docx";

export function text(children: string, options: Omit<IRunOptions, "children"> = {}) {
  return new TextRun({ text: children, ...options });
}

export function paragraph(
  children: readonly ParagraphChild[] | string | undefined,
  options: Omit<IParagraphOptions, "children"> = {},
) {
  if (typeof children === "string") {
    return new Paragraph({ children: [text(children)], ...options });
  }
  return new Paragraph({ children: children ?? [], ...options });
}

export function row(children: TableCell[]) {
  return new TableRow({ children });
}

const nilBorders = {
  top: { color: "auto", space: 0, size: 0, style: "nil" as const },
  bottom: { color: "auto", space: 0, size: 0, style: "nil" as const },
  left: { color: "auto", space: 0, size: 0, style: "nil" as const },
  right: { color: "auto", space: 0, size: 0, style: "nil" as const },
};

export function cell(
  children: (Table | Paragraph)[],
  width: number = 200,
  options: Omit<ITableCellOptions, "children" | "width"> = { borders: nilBorders },
) {
  return new TableCell({
    width: { size: convertMillimetersToTwip(width), type: WidthType.DXA },
    children,
    ...options,
  });
}

export function table(
  rows: TableRow[],
  options: Omit<ITableOptions, "rows"> = { borders: nilBorders },
) {
  return new Table({
    rows,
    columnWidths: [
      convertMillimetersToTwip(140),
      convertMillimetersToTwip(47),
      convertMillimetersToTwip(13),
    ],
    ...options,
  });
}

export function document(children: (Table | Paragraph)[]) {
  return new Document({
    styles: {
      default: {
        document: {
          run: { font: "Arial", size: 20 },
          paragraph: { spacing: { before: 0 } },
        },
      },
    },
    sections: [
      {
        children,
        properties: {
          page: {
            margin: {
              bottom: convertMillimetersToTwip(5),
              top: convertMillimetersToTwip(5),
              left: convertMillimetersToTwip(5),
              right: convertMillimetersToTwip(5),
            },
            size: { width: "210mm", height: "297mm" },
          },
        },
      },
    ],
  });
}

export function sectionHeading(children: Paragraph[]) {
  return row(
    children.map((child) =>
      cell([child], 200, {
        borders: {
          top: { style: BorderStyle.SINGLE, size: 1.5 },
          bottom: { style: "nil", size: 0 },
        },
        margins: {
          top: convertMillimetersToTwip(1),
          bottom: convertMillimetersToTwip(1),
        },
      }),
    ),
  );
}

export function title(children: string) {
  return row([
    cell([paragraph([text(children, { size: 32, bold: true })])], 200, {
      margins: { bottom: convertMillimetersToTwip(5) },
    }),
  ]);
}
