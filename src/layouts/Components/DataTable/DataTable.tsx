
import './dataTable.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Navebar } from '../NavBar/Navebar-AR';
import BackButton from '../BackButton/BackButton';
import { response } from 'express';

// Define the type for your student mark data
type StudentMark = {
  id: number;
  student_id: string;
  course_id: string;
  academic_year: string;
  level: string;
  semester: string;
  assignment_type: string;
  assignment_score: string;
};
interface DataTableProps {}


export default function DataTable(props:any) {


  const { course_id, course_name, previousRole } = useParams<{
    course_id: string;
    course_name?: string;
    previousRole?: string;
  }>();
  
  const [studentMarks, setStudentMarks] = useState<StudentMark[]>([]);
  const [studentGrade, setStudentGrade] = useState(); //For student grade
  const [uniqueStudentIds, setUniqueStudentIds] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [medicalClicked, setMedicalClicked] = useState<boolean>(false);   //For approve button enable disable
  var selectedOption = "";


  
  const fetchData = async (value:string)=>{

    if(value==='Select a student' || value==="") 
      {
        try {
          const response = await axios.get<StudentMark[]>(
            `http://localhost:9090/api/AssistantRegistrar/findAllStudentMarksRemainingToApprove/HOD/${course_id}`
          );
          
          setStudentMarks(response.data);
    
          // Extract unique student IDs
          const uniqueIds = Array.from(new Set(response.data.map((item) => item.student_id)));
    
          setUniqueStudentIds(uniqueIds);
    
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      else{
        try {
          const response = await axios.get<StudentMark[]>(
            `http://localhost:9090/api/AssistantRegistrar/findAllStudentMarksRemainingToApproveByStuId/HOD/${course_id}/${value}`
          );
          const Allresponse = await axios.get<StudentMark[]>(
            `http://localhost:9090/api/AssistantRegistrar/findAllStudentMarksRemainingToApprove/HOD/${course_id}`
          );
          
          setStudentMarks(response.data);
    
          // Extract unique student IDs
          const uniqueIds = Array.from(new Set(Allresponse.data.map((item) => item.student_id)));
    
          setUniqueStudentIds(uniqueIds);
    
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
        
   
      
  };

  useEffect(() => {
    fetchData("");
  }, [course_id]); // React to changes in course_id

  const printSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);
    setSelectedValue(selectedOption);
  };

  const handleSelectedValue = (value: string) => {
    fetchData(value);
    setMedicalClicked(false);
    setSelectedValue(value)
    selectedOption = value;
    console.log(selectedOption)
  };

  const handleMedicalClicked = async() => {

    
        // const response = await axios.post(`http://localhost:9090/api/AssistantRegistrar/updateMarksApprovalLevelByAllParameters/AR/${course_id}/${selectedOption}/${previousRole}/2024`, {
        //     data: {
        //         // Your data to be sent in the request body
        //     }
        // });
        console.log({course_id});
        alert("Marks Approved Successfully");
        
      
      }

  return (
    <div>
      <Navebar />
      {/* Populate the select element with unique student IDs */}
      
      
      <div style={{width:"94%",marginLeft:"3%",marginRight:"3%",marginTop:"65px"}}>

        
        
        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{textAlign:"center",backgroundColor:'#ebe8e8',width:"250px"}} >
                <select className="form-select w-100 mx-lg-2" aria-label="Default select example" onChange={(e) => handleSelectedValue(e.target.value)}>
                  <option>Select a student</option>
                  {uniqueStudentIds.map((id) => (
                    <option key={id} value={id}>
                      {id}
                    </option>
                  ))}
                </select>
              </th>
              <th colSpan={100} style={{textAlign:"center",backgroundColor:'#ebe8e8',textAlignLast:"center"}}>
                Approve Student Results Before The Results Board <br/> {course_id} - {course_name}
              </th>
            </tr>
            <tr>
           
              <th scope="col">Student ID</th>
              <th scope="col">Course ID</th>
              <th scope="col">Assignment type</th>
              <th scope="col">Assignment</th>
            </tr>
      
          </thead>
          <tbody>
            {
              studentMarks.map((studentMark: any, index: number) => (
                <tr key={index}>
                  <td scope="row">{studentMark.student_id}</td>
                  <td>{studentMark.course_id}</td>
                  <td>{studentMark.assignment_type}</td>
                  <td>{studentMark.assignment_score}</td>
                </tr>
              ))
            }

          </tbody>
        </table>

        <div className='right-aligned-div'>
          <button type="button" className="btn btn-sm btn-success" onClick={() => { setMedicalClicked(true); }}>Update Medical</button>&nbsp;&nbsp;
          <button type="button" className={`btn btn-sm ${medicalClicked ? 'btn-primary' : 'btn-primary'}`} disabled={!medicalClicked} onClick={handleMedicalClicked}>Approve Marks</button>&nbsp;&nbsp;
          <BackButton /><br/>&nbsp;
        </div>
      </div>
      
    </div>
  )


  }






  