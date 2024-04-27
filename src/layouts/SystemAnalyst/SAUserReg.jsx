import React from 'react'
import { useState } from 'react'
import * as XLSX from "xlsx"
import { NavebarSA } from './NavebarSA'
import axios from 'axios';


export default function SAUserReg() {
  const [data, setData] = useState([]);

  console.log(data);


  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) =>{
      const data = e.target.result;
      const workbook = XLSX.read(data, {type: "binary"});
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    }

  }

  const OnSubmit=async (e)=>{
    e.preventDefault();
    await axios.post("http://localhost:9090/api/studentdetails/savestudentsdetails",data);
  };

  return (
    <>
      <div className=' container'>
        <NavebarSA/>
        <div className=' py-4'>
          <div className=" h2 mt-lg-5 ">User Registration</div>
          <div>
            <form onSubmit={e=>OnSubmit(e)}>

            
            <input type="file" className=' btn btn-secondary mx-2 btn-sm' accept='.xlsx, .xls' onChange={handleFileUpload}/>
            {data.length >0 &&(
              <table className='table'>
                <thead>
                  <tr>
                    {Object.keys(data[0]).map((key)=>(
                      <th key={key}>{key}</th>
                    ))}              
                  </tr>
                </thead>
                <tbody>
                    {data.map((row, index)=>(
                      <tr key={index}>
                        {Object.values(row).map((value, index)=>(
                          <td key={index}>{value}</td>
                        ))}
                      </tr>
                    ))

                    }
                </tbody>
              </table>
            )}
            <button type='submit' className=' btn btn-outline-success btn-sm'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
