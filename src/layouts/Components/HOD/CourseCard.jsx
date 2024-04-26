import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function CourseCard({level,semester}) {

    const[cidN,setCidN]=useState([])
    const history = useHistory();

    const[errorMsg,seterrorMsg]=useState('');
   
    console.log(level,semester)

    

    const result = async () => {
        try {
            const list = await axios.get(`http://localhost:9090/api/courses/getcidcnamebyls/${level},${semester}`);
            console.log(list.data);
            setCidN(list.data);
            seterrorMsg("");
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error('No data found for the given level and semester');
                console.log(error.response.data.message);
                seterrorMsg(error.response.data.message);
              
                setCidN([]); // Set an empty array or any default state

            } else {
                // Handle other types of errors
                console.error('An error occurred:', error);
                seterrorMsg('An error occurred:', error);
            }
        }
    };
    
    useEffect(() => {
        result();

        
       }, [level, semester]); // This effect runs whenever level or semester changes
       

      
       const handleCardSelect = (course_id) => {
        history.push(`/HODMarksReturnSheet/${course_id}`);
        };


  

    
  return (
    <>



        <div className="row">
            {
                cidN?.map((courseInfo,index)=>(
                    
                    <div className="card border-primary mb-3 mx-lg-3 shadow" style={{maxWidth:'18rem',cursor:'pointer'}} key={index} onClick={()=>(handleCardSelect(courseInfo.course_id))}>
                        
                        <div className="card-header">Course code : {courseInfo.course_id}</div>
                        <div className="card-body ">
                            {/* {console.log(courseInfo.course_id)} */}
                            <h5 className="card-title"> {courseInfo.course_name} </h5>
                            {/* {console.log(courseInfo.course_name)} */}
                        </div>
                    </div>  
                ))
            }
                     
        </div>
    </>
  )
}
