import React from 'react'
import { useLocation } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { Redirect } from 'react-router-dom';
import { SpinerLoading } from '../../Utils/SpinerLoading';
import './studentMarkSheetView.css';


export default function StudentMarkSheetView() {

    const { authState } = useOktaAuth();
    const location = useLocation(); //Get the location details from the URL
    const selectedMarkSheet = location.state;




    if(!authState){
        return <SpinerLoading/>;
      }
      if(authState.accessToken?.claims.userType !== "student"){
        return <Redirect to="/home" />;
      }

  return (
    <div className='marksheet-view-main-div'>
        hi
    </div>
  )
}
