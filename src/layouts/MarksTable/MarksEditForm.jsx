import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';


export default function MarksEditForm() {
    const[marksByID,setMarksByID]=useState(
        {
        student_id: "",
        course_id: "",
        year: "",
        assignment_type: "",
        assignment_score: "",
        level: "",
        semester: ""
       
        }
    )
    
    const{id}=useParams();
    
    
    const loadMarksByID=async()=>
    {
        const marksByID=await axios.get(`http://localhost:9090/api/lecture/get/scorebyID/${id}`);
        setMarksByID(marksByID.data);
    }
    
    useEffect(()=>
    {
        loadMarksByID();
    },[]);
    
    const {student_id,course_id,year,assignment_type,assignment_score,level,semester}=marksByID;
    
    const OnInputChange=(e)=>
    {
        setMarksByID({...marksByID,[e.target.name]:e.target.value})
    }
    
    const onSubmit =async (e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:9090/api/lecture/edit/score/${id}`,marksByID);
        navigate("/markstable");
    }
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 boder p-4 mt-2 shadow'>
                <h1 className='text-center m-4'>Marks edit</h1>
                <form onSubmit={(e)=>onSubmit(e)}>
                    <label className='form-label' htmlFor='studentID'>Student ID</label>
                    <input type='text'  className='form-control' placeholder='Enter student ID' name="student_id" value={student_id} onChange={(e)=>OnInputChange(e)}></input>

                    <label className='form-label' htmlFor='CourseID'>Course ID</label>
                    <input type='text' className='form-control' placeholder='Enter your course ID' name="course_id" value={course_id} onChange={(e)=>OnInputChange(e)}></input>

                    <label className='form-label' htmlFor='year'>Year</label>
                    <input type='text' className='form-control' placeholder="Enter year " name="acedamic_year" value={acedamic_year} onChange={(e)=>OnInputChange(e)}></input>

                    <label className='form-label' htmlFor='assignmentType'>Assignment type</label>
                    <input type='text' className='form-control'placeholder='Enter assignment type' name="assignement_type" value={assignement_type} onChange={(e)=>OnInputChange(e)}></input>

                    <label className='form-label' htmlFor='assignmentScore'>Assignment score</label>
                    <input type='text' className='form-control' placeholder='Enter Assignment score' name="assignment_score" value={assignment_score} onChange={(e)=>OnInputChange(e)}></input>

                    <label className='form-label' htmlFor='level'>Level</label>
                    <input type='text' className='form-control' placeholder='Enter score' name="level" value={level} onChange={(e)=>OnInputChange(e)}></input>

                    <label className='form-label' htmlFor='semester'>Semester</label>
                    <input type='text' className='form-control' placeholder='Enter score' name='semester' value={semester} onChange={(e)=>OnInputChange(e)}></input>


                    <input type="submit" name="Submit"  className='btn btn-outline-primary'/>
                    <Link type="Clear" name="Clear" className='btn btn-outline-danger mx-2' to="/markstable"/>

                </form>
            </div>
        </div>
    </div>
  )
}
