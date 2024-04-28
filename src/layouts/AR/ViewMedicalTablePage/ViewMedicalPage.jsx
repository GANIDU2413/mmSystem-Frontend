import React from 'react'
import { useEffect } from 'react';
import {toastr} from 'react-redux-toastr';

export default function ViewMedicalPage() {

    const fetchData = async (value)=>{
      try{

      }catch(err){
        toastr.error("Error",err.message);
      }


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
