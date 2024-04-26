import { Checkbox } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function CAMarkTable() {
   
    const {course_id}=useParams();

    const[marks,setMarks]=useState([{
        id:" ",
        stu_id:" ",
        c_id:" ",
        level:" ",
        semester:" ",
        overall_score:" ",
        grade:" "}]);

    
    
   



    useEffect(()=>{
        result();
    },[]);

    const result=async()=>
    {
        const List=await axios.get(`http://localhost:9090/api/studentMarks/getStudentMarksbyCourse/${course_id}`);
        setMarks(List.data);
    }

    
  return (
    <>
        <div className=' container' style={{marginTop:'70px'}}>
            <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">checked</th>
                    <th scope="col">Student ID</th>
                    <th scope="col">Edit</th>
                    

                    
                    </tr>
                </thead>
                <tbody>
                    {marks.map((student,index)=>
                    (
                        <tr key={index}>
                            <th scope="row"><Checkbox ></Checkbox></th>
                            <td>{student.student_id}</td>

                            <td><Link className=' btn btn-primary mx-3 btn-sm' to={`/MarksCheckingForm/${student.student_id}/${course_id}`}>View</Link> </td> 
              
                        </tr>
                    ))}
                    
                
                </tbody>
            </table>
        </div>
    </>
  )
}
