import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchAcademicYear, loadAcademicYearFromLocal, saveAcademicYearToLocal } from '../../../AcademicYearManagerSingleton';

export default function AssignLecturerCourse() {
    const [cids, setCids] = useState([]);
    const [cCoordinatorids, setCCoordinatorids] = useState([]);
    const [academicDetails, setAcademicDetails] = useState(loadAcademicYearFromLocal);
    const [academicYear, setAcademicYear] = useState("");
    const [selectedLecturerIds, setSelectedLecturerIds] = useState([]);
    const [newCourseCoordinator, setNewCourseCoordinator] = useState({
        user_id: '',
        course_id: '',
        academic_year: '',
        selectedLecturerIds: []
    });
    const [newLecturer, setNewLecturer] = useState([]);

    console.log(cCoordinatorids);
    console.log(selectedLecturerIds);
    console.log(newCourseCoordinator);

    useEffect(() => {
        loadCids();
    }, []);

    useEffect(() => {
        const fetchAndSaveYear = async () => {
            const details = await fetchAcademicYear();
            if (details) {
                saveAcademicYearToLocal(details);
                setAcademicDetails(details);
                setAcademicYear(details.current_academic_year);
                console.log(details.current_academic_year);
            }
        };

        fetchAndSaveYear();
    }, []);

    const loadCids = async () => {
        try {
            const response = await axios.get('http://localhost:9090/api/courses/allcoursesids');
            console.log(response.data);
            if (Array.isArray(response.data.content)) {
                setCids(response.data.content);
                console.log(response.data.content);
            } else {
                console.error("Expected an array of course IDs, but received:", response.data.content);
            }
        } catch (error) {
            console.error("Error fetching course IDs:", error);
        }

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

        console.log(selectedId);
    };

    const handleSubmit = async () => {
        // Validate required fields
        if (!newCourseCoordinator.user_id || !newCourseCoordinator.course_id || selectedLecturerIds.length === 0) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const selectedCoordinatorId = cCoordinatorids.find(coordinatorId => coordinatorId === cCoordinatorids[0]);
        const selectedCourseId = cids.find(cid => cid === cids[0]);

        setNewCourseCoordinator({
            user_id: selectedCoordinatorId,
            course_id: selectedCourseId,
            academic_year: academicYear,
            selectedLecturerIds: selectedLecturerIds,
        });

        console.log(newCourseCoordinator);
        console.log(selectedCoordinatorId);
        console.log(selectedCourseId);
        console.log(academicYear);
        console.log(selectedLecturerIds);

        try {
            await axios.post('http://localhost:9090/api/ccmanage/insertacc', newCourseCoordinator);
            toast.success("Course coordinator data inserted successfully.");
            handleClear();
        } catch (error) {
            toast.error("Error inserting course coordinator data: " + error.message);
        }
    };

    const handleClear = () => {
        setSelectedLecturerIds([]);
    };

    const handleRemoveLecturerId = (idToRemove) => {
        setSelectedLecturerIds(prevIds => prevIds.filter(id => id !== idToRemove));
    };

    const handleCourseCodeChange = (event) => {
        const selectedCourseCode = event.target.value;
        setNewCourseCoordinator(prevState => ({
            ...prevState,
            course_id: selectedCourseCode
        }));
    };

    const handleCourseCoordinatorChange = (event) => {
        const selectedCoordinatorId = event.target.value;
        setNewCourseCoordinator(prevState => ({
            ...prevState,
            user_id: selectedCoordinatorId
        }));
    };

    return (
        <div className='container' style={{ marginTop: "70px" }}>
            <div className='mt-4 mb-5'>
                <div className='h2 mt-lg-5'>Lecturer Assign Course Module</div>
            </div>
            <ToastContainer />
            <form>
                <div className="row g-3 my-1">
                    <div className="col-md">
                        <div className="form-floating">
                            <select className="form-select" onChange={handleCourseCodeChange}>
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
                            <select className="form-select" onChange={handleCourseCoordinatorChange}>
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
            <div className="mt-4 p-3">
                <h5>Selected Lecturer IDs:</h5>
                <ul className='list-group list-group-flush bg-transparent' style={{ width: "300px" }}>
                    {selectedLecturerIds.map((id, index) => (
                        <li key={`selected-${index}`} className='list-group-item bg-transparent d-flex justify-content-between align-items-center'>
                            {id}
                            <button type="button" onClick={() => handleRemoveLecturerId(id)} className="btn btn-outline-danger btn-sm">Clear</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='my-3'>
                <button type="button" onClick={handleSubmit} className="btn btn-outline-primary btn-sm">Submit</button>
                <button type="button" onClick={handleClear} className="btn btn-outline-danger mx-2 btn-sm">Clear All</button>
            </div>
        </div>
    );
}
