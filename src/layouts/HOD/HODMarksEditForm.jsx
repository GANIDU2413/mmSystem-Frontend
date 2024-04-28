import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import { NavebarHOD } from "./NavebarHOD";

export default function HODMarksEditForm() {
  const [redirect, setRedirect] = useState(false);

  const [marksByID, setMarksByID] = useState({
    student_id: "",
    course_id: "",
    academic_year: "",
    assignment_type: "",
    assignment_score: "",
    level: "",
    semester: "",
  });

  const { id } = useParams();

  const loadMarksByID = async () => {
    const marksByID = await axios.get(
      `http://localhost:9090/api/StudentAssessment/get/scorebyID/${id}`
    );
    setMarksByID(marksByID.data);
  };

  useEffect(() => {
    loadMarksByID();
  }, []);

  const {
    student_id,
    course_id,
    academic_year,
    assignment_type,
    assignment_score,
    level,
    semester,
  } = marksByID;

  const OnInputChange = (e) => {
    setMarksByID({ ...marksByID, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:9090/api/StudentAssessment/edit/score/${id}`,
      marksByID
    );
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/HODmarkstable" />;
  }
  return (
    <div className="container">
      
      <div className="row">
        <div
          className="col-md-6 offset-md-3 boder p-4   shadow "
          style={{ marginTop: "100px" }}
        >
          <h1 className="text-center m-4">Marks edit</h1>
          <form onSubmit={(e) => onSubmit(e)}>
            <label className="form-label" htmlFor="student_id">
              Student ID
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter student ID"
              name="student_id"
              value={student_id}
              onChange={(e) => OnInputChange(e)}
            ></input>

            <label className="form-label" htmlFor="course_id">
              Course ID
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your course ID"
              name="course_id"
              value={course_id}
              onChange={(e) => OnInputChange(e)}
            ></input>

            <label className="form-label" htmlFor="academic_year ">
              Year
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter year "
              name="academic_year"
              value={academic_year}
              onChange={(e) => OnInputChange(e)}
            ></input>

            <label className="form-label" htmlFor="assignment_type">
              Assignment type
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter assignment type"
              name="assignment_type"
              value={assignment_type}
              onChange={(e) => OnInputChange(e)}
            ></input>

            <label className="form-label" htmlFor="assignment_score">
              Assignment score
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Assignment score"
              name="assignment_score"
              value={assignment_score}
              onChange={(e) => OnInputChange(e)}
            ></input>

            <label className="form-label" htmlFor="level">
              Level
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter score"
              name="level"
              value={level}
              onChange={(e) => OnInputChange(e)}
            ></input>

            <label className="form-label" htmlFor="semester">
              Semester
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter score"
              name="semester"
              value={semester}
              onChange={(e) => OnInputChange(e)}
            ></input>

            <input
              type="submit"
              name="Submit"
              className="btn btn-outline-primary my-3"
            ></input>
            <Link
              type="Clear"
              name="Clear"
              className="btn btn-outline-danger mx-2 my-3"
              to="/HODmarkstable"
            >
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}