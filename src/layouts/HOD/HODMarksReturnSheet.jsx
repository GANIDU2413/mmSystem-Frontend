
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import { Link} from 'react-router-dom'

export default function HODMarksReturnSheet() {

    const[marks,setMarks]=useState([]);
    const[evaluationCriteria,setEvaluationCriteria]=useState([]);
    const[calculations,setCalculations]=useState([]);
    const[studentList,setStudentList]=useState([]);
    const {course_id}=useParams();
    const[approval_level,setApprovalLevel]=useState('');


    useEffect(()=>
    {
        result();
      
    },[course_id]);




 const result = async()=>{
    try
    {
        
        const list=await axios.get(`http://localhost:9090/api/evaluationCriteria/getCriteria/${course_id}`);
        if(list.data==null)
        {
            setEvaluationCriteria([]);
        }
        else
        setEvaluationCriteria(list.data);

        

        console.log(list.data);

        const list2=await axios.get(`http://localhost:9090/api/StudentAssessment/get/scoreByCourseId/${course_id}`);
        
        setMarks(list2.data);

        console.log(list2.data);

        const list3=await axios.get(`http://localhost:9090/api/marksCalculations/getMarksCalculation/${course_id}`);
        
        setCalculations(list3.data);

        console.log(list3.data);

        


    }
    catch(error)
    {
        if (error.response && error.response.status === 404)
        {
            console.log(error.response.message);
        }
        console.error(error);
    }
 }

    useEffect(()=>
    {
        const result1= async()=>{
            const list=await axios.get(`http://localhost:9090/api/studentRegCourses/getStudentsByCourse/${course_id}`);
            setStudentList(list.data);
            console.log(list.data);
        }
        result1();
    },[course_id]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
    
            // Set the approval level
            setApprovalLevel("HOD");
    
            // Make the axios call to update the approval level
            const response = await axios.put(`http://localhost:9090/api/approvalLevel/updateApprovalLevel/${course_id}/${new Date().getFullYear()}/${approval_level}`);
    
            // Check if the request was successful
            if (response.status === 200) {
                console.log("Approval level updated successfully");
                // Optionally, perform additional actions here
            } else {
                console.error("Failed to update approval level");
            }
        } catch (error) {
            console.error("Error updating approval level: ", error);
        }
    };




  return (
        <>
            <h1>Course code : {course_id}</h1>
            <table className="table shadow table-bordered"  style={{ marginTop: "30px" }}>
                <thead>
                    <tr >
                        <th scope="col">Student_ID</th>     
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
                                                    const existsInHeaders = headers.some(header => header.props.children == ele.assignment_type);
    
                                                        // If the assignment_name does not exist in the headers array, push the new element
                                                    if (!existsInHeaders) {
                                                     headers.push(<th key={`${index}`} scope="col">{ele.assignment_type}</th>);
                                                    }
                                                    }
                                                })
                                          calculations.map((ele,index)=>
                                                {
                                                    if(ele.type==evaluationCriteria.assessment_type)
                                                    {
                                                        headers.push(<th key={`${index}`} scope="col">{evaluationCriteria.description}</th>);
                                                    }
                                                })
                                        } else {
                                                
                                            marks.map((ele,index)=>
                                            {
                                               if(ele.assignment_name==evaluationCriteria.assessment_type)
                                               {
                                                   const existsInHeaders = headers.some(header => header.props.children == ele.assignment_type);
   
                                                       // If the assignment_name does not exist in the headers array, push the new element
                                                   if (!existsInHeaders) {
                                                    headers.push(<th key={`${index}`} scope="col">{ele.assignment_type}</th>);
                                                   }
                                                   }
                                               })
                                            
                                                }
                                 
                                 
                                                calculations.map((calculations,index2)=>{
                                                if(evaluationCriteria.assessment_type==calculations.type)
                                                {
                                                 headers.push(<th key={`${index2}`} scope="col">{calculations.description}</th>);
                                                }
                                                })


                                                

                                        }

                                        
                                                
                                       return headers;
                                   }
                                
                                    
                                
                                ).flat()

                               }

                               {
                                 calculations.map((ele,index)=>
                                 {
                                    let headers = []; 
                                     if(ele.type=="Total CA Mark")
                                     {
                                         headers.push(<th key={`${index}`} scope="col">{ele.description}</th>);
                                     }
                                     return headers;
                                 }).flat()
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
                                                const existsInHeaders = headers.some(header => header.props.children == ele.assignment_type);

                                                // If the assignment_name does not exist in the headers array, push the new element
                                                if (!existsInHeaders) {
                                                    headers.push(<th key={`${index}`} scope="col">{ele.assignment_type}</th>);
                                                }

                                                calculations.map((calculations,index2)=>{
                                                    if(evaluationCriteria.assessment_type==calculations.type && ele.assignment_type!=="1st Marking" && ele.assignment_type!=="2nd Marking")
                                                    {
                                                     headers.push(<th key={`${index2}`} scope="col">{calculations.description}</th>);
                                                    }
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
                                            headers.push(<th key={`${index}`} scope="col">{ele.description}</th>);
                                        }

                                        return headers;
                                    }).flat()
                                    
                               }
                               <th>View</th>
                        </tr>
                </thead>


                <tbody>
                    
                    {
                        studentList.map((ele,index)=>
                        (
                         <tr>
                            <td scope="col" key={index}>{ele}</td>
                                {
                                  evaluationCriteria.map((evaluationCriteria, index) => 
                                    {
                                    let headers = []; 
                                    if(evaluationCriteria.type=="CA")
                                    {
                                        if (evaluationCriteria.no_of_conducted > 1) 
                                        {
                                                marks.map((mark,index)=>
                                                {
                                                    if(mark.student_id==ele)
                                                    {
                                                        if(evaluationCriteria.assessment_type==mark.assignment_name)
                                                        {
                                                            headers.push(<td key={`${index}`} scope="col">{mark.assignment_score}</td>);
                                                        }
                                                        
                                                    }
                                                })
                                                 calculations.map((cal,index)=>
                                                {
                                                    if(ele==cal.student_id)
                                                    {
                                                    if(cal.type==evaluationCriteria.assessment_type)
                                                    {
                                                        headers.push(<td key={`${index}`} scope="col">{cal.mark}</td>);
                                                    }
                                                    }
                                                })
                                        } 
                                        else 
                                        {
                                                 marks.map((mark,index)=>
                                                {
                                                    if(mark.student_id==ele)
                                                    {
                                                        if(evaluationCriteria.assessment_type==mark.assignment_name)
                                                        {
                                                            headers.push(<td key={`${index}`} scope="col">{mark.assignment_score}</td>);
                                                        }
                                                        
                                                    }
                                                })
                                         }

                                         calculations.map((cal,index)=>
                                         {
                                             if(ele==cal.student_id)
                                             {
                                             if(cal.type==evaluationCriteria.assessment_type)
                                             {
                                                 headers.push(<td key={`${index}`} scope="col">{cal.percentage}</td>);
                                             }
                                             }
                                         })
                                
                                
                                        
        
                                         
                                        }
                                    return headers;
                                })
                                .flat()
                                }

{
                                 calculations.map((cal,index)=>
                                 {
                                    let headers = []; 
                                    if(cal.student_id==ele)
                                    {
                                        if(cal.type=="Total CA Mark")
                                        {
                                            headers.push(<td key={`${index}`} scope="col">{cal.percentage}</td>);
                                        }
                                    }
                                     
                                     return headers;
                                 }).flat()
                               }

{
                                evaluationCriteria.map((evaluationCriteria, index) => 
                                {
                                   
                                        let headers = []; 

                                    if(evaluationCriteria.type=="End")
                                    {
                                        marks.map((mark,index)=>
                                        {
                                            if(mark.student_id==ele){
                                                if(mark.assignment_name==evaluationCriteria.assessment_type)
                                                 {
                                                 headers.push(<td key={`${index}`} scope="col">{mark.assignment_score}</td>);
                                                

                                                calculations.map((calculations,index2)=>{
                                                    if(calculations.student_id==ele){
                                                        if(evaluationCriteria.assessment_type==calculations.type && mark.assignment_type!=="1st Marking" && mark.assignment_type!=="2nd Marking")
                                                        {
                                                        headers.push(<td key={`${index2}`} scope="col">{calculations.percentage}</td>);
                                                        }
                                                    }
                                                    
                                                    })
                                            }
                                            }
                                            
                                           
                                        }).flat()
                                    }
                                    return headers;
                                    }
                                    

                                )
                                .flat()
                               }
        
                                {
                                    calculations.map((calc,index)=>
                                    {
                                        if(calc.student_id==ele)
                                        {
                                            let headers = []; 
                                            if(calc.type=="Final Marks")
                                            {
                                                headers.push(<td key={`${index}`} scope="col">{calc.mark}</td>);
                                            }
                                            return headers;
                                        }
                                        
                                    }).flat()
                                }
                                    
                                        <td><Link className=' btn btn-primary mx-3 btn-sm' to={`/MarksCheckingForm/${ele}/${course_id}`}>View</Link> </td>
                                
                            </tr>
                        ))
                    }
                    
                
                </tbody>
            </table>


            <form onSubmit={handleSubmit}>
            <input to={``} type="submit" value="Request Certify" className="btn btn-outline-success btn-sm" id="submitbtn" /> <br/><br/>
            </form>

            

    </>
  )
}
