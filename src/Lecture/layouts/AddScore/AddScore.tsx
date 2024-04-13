import { useEffect, useState } from "react";
import AddScoreRequest from "../../../models/AddScoreRequest";
import { useOktaAuth } from "@okta/okta-react";
import { Redirect } from "react-router-dom";
import toastr from "toastr";
import { SpinerLoading } from "../Utils/SpinerLoading";
import LectureCourseModel from "../../../models/LectureCourseModel";
import { error } from "console";
import StudentCourseEnroll from "../../../models/StudentCourseEnroll";

export const AddScore = () => {
  // to handle okta authentication
  const { authState } = useOktaAuth();
  // to handle new score feeding
  const [studentID, setStudentID] = useState("Select a Student");
  const [courseID, setCourseID] = useState("Select a Course");
  const [year, setYear] = useState("");
  const [assignmentType, setassignmentType] = useState(
    "Select an Assignment Tyep"
  );
  const [assignmentScore, setassignmentScore] = useState(0);
  const [reassignmentScore, setreassignmentScore] = useState(0);

  const [level, setlevel] = useState("");
  const [semester, setSemester] = useState(" ");
  const [courseName, setCourseName] = useState<string>("");
  // to keep type as StudentCourseEnroll model.

  // to handle Display Worning and Success
  // const [displayWarning, setDisplayWaring] = useState(false);
  // const [displaySuccess, setDisplaySuccess] = useState(false);

  // to handle Spring Loading
  const [isLoading, setIsloading] = useState(false);

  // to handle fetch course IDs from the database
  const [data, setData] = useState<LectureCourseModel[]>([]);
  const [studentIdsData, setStudentIdsData] =  useState<StudentCourseEnroll[]>([]);

  // Empty dependency array to ensure this effect runs only once on mount
  // fetct courses' IDs related user's state.
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const userName = authState?.idToken?.claims.preferred_username; // get userName from okta
        const courseURL = `http://localhost:9090/api/lectureCourseAssigneds/search/findLectureCourseAssignedByUsername?userName=${userName}`; // API for handlling course Ids.

        const response = await fetch(courseURL); // to fetch data

        if (!response.ok) {
          //throw new Error("Something went wrong!");
          toastr.error("Something want wrong!", "Error"); // to notify any networking issue
        }

        // to handle converting JESON data into object
        const responseJson = await response.json();
        const responseData: LectureCourseModel[] =
          responseJson._embedded.lectureCourseAssigneds.map(
            (item: any) => new LectureCourseModel(item.courseCode)
          );
        // to set data
        setData(responseData);
        setIsloading(false);
      } catch (error: any) {
        // to handle any network issue.
        setIsloading(false);
        toastr.error("Network Error!", "Error: " + error.message);
      }
    };

    fetchCourse(); // to call fetchCourse method.
  }, [authState]);

  // to handle getting name of the course
  const fetchCourseName = async (couresDetailsID: string) => {

    try{
    const courseNameUrl = `http://localhost:9090/api/courseDetails/search/findCourseNameByCourseId?courseId=${couresDetailsID}`;

    const response = await fetch(courseNameUrl);

    if (!response.ok) {
      toastr.error("Network Error", "Error " + response.status);
    }

    const responseJeson = await response.json();

    const responseData = responseJeson._embedded.courseDetails;

    if (responseData.length > 0) {
      // Extract the first course name and update the state
      setCourseName(responseData[0].courseName);
    } else {
      throw new Error("No course name found.");
    }
  }catch(error: any){ //if any network error, it will be displayed.
    toastr.error("Network Error" + error.messages,"Error!" );
  }
  };
 // to get student Ids related course enrollment.
  const fetchStudentDetails = async (studentDetailsId: string) => {
    try {
      const studentDetailsUrl = `http://localhost:9090/api/studentCourseEnrolls/search/findStudentByCourseId?courseId=${studentDetailsId}`;
      const response = await fetch(studentDetailsUrl);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
  
      const responseJson = await response.json();
      const responseData = responseJson._embedded.studentCourseEnrolls;
  
      const loadStudentDetails: StudentCourseEnroll[] = responseData.map((item: any) => ({
        studentId: item.studentId
      }));
  
      setStudentIdsData(loadStudentDetails);
  
      console.log("Updated studentIdsData:", studentIdsData);
    } catch (error) {
      console.error("Error fetching student details:", error);
      toastr.error("Network Error!", "Error: " );
    }
  };
  // to handle dropdown menu properties
  interface DropdownMenuProps {
    options: string[];
    selectedOption: string;
    onSelect: (option: string) => void;
  }
  // to handle all dropdown properties
  const DropdownMenu: React.FC<DropdownMenuProps> = ({
    options,
    selectedOption,
    onSelect,
  }) => {
    setLevelSemesterAndYear();
    return (
      <div className="dropdown">
        <button
          className="form-control btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {selectedOption}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {options.map((option, index) => (
            <li key={index}>
              <a className="dropdown-item" onClick={() => onSelect(option)}>
                {option}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // to store assignment types
  const assignmentTypes: string[] = [
    "QUIZ1",
    "QUIZ2",
    "QUIZ3",
    "ASSIGNMENT1",
    "ASSIGNMENT1",
    "MID",
    "FINAL",
  ];

  // to handle state of the course acordantly user's input.
  const handleCourseSelect = (setCourse: string): void => {
    setCourseID(setCourse);
    fetchCourseName(setCourse); //  call the fetchCourseName function immediately after setting the course ID
    fetchStudentDetails(setCourse); // call studentIds into the drop-drown box.
    
  };
  // to handle state of the student acordantly user's input.
  const handleStudentSelect = (setStudent: string): void => {
    setStudentID(setStudent);
  };
  // to handle assignmment type acordantly user's input.
  const handleAssignmentType = (setAssignmentType: string): void => {
    setassignmentType(setAssignmentType);
  };

  // to filter the year by using the student ID.
  const extractYear = (academicYear: string): string => {
    const parts = academicYear.split("-");
    return parts[1];
  };

  // to filter the semester and level by using the course code.
  const extractSemesterAndLevel = (semesterAndLevel: string): string[] => {
    if (semesterAndLevel !== "Select a Course") {
      const characters = semesterAndLevel.split("");
      const academicLevel = characters[3];
      const academicSemester = characters[4];
      return [academicLevel, academicSemester];
    } else {
      return ["", ""];
    }
  };

  // to hnadle state of student's level, Semester, and academic year.
  const setLevelSemesterAndYear = (): void => {
    const [academicLevel, academicSemester] = extractSemesterAndLevel(courseID);
    setlevel(academicLevel);
    setSemester(academicSemester);
    setYear(extractYear(studentID));
  };

  async function submitScore() {
   

    setIsloading(true);

    // to feed student score
    const url = `http://localhost:9090/api/lecture/add/score`;
    // to ensure validation of data feelds

    try {
      if (
        studentID !== "Select a Student" &&
        courseID !== "Select a Course" &&
        assignmentType !== "Select an Assignment Tyep" &&
        assignmentScore !== null && assignmentScore === reassignmentScore &&
        year !== "" &&
        level !== "" &&
        semester !== ""
      ) {
        // to store data temporary
        const score: AddScoreRequest = new AddScoreRequest(
          studentID,
          courseID,
          year,
          assignmentType,
          assignmentScore,
          level,
          semester
        );

        // to handle the behaviors of data that can be passed into backend.
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(score),
        };

        // to submit score data into the backend.
        const submitScoreResponse = await fetch(url, requestOptions);

        //  to check wether submition is successful or not.
        if (!submitScoreResponse.ok) {
          setIsloading(false);
          toastr.error(
            `Failed to submit score. Status:
         ${submitScoreResponse.status}`,
            "Response Error!"
          );
        }

        setIsloading(false);

        // to set default state of score feeding  feelds.
        setassignmentScore(0);
        setreassignmentScore(0);
        setStudentID("Select a Student");
        setYear("");

        // to desplay succuss alart.
        // setDisplayWaring(false);
        // setDisplaySuccess(true);
        toastr.success(studentID + " Mark Add successfully.", "Succuss!");
      } else {
        setIsloading(false);
        // to desplay worning alart.
        // setDisplayWaring(true);
        // setDisplaySuccess(false);
        toastr.error("Input is not valid", "Error!");
      }
    } catch (error: any) {
      // Handle network errors
      //console.error("Network Error:", error.messages);
      setIsloading(false);
      toastr.error("Network Error occurred.", "Error!");
    } finally {
      setIsloading(false);
    }
  }
  // set default sate of course selection feelds
  const CompleteCourse = (): void => {
    setCourseID("Select a Course");
    setassignmentType("Select an Assignment Tyep");
    setlevel("");
    setSemester("");
    toastr.success("Clear","Success!");
  };
  // to ensure the authentication.
  if (authState?.accessToken?.claims.userType === undefined) {
    return <Redirect to="/home" />;
  }
  // to desplay score feeding form
  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow-lg">
        <div className="card-header card-headr-color"><h5>Score Feeding Section --- </h5></div>
        {isLoading ? (
          <SpinerLoading /> // to load spinner
        ) : (
          <div className="card-body">
            {/*<div className="mt-1 mb-1">
              {displaySuccess && (
                <div className="alert alert-success" role="alert">
                  Mark Add successfully
                </div>
              )}
              {displayWarning && (
                <div className="alert alert-danger" role="alert">
                  All fields must be filled out
                </div>
              )}
            </div>*/}
            <form method="POST">
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label className="form-label">Course ID</label>
                  <select
                    className="form-select"
                    value={courseID}
                    onChange={(e) => handleCourseSelect(e.target.value)}
                  >
                    <option value="">Select a Course</option>
                    {data.map((item) => (
                      <option key={item.courseID} value={item.courseID}>
                        {item.courseID}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3 mb-3">
                  <label className="form-label"> Assignment Type </label>
                  <DropdownMenu // call dropdrown method
                    options={assignmentTypes}
                    selectedOption={assignmentType}
                    onSelect={handleAssignmentType}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Course Name </label>
                  <input
                    type="text"
                    className="form-control"
                    name="author"
                    required
                    value={courseName}
                    disabled={true}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Level</label>
                  <input
                    type="text"
                    className="form-control"
                    name="author"
                    required
                    value={level}
                    disabled={true}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label className="form-label">Semester</label>
                  <input
                    type="text"
                    className="form-control"
                    name="author"
                    required
                    value={semester}
                    disabled={true}
                  />
                </div>
              </div>

              <hr />
              <div className="row">
              <div className="col-md-3 mb-3">
                  <label className="form-label">Student ID</label>
                  <select
                    className="form-select"
                    value={studentID}
                    onChange={(e) => handleStudentSelect(e.target.value)}
                  >
                    <option value="">Select a Student</option>
                    {studentIdsData.map((item) => (
                      <option key={item.studentId} value={item.studentId}>
                        {item.studentId}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Academic Year </label>
                  <input
                    type="text"
                    className="form-control"
                    name="author"
                    required
                    value={year}
                    disabled={true}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Enter Score</label>
                  <input
                    type="text"
                    className="form-control"
                    name="author"
                    required
                    onChange={(e) => setassignmentScore(Number(e.target.value))}
                    value={assignmentScore}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label className="form-label">Re-Enter Score</label>
                  <input
                    type="text"
                    className="form-control"
                    name="author"
                    onChange={(e) => setreassignmentScore(Number(e.target.value))}
                    value={reassignmentScore}
                  />
                </div>
              </div>
              <div className="column">
                <button
                  type="button"
                  className="btn btn-primary mt-3 me-2"
                  onClick={submitScore} // call submit score method
                >
                  Submit State
                </button>

                <button
                  type="button"
                  className="btn btn-success mt-3 ms-2"
                  onClick={CompleteCourse} // call submit score method
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      
    </div>
  );
};
