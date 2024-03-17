// import viteLogo from '/vite.svg'
import "./App.css";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { Navebar } from "./layouts/NavbarAndFooter/Navebar";
import { AddScore } from "./layouts/AddScore/AddScore";

import { Redirect, Route, Switch, useHistory } from "react-router-dom";

import { HomePage } from "./layouts/HomePage/HomePage";
import { oktaConfig } from "./lib/oktaConfig";
import { OktaAuth, toRelativeUrl} from '@okta/okta-auth-js';
import { Security, LoginCallback } from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";
import MarksTable from "./layouts/MarksTable/MarksTable";
import MarksEditForm from "./layouts/MarksTable/MarksEditForm";
import StudentMarks from "./layouts/studentMarks/StudentMarks";
import StudentMarksEditForm from "./layouts/studentMarks/StudentMarksEditForm";
import HomePageAR from "./layouts/AR/HomePage/HomePageAR";
import ViewMarksICT from "./layouts/AR/ViewMarksICT/ViewMarksICT";

const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {
  const customAuthHandler = () => {
    history.push("/login");
  };

  const history = useHistory();

  const restoreOriginalUri = async (__oktaAuth: any, orginalUri: any) => {
    history.replace(toRelativeUrl(orginalUri || "/", window.location.origin));
  };
  return (
    <div className="d-flex flex-column min-vh-100">
       <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
      
      <div className="flex-grow-1">
        <Switch>
        
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/addscore">
            <AddScore />
          </Route>
          <Route path="/arhome">
            <HomePageAR/>
          </Route>
          <Route path="/arviewictmarks">
            <ViewMarksICT />
          </Route>
          <Route path="/markstable">
            <MarksTable/>
          </Route>
          <Route path="/markseditform/:id">
            <MarksEditForm/>
          </Route>
          <Route path="/studentmarks">
            <StudentMarks/>
          </Route>

          <Route path="/studentmarkseditform/:id">
            <StudentMarksEditForm/>
          </Route>
          
          <Route path='/login' render={ () => <LoginWidget config={oktaConfig}/>}/>
          <Route path='/login/callback' component={LoginCallback}/>

          {/* <Route>
            <Redirect to="/home" />
          </Route> */}
        </Switch>
      </div>
      <Footer />
      </Security>
    </div>
  );
};

export default App;
