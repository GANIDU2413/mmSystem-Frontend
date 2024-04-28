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
  const [studentGrades, setStudentGrades] = useState([]);     // state to store the student grades 
  const [uniqueStudentIds, setUniqueStudentIds] = useState([]);     // state to store the unique student ids
  const [eStarStudentsAvailability, setEStarStudentsAvailability] = useState(false);      // state to store the availability of students  having E* grades
  const [studentsAvailability, setStudentsAvailability] = useState(true);      // state to store the availability of students
  const selectedOption = "All students";   // default selected option


  const handleSelectedValue = (value) => {      // function to handle the selected value
    fetchData(value);   // fetch the data according to the selected value
  };

  const fetchData = async (value)=>{      // function to fetch the data from the backend

    const EStarStudents = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getEStarDetailsByCourseId/${course_variables.course_id}`);    // get the students having E* grades for the course
    
    if(EStarStudents.data.length>0){      // check whether there are students having E* grades
       
      setEStarStudentsAvailability(true);   // set the EStarStudentsAvailability state to true if there are students having E* grades

    }else{


      setEStarStudentsAvailability(false);    // set the EStarStudentsAvailability state to false if there are no students having E* grades
      
      if(value==='All students'){     // check whether the selected value is 'All students'
        
        try {
          const response = await axios.get(
            `http://localhost:9090/api/AssistantRegistrar/findAllStudentsGrade/${course_variables.course_id}`   // get all the students grades for the course
          );

          if(response.data.length>0){     // check whether there are students

            setStudentsAvailability(true);    // set the StudentsAvailability state to true if there are students

            setStudentGrades(response.data);    // set the response data to the studentGrades 
  
            const uniqueIds = [...new Set(response.data.map((item)=>item.student_id))];   // get the unique student ids
            //const uniqueIds = Array.from(new Set(response.data.map((item) => item.student_id)));
            setUniqueStudentIds(uniqueIds);   // set the unique student ids to the uniqueStudentIds

          }else{
            setStudentsAvailability(false);    // set the StudentsAvailability state to false if there are no students
          }

        } catch (error) {
          console.error('Error fetching data:', error);     // log the error if there is an error
        }
  
      }else{    // if the any value is selected
        
        try {
          const response = await axios.get(
            `http://localhost:9090/api/AssistantRegistrar/findSelectedStudentGrade/${course_variables.course_id}/${value}`      // get the selected student grades for the course
          );

          if(response.data.length>0){     // check whether there are details of the selected student

            setStudentsAvailability(true);    // set the StudentsAvailability state to true if there are students
            const Allresponse = await axios.get(
              `http://localhost:9090/api/AssistantRegistrar/findAllStudentsGrade/${course_variables.course_id}`       // get all the students grades for the course
            );
            setStudentGrades(response.data);      // set the data of the selected student to the studentGrades
          
    
            const uniqueIds = [...new Set(Allresponse.data.map((item)=>item.student_id))];        // get the unique student ids from all students
            //const uniqueIds = Array.from(new Set(Allresponse.data.map((item) => item.student_id)));
            setUniqueStudentIds(uniqueIds);     // set the unique student ids to the uniqueStudentIds

          }
          else{
            setStudentsAvailability(false);    // set the StudentsAvailability state to false if there are no students
          }
  
    
        } catch (error) {
          console.error('Error fetching data:', error);       // log the error if there is an error
        }
      }
    }

  };


    

  useEffect(()=>{     // use effect to load the data when the page is loaded
    fetchData(selectedOption);    // fetch the data according to the selected option
  },[]);


  return (
    <div>
        
        
        <div style={{width:"97%",marginLeft:"auto",marginRight:"auto",marginTop:"65px"}}>
        {
          eStarStudentsAvailability ?     // check whether there are students having E* grades
          (      

            <div className="alert alert-danger" role="alert" style={{marginTop:'100px',textAlign:'center',width:'80%',marginLeft:'auto',marginRight:'auto'}}>
              <h5>There are students having 'E*' for Mid examination or End examination for this course</h5>
              please update the grades according to medical submissions of those students
            </div>
        
          ):(     // if there are no students having E* grades

            studentsAvailability ?     // check whether there are students
            (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th style={{textAlign:"center",backgroundColor:'#ebe8e8',width:"250px"}} >
                      
                      <select className="form-select w-100 mx-lg-2" aria-label="Default select example" onChange={(e) => handleSelectedValue(e.target.value)}>    {/* select box to select the student id */} 
                        <option >All students</option>
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
            ):(
              <div className="alert alert-danger" role="alert" style={{marginTop:'100px',textAlign:'center',width:'80%',marginLeft:'auto',marginRight:'auto'}}>
                <h5>There are no marks to view</h5>
                May be no students registered for this courese module

              </div>
            )
            
          
          )
        }
        <div className='right-aligned-div'>   {/* back button */} 
          <BackButton/> &nbsp;&nbsp;&nbsp;
        </div><br/>
        </div>
        
    </div>
  )
}
