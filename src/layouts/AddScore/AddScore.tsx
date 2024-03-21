import { useState } from "react";
import { Navebar } from "../NavbarAndFooter/Navebar";

export const AddScore = () => {
  // new marks
  const [studentID, setStudentID] = useState("Select a Student");
  const [course, setCourseID] = useState("Select a Course");
  const [year, setYear] = useState("");
  const [assignmentType, setassignmentType] = useState("");
  const [assignmentScore, setassignmentScore] = useState(0);
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
  
  const courses: string[] = ["ICT1112", "ICT1122", "ICT1132", "ICT1142"];
  const students: string[] = ["TG/2020/671", "TG/2020/672", "TG/2020/673", "TG/2020/674"];

  const handleCourseSelect = (setCourse: string): void => {
    setCourseID(setCourse);
  };

  const handleStudentSelect = (setCourse: string): void => {
    setStudentID(setCourse);
  };



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
      <div className="card">
        <div className="card-header">Add a new Score</div>
        <div className="card-body">
          <form method="POST">
            <div className="row">
            <div className="col-md-3 mb-3">
                <label className="form-label">Course ID</label>
                <DropdownMenu
                  options={courses}
                  selectedOption={course}
                  onSelect={handleCourseSelect}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label"> StudentID </label>
                <DropdownMenu
                  options={students}
                  selectedOption={studentID}
                  onSelect={handleStudentSelect}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Acadamic Year</label>
                <input
                  type="text"
                  className="form-control"
                  name="author"
                  required
                 
                 
                />
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                onChange={(e) => setassignmentType(e.target.value)}
                value={assignmentType}
              ></textarea>
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Copies</label>
              <input
                type="number"
                className="form-control"
                name="Copies"
                required
                onChange={(e) => setassignmentScore(Number(e.target.value))}
                value={assignmentScore}
              />
            </div>
            <input type="file" />
            <div>
              <button type="button" className="btn btn-primary mt-3">
                Add Score
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
   
  );
};
