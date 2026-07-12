import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import HomePage from "@subbie-routes/pages/home/Home";

function App() {
  return (
    <IonRouterOutlet>
      <Redirect exact path="/" to="/home" />
      <Route path="/home" component={HomePage} exact />
    </IonRouterOutlet>
  );
}

export default App;
