import React, { useEffect } from 'react'
import './homePageStudent.css'
import { useOktaAuth } from '@okta/okta-react'
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';



export default function HomePageStudent() {
  const {authState} = useOktaAuth();


  const history = useHistory();

  const [studentId, setStudentId] = useState(null); // authState.idToken.claims.sub
  const [studentName, setStudentName] =useState(null);    //Use state to store student name
  const [studentEmail, setStudentEmail] = useState(authState.isAuthenticated && authState.idToken.claims.email);    //Use state to store student email
  const [studentRegisteredYear, setStudentRegisteredYear] = useState(null);   //Use state to store student registered year
  const [studentDepartmentId, setStudentDepartmentId] = useState(null);   //Use state to store student department id
  const [studentLevel, setStudentLevel] = useState(null);     //Use state to store student level
  const [studentSemester, setStudentSemester] = useState(null);     //Use state to store student semester
  const [studentSGPA, setStudentSGPA] = useState(null);     //Use state to store student GPA
  const [studentCGPA, setStudentCGPA] = useState(null);     //Use state to store student CGPA

  const [studentGradeList, setStudentGradeList] = useState([]);         //Use state to store student grade list


  const [publishedMarkSheetsList, setPublishedMarkSheetsList] = useState(null);         //Use state to store published mark sheets list


  const approvedLevel="VC";          // Approved level for result board conducted courses
  const resultBoardState ="Ended";   // State of the result board to publish marks



  const getStudentDetails = async () => {         // load the student details

    if(studentEmail != null){       //Check if student email is not null

      try{
        const studentDetailsResult = await axios.get(`http://localhost:9090/api/Student/getStudentDetailsByEmail/${studentEmail}`)    //Calll Api to get student data
        setStudentId(studentDetailsResult.data.student_id);
        setStudentName(studentDetailsResult.data.name_with_initials);
        setStudentRegisteredYear(studentDetailsResult.data.registered_year);
        setStudentDepartmentId(studentDetailsResult.data.department_id);

        getStudentLevelSemester(studentDetailsResult.data.student_id);      // Load the student level and semester
        getPublishedMarkSheets();     // Load the published mark sheets
        getLatestGPA(studentDetailsResult.data.student_id);       // Load the latest GPA

      }catch(error){
        console.error(`Error - ${error}`);
      }


    }
  }





   const getStudentLevelSemester = async (StuID) => {         // load the student level and semester
    try{
      const studentLevelSemester = await axios.get(`http://localhost:9090/api/Student/getStudentLevelAndSemester/${StuID}`)
      setStudentLevel(studentLevelSemester.data.level);
      setStudentSemester(studentLevelSemester.data.semester);
    }catch(error){
      console.error(`Error - ${error}`);
    }
  
  }

  const getLatestGPA = async (StuID) => {         // load the latest GPA
    
    try{
        const latestGPAResponse = await axios.get(`http://localhost:9090/api/Student/getLatestGPA/${StuID}`)
        setStudentSGPA(parseFloat(latestGPAResponse.data.sgpa).toFixed(2));
        setStudentCGPA(parseFloat(latestGPAResponse.data.cgpa).toFixed(2));
        console.log(latestGPAResponse.data)

    }catch(error){
      console.error(`Error - ${error}`);
    }
  
  }



  const getPublishedMarkSheets = async () => {         // load the published mark sheets

    if(approvedLevel!=null && resultBoardState!=null && studentDepartmentId!=null && studentLevel!=null && studentSemester!=null){

      
      try{
        const publishedMarkSheets = await axios.get(`http://localhost:9090/api/Student/getPublishedMarkSheets/${approvedLevel}/${resultBoardState}/${studentDepartmentId}/${studentLevel}/${studentSemester}`)
        
        setPublishedMarkSheetsList(publishedMarkSheets.data);

        if( publishedMarkSheets.data){
        
          try{
            const getGradeResponse = await axios.get(`http://localhost:9090/api/Student/getSelectedStudentGrade/${studentId}`)
            
            setStudentGradeList(getGradeResponse.data);
        
          }catch(error){
            console.error(`Error - ${error}`);
          }
        
        }
      }catch(error){
        console.error(`Error - ${error}`);
      }
    }
  
  }


  



  useEffect(() => {
    setStudentEmail(authState?.idToken?.claims.email);        // set the student email
    getStudentDetails();
  }, [studentEmail,studentDepartmentId,studentLevel,studentSemester])


  return (
    
    <div className='student-home-page-main-div'>

      <div className='student-home-page-main-body'>


        <div className='row course-row-1'>
            <div className='col course-col-1'><label>Name - {studentName}</label></div>
            <div className='col course-col-1'><label>Index - {studentId}</label></div>
            <div className='col course-col-1'><label>Department - {studentDepartmentId}</label></div>
            <div className='col course-col-1'><label>Level - {studentLevel}</label></div>
        </div>

        <div className='row course-row-1'>
          {
            studentSGPA == null ? (
              null
            ):(
            <div className='course-col-1'><label>SGPA - {studentSGPA}</label></div>
            )
          }
          {
            studentCGPA == null ? (
              null
            ):(
            <div className='course-col-1'><label>CGPA - {studentCGPA}</label></div>
            )
          }
        </div>
          

        <div className='row course-row-2'>

          <div className='col grade-col-1'>
            

            <table className="table table-striped student-home-page-table" >

              
              <thead className='home-page-table-head'>
                <tr>
                  <th className='home-page-table-heading' colSpan={100} style={{textAlign: 'center', backgroundColor: '#ebe8e8', textAlignLast: 'center'}}>
                    Published Results <br/>
                  </th>
                </tr>
                <tr>
                  <th colSpan={100}></th>
                </tr>
                <tr>
                  <th>Course ID</th>
                  <th>Grade</th>
                </tr>
              </thead>

              <tbody>
                {
                  publishedMarkSheetsList == null ? (
                    <tr>
                      <td colSpan={100} style={{textAlign: 'center'}}>No Published Mark Sheets</td>
                    </tr>
                  ): studentGradeList == null? (
                    <tr>
                      <td colSpan={100} style={{textAlign: 'center'}}>You do not have marks under this mark sheet</td>
                    </tr>
                  ):
                  (
                    studentGradeList.map((grade,index)=>{
                      return(
                        <tr key={index}>
                          <td>{grade.course_id}</td>
                          <td>{grade.grade}</td>
                        </tr>
                      )
                    })
                  )
                }

              </tbody>

            </table>
        
          </div>

          {/* <div className='col grade-col-2'>

          </div> */}
        
        </div>

      </div>

      
    </div>
    
  )
}
