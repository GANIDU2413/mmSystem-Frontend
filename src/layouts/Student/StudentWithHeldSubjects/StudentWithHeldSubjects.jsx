import React, { useEffect } from 'react'
import { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import './studentWithHeldSubjects.css';
import { Redirect } from 'react-router-dom';
import { SpinerLoading } from '../../Utils/SpinerLoading';
import BackButton from '../../Components/AR/BackButton/BackButton';

export default function StudentWithHeldSubjects() {

    

    const {authState} = useOktaAuth();

    const grade='WH';       //Grade 'WH' stands for 'With Held


    const [studentId, setStudentId] = useState(null);  
    const [studentName, setStudentName] =useState(null);
    const [studentEmail, setStudentEmail] = useState(null);
    const [studentRegisteredYear, setStudentRegisteredYear] = useState(null);
    const [studentDepartmentId, setStudentDepartmentId] = useState(null);


    const [withHeldSubjects, setWithHeldSubjects] = useState([]);         //Use state to store with held subjects

    const loadStudentDetails = async () => {                            //Load student details
        if(studentEmail != null){

            try{
                const studentDetailsResult = await axios.get(`http://localhost:9090/api/Student/getStudentDetailsByEmail/${studentEmail}`)      //API to get student details by email
                setStudentId(studentDetailsResult.data.student_id);
                setStudentName(studentDetailsResult.data.name_with_initials);
                setStudentRegisteredYear(studentDetailsResult.data.registered_year);
                setStudentDepartmentId(studentDetailsResult.data.department_id);
    
                getWithHeldSubjects(studentDetailsResult.data.student_id);          //Get with held subjects
            }
            catch(error){
                console.error(`Error - ${error}`);
                toast.error("Error occured while loading student details");
            }
            

        }
    }

    

    const getWithHeldSubjects = async (StuID) => {                            //Get with held subjects
        try{

            const gradeListResponse = await axios.get(`http://localhost:9090/api/Student/getGradeBySelectedStudentSelectedGrade/${StuID}/${grade}`)             //API to get WH course list
            setWithHeldSubjects(gradeListResponse.data);

        }catch(error){
            console.error(`Error - ${error}`);
            toast.error("Error occured while loading with held subjects");
        }
    }


    useEffect(() => {
        setStudentEmail(authState?.idToken?.claims.email);          //Set student email
        loadStudentDetails();
    }, [studentEmail,authState])


    if(!authState){
        return <SpinerLoading/>;
      }
      if(authState.accessToken?.claims.userType !== "student"){
        return <Redirect to="/home" />;
      }

  return (
    <div >
        <div className='student-with-held-view-main-div'>

            <table className="table table-striped">

                <thead className='student-WH-table-head'>
                    <tr>
                        <th colSpan={3} style={{textAlign:"center",backgroundColor:'#ebe8e8',textAlignLast:"center"}}>
                            <h5>With-held Subjects</h5> 
                        </th>
                    </tr>

                    <tr>
                        <th scope="col">Course ID</th>
                        <th scope="col">CA Eligibility</th>
                        <th scope="col">Grade</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        withHeldSubjects.length>0?(
                            <>
                            {
                                withHeldSubjects.map((subject,index)=>(
                                    <tr key={index} className='wh-table-row'>
                                        <td>{subject.course_id}</td>
                                        <td>{subject.ca_eligibility}</td>
                                        <td>{subject.grade}</td>
                                    </tr>
                                ))
                            }
                            </>
                        ):(
                            <>
                            <tr className='wh-table-row'>
                                <td colSpan={4} style={{textAlign:"center",color:"red"}}>No with held courses available</td>
                            </tr>
                            </>
                        )
                    }
                </tbody>

            </table>

            <div className='right-aligned-div back-button-div'>
                <br/><BackButton/> <br/>&nbsp;
            </div>

        </div>
    </div>
  )
}
