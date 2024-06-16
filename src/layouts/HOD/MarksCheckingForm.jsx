import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import { green } from '@mui/material/colors';
import { NavebarHOD } from './NavebarHOD';
import NavBarCC from '../CourseCoordinator/NavBarCC';
import { NavebarDean } from '../Dean/NavebarDean';
import { NavebarAR } from '../Components/AR/NavBarAR/NavebarAR';
import { useOktaAuth } from "@okta/okta-react";



export default function MarksCheckingForm() {
  const history = useHistory();
  const [text, setText] = useState('');
  const[noData,setNoData]=useState('')
  const { oktaAuth, authState } = useOktaAuth();




  const [attendanceEligibility, setAttendenceEligibility] = useState({
    id: "",
    student_id: "",
    course_id: "",
    percentage: "",
    eligibility: ""
  });


const location=useLocation()

const {course_id, course_name } = useParams();
const{ele}=location.state;

const student_id=ele.student_id

console.log(ele)







  

  useEffect(() => {
    Eligi();
  }, [course_id, student_id]);







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
      {
                authState?.accessToken?.claims.userType == "HOD" ? <NavebarHOD/> : 
                authState?.accessToken?.claims.userType == "course_coordinator" ? <NavBarCC/> :
                authState?.accessToken?.claims.userType == "dean" ? <NavebarDean/>:
                authState?.accessToken?.claims.userType == "ar" ? <NavebarAR/> : null
      }
      <div className=' bg-white' style={{marginTop:"70px"}}>
      <h2 style={{marginLeft:"30px"}}>{student_id} {ele.student_name}</h2>
      <h3 style={{marginLeft:"30px"}}>{course_id} {course_name}</h3>
      
        <div class="container bg-transparent">
          <div class="row">
            <div class="col text-center">
              <table className="table shadow" style={{ marginTop: "50px" }}>
                <tbody>
                  <tr>
                    <th scope="col" >Assessment Type</th>
                    <th scope="col">Assessment Score</th>
                  </tr>


                  {
                    ele.ca.map((e)=>
                    (<tr>
                      {
                        console.log(e)
                      }
                      <td scope="col" style={{ textAlign: 'left',fontWeight: e.description === "score" ? 'normal' : 'bold' }}>{e.key}</td>
                      <td scope="col" style={{ textAlign: 'left',fontWeight:  e.description=="score"? 'normal' : 'bold'  }}>{e.value}</td>
                      {
                        console.log(e.description)
                      }
                    </tr>
                      
                    ))
                  }

                  {
                    

                    ele.end.map((e)=>
                      (<tr>
                        <td scope="col" style={{ textAlign: 'left',fontWeight: e.description === "score" ? 'normal' : 'bold' }}>{e.key}</td>
                        <td scope="col" style={{ textAlign: 'left',fontWeight: e.description === "score" ? 'normal' : 'bold' }}>{e.value}</td>
                      </tr>
                        
                      ))
                  }

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
                    <input className=' mx-4' size="5"  type='text' value={ele.total_ca_mark} disabled />
                    </td>
                    <td>CA Eligibility</td>
                    <td><input type='text' className=' mx-4' size="5" value={ele.ca_eligibility} disabled /></td>
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
                      {(ele.ca_eligibility == "Eligible" && attendanceEligibility.eligibility == "Eligible") ? <input type='text' className=' mx-4' size="5" value="Eligible" disabled /> : <input type='text' className=' mx-4' size="5" value="Not Eligible" disabled />}        
                     
                    </td>
                  </tr>
                </table>
              </div>
              <div>
                <div className="py-4 px-5" class="col shadow mt-4 p-4">
                  <label>Final Marks </label>
                  <input type='text' className=' mx-3' value={ele.total_rounded_marks} disabled />
                  <label>Grade </label>
                  <input type='text' className=' mx-3' value={ele.grade} disabled />
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
