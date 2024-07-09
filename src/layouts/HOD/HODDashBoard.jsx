
import { NavebarHOD } from './NavebarHOD'
import CourseCard from '../Components/HOD/CourseCard'
import { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { fetchAcademicYear,loadAcademicYearFromLocal,saveAcademicYearToLocal } from '../../AcademicYearManagerSingleton';


export default function HODDashBoard() {

  const [academicDetails, setAcademicDetails] = useState(loadAcademicYearFromLocal);
  const[academicYear,setAcademicYear]=useState("")
  const[current_semester,setCurrent_semester]=useState("")
  const[level,setLevel]=useState()
  const[sem,setSem]=useState()

  const { oktaAuth, authState } = useOktaAuth();

  useEffect(() => {
    const fetchAndSaveYear = async () => {
        const details = await fetchAcademicYear();
        if (details) {
            saveAcademicYearToLocal(details);
            setAcademicDetails(details);
        }
    };

    fetchAndSaveYear();
}, []);

useEffect(() => {
    if (academicDetails) { // Check if academicDetails is not null or undefined
        setAcademicYear(academicDetails.current_academic_year);
        setCurrent_semester(academicDetails.current_semester);
    }
}, [academicDetails]); // Depend on academicDetails to trigger this effect

 

 
   console.log(authState);
   console.log(authState.idToken?.claims.name);
 
   const department= authState?.accessToken?.claims.department;
        console.log(department)
   
            
      
   
 
   //const levels=["I","II","III","IV"];
   const levels =[1,2,3,4]
   





  return (
    <>  
    <NavebarHOD/>
        <div className=' container' style={{marginTop:"70px"}}>
          
            <h3 className=' bg-transparent' style={{ textAlign: 'center', fontSize: '32px', marginBottom: '20px', color: '#333' }}>Approvel of Marks</h3>

            <div className='row g-5 mt-2'>

            {levels.map((level, index) => (
               <>
               <div className="card shadow m-4" style={{width: "18rem"}}>
               <div className="card-body ">
                 <h5 className="card-title py-2">Level {level} </h5>
                 <p className="card-text">Semester {current_semester}</p>
                 <a href={`/CourseCard/${level}/${current_semester}/${department}`}  className="btn btn-primary btn-sm mt-2">View</a>
               </div>
             </div>
             </>
            )
             
                
            )}

              

             
            </div>
        </div>
    </>
  )
}
