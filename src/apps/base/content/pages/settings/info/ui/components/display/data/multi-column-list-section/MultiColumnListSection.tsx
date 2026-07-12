import { IonItem, IonLabel } from "@ionic/react";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

const props = [
  { label: "items", value: "— Array of records to display." },
  { label: "get_id", value: "— Function that returns a stable unique id for each item." },
  {
    label: "render_item",
    value: "— Function that renders each item. Receives the item and returns a ReactNode.",
  },
  {
    label: "gap",
    value:
      '— Optional horizontal gap between columns. Uses the shared Size scale ("xs" → "2xl") or "none". Defaults to "sm". Rows stay flush.',
  },
  {
    label: "column_offset",
    value:
      "— Optional number to add or subtract from the calculated column count. Positive values add columns, negative values reduce columns. Ignored on mobile.",
  },
  {
    label: "page setup",
    value:
      '— When using this component on a page, wrap the page in <IonContent className="content-wide"> for proper multi-column layout.',
  },
];

type Demo = { id: string; name: string };

const demo_items: Demo[] = [
  { id: "1", name: "Alpha Congregation" },
  { id: "2", name: "Beta Congregation" },
  { id: "3", name: "Gamma Congregation" },
  { id: "4", name: "Delta Congregation" },
  { id: "5", name: "Epsilon Congregation" },
];

export function MultiColumnListSection() {
  return (
    <ComponentSection
      title="MultiColumnList"
      description="A responsive grid list that automatically adjusts the number of columns based on screen width, item count, and font size. 1 col on mobile (xs/sm) always, 2 on tablet (md), 3 on small desktop (lg), and 4 on large desktop (xl/2xl), capped by item count. Items fill left-to-right then wrap. Column count automatically adjusts based on font size. Optional horizontal gap via the gap prop; rows stay flush. Optional column_offset prop for fine-tuning."
      props={props}
    >
      <MultiColumnList<Demo>
        items={demo_items}
        get_id={(item) => item.id}
        render_item={(item) => (
          <IonItem>
            <IonLabel>{item.name}</IonLabel>
          </IonItem>
        )}
      />
    </ComponentSection>
  );
}
