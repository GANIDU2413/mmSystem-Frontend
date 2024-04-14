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
    assignment_name:" ",
    assessment_type:" "}]);

    const[finalmarks,setfinalMarks]=useState({
      id:" ",
      student_id:" ",
      course_id:" ",
      level:" ",
      semester:" ",
      overall_score:" ",
      grade:" "

    });

    

  const {student_id}=useParams();
  const {course_id}=useParams();




  useEffect(()=>{
    result();
    resultScoreGrade();
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

// const onSubmit = async (e) => {
//   e.preventDefault();
//   await axios.put(
//     `http://localhost:9090/api/StudentAssessment/edit/score/${student_id}`,
//     marks
//   );
//   setRedirect(true);
// };

const resultScoreGrade = async () => {
  try {
      const finalMarkList = await axios.get(`http://localhost:9090/api/studentMarks/getStudentMarksbySC/${course_id},${student_id}`);
      setfinalMarks(finalMarkList.data);
      console.log(finalMarkList.data);
  } catch (error) {
      console.error('Axios request failed:',error);
  }
};





  return (
    <>
          <div>

                <div class="container text-center">
                    <div class="row">
                      <div class="col">
                            <table
                              className="table border shadow"
                              style={{ marginTop: "50px" }}
                            >
                            <thead>
                              <tr>
                                <th scope="col">Assessment Type</th>
                                <th scope="col">Assessment Score</th>
                                
                              </tr>
                            </thead>
                            <tbody>
                              {marks.map((marks, index) => (
                                <tr key={index}>
                                  {/* <th>
                                    <Checkbox
                                      name="checkbox"
                                      id={index.toString()}
                                      checked={marks.checked}
                                      onChange={() => handleCheckboxChange(index)}
                                    />
                                  </th> */}
                                  <td>{marks.assignment_name}</td>
                                  <td>{marks.assignment_score}</td>
                                  
                                    {/* <Link to={`/HODmarkseditform/${marks.id}`}>
                                      <button
                                        type="button"
                                        className="btn btn-outline-primary btn-sm"
                                      >
                                        Edit
                                      </button>
                                    </Link> */}
                                  
                                
                                </tr>

                                
                              ))}
                            
                            </tbody>
                            </table>
                      </div>
                      
                      <div class="col shadow" style={{paddingTop:"100px", marginTop:"30px"}}>
                            <div>
                              <h4>CA Marks</h4>

                              <label>Total CA Marks</label>
                              <input type='text' value="30/40" disabled/>

                              <label>CA Eligibility</label>
                              <input type='text' value="Eligible" disabled/>


                              <h4>Attendance Eligibility</h4>

                              <label>Attendance</label>
                              <input type='text' value="80%" disabled/>

                              <label> Eligibility</label>
                              <input type='text' value="Eligible" disabled/>


                              <h4>Overall Eligibility</h4>

                              <label>Eligible</label>
                          
                            </div>
                      </div>
                    </div>
                 </div>
            <div>
            

            </div>
          
              

          </div>
             
          <div className="py-4 px-5">


                <label>Final Marks </label>
                <input type='text' value={finalmarks.overall_score}disabled/>

                <label>Grade </label>
                <input type='text' value={finalmarks.grade}disabled/>

                <Link to={``}>
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                          >
                            Ask to Verify
                          </button>
                      </Link><br/><br/>


                
                   <Link to={`/CAMarkTable/${student_id}/${course_id}`}>
                      <button
                        type="submit"
                        className="btn btn-outline-success btn-sm"
                        id="submitbtn"
                        // disabled={!allChecked}
                      >
                        Submit
                      </button>
                      </Link><br/><br/>


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
