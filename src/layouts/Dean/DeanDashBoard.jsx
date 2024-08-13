import React, { useState } from 'react';
import { useEffect } from 'react';
import { NavebarDean } from './NavebarDean';
import { fetchAcademicYear,loadAcademicYearFromLocal,saveAcademicYearToLocal } from '../../AcademicYearManagerSingleton';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function DeanDashBoard() {
  const [academicDetails, setAcademicDetails] = useState(loadAcademicYearFromLocal);
  
 

return(
  <>
          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                <br/><h5 className="card-title">Certify Marks</h5><br/>
                <a href="/pendingDeanCertifyMarksheet" className="btn btn-primary home-page-class-button">Certify Result Sheets</a>
              </div>
            </div>
          </div>
  </>
)

}
