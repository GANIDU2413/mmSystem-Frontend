import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import { NavebarDean } from "../NavebarDean";

export default function FinalStudentMarksEditFrom() {
  const [redirect, setRedirect] = useState(false);
  const [cidandfinalmarks, setCidandfinalmarks] = useState([]);
  const { student_id } = useParams();
  const [gpaByStudentID, setGpaByStudentID] = useState([]);
  const [gpaState, setGpaState] = useState({
    sgpa: 0,
    cgpa: 0,
  });

  // Function to load GPA data by student ID
  const loadGPAByStudentID = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9090/api/gpa/GetGPAByStudent_Id/${student_id}`
      );
      setGpaByStudentID(response.data);
      // If there's SGPA and CGPA data available, update gpaState
      if (response.data.length > 0) {
        setGpaState({
          sgpa: response.data[0].sgpa,
          cgpa: response.data[0].cgpa,
        });
      }
    } catch (error) {
      console.error("Error fetching GPA data:", error);
    }
  };

  // Function to load marks by student ID
  const loadMarksByID = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9090/api/studentMarks/getCourseCodeOverallScoreById/${student_id}`
      );
      setCidandfinalmarks(response.data);
    } catch (error) {
      console.error("Error fetching marks data:", error);
    }
  };

  useEffect(() => {
    loadGPAByStudentID();
    loadMarksByID();
  }, [student_id]); // Call load functions whenever student_id changes

  // Function to handle input change for overall score
  const OnInputChange = (e, courseId) => {
    const { value } = e.target;
    setCidandfinalmarks((prevMarks) =>
      prevMarks.map((mark) =>
        mark.course_id === courseId
          ? { ...mark, overall_score: parseFloat(value) }
          : mark
      )
    );
  };

  // Function to handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:9090/api/studentMarks/EditMarksForm`,
        cidandfinalmarks
      );
      setRedirect(true);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  if (redirect) {
    return <Redirect to="/finalstudentmarks" />;
  }

  return (
    <div className="container">
      <NavebarDean />
      <div className="row" style={{ marginTop: "100px" }}>
        <div className="col-md-6 offset-md-3 border p-4 mt-2 shadow">
          <h1 className="text-center m-4">Marks edit</h1>
          <form onSubmit={(e) => onSubmit(e)}>
            {cidandfinalmarks.map((studentobj) => (
              <div key={studentobj.id}>
                <h5 className="my-2 mt-3">
                  Course ID
                  <span className="badge bg-secondary mx-2">
                    {studentobj.course_id}
                  </span>
                </h5>
                <input
                  type="number"
                  className="form-control my-3"
                  placeholder="Enter new overall score"
                  name={studentobj.course_id}
                  value={studentobj.overall_score}
                  onChange={(e) => OnInputChange(e, studentobj.course_id)}
                />
              </div>
            ))}

            <h5 className="my-2 mt-3">SGPA</h5>
            <input
              disabled
              type="number"
              className="form-control"
              placeholder="Enter new SGPA"
              value={gpaState.sgpa}
              onChange={(e) =>
                setGpaState({ ...gpaState, sgpa: e.target.value })
              }
            />
            <h5 className="my-2 mt-3">CGPA</h5>
            <input
              disabled
              type="number"
              className="form-control"
              placeholder="Enter new CGPA"
              value={gpaState.cgpa}
              onChange={(e) =>
                setGpaState({ ...gpaState, cgpa: e.target.value })
              }
            />

            <input
              type="submit"
              className="btn btn-outline-primary  my-3"
              value="Submit"
              to="/FinalStudentMarks"
            />
            <Link
              className="btn btn-outline-danger mx-2 my-3"
              to="/FinalStudentMarks"
            >
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
