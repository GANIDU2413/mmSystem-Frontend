import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { NavebarHOD } from './NavebarHOD';
import { useOktaAuth } from "@okta/okta-react";
import SignatureForApproval from '../Components/SignatureForApproval';

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
    // const [showSignatureSection, setShowSignatureSection] = useState(false);
    // const [showUploadSection, setShowUploadSection] = useState(false);
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
  
    const academic_year=2024;

 

    const userNameAuth = authState?.idToken?.claims.preferred_username;
    
    const saveDigitalSignature = (url) => {
        setNewSignature(url); 
        setUrl(url);    
    };
    
    
    
console.log(newSignature)
    
    


    let CAAvailable = false;


    let headersData = [];
    let headerValue= [];

    let nextApprovedlevel = "";
         if(approved_level==="finalized") {
            nextApprovedlevel="course_coordinator";
         } else if (approved_level === "course_coordinator") {
           nextApprovedlevel = "lecturer";
         } else if (approved_level === "lecturer") {
           nextApprovedlevel = "HOD";
         }

         console.log(approved_level,nextApprovedlevel)
        
    

    const approval={
        "course_id": course_id,
        "approved_user_id":userNameAuth,
        "approval_level":nextApprovedlevel,
        "academic_year":academic_year,
        "date_time":new Date(),
        "department_id":department,
        "signature":newSignature
    }

    console.log(saveDigitalSignature)
   
  

// Modify your useEffect to set loading to false only after all Axios calls are completed
useEffect(() => {
    const fetchData = async () => {
        try {
            const listPromises = [
                axios.get(`http://localhost:9090/api/evaluationCriteria/getCriteria/${course_id}`),
                axios.get(`http://localhost:9090/api/StudentAssessment/get/scoreByCourseId/${course_id}`),
                axios.get(`http://localhost:9090/api/marksCalculations/getMarksCalculation/${course_id}`),
                axios.get(`http://localhost:9090/api/studentMarks/getStudentMarksbyCourse/${course_id}`),
                axios.get(`http://localhost:9090/api/studentRegCourses/getStudentsByCourse/${course_id}`)
            ];

            const [criteria, marks, calculations, grade, studentList] = await Promise.all(listPromises);

            setEvaluationCriteria(criteria.data || []);
            setMarks(marks.data || []);
            setCalculations(calculations.data || []);
            setGrade(grade.data?.content || []);
            setStudentList(studentList.data || []);

            setLoading(false); // Set loading to false after all data is fetched
        } catch (error) {
            console.error(error);
            setNoData(true); // Set noData to true if there is an error
        }
    };

    fetchData();
}, [course_id]);

    useEffect(() => {
        const result1 = async () => {
            try {
                const list = await axios.get(`http://localhost:9090/api/studentRegCourses/getStudentsByCourse/${course_id}`);
                setStudentList(list.data);
            } catch (error) {
                console.error(error);
                setNoData(true); // Set noData to true if there is an error
            }
        };
        result1();
    }, [course_id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:9090/api/approvalLevel/updateApprovalLevel`,approval);
            if (response.status === 200) {
                console.log("Approval level updated successfully");
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

    const fetchCCSignature = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/api/approvalLevel/getSignature/${course_id}/course_coordinator/${academic_year}`);
            setISCClevel(response.data.content);
            console.log(response.data.content);
            
        } catch (error) {
            console.error('Error fetching signature data:', error);
        }
    };

    const fetchcheckedbySignature = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/api/approvalLevel/getSignature/${course_id}/lecturer/${academic_year}`);
            setISLeclevel(response.data.content);
            console.log(response.data.content);


        } catch (error) {
            console.error('Error fetching signature data:', error);
        }
    };

    const fetchHODSignature = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/api/approvalLevel/getSignature/${course_id}/HOD/${academic_year}`);
            setISHODlevel(response.data.content);
            console.log(response.data.content);

        } catch (error) {
            console.error('Error fetching signature data:', error);
        }
    };

    useEffect(() => {
        // if (nextApprovedlevel === "course_coordinator") {
        //     fetchCCSignature();
            
        // }
        // if (nextApprovedlevel === "lecturer") {
        //     fetchcheckedbySignature();
        // }
        // if (nextApprovedlevel === "HOD") {
        //     fetchHODSignature();
        // }
        fetchCCSignature();
        fetchcheckedbySignature();
        fetchHODSignature();
    }, [course_id,academic_year]);
    
   
      
