import React from 'react'
import { Redirect, useParams } from 'react-router-dom';
import './updateEStarPage.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../../Components/AR/BackButton/BackButton';
import { useOktaAuth } from '@okta/okta-react';

export default function UpdateEStarPage() {

    const { authState } = useOktaAuth();

  

    

    const studentDetails = useParams();     //Get the student details from the URL
    const [newGrade,setNewGrade]=useState('');    //Use state to store the new grade
    const [medicalListUploaded,setMedicalListUploaded]=useState(false);     //Use state to store whether the medical list is uploaded or not
    const [stateOfTheMedicalSubmission,setStateOfTheMedicalSubmission]=useState('');    //Use state to store the state of the medical submission
    const [stateOfTheMedicalSubmissionColor,setStateOfTheMedicalSubmissionColor]=useState('');    //Use state to store the color of the medical submission state
    
    
    let updateDataOject = {     //Object to store the updated data
        course_id: studentDetails.course_id,
        student_id: studentDetails.student_id,
        new_grade: newGrade,
        exam_type: studentDetails.exam_type,
        academic_year: studentDetails.academic_year

    };


    const loadAllMedicalSubmissions = async() => {   //Function to load the medical submission details from the backend

        const result = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getAllMedicalSubmissions/${studentDetails.academic_year}`);   //Get all the medical submission details from the backend
        
        if(result.data.length>0){    //condition to check if the medical list is uploaded
            setMedicalListUploaded(true);   //Set the medicalListUploaded state to true if the medical list is uploaded
            const selectedStudentMedicalDetails = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getSelectedStudentMedicalDetails/${studentDetails.student_id}/${studentDetails.course_id}/${studentDetails.academic_year}/${studentDetails.exam_type}`);   //Get the selected student medical details from the backend

            if(selectedStudentMedicalDetails.data.length>0){    //condition to check whether the selected student has submitted a medical or not

                await selectedStudentMedicalDetails.data.map((element)=>{       //Map the selected student medical details
                    
                    if (element['medical_state']==='Approved'){   //condition to check whether the medical submission is approved or not
                        setNewGrade("MC");          //Set the new grade to MC if the medical submission is approved
                        setStateOfTheMedicalSubmissionColor("green");     //Set the color of the medical submission state to green
                        setStateOfTheMedicalSubmission("Medical submission has approved.");    //Set the state of the medical submission
                    }
                    else{
                        setNewGrade("F");          //Set the new grade to F if the medical submission is not approved
                        setStateOfTheMedicalSubmissionColor("red");    //Set the color of the medical submission state to red
                        setStateOfTheMedicalSubmission("Medical submission has rejected.");    //Set the state of the medical submission
                    }
                })
            }
            else{
                setNewGrade("F");                 //Set the new grade to F if the selected student has not submitted a medical
                setStateOfTheMedicalSubmissionColor("red");    //Set the color of the medical submission state to red
                setStateOfTheMedicalSubmission("Student has not submitted a medical.");    //Set the state of the medical submission

            }

        }else{
            setMedicalListUploaded(false);   //Set the medicalListUploaded state to false if the medical list is not uploaded    
    
        }
    };

    useEffect(()=>{
        
        loadAllMedicalSubmissions();        //Load the medical submission details when the page is loaded
    },[]);


    const updateGrade = async()=>{
        updateDataOject.course_id = studentDetails.course_id;
        updateDataOject.student_id = studentDetails.student_id;
        updateDataOject.new_grade = newGrade;
        updateDataOject.exam_type = studentDetails.exam_type;
        updateDataOject.academic_year = studentDetails.academic_year;

        const result1 = await axios.put("http://localhost:9090/api/AssistantRegistrar/updateStudentGrade" , updateDataOject);   //Update the student grade with the new grade
        
        if(result1.data<0){     //condition to check is there a error with updating the grade
            alert("Error with updating grade");  
        };

        if(newGrade==="MC"){        //condition to check whether the new grade is MC
            const result2= await axios.put("http://localhost:9090/api/AssistantRegistrar/updateStudentFinalGrade" , updateDataOject);       //Update the student final grade with the WH grade
            
            if(result2.data<0){ 
                alert("Error with updating Final Grade");  
            }
        };
        
        window.history.back();      //Back to the previous page

    };
    



  return (
    <div>
        <div className="formBg">
            {
                medicalListUploaded ? (
                    <form>
                        <table>
                            <tbody>
                                <tr>
                                    <td><label>Student ID: </label></td>
                                    <td> <label className='labelValue'>{studentDetails.student_id}</label> </td>
                                </tr>
                                <tr>
                                    <td><label >Course ID: </label></td>
                                    <td> <label className='labelValue'>{studentDetails.course_id}</label> </td>
                                </tr>
                                <tr>
                                    <td><label>Course name: </label></td>
                                    <td> <label className='labelValue'>{studentDetails.course_name}</label> </td>
                                </tr>
                                <tr>
                                    <td><label>Exam type: </label></td>
                                    <td> <label className='labelValue'>{studentDetails.exam_type}</label> </td>
                                </tr>
                                <tr>
                                    <td><label>Current grade: </label></td>
                                    <td> <label className='labelValue'>{studentDetails.grade}</label> </td>
                                </tr>
                                <tr>
                                    <td><label>New grade: </label></td>
                                    <td> <label className='labelValue'>{newGrade}</label> </td>
                                </tr>
                                <tr>
                                    {stateOfTheMedicalSubmissionColor==="green" ? (
                                        <td colSpan={2} ><label className="statusLabel" style={{color:'#1f9e50'}}>{stateOfTheMedicalSubmission}</label></td>
                                    ):(
                                        <td colSpan={2} ><label className="statusLabel" style={{color:'#d31a1a'}}>{stateOfTheMedicalSubmission}</label></td>
                                    )}
                                    
                                </tr>
                            </tbody>
                        </table>
                    </form>
                ):(
                    <div className="alert alert-danger" role="alert" style={{marginTop:'100px',textAlign:'center',width:'80%',marginLeft:'auto',marginRight:'auto'}}>
                        <h5>Medical List is pending...</h5>
                    </div>
                )
                
                
            }
            <div className='right-aligned-div'><br/>
            <button className="btn btn-success btn-sm" onClick={updateGrade} >Update</button>&nbsp;&nbsp;
              <BackButton/> <br/>&nbsp;
            </div>  
        </div>
    </div>
  )
}
