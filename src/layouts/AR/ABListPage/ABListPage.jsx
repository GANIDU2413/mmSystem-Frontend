import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './abListPage.css';
import BackButton from '../../Components/AR/BackButton/BackButton';
import { Redirect, useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { SpinerLoading } from '../../Utils/SpinerLoading';



export default function ABListPage() {

    const { authState } = useOktaAuth();




    const previousApprovalLevel='HOD';    //Approval level required to view the students having AB grades
    const [courseList,setCourseList]=useState([]);    //Use state to store the courses and student details under AR approval
    const history = useHistory(); // Initialize useHistory hook to navigate to different pages

    

    const loadData = async() => {   //Function to load the student details havind E* from the backend
      

        const result = await axios.get("http://localhost:9090/api/AssistantRegistrar/getABDetails");   //Get all the course and student details having AB from the backend
        await result.data.map((element)=>{    //Filter the courses and student details under AR approval
          if(element[7]===previousApprovalLevel){
            setCourseList(courseList=>[...courseList,element])  //Add the courses and student details under AR approval to the courseList state
          }
        })

    };


    

    
    useEffect(()=>{   //Use effect to load the data when the page is loaded


        setCourseList([]);    //Set the courseList state to empty array when there is an action on the page
        loadData();

        
    },[]);




    if(!authState){
      return <SpinerLoading/>;
    }
    if(authState.accessToken?.claims.userType !== "ar"){
      return <Redirect to="/home" />;
    }


  return (
    <div style={{width:"96%",marginLeft:"auto",marginRight:"auto"}}>
        
        

        {courseList.length===0 ?(   //If there are no absent students under AR approval, display the following message

          <div className="alert alert-danger" role="alert" style={{marginTop:'100px',textAlign:'center',width:'80%',marginLeft:'auto',marginRight:'auto'}}>
            <h5>There are no absent students for exams under your approval</h5>
          </div>

        ):(   //If there are absent students under AR approval, display the following table

          <div style={{marginLeft:"auto",marginRight:"auto",marginTop:"65px",alignContent:'center'}}>
            <table className="table table-striped">

              <thead className='tableHead'>
                <tr>
                  <th colSpan={100} style={{textAlign:"center",backgroundColor:'#ebe8e8',textAlignLast:"center"}}>
                    Update students grades with medical submissions <br/>
                  </th>
                </tr>
                <tr>              
                  <th scope="col">Level</th>
                  <th scope="col">Semester</th>
                  <th scope='col'>Academic year</th>
                  <th scope="col">Course ID</th>
                  <th scope="col">Course Name</th>
                  <th scope="col">Student ID</th>
                  <th scope="col">Score</th>
                  <th scope="col">Exam type</th>
                </tr>          
              </thead>

              <tbody>
                {courseList.map((element,index) => (
                  <tr className="clickable-row" key={index} onClick={()=>
                      {
                        history.push(`/viewABUpdate/updateAB/${element[2]}/${element[3]}/${element[4]}/${element[5]}/${element[6]}/${element[8]}`)
                      
                      }}>
                    <td>{element[0]}</td>
                    <td>{element[1]}</td>
                    <td>{element[8]}</td>
                    <td>{element[2]}</td>
                    <td>{element[3]}</td>
                    <td>{element[4]}</td>
                    <td>{element[5]}</td>
                    <td>{element[6]}</td>
                  </tr>
                ))}
              </tbody>
              
            </table>

            
          </div>

        )}
        <div className='right-aligned-div back-button-div'>
          <BackButton/> <br/>&nbsp;
        </div>

    </div>
  )
}
