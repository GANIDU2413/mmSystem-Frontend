import React, { useState } from 'react';
import { useEffect } from 'react';
import { NavebarDean } from './NavebarDean';
import { fetchAcademicYear,loadAcademicYearFromLocal,saveAcademicYearToLocal } from '../../AcademicYearManagerSingleton';

export default function DeanDashBoard() {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [academicDetails, setAcademicDetails] = useState(loadAcademicYearFromLocal);
  const[academicYear,setAcademicYear]=useState("")
  const[current_semester,setCurrent_semester]=useState("")
  const levels =[1,2,3,4]
  const handleRadioChange = (event) => {
    // Update the state with the value of the selected radio button
    setSelectedDepartment(event.target.value);
  };

  useEffect(() => {
    const fetchAndSaveYear = async () => {
        const details = await fetchAcademicYear();
        if (details) {
            saveAcademicYearToLocal(details);
            setAcademicDetails(details);
        }
    };

    fetchAndSaveYear();
}, []);

useEffect(() => {
    if (academicDetails) { // Check if academicDetails is not null or undefined
        setAcademicYear(academicDetails.current_academic_year);
        setCurrent_semester(academicDetails.current_semester);
    }
}, [academicDetails]); // Depend on academicDetails to trigger this effect



  return (
<>
      <NavebarDean />
      <div className="container" style={{marginTop:"70px"}}>
        <h1 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '20px', color: '#333' }}>Approvel of Marks</h1>
        {/* <h3 className=' bg-transparent'>Approvel of Marks</h3> */}
      
        <div class="btn-group btn-sm m-0" role="group" aria-label="Basic radio toggle button group">
          <input type="radio" class="btn-check" name="btnradio" id="btnradio1" value="ICT" onChange={handleRadioChange} autocomplete="off"/> 
          <label class="btn btn-outline-primary" for="btnradio1">ICT</label>

          <input type="radio" class="btn-check" name="btnradio" id="btnradio2" value="ET" onChange={handleRadioChange} autocomplete="off"/>
          <label class="btn btn-outline-primary" for="btnradio2">ET</label>

          <input type="radio" class="btn-check" name="btnradio" id="btnradio3" value="BST" onChange={handleRadioChange} autocomplete="off"/>
          <label class="btn btn-outline-primary" for="btnradio3">BST</label>

          <input type="radio" class="btn-check" name="btnradio" id="btnradio4" value="MDS" onChange={handleRadioChange} autocomplete="off"/>
          <label class="btn btn-outline-primary" for="btnradio4">MDS</label>
        </div>
        <br />
       

        <br />
        <br />


        <div className='row g-5'>

              <div className="card shadow m-4" style={{width: "18rem"}}>
                <div className="card-body ">
                  <h5 className="card-title py-2">Level 1</h5>
                  <p className="card-text">Semester {current_semester}</p>
                  <a href={`/deanFinalMarkSheet/1/${current_semester}/${selectedDepartment}`}  className="btn btn-primary btn-sm mt-2">View</a>
                </div>
              </div>

            

              <div className="card shadow m-4" style={{width: "18rem"}}>
                <div className="card-body ">
                  <h5 className="card-title py-2">Level 2</h5>
                  <p className="card-text">Semester {current_semester}</p>
                  <a href={`/deanFinalMarkSheet/2/${current_semester}/${selectedDepartment}`}  className="btn btn-primary btn-sm mt-2">View</a>
                </div>
              </div>

            

            </div>
            <div className='row g-5 mt-2'>

              <div className="card shadow m-4" style={{width: "18rem"}}>
                <div className="card-body ">
                  <h5 className="card-title py-2">Level 3</h5>
                  <p className="card-text">Semester {current_semester}</p>
                  <a href={`/deanFinalMarkSheet/3/${current_semester}/${selectedDepartment}`}  className="btn btn-primary btn-sm mt-2">View</a>
                </div>
              </div>

              <div className="card shadow m-4" style={{width: "18rem"}}>
                <div className="card-body ">
                  <h5 className="card-title py-2">Level 4</h5>
                  <p className="card-text">Semester {current_semester}</p>
                  <a href={`/deanFinalMarkSheet/4/${current_semester}/${selectedDepartment}`}  className="btn btn-primary btn-sm mt-2">View</a>
                </div>
              </div>



            </div>
      </div>
    </>
  
  )
}
