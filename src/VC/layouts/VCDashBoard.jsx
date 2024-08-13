import React from 'react'

export default function () {
    const [academicDetails, setAcademicDetails] = useState(loadAcademicYearFromLocal);
  
 

    return(
      <>
              <div className="col mb-4"> 
                <div className="card text-center functionCard">
                  <div className="card-body">
                    <br/><h5 className="card-title">Certify Marks</h5><br/>
                    <a href="/pendingVCCertifyMarksheet" className="btn btn-primary home-page-class-button">Certify Result Sheets</a>
                  </div>
                </div>
              </div>
      </>
    )
}
