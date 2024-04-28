import React from 'react'
import { useOktaAuth } from "@okta/okta-react";
import { NavebarSA } from '../SystemAnalyst/NavebarSA';
import { NavebarAR } from '../Components/AR/NavBarAR/NavebarAR';
import { Navebar } from '../../Lecture/layouts/NavbarAndFooter/Navebar';
import { NavebarDean } from '../Dean/NavebarDean';
import { NavebarHOD } from '../HOD/NavebarHOD';


export default function MainNavbar() {
  const { authState } = useOktaAuth();

  const getNavbar = () => {
    if (authState?.accessToken?.claims.userType === 'ar') {
      return <NavebarAR />;
    } else if (authState?.accessToken?.claims.userType === 'hod') {
        return <NavebarHOD />;
    } else if (authState?.accessToken?.claims.userType === 'system_analysis') {
      return <NavebarSA />;
    } else if (authState?.accessToken?.claims.userType === 'lecturer') {
      // Add code for lecturer
      return <Navebar />;
    } else if (authState?.accessToken?.claims.userType === 'student') {
      // Add code for student
    } else if (authState?.accessToken?.claims.userType === 'admin') {
      // Add code for admin
    } else if (authState?.accessToken?.claims.userType === 'dean') {
      return <NavebarDean />;
    }
  }

  return (
    <div>
      {getNavbar()}
    </div>
  );
}
