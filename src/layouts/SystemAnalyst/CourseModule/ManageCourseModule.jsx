import React, { useState } from 'react';
import axios from 'axios';

export default function ManageCourseModule() {
    const [course_name, setCourseName] = useState('');
    const [course_id, setCourseId] = useState('');
    const [type, setType] = useState('');
    const [department_id, setDepartment] = useState('');
    const [credit, setCourseCredit] = useState('');
    const [hours, setCourseHours] = useState('');
    const [level, setLevel] = useState('');
    const [semester, setSemester] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = {
        course_name,
        course_id,
        type,
        department_id,
        credit,
        hours,
        level,
        semester,
    };

    try {
        const response = await axios.post('http://localhost:9090/api/courses/insertacourse', courseData);
        console.log(response.data);
        alert('Course added successfully!');
      // Optionally, clear the form fields after successful submission
        setCourseName('');
        setCourseId('');
        setType('');
        setDepartment('');
        setCourseCredit('');
        setCourseHours('');
        setLevel('');
        setSemester('');
    } catch (error) {
        console.error('Error adding course:', error);
        alert('Error adding course. Please try again.');
    }
 };

 return (
    <div className='container' style={{marginTop:"70px"}}>
        <div className=' mt-4 mb-5'>
        <h1 className='h1'>Manage Course Module</h1>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="row g-3 my-1">
            <div className="col-md">
            <div className="form-floating">
                <input type="text" className="form-control" id="course_name" placeholder="Enter course name" value={course_name} onChange={(e) => setCourseName(e.target.value)} />
                <label htmlFor="course_name">Course Name</label>
            </div>
            </div>
            <div className="col-md">
            <div className="form-floating">
                <input type="text" className="form-control" id="course_id" placeholder="Enter course id" value={course_id} onChange={(e) => setCourseId(e.target.value)} />
                <label htmlFor="course_id">Course ID</label>
            </div>
            </div>
            <div className="col-md">
            <div className="form-floating">
                <select className="form-select" id="type" value={type} onChange={(e) => setType(e.target.value)}>
                    <option selected>Select Type</option>
                    <option value="ICT">Theory</option>
                    <option value="ET">Practical</option>
                </select>
                <label htmlFor="type">Module Type</label>
            </div>
            </div>
        </div>
        <div className="row g-3 my-1">
            <div className="col-md">
            <div className="form-floating">
                <select className="form-select" id="department_id" value={department_id} onChange={(e) => setDepartment(e.target.value)}>
                <option selected>Select Department</option>
                <option value="ICT">ICT</option>
                <option value="ET">ET</option>
                <option value="BST">BST</option>
                <option value="Multi_Disciplinary">Multi_Disciplinary</option>
                </select>
                <label htmlFor="department_id">Department</label>
            </div>
            </div>
            <div className="col-md">
            <div className="form-floating">
                <input type="number" className="form-control" id="credit" placeholder="Enter course Credit" value={credit} onChange={(e) => setCourseCredit(e.target.value)} />
                <label htmlFor="credit">Course Credit</label>
            </div>
            </div>
            <div className="col-md">
            <div className="form-floating">
                <input type="number" className="form-control" id="hours" placeholder="Enter course hours" value={hours} onChange={(e) => setCourseHours(e.target.value)} />
                <label htmlFor="hours">Hours</label>
            </div>
            </div>
        </div>
        <div className="row g-3 my-1">
            <div className="col-md">
            <div className="form-floating">
                <input type="number" max="4" min="1" className="form-control" id="level" placeholder="Enter Level" value={level} onChange={(e) => setLevel(e.target.value)} />
                <label htmlFor="level">Level</label>
            </div>
            </div>
            <div className="col-md">
            <div className="form-floating">
                <input type="number" max="2" min="1" className="form-control" id="semester" placeholder="Semester" value={semester} onChange={(e) => setSemester(e.target.value)} />
                <label htmlFor="semester">Semester</label>
            </div>
            </div>
        </div>
        <div className=' my-3'>
            <button type="submit" className="btn btn-outline-primary btn-sm">Submit</button>
            <button type="button" className="btn btn-outline-danger mx-2 btn-sm" onClick={() => {
            setCourseName('');
            setCourseId('');
            setType('');
            setDepartment('');
            setCourseCredit('');
            setCourseHours('');
            setLevel('');
            setSemester('');
            }}>Clear</button>
        </div>
        </form>
        <div>
            <div className="h2 mt-lg-5">Existing Courses</div>
        </div>
    </div>
 );
}
