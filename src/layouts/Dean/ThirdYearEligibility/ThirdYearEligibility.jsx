
import { Checkbox } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ThirdYearEligibility() {
  const [mrks, setMrks] = useState([]);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    //calling loadMarks() function
    loadMarks();
  }, []);

  useEffect(() => {
    const checked = mrks.every((mrk) => mrk.checked);
    setAllChecked(checked);
  }, [mrks]);

  //get data using api
  const loadMarks = async () => {
    const result = await axios.get(
      "http://localhost:9090/api/lecture/get/score"
    );

    const marksWithChecked = result.data.map((mark) => ({
      ...mark,
      checked: false,
    }));
    setMrks(marksWithChecked);
  };

  const handleCheckboxChange = (index) => {
    const updatedMarks = [...mrks];
    updatedMarks[index].checked = !updatedMarks[index].checked;
    setMrks(updatedMarks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Done");
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow" style={{ marginTop: "60px" }}>
          <thead>
            <tr>
              <th scope="col">Checking</th>
              <th scope="col">Student ID</th>
              <th scope="col">Course ID</th>
              <th scope="col">Year</th>
              <th scope="col">Assignment Type</th>
              <th scope="col">Assignment Score</th>
              <th scope="col">Level</th>
              <th scope="col">Semester</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {mrks.map((mrk, index) => (
              <tr key={index}>
                <th>
                  <Checkbox
                    name="checkbox"
                    id={index.toString()}
                    checked={mrk.checked}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </th>
                <td>{mrk.studentID}</td>
                <td>{mrk.courseID}</td>
                <td>{mrk.year}</td>
                <td>{mrk.assignmentType}</td>
                <td>{mrk.assignmentScore}</td>
                <td>{mrk.level}</td>
                <td>{mrk.semester}</td>
                <td>
                  <Link className='btn btn-outline-primary mx-2 btn-sm' to={`/markseditform/${mrk.id}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="py-4">
        <button
          type="submit"
          className="btn btn-outline-success btn-sm"
          id="submitbtn"
          onClick={handleSubmit}
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
  );
}
