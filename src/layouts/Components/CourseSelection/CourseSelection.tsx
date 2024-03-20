import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./courseSelection.css";
import DataTable from '../DataTable/DataTable';
import { Link } from 'react-router-dom';

export default function CourseSelection(props :any) {
    const { level, semester, department_id } = props;

    // State to store selected course ID
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    //get data using api
    const [courseData, setCourseData] = useState([]);

    //This useEffect is used to call loadCourseData function when the component is loaded and at eny action on the page
    useEffect(() => {
      loadCourseData();
    }, []);

    //Load course data from api and store in result variable
    const loadCourseData = async()=>{
      try{
        const result=await axios.get(`http://localhost:9090/api/course/findCoursesByDepartmentLevelSemester/${department_id}/${level}/${semester}/HOD`);
        setCourseData(result.data);
      }catch(error){
        console.error('Error fetching data:', error);
      }
    }

    //Function to handle course selection
    function handleCourseSelection(course_id: any){
      setSelectedCourseId(course_id);
      <DataTable course_id={selectedCourseId}/>
    }


  return (
    <div>
        <table className="table">
            <thead>
                <tr>

                <th scope="col"></th>
                <th scope="col">Course Code</th>
                <th scope="col">Course Name</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
              {
                courseData.map((course: any, index: number) => (
                  
                  <tr className="clickable-row" onClick={() => handleCourseSelection(course.course_id)} key={index}>
                    
                    <th scope="row" key={index}>{index+1}</th>
                    <td>{course.course_id}</td>
                    <td>{course.course_name}</td>
                    {/* <td><a href={`/viewMarksRemainingToApprove/${course.course_id}`} className="btn btn-primary "  role="button" aria-disabled="true">View Marks</a> </td> */}
                    <td>
                      <button type="button" className="btn btn-primary btn-sm">
                        <Link to ={{
                          pathname: `/viewMarksRemainingToApprove/${course.course_id}`,
                          state: {stateParam:true}
                        }}  style={{color: "white"
                        }}>
                        View Mrks
                        </Link>
                        
                        
                      </button>
                    </td>
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
