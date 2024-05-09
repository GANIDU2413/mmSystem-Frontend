import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';


export default function CAEligibility() {
    const [course_id, course_name] = useParams();
    const [allStEli, setAllStEli] = useState([]);

    useEffect(() => {
        results();
    }, []);

    const results = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/api/courses/getccregcourses/${course_id}`);
            if (response.data.code !== '00') {
                throw new Error('Network response was not ok');
            }
            const data = response.data.content;
            setAllStEli(data);
            console.log(data)
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            console.error('Error details:', error.response);
        }
    }
    
return (
    <div>
            <div className=' container'>
                    <div className=' h2 mx-2'>Students CA Eligibile of {course_name}</div>
                    <div>
                            <table className=' table'>
                                    <thead>
                                            <tr>
                                                    <th>Student ID</th>
                                                    <th>Student Name</th>
                                                    <th>Eligibility</th>
                                            </tr>
                                    </thead>
                                    <tbody>
                                            {allStEli.map((student) => (
                                                    <tr key={student.id}>
                                                            <td>{student.id}</td>
                                                            <td>{student.name}</td>
                                                            <td>{student.eligibility}</td>
                                                    </tr>
                                            ))}
                                    </tbody>
                            </table>
                    </div>
            </div>
    </div>
)
}
