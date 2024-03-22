import { Checkbox } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavebarMT } from "./NavebarMT";
import markTableStore from "../../store/markTableStore";

export default function MarksTable({  }) {
  const [mrks, setMrks] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [studentIDarr, setStudentIDarr] = useState([]);
  const [courseIDarr, setCourseIDarr] = useState([]);
  const [fildedMarks, setFildedMarks] = useState([]);
  const { currentFilter, setCurrentFilter } = markTableStore();
  const [selectedCourseID, setSelectedCourseID] = useState("");

  // let c_id;
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
      (markCid) => markCid.course_id 
    );

    setMrks(marksFilterByID);

    setFildedMarks(marksFilterByID);

    // if (currentFilter) {
    //   const marksFilterBystID = marksFilterByID.filter(
    //     (markCid) => markCid.student_id === currentFilter
    //   );
    //   setFildedMarks(marksFilterBystID);
    // }

    const uniqStudentIDs = new Set();
    const uniqCourseIDs = new Set();


    marksWithChecked.forEach(({ student_id, course_id }) => {
      uniqStudentIDs.add(student_id);
      uniqCourseIDs.add(course_id);
    });

    setStudentIDarr(Array.from(uniqStudentIDs));
    setCourseIDarr(Array.from(uniqCourseIDs));
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
      (markCid) => markCid.student_id === stid && markCid.course_id === selectedCourseID
    );
    setFildedMarks(marksFilterBystID);
    setCurrentFilter(stid);
  };


  //Approval button
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    const appendAlert = (message, type) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')

      alertPlaceholder.append(wrapper)
    }

    const alertTrigger = document.getElementById('liveAlertBtn')
    if (alertTrigger) {
      alertTrigger.addEventListener('click', () => {
        appendAlert('Nice, you triggered this alert message!', 'success')
      })
    }

  return (
    <div className="container">
      <NavebarMT />
      <div className="py-4">
        <div className=" h2 mt-lg-5 ">Student Marks Finalization</div>
        <div className=" mb-3">
          Select Course ID
          <select
            className="form-select w-25 mx-lg-2"
            aria-label="Default select example"
            onChange={(event) => setSelectedCourseID(event.target.value)}
          >
            <option selected value="">
              Select a Course
            </option>
            {courseIDarr.map((id, index) => (
              <option key={index} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>
        <div>
        Select Student ID
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
          className="btn btn-outline-primary btn-sm"
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
      <div>
        <div id="liveAlertPlaceholder"></div>
        <button type="button" class="btn btn-outline-success mb-4 " id="liveAlertBtn">Show live alert</button>
      </div>
    </div>
  );
}
