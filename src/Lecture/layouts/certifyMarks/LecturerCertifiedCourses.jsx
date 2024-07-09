import { useOktaAuth } from '@okta/okta-react';
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom'
import { Navebar } from '../NavbarAndFooter/Navebar';


export default function LecturerCertifiedCourses() {
  const { oktaAuth, authState } = useOktaAuth();
  const[errorMsg,seterrorMsg]=useState("");
  const lecturer_id=authState?.idToken?.claims.name;

  const[cidN,setCidN]=useState([
    {
        course_id: '',
        course_name: '',
        department_id: ''
    }
])

const history = useHistory();


const result = async () => {
  try {
      const response = await axios.get(`http://localhost:9090/api/courses/getCoursesforLectCertify/${lecturer_id}`);
      const list = response.data; 
      setCidN(list.content);
      seterrorMsg(list.message);
  } catch (error) {
      if (error.response && error.response.status === 404) {
          seterrorMsg(error.response.data.message);
          setCidN([]); // Set an empty array or any default state

      } else {
         seterrorMsg('An error occurred:', error);
      }
  }
};

useEffect(() => {
  result();
 }, [lecturer_id]); // This effect runs whenever level or semester changes


    
  return (
   <>
   <Navebar/>
            <div className="row" style={{marginTop:"70px", padding:"2%"}}>
           
             {
               cidN && cidN.length > 0 ? (
                 cidN.map((courseInfo, index) => (
                   <div
                     className="card border-primary mb-3 mx-lg-3 shadow"
                     style={{ maxWidth: '18rem', cursor: 'pointer' }}
                     key={index}
                     onClick={() => history.push(`/lMarksReturnSheet/${courseInfo.course_id}/${courseInfo.course_name}/${courseInfo.department_id}`)}
                   >
                     <div className="card-header">Course code : {courseInfo.course_id}</div>
                     <div className="card-body">
                       <h5 className="card-title">{courseInfo.course_name}</h5>
                     </div>
                   </div>
                 ))
               ) : (
                <div className=' container' style={{ marginTop: '150px' }}>
                <div className="alert alert-primary" role="alert">
                  {errorMsg}
                </div>
                </div>
               )
             }
           </div>

   </>
  )
}
