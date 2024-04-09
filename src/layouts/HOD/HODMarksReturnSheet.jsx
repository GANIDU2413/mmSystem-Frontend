
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'; 
import axios from 'axios';

export default function HODMarksReturnSheet() {

    const[marks,setMarks]=useState([]);

    const {course_id}=useParams();



    useEffect(()=>
    {
        result();
    },[course_id]);

 const result = async()=>{
    try
    {
        const list=await axios.get(`http://localhost:9090/api/evaluationCriteria/getCriteria/${course_id}`);
        setMarks(list.data);
        console.log(list.data);

    }
    catch(error)
    {
        console.error(error);
    }
 }



 const result2= async()=>{
    try
    {
        const list=await axios.get(`http://localhost:9090/api/StudentAssessment/scoreByCourseId/${course_id}`);
        

    }
    catch(error)
    {
        console.error(error);
    }
 }


  return (
        <>
            <h1>Course code : </h1>
            <table className="table border shadow"  style={{ marginTop: "30px" }}>
                <thead>
                    <tr >
                        {
                               marks.map((mark, index) => {
                                let headers = [];
                                if (mark.no_of_conducted > 1) {
                                    for (let i = 1; i < mark.no_of_conducted; i++) {
                                        headers.push(<th key={`${index}-${i}`} scope="col">{mark.assessment_type+i}</th>);
                                    }
                                } else {
                                    headers.push(<th key={index} scope="col">{mark.assessment_type}</th>);
                                }
                                return headers;

                                <th key={index} scope="col"></th>
                            }).flat()
                        }
                                
                       
                    </tr>
                </thead>
                <tbody>
                    
                    <tr>
                        <th> </th>
                        <td></td>
                        <td></td>
                        
                    </tr>
                
                </tbody>
            </table>



    </>
  )
}
