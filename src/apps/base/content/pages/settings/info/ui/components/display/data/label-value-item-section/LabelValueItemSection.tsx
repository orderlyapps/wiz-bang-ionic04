import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { LabelValueItemSkeleton } from "@ui/components/display/data/label-value/LabelValueItemSkeleton";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

const props = [
  { label: "label", value: "— The label text to display." },
  { label: "value", value: "— The value text to display." },
  {
    label: "label_color",
    value: '— Ionic color token for the label (e.g. "primary", "danger"). Optional.',
  },
  {
    label: "value_color",
    value: '— Ionic color token for the value (e.g. "primary", "danger"). Optional.',
  },
  { label: "detail", value: "— Whether to show a detail arrow. Defaults to false." },
  { label: "router_link", value: "— Router link for navigation. Optional." },
  { label: "on_click", value: "— Click handler function. Optional." },
];

export function LabelValueItemSection() {
  return (
    <>
      <ComponentSection
        title="LabelValueItem"
        description="A labeled data display component built on IonItem. Displays a label-value pair with optional styling and navigation."
        props={props}
      >
        <LabelValueItem label="Name" value="John Doe" />
        <LabelValueItem label="Status" value="Active" value_color="success" />
        <LabelValueItem label="Email" value="john@example.com" detail />
        <LabelValueItem label="Role" value="Admin" label_color="primary" value_color="medium" />
      </ComponentSection>
      <ComponentSection
        title="LabelValueItemSkeleton"
        description="A loading placeholder for LabelValueItem. Uses IonSkeletonText to mimic the label-value layout while data is being fetched."
        props={[]}
      >
        <LabelValueItemSkeleton />
        <LabelValueItemSkeleton />
        <LabelValueItemSkeleton />
      </ComponentSection>
    </>
  );
}
