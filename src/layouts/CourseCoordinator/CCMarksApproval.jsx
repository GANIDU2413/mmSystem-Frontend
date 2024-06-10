import React, { useState, useEffect } from 'react';
import NavBarCC from './NavBarCC';
import { useOktaAuth } from "@okta/okta-react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function CCMarksApproval() {
  const [courses, setCourses] = useState([]);
  const { authState } = useOktaAuth();
  const history = useHistory();

  const usernameofcc = authState?.idToken?.claims.preferred_username;
  // authState?.idToken?.claims.preferred_username;
  console.log(usernameofcc);
  console.log(authState?.accessToken?.claims.userType);
  
  useEffect(() => {
    fetchData();
  }, [usernameofcc]);
  
  
  
  const fetchData = async () => {
    try {
      console.log(usernameofcc)
      
      const response = await axios.get(`http://localhost:9090/api/courses/getcourseforcc/${usernameofcc}`);
      if (response.data.code !== '00') {
        throw new Error('Network response was not ok');
        
      }
      const data = response.data.content;
      setCourses(data);
      console.log(data)
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      console.error('Error details:', error.response);
    }
  };

  

  return (
    <div>
        <NavBarCC />
        <div className='container' style={{marginTop:"70px"}}>
          <div className=' h2 mx-2'>Mark Approvel</div>
          <div className='row g-3 my-4'>
            {courses.map((course, index) => (
              <div className="card shadow m-4" style={{width: "18rem"}} key={index}>
                <div className="card-body">
                  <h5 className="card-title py-2">{course.course_id}</h5> 
                  <h6 className='card-title py-1'>{course.course_name}</h6> 
                  <a className="btn btn-primary btn-sm mt-2" onClick={() => history.push(`/ccMarksReturnSheet/${course.course_id}/${course.course_name}`)}>To Give Approvel</a>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}
