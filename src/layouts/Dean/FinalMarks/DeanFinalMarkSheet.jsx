import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

export default function DeanFinalMarkSheet() {
    const [finalResults, setFinalResults] = useState([]);
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const { level,semester } = useParams();
    const[studentGPA, setStudentGPA] = useState([{}]);

    const[error, setError] = useState("");

    let approved_level = "HOD";

    
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
              <div className="py-4">
                <button type="submit" className="btn btn-outline-success btn-sm rounded-pill" id="submitbtn">
                   Certify
                </button>
                <button type="button" className="btn btn-outline-danger mx-2 btn-sm rounded-pill" id="clearbtn">
                 Clean
                </button>
              </div>
            </>
          ) : (
            <div className=' container' style={{ marginTop: '150px' }}>
              <div className="alert alert-primary" role="alert">
                {error}
              </div>
            </div>
          )}
        </div>
      );
}
