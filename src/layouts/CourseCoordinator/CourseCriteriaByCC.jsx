import React, { useEffect, useState, useRef } from 'react'
import NavBarCC from './NavBarCC'
import axios from 'axios';
import { useOktaAuth } from "@okta/okta-react";

export default function CourseCriteriaByCC() {
  const [cids,setCids] = useState([]);
  const { authState } = useOktaAuth();
  const [selectedAssessmentType, setSelectedAssessmentType] = useState('');
  const [criteriaData, setCriteriaData] = useState([]); // State to hold the criteria data
  const asmntTypeRef = useRef(null); // Create a ref for the assessment type select element
  const usernameofcc = authState?.idToken?.claims.preferred_username;
  const assessmentTypeList = ['Assignment', 'Quiz', 'Mid theory exam', 'Mid practical exam', 'End theory exam', 'End practical exam','Mini Project','Lab Report','Optional'];

  console.log(criteriaData);

  useEffect(() => {
    getCids();
  },[usernameofcc]);

  const getCids = async () =>{
    try {
      const response = await axios.get(`http://localhost:9090/api/ccmanage/getAllCidToCourseCriteria/${usernameofcc}`);
      console.log(response.data.content);
      setCids(response.data.content);
    } catch (error) {
      console.log(error);
    }
    
  }

    // Function to handle Assessment Type selection
    const handleAssessmentTypeChange = (event) => {
      setSelectedAssessmentType(event.target.value);
    };

      // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const noOfTake = parseInt(document.querySelector('input[name="noOfTake"]').value);
    let description = '';
    if (noOfTake > 1) {
      description = `Best 0${noOfTake} Average`; // Adjusted to use the variable noOfTake
    } else {
      description = null;
    } 

    // For demonstration, we'll just add it to our local state
    const newCriterion = {
      type: selectedAssessmentType,
      assessmentType: asmntTypeRef.current.value, // Use the ref to access the value
      noOfConduct: parseInt(document.querySelector('input[name="noOfConduct"]').value),
      noOfTake,
      percentage: parseFloat(document.querySelector('input[name="percentage"]').value),
      description,
    };
    setCriteriaData([...criteriaData, newCriterion]);
    // Clear the form after submission
    document.querySelectorAll('input').forEach(input => input.value = '');
  };


  return (
    <div>
      <NavBarCC/>
      <div className=' container'>
          <div className='h2' style={{marginTop:"70px"}}>Evaluation Criteria Creation</div>
          <div style={{display:"flex"}}>
            <div className=' col-1 mt-5' style={{float:"left",width:"43%"}}>
              <form onSubmit={handleSubmit} >
                <select className=' form-select'>
                  <option selected>Select Course Code</option>
                  {
                    cids.map((cid,index) => (
                      <option key={`cid-${index}`} value={cid.course_id}>{cid.course_id}</option>
                    ))
                  }
                </select>
                <div className=' col-5 mt-5' style={{display:"flex",width:"auto"}}>
                  <select className=' form-select m-2' ref={asmntTypeRef}>
                    <option selected >Select The Assessment</option>
                    <option value='CA' name="asmntType">Continuous Assessment</option>
                    <option value='End' name="asmntType">Final Assessment</option>
                  </select>
                  <select className=' form-select m-2' value={selectedAssessmentType} onChange={handleAssessmentTypeChange}>
                    <option selected>Select Assessment Type</option>
                    {
                      assessmentTypeList.map((assessmentType, index) => (
                        <option key={`assessmentType-${index}`} value={assessmentType}>{assessmentType}</option>
                      ))
                    }

                  </select>
                </div>
                <div className=' col-5' style={{display:"flex",width:"auto"}}>
                  
                  <input name="noOfConduct" type={"number"} className='form-control m-2' placeholder='Select No of Conduct' required/>
                  <input name="noOfTake" type={"number"} className='form-control m-2' placeholder='Select No of Take' required/>
                  
                </div>
                <div className=' col-5' style={{display:"flex",width:"auto"}}>
                <input name="percentage" type={"number"} className='form-control m-2' placeholder='Select percentage (%)' required/>
                <button className='btn btn-success m-2' style={{width:"100px" ,height:"auto"}} type="submit">Insert</button>
                </div>
              </form>
            </div>
            <div className=' col-1 m-5 shadow' style={{float:"right",width:"60%",borderRadius:"5px"}}>
              <div className=' h4 p-3 text-success'>The Criteria</div>
              <div className=' p-4'>
                <table className=' table'>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Assessment Type</th>
                      <th>No of Conduct</th>
                      <th>No of Take</th>
                      <th>Percentage(%)</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {criteriaData.map((criterion, index) => (
                      <tr key={index}>
                        <td>{criterion.type}</td>
                        <td>{criterion.assessmentType}</td>
                        <td>{criterion.noOfConduct}</td>
                        <td>{criterion.noOfTake}</td>
                        <td>{criterion.percentage}</td>
                        <td>{criterion.description}</td>
                        <td><button className='btn btn-danger btn-sm'>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
              </div>
              <button className=' btn btn-primary sm m-4'>Create The Criteria</button>
            </div>
          </div>

      </div>
    </div>
  )

}
