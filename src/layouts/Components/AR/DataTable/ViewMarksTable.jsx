import React from 'react'
import { NavebarAR } from '../NavBarAR/NavebarAR'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import './viewMarksTable.css';
import BackButton from '../BackButton/BackButton';

export default function ViewMarksTable() {
  
  const course_variables = useParams();   // get the course variables from the url
  const [studentGrades, setStudentGrades] = useState([]);
  const [uniqueStudentIds, setUniqueStudentIds] = useState([]);
  const selectedOption = "Select a student";


  const handleSelectedValue = (value) => {
    fetchData(value);
  };

  const fetchData = async (value)=>{
    if(value==='Select a student'){
      try {
        const response = await axios.get(
          `http://localhost:9090/api/AssistantRegistrar/findAllStudentMarksGrade/${course_variables.course_id}`
        );
        setStudentGrades(response.data);

        //const uniqueIds = [...new Set(response.data.map((item)=>item.student_id))];
        const uniqueIds = Array.from(new Set(response.data.map((item) => item.student_id)));

    
        setUniqueStudentIds(uniqueIds);

      } catch (error) {
        console.error('Error fetching data:', error);
      }

    }else{
      
      try {
        const response = await axios.get(
          `http://localhost:9090/api/AssistantRegistrar/findSelectedStudentMarksGrade/${course_variables.course_id}/${value}`
        );

        const Allresponse = await axios.get(
          `http://localhost:9090/api/AssistantRegistrar/findAllStudentMarksGrade/${course_variables.course_id}`
        );

        
        
        setStudentGrades(response.data);
        
  
        // Extract unique student IDs
        const uniqueIds = Array.from(new Set(Allresponse.data.map((item) => item.student_id)));
        setUniqueStudentIds(uniqueIds);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  useEffect(()=>{
    fetchData(selectedOption);
  },[]);


  return (
    <div>
        
        <NavebarAR />
        <div style={{width:"97%",marginLeft:"auto",marginRight:"auto",marginTop:"65px"}}>
        <table className="table table-striped">
        <thead>
            <tr>
              <th style={{textAlign:"center",backgroundColor:'#ebe8e8',width:"250px"}} >
                <select className="form-select w-100 mx-lg-2" aria-label="Default select example" onChange={(e) => handleSelectedValue(e.target.value)}>
                  <option >Select a student</option>
                  {
                    uniqueStudentIds.map((item)=>(
                      <option key={item} value={item}> {item} </option>
                    ))
                  }
                  
                </select>
              </th>
              <th colSpan={100} style={{textAlign:"center",backgroundColor:'#ebe8e8',textAlignLast:"center"}}>
                 {course_variables.course_id} - {course_variables.course_name}
              </th>
            </tr>
            <tr>
           
              <th scope="col">Student ID</th>
              <th scope="col">Overall Score</th>
              <th scope="col">Grade</th>
            </tr>
      
          </thead>

          <tbody>
            {
              studentGrades.map((element,index)=>(
                <tr key={index}>
                  <td>{element.student_id}</td>
                  <td>{element.overall_score}</td>
                  <td>{element.grade}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        
        <div className='right-aligned-div'>
          <BackButton/> &nbsp;&nbsp;&nbsp;
        </div><br/>
        </div>
        
    </div>
  )
}
