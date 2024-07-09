
import { NavebarHOD } from './NavebarHOD'
import CourseCard from '../Components/HOD/CourseCard'
import { useState } from 'react';


export default function HODDashBoard() {

  const[level,setLevel]=useState()
  const[sem,setSem]=useState()





  return (
    <>  
    <NavebarHOD/>
        <div className=' container' style={{marginTop:"70px"}}>
          
            <h3 className=' bg-transparent'>Approvel of Marks</h3>

            <div className='row g-5 mt-2'>

              <div className="card shadow m-4" style={{width: "18rem"}}>
                <div className="card-body ">
                  <h5 className="card-title py-2">Level 1</h5>
                  <p className="card-text">Semester 1</p>
                  <a href=""  className="btn btn-primary btn-sm mt-2">View</a>
                </div>
              </div>

              <div className="card shadow m-4" style={{width: "18rem"}}>
                <div className="card-body ">
                  <h5 className="card-title py-2">Level 1</h5>
                  <p className="card-text">Semester 2</p>
                  <a href=""  className="btn btn-primary btn-sm mt-2">View</a>
                </div>
              </div>

              <div className="card shadow m-4" style={{width: "18rem"}}>
                <div className="card-body ">
                  <h5 className="card-title py-2">Level 2</h5>
                  <p className="card-text">Semester 1</p>
                  <a href=""  className="btn btn-primary btn-sm mt-2">View</a>
                </div>
              </div>

              <div className="card shadow m-4" style={{width: "18rem"}}>
                <div className="card-body ">
                  <h5 className="card-title py-2">Level 2</h5>
                  <p className="card-text">Semester 2</p>
                  <a href=""  className="btn btn-primary btn-sm mt-2">View</a>
                </div>
              </div>

            </div>
            <div className='row g-5 mt-2'>

              <div className="card shadow m-4" style={{width: "18rem"}}>
                <div className="card-body ">
                  <h5 className="card-title py-2">Level 3</h5>
                  <p className="card-text">Semester 1</p>
                  <a href=""  className="btn btn-primary btn-sm mt-2">View</a>
                </div>
              </div>

              <div className="card shadow m-4" style={{width: "18rem"}}>
                <div className="card-body ">
                  <h5 className="card-title py-2">Level 3</h5>
                  <p className="card-text">Semester 2</p>
                  <a href=""  className="btn btn-primary btn-sm mt-2">View</a>
                </div>
              </div>

              <div className="card shadow m-4" style={{width: "18rem"}}>
                <div className="card-body ">
                  <h5 className="card-title py-2">Level 4</h5>
                  <p className="card-text">Semester 1</p>
                  <a href=""  className="btn btn-primary btn-sm mt-2">View</a>
                </div>
              </div>

              <div className="card shadow m-4" style={{width: "18rem"}}>
                <div className="card-body ">
                  <h5 className="card-title py-2">Level 4</h5>
                  <p className="card-text">Semester 2</p>
                  <a href=""  className="btn btn-primary btn-sm mt-2">View</a>
                </div>
              </div>

            </div>
        </div>
    </>
  )
}
