
import { Navebar } from "../../NavbarAndFooter/Navebar";
import AddScoreRequest from "../../../models/AddScoreRequest";
import { useOktaAuth } from "@okta/okta-react";
import { Redirect } from "react-router-dom";
import { useState } from "react";


export const AddScore = () => {

  const { authState } = useOktaAuth();
  // new marks
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
  const [semester, setSemester] = useState("");

  // Display
  const [displayWarning, setDisplayWaring] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  interface DropdownMenuProps {
    options: string[];
    selectedOption: string;
    onSelect: (option: string) => void;
  }

  const DropdownMenu: React.FC<DropdownMenuProps> = ({
    options,
    selectedOption,
    onSelect,
  }) => {
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
              <a
                className="dropdown-item"
                onClick={() => onSelect(option)}
                href="#"
              >
                {option}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const courses: string[] = [
  "ICT1112", 
  "ICT1122", 
  "ICT1132", 
  "ICT2242"
];
  const students: string[] = [
    "TG-2020-671",
    "TG-2021-672",
    "TG-2020-673",
    "TG-2020-674",
  ];
  const assignmentTypes: string[] = [
    "QUIZE01",
    "QUIZE02",
    "QUIZE03",
    "ASSISTMENT01",
    "MID",
  ];
  const scoreFeedingType: string[] = ["HOLD", "FEED SCORE"];

  const handleCourseSelect = (setCourse: string): void => {
    setCourseID(setCourse);
    
  };

  const handleStudentSelect = (setStudent: string): void => {
    setStudentID(setStudent);
   
  };

  const handleAssignmentType = (setAssignmentType: string): void => {
    setassignmentType(setAssignmentType);
  };

  const handleScoreFeedingType = (
    setAssignmentScoreFeedingType: string
  ): void => {
    setassignmentScoreFeedingScore(setAssignmentScoreFeedingType);
  };

  const extractYear = (academicYear: string) : string => {
       const parts = academicYear.split('-');
       return parts[1];
  };

  const extractSemesterAndLevel = (semesterAndLevel: string) : string[] =>{
    const characters = semesterAndLevel.split('');
    const academicLevel = characters[3];
    const academicSemester = characters[4];

    return [academicLevel,academicSemester];
  }

  const setLevelSemesterAndYear = (): void =>{
    const [academicLevel,academicSemester] = extractSemesterAndLevel(courseID);

    setlevel(academicLevel);
    setSemester(academicSemester);

    setYear(extractYear(studentID));

   
  }

  async function submitScore() {

  
    
   console.log(studentID)
   console.log(courseID)
   console.log(assignmentScore)
   console.log(year)
   console.log(level)
   console.log(semester)
     
    const url = `http://localhost:9090/api/lecture/add/score`;
    if(studentID !== '' && courseID !== '' && assignmentType !== '' 
    && assignmentScore !== null && year !== '' && level !== '' && semester !== ''){
          const score: AddScoreRequest = new AddScoreRequest(studentID,courseID,year,
                                                             assignmentType,assignmentScore,level,semester);
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(score)
          };

          const submitScoreResponse = await fetch(url, requestOptions);
          if(!submitScoreResponse.ok){
            throw new Error("Somthing went wrong!");
          }
          setStudentID('')
          setCourseID('')
          setassignmentType('')
          setassignmentScore(0)
          setYear('')
          setlevel('')
          setSemester('')
          setDisplayWaring(false)
          setDisplaySuccess(true)
    }else{
      setDisplayWaring(true)
      setDisplaySuccess(false)
    }
 
  }

  // if (authState?.accessToken?.claims.userType === undefined){
  //   return <Redirect to='/home'/>
  // }

  return (
    <div className="container mt-5 mb-5">
      <Navebar></Navebar>
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

      <div className="card shadow-lg">
        <div className="card-header">Add new Score</div>
       

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
                <DropdownMenu
                  options={courses}
                  selectedOption={courseID}
                  onSelect={handleCourseSelect}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label"> Assignment Type </label>
                <DropdownMenu
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
            <div>
              <button type="button" className="btn btn-primary mt-3" onClick={ setLevelSemesterAndYear}>
                Enable Score Feeding
              </button>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-3 mb-3">
                <label className="form-label">Student ID</label>
                <DropdownMenu
                  options={students}
                  selectedOption={studentID}
                  onSelect={handleStudentSelect}
                />
                
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Student Type</label>
                <input
                  type="text"
                  className="form-control"
                  name="author"
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Score Type</label>
                <DropdownMenu
                  options={scoreFeedingType}
                  selectedOption={assignmentScoreFeedingType}
                  onSelect={handleScoreFeedingType}
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
              <button type="button" className="btn btn-primary mt-3" onClick={submitScore}>
                Submit State
              </button>
            </div>
          </form>
        </div>
      </div>
      <button type="button" className="btn btn-primary mt-3">
        Complete Selected Course
      </button>
    </div>
  );
};
