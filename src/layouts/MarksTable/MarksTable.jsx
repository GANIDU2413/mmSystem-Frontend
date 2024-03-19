import { Checkbox } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MarksTable() {
  const [mrks, setMrks] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [studentIDarr,setStudentIDarr]=useState([]);


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

    const uniqids = new Set();

    marksWithChecked.forEach(({student_id}) => {
      uniqids.add(student_id);
    });
    setStudentIDarr(Array.from(uniqids));



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
        <div className=" h2 mt-lg-5 ">
            Student Marks Finalization 
        </div>
        <div>
          <select className="form-select w-25 mx-lg-2" aria-label="Default select example">
            <option selected>Open this select a Student</option>
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
              <th scope="col">Assesment Type</th>
              <th scope="col">Assesment Score</th>
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
                
                <td>{mrk.assignmentType}</td>
                <td>{mrk.assignmentScore}</td>
                
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
