import React from 'react'
import { useOktaAuth } from "@okta/okta-react";
import NavBarCC from './NavBarCC';
// import { Redirect } from "react-router-dom";


export default function CCDashBoard() {
    const { authState } = useOktaAuth();
    console.log(authState?.idToken?.claims.name)

    // if (authState?.accessToken?.claims.userType != "course_cordinator") {
    //     return <Redirect to="/" />;
    // }

  

    return (
        <div>
            <div className=' container' style={{marginTop:"70px"}}>
                <NavBarCC/>
                <div className=' py-4'>
                    <div style={{display:"flex"}}>
                        <h2>Hello,</h2>
                        {/* Display user's username */}
                        <h4 className=' pt-2 mx-3'>{authState?.idToken?.claims.name}...</h4> 
                    </div> 
                </div>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
                    <div className=' center' >
                        <div className='row g-3'>
                            <div className="card shadow m-4" style={{width: "18rem"}}>
                                <div className="card-body ">
                                    <h5 className="card-title py-2">Marks Approval</h5>
                                    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                    <a href="/ccmarksapproval"  className="btn btn-primary btn-sm mt-2">Go somewhere</a>
                                </div>
                            </div>
                            <div className="card shadow m-4" style={{width: "18rem"}}>
                                <div className="card-body ">
                                    <h5 className="card-title py-2">View CA Eligibility</h5>
                                    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                    <a href="/viewcaeli"  className="btn btn-primary btn-sm mt-2">Go somewhere</a>
                                </div>
                            </div>
                            {/* <div className="card shadow m-4" style={{width: "18rem"}}>
                                <div className="card-body ">
                                    <h5 className="card-title py-2">View FA Eligibility</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="/attendencesysan"  className="btn btn-primary btn-sm mt-2">Go somewhere</a>
                                </div>
                            </div> */}
                        </div>
                        
                        <div className='row g-3 my-4'>
                            <div className="card shadow m-4" style={{width: "18rem"}}>
                                <div className="card-body ">
                                    <h5 className="card-title py-2">Courses Criteria</h5>
                                    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                    <a href="/cccbycc"  className="btn btn-primary btn-sm mt-2">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
