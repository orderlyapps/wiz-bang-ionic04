import { FileSection } from "@base-content/pages/settings/info/ui/css/css-content/components/shared/file-section/FileSection";

export function UtilSection() {
  return (
    <FileSection
      title="util.css"
      path="src/ui/css/util.css"
      description="Reserved for app-wide CSS utility classes that are not tied to a specific component (e.g. layout helpers, spacing, visibility). Currently empty — add shared utility rules here so they are available globally via index.css."
    />
  );
}
