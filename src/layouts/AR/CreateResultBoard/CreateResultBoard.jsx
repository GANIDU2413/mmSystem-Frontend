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

    const [academicYearList, setAcademicYearList] = useState([]);              //store all academic year list

    const [resultBoardAvailability, setResultBoardAvailability] = useState(false);    //store the result board availability status
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

        if(selectedDepartment !== 0 && selectedLevel !== 0 && selectedSemester !== 0 && selectedAcademicYear !== 0){

        }
        else if (selectedDepartment !== 0 && selectedLevel !== 0 && selectedSemester !== 0 && selectedAcademicYear !== 0){
            

            try{
                const result = await axios.get(`http://localhost:9090/api/AssistantRegistrar/isResultBoardAvailable/${selectedDepartment}/${selectedLevel}/${selectedSemester}/${selectedAcademicYear}`)    //Call api to check the result board availability
                setResultBoardAvailability(result.data);    //set the result board availability status
                if(result.data){
                    toast.error("Selected Result Board is already created ",{autoClose:2000});   //Display error message if result board is already created
                    setErrorMessage("Selected Result Board is already created!");
                }
                else{
                    setErrorMessage("");
                }

            }catch(e){
                toast.error("Error in checking the result board availability",{autoClose:2000});   //Display error message if there is an error in checking the result board availability
                setErrorMessage("Error in checking the result board availability");
            }


            
        }
    }






    useEffect(()=>{
        setAcademicYearList([]);
        loadAcademicYear();
        
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
                    
                    
                </div>
                <div className='row justify-content-between'>
                    <div className="col">
                        <button className='btn btn-primary' style={{width:"Auto",height:"Auto",marginTop:"10px"}} disabled={resultBoardAvailability}>Create Result Board</button>
                        <ToastContainer/>
                        <label style={{color:"red",marginTop:"10px",minWidth:"100%"}}>{errorMessage}</label>

                    </div>
                    
                </div>
                
            </div>




            <div className='col-4 sub-div2'>
                <div className="row justify-content-between">
                    <div className="col-4">
                        <label className='label-key'>Academic Year : </label>
                    </div>
                    <div className="col">
                        <label className='label-value'>{}</label>
                    </div>
                </div>

                <div className="row justify-content-between">
                    <div className="col-4">
                        <label className='label-key'>Department : </label>
                    </div>
                    <div className="col">
                        <label className='label-value'>{department}</label>
                    </div>
                </div>

                <div className="row justify-content-between">
                    <div className="col-4">
                        <label className='label-key'>HOD : </label>
                    </div>
                    <div className="col">
                        <label className='label-value'>{}</label>
                    </div>
                </div>
            </div>



        </div>
    </div>
  )
}
