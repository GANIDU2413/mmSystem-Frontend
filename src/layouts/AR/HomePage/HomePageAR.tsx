import { useOktaAuth } from "@okta/okta-react";
import { NavebarAR } from "../../Components/AR/NavBarAR/NavebarAR";
import { Redirect } from "react-router-dom";


export default function HomePageAR() {
  const { authState } = useOktaAuth();

  if (authState?.accessToken?.claims.userType !== 'ar') {
    return <Redirect to="/ar" />;
  }
  
  return (
    <div>
        <NavebarAR />
        <h1>HomePageAR</h1>
    </div>
  )
}
