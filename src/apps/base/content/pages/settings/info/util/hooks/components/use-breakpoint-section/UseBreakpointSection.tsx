import { IonItem } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { useBreakpoint } from "@util/hooks/use-breakpoint/use-breakpoint";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

const props = [
  {
    label: "returns.width",
    value: "— Current window inner width in pixels.",
  },
  {
    label: "returns.breakpoint",
    value:
      '— Active breakpoint name: "xs" (<640) | "sm" (>=640) | "md" (>=768) | "lg" (>=1024) | "xl" (>=1280) | "2xl" (>=1440).',
  },
  {
    label: "returns.is_mobile",
    value: "— true when width < 768px (below md).",
  },
  {
    label: "returns.is_tablet",
    value: "— true when width is in the range [768, 1024) (md, below lg).",
  },
  {
    label: "returns.is_desktop",
    value: "— true when width >= 1024px (lg and up).",
  },
];

export function UseBreakpointSection() {
  const { width, breakpoint, is_mobile, is_tablet, is_desktop } = useBreakpoint();
  return (
    <ComponentSection
      title="useBreakpoint"
      description="A React hook that returns the current responsive breakpoint and convenience flags for mobile / tablet / desktop. Use it to branch component behavior based on viewport size (e.g. popover on desktop vs sheet on mobile). The hook subscribes to window resize and updates on change."
      props={props}
    >
      <IonItem lines="none">
        <Body>Resize this window to see the values update.</Body>
      </IonItem>
      <LabelValueItem label="width" value={`${width}px`} />
      <LabelValueItem label="breakpoint" value={breakpoint} />
      <LabelValueItem label="is_mobile" value={String(is_mobile)} />
      <LabelValueItem label="is_tablet" value={String(is_tablet)} />
      <LabelValueItem label="is_desktop" value={String(is_desktop)} />
    </ComponentSection>
  );
}
