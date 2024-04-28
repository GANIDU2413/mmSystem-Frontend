
import { NavebarHOD } from './NavebarHOD'
import CourseCard from '../Components/HOD/CourseCard'
import { useState } from 'react';


export default function HODDashBoard() {

  const[level,setLevel]=useState()
  const[sem,setSem]=useState()





  return (
    <>  <NavebarHOD/>
        <div className=' container mt-5'>
           <h1>Head of Department Dashboard</h1>
        </div>
    </>
  )
}
