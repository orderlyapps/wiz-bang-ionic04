import { IonAccordionGroup, IonItem, IonLabel } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";
import { SetupSection } from "@base-content/pages/settings/info/util/vendor/react-query/react-query-content/components/setup-section/SetupSection";
import { HooksSection } from "@base-content/pages/settings/info/util/vendor/react-query/react-query-content/components/hooks-section/HooksSection";
import { ExamplesSection } from "@base-content/pages/settings/info/util/vendor/react-query/react-query-content/components/examples-section/ExamplesSection";

export function ReactQueryContent() {
  return (
    <>
      <IonItem lines="none">
        <IonLabel>
          <Body>
            The <code>src/util/vendor/react-query</code> module provides a centralized TanStack
            Query (formerly React Query) configuration with pre-configured defaults, provider
            wrapper, and re-exported hooks for data fetching, mutations, and infinite queries.
          </Body>
        </IonLabel>
      </IonItem>

      <Space size="md" />

      <IonAccordionGroup>
        <SetupSection />
        <HooksSection />
        <ExamplesSection />
      </IonAccordionGroup>
    </>
  );
}
