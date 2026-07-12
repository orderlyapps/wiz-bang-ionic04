import type { ReactNode } from "react";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { useFontSize } from "@util/app/font-size/hooks/use-font-size";
import type { FontSize } from "@util/app/font-size/types";
import { FontSizeSelector } from "@util/app/font-size/font-size-selector/FontSizeSelector";
import { useTheme } from "@util/app/theme/hooks/use-theme";
import type { ThemeMode } from "@util/app/theme/types";
import { ThemeSelector } from "@util/app/theme/theme-selector/ThemeSelector";

type SelectorItem =
  | { id: "theme"; value: ThemeMode; onChange: (value: ThemeMode) => void }
  | { id: "font_size"; value: FontSize; onChange: (value: FontSize) => void };

export function AppearanceForm() {
  const { font_size, setFontSize } = useFontSize();
  const { theme_mode, setTheme } = useTheme();

  const items: SelectorItem[] = [
    { id: "theme", value: theme_mode, onChange: setTheme },
    { id: "font_size", value: font_size, onChange: setFontSize },
  ];

  const render_item = (item: SelectorItem): ReactNode => {
    if (item.id === "theme") {
      return <ThemeSelector value={item.value} onChange={item.onChange} />;
    }
    return <FontSizeSelector value={item.value} onChange={item.onChange} />;
  };

  return <MultiColumnList items={items} get_id={(item) => item.id} render_item={render_item} />;
}
