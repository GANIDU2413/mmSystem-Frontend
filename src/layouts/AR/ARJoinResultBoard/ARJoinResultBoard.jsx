import React from 'react'
import { useOktaAuth } from '@okta/okta-react';
import { Redirect } from 'react-router-dom';
import { SpinerLoading } from '../../Utils/SpinerLoading';
import { useLocation } from 'react-router-dom';
import BackButton from '../../Components/AR/BackButton/BackButton';
import './arJoinResultBoard.css';


export default function ARJoinResultBoard() {

    const { authState } = useOktaAuth();
    const location = useLocation(); //Get the location details from the URL

    const selectedResultBoard=location.state;




    if(!authState){
        return <SpinerLoading/>;
      }
      if(authState.accessToken?.claims.userType !== "ar"){
        return <Redirect to="/home" />;
      }
  return (
    <div className='join-rb-main-div'>
        ARJoinResultBoard

        {console.log(selectedResultBoard)}

        <div className='right-aligned-div back-button-div'>
            <br/><BackButton/> <br/>&nbsp;
        </div>
    </div>
   
  )
}
