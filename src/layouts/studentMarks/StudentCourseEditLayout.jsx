import { Button, Input } from '@mui/material'
import React from 'react'

export default function StudentCourseEditLayout() {
    console.log("hello")
  return (
    <div className='container'>
        <div className=' h2'>
            TG694
        </div>
        <div style={{display:"flex"}}>
        <div className="card mx-4" style={{width: "18rem"}}>
            <div class="card-body">
                <h5 class="card-title">ICT3123</h5>
                <Input type='text' className='form-control' placeholder="Enter Final Mark"></Input>
                <input type="submit" name="Submit"  className='btn btn-outline-primary btn-sm mt-3'></input>
            </div>
        </div>

        <div className="card mx-4" style={{width: "18rem"}}>
            <div class="card-body">
                <h5 class="card-title">ICT3113</h5>
                <Input type='text' className='form-control' placeholder="Enter Final Mark"></Input>
                <input type="submit" name="Submit"  className='btn btn-outline-primary btn-sm mt-3'></input>
            </div>
        </div>

        <div className="card mx-4" style={{width: "18rem"}}>
            <div class="card-body">
                <h5 class="card-title">ICT3122</h5>
                <Input type='text' className='form-control' placeholder="Enter Final Mark"></Input>
                <input type="submit" name="Submit"  className='btn btn-outline-primary btn-sm mt-3'></input>
            </div>
        </div>

        <div className="card mx-4" style={{width: "18rem"}}>
            <div class="card-body">
                <h5 class="card-title">ICT3112</h5>
                <Input type='text' className='form-control' placeholder="Enter Final Mark"></Input>
                <input type="submit" name="Submit"  className='btn btn-outline-primary btn-sm mt-3'></input>
            </div>
        </div>

        <div className="card mx-4" style={{width: "18rem"}}>
            <div class="card-body">
                <h5 class="card-title">ICT3111</h5>
                <Input type='text' className='form-control' placeholder="Enter Final Mark"></Input>
                <input type="submit" name="Submit"  className='btn btn-outline-primary btn-sm mt-3'></input>
            </div>
        </div>
    </div>
    </div>
    
  )
}
