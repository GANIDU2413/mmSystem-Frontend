import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams,Redirect } from 'react-router-dom';



export default function StudentMarksEditForm() {

    const [redirect, setRedirect] = useState(false);

    const[marksByID,setMarksByID]=useState(
        {
            studentID: "",
            courseID: "",
            year: "",
            assignmentType: "",
            assignmentScore: "",
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
    
    const {studentID,courseID,year,assignmentType,assignmentScore,level,semester}=marksByID;
    
    const OnInputChange=(e)=>
    {
        setMarksByID({...marksByID,[e.target.name]:e.target.value})
    }
    
    const onSubmit =async (e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:9090/api/lecture/edit/score/${id}`,marksByID);
        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to="/studentmarks" />;
    }
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 boder p-4 mt-2 shadow'>
                <h1 className='text-center m-4'>Marks edit</h1>
                <form onSubmit={(e)=>onSubmit(e)}>

                    <label className='form-label' htmlFor='studentID'>Student ID</label>
                    <input type='text'  className='form-control' placeholder='Enter student ID' name="studentID" value={studentID} onChange={(e)=>OnInputChange(e)}></input>

                    <label className='form-label' htmlFor='CourseID'>Course ID</label>
                    <input type='text' className='form-control' placeholder='Enter your course ID' name="courseID" value={courseID} onChange={(e)=>OnInputChange(e)}></input>

                    <label className='form-label' htmlFor='year'>Year</label>
                    <input type='text' className='form-control' placeholder="Enter year " name="year" value={year} onChange={(e)=>OnInputChange(e)}></input>

                    <label className='form-label' htmlFor='assignmentType'>Assignment type</label>
                    <input type='text' className='form-control'placeholder='Enter assignment type' name="assignmentType" value={assignmentType} onChange={(e)=>OnInputChange(e)}></input>

                    <label className='form-label' htmlFor='assignmentScore'>Assignment score</label>
                    <input type='text' className='form-control' placeholder='Enter Assignment score' name="assignmentScore" value={assignmentScore} onChange={(e)=>OnInputChange(e)}></input>

                    <label className='form-label' htmlFor='level'>Level</label>
                    <input type='text' className='form-control' placeholder='Enter score' name="level" value={level} onChange={(e)=>OnInputChange(e)}></input>

                    <label className='form-label' htmlFor='semester'>Semester</label>
                    <input type='text' className='form-control' placeholder='Enter score' name='semester' value={semester} onChange={(e)=>OnInputChange(e)}></input>


                    <input type="submit" name="Submit"  className='btn btn-outline-primary'></input>
                    <Link type="Clear" name="Clear" className='btn btn-outline-danger mx-2' to="/studentmarks">Cancel</Link>

                </form>
            </div>
        </div>
    </div>
  )
}
