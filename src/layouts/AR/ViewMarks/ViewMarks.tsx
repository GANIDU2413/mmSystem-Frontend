import React, { useEffect } from 'react'
import { Navebar } from '../../Components/AR/NavBar/Navebar-AR';
import LevelSelection from '../../Components/AR/LevelSelection/LevelSelection';

export default function ViewMarks(props:any) {
var department_id = props.department_id;


  return (
    <div>
        <Navebar/>
        <LevelSelection department_id={department_id}/>
    </div>
  )
}
