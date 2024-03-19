// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { Link, useParams,Redirect } from 'react-router-dom';



// export default function StudentMarksEditForm() {

// //     const [redirect, setRedirect] = useState(false);

// //     const[marksByID,setMarksByID]=useState(
// //         {
// //             student_id: "",
// //             course_id: "",
// //             overall_score:""
       
// //         }
// //     )
    
// //     const{id}=useParams();

    

    
    
// //     const loadMarksByID=async()=>
// //     {
// //         // const marksByID=await axios.get(`http://localhost:9090/api/studentMarks/getCourseCodeOverallScoreById/${}`);
// //         setMarksByID(marksByID.data);
// //     }
    
// //    useEffect(()=>{
// //     loadMarksByID();
// //    },[]);
    
// //     const onSubmit =async (e)=>{
// //         e.preventDefault();
// //         await axios.put(`http://localhost:9090/api/studentMarks/EditMarksForm/${id}`,marksByID);
// //         setRedirect(true);
// //     }

// //     if (redirect) {
// //         return <Redirect to="/studentmarks" />;
// //     }
// //   return (
// //     <div className='container'>
// //         <div className='row'style={{ marginTop: "70px" }}>
// //             <div className='col-md-6 offset-md-3 boder p-4 mt-2 shadow'>
// //                 <h3 className='text-center m-4'>Marks edit</h3>
// //                 <form onSubmit={(e)=>onSubmit(e)}>

// //                     <label className='form-label' htmlFor='student_id'>Student ID</label>
// //                     <input type='text'  className='form-control' placeholder='Enter student ID' name="student_id" value={student_id} ></input>

// //                     <label className='form-label' htmlFor='course_id'>Course ID</label>
// //                     <input type='text' className='form-control' placeholder='Enter your course ID' name="course_id" value={course_id} ></input>

                    
// //                     <input type="submit" name="Submit"  className='btn btn-outline-primary rounded-pill btn-sm'></input>
// //                     <Link type="Clear" name="Clear" className='btn btn-outline-danger mx-2 rounded-pill btn-sm' to="/studentmarks">Cancel</Link>

// //                 </form>
// //             </div>
// //         </div>
// //     </div>
// //   )
// }

import React from 'react'

export default function StudentMarksEditForm() {
  return (
    <div>StudentMarksEditForm</div>
  )
}

