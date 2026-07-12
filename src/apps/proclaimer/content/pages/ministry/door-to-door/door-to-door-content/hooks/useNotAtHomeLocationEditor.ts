import { useState } from "react";
import { useNotAtHomeMarkers } from "../components/not-at-home-source/hooks/useNotAtHomeMarkers";
import { handleUpdateNotAtHomeLocation } from "../components/not-at-home-source/handlers/handleUpdateNotAtHomeLocation";
import type { NotAtHome } from "../components/not-at-home-source/types";

function getGroupKey(record: NotAtHome): string {
  return `${record.suburb}|${record.street}|${record.house_number}`;
}

type EditingState = {
  group_key: string;
  coordinates: [number, number];
} | null;

export function useNotAtHomeLocationEditor() {
  const groupedByAddress = useNotAtHomeMarkers();
  const [editingState, setEditingState] = useState<EditingState>(null);

  const editingGroup = editingState ? groupedByAddress?.[editingState.group_key] : null;

  function startEditing(record: NotAtHome) {
    const coordinates = record.coordinates as [number, number];
    if (!Number.isFinite(coordinates[0]) || !Number.isFinite(coordinates[1])) {
      return;
    }
    setEditingState({
      group_key: getGroupKey(record),
      coordinates,
    });
  }

  function updateCoordinates(coordinates: [number, number]) {
    setEditingState((prev) => (prev ? { ...prev, coordinates } : null));
  }

  function saveEditing() {
    if (!editingGroup || !editingState) return;
    handleUpdateNotAtHomeLocation(editingGroup, editingState.coordinates);
    setEditingState(null);
  }

  function cancelEditing() {
    setEditingState(null);
  }

  return {
    isEditing: editingState !== null,
    editingCoordinates: editingState?.coordinates ?? null,
    startEditing,
    updateCoordinates,
    saveEditing,
    cancelEditing,
  };
}
