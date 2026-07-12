import { RangeInput } from "@ui/components/inputs/range/RangeInput";
import type { ScreenshotSettings } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/utils/screenshotSettings";
import type { CustomLocalStyleSettings } from "@util/vendor/mapbox/customLocalStyleSettings";
import type { SelectableStyleId } from "@util/vendor/mapbox/mapboxStyles";

type Props = {
  styleId: SelectableStyleId;
  customLocalStyleSettings: CustomLocalStyleSettings;
  onCustomLocalStyleSettingsChange: (settings: CustomLocalStyleSettings) => void;
  screenshotSettings: ScreenshotSettings;
  onScreenshotSettingsChange: (settings: ScreenshotSettings) => void;
};

export function ScreenshotSettingsSection({
  styleId,
  customLocalStyleSettings,
  onCustomLocalStyleSettingsChange,
  screenshotSettings,
  onScreenshotSettingsChange,
}: Props) {
  return (
    <>
      {styleId === "custom-local" && (
        <>
          <RangeInput
            label="Road Width"
            value={customLocalStyleSettings.road_width_multiplier}
            min={0.5}
            max={3}
            step={0.1}
            on_change={(v) =>
              onCustomLocalStyleSettingsChange({
                ...customLocalStyleSettings,
                road_width_multiplier: v,
              })
            }
          />
          <RangeInput
            label="Road Label Size"
            value={customLocalStyleSettings.road_label_size_multiplier}
            min={0.6}
            max={1.4}
            step={0.02}
            on_change={(v) =>
              onCustomLocalStyleSettingsChange({
                ...customLocalStyleSettings,
                road_label_size_multiplier: v,
              })
            }
          />
        </>
      )}
      <RangeInput
        label="Label Font Size"
        value={screenshotSettings.overlay_font_size}
        min={8}
        max={48}
        step={1}
        on_change={(v) =>
          onScreenshotSettingsChange({ ...screenshotSettings, overlay_font_size: v })
        }
      />
      <RangeInput
        label="Boundary Line Width"
        value={screenshotSettings.boundary_line_width}
        min={0.5}
        max={8}
        step={0.5}
        on_change={(v) =>
          onScreenshotSettingsChange({ ...screenshotSettings, boundary_line_width: v })
        }
      />
      <RangeInput
        label="Block Line Width"
        value={screenshotSettings.block_line_width}
        min={0.5}
        max={8}
        step={0.5}
        on_change={(v) =>
          onScreenshotSettingsChange({ ...screenshotSettings, block_line_width: v })
        }
      />
      <RangeInput
        label="Block Text Size"
        value={screenshotSettings.block_text_size}
        min={8}
        max={32}
        step={1}
        on_change={(v) => onScreenshotSettingsChange({ ...screenshotSettings, block_text_size: v })}
      />
      <RangeInput
        label="Block Opacity"
        value={screenshotSettings.block_opacity}
        min={0}
        max={1}
        step={0.1}
        on_change={(v) => onScreenshotSettingsChange({ ...screenshotSettings, block_opacity: v })}
      />
    </>
  );
}
