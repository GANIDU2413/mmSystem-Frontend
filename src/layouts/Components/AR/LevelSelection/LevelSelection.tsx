import React, { useEffect, useState } from 'react'
import SemesterSelection from '../SemesterSelection/SemesterSelection'
import { useOktaAuth } from '@okta/okta-react';
import { Redirect } from 'react-router-dom';

import "./levelSelection.css";
import BackButton from '../BackButton/BackButton';
import { SpinerLoading } from '../../../Utils/SpinerLoading';

export default function LevelSelection(props:any) {

  const { authState } = useOktaAuth();        // get the authentication state

  var department_id = props.department_id;
  var level_selection_tpe = props.level_selection_tpe;

  const [selectedLevel, setSelectedLevel] = useState(1);

  function callSemester(level:number) {
    setSelectedLevel(level);
  }


  
  if(!authState){
    return <SpinerLoading />;
  }
  if(authState.accessToken?.claims.userType !== "ar"){
    return <Redirect to="/home" />;
  }


  return (
    <form>

    <div className="shadow" style={{marginTop:75,marginLeft:20,marginRight:20,}}>
        <nav >
            <div className="nav nav-tabs" id="level-selection-tab" role="tablist" style={{backgroundColor:"rgba(0, 0, 0, 0.1)"}}>
                <button className="nav-link levels active" id="nav-level1-tab" data-bs-toggle="tab" data-bs-target="#nav-level1" type="button" role="tab" aria-controls="nav-level1" aria-selected="true" onClick={() => callSemester(1)}>LEVEL 1</button>
                <button className="nav-link levels " id="nav-level2-tab" data-bs-toggle="tab" data-bs-target="#nav-level2" type="button" role="tab" aria-controls="nav-level2" aria-selected="false" onClick={() => callSemester(2)}>LEVEL 2</button>
                <button className="nav-link levels " id="nav-level3-tab" data-bs-toggle="tab" data-bs-target="#nav-level3" type="button" role="tab" aria-controls="nav-level3" aria-selected="false" onClick={() => callSemester(3)}>LEVEL 3</button>
                <button className="nav-link levels " id="nav-level4-tab" data-bs-toggle="tab" data-bs-target="#nav-level4" type="button" role="tab" aria-controls="nav-level3" aria-selected="false" onClick={() => callSemester(4)}>LEVEL 4</button>
                    <label style={{paddingTop:"7px",paddingLeft:"300px",fontSize:"18px"}}><b>{level_selection_tpe}  - Department of {department_id}</b></label>
            </div>

        </nav>
        <div className="tab-content" id="level-selection-tabContent" >
          <div className={`tab-pane fade ${selectedLevel === 1 ? "show active" : ""}`} id="nav-level1" role="tabpanel" aria-labelledby="nav-level1-tab">
            {selectedLevel === 1 && <SemesterSelection level={1} department_id={department_id} />}
            
          </div>
          <div className={`tab-pane fade ${selectedLevel === 2 ? "show active" : ""}`} id="nav-level2" role="tabpanel" aria-labelledby="nav-level2-tab">
            {selectedLevel === 2 && <SemesterSelection level={2} department_id={department_id}/>}
          
          </div>
          <div className={`tab-pane fade ${selectedLevel === 3 ? "show active" : ""}`} id="nav-level3" role="tabpanel" aria-labelledby="nav-level3-tab">
            {selectedLevel === 3 && <SemesterSelection level={3} department_id={department_id}/>}
          </div>
          <div className={`tab-pane fade ${selectedLevel === 4 ? "show active" : ""}`} id="nav-level4" role="tabpanel" aria-labelledby="nav-level4-tab">
            {selectedLevel === 4 && <SemesterSelection level={4} department_id={department_id}/>}
            
          </div>
        </div>
      
    </div>
    
    </form>
  )
}
