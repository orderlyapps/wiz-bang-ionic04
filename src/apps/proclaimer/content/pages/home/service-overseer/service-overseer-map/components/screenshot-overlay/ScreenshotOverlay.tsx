type Props = {
  name: string;
  details?: string | null;
  fontSize: number;
};

export function ScreenshotOverlay({ name, details, fontSize }: Props) {
  return (
    <div
      style={{
        position: "absolute",
        top: 12,
        left: 12,
        zIndex: 10,
        background: "white",
        borderRadius: 8,
        padding: "10px 14px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
        pointerEvents: "none",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: fontSize, color: "#111827", lineHeight: 1.3 }}>
        {name}
      </div>
      {details && (
        <div style={{ fontSize: fontSize * 0.8, color: "#6b7280", marginTop: 3, lineHeight: 1.4 }}>
          {details}
        </div>
      )}
    </div>
  );
}
