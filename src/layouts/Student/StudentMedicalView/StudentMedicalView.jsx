import React, { useEffect } from 'react'
import './studentMedicalView.css'
import { useOktaAuth } from '@okta/okta-react'
import axios from 'axios';
import { useState } from 'react';


export default function StudentmedicalView() {

    const {authState} = useOktaAuth();

    const [studentId, setStudentId] = useState(null); // authState.idToken.claims.sub
    const [studentName, setStudentName] =useState(null);
    const [studentEmail, setStudentEmail] = useState(null);
    const [studentRegisteredYear, setStudentRegisteredYear] = useState(null);
    const [studentDepartmentId, setStudentDepartmentId] = useState(null);


    const loadStudentDetails = async () => {
        if(studentEmail != null){

            const studentDetailsResult = await axios.get(`http://localhost:9090/api/Student/getStudentDetailsByEmail/${studentEmail}`)
            setStudentId(studentDetailsResult.data.student_id);
            setStudentName(studentDetailsResult.data.name_with_initials);
            setStudentRegisteredYear(studentDetailsResult.data.registered_year);
            setStudentDepartmentId(studentDetailsResult.data.department_id);
            console.log(studentDetailsResult.data.student_id)
        }
    }



    const getAllMedicalSubmissions = async () => {
        
    
    }


    useEffect(() => {
        setStudentEmail(authState?.idToken?.claims.email);
        loadStudentDetails()

    }, [studentEmail])



  return (
    <div>
        <div className='student-medical-view-main-div'>
            
            <table className="table table-striped">

                <thead className='student-medical-table-head'>
                    <tr>

                        <th style={{textAlign:"center",backgroundColor:'#ebe8e8',width:"250px"}}>

                            <select className="form-select w-100 mx-lg-1  medical-year-selection" aria-label="Default select example">    {/* select box to select the acedemic year */} 
                            
                            <option className='selectionOptions' >All Years</option>

                            </select>

                        </th>

                        <th colSpan={4} style={{textAlign:"center",backgroundColor:'#ebe8e8',textAlignLast:"center"}}>
                           <h5>View Medicals</h5> 
                        </th>




                    </tr>
                </thead>

            </table>
            
        </div>
    </div>
  )
}
