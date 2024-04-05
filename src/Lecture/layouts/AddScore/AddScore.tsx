import { useEffect, useState } from "react";
import AddScoreRequest from "../../../models/AddScoreRequest";
import { useOktaAuth } from "@okta/okta-react";
import { Redirect } from "react-router-dom";
import toastr from "toastr";

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
  const [assignmentScoreFeedingType, setassignmentScoreFeedingScore] = useState(
    "Select Score Feeding Type"
  );
  const [level, setlevel] = useState("");
  const [semester, setSemester] = useState(" ");

  // to handle Display Worning and Success
  const [displayWarning, setDisplayWaring] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  // fetct courses' data relavant user's state
 useEffect(() => {
 
   const fetchCourse = async () => {
         
    
   }

           
 })

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

  

  // to store course ID
  const courses: string[] = ["ICT1112", "ICT1122", "ICT1132", "ICT2242"];
  const students: string[] = [
    "TG-2020-671",
    "TG-2021-672",
    "TG-2020-673",
    "TG-2020-674",
  ];

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
    // console.log(studentID);
    // console.log(courseID);
    // console.log(assignmentScore);
    // console.log(year);
    // console.log(level);
    // console.log(semester);

    // to feed student score
    const url = `http://localhost:9090/api/lecture/add/score`;
    // to ensure validation of data feelds
    if (
      studentID !== "" &&
      courseID !== "" &&
      assignmentType !== "" &&
      assignmentScore !== null &&
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
        toastr.error("Network Error.", "Error!");
      }
      // to set default state of score feeding  feelds.
      setassignmentScore(0);
      setStudentID("Select a Student");
      setYear("");
      // to desplay succuss alart.

      setDisplayWaring(false);
      setDisplaySuccess(true);
      toastr.success(studentID + " Mark Add successfully.", "Succuss!");
    } else {
      // to desplay worning alart.

      setDisplayWaring(true);
      setDisplaySuccess(false);
      toastr.error("Please fill required fields.", "Error!");
    }
  }

  // set default sate of course selection feelds
  const CompleteCourse = (): void => {
    setCourseID("Select a Course");
    setassignmentType("Select an Assignment Tyep");
    setlevel("");
    setSemester("");
  };
  // to ensure the authentication.
  if (authState?.accessToken?.claims.userType === undefined) {
    return <Redirect to="/home" />;
  }
  // to desplay score feeding form
  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow-lg">
        <div className="card-header">Score Feeding Section</div>

        <div className="card-body">
          <div className="mt-1 mb-1">
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
          </div>
          <form method="POST">
            <div className="row">
              <div className="col-md-3 mb-3">
                <label className="form-label">Course ID</label>
                <DropdownMenu // call dropdrown method 
                  options={courses}
                  selectedOption={courseID}
                  onSelect={handleCourseSelect}
                />
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
                <DropdownMenu // call dropdrown method
                  options={students}
                  selectedOption={studentID}
                  onSelect={handleStudentSelect}
                />
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
            </div>
            <div className="row">
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
              <div className="col-md-3 mb-3">
                <label className="form-label">Re-Enter Score</label>
                <input
                  type="text"
                  className="form-control"
                  name="author"
                  required
                />
              </div>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={submitScore} // call submit score method
              >
                Submit State
              </button>
            </div>
          </form>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary mt-3"
        onClick={CompleteCourse}
      >
        Complete Selected Course
      </button>
    </div>
  );
};
