import { Checkbox } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavebarDean } from "../NavebarDean";
import finalStudentMarksStore from "../../../store/finalStudentMarksStore";
import React from "react";

export default function FinalStudentMarks() {
  const [students, setStudents] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [courseCodearr, setCourseCodeArr] = useState([]);
  const {
    level: level_out,
    sem: sem_out,
    setLevel,
    setSem,
  } = finalStudentMarksStore();

  let level;
  let sem;

  useEffect(() => {
    loadMarks();
  }, []);

  useEffect(() => {
    const checked = students.every((student) => student.checked);
    setAllChecked(checked);
  }, [students]);

  const handleButtonClick = (btnlevel, btnsem) => {
    level = btnlevel;
    sem = btnsem;
    setLevel(btnlevel);
    setSem(btnsem);
    loadMarks();
  };

  const loadMarks = async () => {
    try {
      const [marksResponse, gpaResponse] = await Promise.all([
        axios.get(
          `http://localhost:9090/api/studentMarks/GetMarksByLS/${
            level || level_out
          },${sem || sem_out}`
        ),
        axios.get(
          `http://localhost:9090/api/gpa/GetGPAByLevelSemester/${
            level || level_out
          },${sem || sem_out}`
        ),
      ]);

      const marksData = marksResponse.data;
      const gpaData = gpaResponse.data;

      const combinedData = [];

      marksData.forEach((mark) => {
        const { student_id, course_id, overall_score, grade } = mark;
        let studentObj = combinedData.find(
          (item) => item.student_id === student_id
        );

        if (!studentObj) {
          studentObj = {
            student_id: student_id,
            courses: [],
            sgpa: null,
            cgpa: null,
            checked: false,
          };
          combinedData.push(studentObj);
        }

        studentObj.courses.push({
          course_id: course_id,
          overall_score: overall_score,
          grade: grade,
        });
      });

      gpaData.forEach((gpa) => {
        const { student_id, sgpa, cgpa } = gpa;
        const studentObj = combinedData.find(
          (item) => item.student_id === student_id
        );

        if (studentObj) {
          studentObj.sgpa = sgpa;
          studentObj.cgpa = cgpa;
        }
      });

      setStudents(combinedData);

      // Extract unique course IDs
      const uniqueCourseIds = new Set();
      marksData.forEach(({ course_id }) => {
        uniqueCourseIds.add(course_id);
      });
      setCourseCodeArr(Array.from(uniqueCourseIds));
    } catch (error) {
      console.log("error fetching data : ", error);
    }
  };

  const handleCheckboxChange = (index) => {
    const updatedStudents = [...students];
    updatedStudents[index].checked = !updatedStudents[index].checked;
    setStudents(updatedStudents);

    const checked = updatedStudents.every((student) => student.checked);
    setAllChecked(checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Done");
  };

  return (
    <div className="container">
      <NavebarDean handleButtonClick={handleButtonClick} />
      {students.length !== 0 ? (
        <>
          <div className="py-4" style={{ marginTop: "70px" }}>
            <table
              className="  overflow-x-scroll table border shadow"
              style={{ marginTop: "60px" }}
            >
              <thead>
                <tr>
                  <th scope="col">Checked</th>
                  <th scope="col">Student ID</th>
                  {courseCodearr.map((id, index) => (
                    <React.Fragment key={index}>
                      <th>{id}</th>
                      <th>Grade</th>
                    </React.Fragment>
                  ))}
                  <th scope="col">SGPA</th>
                  <th scope="col">CGPA</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <th>
                      <Checkbox
                        name="checkbox"
                        id={index.toString()}
                        checked={student.checked}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </th>
                    <td>{student.student_id}</td>
                    {courseCodearr.map((id, index) => {
                      const courseData = student.courses.find(
                        (c) => c.course_id === id
                      );
                      return (
                        <React.Fragment key={index}>
                          <td>{courseData ? courseData.overall_score : "-"}</td>
                          <td>{courseData ? courseData.grade : "-"}</td>
                        </React.Fragment>
                      );
                    })}
                    <td>{student.sgpa ? student.sgpa : "-"}</td>
                    <td>{student.cgpa ? student.cgpa : "-"}</td>
                    <td>
                      <Link
                        className="btn btn-outline-primary mx-4 btn-sm rounded-pill"
                        to={`/finalstudentmarkseditfrom/${student.student_id}`}
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="py-4">
            <button
              type="submit"
              className="btn btn-outline-success btn-sm rounded-pill"
              id="submitbtn"
              onClick={handleSubmit}
              disabled={!allChecked}
            >
               Certify
            </button>
            <button
              type="button"
              className="btn btn-outline-danger mx-2 btn-sm rounded-pill"
              id="clearbtn"
            >
              Clean
            </button>
          </div>
        </>
      ) : (
        <div className="py-4" style={{ marginTop: "70px" }}>
          {/* <h1>No Data Found</h1> */}
        </div>
      )}
    </div>
  );
}
