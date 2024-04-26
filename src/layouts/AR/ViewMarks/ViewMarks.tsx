import { Redirect } from "react-router-dom";
import LevelSelection from "../../Components/AR/LevelSelection/LevelSelection";
import { useOktaAuth } from "@okta/okta-react";
import { NavebarAR } from "../../Components/AR/NavBarAR/NavebarAR";

export default function ViewMarks(props:any) {
  const { authState } = useOktaAuth();
  var department_id = props.department_id;

// if (authState?.accessToken?.claims.userType !== 'ar') {
//   return <Redirect to="/home" />;
//   }
  return (
    <div>
        <NavebarAR />
        <LevelSelection department_id={department_id}/>
    </div>
  )
}
