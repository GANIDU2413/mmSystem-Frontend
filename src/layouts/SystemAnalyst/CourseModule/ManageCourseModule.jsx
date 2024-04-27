import React, { useState, useEffect } from 'react';
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
    const [courses, setCourses] = useState([]); // State to store fetched courses

    // Fetch courses from the API
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/courses/getallcourses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []); // Empty dependency array means this effect runs once on mount

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
            console.log(response.data.content);
            alert('Course added successfully!');
            // Clear the form fields after successful submission
            setCourseName('');
            setCourseId('');
            setType('');
            setDepartment('');
            setCourseCredit('');
            setCourseHours('');
            setLevel('');
            setSemester('');
            // Re-fetch courses to update the list
            fetchCourses();
        } catch (error) {
            console.error('Error adding course:', error);
            alert('Error adding course. Please try again.');
        }
    };

    return (
        <div className='container' style={{ marginTop: "70px" }}>
            <div className='mt-4 mb-5'>
                <h1 className='h1'>Manage Course Module</h1>
            </div>
            <form onSubmit={handleSubmit}>
                {/* Form fields for adding a new course */}
            </form>
            <div>
                <div className="h2 mt-lg-5">Existing Courses</div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Course ID</th>
                            <th>Type</th>
                            <th>Department</th>
                            <th>Credit</th>
                            <th>Hours</th>
                            <th>Level</th>
                            <th>Semester</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={index}>
                                <td>{course.course_name}</td>
                                <td>{course.course_id}</td>
                                <td>{course.type}</td>
                                <td>{course.department_id}</td>
                                <td>{course.credit}</td>
                                <td>{course.hours}</td>
                                <td>{course.level}</td>
                                <td>{course.semester}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
