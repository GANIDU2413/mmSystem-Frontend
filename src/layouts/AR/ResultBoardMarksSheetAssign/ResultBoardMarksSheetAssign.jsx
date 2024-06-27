import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import './resultBoardMarksSheetAssign.css'
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


export default function ResultBoardMarksSheetAssign() {



    const location = useLocation(); //Get the location details from the URL

    


    const [availableCourseList, setAvailableCourseList] = useState([]); //State to store the course list that can be added to the result board
    const [availableExaminerList, setAvailableExaminerList] = useState([]); //State to store the available coordinators
    const [message, setMessage] = useState(''); //State to store the message to be displayed
    const [messageColor, setMessageColor] = useState(''); //State to store the color of the message

    const [selectedCourse, setSelectedCourse] = useState('0'); //State to store the selected course
    const [selectedExaminer, setSelectedExaminer] = useState('0'); //State to store the selected coordinator
    const [assignButtenClicked, setAssignButtonClicked] = useState(false); //State to store the status of the assign button [clicked or not clicked


    const selectedResultBoard = {                //Object to store the object that is passed with the URL to this page
        id: location.state.id,
        department: location.state.department,
        level: location.state.level,
        semester: location.state.semester,
        academic_year: location.state.academic_year,
        status: location.state.status,
        created_date_time: location.state.created_date_time
    }

    const assignmentObject = {                              //Object to store the details of the new assignment
        course_coordinator_id: selectedExaminer,
        course_id: selectedCourse,
        result_board_id: location.state.id,
        assigned_date_time:''

    }



    const handleExaminerSelection = (selectedExaminer) => {       //Function to handle the coordinator selection
        setSelectedExaminer(selectedExaminer.target.value); //Set the selected coordinator
        setMessage(''); //Clear the message
        setMessageColor(''); //Clear the message color
    }

    const handleCourseSelection = (selectedCourse) => {       //Function to handle the course selection 

        setSelectedCourse(selectedCourse.target.value); //Set the selected course
        setMessage(''); //Clear the message
        setMessageColor(''); //Clear the message color

    }




    const getAvailableCourses = async () => {     //Get the result board details from the database

        try {
            const courseList = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getCourseListRemainingToAddToResultBoard/${selectedResultBoard.level}/${selectedResultBoard.semester}/${selectedResultBoard.department}/${selectedResultBoard.id}`); //Get the course list that can be added to the result board from the database
            setAvailableCourseList(courseList.data); //Set the course list that can be added to the result board
        } catch (err) {
            toast.error(err.response.data.errorMessage); //Display the error message if an error occurs
        }


    }

    const getAvailableExaminers = async () => {     //Get the result board details from the database

        try {
            const examinerList = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getAllCourseCoordinatorsBySelectedAcademicYearDepartmentLevelSemester/${selectedResultBoard.academic_year}/${selectedResultBoard.department}/${selectedResultBoard.level}/${selectedResultBoard.semester}`); //Get the course coordinator list from the database
            setAvailableExaminerList(examinerList.data); //Set the course coordinator list
        } catch (err) {
            toast.error(err.response.data.errorMessage); //Display the error message if an error occurs
        }

    }


    const assignMarksheet = async () => {     //Get the result board details from the database

        if (selectedCourse==0 || selectedExaminer==0) { //Check if the course and the coordinator is selected
            
            toast.error('Both examiner and marksheet should be selected'); //Display the error message
            setMessageColor('red'); //Set the color of the message
            setMessage('Both examiner and marksheet should be selected'); //Set the message

        }else{

            //Api to assign the marksheet to the selected examiner
             

            const currentDateAndTime = new Date();  //Get the current date and time
            const formattedDateTime = String(currentDateAndTime.getFullYear() + '-' + currentDateAndTime.getMonth() + '-' + currentDateAndTime.getDate() +' ' +  currentDateAndTime.getHours()+ ':'+ currentDateAndTime.getMinutes() +':' + currentDateAndTime.getSeconds()); //Format the date and time
            assignmentObject.assigned_date_time = formattedDateTime; //Set the formatted date and time to the assignment object

            try{
                 const saveResult = await axios.post('http://localhost:9090/api/AssistantRegistrar/saveResultBoardMember', assignmentObject);
                if(saveResult.data===true){
                    toast.success('Marksheet assigned successfully'); //Display the success message
                    setMessageColor('green'); //Set the color of the message
                    setMessage('Marksheet assigned successfully'); //Set the message
                    setSelectedCourse('0'); //Clear the selected course
                    setSelectedExaminer('0'); //Clear the selected coordinator

                }else if(saveResult.data===false){
                    toast.error('Selected marks sheet is already assigned!'); //Display the error message
                    setMessageColor('red'); //Set the color of the message
                    setMessage('Selected marks sheet is already assigned!'); //Set the message
                }else{
                    toast.error('Error with assigning marks sheet'); //Display the error message
                    setMessageColor('red'); //Set the color of the message
                    setMessage('Error with assigning marks sheet'); //Set the message
                }

             }catch(err){
                 toast.error(err.response.data.errorMessage); //Display the error message if an error occurs
             }





            

        }

        setAssignButtonClicked(true); //Set the assign button clicked status to true


    }



    useEffect(() => {
        setAssignButtonClicked(false); //Set the assign button clicked status to false
        setAvailableCourseList([""]); //Clear the course list that can be added to the result board
        getAvailableCourses();
        setAvailableExaminerList([""]); //Clear the course coordinator list
        getAvailableExaminers();    

    }, [assignButtenClicked])



    return (
        <div className='marksheet-assign-body container'>
            
            <div className='row justify-content-between'>



                <div className='col-4 div1'>        {/*Left div*/}


                    <div className="row justify-content-between">       {/* 1st row of left div*/}

                        <div className='col selection-box-col' >            {/*Scolumn for examiner selection*/}

                            <select className='examiner-select' value={selectedExaminer} onChange={handleExaminerSelection}>
                                <option value='0' disabled> Select an examiner</option>
                                {
                                    availableExaminerList.map((examiner, index) => (
                                        <option key={index} value={examiner.user_id}>{examiner.user_id} - {examiner.user_name}</option>
                                    ))
                                }
                            </select>

                        </div>

                        <div className='col selection-box-col' >        {/*Column for course selection*/}

                            <select className='marksheet-select' value={selectedCourse} onChange={handleCourseSelection}>
                                <option value='0' disabled> Select a marksheet</option>
                                {
                                    availableCourseList.map((course, index) => (
                                        <option key={index} value={course.course_id}>{course.course_id} - {course.course_name} - {index}</option>
                                    ))
                                }
                            </select>

                        </div>


                    </div>

                    <div className="row justify-content-between">

                        <div className='col button-col' >

                            <button className='btn btn-primary btn-sm assign-button' onClick={assignMarksheet}>Assign Markshet</button>
                            <label style={{color:messageColor}}> &nbsp;&nbsp;&nbsp;&nbsp; {message}</label>

                        </div>

                        


                    </div>


                </div>



                <div className='col-4 div2'>
                    Hello
                </div>



            </div>


            <ToastContainer />
        </div>
    )
}
