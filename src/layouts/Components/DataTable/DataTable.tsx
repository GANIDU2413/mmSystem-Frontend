
import './dataTable.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Navebar } from '../NavBar/Navebar-AR';
import BackButton from '../BackButton/BackButton';

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
  const course_variables = useParams<{ course_id: string; course_name?: string }>(); //any = useParams();

  const [studentMarks, setStudentMarks] = useState<StudentMark[]>([]);
  const [uniqueStudentIds, setUniqueStudentIds] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>('');


  
  const fetchData = async (value:string)=>{

    if(value==='Open this select a Student' || value==="") 
      {
        try {
          const response = await axios.get<StudentMark[]>(
            `http://localhost:9090/api/AssistantRegistrar/findAllStudentMarksRemainingToApprove/HOD/${course_variables.course_id}`
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
            `http://localhost:9090/api/AssistantRegistrar/findAllStudentMarksRemainingToApproveByStuId/HOD/${course_variables.course_id}/${value}`
          );
          const Allresponse = await axios.get<StudentMark[]>(
            `http://localhost:9090/api/AssistantRegistrar/findAllStudentMarksRemainingToApprove/HOD/${course_variables.course_id}`
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
  }, [course_variables.course_id]); // React to changes in course_id

  const printSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);
    setSelectedValue(selectedValue);
  };

  const handleSelectedValue = (value: string) => {
    fetchData(value);

  };

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
                  <option>Open this select a Student</option>
                  {uniqueStudentIds.map((id) => (
                    <option key={id} value={id}>
                      {id}
                    </option>
                  ))}
                </select>
            </th>
              <th colSpan={100} style={{textAlign:"center",backgroundColor:'#ebe8e8',textAlignLast:"center"}}>Approve Student Results Before The Results Board <br/> {course_variables.course_id} - {course_variables.course_name}</th>
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
          <button type="button" className="btn btn-outline-primary">Update Medical</button>&nbsp;&nbsp;
          <button type="button" className="btn btn-outline-primary">Approve</button>&nbsp;&nbsp;
          <BackButton /><br/>&nbsp;
        </div>
      </div>
      
    </div>
  )


  }






  