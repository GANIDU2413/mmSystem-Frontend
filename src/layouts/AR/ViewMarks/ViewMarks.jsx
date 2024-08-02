import { Redirect } from "react-router-dom";
import LevelSelection from "../../Components/AR/LevelSelection/LevelSelection";
import { useOktaAuth } from "@okta/okta-react";
import { NavebarAR } from "../../Components/AR/NavBarAR/NavebarAR";
import BackButton from "../../Components/AR/BackButton/BackButton";
import { SpinerLoading } from "../../Utils/SpinerLoading";


export default function ViewMarks(props) {
  const { authState } = useOktaAuth();
  var department_id = props.department_id;


  
  if(!authState){
    return <SpinerLoading/>;
  }
  if(authState.accessToken?.claims.userType !== "ar"){
    return <Redirect to="/home" />;
  }

  return (
    <div>
       
        
        <NavebarAR/>
        <LevelSelection department_id={department_id} level_selection_tpe={"View student marks"}/>

        <div className='col'>
            <div className='right-aligned-div back-button-div' style={{marginRight:'20px',marginTop:"10px"}}>
              <BackButton/> <br/>&nbsp;
            </div>
        </div>
    </div>
  )
}
