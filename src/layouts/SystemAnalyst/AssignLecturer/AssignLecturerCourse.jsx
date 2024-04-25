import axios from 'axios';
import React, { useState } from 'react'


export default function AssignLecturerCourse() {
    const [cids,setCids]=useState();
    const [cCoordinatorids,setCCoordinatorids]=useState();


    const loadCids= async()=>{
        const results = await axios.get("");
        setCids(results.data);
        console.log(results.data);
    }

    const loadcCoordinatorids=async()=>{
        
    }
  return (
    <>
      <div className='container'>
        <div className='row'>
            <form className="row g-3 m-4">
                <div className='col-md-5 mb-4'>
                    <div className="">
                        <label for="validationServer04" className="form-label">Selecet Course ID</label>
                        <select className="form-select is-invalid" id="validationServer04" aria-describedby="validationServer04Feedback" required>
                            <option selected disabled value="">Choose...</option>
                            <option>...</option>
                        </select>
                        <div id="validationServer04Feedback" className="invalid-feedback">
                            Please select a valid state.
                        </div>
                    </div>
                </div>
                <div className='col-md-5 mb-4'>
                    <div className="">
                        <label for="validationServer05" className="form-label">Selecet Course Coordinator ID</label>
                        <select className="form-select is-invalid" id="validationServer05" aria-describedby="validationServer05Feedback" required>
                            <option selected disabled value="">Choose...</option>
                            <option>...</option>
                        </select>
                        <div id="validationServer05Feedback" className="invalid-feedback">
                            Please select a valid state.
                        </div>
                    </div>
                </div>

                <div className="col-md-5 ">
                    <div className="">
                        <label for="validationServer06" className="form-label">Selecet Lecturer ID</label>
                        <select className="form-select is-invalid" id="validationServer06" aria-describedby="validationServer06Feedback" required>
                            <option selected disabled value="">Choose...</option>
                            <option>...</option>
                        </select>
                        <div id="validationServer06Feedback" className="invalid-feedback">
                            Please select a valid state.
                        </div>
                    </div>
                </div>

                

                <div className="col-12">
                    <div className="form-check">
                        <input className="form-check-input is-invalid" type="checkbox" value="" id="invalidCheck3" aria-describedby="invalidCheck3Feedback" required />
                        <label className="form-check-label" for="invalidCheck3">
                            Agree to terms and conditions
                        </label>
                        <div id="invalidCheck3Feedback" className="invalid-feedback">
                            You must agree before submitting.
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <button className="btn btn-primary" type="submit">Submit form</button>
                </div>
            </form>
        </div>
      </div>
    </>
  )
}
