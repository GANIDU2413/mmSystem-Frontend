import React, { useEffect } from 'react'
import LevelSelection from '../../Components/LevelSelection/LevelSelection'
import { Navebar } from '../../Components/NavBar/Navebar-AR'

export default function ViewMarks(props:any) {
var department_id = props.department_id;


  return (
    <div>
        <Navebar/>
        <LevelSelection department_id={department_id}/>
    </div>
  )
}
