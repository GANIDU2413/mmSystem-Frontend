import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';
import { Checkbox } from '@mui/material';

export default function MarksCheckingForm() {



  const[marks,setMarks]=useState([{
    id:" ",
    stu_id:" ",
    c_id:" ",
    academic_year:" ",
    level:" ",
    semester:" ",
    assignment_score:" ",
    assignment_name:" ",
    assessment_type:" "}]);

    const[finalmarks,setfinalMarks]=useState({
      id:" ",
      student_id:" ",
      course_id:" ",
      level:" ",
      semester:" ",
      overall_score:" ",
      grade:" "

    });

    const[attendanceEligibility,setAttendenceEligibility]=useState(
      {
        id: "",
        student_id: "",
        course_id: "",
        percentage: "",
        eligibility: ""
      }
    )

    const[calculations,setCalculations]=useState(
      [{
        id:"",
        student_id: "",
        course_id: "",
        type: "",
        mark: "",
        percentage: "",
        description: ""
      }]
    );

    console.log(calculations)

    const[evaluationCriteria,setEvaluationCriteria]=useState([]);

    

  const {student_id}=useParams();
  const {course_id}=useParams();

  console.log(course_id);
  console.log(student_id);




  useEffect(()=>{
    result();
    resultScoreGrade();
    Eligi();
},[course_id,student_id]);

  useEffect(()=>
  {
    result1();
  },[course_id]);


const result = async () => {
  try {
      const List = await axios.get(`http://localhost:9090/api/StudentAssessment/get/scorebyStuIDCourseID/${course_id},${student_id}`);
      setMarks(List.data);
      console.log(List.data);
  } catch (error) {
      console.error('Axios request failed:',error);
  }

};

// const onSubmit = async (e) => {
//   e.preventDefault();
//   await axios.put(
//     `http://localhost:9090/api/StudentAssessment/edit/score/${student_id}`,
//     marks
//   );
//   setRedirect(true);
// };

const resultScoreGrade = async () => {
  try {
      const finalMarkList = await axios.get(`http://localhost:9090/api/studentMarks/getStudentMarksbySC/${course_id},${student_id}`);
      setfinalMarks(finalMarkList.data);
      console.log(finalMarkList.data);
  } catch (error) {
      console.error('Axios request failed:',error);
  }
};


const Eligi=async()=>
{
  const result=await axios.get(`http://localhost:9090/api/attendanceEligibility/getAttendanceEligibilityByStuIdCourseId/${course_id},${student_id}`);
  setAttendenceEligibility(result.data);
  console.log(result);

  const list3=await axios.get(`http://localhost:9090/api/marksCalculations/getMarksCalculationByStuID/${course_id},${student_id}`);
  setCalculations(list3.data);
  console.log(list3.data)

}

const result1 = async()=>{
  try
  {
      const list=await axios.get(`http://localhost:9090/api/evaluationCriteria/getCriteria/${course_id}`);
      setEvaluationCriteria(list.data);

      console.log(list.data);

  }
  catch(error)
  {
      console.error(error);
  }
}





  return (
    <>
          <div>

                <div class="container text-center">
                    <div class="row">
                      <div class="col">
                            <table
                              className="table border shadow"
                              style={{ marginTop: "50px" }}
                            >
                            <thead>
                              <tr>
                                <th scope="col">Assessment Type</th>
                                <th scope="col">Assessment Score</th>
                                
                              </tr>
                            </thead>
                            <tbody>


                          

                                  {
                                    evaluationCriteria.map((evaluationCriteria, index) => 
                                    {
                                      let headers = []; 
                                          if(evaluationCriteria.type=="CA")
                                          {
                                          if (evaluationCriteria.no_of_conducted > 1) 
                                          {
                                            marks.map((ele,index)=>
                                                {
                                                  if(ele.assignment_name==evaluationCriteria.assessment_type)
                                                  {
                                                      
                                                        headers.push(
                                                        
                                                              <tr key={`${index}`}>
                                                                  <td  scope="col">{ele.assignment_type}</td>
                                                                  <td  scope="col">{ele.assignment_score}</td>
                                                              </tr>
                                                        
                                                        )
                                                      }
                                                  }).flat()
                                            calculations.map((ele,index)=>
                                                  {
                                                      if(ele.type==evaluationCriteria.assessment_type)
                                                      {
                                                        headers.push(
                                                          <tr key={`${index}`} >
                                                            <th scope="col">{evaluationCriteria.description}</th>
                                                             <th  scope="col">{ele.mark}</th>
                                                          </tr>
                                                        
                                                      );
                                                      }
                                                  }) 
                                          } else
                                              {
                                                 marks.map((ele,index)=>
                                                  {
                                                      if(ele.assignment_name==evaluationCriteria.assessment_type)
                                                      {
                                                          headers.push(
                                                            <tr key={`${index}`} >
                                                                <td scope="col">{ele.assignment_type}</td>
                                                                <td  scope="col">{ele.assignment_score}</td>
                                                            </tr>
                                                          );
                                                      }
                                                  }).flat()
                                              }

                                              

                                                  calculations.map((calculations,index2)=>{
                                                  if(evaluationCriteria.assessment_type==calculations.type)
                                                  {
                                                     headers.push(
                                                      <tr>
                                                        <th  scope="col">{calculations.description}</th>
                                                        <th  scope="col">{calculations.percentage}</th>
                                                      </tr>
                                                     );
                                                  }
                                                  }).flat()

                                                  


                                                  

                                          }

                                              

                                          
                                                  
                                          return headers;
                                      }


                                      

                                      

                                    ).flat()



                                    }

                                    

                                    

                                    {
                                    evaluationCriteria.map((evaluationCriteria, index) => 
                                    {
                                      let headers = []; 

                                      if(evaluationCriteria.type=="End")
                                      {
                                          marks.map((ele,index)=>
                                          {
                                              if(ele.assignment_name==evaluationCriteria.assessment_type)
                                              {
                                                      headers.push(
                                                        <tr key={`${index}`}>
                                                            <td  scope="col">{ele.assignment_type}</td>
                                                            <td  scope="col">{ele.assignment_score}</td>
                                                        </tr>
                                                      );
                                                

                                                  calculations.map((calculations,index2)=>{
                                                      if(evaluationCriteria.assessment_type==calculations.type && ele.assignment_type!=="1st Marking" && ele.assignment_type!=="2nd Marking")
                                                      {
                                                       headers.push(
                                                        <tr key={`${index2}`}>
                                                          <th  scope="col">{calculations.description}</th>
                                                          <th  scope="col">{calculations.percentage}</th>
                                                        </tr>
                                                  )}
                                                      })
                                              }
                                              
                                          }).flat()
                                      }
                                      return headers;

                                    })
                                    .flat()
                                    }

                                    {
                                      calculations.map((ele,index)=>
                                      {
                                          let headers = []; 

                                          if(ele.type=="Final Marks")
                                          {
                                              headers.push(
                                              <tr key={`${index}`}>
                                                <td  scope="col">{ele.description}</td>
                                                <td  scope="col">{ele.mark}</td>
                                              </tr>
                                              );
                                          }

                                          return headers;
                                      }).flat()
                                      
                                    }




                                                                  

                                                              
                                                                  
                                                          


                             
                            
                            </tbody>
                            </table>
                      </div>
                      
                      <div class="col shadow" style={{paddingTop:"100px", marginTop:"30px"}}>
                            <div>
                              <h4>CA Marks</h4>

                              <label>Total CA Marks</label>

                              {
                                 calculations.map((ele,index)=>
                                 {
                                    let headers = []; 
                                     if(ele.type=="Total CA Mark")
                                     {
                                         headers.push(<input type='text' value={ele.percentage} disabled/>);
                                     }
                                     return headers;
                                 }).flat()
                               }

                              <label>CA Eligibility</label>
                              <input type='text' value="Eligible" disabled/>


                              <h4>Attendance Eligibility</h4>

                            

                              <label>Attendance</label>
                              <input type='text' value={attendanceEligibility.percentage} disabled/>

                              <label> Eligibility</label>
                              <input type='text' value={attendanceEligibility.eligibility} disabled/>


                              <h4>Overall Eligibility</h4>

                              <label>Eligible</label>
                          
                            </div>
                      </div>
                    </div>
                 </div>
            <div>
            

            </div>
          
              

          </div>
             
          <div className="py-4 px-5">


                <label>Final Marks </label>
                <input type='text' value={finalmarks.overall_score}disabled/>

                <label>Grade </label>
                <input type='text' value={finalmarks.grade}disabled/>

                <Link to={``}>
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                          >
                            Ask to Verify
                          </button>
                      </Link><br/><br/>


                
                   <Link to={`/CAMarkTable/${student_id}/${course_id}`}>
                      <button
                        type="submit"
                        className="btn btn-outline-success btn-sm"
                        id="submitbtn"
                        // disabled={!allChecked}
                      >
                        Submit
                      </button>
                      </Link><br/><br/>


                <button
                  type="button"
                  className="btn btn-outline-danger mx-2 btn-sm"
                  id="clearbtn"
                >
                  Clean
                </button>
          </div>
            
           
    

    </>
  )
}
