import { Checkbox } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { NavebarHOD } from "./NavebarHOD";
import hodMarksStore from "../../store/hodMarksStore";

export default function HODMarksTable() {
  const [marks, setMarks] = useState([]);
  const [filteredMarks, setFilteredMarks] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [courseCodearr, setCourseCodeArr] = useState([]);
  const [studentIdArr, setStudentIdArr] = useState([]);

  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState(null);
  const {
    level: level_out,
    sem: sem_out,
    courseCode: courseCode_out,
    studentId: studentId_out,
    setLevel,
    setSem,
    setCourseCode,
    setStudentId,
  } = hodMarksStore();

  useEffect(() => {
    loadMarks(level_out, sem_out);
  }, [level_out, sem_out]);

  useEffect(() => {
    const filteredByStudentId = marks.filter(
      (mark) => studentId_out === "all" || mark.student_id === studentId_out
    );
    const filteredByCourseCode = filteredByStudentId.filter(
      (mark) => courseCode_out === "all" || mark.course_id === courseCode_out
    );
    setFilteredMarks(filteredByCourseCode);
  }, [studentId_out, courseCode_out, marks]);

  useEffect(() => {
    const checked = filteredMarks.every((student) => student.checked);
    setAllChecked(checked);
  }, [filteredMarks]);

  const loadMarks = async (level, sem) => {
    const response = await axios.get(
      `http://localhost:9090/api/StudentAssessment/get/scorebyLS/${level},${sem}`
    );

    const markedData = response.data.map((item) => ({
      ...item,
      checked: false,
    }));

    setMarks(markedData);

    const uniqCourseCodes = new Set();
    markedData.forEach(({ course_id }) => {
      uniqCourseCodes.add(course_id);
    });
    setCourseCodeArr(Array.from(uniqCourseCodes));

    const uniqueStudentIds = new Set();
    markedData.forEach(({ student_id }) => {
      uniqueStudentIds.add(student_id);
    });
    setStudentIdArr(Array.from(uniqueStudentIds));
  };

  const handleCheckboxChange = (index) => {
    const updatedMarks = [...filteredMarks];
    updatedMarks[index].checked = !updatedMarks[index].checked;
    setFilteredMarks(updatedMarks);

    const checked = updatedMarks.every((student) => student.checked);
    setAllChecked(checked);
  };

  const handleButtonClick = (btnlevel, btnsem) => {
    loadMarks(btnlevel, btnsem);
    setLevel(btnlevel);
    setSem(btnsem);
  };

  const checkData = () => {
    if (allChecked === true) {
      setAlertType("success");
      setAlert(true);
      setMarks([]);
    } else {
      setAlertType("danger");
      setAlert(true);
    }
  };

  return (
    <div className="container">
      <NavebarHOD handleButtonClick={handleButtonClick} />
      <div className="py-4">
        <div className=" h2 mt-lg-5 ">
          {marks.length === 0 && !alert
            ? ""
            : "Student Marks Finalization"}
        </div>

        {marks.length !== 0 && (
          <>
            <div>
              <div>
                Select Course ID
                <select
                  className="form-select w-25 mx-lg-2 mb-3"
                  aria-label="Default select example"
                  onChange={(event) => setCourseCode(event.target.value)}
                >
                  <option selected value="all">
                    Open this to select a Course ID
                  </option>
                  {courseCodearr.map((courseCode, index) => (
                    <option key={index} value={courseCode} scope="col">
                      {courseCode}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                Select Student ID
                <select
                  className="form-select w-25 mx-lg-2"
                  aria-label="Default select example"
                  onChange={(event) => setStudentId(event.target.value)}
                >
                  <option selected value="all">
                    Open this to select a Student
                  </option>
                  {studentIdArr.map((id, index) => (
                    <option key={index} value={id} scope="col">
                      {id}
                    </option>
                  ))}
                </select>
              </div>
              <table
                className="table border shadow"
                style={{ marginTop: "30px" }}
              >
                <thead>
                  <tr>
                    <th scope="col">Checked</th>
                    <th scope="col">Assessment Type</th>
                    <th scope="col">Assessment Score</th>
                    <th scope="col">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMarks.map((mark, index) => (
                    <tr key={index}>
                      <th>
                        <Checkbox
                          name="checkbox"
                          id={index.toString()}
                          checked={mark.checked}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      </th>
                      <td>{mark.assignment_type}</td>
                      <td>{mark.assignment_score}</td>
                      <td>
                        <Link to={`/HODmarkseditform/${mark.id}`}>
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                          >
                            Edit
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="py-4">
                <button
                  type="submit"
                  className="btn btn-outline-success btn-sm"
                  id="submitbtn"
                  disabled={!allChecked}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger mx-2 btn-sm"
                  id="clearbtn"
                >
                  Clean
                </button>
              </div>
            </div>
            <button
              type="button"
              class="btn btn-outline-success mb-4"
              onClick={checkData} disabled
            >
              Certify
            </button>
          </>
        )}

        {alert && (
          <div
            className={`alert alert-${alertType} alert-dismissible fade show`}
            role="alert"
          >
            {alertType === "success"
              ? "Data submitted successfully"
              : "Please check all data"}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setAlert(false)}
            ></button>
          </div>
        )}
      </div>
    </div>
  );
}
