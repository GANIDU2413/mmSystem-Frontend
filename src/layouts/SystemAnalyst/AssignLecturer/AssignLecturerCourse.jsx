import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

export default function AssignLecturerCourse() {
    const [cids, setCids] = useState([]);
    const [cCoordinatorids, setCCoordinatorids] = useState([]);
    const [selectedLecturerIds, setSelectedLecturerIds] = useState([]);
    const { authState } = useOktaAuth();

    useEffect(() => {
        loadCids();
    }, []);

    useEffect(() => {
        loadcCoordinatorids();
    }, []);

    const loadCids = async () => {
        try {
            const response = await axios.get('http://localhost:9090/api/courses/allcoursesids');
            if (Array.isArray(response.data.content)) {
                setCids(response.data.content);
                console.log(response.data.content);
            } else {
                console.error("Expected an array of course IDs, but received:", response.data.content);
            }
        } catch (error) {
            console.error("Error fetching course IDs:", error);
        }
    };

    const loadcCoordinatorids = async () => {
        try {
            const result = await axios.get('http://localhost:9090/api/lecreg/allLecids');
            if (Array.isArray(result.data.content)) {
                setCCoordinatorids(result.data.content);
                console.log(result.data.content);
            } else {
                console.error("Expected an array of course coordinator IDs, but received:", result.data.content);
            }
        } catch (error) {
            console.error("Error fetching course coordinator IDs:", error);
        }
    };

    const handleLecturerIdSelect = (event) => {
        const selectedId = event.target.value;
        setSelectedLecturerIds(prevIds => {
            if (!prevIds.includes(selectedId)) {
                return [...prevIds, selectedId];
            }
            return prevIds;
        });
    };

    const handleSubmit = async () => {
        const currentYear = new Date().getFullYear();
        const courseId = cids[0];
        const coordinatorId = cCoordinatorids[0];

        try {
            await axios.post('api gave latter', {
                user_id: coordinatorId,
                course_id: courseId,
                academicyear: currentYear
            });
            console.log("Course coordinator data inserted successfully.");
        } catch (error) {
            console.error("Error inserting course coordinator data:", error);
        }

        try {
            await axios.post('api gave latter', {
                user_id: coordinatorId,
                course_id: courseId
            });
            console.log("LCR data inserted successfully.");
        } catch (error) {
            console.error("Error inserting LCR data:", error);
        }
    };

    const handleClear = () => {
        setSelectedLecturerIds([]);
    };

    return (
        <div className='container' style={{ marginTop: "70px" }}>
            <div className='mt-4 mb-5'>
                <div className='h2 mt-lg-5'>Lecturer Assign Course Module</div>
            </div>
            <form>
                <div className="row g-3 my-1">
                    <div className="col-md">
                        <div className="form-floating">
                            <select className="form-select">
                                <option selected>Select Course Code</option>
                                {cids.map((cid, index) => (
                                    <option key={`cid-${index}`} value={cid}>{cid}</option>
                                ))}
                            </select>
                            <label htmlFor="type">Course Code</label>
                        </div>
                    </div>

                    <div className="col-md">
                        <div className="form-floating">
                            <select className="form-select">
                                <option selected>Select Course Coordinator</option>
                                {cCoordinatorids.map((coordinatorId, index) => (
                                    <option key={`coordinator-${index}`} value={coordinatorId}>{coordinatorId}</option>
                                ))}
                            </select>
                            <label htmlFor="type">Course Coordinator</label>
                        </div>
                    </div>
                </div>

                <div className="row g-3 my-1">
                    <div className="col-md">
                        <div className="form-floating">
                            <select className="form-select" onChange={handleLecturerIdSelect}>
                                <option selected>Select Lecturer ID</option>
                                {cCoordinatorids.map((coordinatorId, index) => (
                                    <option key={`lecturer-${index}`} value={coordinatorId}>{coordinatorId}</option>
                                ))}
                            </select>
                            <label htmlFor="type">Lecturer ID</label>
                        </div>
                    </div>
                </div>
            </form>
            <div className="mt-4">
                <h3>Selected Lecturer IDs:</h3>
                <ul>
                    {selectedLecturerIds.map((id, index) => (
                        <li key={`selected-${index}`}>{id}</li>
                    ))}
                </ul>
            </div>
            <div className='my-3'>
                <button type="button" onClick={handleSubmit} className="btn btn-outline-primary btn-sm">Submit</button>
                <button type="button" onClick={handleClear} className="btn btn-outline-danger mx-2 btn-sm">Clear</button>
            </div>
        </div>
    );
}
