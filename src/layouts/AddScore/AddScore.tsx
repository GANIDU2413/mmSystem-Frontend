import { useState } from "react";

export const AddScore = () => {
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
  const [displaySuccess, setDisplaySuccess] = useState(true);

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

  const courses: string[] = ["ICT1112", "ICT1122", "ICT1132", "ICT1142"];
  const students: string[] = [
    "TG/2020/671",
    "TG/2020/672",
    "TG/2020/673",
    "TG/2020/674",
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

  const handleStudentSelect = (setCourse: string): void => {
    setStudentID(setCourse);
  };

  const handleAssignmentType = (setAssignmentType: string): void => {
    setassignmentType(setAssignmentType);
  };

  const handleScoreFeedingType = (
    setAssignmentScoreFeedingType: string
  ): void => {
    setassignmentScoreFeedingScore(setAssignmentScoreFeedingType);
  };

  return (
    <div className="container mt-5 mb-5">
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
              <div className="col-md-6 mb-3">
                <label className="form-label">Course Name </label>
                <input
                  type="text"
                  className="form-control"
                  name="author"
                  required
                />
              </div>
            </div>
            <div>
              <button type="button" className="btn btn-primary mt-3">
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
              <button type="button" className="btn btn-primary mt-3">
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
