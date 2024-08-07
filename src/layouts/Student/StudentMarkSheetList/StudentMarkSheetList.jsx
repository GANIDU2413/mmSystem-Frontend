import React from 'react'
import { useOktaAuth } from '@okta/okta-react'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import './studentMarkSheetList.css';
import { useHistory } from 'react-router-dom';
import BackButton from '../../Components/AR/BackButton/BackButton';


export default function StudentMarkSheetList() {

    
    const {authState} = useOktaAuth();

    const history = useHistory();

    const approvedLevel="VC";          // Approved level for result board conducted courses
    const resultBoardState ="Ended";   // State of the result board to publish marks
    const [publishedMarkSheetsList, setPublishedMarkSheetsList] = useState([]);         //Use state to store published mark sheets list



    const getPublishedMarkSheets = async () => {         // load the published mark sheets
        try{
          const result = await axios.get(`http://localhost:9090/api/Student/getPublishedMarksSheetList/${approvedLevel}/${resultBoardState}`);
          setPublishedMarkSheetsList(result.data);
        }catch(error){
          console.error(`Error - ${error}`);
        }
    }

    useEffect(() => {
        getPublishedMarkSheets();
      }, [])





  return (


    <div className='student-published-marksheet-list-main-div'>

      <div className='row published-mark-sheet-list-main-row'>

        
        <table className="table table-striped student-home-page-table" >

          <thead className='marks-sheet-list-table-head'>
            <tr>
              <th className='home-page-table-heading' colSpan={100} style={{textAlign: 'center', backgroundColor: '#ebe8e8', textAlignLast: 'center'}}>
                Published Marks Sheets <br/>
              </th>
            </tr>
            <tr>
              <th colSpan={100}></th>
            </tr>
            <tr>
              <th>Level</th>
              <th>Semester</th>
              <th>Department</th>
              <th>Academic Year</th>
            </tr>
          </thead>

          <tbody>
            {
              publishedMarkSheetsList.length <1 ? (
                <tr>
                  <td colSpan={100} style={{textAlign: 'center'}}>No Published Marks Sheets Available</td>
                </tr>
              ):
              (
                publishedMarkSheetsList.map((item, index) =>(
                  <tr key={index} className='clickable-row' onClick={()=>{history.push({pathname:`/viewPublishedMarksSheet`,state:item})}}>
                    <td>level {item.level}</td>
                    <td>semester {item.semester}</td>
                    <td>Dep. of {item.department}</td>
                    <td>academic year ({item.academic_year})</td>
                  </tr>))
              )
            }

          </tbody>

        </table>


        <div className='right-aligned-div back-button-div'>
          <br/><BackButton/> <br/>&nbsp;
        </div>

      </div>
    </div>


  )
}
