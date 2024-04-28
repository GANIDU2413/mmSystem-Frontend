import React from 'react'
import { NavebarAR } from '../../Components/AR/NavBarAR/NavebarAR';
import BackButton from '../../Components/AR/BackButton/BackButton';
import { Redirect, useHistory } from 'react-router-dom';
import './certifyMarksPage.css';
import { useOktaAuth } from '@okta/okta-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function CertifyMarksPage(props) {     

    const department_id = props.department_id;      // get department id from props
    const history = useHistory();               // for routing
    const { authState } = useOktaAuth();      // get auth state
    const approvedLevel="HOD";          // HOD approved level

    const checkCertifyAvailability = async (level,semester) => {          // check whether HOD approved all courses for the given level and semester
       let approvedYear = new Date().getFullYear();                       // get current year
       
      try{                                                                // get 'not approved courses' by level, semester, approved level and year     
        const response = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getNotApprovedCoursesByLevelSemester/${level}/${semester}/HOD/${approvedYear}`);
        
        if(response.data.length>0){                                       // if 'not approved courses' are available
          toast.error("HOD have not approved all courses for this level and semester",{autoClose:3000});      // show error message
          
        }else{                                                // if 'not approved courses' are not available
          history.push(`/arFinalMarkSheet/${level}/${semester}`);       // redirect to final mark sheet page
        }
      }
      catch(e){
        console.log(e);     // log error
      }
      
    };

    // if (authState?.accessToken?.claims.userType !== 'ar') {
    //   return <Redirect to="/ar" />;
    // }
  return (
    <div>
        
        <div style={{width:"98%",marginLeft:"auto",marginRight:"auto",marginTop:"85px",alignContent:'center'}}>

            
            <table className="table table-striped">

              <thead>
                <tr>
                  <th colSpan={100} style={{textAlign:"center",backgroundColor:'#ebe8e8',textAlignLast:"center"}}>
                    Certify Student Marks <br/>
                  </th>
                </tr>         
              </thead>

            
            </table>
            <div className="container">
                <div className="row">
                    <div className="col-sm">

                        

                        <div className="d-grid gap-3" style={{marginTop:"50px",marginRight:"30px"}}>
                            <label className="semesterLabel" >Semester 1</label>                                                                        {/* semester 1 buttons for eaach levels */}
                            <button className="btn btn-primary" type="button" onClick={()=>{ checkCertifyAvailability(1,1) }}>Level 1</button>
                            <button className="btn btn-primary" type="button" onClick={()=>{ checkCertifyAvailability(2,1) }}>Level 2</button>
                            <button className="btn btn-primary" type="button" onClick={()=>{ checkCertifyAvailability(3,1) }}>Level 3</button>
                            <button className="btn btn-primary" type="button" onClick={()=>{ checkCertifyAvailability(4,1) }}>Level 4</button>
                            
                        </div>
                    </div>

                    <div className="col-sm">
                        <div className="d-grid gap-3" style={{marginTop:"50px",marginLeft:"30px"}}>
                            <label className="semesterLabel">Semester 2</label>                                                                     {/* semester 2 buttons for eaach levels */}
                            <button className="btn btn-primary" type="button" onClick={()=>{ checkCertifyAvailability(1,2) }}>Level 1</button>
                            <button className="btn btn-primary" type="button" onClick={()=>{ checkCertifyAvailability(2,2) }}>Level 2</button>
                            <button className="btn btn-primary" type="button" onClick={()=>{ checkCertifyAvailability(3,2) }}>Level 3</button>
                            <button className="btn btn-primary" type="button" onClick={()=>{ checkCertifyAvailability(4,2) }}>Level 4</button>
                        </div>
                    </div>
                </div>
                <div className='right-aligned-div'>
                  <br/><BackButton/> <br/>&nbsp;
                </div>
            </div>
            <ToastContainer />          {/* toast container */}
            
        </div>
    </div>
  )
}