import React from 'react'
import { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import './studentViewEligibility.css';


export default function StudentViewEligibility() {

    const {authState} = useOktaAuth();

    const [studentId, setStudentId] = useState(null);  
    const [studentName, setStudentName] =useState(null);
    const [studentEmail, setStudentEmail] = useState(null);
    const [studentRegisteredYear, setStudentRegisteredYear] = useState(null);
    const [studentDepartmentId, setStudentDepartmentId] = useState(null);

    const [academicYearDetails, setAcademicYearDetails] = useState([]);         //Use state to store academic year details
    const [studentCourses, setStudentCourses] = useState(null);                   //Use state to store student courses

    const loadStudentDetails = async () => {
        if(studentEmail != null){

            const studentDetailsResult = await axios.get(`http://localhost:9090/api/Student/getStudentDetailsByEmail/${studentEmail}`)
            setStudentId(studentDetailsResult.data.student_id);
            setStudentName(studentDetailsResult.data.name_with_initials);
            setStudentRegisteredYear(studentDetailsResult.data.registered_year);
            setStudentDepartmentId(studentDetailsResult.data.department_id);

        }
    }

    const loadAcademicYearDetails = async () => {          // load the academic year details
        try{
            const academicYearDetails = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getAcademicYearDetails`)
            setAcademicYearDetails(academicYearDetails.data[0]);
        }catch(error){
            console.error(`Error - ${error}`);
            toast.error("Error occured while loading academic year details");
        }

    }


    const loadStudentCourses = async () => {          // load the student courses
        if(studentEmail!=null){
            try{
                const studentCourses = await axios.get(`http://localhost:9090/api/Student/getStudentCourseListBySelectedYear/${studentId}/${academicYearDetails.current_academic_year}/${academicYearDetails.current_semester}`)
                console.log(studentCourses.data);
                if(studentCourses.data.length != 0){
                    setStudentCourses(studentCourses.data);

                }
            }catch(error){
                console.error(`Error - ${error}`);
                
            }
        }
    
    }


    useEffect(() => {
        setStudentEmail(authState?.idToken?.claims.email);
        loadStudentDetails();
        loadAcademicYearDetails();
        loadStudentCourses();

    }, [studentEmail,studentId])


  return (
    <div>
        <div className='student-caEligibility-view-main-div'>

            <table className="table table-striped">

                <thead className='student-eligibility-table-head'>

                    <tr>
                        <th colSpan={4} style={{textAlign:"center",backgroundColor:'#ebe8e8',textAlignLast:"center"}}>
                            <h5>View CA eligibility</h5> 
                        </th>
                    </tr>

                    <tr>
                        <th scope="col">Course ID</th>
                        <th scope="col">Course name</th>
                        <th scope="col">Theory/Practical</th>
                        <th>Eligibility</th>
                    </tr>

                </thead>

                <tbody>
                    {
                        studentCourses != null? (
                            studentCourses.map((course) => (
                                <tr key={course[0]}>
                                    <td>{course[1]}</td>
                                    <td>{course[2]}</td>
                                    <td>{course[4]}</td>
                                    <td>{
                                        course[9] != null ? (
                                            course[9]
                                        ):(
                                            "Still not available"
                                        )
                                    }</td>
                                </tr>
                            ))
                        ):(
                            <>
                            <tr>
                                <td colSpan={4} style={{textAlign:"center"}}>No courses available</td>
                            </tr>
                            </>
                        )
                    }
                </tbody>

            </table>



        </div>
        <ToastContainer />
    </div>
  )
}
