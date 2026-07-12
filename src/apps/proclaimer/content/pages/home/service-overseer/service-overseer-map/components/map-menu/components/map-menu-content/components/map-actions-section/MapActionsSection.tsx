import { IonList, IonItem, IonLabel, IonButtons, IonIcon } from "@ionic/react";
import { create } from "ionicons/icons";
import { EditIconButton } from "@ui/components/inputs/button/icon/edit/EditIconButton";
import { AlertIconButton } from "@ui/components/inputs/button/icon/alert/AlertIconButton";
import { DeleteIconButton } from "@ui/components/inputs/button/icon/delete/DeleteIconButton";
import { RenameIconButton } from "@ui/components/inputs/button/icon/rename/RenameIconButton";
import { Body } from "@ui/components/display/text/body/Body";
import type { Block } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/utils/types";

type Props = {
  is_map: boolean;
  hasPendingChanges: boolean;
  onEditBoundary: () => void;
  onDeleteMap: () => void;
  blocks: Block[] | null;
  onRenameBlock: (blockId: string, name: string) => void;
  onEditBlock: (block: Block) => void;
  onDeleteBlock: (blockId: string) => void;
};

export function MapActionsSection({
  is_map,
  hasPendingChanges,
  onEditBoundary,
  onDeleteMap,
  blocks,
  onRenameBlock,
  onEditBlock,
  onDeleteBlock,
}: Props) {
  return (
    <IonList>
      {is_map && (
        <IonItem>
          <IonLabel>
            <Body>Boundary</Body>
          </IonLabel>
          <IonButtons slot="end">
            {hasPendingChanges ? (
              <AlertIconButton
                alert_header="Unsaved Changes"
                alert_message="You have unsaved changes. Are you sure you want to edit the boundary?"
                confirm_text="Edit Boundary"
                on_click={onEditBoundary}
              >
                <IonIcon icon={create} />
              </AlertIconButton>
            ) : (
              <EditIconButton on_click={onEditBoundary} />
            )}
            <DeleteIconButton
              alert_header="Delete Map"
              alert_message="Are you sure you want to permanently delete this map?"
              confirm_text="Delete Map"
              on_click={onDeleteMap}
            />
          </IonButtons>
        </IonItem>
      )}

      {blocks
        ?.sort((a, b) => a.name.localeCompare(b.name))
        .map((block) => (
          <IonItem key={block.id}>
            <IonLabel>
              <Body>{block.name}</Body>
              <Body color="medium" size="xs">
                {" "}
                {block.type}
              </Body>
            </IonLabel>

            <IonButtons slot="end">
              <RenameIconButton
                alert_header="Rename Block"
                current_value={block.name}
                on_rename={(name) => onRenameBlock(block.id, name)}
              />
              {hasPendingChanges ? (
                <AlertIconButton
                  alert_header="Unsaved Changes"
                  alert_message="You have unsaved changes. Are you sure you want to edit this block?"
                  confirm_text="Edit Block"
                  on_click={() => onEditBlock(block)}
                >
                  <IonIcon icon={create} />
                </AlertIconButton>
              ) : (
                <EditIconButton on_click={() => onEditBlock(block)} />
              )}
              <DeleteIconButton on_click={() => onDeleteBlock(block.id)} />
            </IonButtons>
          </IonItem>
        ))}
    </IonList>
  );
}
