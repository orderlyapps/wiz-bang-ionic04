import type { CSSProperties, ReactNode } from "react";
import { useBreakpoint } from "@util/hooks/use-breakpoint/use-breakpoint";
import type { Breakpoint } from "@util/hooks/use-breakpoint/breakpoints";
import { useFontSize } from "@util/app/font-size/hooks/use-font-size";
import type { Size } from "@util/types/Size";
import type { FontSize } from "@util/app/font-size/types";
import "./MultiColumnList.css";

interface MultiColumnListProps<T> {
  items: T[];
  get_id: (item: T) => string;
  render_item: (item: T) => ReactNode;
  /** Horizontal gap between columns. Uses the shared Size scale, or "none" for no gap. Defaults to "sm". */
  gap?: Size | "none";
  /** Vertical gap between rows. Uses the shared Size scale, or "none" for no gap. Defaults to "none". */
  row_gap?: Size | "none";
  /** Whether to apply gaps when there is only one column. Defaults to false. */
  gap_when_single_column?: boolean;
  /** Optional offset to add or subtract from the calculated column count. Positive values add columns, negative values reduce columns. */
  column_offset?: number;
  /** Optional hard cap on the number of columns, applied after all other adjustments. */
  max_columns?: number;
  /** Optional function to determine if an item should start a new row at the first column.
   * Pinned items maintain their order but always appear in the first column of a new row.
   * Only applies when displaying multiple columns (tablet/desktop). */
  pin_to_first_column?: (item: T) => boolean;
}

const gapMap: Record<Size | "none", string> = {
  none: "0",
  xs: "0.5rem",
  sm: "1rem",
  md: "2.5rem",
  lg: "4rem",
  xl: "6rem",
  "2xl": "8rem",
};

const breakpointCols: Record<Breakpoint | "xs", number> = {
  xs: 1,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  "2xl": 4,
};

const fontSizeAdjustment: Record<FontSize, number> = {
  xs: 1,
  sm: 0,
  md: 0,
  lg: -1,
  xl: -1,
  "2xl": -2,
};

function get_cols(
  count: number,
  breakpoint: Breakpoint | "xs",
  font_size: FontSize,
  column_offset: number,
  max_columns?: number,
): number {
  // Always single column on mobile (xs/sm), ignoring adjustments
  if (breakpoint === "xs" || breakpoint === "sm") {
    return 1;
  }
  const base_max = breakpointCols[breakpoint];
  const adjustment = fontSizeAdjustment[font_size];
  let max = Math.max(1, base_max + adjustment + column_offset);
  if (max_columns !== undefined) max = Math.min(max, Math.max(1, max_columns));
  if (count < max) return Math.max(1, count);
  return max;
}

export function MultiColumnList<T>({
  items,
  get_id,
  render_item,
  gap = "none",
  row_gap = "none",
  gap_when_single_column = false,
  column_offset = 0,
  max_columns,
  pin_to_first_column,
}: MultiColumnListProps<T>) {
  const { breakpoint } = useBreakpoint();
  const { font_size } = useFontSize();
  const cols = get_cols(items.length, breakpoint, font_size, column_offset, max_columns);

  return (
    <ul
      className="multi-column-list"
      style={
        {
          "--multi-column-list-cols": cols,
          "--multi-column-list-gap": cols === 1 && !gap_when_single_column ? "0" : gapMap[gap],
          "--multi-column-list-row-gap":
            cols === 1 && !gap_when_single_column ? "0" : gapMap[row_gap],
        } as CSSProperties
      }
    >
      {items.map((item) => {
        const is_pinned = pin_to_first_column?.(item) ?? false;
        return (
          <li
            key={get_id(item)}
            className={`multi-column-list__item${is_pinned && cols > 1 ? " multi-column-list__item--pinned" : ""}`}
          >
            {render_item(item)}
          </li>
        );
      })}
    </ul>
  );
}
