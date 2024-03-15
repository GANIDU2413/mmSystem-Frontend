import { Checkbox } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function MarksTable() {

    const [mrks,setMrks]= useState([]);


    useEffect(()=>{
        //calling loadMarks() fucntion
        loadMarks();
    },[]);

    //get data using api
    const loadMarks=async()=>{
        const result = await axios.get("http://localhost:9090/api/lecture/get/score");
        setMrks(result.data);
    }

    // ('form input[type="checkbox"]').change(function(){
    //   var allChecked = !!('form input[type="checkbox"]:not(:checked)').length;
    //   ('.toggle-disabled').prop('disabled', allChecked);
    // })

    const process = (e)=>{
      e = document.getElementsByName('checkbox').checked;
      e == true ? document.getElementById('submitbtn').disabled = false : document.getElementById('submitbtn').disabled = true;
    }

  return (
    
        <div className='container' >
        <div className='py-4'>
          <table className="table border shadow" style={{marginTop:"60px"}}>
            <thead>
              <tr>
                <th scope="col">Checking</th>
                <th scope="col">Student ID</th>
                <th scope="col">Course ID</th>
                <th scope="col">Year</th>
                <th scope="col">Assignment Type</th>
                <th scope="col">Assignment Score</th>
                <th scope="col">Level</th>
                <th scope="col">Semester</th>
              </tr>
            </thead>
            <tbody>

              {
                  mrks.map((mrk)=>(
                      <tr>
                          <th>
                            <Checkbox name='checkbox' id='checkboxbtn' onClick={(e)=>process(e) }></Checkbox>
                          </th>
                          <td>{mrk.studentID}</td>
                          <td>{mrk.courseID}</td>
                          <td>{mrk.year}</td>
                          <td>{mrk.assignmentType}</td>
                          <td>{mrk.assignmentScore}</td>
                          <td>{mrk.level}</td>
                          <td>{mrk.semester}</td>
                      </tr>
                  ))
              }
              
            </tbody>
          </table>
        </div>
        <div className='py-4'>
        <button type="button" class="btn btn-outline-success btn-sm" id='submitbtn'>Sumbit</button>
        <button type="button" class="btn btn-outline-danger mx-2 btn-sm" id='clearbtn'>Clean</button>
        </div>      
    </div>
    
  )
}


