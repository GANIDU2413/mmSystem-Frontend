import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom'
import SignatureForApproval from '../../Components/SignatureForApproval';
import { useOktaAuth } from '@okta/okta-react';

export default function DeanFinalMarkSheet(props ) {
    const [finalResults, setFinalResults] = useState([]);
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const { level,semester,dept} = useParams();
    const[studentGPA, setStudentGPA] = useState([{}]);
    const history =useHistory();
    const[error, setError] = useState("");
    const {approved_level}=props
    const [newSignature, setNewSignature] = useState(""); 
    const[nextApprovedlevel,setNextApprovedlevel]=useState("");
    const { oktaAuth, authState } = useOktaAuth();
    const userNameAuth = authState?.idToken?.claims.preferred_username;
    
    const approval={
      "level": level,
      "semester":semester,
      "approved_user_id":userNameAuth,
      "approval_level":approved_level,
      "academic_year":2024,
      "date_time":new Date(),
      "department_id":dept,
      "signature":newSignature
  }

    
    const resultSheet = async () => {
        try {

          if (approved_level == "HOD") {
            setNextApprovedlevel("AR");
          } else if (approved_level == "AR") {
            setNextApprovedlevel("Dean");
          }
          console.log(approved_level,nextApprovedlevel);
      
            const result = await axios.get(`http://localhost:9090/api/studentMarks/GetApprovedMarksByLS/${level}/${semester}/${approved_level}/${dept}`);
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
                        overall_score: curr.total_rounded_mark,
                        grade: curr.grade,
                    });
                } else {
                  
                    acc.push({
                        student_id: curr.student_id,
                        courses: [{
                            course_id: curr.course_id,
                            overall_score: curr.total_rounded_mark,
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
        console.log(approval.academic_year,approval.approval_level,approval.approved_user_id,approval.date_time,approval.department_id,approval.level,approval.semester,approval.signature);
         // Use the nextApprovedlevel variable directly in the network request
         response = await axios.post(`http://localhost:9090/api/approvalLevel/updateApprovalLevelByDean`,approval);
     
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

     const saveDigitalSignature = (url) => {
      setNewSignature(url); 
        
  };
  
      console.log(newSignature)
     

    return (
      <div className="container">
      {finalResults.length !== 0 ? (
        <>
        <div>
          <h2>University of Ruhuna</h2>
          <h2>Faculty of Technology</h2>
          <h2>Bachelor of Information and Communication Technology Honours Degree</h2>
          <h2>Level {level} Semester {semester}-Nov/Dec 2023 (Academic year 2021/2022)</h2>
          <h4>Provisional results subject to confirmation by the Senate</h4>
        </div>


        <div>
          <p>Key to Grading</p>
          <table>
            <tbody>
              <tr>
                <td>A+</td>
                <td>4.00</td>

                <td>A</td>
                <td>4.00</td>
              </tr>
              <tr>
                <td>A-</td>
                <td>3.70</td>

                <td>B+</td> 
                <td>3.30</td>
              </tr>
              <tr>    
                <td>B</td>
                <td>3.00</td>
              
                <td>B-</td> 
                <td>2.70</td> 
                </tr>

                <tr>
                <td>C+</td>
                <td>2.30</td>

                <td>C</td>  
                <td>2.00</td>
              </tr>
              <tr>
                <td>C-</td>
                <td>1.70</td>
                </tr>
                <tr>
                <td>D+</td> 
                <td>1.30</td> 

                <td>D</td>
                <td>1.00</td>

                </tr>
                <tr>
                <td>E</td>
                <td>0.00</td>
                </tr>

                <tr>
                <td>F</td>
                <td>CA Fail</td>
                </tr>
                
                <tr><td>MC</td><td>Accepted Medical Certificate</td></tr>
                <tr><td>AC</td><td>Accepted Academice Concession(Acceptable reason by the Senate other than the Medical)</td></tr>
                <tr><td>WH</td><td>Results Withheld</td></tr>
                <tr><td>E*</td><td>Not Eligible/Not Applied/Absent without Medical</td></tr>
            </tbody>
          </table>
        </div>

        <div>
          <table>
            
          </table>
        </div>
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
              const courseData = student.courses.find((c) => c.course_id === id);
              return (
                <React.Fragment key={index}>
                <td>{courseData ? courseData.overall_score : "-"}</td>
                <td>{courseData ? courseData.grade : "-"}</td>
                </React.Fragment>
              );
              })}
              {studentGPA.map((gpa, index) => {
              if (gpa.student_id === student.student_id) {
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

        <div>

            {console.log(nextApprovedlevel)}
          <p>Certified Correct,
            <br/>
            {nextApprovedlevel == "AR" && newSignature && (
            <img src={newSignature} alt="" />
          )}
            <p>Ms H.H Kaumadi Dharmasiri</p>
            <p>Assisstant Registrar</p>
            <p>Faculty of Technology</p>


            {nextApprovedlevel == "Dean" && newSignature ? <img src={newSignature} style={{ width: '80px', height: '40px' }}/>: null}
            <p>Prof. P.K.S.C Jayasinghe</p>
            <p>Dean/Faculty of Technology</p>

            {nextApprovedlevel == "VC" && newSignature && (
            <img src={newSignature} alt="" />)}
            <p>Snr Prof.Sujeewa Amarasena</p>
            <p>Vice Chancellor</p>
            <p>Faculty of Technology</p>
          </p>
        </div>

      
        <SignatureForApproval saveDigitalSignature={saveDigitalSignature} />


        <form onSubmit={handleSubmit}>
          <input
          to={``}
          type="submit"
          value="Request Certify"
          className="btn btn-outline-success btn-sm"
          id="submitbtn"
          // disabled={}
          style={{
            width: "10%",
          }} />
          <br />
          <br />
        </form>
        <ToastContainer />
        </>
      ) : (
        <div className=" container" style={{ marginTop: "150px" }}>
        <div className="alert alert-primary" role="alert">
          {`No data found for  level ${level} and semester ${semester} to Approve`}
          <br />
          {error}
        </div>
        </div>
      )}
      </div>
    );
}
