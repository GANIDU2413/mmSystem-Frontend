import React from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import "./viewMarksTableValidations.css";
import { useOktaAuth } from '@okta/okta-react';
import { Redirect } from 'react-router-dom';
import { SpinerLoading } from '../../../Utils/SpinerLoading';


export default function ViewMarksTableValidations() {

    const { authState } = useOktaAuth();        // get the authentication state

    const course_variables = useParams();   // get the course variables from the url
    const [interrupt, setInterrupt] = useState(false);      // state to store the interrupt status
    const history = useHistory();    // get the history object
    const requiredApprovedLevel = "HOD";
    

    const fetchData = async ()=>{

      try{

        const academicYear = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getAcademicYearDetails`);      // get the academic year details
        setInterrupt(false);   // set the interrupt state to false
        try{
          
          const approvedLevel= await axios.get(`http://localhost:9090/api/AssistantRegistrar/getMarksApprovalLevelBySelectedCourseAndAcademicYear/${course_variables.course_id}/${academicYear.data[0]["current_academic_year"]}`);    // get the approved level for the course
          
          setInterrupt(false);   // set the interrupt state to false
          
          if(approvedLevel.data.length>0){      // check whether there are approved levels

            setInterrupt(false);   // set the interrupt state to false

            if(approvedLevel.data[0]["approval_level"]===requiredApprovedLevel){    // check whether the course is under the approval level HOD

              setInterrupt(false);   // set the interrupt state to false

              try{

                const ABStudents = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getABDetailsByCourseId/${course_variables.course_id}`);    // get the students having AB for relevent exams
                setInterrupt(false);   // set the interrupt state to false

                if(ABStudents.data.length>0){       //if there are student having AB scores

                  setInterrupt("There are students who were absent for the exams, please check the medicals and update their states");   // set the interrupt state to "There are students who were absent for the exams, plese check the medicals and update their states"
                }
                else{
                  setInterrupt(false);

                  try{
                    const allStudents = await axios.get(`http://localhost:9090/api/AssistantRegistrar/findAllStudentsGrade/${course_variables.course_id}`);   // get all the students grades for the course

                    if(allStudents.data.length>0){     // check whether there are students

                      setInterrupt(false);   // set the interrupt state to false
                      
                      history.push(`/ARMarksReturnSheet/${course_variables.course_id}/${course_variables.course_name}`)
                    }
                    else{
                      setInterrupt("No students marks for this course");   // set the interrupt state to "No students data found"
                    }
                  }
                  catch{
                    setInterrupt("Error fetching all students data");   // set the interrupt state to "Error fetching all students data
                  }
                  
                }

              }
              catch{
                setInterrupt("Error fetching AB students data");   // set the interrupt state to "Error fetching AB students data"
              }

            
            }
            else{
              setInterrupt("This mark sheet is not submitted for Assistant Registrar");  // set the interrupt state to "This course in not under your approval"
            }

          }
          else{
            setInterrupt("No approval level found related to this course");   // set the interrupt state to "No approval level related to this course"
          }
        }
        catch{
          setInterrupt("Error fetching approved level data");   // set the interrupt state to "Error fetching academic data
        }

      }
      catch(error){
        setInterrupt("Error fetching academic data");   // set the interrupt state to "Error fetching academic data
      }



    }


    useEffect(()=>{
        fetchData();
    },[])

    
    if(!authState){
      return <SpinerLoading/>;
    }
    if(authState.accessToken?.claims.userType !== "ar"){
      return <Redirect to="/home" />;
    }


  return (
    <div>
      {
        interrupt===false ? (
          null
        ) : (
          <div className='alert alert-danger error-message' role='alert'>
              <h5>{interrupt}</h5>
          </div>
        )
      }
      
          

    </div>
  )
}
