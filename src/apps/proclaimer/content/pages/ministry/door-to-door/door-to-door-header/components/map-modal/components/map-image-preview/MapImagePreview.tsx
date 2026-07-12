import { createPortal } from "react-dom";
import { IonButton, IonIcon } from "@ionic/react";
import { close } from "ionicons/icons";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { Space } from "@ui/components/layout/space/Space";

interface Props {
  url: string;
  on_dismiss: () => void;
}

export function MapImagePreview({ url, on_dismiss }: Props) {
  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 20000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(6px)",
        }}
        onClick={on_dismiss}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100vw",
          height: "100vh",
          background: "var(--ion-background-color)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <IonButton
          fill="clear"
          style={{ position: "absolute", top: 4, right: 4, zIndex: 2 }}
          onClick={on_dismiss}
        >
          <Space size="2xl" />
          <IonIcon slot="icon-only" icon={close} size="large" />
        </IonButton>
        <TransformWrapper>
          <TransformComponent
            wrapperStyle={{ height: "100%", width: "100%" }}
            contentStyle={{ height: "100%", width: "100%" }}
          >
            <img src={url} alt="" style={{ height: "100%", width: "100%", objectFit: "contain" }} />
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>,
    document.body,
  );
}
