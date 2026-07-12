import { FileSection } from "@base-content/pages/settings/info/ui/css/css-content/components/shared/file-section/FileSection";

const code = `@import "./util.css";
@import "../../util/vendor/ionic/css/index.css";`;

export function IndexSection() {
  return (
    <FileSection
      title="index.css"
      path="src/ui/css/index.css"
      description="The single entry point for the app's global stylesheet. Imported once from src/main.tsx and aggregates every other stylesheet by pulling in the local utility styles and the vendored Ionic overrides."
      code={code}
    />
  );
}
