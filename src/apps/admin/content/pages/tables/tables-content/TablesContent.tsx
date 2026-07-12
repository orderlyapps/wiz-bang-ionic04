import { NavItem } from "@ui/components/navigation/nav-item/NavItem";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { IonList } from "@ionic/react";

interface TableLink {
  label: string;
  to: string;
}

const table_links: TableLink[] = [
  { label: "Auth OTP Log", to: "/tables/auth-otp-log" },
  { label: "Auth User", to: "/tables/auth-user" },
  { label: "AV Assignment", to: "/tables/av-assignment" },
  { label: "AV Participation", to: "/tables/av-participation" },
  { label: "Clean Major", to: "/tables/clean-major" },
  { label: "Clean Minor", to: "/tables/clean-minor" },
  { label: "Clean Permission", to: "/tables/clean-permission" },
  { label: "Congregation", to: "/tables/congregation" },
  { label: "Congregation Admin", to: "/tables/congregation-admin" },
  { label: "Do Not Call", to: "/tables/do-not-call" },
  { label: "Event", to: "/tables/event" },
  { label: "Group", to: "/tables/group" },
  { label: "Map", to: "/tables/map" },
  { label: "Map Master", to: "/tables/map-master" },
  { label: "Midweek Assignment", to: "/tables/midweek-assignment" },
  { label: "Midweek Meeting Data", to: "/tables/midweek-meeting-data" },
  { label: "Midweek Participation", to: "/tables/midweek-participation" },
  { label: "Not At Home", to: "/tables/not-at-home" },
  { label: "Outline", to: "/tables/outline" },
  { label: "Publisher", to: "/tables/publisher" },
  { label: "Report", to: "/tables/report" },
  { label: "Report Permission", to: "/tables/report-permission" },
  { label: "Speaker Assignment", to: "/tables/speaker-assignment" },
  { label: "Speaker Availability", to: "/tables/speaker-availability" },
  { label: "Speaker Outline", to: "/tables/speaker-outline" },
  { label: "Street", to: "/tables/street" },
  { label: "Suburb", to: "/tables/suburb" },
  { label: "Weekend Assignment", to: "/tables/weekend-assignment" },
  { label: "Weekend Participation", to: "/tables/weekend-participation" },
];

export function TablesContent() {
  return (
    <IonList>
      <MultiColumnList
        items={table_links}
        get_id={(link) => link.to}
        render_item={(link) => <NavItem label={link.label} to={link.to} />}
        column_offset={-1}
      />
    </IonList>
  );
}
