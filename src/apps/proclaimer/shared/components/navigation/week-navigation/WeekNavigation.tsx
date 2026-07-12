import { useState } from "react";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonList,
  IonPopover,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import { addWeeks } from "date-fns/addWeeks";
import { parseISO } from "date-fns/parseISO";
import { format } from "date-fns/format";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";
import { Body } from "@ui/components/display/text/body/Body";
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";

type WeekNavigationProps = {
  week_id: string;
  weeksToDisplay?: number;
};

export const WeekNavigation = ({ week_id, weeksToDisplay = 20 }: WeekNavigationProps) => {
  const router = useIonRouter();
  const weekLabel = getTheocraticWeekLabel(week_id);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const currentDate = parseISO(week_id);
  const weekOptions = Array.from({ length: weeksToDisplay }, (_, i) => {
    const offset = i - 4;
    const weekDate = addWeeks(currentDate, offset);
    return {
      weekId: format(weekDate, "yyyy-MM-dd"),
      label: getTheocraticWeekLabel(format(weekDate, "yyyy-MM-dd")),
      isCurrent: offset === 0,
    };
  });

  const getUpdatedPath = (newWeekId: string) => {
    const currentPath = router.routeInfo.pathname;
    const weekIdPattern = /\/\d{4}-\d{2}-\d{2}(\/|$)/;

    if (weekIdPattern.test(currentPath)) {
      return currentPath.replace(/\/\d{4}-\d{2}-\d{2}(\/|$)/, `/${newWeekId}$1`);
    }

    return `${currentPath}/${newWeekId}`;
  };

  return (
    <IonItemDivider sticky style={{ zIndex: 1000 }}>
      <IonGrid>
        <IonRow>
          <IonCol size="auto">
            <IonButton
              fill="clear"
              onClick={() => {
                const previousWeekId = format(addWeeks(currentDate, -1), "yyyy-MM-dd");
                router.push(getUpdatedPath(previousWeekId), "back", "replace");
              }}
            >
              <IonIcon icon={chevronBackOutline} slot="icon-only" size="large" />
            </IonButton>
          </IonCol>
          <IonCol
            id="week-popover-trigger"
            className="ion-text-center ion-align-self-center"
            onClick={() => setPopoverOpen(true)}
          >
            <Body color="primary" size="sm" bold>
              {weekLabel}
            </Body>
          </IonCol>
          <IonPopover
            id="week-nav"
            trigger="week-popover-trigger"
            isOpen={popoverOpen}
            onDidDismiss={() => setPopoverOpen(false)}
          >
            <IonList>
              {weekOptions.map((option) => (
                <IonItem
                  key={option.weekId}
                  onClick={() => {
                    setPopoverOpen(false);
                    if (!option.isCurrent) {
                      router.push(getUpdatedPath(option.weekId), "none", "replace");
                    }
                  }}
                  lines="none"
                >
                  <Body
                    size={option.isCurrent ? "md" : "sm"}
                    color={option.isCurrent ? "primary" : undefined}
                    bold={option.isCurrent}
                  >
                    {option.label}
                  </Body>
                </IonItem>
              ))}
            </IonList>
          </IonPopover>
          <IonCol size="auto">
            <IonButton
              fill="clear"
              onClick={() => {
                const nextWeekId = format(addWeeks(currentDate, 1), "yyyy-MM-dd");
                router.push(getUpdatedPath(nextWeekId), "forward", "replace");
              }}
            >
              <IonIcon src={chevronForwardOutline} slot="icon-only" size="large" />
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItemDivider>
  );
};
