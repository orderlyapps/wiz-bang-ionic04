import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList } from "@ionic/react";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";
import { useStoredPublisher } from "@proclaimer-shared/publisher/useStoredPublisher";
import { useChairmanWeeks } from "@proclaimer-content/pages/home/clam-chairman/useChairmanWeeks";
import { useIsCbsConductor } from "@proclaimer-content/pages/home/congregation-bible-study/useIsCbsConductor";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";
import { localStorageKeys } from "@util/constants/localStorageKeys";
import { useAccordionState } from "@util/hooks/use-accordion-state/useAccordionState";

const COLOR: IonicColor = "medium";
const CLASSNAME = "ion-text-end";

export function HomeTools() {
  const permissions = usePermissions();
  const canSeeAll = permissions.has_congregation_admin || permissions.is_super_admin;
  const publisher = useStoredPublisher();
  const isPioneer =
    publisher?.type === "regular_pioneer" ||
    publisher?.type === "special_pioneer" ||
    publisher?.type === "continuous_auxiliary";

  const { is_chairman } = useChairmanWeeks();
  const { is_cbs_conductor } = useIsCbsConductor();
  const { value, onIonChange } = useAccordionState(localStorageKeys.homeToolsAccordion, "tools");

  const hasAnyTool =
    permissions.is_super_admin ||
    permissions.has_congregation_admin ||
    permissions.has_cobe ||
    permissions.has_secretary ||
    permissions.has_service_overseer ||
    permissions.has_elder ||
    permissions.has_clam_overseer ||
    permissions.has_reports ||
    permissions.has_territory_servant ||
    permissions.has_av_overseer ||
    permissions.has_cleaning ||
    permissions.has_speaker ||
    permissions.has_weekend ||
    permissions.has_reminders ||
    permissions.has_events ||
    permissions.has_watchtower ||
    permissions.has_ministerial_servant ||
    is_chairman ||
    is_cbs_conductor ||
    isPioneer;

  if (!permissions.is_loaded || !hasAnyTool) {
    return null;
  }

  return (
    <IonAccordionGroup value={value} onIonChange={onIonChange}>
      <IonAccordion value="tools">
        <IonItem slot="header">
          <IonLabel>
            <Heading>Tools</Heading>
          </IonLabel>
        </IonItem>
        <div slot="content">
          <IonList>
            {permissions.is_super_admin && (
              <NavItem
                color={COLOR}
                size="md"
                lines="none"
                label_class={CLASSNAME}
                label="Super Admin"
                to="/home/super-admin"
              />
            )}

            {(canSeeAll || permissions.has_congregation_admin) && (
              <NavItem
                color={COLOR}
                size="md"
                lines="none"
                label_class={CLASSNAME}
                label="Admin"
                to="/home/congregation-admin"
              />
            )}

            {/* {(canSeeAll || permissions.has_cobe) && (
              <NavItem
                color={COLOR}
                size="md"
                lines="none"
                label_class={CLASSNAME}
                label="COBE"
                to="/home/cobe"
              />
            )} */}

            {(canSeeAll || permissions.has_secretary) && (
              <NavItem
                color={COLOR}
                size="md"
                lines="none"
                label_class={CLASSNAME}
                label="Secretary"
                to="/home/secretary"
              />
            )}

            {(canSeeAll || permissions.has_service_overseer) && (
              <NavItem
                color={COLOR}
                size="md"
                lines="none"
                label_class={CLASSNAME}
                label="Service Overseer"
                to="/home/service-overseer"
              />
            )}

            {(canSeeAll || permissions.has_elder) && (
              <NavItem
                color={COLOR}
                size="md"
                lines="none"
                label_class={CLASSNAME}
                label="Elder"
                to="/home/elder"
              />
            )}

            {(canSeeAll || permissions.has_clam_overseer) && (
              <NavItem
                color={COLOR}
                size="md"
                lines="none"
                label_class={CLASSNAME}
                label="CLAM Overseer"
                to="/home/clam-overseer"
              />
            )}

            {(is_chairman || permissions.has_clam_overseer) && (
              <NavItem
                color={COLOR}
                size="md"
                lines="none"
                label_class={CLASSNAME}
                label="CLAM Chairman"
                to="/home/clam-chairman"
              />
            )}

            {(canSeeAll || permissions.has_reports) && (
              <NavItem
                color={COLOR}
                size="md"
                lines="none"
                label_class={CLASSNAME}
                label="Reports"
                to="/home/reports"
              />
            )}

            {(canSeeAll || permissions.has_territory_servant) && (
              <NavItem
                color={COLOR}
                size="md"
                lines="none"
                label_class={CLASSNAME}
                label="Territory Servant"
                to="/home/territory-servant"
              />
            )}

            {(canSeeAll || permissions.has_av_overseer) && (
              <NavItem
                color={COLOR}
                size="md"
                lines="none"
                label_class={CLASSNAME}
                label="Audio Video"
                to="/home/av-overseer"
              />
            )}

            {(canSeeAll || permissions.has_cleaning) && (
              <NavItem
                color={COLOR}
                size="md"
                lines="none"
                label_class={CLASSNAME}
                label="Cleaning"
                to="/home/cleaning"
              />
            )}

            {(canSeeAll || permissions.has_speaker) && (
              <NavItem
                color={COLOR}
                size="md"
                lines="none"
                label_class={CLASSNAME}
                label="Public Talks"
                to="/home/speaker"
              />
            )}

            {(canSeeAll || permissions.has_weekend) && (
              <NavItem
                color={COLOR}
                size="md"
                lines="none"
                label_class={CLASSNAME}
                label="Weekend Meeting"
                to="/home/weekend"
              />
            )}

            {(canSeeAll || permissions.has_reminders) && (
              <NavItem
                color={COLOR}
                size="md"
                lines="none"
                label_class={CLASSNAME}
                label="Reminders"
                to="/home/reminders"
              />
            )}

            {(canSeeAll || permissions.has_events) && (
              <NavItem
                color={COLOR}
                size="md"
                lines="none"
                label_class={CLASSNAME}
                label="Events"
                to="/home/events"
              />
            )}

            {(canSeeAll || permissions.has_watchtower) && (
              <NavItem
                color={COLOR}
                size="md"
                lines="none"
                label_class={CLASSNAME}
                label="WT Timer"
                to="/home/watchtower"
              />
            )}

            {is_cbs_conductor && (
              <NavItem
                color={COLOR}
                size="md"
                lines="none"
                label_class={CLASSNAME}
                label="CBS Timer"
                to="/home/congregation-bible-study"
              />
            )}

            {(canSeeAll ||
              permissions.has_elder ||
              permissions.has_secretary ||
              permissions.has_ministerial_servant) && (
              <NavItem
                color={COLOR}
                size="md"
                lines="none"
                label_class={CLASSNAME}
                label="Data Sharing"
                to="/home/data-sharing"
              />
            )}

            {isPioneer && (
              <NavItem
                color={COLOR}
                size="md"
                lines="none"
                label_class={CLASSNAME}
                label="Ministry Time"
                to="/home/ministry-time"
              />
            )}
          </IonList>
        </div>
      </IonAccordion>
    </IonAccordionGroup>
  );
}
