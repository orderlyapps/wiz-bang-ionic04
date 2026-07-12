import { LogoIcon } from "@shared/icons/logo/LogoIcon";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { useStoredPublisher } from "@proclaimer-shared/publisher/useStoredPublisher";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Space } from "@ui/components/layout/space/Space";
import { HomeTools } from "./components/home-tools/HomeTools";
import { HomeEvents } from "./components/home-events/HomeEvents";
import { HomeAssignments } from "./components/home-assignments/HomeAssignments";

export function HomeContent() {
  const publisher = useStoredPublisher();

  return (
    <>
      <Space />
      <div className="ion-text-center ion-padding">
        <LogoIcon size="4xl" color="primary" />
        <div className="ion-text-center ion-margin">
          {publisher && (
            <Heading size="xl" color="primary">
              <div> Welcome </div>
              <div>{getPublisherDisplayName(publisher, "first_last")}</div>
            </Heading>
          )}
          {!publisher && (
            <Heading size="2xl" bold color="primary">
              Welcome to Proclaimer
            </Heading>
          )}
        </div>
      </div>

      <Space size="sm" />

      <HomeAssignments />

      <Space size="sm" />

      <HomeEvents />

      <Space size="sm" />

      <HomeTools />
    </>
  );
}
