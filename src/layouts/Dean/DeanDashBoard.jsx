import React, { useState } from 'react';
import { NavebarDean } from './NavebarDean'

export default function DeanDashBoard() {
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const handleRadioChange = (event) => {
    // Update the state with the value of the selected radio button
    setSelectedDepartment(event.target.value);
  };


  return (
    <>
      <NavebarDean />
      <div className="container" style={{marginTop:"70px"}}>
        <h1>Approvel of Marks</h1>
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
        <h5 className=' mt-4'>Select Level and Semester</h5>

        <br />
        <br />


        <div className='row g-5'>

              <div className="card shadow m-4" style={{width: "18rem"}}>
                <div className="card-body ">
                  <h5 className="card-title py-2">Level 1</h5>
                  <p className="card-text">Semester 1</p>
                  <a href={`/deanFinalMarkSheet/1/1/${selectedDepartment}`}  className="btn btn-primary btn-sm mt-2">View</a>
                </div>
              </div>

              <div className="card shadow m-4" style={{width: "18rem"}}>
                <div className="card-body ">
                  <h5 className="card-title py-2">Level 1</h5>
                  <p className="card-text">Semester 2</p>
                  <a href={`/deanFinalMarkSheet/1/2/${selectedDepartment}`}  className="btn btn-primary btn-sm mt-2">View</a>
                </div>
              </div>

              <div className="card shadow m-4" style={{width: "18rem"}}>
                <div className="card-body ">
                  <h5 className="card-title py-2">Level 2</h5>
                  <p className="card-text">Semester 1</p>
                  <a href={`/deanFinalMarkSheet/2/1/${selectedDepartment}`}  className="btn btn-primary btn-sm mt-2">View</a>
                </div>
              </div>

              <div className="card shadow m-4" style={{width: "18rem"}}>
                <div className="card-body ">
                  <h5 className="card-title py-2">Level 2</h5>
                  <p className="card-text">Semester 2</p>
                  <a href={`/deanFinalMarkSheet/2/2/${selectedDepartment}`}  className="btn btn-primary btn-sm mt-2">View</a>
                </div>
              </div>

            </div>
            <div className='row g-5 mt-2'>

              <div className="card shadow m-4" style={{width: "18rem"}}>
                <div className="card-body ">
                  <h5 className="card-title py-2">Level 3</h5>
                  <p className="card-text">Semester 1</p>
                  <a href={`/deanFinalMarkSheet/3/1/${selectedDepartment}`}  className="btn btn-primary btn-sm mt-2">View</a>
                </div>
              </div>

              <div className="card shadow m-4" style={{width: "18rem"}}>
                <div className="card-body ">
                  <h5 className="card-title py-2">Level 3</h5>
                  <p className="card-text">Semester 2</p>
                  <a href={`/deanFinalMarkSheet/3/2/${selectedDepartment}`}  className="btn btn-primary btn-sm mt-2">View</a>
                </div>
              </div>

              <div className="card shadow m-4" style={{width: "18rem"}}>
                <div className="card-body ">
                  <h5 className="card-title py-2">Level 4</h5>
                  <p className="card-text">Semester 1</p>
                  <a href={`/deanFinalMarkSheet/4/1/${selectedDepartment}`}  className="btn btn-primary btn-sm mt-2">View</a>
                </div>
              </div>

              <div className="card shadow m-4" style={{width: "18rem"}}>
                <div className="card-body ">
                  <h5 className="card-title py-2">Level 4</h5>
                  <p className="card-text">Semester 2</p>
                  <a href={`/deanFinalMarkSheet/4/2/${selectedDepartment}`}  className="btn btn-primary btn-sm mt-2">View</a>
                </div>
              </div>

            </div>
      </div>
    </>
  
  )
}