console.log(nextApprovedlevel);


    console.log(newSignature)
   

    return (
        <>
            <NavebarHOD />
            {loading? (
                <div>Loading...</div> // Display a loading message or spinner here
            ) : (
                <>
                    <div className=' container' style={{marginTop:"70px"}}>
          
          <div>
              <div >
                  <form onSubmit={handleReturn}>
                  <input
                      type='submit'
                      value="Return Mark Sheet"
                      className="btn shadow btn-outline-success btn-sm float-end my-4"
                      id="submitbtn"
                      style={{ float: 'right', width: '130px'}}
                  />

                  </form>
              </div>
              <table>
                  <tr>
                      <td class="text-decoration-underline font-italic"><p>Mark Return Sheet:</p></td>
                  </tr>
                  <tr>
                      <td><p>Marks Obtained by the Candidate for:</p></td>
                  </tr>
                  <tr>
                      <td>Academic Year:</td>
                      <td></td>
                      <td>Degree:</td>
                      <td></td>
                      <td>2nd Semsester Examination: December 2023</td>
                  </tr>
              </table>
              <h4>Course code and Title : {course_name} - {course_id}</h4>
          </div>


          <div style={{overflow:"auto",width:"100%",height:"500px"}}>
          
          <table className="table shadow table-bordered" style={{ marginTop: "30px", width: '100%' }}>
              <thead>
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
                  {console.log(headersData)}
              </thead>
              <tbody>
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
                                                          headerValue.push(mark.assignment_score ? mark.assignment_score: "-")
                                                      }
                                                  }
                                              });
                                              calculations.map((cal, index) => {
                                                  if (ele == cal.student_id) {
                                                      if (cal.evaluation_criteria_id == evaluationCriteria.evaluationcriteria_id) {
                                                          headers.push(<td key={`${index}`} scope="col">{cal.mark? cal.mark: "-"}</td>);
                                                          headerValue.push(cal.mark? cal.mark: "-")
                                                      }
                                                  }
                                              });
                                          } else {
                                              marks.map((marks, index) => {
                                                  if (ele == marks.student_id) {
                                                      if (marks.evaluation_criteria_id == evaluationCriteria.evaluationcriteria_id) {
                                                          headers.push(<td key={`${index}`} scope="col">{marks.assignment_score? marks.assignment_score: "-"}</td>);
                                                          headerValue.push(marks.assignment_score? marks.assignment_score: "-")
                                                      }
                                                  }
                                              });
                                          }
                                          calculations.map((cal, index) => {
                                              if (ele == cal.student_id) {
                                                  if (cal.evaluation_criteria_id == evaluationCriteria.evaluationcriteria_id) {
                                                      headers.push(<td key={`${index}`} scope="col">{cal.percentage? cal.percentage: "-"}</td>);
                                                      headerValue.push(cal.percentage? cal.percentage: "-")
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
                                              headerValue.push(grade.total_ca_mark? grade.total_ca_mark: "-")
                                             
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
                                                                  headerValue.push(calculations.percentage? calculations.percentage: "-")
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
                                          headerValue.push(grade.total_final_mark? grade.total_final_mark: "-")
                                          headers.push(<td key={`${index}`} scope="col">{grade.total_rounded_mark? grade.total_rounded_mark: "-"}</td>);
                                          headerValue.push(grade.total_rounded_mark? grade.total_rounded_mark: "-")
                                          headers.push(<td key={`${index}`} scope="col">{grade.grade? grade.grade: "-"}</td>);
                                          headerValue.push(grade.grade? grade.grade: "-")
                                          headers.push(<td key={`${index}`} scope="col">{grade.gpv? grade.gpv :  "-"}</td>);
                                          headerValue.push(grade.gpv? grade.gpv :  "-")
                                          headers.push(<td key={`${index}`} scope="col">{grade.ca_eligibility?  grade.ca_eligibility:"-"}</td>);
                                          headerValue.push(grade.ca_eligibility?  grade.ca_eligibility:"-" )
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
              </tbody>
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


                  <form onSubmit={handleSubmit}>
                      <input to={``} type="submit" value="Send" className="btn btn-outline-success btn-sm"  id="submitbtn" style={{ width: '100px'}}/> <br /><br />
                  </form>
              </div>
              <SignatureForApproval saveDigitalSignature={saveDigitalSignature} />

          </div>

                </>
            )}
        </>
    )
    
}
