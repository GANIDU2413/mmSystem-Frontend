import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './viewResultBoard.css'
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


export default function ViewResultBoard() {

    

    const selectedResultBoard = useParams(); //Get the selected result board details from the URL
    

    const [availableCourseList, setAvailableCourseList] = useState([]); //State to store the course list that can be added to the result board
    const [availablCoordinators, setAvailableCoordinators] = useState([]); //State to store the available coordinators 

    const [selectedCourse, setSelectedCourse] = useState('0'); //State to store the selected course
    const [selectedCoordinator, setSelectedCoordinator] = useState('0'); //State to store the selected coordinator





    const handleCoordinatorSelection = (selectedCoordinator)=>{       //Function to handle the coordinator selection
        selectedCoordinator(selectedCoordinator.target.value); //Set the selected coordinator
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



    useEffect(() => {
        setAvailableCourseList([]); //Clear the course list that can be added to the result board
        getAvailableCourses();

    }, [])



  return (
    <div className='view-result-board-body container'>

        <div className='row justify-content-between'>



            <div className='col-4 div1'>        {/*Left div*/}

                
                <div className="row justify-content-between">       {/* 1st row of left div*/}
                    
                    <div className='col selection-box-col' >

                        <select className='coordinator-select' value ={selectedCoordinator} onChange={handleCoordinatorSelection}>
                            <option value='0' disabled> Select a coordinator</option>
                        
                        </select>

                    </div>

                    <div className='col selection-box-col' >

                        <select className='course-select' value ={selectedCourse} onChange={handleCourseSelection}>
                            <option value='0' disabled> Select a course</option>
                            {
                                availableCourseList.map((course,index)=>(
                                    <option key={index} value={course.course_id}>{course.course_id} - {course.course_name} - {index}</option>
                                ))
                            }
                        </select>

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
