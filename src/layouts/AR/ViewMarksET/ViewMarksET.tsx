import React, { useEffect } from 'react'
import LevelSelection from '../../Components/LevelSelection/LevelSelection'
import { Navebar } from '../../Components/NavBar/Navebar-AR'

export default function ViewMarksET() {
  return (
    <div>
        <Navebar/>
        <LevelSelection department={"ET"}/>
    </div>
  )
}
