
import { Checkbox } from '@mui/material'
import './dataTable.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { render } from '@testing-library/react';


export default function DataTable(props: any) {
  const course_id: any = useParams();
  const stateParamVal: any = (useLocation().state as { stateParam: any }).stateParam;

  const [studentMarks, setStudentMarks] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9090/api/studentMarks/findAllStudentMarksRemainingToApprove/HOD/'+course_id.course_id);
        setStudentMarks(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);




  return (
    <center>
    <div style={{paddingTop:'65px',width:"95%"}}>
        <table className="table table-striped">
  <thead>
    <tr>
        <th colSpan={100} style={{textAlign:"center",backgroundColor:'#ebe8e8'}}>Student Results {course_id.course_id}</th>
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
          <td>{studentMark.assignment}</td>
        </tr>
      ))
    }

    
    
  </tbody>
</table>

    <div className='right-aligned-div'>
        <button type="button" className="btn btn-outline-primary">Update Medical</button>&nbsp;&nbsp;
        <button type="button" className="btn btn-outline-primary">Approve</button>
    </div>
    </div>
    </center>
  )
}

