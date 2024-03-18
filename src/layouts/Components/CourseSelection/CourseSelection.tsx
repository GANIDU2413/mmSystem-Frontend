import axios from 'axios';
import React, { useEffect } from 'react'

export default function CourseSelection(props :any) {
    var level=props.level;
    var semester=props.semester;
    var department_id=props.department_id;
    

    //get data using api
    const [courseData, setCourseData] = React.useState([]);

    //This useEffect is used to call loadCourseData function when the component is loaded and at eny action on the page
    useEffect(() => {
      loadCourseData();
    }, []);

    //Load course data from api and store in result variable
    const loadCourseData = async()=>{
        const result=await axios.get(`http://localhost:9090/api/course/findCoursesByDepartmentLevelSemester/${department_id}/${level}/${semester}`);
        setCourseData(result.data);
    }



  return (
    <div>
        <table className="table">
            <thead>
                <tr>
                <th scope="col"></th>
                <th scope="col">Course Code</th>
                <th scope="col">Course Name</th>
                </tr>
            </thead>
            <tbody>
              {
                courseData.map((course: any, index: number) => (
                <tr>
                  <th scope="row" key={index}>{index+1}</th>
                  <td>{course.course_id}</td>
                  <td>{course.course_name}</td>
                </tr>
                ))
              }
                
            </tbody>
            </table>
            {<br/>}{<br/>}{<br/>}{<br/>}
                Level {level}{<br/>}
                Semester {semester}{<br/>}
                department_id {department_id}
            

    </div>
  )
}
