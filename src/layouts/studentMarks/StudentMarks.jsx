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
      'http://localhost:9090/api/studentMarks/GetMarksByLS/3,1'
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

  const courseCodeArr=[];

  {mrks.map((crs, index) => (
    courseCodeArr.push(crs.courseID)))}


    console.log(courseCodeArr);

  return (
    <div className="container">
      <div className="py-4" style={{marginTop:"70px"}}>

        <div>
            <button type="button" class="btn btn-primary btn-sm" name="L1S1" value={"L1S1"}>Level 01 Sem 01</button>
            <button type="button" class="btn btn-primary btn-sm mx-2" name="L1S2" value={"L1S2"}>Level 01 Sem 02</button>
            <button type="button" class="btn btn-primary btn-sm" name="L2S1" value={"L2S1"}>Level 02 Sem 01</button>
            <button type="button" class="btn btn-primary btn-sm mx-2" name="L2S2" value={"L2S2"}>Level 02 Sem 02</button>
            <button type="button" class="btn btn-primary btn-sm" name="L3S1" value={"L3S1"}>Level 03 Sem 01</button>
            <button type="button" class="btn btn-primary btn-sm mx-2" name="L3S2" value={"L3S2"}>Level 03 Sem 02</button>
            <button type="button" class="btn btn-primary btn-sm" name="L4S1" value={"L4S1"}>Level 04 Sem 01</button>
            <button type="button" class="btn btn-primary btn-sm mx-2" name="L4S2" value={"L4S2"}>Level 04 Sem 02</button>
            
        </div>

        <table className="  overflow-x-scroll table border shadow" style={{ marginTop: "60px"}} scroll={{y:true}}>
          <thead>
          
            <tr>

              <th scope="col">Checked</th>
              <th scope="col">Student ID</th>
              <th scope="col"></th>
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
