import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom'

export default function DeanFinalMarkSheet(props ) {
    const [finalResults, setFinalResults] = useState([]);
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const { level,semester } = useParams();
    const[studentGPA, setStudentGPA] = useState([{}]);
    const history =useHistory();


    const[error, setError] = useState("");

    const {approved_level}=props
    

    
    const resultSheet = async () => {
        try {
            const result = await axios.get(`http://localhost:9090/api/studentMarks/GetApprovedMarksByLS/${level}/${semester}/${approved_level}`);
            const data = result.data.content;

            
            const gpa = await axios.get(`http://localhost:9090/api/gpa/GetGPAByLevelSemester/${level},${semester}`);
            const gpaData = gpa.data.content;
            setStudentGPA(gpaData);
            
            
            
          const processedData = data.reduce((acc, curr) => {
                const existingStudent = acc.find(student => student.student_id === curr.student_id);
                const gpaInfo = gpaData.find(ele => ele.student_id === curr.student_id);
                if (existingStudent) {
                    existingStudent.courses.push({
                        course_id: curr.course_id,
                        overall_score: curr.overall_score,
                        grade: curr.grade,
                    });
                } else {
                  
                    acc.push({
                        student_id: curr.student_id,
                        courses: [{
                            course_id: curr.course_id,
                            overall_score: curr.overall_score,
                            grade: curr.grade,
                        }]
                        
                    });


                }
                return acc;
            }, []);

            

            setFinalResults(processedData);

            const courseIdsSet = new Set();
            processedData.forEach(student => {
                student.courses.forEach(course => {
                    courseIdsSet.add(course.course_id);
                });
            });
            setCourses(Array.from(courseIdsSet));

            

            setStudents(processedData.map(student => student.student_id));
            
            
            
          
            

        } catch (error) {
            console.error(error);
            setError(error.message);
          }
        
    };

    useEffect(() => {
        resultSheet();
    }, [level,semester,approved_level]);


    const handleSubmit = async (e) => {
      let response = null;
      e.preventDefault();
      try {
         let nextApprovedlevel = "";
         if (approved_level === "HOD") {
           nextApprovedlevel = "AR";
         } else if (approved_level === "AR") {
           nextApprovedlevel = "Dean";
         }
         console.log(nextApprovedlevel);
     
         // Use the nextApprovedlevel variable directly in the network request
         response = await axios.put(`http://localhost:9090/api/approvalLevel/updateApprovalLevelByDean/${level}/${semester}/${new Date().getFullYear()}/${nextApprovedlevel}`);
     
         toast.success("Approval level updated successfully");
       
         setTimeout(() => {
          history.goBack();
      }, 3000);
      } catch (error) {
         if (error.code === 'ERR_NETWORK') {
           setError("Network error. Please check your network connection");
           console.error("Network error: ", error);
           toast.error("Network error. Please check your network connection");
         } else {
            setError("Failed to update approval level");
           console.error("Error updating approval level: ", error);
           toast.error("Failed to update approval level");
         }
      }
     };
     

    return (
        <div className="container">
          {finalResults.length !== 0 ? (
            <>
              <div className="py-4" style={{ marginTop: "70px" }}>
                <table className="overflow-x-scroll table border shadow" style={{ marginTop: "60px" }}>
                 <thead>
                    <tr>
                      <th scope="col">Student ID</th>
                      {courses.map((id, index) => (
                        <React.Fragment key={index}>
                          <th>{id}</th>
                          <th>Grade</th>
                        </React.Fragment>
                      ))}
                      <th scope="col">SGPA</th>
                      <th scope="col">CGPA</th>
                    </tr>
                 </thead>
                 <tbody>
                        {finalResults.map((student, index) => (
                            <tr key={index}>
                            <td>{student.student_id}</td>
                            {courses.map((id, index) => {
                                const courseData = student.courses.find(
                                (c) => c.course_id === id
                                );
                                return (
                                <React.Fragment key={index}>
                                    <td>{courseData ? courseData.overall_score : "-"}</td>
                                    <td>{courseData ? courseData.grade : "-"}</td>
                                </React.Fragment>
                                );
                            })}
                            {studentGPA.map((gpa, index) => {
                                    if(gpa.student_id === student.student_id){
                                        return (
                                            <React.Fragment key={index}>
                                                <td>{gpa.sgpa}</td>
                                                <td>{gpa.cgpa}</td>
                                            </React.Fragment>
                                        );
                                    }
                            })}
                             
                            </tr>
                        ))}
                 </tbody>
                </table>
              </div>

            <form onSubmit={handleSubmit}>
              <input to={``} type="submit" value="Request Certify" className="btn btn-outline-success btn-sm" id="submitbtn" /> <br/><br/>
            </form>
            <ToastContainer />
            </>
          ) : (
           
            <div className=' container' style={{ marginTop: '150px' }}>
              <div className="alert alert-primary" role="alert">
                {`No data found for  level ${level} and semester ${semester} to Approve`} 
                <br/>
                {error}
              </div>
            </div>
          )}
        </div>
      );
}
