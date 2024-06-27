import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import './viewResultBoard.css'
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


export default function ViewResultBoard() {

    

    const location = useLocation(); //Get the location details from the URL

    const selectedResultBoard ={                //Object to store the object that is passed with the URL to this page
        id:location.state.id,
        department:location.state.department,
        level:location.state.level,
        semester:location.state.semester,
        academic_year:location.state.academic_year,
        status:location.state.status
    }
    

    const [availableCourseList, setAvailableCourseList] = useState([]); //State to store the course list that can be added to the result board
    const [availableExaminerList, setAvailableExaminerList] = useState([]); //State to store the available coordinators 

    const [selectedCourse, setSelectedCourse] = useState('0'); //State to store the selected course
    const [selectedExaminer, setSelectedExaminer] = useState('0'); //State to store the selected coordinator





    const handleExaminerSelection = (selectedExaminer)=>{       //Function to handle the coordinator selection
        setSelectedExaminer(selectedExaminer.target.value); //Set the selected coordinator
    }
    
    const handleCourseSelection = (selectedCourse)=>{       //Function to handle the course selection 
        
        setSelectedCourse(selectedCourse.target.value); //Set the selected course
   
    }




    const getAvailableCourses = async ()=>{     //Get the result board details from the database
        
        try{
            const courseList = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getCourseListRemainingToAddToResultBoard/${selectedResultBoard.level}/${selectedResultBoard.semester}/${selectedResultBoard.department}/${selectedResultBoard.id}`); //Get the course list that can be added to the result board from the database
            setAvailableCourseList(courseList.data); //Set the course list that can be added to the result board
        }catch(err){
            toast.error(err.response.data.errorMessage); //Display the error message if an error occurs
        }

        
    }

    const getAvailableExaminers = async ()=>{     //Get the result board details from the database
    
        try{
            const examinerList = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getAllCourseCoordinatorsBySelectedAcademicYearDepartmentLevelSemester/${selectedResultBoard.academic_year}/${selectedResultBoard.department}/${selectedResultBoard.level}/${selectedResultBoard.semester}`); //Get the course coordinator list from the database
            setAvailableExaminerList(examinerList.data); //Set the course coordinator list
        }catch(err){
            toast.error(err.response.data.errorMessage); //Display the error message if an error occurs
        }
        
    }



    useEffect(() => {
        setAvailableCourseList([]); //Clear the course list that can be added to the result board
        getAvailableCourses();
        setAvailableExaminerList([]); //Clear the course coordinator list
        getAvailableExaminers();

    }, [])



  return (
    <div className='view-result-board-body container'>
        {
            console.log(availableExaminerList)
        }
        <div className='row justify-content-between'>



            <div className='col-4 div1'>        {/*Left div*/}

                
                <div className="row justify-content-between">       {/* 1st row of left div*/}
                    
                    <div className='col selection-box-col' >            {/*Scolumn for examiner selection*/}

                        <select className='examiner-select' value ={selectedExaminer} onChange={handleExaminerSelection}>
                            <option value='0' disabled> Select an examiner</option>
                            {
                                availableExaminerList.map((examiner,index)=>(
                                    <option key ={index} value={examiner.user_id}>{examiner.user_id} - {examiner.user_name}</option>
                                ))
                            }
                        </select>

                    </div>

                    <div className='col selection-box-col' >        {/*Column for course selection*/}

                        <select className='marksheet-select' value ={selectedCourse} onChange={handleCourseSelection}>
                            <option value='0' disabled> Select a marksheet</option>
                            {
                                availableCourseList.map((course,index)=>(
                                    <option key={index} value={course.course_id}>{course.course_id} - {course.course_name} - {index}</option>
                                ))
                            }
                        </select>

                    </div>


                </div>

                <div className="row justify-content-between">
                    
                    <div className='col button-col' >
                            
                        <button className='btn btn-primary btn-sm assign-button'>Assign Markshet</button>

                    </div>

                    <div className='col button-col' >
                            
                    </div>
                    

                </div>


            </div>



            <div className='col-4 div2'>
                Hello
            </div>



        </div>
        

        <ToastContainer/>
    </div>
  )
}
