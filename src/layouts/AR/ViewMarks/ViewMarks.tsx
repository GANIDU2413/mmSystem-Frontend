import { Redirect } from "react-router-dom";
import LevelSelection from "../../Components/AR/LevelSelection/LevelSelection";
import { Navebar } from "../../Components/AR/NavBar/Navebar-AR";
import { useOktaAuth } from "@okta/okta-react";

export default function ViewMarks(props:any) {
  const { authState } = useOktaAuth();
  var department_id = props.department_id;

if (authState?.accessToken?.claims.userType !== 'ar') {
  return <Redirect to="/home" />;
  }
  return (
    <div>
        <Navebar/>
        <LevelSelection department_id={department_id}/>
    </div>
  )
}
