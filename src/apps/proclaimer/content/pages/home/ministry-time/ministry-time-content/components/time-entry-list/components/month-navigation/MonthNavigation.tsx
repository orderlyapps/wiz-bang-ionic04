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
} from "@ionic/react";
import { addMonths } from "date-fns/addMonths";
import { format } from "date-fns/format";
import { parseISO } from "date-fns/parseISO";
import { Body } from "@ui/components/display/text/body/Body";
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";

interface MonthNavigationProps {
  month: string;
  on_change: (month: string) => void;
}

function currentMonthStr(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export function MonthNavigation({ month, on_change }: MonthNavigationProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const currentDate = parseISO(`${month}-01T00:00:00`);
  const monthLabel = format(currentDate, "MMMM yyyy");
  const now = new Date();
  const monthOptions = Array.from({ length: 24 }, (_, i) => {
    const monthDate = addMonths(new Date(now.getFullYear(), now.getMonth(), 1), -i);
    const monthId = format(monthDate, "yyyy-MM");
    return { monthId, label: format(monthDate, "MMMM yyyy"), is_selected: monthId === month };
  });
  const prevMonth = format(addMonths(currentDate, -1), "yyyy-MM");
  const nextMonth = format(addMonths(currentDate, 1), "yyyy-MM");

  return (
    <IonItemDivider sticky style={{ zIndex: 1000 }}>
      <IonGrid>
        <IonRow>
          <IonCol size="auto">
            <IonButton fill="clear" onClick={() => on_change(prevMonth)}>
              <IonIcon icon={chevronBackOutline} slot="icon-only" size="large" />
            </IonButton>
          </IonCol>
          <IonCol
            id="month-popover-trigger"
            className="ion-text-center ion-align-self-center"
            onClick={() => setPopoverOpen(true)}
          >
            <Body color="primary" size="sm" bold>
              {monthLabel}
            </Body>
          </IonCol>
          <IonPopover
            id="month-nav"
            trigger="month-popover-trigger"
            isOpen={popoverOpen}
            onDidDismiss={() => setPopoverOpen(false)}
          >
            <IonList>
              {monthOptions.map((opt) => (
                <IonItem
                  key={opt.monthId}
                  lines="none"
                  onClick={() => {
                    setPopoverOpen(false);
                    if (!opt.is_selected) on_change(opt.monthId);
                  }}
                >
                  <Body
                    size={opt.is_selected ? "md" : "sm"}
                    color={opt.is_selected ? "primary" : undefined}
                    bold={opt.is_selected}
                  >
                    {opt.label}
                  </Body>
                </IonItem>
              ))}
            </IonList>
          </IonPopover>
          <IonCol size="auto">
            <IonButton
              fill="clear"
              disabled={nextMonth > currentMonthStr()}
              onClick={() => on_change(nextMonth)}
            >
              <IonIcon icon={chevronForwardOutline} slot="icon-only" size="large" />
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItemDivider>
  );
}
