// import viteLogo from '/vite.svg'
import "./App.css";
import { Footer } from "./Lecture/layouts/NavbarAndFooter/Footer";
import { Navebar } from "./Lecture/layouts/NavbarAndFooter/Navebar";
import { AddScore } from "./Lecture/layouts/AddScore/AddScore";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { HomePage } from "./Lecture/layouts/HomePage/HomePage";
import { oktaConfig } from "./lib/oktaConfig";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security, LoginCallback, SecureRoute } from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";


import MarksTable from "./layouts/MarksTable/MarksTable";
import MarksEditForm from "./layouts/MarksTable/MarksEditForm";
import StudentMarks from "./layouts/studentMarks/StudentMarks";
import StudentMarksEditForm from "./layouts/studentMarks/StudentMarksEditForm";

import StudentCourseEditLayout from "./layouts/studentMarks/StudentCourseEditLayout";
import ThirdYearEligibility from "./layouts/Dean/ThirdYearEligibility/ThirdYearEligibility";
import HomePageAR from "./layouts/AR/HomePage/HomePageAR";
import ViewMarks from "./layouts/AR/ViewMarks/ViewMarks";
import FinalStudentMarks from "./layouts/Dean/FinalMarks/FinalStudentMarks";
import FinalStudentMarksEditFrom from "./layouts/Dean/FinalMarks/FinalStudentMarksEditFrom";
import DataTable from "./layouts/Components/DataTable/DataTable";
import HODDashBoard from "./layouts/HOD/HODDashBoard";
import HODMarksTable from "./layouts/HOD/HODMarksTable";
import HODMarksEditForm from "./layouts/HOD/HODMarksEditForm";
import CAMarkTable from "./layouts/HOD/CAMarkTable";
import MarksCheckingForm from "./layouts/HOD/MarksCheckingForm";



// to configure okta authentication
const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {
  // to handle authentication
  const customAuthHandler = () => {
    history.push("/login");
  };

  const history = useHistory();

  const restoreOriginalUri = async (__oktaAuth: any, orginalUri: any) => {
    history.replace(toRelativeUrl(orginalUri || "/", window.location.origin));
  };

  // to handle routing
  return (
    <div className="d-flex flex-column min-vh-100">

      <Security
        oktaAuth={oktaAuth}
        restoreOriginalUri={restoreOriginalUri}
        onAuthRequired={customAuthHandler}
      >
        <Navebar />
        <div className="flex-grow-1">
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
              <HomePage />
            </Route>
            <Route path="/home">
              <HomePage />
            </Route>
            <Route path="/addscore">
              <AddScore />
            </Route>
            <Route
              path="/login"
              render={() => <LoginWidget config={oktaConfig} />}
            />
            <Route path="/login/callback" component={LoginCallback} />
            <SecureRoute path={"/lecture"}>
              <AddScore />
            </SecureRoute>
          </Switch>
        </div>
        <Footer />

       <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
      
      <div className="flex-grow-1">
        <Switch>
        
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/arhome">
            <HomePageAR/>
          </Route>
          <Route path="/arviewictmarks">
            <ViewMarks department_id={"ICT"}/>
          </Route>
          <Route path="/arviewetmarks">
            <ViewMarks department_id={"ET"}/>
          </Route>
          <Route path="/arviewbstmarks">
            <ViewMarks department_id={"BST"}/>
          </Route>
          <Route path="/arviewmtdmarks">
            <ViewMarks department_id={"Multi_Disciplinary"}/>
          </Route>
          <Route path="/viewMarksRemainingToApprove/:course_id/:course_name/:previousRole">
            <DataTable/>
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

          <Route path="/studentmarkseditform/:student_id">
            <StudentMarksEditForm/>
          </Route>

          <Route path="/studentlayout">
            <StudentCourseEditLayout/>
          </Route>

          <Route path="/thirdyeareligibility">
            <ThirdYearEligibility/>
          </Route>

          <Route path="/finalstudentmarks">
            <FinalStudentMarks/>
          </Route>

          
          <Route path="/finalstudentmarkseditfrom/:student_id">
            <FinalStudentMarksEditFrom/>
          </Route>

          <Route path="/HODDashBoard">
            <HODDashBoard/>
          </Route>

          <Route path="/HODmarkstable">
            <HODMarksTable/>
          </Route>

          <Route path="/CAMarkTable/:course_id">
            <CAMarkTable/>
          </Route>

          <Route path="/MarksCheckingForm/:student_id/:course_id">
            <MarksCheckingForm/>
          </Route>

          

          
          <Route path="/HODmarkseditform/:id">
            <HODMarksEditForm/>
          </Route>

          <Route path='/login' render={ () => <LoginWidget config={oktaConfig}/>}/>
          <Route path='/login/callback' component={LoginCallback}/>

          <SecureRoute path='/addscore'>
            <AddScore />
          </SecureRoute>

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
