import LevelSelection from "../../Components/AR/LevelSelection/LevelSelection";
import { Navebar } from "../../Components/AR/NavBar/Navebar-AR";

export default function ViewMarks(props:any) {
var department_id = props.department_id;


  return (
    <div>
        <Navebar/>
        <LevelSelection department_id={department_id}/>
    </div>
  )
}
