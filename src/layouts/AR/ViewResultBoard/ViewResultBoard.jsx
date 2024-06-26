import React from 'react'
import { useParams } from 'react-router-dom'

export default function ViewResultBoard() {

    const selectedResultBoardDetails = useParams(); //Get the selected result board details from the URL


  return (
    <div >
        {console.log(selectedResultBoardDetails.resultboardId)}
    </div>
  )
}
