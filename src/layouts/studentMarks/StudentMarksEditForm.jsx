import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import { NavebarSM } from "./NavebarSM";

export default function MarksEditForm() {
  const [redirect, setRedirect] = useState(false);
  const [cidandfinalmarks, setCidandfinalmarks] = useState([]);
  const { student_id } = useParams();

  const loadMarksByID = async () => {
    const marksByID = await axios.get(
      `http://localhost:9090/api/studentMarks/getCourseCodeOverallScoreById/${student_id}`
    );

    setCidandfinalmarks(marksByID.data);
  };

  useEffect(() => {
    loadMarksByID();
  }, []);

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

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:9090/api/studentMarks/EditMarksForm`,
      cidandfinalmarks
    );
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/studentmarks" />;
  }

  return (
    <div className="container">
      <NavebarSM />
      <div className="row" style={{ marginTop: "100px" }}>
        <div className="col-md-6 offset-md-3 boder p-4 mt-2 shadow">
          <h1 className="text-center m-4">Marks edit</h1>
          <form onSubmit={(e) => onSubmit(e)}>
            {cidandfinalmarks.map((studentobj) => (
              <div key={studentobj.id}>
                <h5 className="my-2 mt-3">
                  Course ID
                  <span class="badge bg-secondary mx-2">
                    {studentobj.course_id}
                  </span>
                </h5>

                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter new overall score"
                  name={studentobj.course_id}
                  value={studentobj.overall_score}
                  onChange={(e) => OnInputChange(e, studentobj.course_id)}
                />
              </div>
            ))}

            <input
              type="submit"
              className="btn btn-outline-primary  my-3"
              value="Submit"
              to="/studentmarks"
            />
            <Link className="btn btn-outline-danger mx-2" to="/studentmarks">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
