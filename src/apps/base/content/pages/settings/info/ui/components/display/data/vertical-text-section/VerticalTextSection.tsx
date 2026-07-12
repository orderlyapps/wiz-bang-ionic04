import { VerticalText } from "@ui/components/display/data/vertical-text/VerticalText";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";
import { Body } from "@ui/components/display/text/body/Body";

const props = [
  { label: "children", value: "— The content to display vertically." },
  {
    label: "align",
    value:
      '— Vertical alignment of text within the container. "bottom" (default) or "top". Optional.',
  },
  {
    label: "size",
    value:
      '— Height of the container. One of "xs", "sm", "md" (default), "lg", "xl", "2xl". Optional.',
  },
];

export function VerticalTextSection() {
  return (
    <ComponentSection
      title="VerticalText"
      description="Renders text rotated 90° counter-clockwise. Useful for column headers or vertical labels. Text aligns to the bottom by default."
      props={props}
    >
      <div style={{ display: "flex", gap: 24, padding: "8px 16px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <VerticalText>Bottom</VerticalText>
          <small>"bottom"</small>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <VerticalText align="top">Top</VerticalText>
          <small>"top"</small>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <VerticalText size="sm">Small but overflows</VerticalText>
          <small>"sm"</small>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <VerticalText size="lg">Large</VerticalText>
          <small>"lg"</small>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <VerticalText size="lg" align="top">
            Large
          </VerticalText>
          <small>"lg" & "top"</small>
        </div>
      </div>

      <div style={{ display: "flex", gap: 24, padding: "8px 16px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <VerticalText>
            <Body color="primary" bold size="lg">
              Bottom
            </Body>
          </VerticalText>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <VerticalText align="top">Top</VerticalText>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <VerticalText size="sm">
            <Body color="primary" bold size="xs">
              Small but Overflows
            </Body>
          </VerticalText>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <VerticalText size="lg">Large</VerticalText>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <VerticalText size="lg" align="top">
            Large Top
          </VerticalText>
        </div>
      </div>
    </ComponentSection>
  );
}
