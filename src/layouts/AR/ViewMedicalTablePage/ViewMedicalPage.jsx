import React from 'react'
import { useEffect } from 'react';

export default function ViewMedicalPage() {

    const fetchData = async (value)=>{

    };
    
    useEffect(()=>{    
        fetchData();
      },[]);

  return (
    <div>
        <div style={{width:"97%",marginLeft:"auto",marginRight:"auto",marginTop:"65px"}}>
            Medical Table
        </div>
    </div>
  )
}
