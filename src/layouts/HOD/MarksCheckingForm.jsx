import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';

export default function MarksCheckingForm() {
  const history = useHistory();
  const [text, setText] = useState('');

  const [marks, setMarks] = useState([
    {
      id: " ",
      stu_id: " ",
      c_id: " ",
      academic_year: " ",
      level: " ",
      semester: " ",
      assignment_score: " ",
      assignment_name: " ",
      assessment_type: " "
    }
  ]);

  const [finalmarks, setfinalMarks] = useState({
    id: " ",
    student_id: " ",
    course_id: " ",
    level: " ",
    semester: " ",
    overall_score: " ",
    grade: " "
  });

  const [attendanceEligibility, setAttendenceEligibility] = useState({
    id: "",
    student_id: "",
    course_id: "",
    percentage: "",
    eligibility: ""
  });

  const [calculations, setCalculations] = useState([
    {
      id: "",
      student_id: "",
      course_id: "",
      type: "",
      mark: "",
      percentage: "",
      description: ""
    }
  ]);

  console.log(calculations);

  const [evaluationCriteria, setEvaluationCriteria] = useState([]);

  const { student_id } = useParams();
  const { course_id } = useParams();

  console.log(course_id);
  console.log(student_id);

  useEffect(() => {
    result();
    resultScoreGrade();
    Eligi();
  }, [course_id, student_id]);

  useEffect(() => {
    result1();
  }, [course_id]);

  const result = async () => {
    try {
      const List = await axios.get(`http://localhost:9090/api/StudentAssessment/get/scorebyStuIDCourseID/${course_id},${student_id}`);
      setMarks(List.data);
      console.log(List.data);
    } catch (error) {
      console.error('Axios request failed:', error);
    }
  };

  const resultScoreGrade = async () => {
    try {
      const finalMarkList = await axios.get(`http://localhost:9090/api/studentMarks/getStudentMarksbySC/${course_id},${student_id}`);
      setfinalMarks(finalMarkList.data.content);
      console.log(finalMarkList.data);
    } catch (error) {
      console.error('Axios request failed:', error);
    }
  };

  const Eligi = async () => {
    try {
      const result = await axios.get(`http://localhost:9090/api/attendanceEligibility/getAttendanceEligibilityByStuIdCourseId/${course_id},${student_id}`);
      setAttendenceEligibility(result.data);
      console.log(result);

      const list3 = await axios.get(`http://localhost:9090/api/marksCalculations/getMarksCalculationByStuID/${course_id},${student_id}`);
      setCalculations(list3.data);
      console.log(list3.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(error);
      }
      console.log(error);
    }
  };

  const result1 = async () => {
    try {
      const list = await axios.get(`http://localhost:9090/api/evaluationCriteria/getCriteria/${course_id}`);
      setEvaluationCriteria(list.data);
      console.log(list.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the function to get the course coordinator's ID
      const cc = await getCourseCoordinatorId(course_id);

      // Create the notification object
      const notification = {
        receiver_id: cc.data.content, // Course coordinator's ID
        course_id: course_id,
        student_id: student_id, // Student ID from useParams
        remark: text, // Remark from the text area
        status: "send", // Status set to "send"
      };

      // Send the notification
      const response = await axios.post(`http://localhost:9090/api/notifications/sendNotification`, notification);
      setText(''); // Clear the text area
      console.log(response.data.message);
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error sending notification:');
      toast.error('Error sending notification');
    }
  };

  // Define the getCourseCoordinatorId function outside of handleSubmit
  const getCourseCoordinatorId = async (course_id) => {
    //API call to fetch course details
    const cc = await axios.get(`http://localhost:9090/api/ccmanage/getCCByCourse/${course_id}`);

    // Assuming the response includes the coordinator's ID
    return cc; // Return the response to be used in handleSubmit
  };

  const handleReturn = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    history.goBack(); // Navigate back
  };

  return (
    <>
      <ToastContainer />
      <div className=' bg-white'>
      <h2>Student ID   :{student_id} </h2>
      
        <div class="container bg-transparent">
          <div class="row">
            <div class="col text-center">
              <table className="table shadow" style={{ marginTop: "50px" }}>
                <tbody>
                  <tr>
                    <th scope="col">Assessment Type</th>
                    <th scope="col">Assessment Score</th>
                  </tr>
                  {evaluationCriteria.map((evaluationCriteria, index) => {
                    let headers = [];
                    if (evaluationCriteria.type == "CA") {
                      if (evaluationCriteria.no_of_conducted > 1) {
                        marks.map((ele, index) => {
                          if (ele.assignment_name == evaluationCriteria.assessment_type) {
                            headers.push(
                              <tr key={`${index}`}>
                                <td scope="col">{ele.assignment_type}</td>
                                <td scope="col">{ele.assignment_score}</td>
                              </tr>
                            );
                          }
                        }).flat();
                        calculations.map((ele, index) => {
                          if (ele.type == evaluationCriteria.assessment_type) {
                            headers.push(
                              <tr key={`${index}`}>
                                <th scope="col">{evaluationCriteria.description}</th>
                                <th scope="col">{ele.mark}</th>
                              </tr>
                            );
                          }
                        });
                      } else {
                        marks.map((ele, index) => {
                          if (ele.assignment_name == evaluationCriteria.assessment_type) {
                            headers.push(
                              <tr key={`${index}`}>
                                <td scope="col">{ele.assignment_type}</td>
                                <td scope="col">{ele.assignment_score}</td>
                              </tr>
                            );
                          }
                        }).flat();
                      }
                      calculations.map((calculations, index) => {
                        if (evaluationCriteria.assessment_type == calculations.type) {
                          headers.push(
                            <tr key={`${index}`}>
                              <th scope="col">{calculations.description}</th>
                              <th scope="col">{calculations.percentage}</th>
                            </tr>
                          );
                        }
                      }).flat();
                    }
                    return headers;
                  }).flat()}
                  {evaluationCriteria.map((evaluationCriteria, index) => {
                    let headers = [];
                    if (evaluationCriteria.type == "End") {
                      marks.map((ele, index) => {
                        if (ele.assignment_name == evaluationCriteria.assessment_type) {
                          headers.push(
                            <tr key={`${index}`}>
                              <td scope="col">{ele.assignment_type}</td>
                              <td scope="col">{ele.assignment_score}</td>
                            </tr>
                          );
                          calculations.map((calculations, index2) => {
                            if (evaluationCriteria.assessment_type == calculations.type && ele.assignment_type !== "1st Marking" && ele.assignment_type !== "2nd Marking") {
                              headers.push(
                                <tr key={`${index2}`}>
                                  <th scope="col">{calculations.description}</th>
                                  <th scope="col">{calculations.percentage}</th>
                                </tr>
                              );
                            }
                          });
                        }
                      }).flat();
                    }
                    return headers;
                  }).flat()}
                  {calculations.map((ele, index) => {
                    let headers = [];
                    if (ele.type == "Final Marks") {
                      headers.push(
                        <tr key={`${index}`}>
                          <td scope="col">{ele.description}</td>
                          <td scope="col">{ele.mark}</td>
                        </tr>
                      );
                    }
                    return headers;
                  }).flat()}
                </tbody>
              </table>
            </div>
            <div class="col" style={{ marginTop: "50px" }}>
              <div className='shadow px-4 py-4'>
                <table className=' pt-4'>
                  <tr>
                    <th>Eligibility</th>
                  </tr>
                  <tr><th><br /></th></tr>
                  <tr>
                    <th>CA Marks</th>
                  </tr>
                  <tr>
                    <td>Total CA Marks</td>
                    <td>
                      {calculations.map((ele, index) => {
                        let headers = [];
                        if (ele.type == "Total CA Mark") {
                          headers.push(
                            <input className=' mx-4' size="5" key={`${index}`} type='text' value={ele.percentage} disabled />
                          );
                        }
                        return headers;
                      }).flat()}
                    </td>
                    <td>CA Eligibility</td>
                    <td><input type='text' className=' mx-4' size="5" value="Eligible" disabled /></td>
                  </tr>
                  <tr><th><br /></th></tr>
                  <tr>
                    <th>Attendance Eligibility</th>
                  </tr>
                  <tr>
                    <td>Attendance</td>
                    <td><input type='text' className=' mx-4' size="5" value={attendanceEligibility.percentage} disabled /></td>
                    <td>Eligibility</td>
                    <td><input type='text' className=' mx-4' size="5" value={attendanceEligibility.eligibility} disabled /></td>
                  </tr>
                  <tr><th><br /></th></tr>
                  <tr>
                    <th>Overall Eligibility</th>
                  </tr>
                  <tr>
                    <td>Eligibility</td>
                    <td>
                      <input type='text' className=' mx-4' size="5" value={attendanceEligibility.eligibility} disabled />
                    </td>
                  </tr>
                </table>
              </div>
              <div>
                <div className="py-4 px-5" class="col shadow mt-4 p-4">
                  <label>Final Marks </label>
                  <input type='text' className=' mx-3' value={finalmarks.overall_score} disabled />
                  <label>Grade </label>
                  <input type='text' className=' mx-3' value={finalmarks.grade} disabled />
                </div>
              </div>
              <div class="col mt-4 shadow p-4">
                <form onSubmit={handleSubmit}>
                  <div>
                    <label for="exampleFormControlTextarea1" class="form-label">Notification</label>
                    <textarea
                      value={text}
                      className='form-control w-100 '
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Type your message here..."
                    />
                    <input type="submit" className={`btn btn-outline-success btn-sm mt-3 ${text ? '' : 'disabled'}`} value="Send" />
                  </div>
                </form>
              </div>
              <div>
                <input onClick={handleReturn} type="button" className="btn shadow btn-outline-success btn-sm w-25 float-end my-4" id="backbtn" value="Back" />
              </div>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
    </>
  );
}
