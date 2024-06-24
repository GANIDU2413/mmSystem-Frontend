import React, { useEffect } from 'react'
import { useState } from 'react'
import './createResultBoard.css'
import axios from 'axios';
import { useOktaAuth } from '@okta/okta-react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function CreateResultBoard() {

    const {oktaAuth , authState} = useOktaAuth();


    const [department, setDepartment] =useState(0);            //store selected department
    const [level, setLevel] = useState(0);                    //store selected level
    const [semester, setSemester] =useState(0);               //store selected semester
    const [academicYear, setAcademicYear] = useState(0);       //store selected academic year
    const [createdResultBoardList, setCreatedResultBoardList] = useState([]);    //store created result board list

    const [academicYearList, setAcademicYearList] = useState([]);              //store all academic year list

    const [resultBoardAvailability, setResultBoardAvailability] = useState(false);    //store the result board availability status
    const [buttonAvailability, setButtonAvailability] = useState(false);    //store the button availability status
    const [errorMessage, setErrorMessage] = useState('');    //store the error message

    


    const handleDepartment = async (department) => {              // handle the department selection
        setDepartment(department.target.value);         // set the selected department
        checkResultBoardAvailability(department.target.value,level,semester,academicYear);

        
        
    }

    const handleLevel = async (level) => {                        // handle the level selection
        setLevel(level.target.value);                   // set the selected level
        checkResultBoardAvailability(department,level.target.value,semester,academicYear);

        
    }

    const handleSemester = async (semester) => {                  // handle the semester selection
        setSemester(semester.target.value);             // set the selected semester
        checkResultBoardAvailability(department,level,semester.target.value,academicYear);

        
    }

    const handleAcademicYear = async (academicYear) => {          // handle the academic year selection
        setAcademicYear(academicYear.target.value);        // set the selected academic year
        checkResultBoardAvailability(department,level,semester,academicYear.target.value);
        
    }


    const loadAcademicYear = async () => {                  // load the current academic year
        const academicYearDetails =await axios.get(`http://localhost:9090/api/AssistantRegistrar/getAcademicYearDetails`);      // get the academic year details
        setAcademicYearList([]);
        setAcademicYearList(academicYearList=>[...academicYearList,academicYearDetails.data[0].previous_academic_year]);          // set the academic year details
        setAcademicYearList(academicYearList=>[...academicYearList,academicYearDetails.data[0].current_academic_year]);        // set the academic year details
    }   


    const checkResultBoardAvailability = async (selectedDepartment,selectedLevel,selectedSemester,selectedAcademicYear) =>{

        if(selectedDepartment == 0 || selectedLevel == 0 || selectedSemester == 0 || selectedAcademicYear == 0){
            setButtonAvailability(false);
            setErrorMessage("Select all the fields to create the result board");

        }
        else if (selectedDepartment !== 0 && selectedLevel !== 0 && selectedSemester !== 0 && selectedAcademicYear !== 0){
            

            try{
                const result = await axios.get(`http://localhost:9090/api/AssistantRegistrar/isResultBoardAvailable/${selectedDepartment}/${selectedLevel}/${selectedSemester}/${selectedAcademicYear}`)    //Call api to check the result board availability
                setResultBoardAvailability(result.data);    //set the result board availability status
                if(result.data){
                    toast.error("Selected Result Board is already created ",{autoClose:2000});   //Display error message if result board is already created
                    setErrorMessage("Selected Result Board is already created!");
                    setButtonAvailability(false);
                }
                else{
                    setErrorMessage("");
                    setButtonAvailability(true);
                }

            }catch(e){
                toast.error("Error in checking the result board availability",{autoClose:2000});   //Display error message if there is an error in checking the result board availability
                setErrorMessage("Error in checking the result board availability");
            }


            
        }
    }

    const loadCreatedResultBoardList = async () => {    //Load the created result board list
        try{
            const result = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getCreatedResultBoardList`);    //Call api to get the created result board list
            setCreatedResultBoardList(result.data);    //Set the created result board list
        }
        catch(e){
            toast.error("Error in loading the created result board list",{autoClose:2000});    //Display error message if there is an error in loading the created result board list
        }
    }






    useEffect(()=>{
        setAcademicYearList([]);
        loadAcademicYear();
        loadCreatedResultBoardList();
        
    },[authState,department,level,semester])

  return (
    <div className='div-body container'>

        <div className='row justify-content-between'>

            <div className='col-4 sub-div1'>

                <div className="row justify-content-between">
                    <div className="col">
                        <select className='selection' value={department} onChange={handleDepartment}>               {/* selection for department */}
                            <option value='0' disabled>Select department</option>
                            <option value='ICT'>ICT</option>
                            <option value='ET'>ET</option>
                            <option value='BST'>BST</option>
                        </select>
                    </div>
                    <div className="col">
                        <select className='selection' value={level} onChange={handleLevel}>                         {/* selection for level */}
                            <option value='0' disabled>Select level</option>
                            <option value='1'>Level 1</option>
                            <option value='2'>Level 2</option>
                            <option value='3'>Level 3</option>
                            <option value='4'>Level 4</option>
                        </select>
                    </div>
                    <div className="col">
                        <select className='selection' value={semester} onChange={handleSemester}>                   {/* selection for semester */}
                            <option value='0' disabled>Select Semester</option>
                            <option value='1'>Semester 1</option>
                            <option value='2'>Semester 2</option>
                        </select>
                    </div>
                    <div className="col">
                        <select className='selection' value={academicYear} onChange={handleAcademicYear}>                   {/* selection for semester */}
                            <option value='0' disabled>Academic Year</option>
                            {
                                academicYearList.map((element,index)=>(
                                    <option key={index} value={element}>{element}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col">
                        <button className='btn btn-primary' style={{width:"Auto",height:"Auto",marginTop:"10px"}} disabled={!buttonAvailability}>Create Result Board</button>
                        <ToastContainer/>
                    </div>
            
            
                </div>
                <div className='row justify-content-between'>
                    <div className="col">
                        
                        <label style={{color:"red",marginTop:"10px",minWidth:"100%"}}>{errorMessage}</label>

                    </div>
                    
                </div>
                <hr style={{height:"3px", background:"blue"}}></hr>

                <div style={{marginLeft:"auto",marginRight:"auto",alignContent:'center'}}>
                    <table className="table table-striped">
                        <thead className='tableHead'>
                            <tr>
                                <th colSpan={100} style={{textAlign:"center",backgroundColor:'#ebe8e8',textAlignLast:"center"}}>
                                    Existing Result Boards <br/>
                                </th>
                            </tr>
                            <tr>              
                            <th scope="col">Academic Year</th>
                            <th scope="col">Semester</th>
                            <th scope="col">Level</th>
                            <th scope="col">Department</th>
                            <th scope="col">State</th>
                            </tr>          
                        </thead>
                        <tbody>
                            {createdResultBoardList.map((element) => (
                                <tr className="clickable-row" key={element.id}>
                                    <td>{element.academic_year}</td>
                                    <td>{element.semester}</td>
                                    <td>{element.level}</td>
                                    <td>{element.department}</td>
                                    <td>{element.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
        

        
    </div>
  )
}
