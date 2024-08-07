import React from 'react'
import { Redirect, useParams } from 'react-router-dom';
import './updateABPage.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../../Components/AR/BackButton/BackButton';
import { useOktaAuth } from '@okta/okta-react';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { SpinerLoading } from '../../Utils/SpinerLoading';


export default function UpdateABPage() {

    const { authState } = useOktaAuth();
    const history = useHistory();

  

    

    const studentDetails = useParams();     //Get the student details from the URL
    const [newScore,setNewScore]=useState('');    //Use state to store the new score
    const [newGrade,setNewGrade]=useState('');    //Use state to store the new grade
    const [medicalListUploaded,setMedicalListUploaded]=useState(false);     //Use state to store whether the medical list is uploaded or not
    const [stateOfTheMedicalSubmission,setStateOfTheMedicalSubmission]=useState('');    //Use state to store the state of the medical submission
    const [stateOfTheMedicalSubmissionColor,setStateOfTheMedicalSubmissionColor]=useState('');    //Use state to store the color of the medical submission state
    
    let academicYearDetails = {             //Object to store the academic year details
        previous_academic_year:"",
        current_academic_year:"",
        current_semester:""
    }

    let existingGrade = {                    //Object to store the pervious grade details of the student
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

    let updateDataOject = {     //Object to store the updated marks data
        course_id: studentDetails.course_id,                        //Set the course id ininially
        student_id: studentDetails.student_id,                      //Set the student id initially
        new_score: newScore,                                        //Set the new score initially
        exam_type: studentDetails.exam_type,                        //Set the exam type initially  
        academic_year: studentDetails.academic_year,                //Set the academic year initially

    };










    const loadAllMedicalSubmissions = async() => {   //Function to load the medical submission details from the backend

        const result = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getAllMedicalSubmissionsByYear/${studentDetails.academic_year}`);   //Get all the medical submission details from the backend
        
        if(result.data.length>0){    //condition to check if the medical list is uploaded
           
            setMedicalListUploaded(true);   //Set the medicalListUploaded state to true if the medical list is uploaded
           
            
            const selectedStudentMedicalDetails = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getSelectedStudentMedicalDetails/${studentDetails.student_id}/${studentDetails.course_id}/${studentDetails.academic_year}/${studentDetails.exam_type}`);   //Get the selected student medical details from the backend
            if(selectedStudentMedicalDetails.data.length>0){    //condition to check whether the selected student has submitted a medical or not

                await selectedStudentMedicalDetails.data.map((element)=>{       //Map the selected student medical details
                    
                    if (element['medical_state'].toLowerCase()==='Approved'.toLowerCase()){   //condition to check whether the medical submission is approved or not
                        setNewScore("MC");          //Set the new score to MC if the medical submission is approved
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

    


    const updateGrade = async()=>{              //Function to update the student grade

        updateDataOject.course_id = studentDetails.course_id;           //Set the course id update in marks
        updateDataOject.student_id = studentDetails.student_id;         //Set the student id update in marks
        updateDataOject.new_score = newScore;                           //Set the new score update in marks
        updateDataOject.exam_type = studentDetails.exam_type;           //Set the exam type update in marks
        updateDataOject.academic_year = studentDetails.academic_year;   //Set the academic year update in marks

        


        try{
            const update = await axios.put("http://localhost:9090/api/AssistantRegistrar/updateStudentScore" , updateDataOject);   //Update the student AB exam score  with the new score (MC or F)
            if(update.data<0){     //condition to check is there a error with updating the grade
                alert("Error with updating AB score with new score"); 
                toast.error('Error with updating AB score with new score',{autoClose:2000}); 
            }else{
                toast.success('New score updated successfully',{autoClose:2000});
            }
        }
        catch(error){
            toast.error(error,{autoClose:2000});
        }


        const selectedStudentGrade = await axios.get(`http://localhost:9090/api/AssistantRegistrar/findSelectedStudentGrade/${studentDetails.course_id}/${studentDetails.student_id}`);   //Get the selected student grade from the backend
            
            if(selectedStudentGrade.data.length>0){    //condition to check whether the selected student has a grade or not (Grade should be there )
                existingGrade.id=selectedStudentGrade.data[0].id;                                            //Set existing id in the grade table
                existingGrade.student_id=selectedStudentGrade.data[0].student_id;                            //Set existing student id in the grade table
                existingGrade.course_id=selectedStudentGrade.data[0].course_id;                              //Set existing course id in the grade table
                existingGrade.level= selectedStudentGrade.data[0].level;                                     //Set existing level in the grade table
                existingGrade.semester = selectedStudentGrade.data[0].semester;                              //Set existing semester in the grade table
                existingGrade.total_ca_mark = selectedStudentGrade.data[0].total_ca_mark;                    //Set existing total ca mark in the grade table
                existingGrade.ca_eligibility = selectedStudentGrade.data[0].ca_eligibility;                  //Set existing ca eligibility in the grade table
                existingGrade.total_final_mark = selectedStudentGrade.data[0].total_final_mark;              //Set existing total final mark in the grade table
                existingGrade.total_rounded_mark = selectedStudentGrade.data[0].total_rounded_mark;          //Set existing total rounded mark in the grade table
                existingGrade.grade = selectedStudentGrade.data[0].grade;                                    //Set existing grade in the grade table
                existingGrade.gpv = selectedStudentGrade.data[0].gpv;                                        //Set existing gpv in the grade table
            }




        try{
            const academicDetails = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getAcademicYearDetails`)              //Get academic year details to find current and previous academic year
            if(academicDetails.data.length>0){                                                                                    //condition to check whether the academic year details are available
                academicYearDetails.previous_academic_year = academicDetails.data[0].previous_academic_year;                //Set the previous academic year
                academicYearDetails.current_academic_year = academicDetails.data[0].current_academic_year;                  //Set the current academic year
                academicYearDetails.current_semester = academicDetails.data[0].current_semester;                            //Set the current semester

            }else{
                toast.error('Error with getting academic year details',{autoClose:2000});                         //if academicy year details are not available show a toast message
            }
        }
        catch(error){
            toast.error(error,{autoClose:2000});             //if there is a error with getting academic year details show a toast message
        }




        try{
            const marksList =await axios.get(`http://localhost:9090/api/AssistantRegistrar/getSelectedStudentSelectedExamMarksBySelectedCourseAndSelectedAcademicYear/${studentDetails.student_id}/${studentDetails.course_id}/${academicYearDetails.previous_academic_year}/${studentDetails.exam_type}`);   //Get the selected student marks by selected course in previous academic year (to check whether the student is a propper student or not)
            
            if(marksList.data.length==0){    //condition to check whether the selected student dont have marks in previous academic year (meanse the student is a propper student)

            
                /*---------------------------------------------------------------------Scenario for a propper student---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
                    
                if (studentDetails.exam_type.toLowerCase()=="Mid theory exam".toLowerCase() || studentDetails.exam_type.toLowerCase()=="Mid practical exam".toLowerCase()){                   //Condition to check whether the exam is a mid exam
                        
                    if(newScore.toLowerCase()==="F".toLowerCase()){             //condition to check whether the new grade is F
                            existingGrade.ca_eligibility="Not eligible";     //Set the ca eligibility to not eligible
                            existingGrade.grade="F";     //Set the grade to F
                    }

                    else if(newScore.toLowerCase()==="MC".toLowerCase()){           //condition to check whether the new grade is MC

                        existingGrade.grade="WH";        //Set the grade to MC

                        if(existingGrade.ca_eligibility.toLowerCase()==="Pending".toLowerCase()){            //condition to check whether the ca eligibility is pending
                            existingGrade.ca_eligibility="Eligible";                 //Set the ca eligibility to eligible
                        }
                    }

                    try{
                        const updateGradeResult= await axios.put(`http://localhost:9090/api/AssistantRegistrar/updateStudentFinalGrade`,existingGrade);   //Update the  grade of a propper student with the new grade and other details in Mid exam scenario 
                        toast.success('Final grade updated successfully',{autoClose:2000});     //Show a toast message
                    }
                    catch(error){
                        toast.error(error,{autoClose:2000});        //Show a toast message
                    }

                    
                } else if(studentDetails.exam_type.toLowerCase()=="End theory exam".toLowerCase() || studentDetails.exam_type.toLowerCase()=="End practical exam".toLowerCase()){           //Condition to check whether the exam is a end exam
                    
                    if(studentDetails.exam_type.toLowerCase()=="End theory exam".toLowerCase()){            //Condition to check whether the exam is a theory exam
                        
                        const midExamMarksList= await axios.get(`http://localhost:9090/api/AssistantRegistrar/getSelectedStudentSelectedExamMarksBySelectedCourseAndSelectedAcademicYear/${studentDetails.student_id}/${studentDetails.course_id}/${academicYearDetails.current_academic_year}/Mid theory exam`);   //Get the mid therory exam results of the student in the current academic year
                        
                        if (((!midExamMarksList.data.length>0) ||midExamMarksList.data[0].assignment_score.toLowerCase() !="F".toLowerCase()) && updateDataOject.new_score.toLowerCase()==="MC".toLowerCase()){      //Condition to check whether the student has passed the mid exam and have MC for end exam
                            
                            existingGrade.grade="WH";                   //Set the grade to WH
                        }else{
                            //Grade will be existing grade (possinle grade)
                        }
                        
                    } else if(studentDetails.exam_type.toLowerCase()=="End practical exam".toLowerCase()){      //Condition to check whether the exam is a practical exam

                        const midExamMarksList= await axios.get(`http://localhost:9090/api/AssistantRegistrar/getSelectedStudentSelectedExamMarksBySelectedCourseAndSelectedAcademicYear/${studentDetails.student_id}/${studentDetails.course_id}/${academicYearDetails.current_academic_year}/Mid practical exam`);   //Get the mid practical exam results of the student in the current academic year
                        
                        if (((!midExamMarksList.data.length>0) ||midExamMarksList.data[0].assignment_score.toLowerCase() !="F".toLowerCase()) && updateDataOject.new_score.toLowerCase()==="MC".toLowerCase()){              //Condition to check whether the student has passed the mid exam and have MC for end exam
                            existingGrade.grade="WH"                   //Set the grade to WH   
                        }else{
                            //Grade will be existing grade (possinle grade)
                        }
                        
                    }

                    try{
                        const updateGradeResult= await axios.put(`http://localhost:9090/api/AssistantRegistrar/updateStudentFinalGrade`,existingGrade);         //Update the  grade of a propper student with the new grade and other details in End exam scenario
                        toast.success('Final grade updated successfully',{autoClose:2000});             //Show a toast message
                    }
                    catch(error){
                        toast.error(error,{autoClose:2000});        //Show a toast message
                    }
                }
            
            }else if(marksList.data.length>0){                                           //condition to check whether the selected student has marks in previous academic year (meanse the student is a repeated student or a student who has a WH grade)

            /*---------------------------------------------------------------------Scenario for a repeated or WH student---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
                



            if((studentDetails.exam_type.toLowerCase()=="Mid theory exam".toLowerCase() || studentDetails.exam_type.toLowerCase()=="End theory exam".toLowerCase())){           //Condtition to ensure the exam is a theory exam
                

                const previousMidExamResult =await axios.get(`http://localhost:9090/api/AssistantRegistrar/getSelectedStudentSelectedExamMarksBySelectedCourseAndSelectedAcademicYear/${studentDetails.student_id}/${studentDetails.course_id}/${academicYearDetails.previous_academic_year}/Mid theory exam`);   //Get the selected student previous mid exam marks in theory exam 
                
                if(((!previousMidExamResult.data.length>0) || previousMidExamResult.data[0].assignment_score=="MC") && existingGrade.grade=="WH" && newScore=="F"){       //Condition to check whether the student has a WH grade and the new grade is F
                    existingGrade.grade="F";        //Set the grade to F
                    existingGrade.ca_eligibility="Not eligible";    //Set the ca eligibility to not eligible

                    try{
                        const updateGradeResult= await axios.put(`http://localhost:9090/api/AssistantRegistrar/updateStudentFinalGrade`,existingGrade);         //Update the  grade of a repeated or WH student with the new grade and other details in theory exam scenario
                        toast.success('Final grade updated successfully',{autoClose:2000});             //Show a toast message

                    }
                    catch(error){
                        toast.error(error,{autoClose:2000});        //Show a toast message
                    }
                }

            } else if((studentDetails.exam_type.toLowerCase()=="Mid practical exam".toLowerCase() || studentDetails.exam_type.toLowerCase()=="End practical exam".toLowerCase())){           //Condtition to ensure the exam is a practical exam
                
                const previousMidExamResult =await axios.get(`http://localhost:9090/api/AssistantRegistrar/getSelectedStudentSelectedExamMarksBySelectedCourseAndSelectedAcademicYear/${studentDetails.student_id}/${studentDetails.course_id}/${academicYearDetails.previous_academic_year}/Mid practical exam`);   //Get the selected student previous mid exam marks in practical exam
                
                if(((!previousMidExamResult.data.length>0) || previousMidExamResult.data[0].assignment_score=="MC") && existingGrade.grade=="WH" && newScore=="F"){       //Condition to check whether the student has a WH grade and the new grade is F
                    existingGrade.grade="F";        //Set the grade to F
                    existingGrade.ca_eligibility="Not eligible";    //Set the ca eligibility to not eligible

                    try{
                        const updateGradeResult= await axios.put(`http://localhost:9090/api/AssistantRegistrar/updateStudentFinalGrade`,existingGrade);         //Update the  grade of a repeated or WH student with the new grade and other details in theory exam scenario
                        toast.success('Final grade updated successfully',{autoClose:2000});             //Show a toast message

                    }
                    catch(error){
                        toast.error(error,{autoClose:2000});        //Show a toast message
                    }
                }
            }

            

            }
        }
        catch(error){
            toast.error(error,{autoClose:2000});
        }

        
        



        setTimeout(() => {
            history.goBack();     //Back to the previous page
        }, 3000);

    };


    useEffect(()=>{
        
        loadAllMedicalSubmissions();        //Load the medical submission details when the page is loaded
    },[]);



    
    if(!authState){
        return <SpinerLoading/>;
      }
      if(authState.accessToken?.claims.userType !== "ar"){
        return <Redirect to="/home" />;
      }
    



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
                                    <td><label className="labelkey">Academic year: </label></td>
                                    <td> <label className='labelValue'>{studentDetails.academic_year}</label> </td>
                                </tr>
                                <tr>
                                    <td><label className="labelkey">Current score: </label></td>
                                    <td> <label className='labelValue'>{studentDetails.grade}</label> </td>
                                </tr>
                                <tr>
                                    <td><label className="labelkey" >New score: </label></td>
                                    <td> <label className='labelValue' style={{color:stateOfTheMedicalSubmissionColor,fontWeight:'bold'}}>{newScore}</label> </td>
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
