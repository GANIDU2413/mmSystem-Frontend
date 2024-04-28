import React, { useState, useEffect } from 'react';
import * as XLSX from "xlsx";
import axios from 'axios';
import { NavebarSA } from '../NavebarSA';

export default function AttendanceEligibilityManage() {
 const [data, setData] = useState([]);
 const [attendanceData, setAttendanceData] = useState([]);

 useEffect(() => {
  fetchData();
}, [])

const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:9090/api/attendanceEligibility/getallattendance");
    setAttendanceData(response.data.content);
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
    { student_id: "", course_id: "", percentage: "", eligibility: "" }
  ], { header: ["student_id", "course_id", "percentage", "eligibility"], skipHeader: false });
  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, "Attendance Eligibility Template");
  // Write the workbook to a file and download it
  XLSX.writeFile(wb, "Attendance_Eligibility_Template.xlsx");
};

 return (
    <div className='container'>
      <NavebarSA />
      <div className='py-4'>
        <div className="h2 mt-lg-5">Attendence</div>
        <div className=' my-2' style={{float:"right"}}>
          <button onClick={downloadTemplate} className='btn btn-success mt-3'>Download Template</button>
        </div>
        <div>
          <form onSubmit={onSubmit}>
            <input type="file" className='btn btn-secondary mx-2 btn-sm my-1' accept='.xlsx, .xls' onChange={handleFileUpload} />
            {data.length > 0 && (
              <table className='table'>
                <thead>
                  <tr>
                    {Object.keys(data[0]).map((key, index) => (
                      <th key={index}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
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
      <div className="h2 mt-lg-5">Attendance Data</div>
          {attendanceData.length > 0 && (
            <table className='table'>
              <thead>
                <tr>
                  {Object.keys(attendanceData[0]).map((key, index) => (
                    <th key={index}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((row, index) => (
                  <tr key={index}>
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
 );
}
