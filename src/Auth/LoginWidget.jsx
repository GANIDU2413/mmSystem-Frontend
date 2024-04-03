import { useOktaAuth } from "@okta/okta-react";
import { SpinerLoading } from "../Lecture/layouts/Utils/SpinerLoading"
import { Redirect } from "react-router-dom";
import OktaSignInWidget from "./OktaSignInWidget";


const LoginWidget = ({ config }) => {

    const {oktaAuth, authState} = useOktaAuth(0);
    const onSucess = (token) => {
        oktaAuth.handleLoginRedirect(token);
    };

    const onError = (err) => {
        console.log('Sign in error: ',err);
    }

    if(!authState){
        return(
            <SpinerLoading/>
        );
    }

    return authState.isAuthenticated ? 
    <Redirect to={{pathname: '/'}}/>

    :

    <OktaSignInWidget config={config} onSuccess={onSucess} onError={onError}/>;
};

export default LoginWidget;