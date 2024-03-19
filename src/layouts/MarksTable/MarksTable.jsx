import { Checkbox } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function StudentMarks() {
  const [mrks, setMrks] = useState([]);
  const [cid,setCid]=useState([]);

  const [allChecked, setAllChecked] = useState(false);
  const [courseCodearr,setCourseCodeArr]=useState([]);
  const [students,setStudents]=useState([]);
  let level;
  let sem;
 

  useEffect(() => {
    //calling loadMarks() function
    loadMarks();
  }, []);

  useEffect(() => {
    const checked = mrks.every((mrk) => mrk.checked);
    setAllChecked(checked);
  }, [mrks]);

  const handleButtonClick = (btnlevel,btnsem) =>{

    level = btnlevel;
    sem = btnsem;
    loadMarks();

  };
 


  //get data using api
  const loadMarks = async () => {

    
    try{
        const result = await axios.get(
          
          `http://localhost:9090/api/studentMarks/GetMarksByLS/${level},${sem}`
          
        );

        const marksWithChecked = result.data.map((mark) => ({
          ...mark,
          checked: false,
        }));


        
        setCid(marksWithChecked);
        setMrks(marksWithChecked);
        // for course ID
            const uniqueIds = new Set();
            marksWithChecked.forEach(({ course_id }) => {
                  uniqueIds.add(course_id);
            });
        setCourseCodeArr(Array.from(uniqueIds));

            const studentData = {};

      marksWithChecked.forEach((mark) => {
        const { student_id, course_id, overall_score } = mark;
        if (!studentData[student_id]) {
          studentData[student_id] = {
            student_id: student_id,
            courses: [{ course_id: course_id, overall_score: overall_score }],
          };
        } else {
          studentData[student_id].courses.push({
            course_id: course_id,
            overall_score: overall_score,
          });
        }
      });

      //console.log("studentdata: ",studentData);

      const studentArray = Object.values(studentData);
      //console.log("studentArray: ",studentArray);
      setStudents(studentArray);

    }
    catch (error) {
        console.log("error fetching data : ",error);
    }
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
      <div className="py-4" style={{marginTop:"70px"}}>
        <table className="  overflow-x-scroll table border shadow" style={{ marginTop: "60px"}} >
          <thead>
          
            <tr>

              <th scope="col">Checked</th>
              <th scope="col">Student ID</th>
              {courseCodearr.map((id, index) => (
                <th key={index} scope="col">
                  {id}
                </th>
              ))}
              <th scope="col">Edit</th>
            </tr>
        
          </thead>
          <tbody>
            {students.map((mrk, index) => (
              <tr key={index}>
                <th>
                  <Checkbox
                    name="checkbox"
                    id={index.toString()}
                    checked={mrk.checked}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </th>
                <td>{mrk.student_id}</td>
                {courseCodearr.map((id,index)=>{
                  const courseData = mrk.courses.find(
                    (c)=> c.course_id === id
                  );
                  return(
                  <td key={index}>
                    {courseData ? courseData.overall_score : "-"}
                  </td>);
                })}
              
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
