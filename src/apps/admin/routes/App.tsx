import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from "@ionic/react";
import { grid, settings, tabletPortrait } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import { AdminSignInGuard } from "../auth/admin-sign-in-guard/AdminSignInGuard";
import DashboardPage from "@admin-routes/pages/dashboard/Dashboard";
import SettingsPage from "@admin-routes/pages/settings/Settings";
import AppearancePage from "@admin-routes/pages/settings/appearance/Appearance";
import TablesPage from "@admin-routes/pages/tables/Tables";
import AuthOtpLogPage from "@admin-routes/pages/tables/auth-otp-log/AuthOtpLog";
import AuthUserPage from "@admin-routes/pages/tables/auth-user/AuthUser";
import AvAssignmentPage from "@admin-routes/pages/tables/av-assignment/AvAssignment";
import AvParticipationPage from "@admin-routes/pages/tables/av-participation/AvParticipation";
import CleanMajorPage from "@admin-routes/pages/tables/clean-major/CleanMajor";
import CleanMinorPage from "@admin-routes/pages/tables/clean-minor/CleanMinor";
import CleanPermissionPage from "@admin-routes/pages/tables/clean-permission/CleanPermission";
import CongregationPage from "@admin-routes/pages/tables/congregation/Congregation";
import CongregationDetailPage from "@admin-routes/pages/tables/congregation/congregation-detail/CongregationDetail";
import CongregationAdminPage from "@admin-routes/pages/tables/congregation-admin/CongregationAdmin";
import DoNotCallPage from "@admin-routes/pages/tables/do-not-call/DoNotCall";
import EventPage from "@admin-routes/pages/tables/event/Event";
import GroupPage from "@admin-routes/pages/tables/group/Group";
import MapPage from "@admin-routes/pages/tables/map/Map";
import MapMasterPage from "@admin-routes/pages/tables/map-master/MapMaster";
import MidweekAssignmentPage from "@admin-routes/pages/tables/midweek-assignment/MidweekAssignment";
import MidweekMeetingDataPage from "@admin-routes/pages/tables/midweek-meeting-data/MidweekMeetingData";
import MidweekParticipationPage from "@admin-routes/pages/tables/midweek-participation/MidweekParticipation";
import NotAtHomePage from "@admin-routes/pages/tables/not-at-home/NotAtHome";
import OutlinePage from "@admin-routes/pages/tables/outline/Outline";
import PublisherPage from "@admin-routes/pages/tables/publisher/Publisher";
import ReportPage from "@admin-routes/pages/tables/report/Report";
import ReportPermissionPage from "@admin-routes/pages/tables/report-permission/ReportPermission";
import SpeakerAssignmentPage from "@admin-routes/pages/tables/speaker-assignment/SpeakerAssignment";
import SpeakerAvailabilityPage from "@admin-routes/pages/tables/speaker-availability/SpeakerAvailability";
import SpeakerOutlinePage from "@admin-routes/pages/tables/speaker-outline/SpeakerOutline";
import StreetPage from "@admin-routes/pages/tables/street/Street";
import SuburbPage from "@admin-routes/pages/tables/suburb/Suburb";
import WeekendAssignmentPage from "@admin-routes/pages/tables/weekend-assignment/WeekendAssignment";
import WeekendParticipationPage from "@admin-routes/pages/tables/weekend-participation/WeekendParticipation";

function App() {
  return (
    <IonTabs>
      <AdminSignInGuard />
      <IonRouterOutlet>
        <Redirect exact path="/" to="/dashboard" />
        <Route path="/dashboard" component={DashboardPage} exact />
        <Route path="/settings" component={SettingsPage} exact />
        <Route path="/settings/appearance" component={AppearancePage} exact />
        <Route path="/tables" component={TablesPage} exact />
        <Route path="/tables/auth-otp-log" component={AuthOtpLogPage} exact />
        <Route path="/tables/auth-user" component={AuthUserPage} exact />
        <Route path="/tables/av-assignment" component={AvAssignmentPage} exact />
        <Route path="/tables/av-participation" component={AvParticipationPage} exact />
        <Route path="/tables/clean-major" component={CleanMajorPage} exact />
        <Route path="/tables/clean-minor" component={CleanMinorPage} exact />
        <Route path="/tables/clean-permission" component={CleanPermissionPage} exact />
        <Route path="/tables/congregation" component={CongregationPage} exact />
        <Route path="/tables/congregation/:id" component={CongregationDetailPage} exact />
        <Route path="/tables/congregation-admin" component={CongregationAdminPage} exact />
        <Route path="/tables/do-not-call" component={DoNotCallPage} exact />
        <Route path="/tables/event" component={EventPage} exact />
        <Route path="/tables/group" component={GroupPage} exact />
        <Route path="/tables/map" component={MapPage} exact />
        <Route path="/tables/map-master" component={MapMasterPage} exact />
        <Route path="/tables/midweek-assignment" component={MidweekAssignmentPage} exact />
        <Route path="/tables/midweek-meeting-data" component={MidweekMeetingDataPage} exact />
        <Route path="/tables/midweek-participation" component={MidweekParticipationPage} exact />
        <Route path="/tables/not-at-home" component={NotAtHomePage} exact />
        <Route path="/tables/outline" component={OutlinePage} exact />
        <Route path="/tables/publisher" component={PublisherPage} exact />
        <Route path="/tables/report" component={ReportPage} exact />
        <Route path="/tables/report-permission" component={ReportPermissionPage} exact />
        <Route path="/tables/speaker-assignment" component={SpeakerAssignmentPage} exact />
        <Route path="/tables/speaker-availability" component={SpeakerAvailabilityPage} exact />
        <Route path="/tables/speaker-outline" component={SpeakerOutlinePage} exact />
        <Route path="/tables/street" component={StreetPage} exact />
        <Route path="/tables/suburb" component={SuburbPage} exact />
        <Route path="/tables/weekend-assignment" component={WeekendAssignmentPage} exact />
        <Route path="/tables/weekend-participation" component={WeekendParticipationPage} exact />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="dashboard" href="/dashboard">
          <IonIcon icon={grid} />
          <IonLabel>Dashboard</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tables" href="/tables">
          <IonIcon icon={tabletPortrait} />
          <IonLabel>Tables</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/settings">
          <IonIcon icon={settings} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

export default App;
