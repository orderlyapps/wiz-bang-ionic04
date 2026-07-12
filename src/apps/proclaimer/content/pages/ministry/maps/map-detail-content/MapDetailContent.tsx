import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

interface Props {
  map_id: string;
  file_type: string;
}

export function MapDetailContent({ map_id, file_type }: Props) {
  return (
    <TransformWrapper>
      <TransformComponent
        wrapperStyle={{ height: "100%", width: "100%" }}
        contentStyle={{ height: "100%", width: "100%" }}
      >
        <img
          src={`https://xeagzahtpjviiklooglo.supabase.co/storage/v1/object/public/maps/${map_id}.${file_type}`}
          alt=""
          style={{ height: "100%", width: "100%", objectFit: "contain" }}
        />
      </TransformComponent>
    </TransformWrapper>
  );
}
