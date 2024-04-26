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
import { ManageAddScore } from "./Lecture/layouts/AddScore/ManageAddScore/ManageAddScore";
import MarksTable from "./layouts/MarksTable/MarksTable";
import MarksEditForm from "./layouts/MarksTable/MarksEditForm";
import StudentMarks from "./layouts/studentMarks/StudentMarks";
import StudentMarksEditForm from "./layouts/studentMarks/StudentMarksEditForm";
import StudentCourseEditLayout from "./layouts/studentMarks/StudentCourseEditLayout";
import ThirdYearEligibility from "./layouts/Dean/ThirdYearEligibility/ThirdYearEligibility";
import HomePageAR from "./layouts/AR/HomePage/HomePageAR";
import ViewMarks from "./layouts/AR/ViewMarks/ViewMarks";
import FinalStudentMarks from "./layouts/Dean/FinalMarks/FinalStudentMarks";
import HODDashBoard from "./layouts/HOD/HODDashBoard";
import HODMarksTable from "./layouts/HOD/HODMarksTable";
import HODMarksEditForm from "./layouts/HOD/HODMarksEditForm";
import CAMarkTable from "./layouts/HOD/CAMarkTable";
import MarksCheckingForm from "./layouts/HOD/MarksCheckingForm";
import SystemAnalystDashBoard from "./layouts/SystemAnalyst/SystemAnalystDashBoard";
import AttendenceSA from "./layouts/SystemAnalyst/AttendenceSA";
import MedicalsSA from "./layouts/SystemAnalyst/MedicalsSA";
import SAUserReg from "./layouts/SystemAnalyst/SAUserReg";
import SAUserManage from "./layouts/SystemAnalyst/SAUserManage";
import ViewAllLecturers from "./layouts/SystemAnalyst/ViewAllLecturers";
import AddLecturers from "./layouts/SystemAnalyst/AddLecturers";
import EditLecturers from "./layouts/SystemAnalyst/EditLecturers";
import EditUser from "./layouts/SystemAnalyst/EditUser";
import ViewAllUsers from "./layouts/SystemAnalyst/ViewAllUsers";
import DataTable from "./layouts/Components/AR/DataTable/DataTable";
import HODMarksReturnSheet from "./layouts/HOD/HODMarksReturnSheet";
import DeanFinalMarkSheet from "./layouts/Dean/FinalMarks/DeanFinalMarkSheet";


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
        {/* <Navebar /> */}
        <div className="flex-grow-1">
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
              <HomePage />
            </Route>
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

          <Route path="/deanFinalMarkSheet">
            <DeanFinalMarkSheet/>
          </Route>

          <Route path="/thirdyeareligibility">
            <ThirdYearEligibility/>
          </Route>

          <Route path="/finalstudentmarks">
            <FinalStudentMarks/>
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

          <Route path="/HODMarksReturnSheet/:course_id">
            <HODMarksReturnSheet/>
          </Route>

          <Route path="/sysandashboard">
            <SystemAnalystDashBoard/>
          </Route>

          <Route path="/attendencesysan">
            <AttendenceSA/>
          </Route>

          <Route path="/medicalsysan">
            <MedicalsSA/>
          </Route>

          <Route path="/userregsysan">
            <SAUserReg/>
          </Route>
          
          <Route path="/viewallusers">
            <ViewAllUsers/>
          </Route>

          <Route path="/viewalllec">
            <ViewAllLecturers/>
          </Route>

          <Route path="/addlec">
            <AddLecturers/>
          </Route>

          <Route path="/editlec">
            <EditLecturers/>
          </Route>

          <Route path="/editUsers">
            <EditUser/>
          </Route>

          <Route path="/viewallUsers">
            <ViewAllUsers/>
          </Route>
            
            <Route path="/addscore">
              <AddScore option={true}/>
            </Route>
            <Route
              path="/login"
              render={() => <LoginWidget config={oktaConfig} />}
            />
            <Route path="/login/callback" component={LoginCallback} />
            <SecureRoute path={"/lecture"}>
              <ManageAddScore />
            </SecureRoute>

            <SecureRoute path={"/ar"}>
              <HomePageAR />
             
            </SecureRoute>
          </Switch>
        </div>
        <Footer />

      </Security>
    </div>
  );
};

export default App;
