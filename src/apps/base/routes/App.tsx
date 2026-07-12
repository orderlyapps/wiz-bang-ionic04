import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from "@ionic/react";
import { home, settings } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import HomePage from "@base-routes/pages/home/Home";
import SettingsPage from "@base-routes/pages/settings/Settings";
import InfoPage from "@base-routes/pages/settings/info/Info";
import AppearancePage from "@base-routes/pages/settings/appearance/Appearance";
import UiPage from "@base-routes/pages/settings/info/ui/Ui";
import ColorsPage from "@base-routes/pages/settings/info/ui/colors/Colors";
import ComponentsPage from "@base-routes/pages/settings/info/ui/components/Components";
import DisplayPage from "@base-routes/pages/settings/info/ui/components/display/Display";
import AlertDisplayPage from "@base-routes/pages/settings/info/ui/components/display/alert/Alert";
import DataDisplayPage from "@base-routes/pages/settings/info/ui/components/display/data/Data";
import ModalDisplayPage from "@base-routes/pages/settings/info/ui/components/display/modal/Modal";
import TextDisplayPage from "@base-routes/pages/settings/info/ui/components/display/text/Text";
import IconsPage from "@base-routes/pages/settings/info/ui/components/icons/Icons";
import InputsPage from "@base-routes/pages/settings/info/ui/components/inputs/Inputs";
import ButtonPage from "@base-routes/pages/settings/info/ui/components/inputs/button/Button";
import DateTimePage from "@base-routes/pages/settings/info/ui/components/inputs/date-time/DateTime";
import EmailPage from "@base-routes/pages/settings/info/ui/components/inputs/email/Email";
import FilePage from "@base-routes/pages/settings/info/ui/components/inputs/file/File";
import InputWrapperPage from "@base-routes/pages/settings/info/ui/components/inputs/input-wrapper/InputWrapper";
import NumberPage from "@base-routes/pages/settings/info/ui/components/inputs/number/Number";
import OtpPage from "@base-routes/pages/settings/info/ui/components/inputs/otp/Otp";
import PasswordPage from "@base-routes/pages/settings/info/ui/components/inputs/password/Password";
import SearchPage from "@base-routes/pages/settings/info/ui/components/inputs/search/Search";
import ModalSelectPage from "@base-routes/pages/settings/info/ui/components/inputs/modal-select/ModalSelect";
import ModalMultiSelectPage from "@base-routes/pages/settings/info/ui/components/inputs/modal-multi-select/ModalMultiSelect";
import SelectPage from "@base-routes/pages/settings/info/ui/components/inputs/select/Select";
import TextInputPage from "@base-routes/pages/settings/info/ui/components/inputs/text/Text";
import TogglePage from "@base-routes/pages/settings/info/ui/components/inputs/toggle/Toggle";
import LayoutPage from "@base-routes/pages/settings/info/ui/components/layout/Layout";
import NavigationPage from "@base-routes/pages/settings/info/ui/components/navigation/Navigation";
import CssPage from "@base-routes/pages/settings/info/ui/css/Css";
import UtilPage from "@base-routes/pages/settings/info/util/Util";
import AppPage from "@base-routes/pages/settings/info/util/app/App";
import AuthPage from "@base-routes/pages/settings/info/util/app/auth/Auth";
import FeatureGuardPage from "@base-routes/pages/settings/info/util/app/feature-guard/FeatureGuard";
import HelpTextPage from "@base-routes/pages/settings/info/util/app/help-text/HelpText";
import PwaPage from "@base-routes/pages/settings/info/util/app/pwa/Pwa";
import ThemePage from "@base-routes/pages/settings/info/util/app/theme/Theme";
import FontSizePage from "@base-routes/pages/settings/info/util/app/font-size/FontSize";
import NetworkPage from "@base-routes/pages/settings/info/util/app/network/Network";
import ConstantsPage from "@base-routes/pages/settings/info/util/constants/Constants";
import FormatPage from "@base-routes/pages/settings/info/util/format/Format";
import HooksPage from "@base-routes/pages/settings/info/util/hooks/Hooks";
import SortPage from "@base-routes/pages/settings/info/util/sort/Sort";
import VendorPage from "@base-routes/pages/settings/info/util/vendor/Vendor";
import IonicPage from "@base-routes/pages/settings/info/util/vendor/ionic/Ionic";
import ReactPdfPage from "@base-routes/pages/settings/info/util/vendor/react-pdf/ReactPdf";
import MapboxPage from "@base-routes/pages/settings/info/util/vendor/mapbox/Mapbox";
import ReactQueryPage from "@base-routes/pages/settings/info/util/vendor/react-query/ReactQuery";

