import React, { useState, useEffect } from 'react';
import * as XLSX from "xlsx";
import { NavebarSA } from '../NavebarSA';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function StudentsManagement() {
    const [data, setData] = useState([]);
    const [studentsData, setStudentsData] = useState([]);
    const history = useHistory();

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

    const handleFileUpload = (e) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);
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
        {studentsData.length > 0 && (
            <table className='table table-hover'>
            <thead>
                <tr>
                {Object.keys(studentsData[0]).map((key, index) => (
                    <th key={index}>{key}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {studentsData.map((row, index) => (
                <tr key={index} onClick={()=>{history.push()}}>
                    {Object.values(row).map((value, index) => (
                    <td key={index}>{value}</td>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
        )}
    </div>
    </div>
    )
}
