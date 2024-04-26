import React, { useEffect, useState } from 'react'
import { NavebarDean } from '../NavebarDean'
import axios from 'axios';

export default function DeanFinalMarkSheet() {
    const [finalResults,setFinalResults] = useState([]);

    let level=3
    let sem=1
    let department_id="ICT"
    let approved_level="AR"

    const resultSheet=async()=>{
        const result = await axios.get(`http://localhost:9090/api/studentMarks/GetMarksByDLS/ICT/3/1/AR`);
        setFinalResults(result.data);
        console.log(result.data);



    }



    useEffect(()=>{
        resultSheet();
    }, [])



    
  return (
    <>
        <div>
            <NavebarDean  ></NavebarDean>
        </div>
    </>
  )
}
