import {
  IonButton,
  IonButtons,
  IonHeader,
  IonModal,
  IonPicker,
  IonPickerColumn,
  IonPickerColumnOption,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import "./TimePicker.css";

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES_5 = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
const MINUTES_1 = Array.from({ length: 60 }, (_, i) => i);
const PERIODS = ["AM", "PM"] as const;

interface TimePickerProps {
  is_open: boolean;
  value: string;
  on_change: (value: string) => void;
  on_close: () => void;
  minute_step?: 1 | 5;
}

export function TimePicker({
  is_open,
  value,
  on_change,
  on_close,
  minute_step = 5,
}: TimePickerProps) {
  const [hour, set_hour] = useState(12);
  const [minute, set_minute] = useState(0);
  const [period, set_period] = useState<"AM" | "PM">("AM");
  const minutes = minute_step === 1 ? MINUTES_1 : MINUTES_5;

  function handle_open() {
    let h: number;
    let m: number;
    if (value) {
      [h, m] = value.split(":").map(Number);
    } else {
      const now = new Date();
      h = now.getHours();
      m = now.getMinutes();
    }
    set_period(h >= 12 ? "PM" : "AM");
    set_hour(h % 12 === 0 ? 12 : h % 12);
    set_minute((Math.round(m / minute_step) * minute_step) % 60);
  }

  function handle_confirm() {
    const h24 = period === "PM" ? (hour === 12 ? 12 : hour + 12) : hour === 12 ? 0 : hour;
    on_change(`${String(h24).padStart(2, "0")}:${String(minute).padStart(2, "0")}`);
    on_close();
  }

  return (
    <IonModal
      id="time-picker"
      isOpen={is_open}
      onWillPresent={handle_open}
      onDidDismiss={on_close}
      breakpoints={[0, 1]}
      initialBreakpoint={1}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={on_close}>Cancel</IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={handle_confirm}>Done</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonPicker>
        <IonPickerColumn value={hour} onIonChange={(e) => set_hour(e.detail.value as number)}>
          {HOURS.map((h) => (
            <IonPickerColumnOption key={h} value={h}>
              {h}
            </IonPickerColumnOption>
          ))}
        </IonPickerColumn>
        <IonPickerColumn value={minute} onIonChange={(e) => set_minute(e.detail.value as number)}>
          {minutes.map((m) => (
            <IonPickerColumnOption key={m} value={m}>
              {String(m).padStart(2, "0")}
            </IonPickerColumnOption>
          ))}
        </IonPickerColumn>
        <IonPickerColumn
          value={period}
          onIonChange={(e) => set_period(e.detail.value as "AM" | "PM")}
        >
          {PERIODS.map((p) => (
            <IonPickerColumnOption key={p} value={p}>
              {p}
            </IonPickerColumnOption>
          ))}
        </IonPickerColumn>
      </IonPicker>
    </IonModal>
  );
}
