import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function CourseCard({level,semester}) {

    const[cidN,setCidN]=useState([])
   
    console.log(level,semester)

   

    const result=async()=>{
        const list=await axios.get(`http://localhost:9090/api/courses/getcidcnamebyls/${level},${semester}`)
        console.log(list.data);
        setCidN(list.data);
    }

    useEffect(() => {
        result();
       }, [level, semester]); // This effect runs whenever level or semester changes
       

    const{course_id,course_name}=cidN;

  // console.log(cidN)

    
  return (
    <>



        <div className="row">
            {
                cidN?.map((courseInfo,index)=>(
                    <div className="card border-primary mb-3 mx-lg-3 shadow" style={{maxWidth:'18rem'}} key={index}>
                        
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
