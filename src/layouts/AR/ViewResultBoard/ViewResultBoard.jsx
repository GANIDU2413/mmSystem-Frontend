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
        
        
        <ToastContainer/>
    </div>
  )
}
