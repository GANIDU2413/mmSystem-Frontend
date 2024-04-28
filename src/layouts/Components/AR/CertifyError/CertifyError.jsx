import React from 'react'
import BackButton from '../BackButton/BackButton'

export default function CertifyError() {
  return (
    <div>
        <div className="alert alert-danger" role="alert" style={{marginTop:'100px',textAlign:'center',width:'80%',marginLeft:'auto',marginRight:'auto'}}>
                
          At least one course module should be there thai is still not approved by the HOD

        </div>
        <div className='right-aligned-div'>   {/* back button */} 
          <BackButton/> &nbsp;&nbsp;&nbsp;
        </div><br/>
    </div>
  )
}
