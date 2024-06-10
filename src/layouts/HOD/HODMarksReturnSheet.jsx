import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { NavebarHOD } from './NavebarHOD';
import SignatureCanvas from 'react-signature-canvas';
import { useDropzone } from 'react-dropzone';
import { NavebarAR } from '../Components/AR/NavBarAR/NavebarAR';

import { useOktaAuth } from "@okta/okta-react";
import { NavebarDean } from '../Dean/NavebarDean';
import NavBarCC from '../CourseCoordinator/NavBarCC';
import SignatureForApproval from '../Components/SignatureForApproval';
import { fetchAcademicYear, loadAcademicYearFromLocal, saveAcademicYearToLocal } from '../../AcademicYearManagerSingleton';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



export default function HODMarksReturnSheet(props) {
    const [marks, setMarks] = useState([]);
    const [evaluationCriteria, setEvaluationCriteria] = useState([]);
    const [calculations, setCalculations] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const[grade, setGrade] = useState([]);
    const [noData, setNoData] = useState(false); // State to indicate if there is no data to display
    const { course_id, course_name,department } = useParams();
    const {approved_level}=props;
    const history = useHistory();
    const [url,setUrl] = useState()
    const[newSignature, setNewSignature] = useState("");
    const[loading,setLoading]=useState(false);
    const [academicDetails, setAcademicDetails] = useState(loadAcademicYearFromLocal);
    const[academicYear,setAcademicYear]=useState("")
    const[approval_level,setApprovalLevel]=useState(approved_level);
    const[marksSheet,setMarksSheet]=useState([])
    console.log(marksSheet)
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const seenKeys = new Set();
    const seenKeysFA = new Set();
    const seenKeysForTHFA = new Set();
    const seenKeysForTHCA = new Set();

    
    let forCA = 0;
    let forFA = 0;
    
    const [isCClevel,setISCClevel]=useState({
        id: "",
        course_id: "",
        approved_user_id:"",
        approval_level: "",
        academic_year: "",
        date_time: "",
        department_id: "",
        signature: ""
    });
    const [isLeclevel,setISLeclevel]=useState({
        id: "",
        course_id: "",
        approved_user_id:"",
        approval_level: "",
        academic_year: "",
        date_time: "",
        department_id: "",
        signature: ""
    });
    const [isHODlevel,setISHODlevel]=useState({
        id: "",
        course_id: "",
        approved_user_id:"",
        approval_level: "",
        academic_year: "",
        date_time: "",
        department_id: "",
        signature: ""
    });
    ;

    const { oktaAuth, authState } = useOktaAuth();
    const userNameAuth = authState?.idToken?.claims.preferred_username;

    useEffect(() => {
        const fetchAndSaveYear = async () => {
          const details = await fetchAcademicYear();
          if (details) {
            saveAcademicYearToLocal(details);
            setAcademicDetails(details);
            setAcademicYear(details.current_academic_year)
          }
        };
    
        fetchAndSaveYear();
      }, []);
    
    const saveDigitalSignature = (url) => {
        setNewSignature(url); 
        setUrl(url);    
    };
    
   


    let CAAvailable = false;


    let headersData = [];
    let headerValue= [];

    let nextApprovedlevel = "";
         if(approval_level==="finalized") {
            nextApprovedlevel="course_coordinator";
         } else if (approval_level === "course_coordinator") {
           nextApprovedlevel = "lecturer";
         } else if (approval_level === "lecturer") {
           nextApprovedlevel = "HOD";
         }
         else if (approval_level === "HOD") {
            nextApprovedlevel = "AR";
          }

    const approval={
        "course_id": course_id,
        "approved_user_id":userNameAuth,
        "approval_level":nextApprovedlevel,
        "academic_year":academicYear,
        "date_time":new Date(),
        "department_id":department,
        "signature":newSignature
    }

// Modify your useEffect to set loading to false only after all Axios calls are completed
useEffect(() => {
    fetchData();
}, [course_id]);


    const fetchData = async () => {
        
        try {

            const response = await axios.get(`http://localhost:9090/api/marksReturnSheet/getMarks/${course_id}`);
            setMarksSheet(response.data);
            console.log(marksSheet)
            // const listPromises = [
            //     axios.get(`http://localhost:9090/api/evaluationCriteria/getCriteria/${course_id}`),
            //     axios.get(`http://localhost:9090/api/StudentAssessment/get/scoreByCourseId/${course_id}`),
            //     axios.get(`http://localhost:9090/api/marksCalculations/getMarksCalculation/${course_id}`),
            //     axios.get(`http://localhost:9090/api/studentMarks/getStudentMarksbyCourse/${course_id}`),
            //     axios.get(`http://localhost:9090/api/studentRegCourses/getStudentsByCourse/${course_id}`)
            // ];

            // const [criteria, marks, calculations, grade, studentList] = await Promise.all(listPromises);

            // setEvaluationCriteria(criteria.data || []);
            // setMarks(marks.data || []);
            // setCalculations(calculations.data || []);
            // setGrade(grade.data?.content || []);
            // setStudentList(studentList.data || []);

            setLoading(false); // Set loading to false after all data is fetched
        } catch (error) {
            setNoData(true); // Set noData to true if there is an error
        }

    };


    useEffect(() => {
        SigFunc();
    },[course_id,academicYear]);

    const SigFunc = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/api/approvalLevel/getSignature/${course_id}/course_coordinator/${academicYear}`);
                setISCClevel(response.data.content);

                const response1 = await axios.get(`http://localhost:9090/api/approvalLevel/getSignature/${course_id}/lecturer/${academicYear}`);
                setISLeclevel(response1.data.content);

                const response2 = await axios.get(`http://localhost:9090/api/approvalLevel/getSignature/${course_id}/HOD/${academicYear}`);
                setISHODlevel(response2.data.content);
            } catch (error) {
                console.error('Error fetching signature data:', error);
            }
       
    }


    



    console.log(marksSheet)

    // useEffect(() => {
    //     fetchCCSignature();
    //     fetchcheckedbySignature();
    //     fetchHODSignature();
    // }, [course_id,academicYear]);
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const response = await axios.post(`http://localhost:9090/api/approvalLevel/updateApprovalLevel`,approval);
            if (response.status === 200) {
                console.log("Approval level updated successfully");
                setApprovalLevel(nextApprovedlevel)
                console.log(approval_level)
            } else {
                console.error("Failed to update approval level");
            }
        } catch (error) {
            console.error("Error updating approval level: ", error);
        }
    };



    const handleReturn = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        history.goBack(); // Navigate back
    };
    

    const downloadPDF = () => {
        const input = document.getElementById('marks-return-sheet');
        html2canvas(input)
            .then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 10, 10);
                pdf.save(`${course_name}-${course_id}-Marks-Return-Sheet.pdf`);
            })
            .catch(error => {
                console.error('Error generating PDF: ', error);
            });
    };
    
    

    marksSheet.map((ele, index) => (
        ele.ca.map((caScore, idx) => {
            if (!seenKeysForTHCA.has(caScore.key)) {
                console.log(caScore.key);
                forCA++
                seenKeysForTHCA.add(caScore.key); // Mark this key as seen
            }
            
        })
    ))

    

    marksSheet.map((ele, index) => (
        ele.end.map((endScore, idx) => {
            if (!seenKeysForTHFA.has(endScore.key)) {
                console.log(endScore.key);
                forFA++
                seenKeysForTHFA.add(endScore.key); // Mark this key as seen
            }
            
        })
    ))

    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await axios.get('http://localhost:9090/api/lecreg/get/alllecturersdetails');
            setData(result.data);
            console.log(result.data)
            setFilteredData(result.data); // Initially, all data is considered as filtered
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);

      const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        const filtered = data.filter(item =>
            item.user_id.toString().toLowerCase().includes(event.target.value.toLowerCase())
          );
        setFilteredData(filtered);
      };

      const handleClick = (userId) => {
        setSearchTerm(userId);
      }


