import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import './resultBoardMarksSheetAssign.css'
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import BackButton from '../../Components/AR/BackButton/BackButton';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { Redirect } from 'react-router-dom';
import { SpinerLoading } from '../../Utils/SpinerLoading';


export default function ResultBoardMarksSheetAssign() {

    const { authState } = useOktaAuth();



    const location = useLocation(); //Get the location details from the URL
    const history = useHistory(); //Get the history details from the URL

    


    const [availableCourseList, setAvailableCourseList] = useState([]); //State to store the course list that can be added to the result board
    const [availableExaminerList, setAvailableExaminerList] = useState([]); //State to store the available coordinators
    const [assignedMarksSheetList, setAssignedMarksSheetList] = useState([]); //State to store the assigned marks sheet list

    const [message, setMessage] = useState(''); //State to store the message to be displayed
    const [messageColor, setMessageColor] = useState(''); //State to store the color of the message

    const [startResultBoardDivMessage, setStartResultBoardDivMessage] = useState(); //State to store the message to be displayed in the start result board div
    const [startResultBoardDivMessageColor, setStartResultBoardDivMessageColor] = useState(''); //State to store the color of the message to be displayed in the start result board div

    const [selectedCourse, setSelectedCourse] = useState('0'); //State to store the selected course
    const [selectedExaminer, setSelectedExaminer] = useState('0'); //State to store the selected coordinator
    const [assignButtenClicked, setAssignButtonClicked] = useState(false); //State to store the status of the assign button [clicked or not clicked
    const [startResultBoardButtonAvailability, setStartResultBoardButtonAvailability] = useState(false); //State to store the availability of the start result board button [true or false
    const [startResultBoardButtonColor, setStartResultBoardButtonColor] = useState("gray"); //State to store the color of the start result board button [green or red



    // const selectedResultBoard = {                //Object to store the object that is passed with the URL to this page
    //     id: location.state.id,
    //     department: location.state.department,
    //     level: location.state.level,
    //     semester: location.state.semester,
    //     academic_year: location.state.academic_year,
    //     status: location.state.status,
    //     created_date_time: location.state.created_date_time,
    //     conducted_date_time: location.state.conducted_date_time
    // }    

    /* 
        Above object is replaces with following useState. If you need to revete this, Just un comment 
        above "selectedResultBoard" object and comment below useState
    */

    const [selectedResultBoard, setSelectedResultBoard] = useState({
        id: location.state.id,
        department: location.state.department,
        level: location.state.level,
        semester: location.state.semester,
        academic_year: location.state.academic_year,
        status: location.state.status,
        created_date_time: location.state.created_date_time,
        conducted_date_time: location.state.conducted_date_time
    }); //State to store the object that is passed with the URL to this page



    const assignmentObject = {                              //Object to store the details of the new assignment
        course_coordinator_id: selectedExaminer,
        course_id: selectedCourse,
        result_board_id: location.state.id,
        assigned_date_time:''

    }






    const handleExaminerSelection = (selectedExaminer) => {       //Function to handle the coordinator selection

        getSelectedExaminerAssignedMarkSheetDetails(selectedExaminer.target.value); //Get the assigned marksheet details for the selected coordinator
        
        setSelectedExaminer(selectedExaminer.target.value); //Set the selected coordinator
        setMessage(''); //Clear the message
        setMessageColor(''); //Clear the message color
    }





    const handleCourseSelection = (selectedCourse) => {       //Function to handle the course selection 
        setSelectedCourse(selectedCourse.target.value); //Set the selected course
        setMessage(''); //Clear the message
        setMessageColor(''); //Clear the message color

    }


    const getSelectedResultBoard = async () => {     //Get the result board details from the database
        try{
            const resultBoard = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getResultBoardDetailsByID/${selectedResultBoard.id}`); //Get the result board details from the database
            setSelectedResultBoard(resultBoard.data); //Set the result board details
        }catch(err){
            toast.error(err.response.data.errorMessage,{autoClose:3000}); //Display the error message if an error occurs
        }
    }



    const getAvailableCourses = async () => {     //Get the result board details from the database

        try {
            const courseList = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getCourseListRemainingToAddToResultBoard/${selectedResultBoard.level}/${selectedResultBoard.semester}/${selectedResultBoard.department}/${selectedResultBoard.id}`); //Get the course list that can be added to the result board from the database
            setAvailableCourseList(courseList.data); //Set the course list that can be added to the result board

            if(courseList.data.length>0){
                setStartResultBoardDivMessageColor('red')
                setStartResultBoardDivMessage('You can not continue to the result board until all the marks sheets are assigned to the examiners!'); //Set the message to be displayed in the start result board div

                setStartResultBoardButtonAvailability(false); //Set the availability of the start result board button to false
                setStartResultBoardButtonColor('gray'); //Set the color of the start result board button to red
            }else{
                setStartResultBoardDivMessageColor('green')
                setStartResultBoardDivMessage('All marks sheets are assigned to the examiners. Now you can continue to the result board'); //Set the message to be displayed in the start result board div

                setStartResultBoardButtonAvailability(true); //Set the availability of the start result board button to true
                setStartResultBoardButtonColor(); //reset the color of the start result board button
            }
        } catch (err) {
            toast.error(err.response.data.errorMessage,{autoClose:3000}); //Display the error message if an error occurs
        }


    }



    const getAvailableExaminers = async () => {     //Get the result board details from the database


        try {
            const examinerList = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getAllCourseCoordinatorsBySelectedAcademicYearDepartmentLevelSemester/${selectedResultBoard.academic_year}/${selectedResultBoard.department}/${selectedResultBoard.level}/${selectedResultBoard.semester}`); //Get the course coordinator list from the database
            setAvailableExaminerList(examinerList.data); //Set the course coordinator list
        } catch (err) {
            toast.error(err.response.data.errorMessage,{autoClose:3000}); //Display the error message if an error occurs
        }

    }




    const getAssignMarkSheetDetails = async ()=>{         //Function to get assigned marksheet details 
        try{
            const list = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getAssignedMarksSheetsByResultBoardID/${selectedResultBoard.id}`); //Get the assigned marksheet details from the database
            setAssignedMarksSheetList(list.data); //Set the assigned marksheet details
        }catch(err){
            toast.error(err.response.data.errorMessage,{autoClose:3000}); //Display the error message if an error occurs
        }
    }

    const getSelectedExaminerAssignedMarkSheetDetails = async (examinerID) => {     //Get the result board details from the database

        try{
            const list = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getAssignedMarksSheetsByExaminerIdAndResultBoardID/${selectedResultBoard.id}/${examinerID}`); //Get the assigned marksheet details from the database
            setAssignedMarksSheetList(list.data); //Set the assigned marksheet details

        }catch(err){
            toast.error("Failed to load assigned marks sheets for selected examiner",{autoClose:3000}); //Display the error message if an error occurs
        }

    }




    const assignMarksSheet = async () => {     //Get the result board details from the database

        if (selectedCourse==0 || selectedExaminer==0) { //Check if the course and the coordinator is selected
            
            toast.error('Both examiner and marks sheet should be selected',{autoClose:3000}); //Display the error message
            setMessageColor('red'); //Set the color of the message
            setMessage('Both examiner and marks sheet should be selected'); //Set the message

        }else{

            //Api to assign the marksheet to the selected examiner
             

            const currentDateAndTime = new Date();  //Get the current date and time
            const formattedDateTime = String(currentDateAndTime.getFullYear() + '-' + currentDateAndTime.getMonth() + '-' + currentDateAndTime.getDate() +' ' +  currentDateAndTime.getHours()+ ':'+ currentDateAndTime.getMinutes() +':' + currentDateAndTime.getSeconds()); //Format the date and time
            assignmentObject.assigned_date_time = formattedDateTime; //Set the formatted date and time to the assignment object

            try{
                 const saveResult = await axios.post('http://localhost:9090/api/AssistantRegistrar/saveResultBoardMember', assignmentObject);
                if(saveResult.data===true){
                    toast.success('Marksheet assigned successfully',{autoClose:3000}); //Display the success message
                    setMessageColor('green'); //Set the color of the message
                    setMessage('Marks sheet assigned successfully'); //Set the message
                    setSelectedCourse('0'); //Clear the selected course
                    setSelectedExaminer('0'); //Clear the selected coordinator

                }else if(saveResult.data===false){
                    toast.error('Selected marks sheet is already assigned!',{autoClose:3000}); //Display the error message
                    setMessageColor('red'); //Set the color of the message
                    setMessage('Selected marks sheet is already assigned!'); //Set the message
                }else{
                    toast.error('Error with assigning marks sheet',{autoClose:3000}); //Display the error message
                    setMessageColor('red'); //Set the color of the message
                    setMessage('Error with assigning marks sheet'); //Set the message
                }

             }catch(err){
                 toast.error(err.response.data.errorMessage,{autoClose:3000}); //Display the error message if an error occurs
             }



        }

        setAssignButtonClicked(true); //Set the assign button clicked status to true


    }



    const removeAssignedMarksSheet = async (id) => {     //Function to remove the assigned marksheet
        try{
            const isDeleted = await axios.delete(`http://localhost:9090/api/AssistantRegistrar/deleteResultBoardMemberById/${id}`); //Delete the assigned marksheet from the database
            if(isDeleted.data===true){
                toast.success('Removed successfully',{autoClose:3000}); //Display the success message
            }else{
                toast.error('This mark sheet  is already removed!',{autoClose:3000}); //Display the error message
            }
        }catch(err){
            toast.error("Error with removing mark sheet assignment",{autoClose:3000}); //Display the error message if an error occurs
        }
        setSelectedExaminer('0'); //Clear the selected coordinator
        setSelectedCourse('0'); //Clear the selected course
        setAssignButtonClicked(true); //Set the assign button clicked status to true
    }





    const viewResultBoard = async () => {     //Function to view the result board
        
        if(selectedResultBoard.status.toLowerCase() === "Not started".toLowerCase()){ //Check if the result board is not started

            const currentDateAndTime = new Date();  //Get the current date and time
            const formattedDateTime = String(currentDateAndTime.getFullYear() + '-' + currentDateAndTime.getMonth() + '-' + currentDateAndTime.getDate() +' ' +  currentDateAndTime.getHours()+ ':'+ currentDateAndTime.getMinutes() +':' + currentDateAndTime.getSeconds()); //Format the date and time
        
            selectedResultBoard.status = "Started"; //Set the status of the result board to started
            selectedResultBoard.conducted_date_time = formattedDateTime; //Set the conducted date and time

            try{
                await axios.post('http://localhost:9090/api/AssistantRegistrar/saveResultBoard', selectedResultBoard); //Update the result board details in the database
                //API call to just view result board
                history.push({pathname:'/arJoinResultsBoard',state:selectedResultBoard})
            }catch(err){
                toast.error("There is a error with starting the result board",{autoClose:3000}); //Display the error message if an error occurs
            }

        }else if(selectedResultBoard.status.toLowerCase() === "Started".toLowerCase()){ //Check if the result board is started

                //Api call to just view result board
                history.push({pathname:'/arJoinResultsBoard',state:selectedResultBoard})


        }else{
            toast.error('Result board is Ended!',{autoClose:3000}); //Display the error message
        }

        setAssignButtonClicked(true); //Set the assign button clicked status to true
    }




    const endReultBoard = async () => {     //Function to end the result board
        if(selectedResultBoard.status.toLowerCase() === "Started".toLowerCase()){ //Check if the result board is started
            selectedResultBoard.status = "Ended"; //Set the status of the result board to ended

            try{
                await axios.post('http://localhost:9090/api/AssistantRegistrar/saveResultBoard', selectedResultBoard); //Update the result board details in the database
                toast.success('Result board ended successfully!',{autoClose:3000}); //Display the success message
                setStartResultBoardDivMessageColor('green')
                setStartResultBoardDivMessage('Result board ended successfully!');

                try{
                    const approvedLevelUpdate = await axios.put(`http://localhost:9090/api/AssistantRegistrar/updateApprovedLevelAfterResultBoard`,selectedResultBoard); //Update the approved level in the database
                    
                }catch(err){
                    toast.error("Error with updating approved level",{autoClose:3000}); //Display the error message if an error occurs
                }

            }catch(err){
                toast.error("There is a error with ending the result board",{autoClose:3000}); //Display the error message if an error occurs
                setStartResultBoardDivMessageColor('red')
                setStartResultBoardDivMessage('Error with ending the result board!');
            }

            

            //Call Api to update approved level



        }else{
            toast.error('Result board is not started!',{autoClose:3000}); //Display the error message

        }

        setAssignButtonClicked(true); //Set the assign button clicked status to true
    }





    const deleteResultBoard = async () => {     //Function to delete the result board

        try{
            
            await axios.delete(`http://localhost:9090/api/AssistantRegistrar/deleteAssignedMarksSheetsByResultBoardID/${selectedResultBoard.id}`) //Delete the assigned marksheet details from the database
            
            const deletedResultBoardCount = await axios.delete(`http://localhost:9090/api/AssistantRegistrar/deleteNotStartedResultBoard/${selectedResultBoard.id}`)

            if(deletedResultBoardCount.data>0){

                toast.success('Result board deleted successfully!',{autoClose:2000}); //Display the success message
                
                setTimeout(() => {      //wait for 3 seconds
                    history.goBack(); //Go back to the previous page
                }, 1000);
                
            
            }

            //setAssignButtonClicked(true); //Set the assign button clicked status to true

            
        }catch(err){
            toast.error(err.response.data.errorMessage,{autoClose:3000}); //Display the error message if an error occurs
        }
    }



    




    useEffect(() => {

        setAssignButtonClicked(false); //Set the assign button clicked status to false

        getSelectedResultBoard(); //Get the selected result board details

        setAvailableCourseList([]); //Clear the course list that can be added to the result board
        getAvailableCourses();

        setAvailableExaminerList([]); //Clear the course coordinator list
        getAvailableExaminers();

        setAssignedMarksSheetList([]); //Clear the assigned marksheet list
        getAssignMarkSheetDetails();

        

    }, [assignButtenClicked])






    if(!authState){
        return <SpinerLoading/>;
      }
      if(authState.accessToken?.claims.userType !== "ar"){
        return <Redirect to="/home" />;
      }



    return (
        <div className='marksheet-assign-body container'>
            
            <div className='row justify-content-between'>


                <div className='col-4 main-left-column'>
                    
                    <div className='row justify-content-between'>                                       {/*Assign Marks Sheet Section*/}

                        <div className='col-4 div1'>

                            <div className="row-4 justify-content-between assign-mark-sheet-title-div">   {/*Row for title*/}
                                <label className='assign-mark-sheet-title-lable' >Assign Marks Sheets</label>
                            </div>


                            <div className="row justify-content-between">      {/*Row for examiner and course selection*/}

                                <div className='col selection-box-col' >            {/*Scolumn for examiner selection*/}

                                    <select className='examiner-select' value={selectedExaminer} onChange={handleExaminerSelection}>
                                        <option value='0' disabled> Select an examiner</option>
                                        {
                                            availableExaminerList.map((examiner, index) => (
                                                <option key={index} value={examiner.user_id}>{examiner.user_id} - {examiner.name_with_initials}</option>
                                            ))
                                        }
                                    </select>

                                </div>

                                <div className='col selection-box-col' >        {/*Column for course selection*/}

                                    <select className='marksheet-select' value={selectedCourse} onChange={handleCourseSelection}>
                                        <option value='0' disabled> Select a marksheet</option>
                                        {
                                            availableCourseList.map((course, index) => (
                                                <option key={index} value={course.course_id}>{course.course_id} - {course.course_name}</option>
                                            ))
                                        }
                                    </select>

                                </div>


                            </div>

                            <div className="row justify-content-between">

                                <div className='col button-col' >

                                    <button className='btn btn-primary btn-sm assign-button' onClick={assignMarksSheet} disabled={startResultBoardButtonAvailability}>Assign Markshet</button>
                                    <label style={{color:messageColor}}> &nbsp;&nbsp;&nbsp;&nbsp; {message}</label>

                                </div>

                                


                            </div>


                        </div>
                    </div>


                    <div className='row justify-content-between'>                                                   {/*Start Result Board Section*/}

                        <div className='col-4 div1' style={{height:"210px",paddingTop:"20px"}}>

                            {
                                selectedResultBoard.status.toLowerCase() === "Ended".toLowerCase()? (
                                    <div className='row justify-content-between' >
                                        <label style={{color:"red"}}>This result board is ended. You can not view it</label>
                                    </div>
                                ):(
                                    <div className='row justify-content-between' >
                                        <label style={{color:startResultBoardDivMessageColor}}>{startResultBoardDivMessage}</label>
                                    </div>
                                )
                            }


                            <div className='row-4 justify-content-between' style={{paddingTop:"30px"}}>
                                {                                       //  Turnary operator to decide display the start result board button or join result board button 
                                    selectedResultBoard.status.toLowerCase() === "Not started".toLowerCase()? (
                                        <>
                                            <button className='btn btn-success btn-sm start-result-board-button' style={{backgroundColor:startResultBoardButtonColor,borderColor:startResultBoardButtonColor}} disabled={!startResultBoardButtonAvailability} onClick={viewResultBoard}>Start Result Board</button>
                                            &nbsp;&nbsp;&nbsp;&nbsp;<button className='btn btn-danger btn-sm end-result-board-button' onClick={deleteResultBoard}>Delete Result Board</button>
                                        </>

                                    ): selectedResultBoard.status.toLowerCase() === "Started".toLowerCase()? (

                                        <button className='btn btn-success btn-sm start-result-board-button' style={{backgroundColor:startResultBoardButtonColor,borderColor:startResultBoardButtonColor}} disabled={!startResultBoardButtonAvailability} onClick={viewResultBoard}>Join Result Board</button>

                                    ) : (

                                        null        //If the result board is ended, do not display any button

                                    )
                                }

                                

                                {                    //  Turnary operator to decide display the end result board button or hide it
                                    selectedResultBoard.status.toLowerCase() === "Started".toLowerCase()? (

                                        <>
                                            &nbsp;&nbsp;&nbsp;&nbsp;<button className='btn btn-danger btn-sm end-result-board-button' onClick={endReultBoard}>End Result Board</button>
                                        </>
                                    ) : (

                                        null

                                    )
                                }
                                
                                &nbsp;&nbsp;&nbsp;&nbsp;<BackButton/>           {/*Back Button*/}
                            </div>



                        </div>
                    </div>
                </div>

                                        

                <div className='col-4 div2'>            {/* Assigned Marks  Sheets Section */}
                    

                    <div className='row justify-content-between'>
                        <div className='col-4 assigned-marks-sheet-list-div'>
                            <table className='table assigned-marks-sheet-table'>
                                <thead className='assigned-marks-sheet-table-head'>
                                    <tr >
                                        <td colSpan='3' style={{textAlign:"center",backgroundColor:"rgb(44, 120, 235)",color:"white",borderRadius:"0px 0px 15px 15px"}}>Assigned Marks Sheets</td>
                                    </tr>
                                    <tr>
                                        <th>Examiner</th>
                                        <th>Mark sheet </th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        assignedMarksSheetList.map((markSheet, index) => (
                                            <tr key={index}>
                                                <td>{markSheet[2]}</td>
                                                <td>{markSheet[5]}</td>
                                                {
                                                    selectedResultBoard.status.toLowerCase() === "Not started".toLowerCase()? (
                                                        <td> <button className='btn btn-danger btn-sm' onClick={()=>{removeAssignedMarksSheet(markSheet[0])}}>Remove</button></td>
                                                    ):(
                                                        null
                                                    )
                                                }
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>



            </div>


            <ToastContainer />
        </div>
    )
}
