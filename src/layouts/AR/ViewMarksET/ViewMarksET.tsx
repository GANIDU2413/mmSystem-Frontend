import React, { useEffect } from 'react'
import { Navebar } from '../../Components/AR/NavBar/Navebar-AR'
import LevelSelection from '../../Components/AR/LevelSelection/LevelSelection'


export default function ViewMarksET() {
  return (
    <div>
        <Navebar/>
        <LevelSelection department={"ET"}/>
    </div>
  )
}
