import React from 'react'
import { useState } from 'react'
import * as XLSX from "xlsx"
import { NavebarSA } from './NavebarSA'


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


  return (
    <>
      <div className=' container'>
        <NavebarSA/>
        <div className=' py-4'>
          <div className=" h2 mt-lg-5 ">User Registration</div>
        </div>
      </div>
    </>
  )
}
