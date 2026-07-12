import { useRef } from "react";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";

interface FileUploadButtonProps {
  label: string;
  accept?: string;
  multiple?: boolean;
  color?: IonicColor;
  fill?: "clear" | "outline" | "solid" | "default";
  size?: "small" | "default" | "large";
  expand?: "block" | "full";
  disabled?: boolean;
  loading?: boolean;
  on_file_select: (files: FileList) => void;
}

export function FileUploadButton({
  label,
  accept,
  multiple = false,
  color,
  fill = "solid",
  size = "default",
  expand = "block",
  disabled = false,
  loading = false,
  on_file_select,
}: FileUploadButtonProps) {
  const input_ref = useRef<HTMLInputElement>(null);

  const handle_click = () => {
    input_ref.current?.click();
  };

  const handle_change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      on_file_select(files);
    }
    event.target.value = "";
  };

  return (
    <>
      <TextButton
        label={label}
        color={color}
        fill={fill}
        size={size}
        expand={expand}
        disabled={disabled || loading}
        on_click={handle_click}
      />
      <input
        ref={input_ref}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handle_change}
        style={{ display: "none" }}
      />
    </>
  );
}
