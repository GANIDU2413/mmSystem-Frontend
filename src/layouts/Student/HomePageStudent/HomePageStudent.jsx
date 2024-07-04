import React, { useEffect } from 'react'
import './homePageStudent.css'
import { useOktaAuth } from '@okta/okta-react'
import axios from 'axios';
import { useState } from 'react';



export default function HomePageStudent() {
  const {authState} = useOktaAuth();

  const [studentId, setStudentId] = useState(null); // authState.idToken.claims.sub
  const [studentName, setStudentName] =useState(null);
  const [studentEmail, setStudentEmail] = useState(authState.isAuthenticated && authState.idToken.claims.email);
  const [studentRegisteredYear, setStudentRegisteredYear] = useState(null);
  const [studentDepartmentId, setStudentDepartmentId] = useState(null);



  const getStudentDetails = async () => {
      const studentDetailsResult = await axios.get(`http://localhost:9090/api/Student/getStudentDetailsByEmail/${studentEmail}`)
      setStudentId(studentDetailsResult.data.student_id);
      setStudentName(studentDetailsResult.data.name_with_initials);
      setStudentRegisteredYear(studentDetailsResult.data.registered_year);
      setStudentDepartmentId(studentDetailsResult.data.department_id);
  }

  useEffect(() => {
    getStudentDetails();
  }, [])


  return (
    <div>
      <div className='student-home-page-main-div'>

        <div className='row student-details-div'>

          <div className='col student-details-col-1'>

            <div className='row'>
              <label>Index No : </label>
            </div>
            
            <div className='row'>
              <label>Name : </label>
            </div>
            <div className='row'>
              <label>Department : </label>
            </div>
            
          </div>

          <div className='col student-details-col-2'>

            <div className='row'>
              <label>{studentId}</label>
            </div>
            
            <div className='row'>
              <label>{studentName}</label>
            </div>
            <div className='row'>
              <label>{studentDepartmentId}</label>
            </div>
            
          </div>

        </div>

      </div>
    </div>
  )
}
