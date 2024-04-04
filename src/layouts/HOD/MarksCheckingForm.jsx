import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';
import { Checkbox } from '@mui/material';

export default function MarksCheckingForm() {



  const[marks,setMarks]=useState([{
    id:" ",
    stu_id:" ",
    c_id:" ",
    academic_year:" ",
    level:" ",
    semester:" ",
    assignment_score:" ",
    assignment_type:" "}]);

    

  const {student_id}=useParams();
  const {course_id}=useParams();




  useEffect(()=>{
    result();
},[course_id,student_id]);


const result = async () => {
  try {
      const List = await axios.get(`http://localhost:9090/api/StudentAssessment/get/scorebyStuIDCourseID/${course_id},${student_id}`);
      setMarks(List.data);
      console.log(List.data);
  } catch (error) {
      console.error('Axios request failed:',error);
  }
};

const {
  id,
  stu_id,
  c_id,
  academic_year,
  assignment_type,
  assignment_score,
  level,
  semester,
} = marks;




   

console.log(marks)
  

const OnInputChange = (e) => {
  setMarks({ ...marks, [e.target.name]: e.target.value });
};

const onSubmit = async (e) => {
  e.preventDefault();
  await axios.put(
    `http://localhost:9090/api/StudentAssessment/edit/score/${student_id}`,
    marks
  );
  setRedirect(true);
};





  return (
    <>
      
             <table
                className="table border shadow"
                style={{ marginTop: "50px" }}
              >
                <thead>
                  <tr>
                    <th scope="col">Checked</th>
                    <th scope="col">Assessment Type</th>
                    <th scope="col">Assessment Score</th>
                    <th scope="col">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {marks.map((marks, index) => (
                    <tr key={index}>
                      <th>
                        <Checkbox
                          name="checkbox"
                          id={index.toString()}
                          checked={marks.checked}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      </th>
                      <td>{marks.assignment_type}</td>
                      <td>{marks.assignment_score}</td>
                      <td>
                        <Link to={`/HODmarkseditform/${marks.id}`}>
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                          >
                            Edit
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="py-4">
                <button
                  type="submit"
                  className="btn btn-outline-success btn-sm"
                  id="submitbtn"
                  // disabled={!allChecked}
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
            
           
    

    </>
  )
}
