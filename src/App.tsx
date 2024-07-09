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
import SAUserReg from "./layouts/SystemAnalyst/SAUserReg";
import AddLecturers from "./layouts/SystemAnalyst/AddLecturers";
import EditLecturers from "./layouts/SystemAnalyst/EditLecturers";
import EditUser from "./layouts/SystemAnalyst/EditUser";
import ViewAllUsers from "./layouts/SystemAnalyst/ViewAllUsers";
import HODMarksReturnSheet from "./layouts/HOD/HODMarksReturnSheet";
import { VcManagment } from "./VC/layouts/VcManagment";
import LecturersManagement from "./layouts/SystemAnalyst/UserManagement/LecturersManagement";
import AssignLecturerCourse from "./layouts/SystemAnalyst/AssignLecturer/AssignLecturerCourse";
import DeanFinalMarkSheet from "./layouts/Dean/FinalMarks/DeanFinalMarkSheet";
import DeanDashBoard from "./layouts/Dean/DeanDashBoard";
import MainNavbar from "./layouts/NavbarAndFooter/MainNavebar";
import DashBoardSA from "./layouts/SystemAnalyst/DashBoardSA/DashBoardSA";
import MedicalsEligibiltyManage from "./layouts/SystemAnalyst/Medicals/MedicalsEligibiltyManage";
import AttendenceEligibilityManage from "./layouts/SystemAnalyst/Attendence/AttendenceEligibilityManage";
import StudentsManagement from "./layouts/SystemAnalyst/UserManagement/StudentsManagement";
import ManageCourseModule from "./layouts/SystemAnalyst/CourseModule/ManageCourseModule";
import CertifyMarksPage from "./layouts/AR/CertifyMarksPage/CertifyMarksPage";
import ViewMedicalPage from "./layouts/AR/ViewMedicalTablePage/ViewMedicalPage";
import CourseCard from "./layouts/Components/HOD/CourseCard";
import StudentRegCourses from "./layouts/SystemAnalyst/StudentCourseReg/StudentRegCourses";
import ABListPage from "./layouts/AR/ABListPage/ABListPage";
import UpdateABPage from "./layouts/AR/UpdateABPage/UpdateABPage";
import CCDashBoard from "./layouts/CourseCoordinator/CCDashBoard";
import CCMarksApproval from "./layouts/CourseCoordinator/CCMarksApproval";
import ViewCAEligibile from "./layouts/CourseCoordinator/ViewCAEligibile";
import CAEligibility from "./layouts/CourseCoordinator/CAEligibility";
import CourseCriteriaByCC from "./layouts/CourseCoordinator/CourseCriteriaByCC";
import ViewMarksTableValidations from "./layouts/Components/AR/DataTable/ViewMarksTableValidations";
import CreateResultBoard from "./layouts/AR/CreateResultBoard/CreateResultBoard";
import ResultBoardMarksSheetAssign from "./layouts/AR/ResultBoardMarksSheetAssign/ResultBoardMarksSheetAssign";
import HomePageStudent from "./layouts/Student/HomePageStudent/HomePageStudent";
import StudentmedicalView from "./layouts/Student/StudentMedicalView/StudentMedicalView";
import StudentViewEligibility from "./layouts/Student/StudentViewEligibility/StudentViewEligibility";
import StudentViewCourseDetails from "./layouts/Student/StudentViewCourseDetails/StudentViewCourseDetails";
import StudentViewCourseCriteria from "./layouts/Student/StudentViewCourseCriteria/StudentViewCourseCriteria";
import StudentWithHeldSubjects from "./layouts/Student/StudentWithHeldSubjects/StudentWithHeldSubjects";




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
        <MainNavbar/>
        <div className="flex-grow-1">
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
              <HomePage />
            </Route>
            <Route path="/home">
              <HomePage />
            </Route>

            
          {/* AR navigations start here ---------------------------------------------*/}
          <Route path="/arhome">  {/*Link to AR Home page*/}
            <HomePageAR/>
          </Route>

          <Route path="/viewablist">  {/* Link to view AB student list page */}
            <ABListPage/>
          </Route>

          <Route path="/viewABUpdate/updateAB/:course_id/:course_name/:student_id/:grade/:exam_type/:academic_year">  {/* Link to AB status update form */}
            <UpdateABPage/>
          </Route>

          <Route path="/arviewictmarks">  {/* Link to view ICT marks page - Level selection */}
            <ViewMarks department_id={"ICT"}/>
          </Route>

          <Route path="/arviewetmarks">  {/* Link to view ET marks page - Level selection */}
            <ViewMarks department_id={"ET"}/>
          </Route>

          <Route path="/arviewbstmarks">  {/* Link to view BST marks page - Level selection */}
            <ViewMarks department_id={"BST"}/>
          </Route>

          <Route path="/arviewmtdmarks">    {/* Link to view Multi Disciplinary marks page - Level selection */}
            <ViewMarks department_id={"Multi_Disciplinary"}/>
          </Route>

          <Route path="/viewMarks/:course_id/:course_name">   {/* Link to view marks remaining to approve page validations */}
            {/* <ViewMarksTable/> */}
            <ViewMarksTableValidations/>
          </Route>

          <Route path="/ARMarksReturnSheet/:course_id/:course_name">    {/* Link to view ar Marks certify sheet*/}
            <HODMarksReturnSheet approved_level={"HOD"}/>
          </Route>



          <Route path="/arCertifyMarks">  {/* Link to certify ICT marks page */}
            <CertifyMarksPage/>
          </Route>
        
          <Route path="/arFinalMarkSheet/:level/:semester/:dept">   {/* Link to view marks remaining to certify page */}
            <DeanFinalMarkSheet approved_level={"RB"}/>
          </Route>

          <Route path="/viewMedicals">   {/* Link to view medical page */}
            <ViewMedicalPage/>
          </Route>

          <Route path="/createResultsBoard">   {/* Link to create results board page */}
            <CreateResultBoard/>
          </Route>

          <Route path="/arViewResultsBoard">  {/* Link to view results board page */}
            <ResultBoardMarksSheetAssign/>
          </Route>

          {/* AR navigations ends here ---------------------------------------------*/}





          {/* Student navigations starts here ---------------------------------------------*/}
          <Route path="/studenthome">       {/*Link to Student Home page*/}
            <HomePageStudent/>
          </Route>

          <Route path="/studentMedicalView">  {/*Link to Student Medical view page*/}
            <StudentmedicalView/>
          </Route>

          <Route path="/studentEligibilityView">    {/*Link to Student Eligibility view page*/}
            <StudentViewEligibility/>
          </Route>

          <Route path="/studentViewCourseDetails">      {/*Link to Student Course details view page*/}
            <StudentViewCourseDetails/>
          </Route>

          <Route path="/studentViewCourseCriteria">     {/*Link to Student Course criteria view page*/}
            <StudentViewCourseCriteria/>
          </Route>


          <Route path ="/studentViewWithHeldSubjects">      {/*Link to Student Withheld subjects view page*/}
            <StudentWithHeldSubjects/>
          </Route>

          





          {/* Student navigations ends here ---------------------------------------------*/}

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

          <Route path="/deanFinalMarkSheet/:level/:semester/:dept">
            <DeanFinalMarkSheet approved_level={"AR"}/>
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

          <Route path="/CourseCard/:level/:semester/:department">
            <CourseCard approved_level={"lecturer"}/>
          </Route>

          <Route path="/HODmarkstable">
            <HODMarksTable/>
          </Route>

          <Route path="/CAMarkTable/:course_id">
            <CAMarkTable/>
          </Route>

          <Route path="/MarksCheckingForm/:course_id/:course_name">
            <MarksCheckingForm/>
          </Route>
 
          <Route path="/HODmarkseditform/:id">
            <HODMarksEditForm/>
          </Route>

          <Route path="/HODMarksReturnSheet/:course_id/:course_name/:department">
          <HODMarksReturnSheet approved_level={"lecturer"}/>
        </Route>

        <Route path="/ccMarksReturnSheet/:course_id/:course_name/:department">
          <HODMarksReturnSheet approved_level={"finalized"}/>
        </Route>

        

          <Route path="/sysandashboard">
            <SystemAnalystDashBoard/>
          </Route>

          <Route path="/attendencesysan">
            <AttendenceEligibilityManage/>
          </Route>

          <Route path="/medicalsysan">
            <MedicalsEligibiltyManage/>
          </Route>

          <Route path="/userregsysan">
            <SAUserReg/>
          </Route>
          
          <Route path="/viewallusers">
            <ViewAllUsers/>
          </Route>

          <Route path="/manageallstudents">
            <StudentsManagement/>
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

          <Route path="/managestaff">
            <LecturersManagement/>
          </Route>

          <Route path="/assignleccourse">
            <AssignLecturerCourse/>
          </Route>

          <Route path="/sysanicoursemodule">
            <ManageCourseModule/>
          </Route>

          <Route path="/screg">
            <StudentRegCourses/>
          </Route>

          <Route path="/ccmarksapproval">
            <CCMarksApproval/>
          </Route>

          <Route path="/viewcaeli">
            <ViewCAEligibile/>
          </Route>
          
            <Route path="/caeli/:course_id/:course_name">
              <CAEligibility/>
            </Route>

          <Route path="/cccbycc">
            <CourseCriteriaByCC />
          </Route>
          
          
            <Route path="/addscore">
              <AddScore option={true} />
            </Route>
            <Route
              path="/login"
              render={() => <LoginWidget config={oktaConfig} />}
            />
            <Route path="/login/callback" component={LoginCallback} />
            <SecureRoute path="/lecture">
              <ManageAddScore />
            </SecureRoute>

            <SecureRoute path="/vc">
              <VcManagment/>
            </SecureRoute>


            <SecureRoute path={"/ar"}>        {/*Login to AR */}
              <HomePageAR />
            
            </SecureRoute>

            <SecureRoute path={"/HOD"}>
              <HODDashBoard/>
            </SecureRoute>

            <SecureRoute path={"/dean"}>
              <DeanDashBoard/>
            </SecureRoute>

            <SecureRoute path={"/system_analysis"}>
              <DashBoardSA/>
            </SecureRoute>

            <SecureRoute path={"/course_cordinator"}>
              <CCDashBoard/>
            </SecureRoute>

            <SecureRoute path={"/student"}>       {/*Login to Student */}
              <HomePageStudent/>
            </SecureRoute>


          </Switch>
        </div>
        <Footer />
      </Security>
    </div>
  );
};

export default App;
