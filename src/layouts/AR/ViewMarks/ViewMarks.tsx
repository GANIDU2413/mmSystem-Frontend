import { Redirect } from "react-router-dom";
import LevelSelection from "../../Components/AR/LevelSelection/LevelSelection";
import { useOktaAuth } from "@okta/okta-react";
import { NavebarAR } from "../../Components/AR/NavBarAR/NavebarAR";
import BackButton from "../../Components/AR/BackButton/BackButton";

export default function ViewMarks(props:any) {
  const { authState } = useOktaAuth();
  var department_id = props.department_id;

// if (authState?.accessToken?.claims.userType !== 'ar') {
//   return <Redirect to="/home" />;
//   }
  return (
    <div>
        <NavebarAR />
        <LevelSelection department_id={department_id} level_selection_tpe={"View student marks"}/>

        
    </div>
  )
}
