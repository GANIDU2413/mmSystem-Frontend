import React, { useState, useEffect } from 'react';
import * as XLSX from "xlsx";
import { NavebarSA } from '../NavebarSA';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditStudentModal from './EditStudentModal';

export default function StudentsManagement() {
    const [data, setData] = useState([]);
    const [studentsData, setStudentsData] = useState([]);
    const history = useHistory();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const expectedKeys = ["student_id", "full_name", "name_with_initials", "user_name", "email", "password", "registered_year", "department_id"];


    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:9090/api/studentdetails/getallstudentsdetails");
            setStudentsData(response.data.content);
        } catch (error) {
            console.error("Error fetching data from API:", error);
        }
    };

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:9090/api/studentdetails/delastudent/${id}`);
        toast.success("Student deleted successfully!");
        fetchData();
    };

    const handleFileUpload = (e) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);

            const headers = XLSX.utils.sheet_to_json(sheet, { header: 1 })[0];

            // Header Validation
            if (!headers || !Array.isArray(headers) || headers.length === 0) {
                toast.warn("Failed to read headers from the uploaded file. Please ensure the file is properly formatted.");
                return;
            }

            if (!headers.every((key, index) => key === expectedKeys[index])) {
                toast.warn("The uploaded sheet is not related or formatted correctly. Please ensure the correct structure.");
                return;
            }

            // Data Validation
            if (parsedData.length === 0) {
                toast.warn("The uploaded file contains only headers. Please ensure there is data below the headers.");
                return;
            }

            setData(parsedData);
        };
        reader.onerror = (error) => {
            console.error("Error reading file:", error);
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:9090/api/attendanceEligibility/insertbulkattendance", data);
            alert("Data submitted successfully!");
            window.location.reload();
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Error submitting data. Please try again.");
        }
    };

    const downloadTemplate = () => {
        // Create a new workbook
        const wb = XLSX.utils.book_new();
        // Create a new worksheet with the specified column headers
        const ws = XLSX.utils.json_to_sheet([
            { student_id: "", full_name: "", name_with_initials: "", user_name: "", email: "", password: "", registered_year: "", department_id: "" }
        ], { header: ["student_id", "full_name", "name_with_initials", "user_name","email","password","registered_year","department_id"], skipHeader: false });
        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, "Students Register Template");
        // Write the workbook to a file and download it
        XLSX.writeFile(wb, "Students_Register_Template.xlsx");
    };

    const openEditModal = (user) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const closeEditModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
    };

    const handleEditSubmit = async (updatedUser) => {

        await axios.put(`http://localhost:9090/api/studentdetails/updateastudent`, updatedUser);
        fetchData();
};

  return (
    <div className='container'>
    <NavebarSA />
    <div className='py-4'>
        <div className="h2 mt-lg-5">Students Registraion</div>
        <div className=' my-2' style={{float:"right"}}>
            <button onClick={downloadTemplate} className='btn btn-success mt-3'>Download Template</button>
        </div>
        <div>
        <form onSubmit={onSubmit}>
            <input type="file" className='btn btn-secondary mx-2 btn-sm my-1' accept='.xlsx, .xls' onChange={handleFileUpload} />
            {data.length > 0 && (
            <table className='table '>
                <thead>
                <tr>
                    {Object.keys(data[0]).map((key, index) => (
                    <th key={index}>{key}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((row, index) => (
                    <tr key={index} >
                    {Object.values(row).map((value, index) => (
                        <td key={index}>{value}</td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </table>
            )}
            <button type='submit' className='btn btn-outline-success btn-sm my-1'>Submit</button>
        </form>
        </div>
    </div>
    <div>
    <div className="h2 mt-lg-5">Students Details</div>
        
            <table className='table table-hover'>
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Student ID</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Name with initials</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Registered Year</th>
                    <th scope="col">Department </th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {studentsData?.map((row, index) => (
                <tr key={index} >
                    <th scope="row">{index + 1}</th>
                    <td>{row.student_id}</td>
                    <td>{row.full_name}</td>
                    <td>{row.name_with_initials}</td>
                    <td>{row.user_name}</td>
                    <td>{row.email}</td>
                    <td>{row.registered_year}</td>
                    <td>{row.department_id}</td>
                    <td>
                        <button className='btn btn-outline-primary btn-sm mx-1' onClick={()=>openEditModal(row)}>Edit</button>
                        <button className='btn btn-outline-danger btn-sm mx-1' onClick={()=>deleteUser(row.id)}>Delete</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        
    </div>
    {isModalOpen && editingUser && (
        <EditStudentModal row={editingUser} onSubmit={handleEditSubmit} onClose={closeEditModal} />
    )}
        <ToastContainer />
    </div>
    )
}
