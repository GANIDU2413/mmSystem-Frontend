import { Checkbox } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function StudentMarks() {
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
      <div className="py-4 w-25">
        <table className="  overflow-x-scroll table border shadow" style={{ marginTop: "60px"}} scroll={{y:true}}>
          <thead>
            <tr>
              <th scope="col">Checking</th>
              <th scope="col">Student ID</th>
              <th scope="col">ICT1211</th>
              <th scope="col">ICT2211</th>
              <th scope="col">ICT3211</th>
              <th scope="col">ICT4211</th>
              <th scope="col">ICT5211</th>
              <th scope="col">ICT6211</th>
              <th scope="col">ICT7211</th>
              <th scope="col">ICT8211</th>
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
                  <Link className='btn btn-outline-primary mx-4 btn-sm rounded-pill' to={`/studentmarkseditform/${mrk.id}`}>Edit</Link>
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
          Request Certify
        </button>
        <button
          type="button"
          className="btn btn-outline-danger mx-2 btn-sm rounded-pill"
          id="clearbtn"
        >
          Clean
        </button>
      </div>
    </div>
  );
}
