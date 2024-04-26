import React from 'react'
import { useOktaAuth } from "@okta/okta-react";
import { NavebarSA } from '../SystemAnalyst/NavebarSA';
import { NavebarAR } from '../Components/AR/NavBarAR/NavebarAR';
import { Navebar } from '../../Lecture/layouts/NavbarAndFooter/Navebar';


export default function MainNavbar() {
  const { authState } = useOktaAuth();

  if (authState?.accessToken?.claims.userType === 'ar') {
    return <NavebarAR />;
  } else if (authState?.accessToken?.claims.userType === 'hod') {
    // Add code for HOD
  } else if (authState?.accessToken?.claims.userType === 'sa') {
    return <NavebarSA />;
  } else if (authState?.accessToken?.claims.userType === 'lecturer') {
    // Add code for lecturer
    return <Navebar />;
  } else if (authState?.accessToken?.claims.userType === 'student') {
    // Add code for student
  } else if (authState?.accessToken?.claims.userType === 'admin') {
    // Add code for admin
  } else if (authState?.accessToken?.claims.userType === 'dean') {
    // Add code for dean
  }

  return (
    <>
    </>
  );
}
