import React from 'react'
import { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './studentViewGPA.css';
import { useLocation } from 'react-router-dom';

export default function StudentViewGPA() {
    const {authState} = useOktaAuth();

    const location = useLocation();


    const history = useHistory();

    const [studentId, setStudentId] = useState(null); // authState.idToken.claims.sub
    const [studentName, setStudentName] =useState(null);
    const [studentEmail, setStudentEmail] = useState(authState.isAuthenticated && authState.idToken.claims.email);
    const [studentRegisteredYear, setStudentRegisteredYear] = useState(null);
    const [studentDepartmentId, setStudentDepartmentId] = useState(null);

  
    const selectedSemester = location.state.semester;
    const selectedYear = location.state.academic_year;
    const selectedLevel = location.state.level;
    const selectedDepartment = location.state.department;




      useEffect(() => {
        
      }, [])



  return (
    <div>StudentViewGPA</div>
  )
}
