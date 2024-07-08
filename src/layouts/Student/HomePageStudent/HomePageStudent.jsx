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
  const [studentName, setStudentName] =useState(null);
  const [studentEmail, setStudentEmail] = useState(authState.isAuthenticated && authState.idToken.claims.email);
  const [studentRegisteredYear, setStudentRegisteredYear] = useState(null);
  const [studentDepartmentId, setStudentDepartmentId] = useState(null);
  const [studentLevel, setStudentLevel] = useState(null);
  const [studentSemester, setStudentSemester] = useState(null);


  const [publishedMarkSheetsList, setPublishedMarkSheetsList] = useState([]);         //Use state to store published mark sheets list


  const approvedLevel="VC";          // Approved level for result board conducted courses
  const resultBoardState ="Ended";   // State of the result board to publish marks



  const getStudentDetails = async () => {         // load the student details
    if(studentEmail != null){

      try{
        const studentDetailsResult = await axios.get(`http://localhost:9090/api/Student/getStudentDetailsByEmail/${studentEmail}`)    //Calll Api to get student data
        setStudentId(studentDetailsResult.data.student_id);
        setStudentName(studentDetailsResult.data.name_with_initials);
        setStudentRegisteredYear(studentDetailsResult.data.registered_year);
        setStudentDepartmentId(studentDetailsResult.data.department_id);

        getStudentLevelSemester(studentDetailsResult.data.student_id);
        getPublishedMarkSheets();

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



  const getPublishedMarkSheets = async () => {         // load the published mark sheets
    
    try{
      const publishedMarkSheets = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getCertifyPendingResultBoards/${approvedLevel}/${resultBoardState}`)
      console.log(publishedMarkSheets.data);
      setPublishedMarkSheetsList(publishedMarkSheets.data);
    }catch(error){
      console.error(`Error - ${error}`);
    }
  
  }


  



  useEffect(() => {
    setStudentEmail(authState?.idToken?.claims.email);        // set the student email
    getStudentDetails();
  }, [studentEmail])


  return (
    
    <div className='student-home-page-main-div'>

      <div className='student-home-page-main-body'>


        <div className='row course-row-1'>
            <div className='col course-col-1'><label>Name - {studentName}</label></div>
            <div className='col course-col-1'><label>Index - {studentId}</label></div>
            <div className='col course-col-1'><label>Department - {studentDepartmentId}</label></div>
            <div className='col course-col-1'><label>Level - {studentLevel}</label></div>
        
            
        </div>

        <div className='row course-row-2'>

          <table className="table table-striped student-home-page-table" >

            
            <thead className='home-page-table-head'>
              <tr>
                <th className='home-page-table-heading' colSpan={100} style={{textAlign: 'center', backgroundColor: '#ebe8e8', textAlignLast: 'center'}}>
                  Marks Sheets Published <br/>
                </th>
              </tr>
              <tr>
                <th colSpan={100}></th>
              </tr>
            </thead>

            <tbody>
                {
                  publishedMarkSheetsList.map((item, index) =>(
                    <tr key={index} className='clickable-row' onClick={()=>{history.push(`#`)}}>
                      <td>level {item.level}</td>
                      <td>semester {item.semester}</td> 
                      <td>Dep. of {item.department}</td>
                      <td>academic year ({item.academic_year})</td>
                    </tr>
                  ))}

              </tbody>

          </table>
        
        
        </div>

      </div>

      
    </div>
    
  )
}
