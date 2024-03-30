
import { NavebarHOD } from './NavebarHOD'
import CourseCard from '../Components/HOD/CourseCard'
import { useState } from 'react';


export default function HODDashBoard() {

  const[level,setLevel]=useState()
  const[sem,setSem]=useState()

 
  const handleButtonClick = (btnlevel, btnsem) => {
   
    console.log(btnlevel)
    setLevel(btnlevel)
    setSem(btnsem);
  };

  

  console.log(level)
  return (
    <>
    <div className=' container'>
        <NavebarHOD handleButtonClick={handleButtonClick}/>
            <div className>
              {
                level!= null && sem != null?(
                  <CourseCard level={level} semester={sem}></CourseCard>
                ):(
                  <div className="py-4" style={{ marginTop: "70px" }}>
                    <h1>Pending Course Details</h1>
                  </div>
                )
                

              }
            </div>
    </div>
    </>
  )
}
