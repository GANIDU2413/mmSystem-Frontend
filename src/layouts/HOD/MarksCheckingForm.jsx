import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';

export default function MarksCheckingForm() {

  const[marks,setMarks]=useState({
    id:" ",
    stu_id:" ",
    c_id:" ",
    level:" ",
    semester:" ",
    overall_score:" ",
    grade:" "});

  const {student_id}=useParams();
  const {course_id}=useParams();

 

  useEffect(()=>{
    result();
},[course_id,student_id]);


const result = async () => {
  try {
      const List = await axios.get(`http://localhost:9090/api/studentMarks/getStudentMarksbySC/${course_id},${student_id}`);
      setMarks(List.data);
     
  } catch (error) {
      console.error('Axios request failed:',error);
  }
};



  return (
    <>
      
        
            <div class="input-group mb-3">
            <div class="input-group-text">
                <label>Final Mark</label>
                <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input"/><br/>
                <input type ="text" value={marks.overall_score}  ></input>
                <label>Grade</label>
                <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input"/><br/>
                <input type ="text" value={marks.grade}  ></input>
            </div>
            <div>
                <label>Remark</label>
                <input type="text" class="form-control" aria-label="Text input with checkbox"/>
            </div>
            </div>

            console.log("hi")
          
           
    

    </>
  )
}
