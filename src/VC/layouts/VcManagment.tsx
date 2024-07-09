import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { SpinerLoading } from "../../layouts/Utils/SpinerLoading";
import { Navebar } from "../../Lecture/layouts/NavbarAndFooter/Navebar";
import axios from "axios";
import Modal from "react-modal";
import VCGradeModel from "../../models/VCGradeModel";
import toastr from "toastr";
// to handle response data
interface ApiResponse {
  _embedded: {
    gradeForVCs: VCGradeModel[];
  };
}

export const VcManagment: React.FC = () => {
  // to handle Spring Loading
  const [isLoading, setIsloading] = useState(false);

  const [level, setLevel] = useState("0");
  // to handle okta authentication
  const { authState } = useOktaAuth();
  // to handld grades
  const [grades, setGrades] = useState<VCGradeModel[]>([]);
  // to hansle model window
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  // to open model
  const openModal = () => {
    loadingGrades();
    setModalIsOpen(true);
  };
  // to close model
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // handle level select
  const handleLevelSelect = (selectLevel:string): void => {
      setLevel(selectLevel);
      console.log(level);
  }

  // update state of approved level
  const updateApprovdLevel = () => {
    
    toastr.success("Successfully Certifyed..!");
    
  }

  // to handle loeading of  student's grades on VC
  const loadingGrades = async () => {
    axios
      .get<ApiResponse>(`http://localhost:9090/api/gradeForVCs/search/findGradeForVCByLevel?level=${level}`)
      .then((response) => {
        setGrades(response.data._embedded.gradeForVCs);
      })
      .catch((error) => {
        toastr.error("Error fetching data");
      });
  };

  if (authState?.accessToken?.claims.userType !== "VC") {
    return <Redirect to="/home" />;
  }
  // to desplay score feeding form
  return (
    <div className="container">
      <Navebar />
      <div className="mt-5">
        <h1>Manage certify</h1>

        <div className="container mt-3 md-5">
          <div className="card shadow-lg">
            <div className="card-header card-headr-color">
              <h5>Vice Chansoller Section </h5>
            </div>
            {isLoading ? (
              <SpinerLoading /> // to load spinner
            ) : (
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Faculties</label>
                    <select className="form-select">
                      <option value="option1">Technology</option>
                      <option value="option2">Agricalture</option>
                      <option value="option3">Engineering</option>
                    </select>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Department</label>
                    <select className="form-select">
                      <option value="option1">ICT</option>
                      <option value="option2">ET</option>
                      <option value="option3">BST</option>
                    </select>
                  </div>

                  <div className="col-md-3 mb-3">
                    <label className="form-label">Level</label>
                    <select 
                    className="form-select"
                    value={level}
                    onChange={(e) => handleLevelSelect(e.target.value)}
                    >
                      <option value="1">level-I</option>
                      <option value="2">level-II</option>
                      <option value="3">level-III</option>
                      <option value="4">level-IV</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <button
                    type="button"
                    className="btn btn-success mt-3 ms-2"
                    onClick={openModal}
                    // onClick={CompleteCourse} // call submit score method
                  >
                    View Result sheet
                  </button>
                </div>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  contentLabel="Grades Modal"

                >
                  <div className="modal-content">
                    <div className="modal-header card-headr-color">
                      <h5 className="modal-title">Grades Sheet</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={closeModal}
                      ></button>
                    </div>
                    <div className="modal-body"></div>
                   
                
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Student ID</th>
                          <th>Course ID</th>
                          <th>Semester</th>
                          <th>Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {grades.map((grade, index) => (
                          <tr key={index}>
                            <td>{grade.studentId}</td>
                            <td>{grade.courseId}</td>
                            <td>{grade.semester}</td>
                            <td>{grade.grade}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                  </div>
                  <button
                    type="button"
                    className="btn btn-success mt-3 ms-2"
                    //onClick={openModal}
                    onClick={updateApprovdLevel} // call submit score method
                  >
                    Certify
                  </button>
                </Modal>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