console.log(authState?.accessToken?.claims.userType);

    return (
        <>
            {/* <NavebarHOD /> */}
            {
                authState?.accessToken?.claims.userType == "HOD" ? <NavebarHOD/> : 
                authState?.accessToken?.claims.userType == "course_coordinator" ? <NavBarCC/> :
                authState?.accessToken?.claims.userType == "dean" ? <NavebarDean/>:
                authState?.accessToken?.claims.userType == "ar" ? <NavebarAR/> : null
            }
            
            
            {loading ? (
                <div>Loading...</div> // Display a loading message or spinner here
            ) : (
                <>
                <div id="marks-return-sheet" style={{ marginTop: "70px",width:"95%",marginLeft:"40px",marginRight:"40px",}}>
                        <div >
                        <div>
                            <div >
                                <form onSubmit={handleReturn}>
                                    <input
                                        type='submit'
                                        value="Return Mark Sheet"
                                        className="btn shadow btn-outline-success btn-sm float-end my-4"
                                        id="submitbtn"
                                        style={{ float: 'right', width: '130px' }}
                                    />
                                </form>
                            </div>
                            <div>
                                <div>
                                    <table>
                                        <tr>
                                            <td class="text-decoration-underline font-italic"><h2><i>Mark Return Sheet:</i></h2></td>
                                        </tr>
                                        <tr>
                                            <td><p><b>Marks Obtained by the Candidate for:</b></p></td>
                                        </tr>
                                    </table>
                                        <div style={{display:"flex"}}>
                                            <p><b>Academic Year: {academicYear}</b></p>
                                            <p className=' mx-5'><b>Degree: Bachelor of Information and Communication Technology Honours Degree </b> </p>
                                            <p className=' mx-2'><b>{academicDetails.current_semester === "1" ? "1st" : "2nd"} Semester Examination: December 2023 </b> </p>  
                                        </div>
                                       
                                    
                    <h4>Course code and Title : {course_name} - {course_id}</h4>
                    </div>


                    <div className=''>
                        {/*  style={{overflow:"auto",width:"100%",height:"500px"}} */}
                    <table className="table shadow table-bordered" style={{ marginTop: "30px", width: '80%' }}>
                    {/* <thead>
                    <tr>
                      <th scope="col">Student_ID</th>
                      {
                          
                          evaluationCriteria.map((evaluationCriteria, index) => {
                              let headers = [];
                              
                              if (evaluationCriteria.type == "CA") {
                                  CAAvailable = true;
                                  if (evaluationCriteria.no_of_conducted > 1) {
                                      marks.map((ele, index) => {
                                          if (ele.evaluation_criteria_id == evaluationCriteria.evaluationcriteria_id) {
                                             
                                                  headers.push(<th key={`${index}`} scope="col">{ele.assignment_name}</th>);
                                                  headersData.push(ele.assignment_name)
                                              
                                          }
                                      });
                                      // calculations.map((ele, index) => {
                                         
                                          headers.push(<th key={`${index}`} scope="col">{evaluationCriteria.description}</th>);
                                          headersData.push(evaluationCriteria.description)
                                          headers.push(<th scope="col">{ evaluationCriteria.percentage}% from  {evaluationCriteria.description}</th>);
                                          headersData.push(`${evaluationCriteria.percentage}% from  ${evaluationCriteria.description}`)
                                          
                                      // });
                                  } else {
                                      marks?.map((ele, index) => {
                                          if (ele.evaluation_criteria_id == evaluationCriteria.evaluationcriteria_id) {
                                             
                                                  headers.push(<th key={`${index}`} scope="col">{ele.assignment_name}</th>);
                                                  headersData.push(ele.assignment_name)
                                              
                                          }
                                      });

                                      headers.push(<th scope="col">{ evaluationCriteria.percentage}% from  {evaluationCriteria.assessment_type}</th>);
                                      headersData.push(`${evaluationCriteria.percentage}% from  ${evaluationCriteria.assessment_type}`)

                                  }   
                              }
                              return headers;
                          }).flat()
                      }

                      
                      {CAAvailable ? <th scope="col">Total CA Marks</th> : null}
                      

                      {
                          evaluationCriteria.map((evaluationCriteria, index) => {
                              let headers = [];
                              if (evaluationCriteria.type == "End") {
                                  marks.map((ele, index) => {
                                      if (ele.evaluation_criteria_id == evaluationCriteria.evaluationcriteria_id) {
                                          
                                              headers.push(<th key={`${index}`} scope="col">{ele.assignment_name}</th>);
                                              headersData.push(ele.assignment_name)

                                         
                                              if ( ele.assignment_name !== "1st Marking" && ele.assignment_name !== "2nd Marking") {
                                                  headers.push(<th scope="col">{evaluationCriteria.percentage}% from {evaluationCriteria.assessment_type}</th>);
                                                  headersData.push(`${evaluationCriteria.percentage}% from ${evaluationCriteria.assessment_type}`)
                                              }
                                      
                                      }
                                  }).flat();
                              }
                             
                              return headers;
                          }).flat()
                      }
                     
                      <th scope="col">Total Final Marks</th>  
                      <th scope="col">Total Rounded Marks</th>
                      <th scope="col">Results/Grades</th>
                      <th scope="col">GPV</th>
                                  
                      <th>Remarks,Continuous Assessment Pass/Fail</th>
                      <th>View</th>
                  </tr>
                  
                 </thead> */}
                    <thead>
                        
                            <tr>
                            
                                <th rowSpan='2'>Student_ID</th>
                                <th colSpan={forCA}>Continuous Assessment</th>
                                <th colSpan={forFA}>Semester End Exam</th>
                                <th colSpan='4'>Final Marks</th>
                                <th rowSpan='2'>CA Eligibility</th>
                                <th rowSpan='2'>View</th>
                            </tr>
                            <tr>
                            {marksSheet.map((ele, index) =>
                                ele.ca.map((caScore, idx) => {
                                    // Check if the key has already been seen
                                    if (!seenKeys.has(caScore.key)) {
                                    // Log the key to the console
                                    console.log(caScore.key);

                                    // Add the key to seenKeys to mark it as seen
                                    seenKeys.add(caScore.key);

                                    // Return the JSX only if the condition is met
                                    return <th key={`ca-${idx}`}>{caScore.key}</th>;
                                    }

                                    // If the condition is not met, return null or an alternative JSX
                                    // Returning null effectively skips rendering for this iteration
                                    return null;
                                })
                                )}

                                {/* {marksSheet.map((ele, index) => (
                                    ele.ca.map((caScore, idx) => (
                                        
                                        <th  key={`ca-${idx}`}>{caScore.key}{console.log(caScore.key)}</th>
                                        
                                        
                                    ))
                                ))} */}
                                
                                {marksSheet.map((ele, index) => (
                                    ele.end.map((endScore, idx) => {
                                        // Check if the key has already been seen
                                        if (!seenKeysFA.has(endScore.key)) {
                                        // Log the key to the console
                                        console.log(endScore.key);

                                        // Add the key to seenKeys to mark it as seen
                                        seenKeysFA.add(endScore.key);

                                        return <th key={`end-${idx}`}>{endScore.key} </th>
                                        }
                                    })
                                ))}
                             
                                <th>Total Final Marks</th>
                                <th>Total Rounded Marks</th>
                                <th>Results/Grades</th>
                                <th>GPV</th>
                                
                           
                                 {/* {console.log(ele.student_id,ele.total_ca_mark,ele.total_final_mark,ele.total_rounded_mark,ele.grade,ele.gpv,ele.ca_eligibility)} */}
                            </tr>
                    </thead>
                    

                      <tbody>
                      {marksSheet.map((ele, index) => (
                        <tr key={index}>
                            <td>{ele.student_id}</td>
                            {ele.ca.map((caScore, idx) => (
                                <td key={`ca-${idx}`}>{caScore.value}</td>
                            ))}
                            {ele.end.map((endScore, idx) => (
                                <td key={`end-${idx}`}>{endScore.value}</td>
                            ))}
                            
                            <td>{ele.total_final_mark}</td>
                            <td>{ele.total_rounded_mark}</td>
                            <td>{ele.grade}</td>
                            <td>{ele.gpv}</td>
                            <td>{ele.ca_eligibility}</td>
                            <td><Link className=" btn btn-primary mx-3 btn-sm" to={`/MarksCheckingForm/${ele}/${course_id}/${course_name}`}>View</Link></td>
                            {console.log(ele.student_id,ele.total_ca_mark,ele.total_final_mark,ele.total_rounded_mark,ele.grade,ele.gpv,ele.ca_eligibility)}
                        </tr>))}
                      </tbody>
                    {/* <tbody>
                  {
                      studentList.map((ele, index) => (
                          <tr>
                              <td scope="col" key={index}>{ele}</td>
                              {
                                  evaluationCriteria.map((evaluationCriteria, index) => {
                                      let headers = [];
                                      if (evaluationCriteria.type == "CA") {
                                          if (evaluationCriteria.no_of_conducted > 1) {
                                              marks.map((mark, index) => {
                                                  if (mark.student_id == ele) {
                                                      if (evaluationCriteria.evaluationcriteria_id == mark.evaluation_criteria_id) {
                                                          headers.push(<td key={`${index}`} scope="col">{mark.assignment_score ? mark.assignment_score: "-"}</td>);
                                                      }
                                                  }
                                              });
                                              calculations.map((cal, index) => {
                                                  if (ele == cal.student_id) {
                                                      if (cal.evaluation_criteria_id == evaluationCriteria.evaluationcriteria_id) {
                                                          headers.push(<td key={`${index}`} scope="col">{cal.mark? cal.mark: "-"}</td>);
                                                      }
                                                  }
                                              });
                                          } else {
                                              marks.map((marks, index) => {
                                                  if (ele == marks.student_id) {
                                                      if (marks.evaluation_criteria_id == evaluationCriteria.evaluationcriteria_id) {
                                                          headers.push(<td key={`${index}`} scope="col">{marks.assignment_score? marks.assignment_score: "-"}</td>);
                                                      }
                                                  }
                                              });
                                          }
                                          calculations.map((cal, index) => {
                                              if (ele == cal.student_id) {
                                                  if (cal.evaluation_criteria_id == evaluationCriteria.evaluationcriteria_id) {
                                                      headers.push(<td key={`${index}`} scope="col">{cal.percentage? cal.percentage: "-"}</td>);
                                                  }
                                              }
                                          });
                                      }
                                      return headers;
                                  }).flat()
                              }
                              {
                                  grade?.map((grade, index) => {
                                      let headers = [];
                                      if (grade.student_id == ele) {
                                         
                                              headers.push(<td key={`${index}`} scope="col">{grade.total_ca_mark? grade.total_ca_mark: "-"}</td>);
                                      }
                                      return headers;
                                  }).flat()
                              }
                             
                              {
                                  evaluationCriteria.map((evaluationCriteria, index) => {
                                      let headers = [];
                                      if (evaluationCriteria.type == "End") {
                                          marks.map((mark, index) => {
                                              if (mark.student_id == ele) {
                                                  if (mark.evaluation_criteria_id == evaluationCriteria.evaluationcriteria_id) {
                                                      headers.push(<td key={`${index}`} scope="col">{mark.assignment_score? mark.assignment_score: "-"}</td>);
                                                      headerValue.push(mark.assignment_score? mark.assignment_score: "-")
                                                      calculations.map((calculations, index2) => {
                                                          if (calculations.student_id == ele) {
                                                              if (evaluationCriteria.evaluationcriteria_id == calculations.evaluation_criteria_id && mark.assignment_name !== "1st Marking" && mark.assignment_name !== "2nd Marking") {
                                                                  headers.push(<td key={`${index2}`} scope="col">{calculations.percentage? calculations.percentage: "-"}</td>);
                                                              }
                                                          }
                                                      });
                                                  }
                                              }
                                          }).flat()
                                      }
                                      return headers;
                                  }).flat()
                              }
                              {
                                  grade?.map((grade, index) => {
                                      if (grade.student_id == ele) {
                                          let headers = [];
                                          headers.push(<td key={`${index}`} scope="col">{grade.total_final_mark? grade.total_final_mark: "-"}</td>);
                                          headers.push(<td key={`${index}`} scope="col">{grade.total_rounded_mark? grade.total_rounded_mark: "-"}</td>);
                                          headers.push(<td key={`${index}`} scope="col">{grade.grade? grade.grade: "-"}</td>);
                                          headers.push(<td key={`${index}`} scope="col">{grade.gpv? grade.gpv :  "-"}</td>);
                                          headers.push(<td key={`${index}`} scope="col">{grade.ca_eligibility?  grade.ca_eligibility:"-"}</td>);
                                          return headers;
                                      }
                                  }).flat()
                              }
                              <td>
                              <Link className=" btn btn-primary mx-3 btn-sm" to={`/MarksCheckingForm/${ele}/${course_id}/${course_name}`}>View</Link>
                              </td>
                          </tr>
                      ))
                  }
                      </tbody> */}
                 </table>
                     </div>
          
          
              <div style={{float:"left",marginTop:"50px"}}>
                  
                  <div>
                      {console.log(nextApprovedlevel)}
                      <table>
                          <tr>
                              <td >Coordinator/ Examinar :</td>
                              <td></td>
                              <td>Sign:</td>
                              <td>
                                  {nextApprovedlevel == "course_coordinator" ? <img src={url} style={{ width: '80px', height: '40px' }} /> : 
                                  isCClevel.signature != null ? <img src={isCClevel.signature} style={{ width: '80px', height: '40px' }} /> : null
                                  }

                              </td>
                              <td>Date:</td>
                              <td>{isCClevel.date_time != null ? isCClevel.date_time:null}</td>
                          </tr>
                          <tr>
                              <td>Checked by :</td>
                              <td></td>
                              <td>Sign:</td>
                              <td>
                                  {nextApprovedlevel == "lecturer" ? <img src={url} style={{ width: '80px', height: '40px' }} /> :
                                   isLeclevel.signature != null ? <img src={isLeclevel.signature} style={{ width: '80px', height: '40px' }} /> : null
                                  }
                                  
                              </td>
                              <td>Date:</td>
                              <td>{isLeclevel.date_time != null ? isLeclevel.date_time:null}</td>
                          </tr>
                          <tr>
                              <td>Head of the Department : </td>
                              <td></td>
                              <td>Sign:</td>
                              <td>
                                  {nextApprovedlevel == "HOD" ? <img src={url} style={{ width: '80px', height: '40px' }} /> : 
                                  isHODlevel.signature != null ? <img src={isHODlevel.signature} style={{ width: '80px', height: '40px' }} /> : null
                              }
                              </td>
                              <td>Date:</td>
                              <td>{isHODlevel.date_time != null ? isHODlevel.date_time:null}</td>
                          </tr>
                      </table>
                    </div>
                    
                    {
                        nextApprovedlevel === "course_coordinator" ? 
                        <div>
                            <hr />
                            <div>
                                <input
                                    className='form-control'
                                    type="text"
                                    placeholder="Search by Lecturer ID..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                
                                    
                                <div className='list-group'>
                                {filteredData.length > 0? (
                                    filteredData.map((item, index) => (
                                        searchTerm == ''?
                                        null
                                        : <button  key={index} type="button" className="list-group-item list-group-item-action"  onClick={() => handleClick(item.user_id)}>{item.user_id} - {item.name_with_initials}</button >
                                    ))
                                    ) : (
                                        <button  type="button" className="list-group-item list-group-item-action">No results found.</button >
                                )}
                                </div>
                            </div>
                        </div>
                        :
                        null
                            
                    }
                  <hr />
                    <div style={{marginTop:"10px",float:"right"}}>
                        
                        <form onSubmit={handleSubmit}>
                            <input to={``} type="submit" value="Send" className="btn btn-outline-success btn-sm"  id="submitbtn" style={{ width: '100px'}}/> <br /><br />
                        </form>


                    </div>

              </div>
              <div style={{float:"right",marginTop:"50px"}}>
                {
                    approval_level === "finalized" ||
                    approval_level === "course_coordinator" ||
                    approval_level === "lecturer" ? (
                        <SignatureForApproval saveDigitalSignature={saveDigitalSignature} />
                    ) : null}
            </div>
            


          </div>
              
            </div>
            
                   

                    
              </div>

                
              

          </div>
                    

                    {approval_level === "HOD" ? (
                        <button onClick={downloadPDF} className="btn btn-primary mt-3">
                            Download Marks Return Sheet
                        </button>
                    ):null}

                </>
            )}
        </>
    )
    
}
