import { Checkbox } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function CAMarkTable() {
    const[studentList,setStudentsList]=useState([]);
    const {course_id}=useParams();

    
    
    console.log(studentList);





    useEffect(()=>{
        result();
    },[]);

    const result=async()=>
    {
        const studentIDList=await axios.get(`http://localhost:9090/api/studentRegCourses/getStudentsByCourse/${course_id}`);
        setStudentsList(studentIDList.data);
    }



  return (
    <>
        <div className=' container' style={{marginTop:'70px'}}>
            <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">checked</th>
                    <th scope="col">Student ID</th>
                    <th scope="col">View Marks</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {studentList.map((student)=>
                    (
                        <tr>
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
