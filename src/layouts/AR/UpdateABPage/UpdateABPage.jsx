import React from 'react'
import { Redirect, useParams } from 'react-router-dom';
import './updateABPage.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../../Components/AR/BackButton/BackButton';
import { useOktaAuth } from '@okta/okta-react';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

export default function UpdateABPage() {

    const { authState } = useOktaAuth();
    const history = useHistory();

  

    

    const studentDetails = useParams();     //Get the student details from the URL
    const [newScore,setNewScore]=useState('');    //Use state to store the new score
    const [newGrade,setNewGrade]=useState('');    //Use state to store the new grade
    const [medicalListUploaded,setMedicalListUploaded]=useState(false);     //Use state to store whether the medical list is uploaded or not
    const [stateOfTheMedicalSubmission,setStateOfTheMedicalSubmission]=useState('');    //Use state to store the state of the medical submission
    const [stateOfTheMedicalSubmissionColor,setStateOfTheMedicalSubmissionColor]=useState('');    //Use state to store the color of the medical submission state
    
    let academicYearDetails = {
        previous_academic_year:"",
        current_academic_year:"",
        current_semester:""
    }

    let perviousGradeDetails = {
        id:"",
        student_id:"",
        course_id: "",
        level:"",
        semester:"",
        total_ca_mark:"",
        ca_eligibility:"",
        total_final_mark:"",
        total_rounded_mark:"",
        grade:"",
        gpv:"",


    }

    let updateDataOject = {     //Object to store the updated data
        course_id: studentDetails.course_id,
        student_id: studentDetails.student_id,
        new_score: newScore,
        exam_type: studentDetails.exam_type,
        academic_year: studentDetails.academic_year,
        new_grade: newGrade,
        ca_eligibility: perviousGradeDetails.ca_eligibility,

    };










    const loadAllMedicalSubmissions = async() => {   //Function to load the medical submission details from the backend

        const result = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getAllMedicalSubmissionsByYear/${studentDetails.academic_year}`);   //Get all the medical submission details from the backend
        
        if(result.data.length>0){    //condition to check if the medical list is uploaded
           
            setMedicalListUploaded(true);   //Set the medicalListUploaded state to true if the medical list is uploaded
           
            const selectedStudentGrade = await axios.get(`http://localhost:9090/api/AssistantRegistrar/findSelectedStudentGrade/${studentDetails.course_id}/${studentDetails.student_id}`);   //Get the selected student grade from the backend
            
            if(selectedStudentGrade.data.length>0){    //condition to check whether the selected student has a grade or not
                perviousGradeDetails.id=selectedStudentGrade.data[0].id;
                perviousGradeDetails.student_id=selectedStudentGrade.data[0].student_id;
                perviousGradeDetails.course_id=selectedStudentGrade.data[0].course_id;
                perviousGradeDetails.level= selectedStudentGrade.data[0].level;
                perviousGradeDetails.semester = selectedStudentGrade.data[0].semester;
                perviousGradeDetails.total_ca_mark = selectedStudentGrade.data[0].total_ca_mark;
                perviousGradeDetails.ca_eligibility = selectedStudentGrade.data[0].ca_eligibility;
                perviousGradeDetails.total_final_mark = selectedStudentGrade.data[0].total_final_mark;
                perviousGradeDetails.total_rounded_mark = selectedStudentGrade.data[0].total_rounded_mark;
                perviousGradeDetails.grade = selectedStudentGrade.data[0].grade;
                perviousGradeDetails.gpv = selectedStudentGrade.data[0].gpv;
            }

        

            const selectedStudentMedicalDetails = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getSelectedStudentMedicalDetails/${studentDetails.student_id}/${studentDetails.course_id}/${studentDetails.academic_year}/${studentDetails.exam_type}`);   //Get the selected student medical details from the backend
            if(selectedStudentMedicalDetails.data.length>0){    //condition to check whether the selected student has submitted a medical or not

                await selectedStudentMedicalDetails.data.map((element)=>{       //Map the selected student medical details
                    
                    if (element['medical_state']==='Approved'){   //condition to check whether the medical submission is approved or not
                        setNewScore("MC");          //Set the new score to MC if the medical submission is approved
                        setNewGrade("WH");          //Set the new grade to WH if the medical submission is approved 
                        setStateOfTheMedicalSubmissionColor("green");     //Set the color of the medical submission state to green
                        setStateOfTheMedicalSubmission("Medical submission has approved.");    //Set the state of the medical submission
                    }else{
                        setNewScore("F");          //Set the new score to F if the medical submission is not approved
                        setStateOfTheMedicalSubmissionColor("red");    //Set the color of the medical submission state to red
                        setStateOfTheMedicalSubmission("Medical submission has rejected.");    //Set the state of the medical submission
                    }
                })
            }
            else{
                setNewScore("F");                 //Set the new score to F if the selected student has not submitted a medical
                setStateOfTheMedicalSubmissionColor("red");    //Set the color of the medical submission state to red
                setStateOfTheMedicalSubmission("Student has not submitted a medical.");    //Set the state of the medical submission

            }

        }else{
            setMedicalListUploaded(false);   //Set the medicalListUploaded state to false if the medical list is not uploaded   
            toast.error('Medical List is pending...',{autoClose:2000});    //Show a toast message 
    
        }
    };

    useEffect(()=>{
        
        loadAllMedicalSubmissions();        //Load the medical submission details when the page is loaded
    },[]);


    const updateGrade = async()=>{
        updateDataOject.course_id = studentDetails.course_id;
        updateDataOject.student_id = studentDetails.student_id;
        updateDataOject.new_score = newScore;
        updateDataOject.exam_type = studentDetails.exam_type;
        updateDataOject.academic_year = studentDetails.academic_year;


        try{
            const update = await axios.put("http://localhost:9090/api/AssistantRegistrar/updateStudentScore" , updateDataOject);   //Update the student AB exam score  with the new score (MC or F)
            if(update.data<0){     //condition to check is there a error with updating the grade
                alert("Error with updating grade"); 
                toast.error('Error with updating grade',{autoClose:2000}); 
            }else{
                toast.success('Grade updated successfully',{autoClose:2000});
            }
        }
        catch(error){
            toast.error(error,{autoClose:2000});
        }

        

        try{
            const academicDetails = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getAcademicYearDetails`)
            if(academicDetails.data.length>0){
                console.log(academicDetails.data);
            }else{
                toast.error('Error with getting academic year details',{autoClose:2000});
            
            }
        }
        catch(error){
            toast.error(error,{autoClose:2000});
        }

        
        

        // if(newScore==="MC"){             //condition to check whether the new grade is MC
        //     const result2= await axios.put("http://localhost:9090/api/AssistantRegistrar/updateStudentFinalGrade" , updateDataOject);       //Update the student final grade with the WH grade
            
        //     if(result2.data<0){ 
        //         toast.error('Error with updating final grade',{autoClose:2000});  
        //     }else{
        //         toast.success('Final grade updated successfully',{autoClose:2000});

        //     }
        // };

        if(studentDetails.exam_type=="Mid theory exam" || studentDetails.exam_type=="Mid practical exam"){
            
        }

        setTimeout(() => {
            history.goBack();     //Back to the previous page
        }, 3000);

    };
    



  return (
    <div>
        <div className="formBg">
            {
                medicalListUploaded ? (
                    <form>
                        <table className='dataTable'>
                            <tbody>
                                <tr>
                                    <td><label className="labelkey">Student ID: </label></td>
                                    <td> <label className='labelValue'>{studentDetails.student_id}</label> </td>
                                </tr>
                                <tr>
                                    <td><label className="labelkey">Course ID: </label></td>
                                    <td> <label className='labelValue'>{studentDetails.course_id}</label> </td>
                                </tr>
                                <tr>
                                    <td><label className="labelkey">Course name: </label></td>
                                    <td> <label className='labelValue'>{studentDetails.course_name}</label> </td>
                                </tr>
                                <tr>
                                    <td><label className="labelkey">Exam type: </label></td>
                                    <td> <label className='labelValue'>{studentDetails.exam_type}</label> </td>
                                </tr>
                                <tr>
                                    <td><label className="labelkey">Current score: </label></td>
                                    <td> <label className='labelValue'>{studentDetails.grade}</label> </td>
                                </tr>
                                <tr>
                                    <td><label className="labelkey">New score: </label></td>
                                    <td> <label className='labelValue'>{newScore}</label> </td>
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
            <ToastContainer />
            <div className='right-aligned-div'><br/>
            <button className="btn btn-success btn-sm" onClick={updateGrade} >Update</button>&nbsp;&nbsp;
              <BackButton/> <br/>&nbsp;
            </div>  
        </div>
    </div>
  )
}
