import React from 'react'
import { useLocation } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';


export default function StudentMarkSheetView() {

    const { authState } = useOktaAuth();
    const location = useLocation(); //Get the location details from the URL
    const selectedMarkSheet = location.state;

  return (
    <div>
        {
            console.log(selectedMarkSheet)
        }
    </div>
  )
}
