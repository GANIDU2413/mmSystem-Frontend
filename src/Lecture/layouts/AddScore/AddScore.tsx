import { ChangeEvent, useEffect, useState } from "react";
import AddScoreRequest from "../../../models/AddScoreRequest";
import { useOktaAuth } from "@okta/okta-react";
import { Redirect } from "react-router-dom";
import toastr from "toastr";
import { SpinerLoading } from "../Utils/SpinerLoading";
import LectureCourseModel from "../../../models/LectureCourseModel";
import StudentCourseEnroll from "../../../models/StudentCourseEnroll";
import AddScoreProps from "../../../models/AddScoreProps";
import Papa, { ParseResult } from "papaparse";
import Modal from "react-modal";
import EvaluationCriteriaModel from "../../../models/EvaluationCriteriaModel";
import EvaluationCriteriaNameModel from "../../../models/EvaluationCriteriaNameModel";
import { stat } from "fs";
import axios from "axios";

export const AddScore: React.FC<AddScoreProps> = ({ option }) => {
  // to handle okta authentication
  const { authState } = useOktaAuth();
  // to handle new score feeding
  const [studentID, setStudentID] = useState("Select a Student");
  const [courseID, setCourseID] = useState("Select a Course");
  const [year, setYear] = useState("");
  const [assignmentType, setassignmentType] = useState(
    "Select an Assignment Type"
  );
  const [assignmentScore, setassignmentScore] = useState("");
  const [reassignmentScore, setreassignmentScore] = useState("");

  const [level, setlevel] = useState("");
  const [semester, setSemester] = useState(" ");
  const [courseName, setCourseName] = useState<string>("");

  // to handle Spring Loading
  const [isLoading, setIsloading] = useState(false);

  // to handle fetch course IDs from the database
  const [data, setData] = useState<LectureCourseModel[]>([]);
  const [studentIdsData, setStudentIdsData] = useState<StudentCourseEnroll[]>(
    []
  );
  // to save data from csv file
  const [csvData, setCsvData] = useState<string[][] | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [evaluationData, setEvaluationData] = useState<
    EvaluationCriteriaNameModel[]
  >([]);
  const [evaluationNameData, setEvaluationNameData] = useState("");
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
    try {
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
    } catch (error: any) {
      //if any network error, it will be displayed.
      toastr.error("Network Error" + error.messages, "Error!");
    }
  };
  // to get student Ids related course enrollment.
  const fetchStudentDetails = async (
    studentDetailsId: string,
    assignmentName: string
  ) => {
    try {
      const studentDetailsUrl = `http://localhost:9090/api/studentCourseEnrolls/search/findByCourseIdAndAssignmentName?courseId=${studentDetailsId}&assignmentName=${assignmentName}`;
      const response = await fetch(studentDetailsUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const responseJson = await response.json();
      const responseData = responseJson._embedded.studentCourseEnrolls;

      const loadStudentDetails: StudentCourseEnroll[] = responseData.map(
        (item: any) => ({
          studentId: item.studentId,
        })
      );

      setStudentIdsData(loadStudentDetails);

      console.log("Updated studentIdsData:", studentIdsData);
    } catch (error) {
      console.error("Error fetching student details:", error);
      toastr.error("Network Error!", "Error: ");
    }
  };

  // to get evaluation criteria name by course id
  const fetchEvaluationCriteriaName = async (evaluationCourseId: string) => {
    try {
      const criteriaUrl = `http://localhost:9090/api/evaluationCriteriaNames/search/findEvaluationCriteriaNameByCourseId?courseId=${evaluationCourseId}`;

      const response = await fetch(criteriaUrl);

      if (!response.ok) {
        toastr.error("Network Error", "Error" + " " + response.status);
      }

      const responseJeson = await response.json();

      const responseData: EvaluationCriteriaNameModel[] =
        responseJeson._embedded.evaluationCriteriaNames.map(
          (item: any) => new EvaluationCriteriaNameModel(item.assignmentName)
        );

      setEvaluationData(responseData);
    } catch (error: any) {
      toastr.error("Network Error" + " " + error.messages, "Error!");
    }
  };
  // to handle state of the course acordantly user's input.
  const handleCourseSelect = (setCourse: string): void => {
    setCourseID(setCourse);
    fetchCourseName(setCourse); //  call the fetchCourseName function immediately after setting the course ID

    fetchEvaluationCriteriaName(setCourse); // call assignment type into the score feeding form.
    setLevelSemesterAndYear(setCourse);
    //fetchStudentDetails(courseID,assignmentType); // call studentIds into the drop-drown box.
  };
  // to handle state of the student acordantly user's input.
  const handleStudentSelect = (setStudent: string): void => {
    setStudentID(setStudent);
    setYear(extractYear(setStudent));
  };
  // to handle assignmment type acordantly user's input.
  const handleAssignmentType = (setAssignmentType: string): void => {
    setassignmentType(setAssignmentType);
    // to get assignment name
    const evaluationNameString = setAssignmentType;
    const evaluationName = evaluationNameString.replace(/\d+/g, "");
    setEvaluationNameData(evaluationName);
    fetchStudentDetails(courseID, setAssignmentType);
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

  // to handle state of student's level, Semester, and academic year.
  const setLevelSemesterAndYear = (courseIdFromSelected: string): void => {
    const [academicLevel, academicSemester] =
      extractSemesterAndLevel(courseIdFromSelected);
    setlevel(academicLevel);
    setSemester(academicSemester);
  };

  // to handle close csv mark sheet
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // to handle submition of score
  async function submitScore() {
    setIsloading(true);

    // to feed student score
    const url = `http://localhost:9090/api/lecture/add/score`;
    // to ensure validation of data feelds

    try {
      // Validate if the input is a positive number
      if (
        !(
          parseFloat(assignmentScore) >= 0 && parseFloat(assignmentScore) <= 100
        )
      ) {
        toastr.error("Input is not valid", "Error!");
      } else {
        if (
          studentID !== "Select a Student" &&
          courseID !== "Select a Course" &&
          assignmentType !== "Select an Assignment Type" &&
          assignmentScore !== null &&
          assignmentScore === reassignmentScore.replace(/\s+/g, "") &&
          year !== "" &&
          level !== "" &&
          semester !== "" &&
          evaluationNameData !== ""
        ) {
          // to store data temporary
          const score: AddScoreRequest = new AddScoreRequest(
            studentID,
            courseID,
            year,
            assignmentType, // Quize1 , Quize2 , Assignment1 etc
            assignmentScore,
            level,
            semester,
            evaluationNameData // Quize , Asssignment
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
          updateStudentScoreState();

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
          setassignmentScore("0");
          setreassignmentScore("0");
          //setassignmentType("Select an Assignment Type")
          setStudentID("Select a Student");
          setYear("");
          setCourseID("Select a Course");
          setassignmentType("Select an Assignment Type");
          setSemester("");
          setlevel("");
          setCourseName("");

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

  // after submmiting , student's state should be updated.
  const updateStudentScoreState = async () => {
    const url = `http://localhost:9090/api/lecture/update/studentState?courseID=${courseID}&assignmentType=${assignmentType}&studentId=${studentID}`;

    const requestData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Assuming you're sending JSON data
        // Add any other headers if required
      },
      // Add body data if needed
      body: JSON.stringify({
        // Add any data you want to send in the request body
      }),
    };

    try {
      const response = await fetch(url, requestData);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // If you need to process the response, you can do it here
      // const responseData = await response.json();
      // Process responseData if needed
    } catch (error) {
      // Handle errors here
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  // set default sate of course selection feelds
  const CompleteCourse = (): void => {
    setCourseID("Select a Course");
    setassignmentType("Select an Assignment Tyep");
    setlevel("");
    setSemester("");
    toastr.success("Clear", "Success!");
  };

  // to handle csv score feeding file
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (result: ParseResult<string[]>) => {
          if (result.data && result.data.length > 0) {
            setCsvData(result.data);
            setModalIsOpen(true);
            setFile(file);
          }
        },
        header: true, // Set to true if CSV has headers
      });
    }
  };

  // to upload scv file
  const handleCsvSumit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://localhost:9090/api/lecture/upload/csvFile",
          formData,
          {
            headers: {
              "Content-Type": "multipart/from-data",
            },
          }
        );
        if (
          response.data ===
          "Failed to process CSV file: No student enrolled in the course with courseId: ICT1112 and assignmentType: Quize1"
        ) {
          toastr.error(response.data);
        } else {
          toastr.success("CSV File upload successfully");
        }

        console.log(response.data);
      } catch (error) {
        toastr.error("Faild to upload CSV file");
      }
    }
  };

 
  // // Download CSV file with headers only
  // downloadCSVWithHeaders(headers, 'headers.csv')
  // to ensure the authentication.
  if (authState?.accessToken?.claims.userType === undefined) {
    return <Redirect to="/home" />;
  }
  // to desplay score feeding form
  return (
    <div className="container mt-3 md-5">
      <div className="card shadow-lg">
        <div className="card-header card-headr-color">
          <h5>Score Feeding Section --- </h5>
        </div>
        {isLoading ? (
          <SpinerLoading /> // to load spinner
        ) : (
          <div className="card-body">
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
                  <select
                    className="form-select"
                    value={assignmentType}
                    onChange={(e) => handleAssignmentType(e.target.value)}
                  >
                    <option value="">Select a Course</option>
                    {evaluationData.map((item) => (
                      <option
                        key={item.assignmentName}
                        value={item.assignmentName}
                      >
                        {item.assignmentName}
                      </option>
                    ))}
                  </select>
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

              {option ? (
                <>
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
                        onChange={(e) =>
                          setassignmentScore(e.target.value.replace(/\s+/g, ""))
                        }
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
                        onChange={(e) => setreassignmentScore(e.target.value)}
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
                </>
              ) : (
                //score reading will be desplayed
                <div className="container mt-4">
                  <h3 className="mb-4">Score Reader</h3>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="form-control mb-4"
                  />
                  {csvData && csvData.length > 0 && (
                    <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                      <div className="modal-content">
                        <div className="modal-header card-headr-color">
                          <h5 className="modal-title">Score Sheet</h5>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={closeModal}
                          ></button>
                        </div>
                        <div className="modal-body">
                          <table className="table">
                            <thead>
                              <tr>
                                {csvData.length > 0 &&
                                  Object.keys(csvData[0]).map(
                                    (header, index) => (
                                      <th key={index}>{header}</th>
                                    )
                                  )}
                              </tr>
                            </thead>
                            <tbody>
                              {csvData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                  {Object.values(row).map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={closeModal}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </Modal>
                  )}
                  <div className="column">
                    <button
                      type="button"
                      className="btn btn-primary mt-3 ms-2"
                      onClick={handleCsvSumit} // call submit score method
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
                    <button
                      type="button"
                      className="btn btn-success mt-3 ms-2"
                      onClick={CompleteCourse} // call submit score method
                    >
                      Download CSV file
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