function App() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/" to="/home" />
        <Route path="/home" component={HomePage} exact />
        <Route path="/settings" component={SettingsPage} exact />
        <Route path="/settings/info" component={InfoPage} exact />
        <Route path="/settings/appearance" component={AppearancePage} exact />
        <Route path="/settings/info/ui" component={UiPage} exact />
        <Route path="/settings/info/ui/colors" component={ColorsPage} exact />
        <Route path="/settings/info/ui/components" component={ComponentsPage} exact />
        <Route path="/settings/info/ui/components/display" component={DisplayPage} exact />
        <Route
          path="/settings/info/ui/components/display/alert"
          component={AlertDisplayPage}
          exact
        />
        <Route path="/settings/info/ui/components/display/data" component={DataDisplayPage} exact />
        <Route
          path="/settings/info/ui/components/display/modal"
          component={ModalDisplayPage}
          exact
        />
        <Route path="/settings/info/ui/components/display/text" component={TextDisplayPage} exact />
        <Route path="/settings/info/ui/components/icons" component={IconsPage} exact />
        <Route path="/settings/info/ui/components/inputs" component={InputsPage} exact />
        <Route path="/settings/info/ui/components/layout" component={LayoutPage} exact />
        <Route path="/settings/info/ui/components/navigation" component={NavigationPage} exact />
        <Route path="/settings/info/ui/css" component={CssPage} exact />
        <Route path="/settings/info/util" component={UtilPage} exact />
        <Route path="/settings/info/util/app" component={AppPage} exact />
        <Route path="/settings/info/util/constants" component={ConstantsPage} exact />
        <Route path="/settings/info/util/format" component={FormatPage} exact />
        <Route path="/settings/info/util/hooks" component={HooksPage} exact />
        <Route path="/settings/info/util/sort" component={SortPage} exact />
        <Route path="/settings/info/util/vendor" component={VendorPage} exact />
        <Route
          path="/settings/info/ui/components/inputs/input-wrapper"
          component={InputWrapperPage}
          exact
        />
        <Route path="/settings/info/ui/components/inputs/button" component={ButtonPage} exact />
        <Route
          path="/settings/info/ui/components/inputs/date-time"
          component={DateTimePage}
          exact
        />
        <Route path="/settings/info/ui/components/inputs/email" component={EmailPage} exact />
        <Route path="/settings/info/ui/components/inputs/file" component={FilePage} exact />
        <Route path="/settings/info/ui/components/inputs/number" component={NumberPage} exact />
        <Route path="/settings/info/ui/components/inputs/otp" component={OtpPage} exact />
        <Route path="/settings/info/ui/components/inputs/password" component={PasswordPage} exact />
        <Route path="/settings/info/ui/components/inputs/search" component={SearchPage} exact />
        <Route
          path="/settings/info/ui/components/inputs/modal-select"
          component={ModalSelectPage}
          exact
        />
        <Route
          path="/settings/info/ui/components/inputs/modal-multi-select"
          component={ModalMultiSelectPage}
          exact
        />
        <Route path="/settings/info/ui/components/inputs/select" component={SelectPage} exact />
        <Route path="/settings/info/ui/components/inputs/text" component={TextInputPage} exact />
        <Route path="/settings/info/ui/components/inputs/toggle" component={TogglePage} exact />
        <Route path="/settings/info/util/app/auth" component={AuthPage} exact />
        <Route path="/settings/info/util/app/feature-guard" component={FeatureGuardPage} exact />
        <Route path="/settings/info/util/app/help-text" component={HelpTextPage} exact />
        <Route path="/settings/info/util/app/pwa" component={PwaPage} exact />
        <Route path="/settings/info/util/app/theme" component={ThemePage} exact />
        <Route path="/settings/info/util/app/font-size" component={FontSizePage} exact />
        <Route path="/settings/info/util/app/network" component={NetworkPage} exact />
        <Route path="/settings/info/util/vendor/ionic" component={IonicPage} exact />
        <Route path="/settings/info/util/vendor/react-pdf" component={ReactPdfPage} exact />
        <Route path="/settings/info/util/vendor/mapbox" component={MapboxPage} exact />
        <Route path="/settings/info/util/vendor/react-query" component={ReactQueryPage} exact />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
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
