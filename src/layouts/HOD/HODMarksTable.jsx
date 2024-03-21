import { Checkbox } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import markTableStore from "../../store/markTableStore";
import { NavebarHOD } from "./NavebarHOD";

export default function HODMarksTable({ c_id = "ICT1112" }) {
  const [mrks, setMrks] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [studentIDarr, setStudentIDarr] = useState([]);
  const [fildedMarks, setFildedMarks] = useState([]);
  const { currentFilter, setCurrentFilter } = markTableStore();

  useEffect(() => {
    //calling loadMarks() function
    loadMarks();
  }, []);

  useEffect(() => {
    const checked = fildedMarks.every((mrk) => mrk.checked);
    setAllChecked(checked);
  }, [fildedMarks]);

  //get data using api
  const loadMarks = async () => {
    const result = await axios.get(
      "http://localhost:9090/api/StudentAssessment/get/score"
    );

    const marksWithChecked = result.data.map((mark) => ({
      ...mark,
      checked: false,
    }));

    const marksFilterByID = marksWithChecked.filter(
      (markCid) => markCid.course_id === c_id
    );

    setMrks(marksFilterByID);

    setFildedMarks(marksFilterByID);

    if (currentFilter) {
      const marksFilterBystID = marksFilterByID.filter(
        (markCid) => markCid.student_id === currentFilter
      );
      setFildedMarks(marksFilterBystID);
    }

    const uniqids = new Set();

    marksWithChecked.forEach(({ student_id }) => {
      uniqids.add(student_id);
    });

    setStudentIDarr(Array.from(uniqids));
  };

  const handleCheckboxChange = (index) => {
    const updatedMarks = [...fildedMarks];
    updatedMarks[index].checked = !updatedMarks[index].checked;
    setFildedMarks(updatedMarks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Done");
  };

  const filterDataBySTID = (event) => {
    const stid = event.target.value;
    if (stid === "all") {
      setFildedMarks(mrks);
      return;
    }

    const marksFilterBystID = mrks.filter(
      (markCid) => markCid.student_id === stid
    );
    setFildedMarks(marksFilterBystID);
    setCurrentFilter(stid);
  };

  return (
    <div className="container">
      <NavebarHOD />
      <div className="py-4">
        <div className=" h2 mt-lg-5 ">Student Marks Finalization</div>
        <div className=" h4 mt-7 ">Course ID : {c_id}</div>
        <div>
          <select
            className="form-select w-25 mx-lg-2"
            aria-label="Default select example"
            onChange={(event) => filterDataBySTID(event)}
          >
            <option selected value="all">
              Open this to select a Student
            </option>
            {studentIDarr.map((id, index) => (
              <option key={index} value={id} scope="col">
                {id}
              </option>
            ))}
          </select>
        </div>
        <table className="table border shadow" style={{ marginTop: "30px" }}>
          <thead>
            <tr>
              <th scope="col">Checked</th>
              <th scope="col">Assessment Type</th>
              <th scope="col">Assessment Score</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {fildedMarks.map((mrk, index) => (
              <tr key={index}>
                <th>
                  <Checkbox
                    name="checkbox"
                    id={index.toString()}
                    checked={mrk.checked}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </th>

                <td>{mrk.assignment_type}</td>
                <td>{mrk.assignment_score}</td>

                <td>
                  <Link
                    className="btn btn-outline-primary mx-2 btn-sm"
                    to={`/markseditform/${mrk.id}`}
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
