import React, { useEffect } from 'react'
import { useState } from 'react'
import './createResultBoard.css'
import axios from 'axios';
import { useOktaAuth } from '@okta/okta-react';

export default function CreateResultBoard() {

    const {oktaAuth , authState} = useOktaAuth();


    const [department, setDepartment] =useState('');            //store selected department
    const [level, setLevel] = useState('0');                    //store selected level
    const [semester, setSemester] =useState('0');               //store selected semester
    const [hod, setHod] = useState('');                         //store selected HOD
    const [courseCoordinator, setCourseCoordinator] = useState('');     //store selected course coordinator

    const [HODList, setHODList] = useState(['0']);                      //store all HOD list
    const [courseCoordinatorsList, setCourseCoordinatorsList] = useState(['0']);    //store all course coordinators list
    const [academicYear, setAcademicYear] = useState('0');                          //store the current academic year
    


    const handleDepartment = async (department) => {              // handle the department selection
        setDepartment(department.target.value);         // set the selected department
        
        loadCourseCoordinators(department.target.value,level,semester);         // load the course coordinators
    }

    const handleLevel = async (level) => {                        // handle the level selection
        setLevel(level.target.value);                   // set the selected level

        loadCourseCoordinators(department,level.target.value,semester);         // load the course coordinators
    }

    const handleSemester = async (semester) => {                  // handle the semester selection
        setSemester(semester.target.value);             // set the selected semester

        loadCourseCoordinators(department,level,semester.target.value);         // load the course coordinators
    }

    const handleHod = (hod)=>{                              // handle the HOD selection
        setHod(hod.target.value);                       // set the selected HOD
    }

    const handleCourseCoordinator = (coordinator,key) => {        // handle the course coordinator selection
        setCourseCoordinator(coordinator.target.value);  // set the selected course coordinator
        
    }

    const loadCourseCoordinators = async (department,level,semester) => {                 // load the course coordinators
        const coordinators= await axios.get(`http://localhost:9090/api/AssistantRegistrar/getAllCourseCoordinatorsBySelectedAcademicYearDepartmentLevelSemester/${academicYear}/${department}/${level}/${semester}`);       // get all course coordinators by selected academic year, department, level and semester
        console.log(coordinators.data);
        setCourseCoordinatorsList(coordinators.data);       // set the course coordinators list
    }

    const loadCourses= async (department,level,semester)=>{
        const coursesList = await axios.get(`http://localhost:9090/api/AssistantRegistrar/GetAllCoursesBySelectedDepartmentLevelSemester/${department}/${level}/${semester}`);
        /*
        Call the api GetAllCoursesBySelectedDepartmentLevelSemester to get the courses by selected department, level and semester but need to modify tht to get only not used courses in resultboard table
        */
    }


    const loadAcademicYear = async () => {                  // load the current academic year
        const academicYearDetails =await axios.get(`http://localhost:9090/api/AssistantRegistrar/getAcademicYearDetails`);      // get the academic year details
        setAcademicYear(academicYearDetails.data[0].current_academic_year);                 // set the current academic year
    }

    const loadHODDetails = async () => {                     // load the HOD details
         const hodDetails= await axios.get(`http://localhost:9090/api/AssistantRegistrar/findAllUserDetailsBySelectedRole/${"HOD"}`);           // get all HOD details
         setHODList(hodDetails.data);                       // set the HOD list
    }





    useEffect(()=>{
        loadAcademicYear();
        loadHODDetails();
    },[authState,department,level,semester,hod])

  return (
    <div className='div-body container'>
        <div className='row justify-content-between'>



            <div className='col-4 sub-div1'>
                <div className="row justify-content-between">
                    <div className="col">
                        <select className='selection' value={department} onChange={handleDepartment}>               {/* selection for department */}
                            <option value='' disabled>Select department</option>
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
                        <select className='selection' style={{textAlign:'left'}} value={hod} onChange={handleHod}>   {/* selection for HOD */}
                            <option value='' disabled>Select HOD</option>
                            {
                                HODList.map((hod,index)=>(
                                    <option key={index} value={hod.user_name}>{hod.name_with_initials} - {hod.user_name}</option>
                                
                                ))
                            }
                        </select>
                    </div>
                    <div className='col'>
                        <select className='selection' style={{textAlign:'left'}} value={courseCoordinator} onChange={(event)=>{handleCourseCoordinator(event,event.target.selectedIndex-1)}}>           {/* selection for course coordinator */}
                            <option value='' disabled>Select Course Coordinator</option>
                            {
                                courseCoordinatorsList.map((coordinator,index)=>(
                                    <option key={index} value={coordinator.user_name}>{coordinator.name_with_initials} - {coordinator.user_name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='col'>
                        <select className='selection' style={{textAlign:'left'}} value={''}>
                            <option value='' disabled>Select Course</option>
                        
                        </select>
                    </div>
                </div>
                <div className='row justify-content-between'>
                    
                    
                </div>
                
            </div>




            <div className='col-4 sub-div2'>
                <div className="row justify-content-between">
                    <div className="col-4">
                        <label className='label-key'>Academic Year : </label>
                    </div>
                    <div className="col">
                        <label className='label-value'>{academicYear}</label>
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
                        <label className='label-value'>{hod}</label>
                    </div>
                </div>
            </div>



        </div>
    </div>
  )
}
