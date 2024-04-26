import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./courseSelection.css";



export default function CourseSelection(props) {

    const { level, semester, department_id } = props;       // Destructuring props
    const [selectedCourseId, setSelectedCourseId] = useState(null);    // State to store selected course id
    const [courseData, setCourseData] = useState([]);   // State to store course data
    const previousRole = "HOD";     // Role of the previous user

    const loadCourseData = async()=>{       // Function to fetch course data
        try{
          const result=await axios.get(`http://localhost:9090/api/AssistantRegistrar/getViewMarksCourseList/${level}/${semester}/${department_id}`);     // API call to fetch course data
          setCourseData(result.data);       // Setting the fetched data to the state
          console.log(result.data)
          
        }catch(error){
          console.error('Error fetching data:', error);     // Logging error
        }
    }

    useEffect(() => {       // UseEffect to fetch course data
        loadCourseData();
    }, []);


  return (
    <div>
        <table className="table">
            <thead>
                <tr>

                <th scope="col"></th>
                <th scope="col">Course Code</th>
                <th scope="col">Course Name</th>
                <th scope="col">Course Type</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
              {
                courseData.map((course, index) => (
                  
                  <tr className="clickable-row" key={index}>
                    
                    <th scope="row" key={index}>{index+1}</th>
                    <td>{course.course_id}</td>
                    <td>{course.course_name}</td>
                    <td>{course.type}</td>
                    <td><a href={`/viewMarks/${course.course_id}/${course.course_name}`} className="btn btn-primary "  role="button" aria-disabled="true">View Marks</a> </td>      {/* Button to view marks */}
                    
                </tr>
               
                ))
              }
                
            </tbody>
            </table>
            {<br/>}{<br/>}{<br/>}
            &nbsp; Level {level}{<br/>}
            &nbsp; Semester {semester}{<br/>}
            &nbsp; department - {department_id}
            
    </div>
  )
}
