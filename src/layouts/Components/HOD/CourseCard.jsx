import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { NavebarHOD } from '../../HOD/NavebarHOD';
import { fetchAcademicYear, loadAcademicYearFromLocal, saveAcademicYearToLocal } from '../../../AcademicYearManagerSingleton';

export default function CourseCard(props) {

    const[cidN,setCidN]=useState([
        {
            course_id: '',
            course_name: ''
        }
    ])
    const history = useHistory();

    const[errorMsg,seterrorMsg]=useState('');
    const{level,semester,department}=useParams();
    const{approved_level}=props;
    const [academicYear, setAcademicYear] = useState(loadAcademicYearFromLocal);
   
    console.log(level,semester,department,approved_level,academicYear)
    

    const result = async () => {
        try {
            console.log(academicYear)
            const list = await axios.get(`http://localhost:9090/api/courses/getcidcnamebyls/${level}/${semester}/${department}/${approved_level}/${academicYear}`);
            console.log(list.data);
            console.log(level,semester);
            setCidN(list.data.content);
            console.log(cidN);
            seterrorMsg(list.data.message);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error('No data found for the given level and semester');
                console.log(error.response.data.message);
                seterrorMsg(error.response.data.message);
              
                setCidN([]); // Set an empty array or any default state

            } else {
                // Handle other types of errors
                console.error('An error occurred:', error.response.data.message);
                seterrorMsg('An error occurred:', error);
            }
        }
    };
    
    useEffect(() => {
        result();

        
       }, [level, semester,department,approved_level]); // This effect runs whenever level or semester changes
       
       useEffect(() => {
        const fetchAndSaveYear = async () => {
          const year = await fetchAcademicYear();
          if (year) {
            saveAcademicYearToLocal(year);
            setAcademicYear(year);
          }
        };
    
        fetchAndSaveYear();
      }, []);
       
      
       
       


  

    
       return (
        <>
           <div className="row" style={{marginTop:"70px", padding:"2%"}}>
            <NavebarHOD />
             {
               cidN && cidN.length > 0 ? (
                 cidN.map((courseInfo, index) => (
                   <div
                     className="card border-primary mb-3 mx-lg-3 shadow"
                     style={{ maxWidth: '18rem', cursor: 'pointer' }}
                     key={index}
                     onClick={() => history.push(`/HODMarksReturnSheet/${courseInfo.course_id}/${courseInfo.course_name}/${department}`)}
                   >
                     <div className="card-header">Course code : {courseInfo.course_id}</div>
                     <div className="card-body">
                       <h5 className="card-title">{courseInfo.course_name}</h5>
                     </div>
                   </div>
                 ))
               ) : (
                <div className=' container' style={{ marginTop: '150px' }}>
                <div className="alert alert-primary" role="alert">
                  {errorMsg}
                </div>
                </div>
               )
             }
           </div>
        </>
       );
       
           
}
