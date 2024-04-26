
import { NavebarHOD } from './NavebarHOD'
import CourseCard from '../Components/HOD/CourseCard'
import { useState } from 'react';
import { useOktaAuth } from "@okta/okta-react";
import { Redirect } from "react-router-dom";


export default function HODDashBoard() {
  const { authState } = useOktaAuth();

  const[level,setLevel]=useState()
  const[sem,setSem]=useState()

 
  const handleButtonClick = (btnlevel, btnsem) => {
   
    console.log(btnlevel)
    setLevel(btnlevel)
    setSem(btnsem);
  };


  console.log(level)

  if (authState?.accessToken?.claims.userType !== 'ICTHOD') {
    return <Redirect to="/" />;
  }
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
