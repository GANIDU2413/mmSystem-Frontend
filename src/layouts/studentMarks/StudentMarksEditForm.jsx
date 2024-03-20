
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, Redirect } from "react-router-dom";

export default function MarksEditForm() {
  const [redirect, setRedirect] = useState(false);
  const [cidandfinalmarks, setCidandfinalmarks] = useState([]);
  const { student_id } = useParams();

  const loadMarksByID = async () => {
    const marksByID = await axios.get(
      `http://localhost:9090/api/studentMarks/getCourseCodeOverallScoreById/${student_id}`
    );

    setCidandfinalmarks(marksByID.data);
  };

  useEffect(() => {
    loadMarksByID();
  }, []);

  const OnInputChange = (e, courseId) => {
    const { value } = e.target;
    setCidandfinalmarks((prevMarks) =>
      prevMarks.map((mark) =>
        mark.course_id === courseId ? { ...mark, overall_score: parseFloat(value) } : mark
      )
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:9090/api/studentMarks/EditMarksForm/`,cidandfinalmarks
    );
    console.log(cidandfinalmarks);
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/studentmarks" />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 boder p-4 mt-2 shadow">
          <h1 className="text-center m-4">Marks edit</h1>
          <form onSubmit={(e) => onSubmit(e)}>
            {cidandfinalmarks.map((studentobj) => (
              <div key={studentobj.id}>
                <label className="form-label" htmlFor={studentobj.course_id}>
                  Course ID : {studentobj.course_id}
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter new overall score"
                  name={studentobj.course_id}
                  value={studentobj.overall_score}
                  onChange={(e) => OnInputChange(e, studentobj.course_id)}
                />
              </div>
            ))}
            <input
              type="submit"
              className="btn btn-outline-primary mx-2"
              value="Submit"
            />
            <Link
              className="btn btn-outline-danger mx-2"
              to="/studentmarks"
            >
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}


// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { Link, useParams,Redirect } from 'react-router-dom';



// export default function MarksEditForm() {

//     const [redirect, setRedirect] = useState(false);

//     const [cidandfinalmarks,setCidandfinalmarks] = useState();

    



//     const[marksByID,setMarksByID]=useState(
//         {
//           student_id: "",
//             courseID: "",
//             year: "",
//             assignmentType: "",
//             assignmentScore: "",
//             level: "",
//             semester: ""
       
//         }
//     )
    
//     const{student_id}=useParams();
//     console.log(student_id);
    
//     const loadMarksByID=async()=>{
//         const marksByID=await axios.get(`http://localhost:9090/api/studentMarks/getCourseCodeOverallScoreById/${student_id}`);

//         const finalmarksbyid = marksByID.data;
//         // console.log(finalmarksbyid);
//         const finalmarksbyids=finalmarksbyid.filter((markobj)=>markobj.student_id===student_id)

//         setCidandfinalmarks(finalmarksbyids);

//         // console.log(finalmarksbyids);
//     }
    
//     useEffect(()=>
//     {
//         loadMarksByID();
//     },[]);
    
//     const {studentID,courseID,year,assignmentType,assignmentScore,level,semester}=marksByID;
    
//     const OnInputChange=(e)=>
//     {
//         const { name, value } = e.target;
//         setCidandfinalmarks({ ...cidandfinalmarks, course_id: value });
        
//     }
    
//     const onSubmit =async (e)=>{
//         e.preventDefault();
//         await axios.put(`http://localhost:9090/api/studentMarks/EditMarksForm/`,marksByID);
//         setRedirect(true);
//     }

//     if (redirect) {
//         return <Redirect to="/studentmarks" />;
//     }
//   return (
//     <div className='container'>
//         <div className='row'>
//             <div className='col-md-6 offset-md-3 boder p-4 mt-2 shadow'>
//                 <h1 className='text-center m-4'>Marks edit</h1>
//                 <form onSubmit={(e)=>onSubmit(e)}>
//                     {
//                         cidandfinalmarks?.map((studentobj)=>(
//                         <>
//                             <label className='form-label' htmlFor='CourseID'>Course ID : {studentobj.course_id}</label>
//                             <input type='text' className='form-control'  placeholder='Enter your course ID' name="courseID" value={studentobj.overall_score} onChange={(e)=>OnInputChange(e)}></input>

//                         </>
//                     ))}
                        
                    
//                     <input type="submit" name="Submit"  className='btn btn-outline-primary mx-2'></input>
//                     <Link type="Clear" name="Clear" className='btn btn-outline-danger mx-2' to="/studentmarks">Cancel</Link>

//                 </form>
//             </div>
//         </div>
//     </div>
//   )
// }

