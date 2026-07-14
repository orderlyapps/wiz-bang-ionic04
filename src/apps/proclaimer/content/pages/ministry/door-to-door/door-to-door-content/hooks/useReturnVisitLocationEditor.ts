import { useState } from "react";
import { useReturnVisitMarkers } from "../components/layers/return-visit-source/hooks/useReturnVisitMarkers";
import { handleUpdateReturnVisitLocation } from "../components/layers/return-visit-source/handlers/handleUpdateReturnVisitLocation";
import type { ReturnVisit } from "../components/layers/return-visit-source/types";

function getGroupKey(record: ReturnVisit): string {
  return `${record.suburb}|${record.street}|${record.house_number}`;
}

type EditingState = {
  group_key: string;
  coordinates: [number, number];
} | null;

export function useReturnVisitLocationEditor() {
  const groupedByAddress = useReturnVisitMarkers();
  const [editingState, setEditingState] = useState<EditingState>(null);

  const editingGroup = editingState ? groupedByAddress?.[editingState.group_key] : null;

  function startEditing(record: ReturnVisit) {
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
    handleUpdateReturnVisitLocation(editingGroup, editingState.coordinates);
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
