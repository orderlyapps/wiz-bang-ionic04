import { Select } from "@ui/components/inputs/select/Select";
import { selectableStyles, type SelectableStyleId } from "@util/vendor/mapbox/mapboxStyles";

type Props = {
  value: SelectableStyleId;
  on_change: (value: SelectableStyleId) => void;
};

const options = selectableStyles.map((s) => ({ label: s.label, value: s.id }));

export function MapStyleSelect({ value, on_change }: Props) {
  return (
    <Select
      label="Map Style"
      value={value}
      options={options}
      on_change={(v) => on_change(v as SelectableStyleId)}
    />
  );
}
