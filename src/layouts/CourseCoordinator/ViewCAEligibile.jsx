import axios from 'axios';
import React, { useState } from 'react'

export default function ViewCAEligibile() {
    const [course_ID,getCourse_ID] = useState();
    const [cAMarks,getCAMarks] = useState([]);

    const getCourseIDFromcctbl = async()=>{
        const cidforcc = await axios.get(`http://localhost:9090/api/ccmanage/getcidbyuserid/${user_id}`)
    }

  return (
    <div>
        <div className=' container'>
            <div>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}
