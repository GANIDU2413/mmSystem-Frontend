import React, { useEffect } from 'react'
import { useOktaAuth } from '@okta/okta-react';
import { Redirect } from 'react-router-dom';
import { SpinerLoading } from '../../Utils/SpinerLoading';
import { useLocation } from 'react-router-dom';
import BackButton from '../../Components/AR/BackButton/BackButton';
import './arJoinResultBoard.css';
import axios from 'axios';


export default function ARJoinResultBoard() {

    const { authState } = useOktaAuth();
    const location = useLocation(); //Get the location details from the URL

    const selectedResultBoard=location.state;

    const [studentGrades, setStudentGrades] = React.useState([]);       // state to store the student grades

    const [uniqueStudents, setUniqueStudents] = React.useState(null);         // state to store the unique students
    const [uniqueCourses, setUniqueCourses] = React.useState(null);         // state to store the unique courses
    const [studentGpa, setStudentGpa] = React.useState([]);         // state to store the student gpa


    const getStudentGrade = async ()=>{
        try{
            const gradeResponse =await axios.get(`http://localhost:9090/api/AssistantRegistrar/getGradesForResultBoard/${selectedResultBoard.level}/${selectedResultBoard.semester}/${selectedResultBoard.department}/${selectedResultBoard.academic_year}`);
            
            setStudentGrades(gradeResponse.data);

            const uniqueStudentArr = [...new Set(gradeResponse.data.map((item)=>item.student_id))].sort();                                     // get unique academic years
            setUniqueStudents(uniqueStudentArr); 

            const uniqueCourseArr = [...new Set(gradeResponse.data.map((item)=>item.course_id))].sort();                                     // get unique academic years
            setUniqueCourses(uniqueCourseArr);

            //call api to get studentGPA
            const gpaResponse = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getGpaListForResultBoard/${selectedResultBoard.department}/${selectedResultBoard.academic_year}/${selectedResultBoard.level}/${selectedResultBoard.semester}`);
            
            setStudentGpa(gpaResponse.data);

        }catch(error){
            console.log(error);
        }
    }


    useEffect(() => {
        getStudentGrade();
    }, [])




    if(!authState){
        return <SpinerLoading/>;
      }
      if(authState.accessToken?.claims.userType !== "ar"){
        return <Redirect to="/home" />;
      }
  return (
    <div className='join-rb-main-div'>
        <h5 style={{color:"blue",textAlign:"center"}}>
            {selectedResultBoard.department } Result Board - Level {selectedResultBoard.level} - Semester {selectedResultBoard.semester}
        </h5>
        <hr/>




        {
            uniqueCourses != null ? (
                <>
                    <div>

                        <table className='table table-striped join-rb-table'>
                            <thead>
                                <tr>
                                    <th>Student ID</th>
                                    {
                                        uniqueCourses.map((course)=>(
                                            <>
                                            <th className='course-id-th' style={{backgroundColor:"rgba(32, 225, 138, 0.2)"}}>{course}</th>
                                            <th className='course-grade-th' style={{backgroundColor:"rgba(137, 43, 226, 0.2)"}}>Grade</th>
                                            
                                            </>
                                        ))
                                    }
                                    <th>SGPA</th>
                                    <th style={{backgroundColor:"rgba(225, 32, 51, 0.15)"}}>CGPA</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    uniqueStudents.map((student,index)=>(
                                        <tr key={index}>
                                            <td>
                                                {student}
                                            </td>
                                            {
                                                uniqueCourses.map((course)=>(
                                                    <>
                                                        <td style={{backgroundColor:"rgba(32, 225, 138, 0.2)"}}>

                                                        {studentGrades.map((Grade)=>(
                                                            Grade.student_id===student && Grade.course_id===course?<> {Grade.total_rounded_mark}</>:null
                                                        ))}
                                                        </td>

                                                        <td style={{backgroundColor:"rgba(137, 43, 226, 0.2)"}}>

                                                        {studentGrades.map((Grade)=>(
                                                            Grade.student_id===student && Grade.course_id===course?<> {Grade.grade}</>:null
                                                        ))}
                                                        </td>
                                                    </>

                                                ))
                                            }
                                            
                                            {
                                                <>

                                                <td>
                                                    {
                                                        studentGpa.map((gpa)=>(
                                                            gpa.student_id===student?<>{gpa.sgpa}</>:null
                                                        ))
                                                    }
                                                </td>

                                                <td style={{backgroundColor:"rgba(225, 32, 51, 0.15)"}}>
                                                    {
                                                        studentGpa.map((gpa)=>(
                                                            gpa.student_id===student?<>{gpa.cgpa}</>:null
                                                        ))
                                                    }
                                                </td>

                                                </>
                                                
                                                   
                                            }


                                            

                                        </tr>
                                    ))
                                }
                                
                            </tbody>
                        </table>

                    </div>
                </>
            ):(
                <>
                    <div> <label color='Red'>No Marks Available</label> </div>
                </>
            )
        }

        


        <div className='right-aligned-div back-button-div'>
            <br/><BackButton/> <br/>&nbsp;
        </div>
    </div>
   
  )
}
