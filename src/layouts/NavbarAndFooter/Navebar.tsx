import React from 'react'
import { useOktaAuth } from "@okta/okta-react";
import { NavebarSA } from '../SystemAnalyst/NavebarSA';


export default function Navebar() {
  const { authState } = useOktaAuth();

  if (authState?.accessToken?.claims.userType === 'ar') {
    <NavebarSA />
  }else if(authState?.accessToken?.claims.userType === 'hod'){
    
  }else if(authState?.accessToken?.claims.userType === 'sa'){
    <NavebarSA />
  }else if(authState?.accessToken?.claims.userType === 'lecturer'){
    <Navebar/>
  }else if(authState?.accessToken?.claims.userType === 'student'){

  }else if(authState?.accessToken?.claims.userType === 'admin'){ 

  }else if(authState?.accessToken?.claims.userType === 'dean'){
  
  }

  return (
    <>
    </>
  )
}
