import { useOktaAuth } from "@okta/okta-react";
import { NavebarAR } from "../../Components/AR/NavBarAR/NavebarAR";
import { Redirect } from "react-router-dom";
import './homePageAR.css';
import { SpinerLoading } from "../../Utils/SpinerLoading";


export default function HomePageAR() {
  const { authState } = useOktaAuth();


  // if (authState?.accessToken?.claims.userType !== "ar") {
  //   return <Redirect to="/home" />;
  // }
  
  if(!authState){
      return <SpinerLoading/>
  }
  if(authState.accessToken?.claims.userType !== "ar"){
    return <Redirect to="/home" />;
  }

  
  return (
    <div>
      {/* horizontall cards*/ }
      <div className="container functionCardContainer" >

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">



          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                  <br/><h5 className="card-title"> Medical List</h5><br/>
                <a href="/viewMedicals" className="btn btn-primary home-page-class-button">View</a>
              </div>
            </div>
          </div>

          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                <br/><h5 className="card-title">Exam Absentees </h5><br/>
                <a href="/viewablist" className="btn btn-primary home-page-class-button">View</a>
              </div>
            </div>
          </div>

          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                <br/><h5 className="card-title">Mark Return Sheets - ICT </h5><br/>
                <a href="/arviewictmarks" className="btn btn-primary home-page-class-button">View</a>
              </div>
            </div>
          </div>

          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                <br/><h5 className="card-title"> Mark Return Sheets - ET </h5><br/>
                <a href="/arviewetmarks" className="btn btn-primary home-page-class-button">View</a>
              </div>
            </div>
          </div>

          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                <br/><h5 className="card-title">Mark Return Sheets - BST </h5><br/>
                <a href="/arviewbstmarks" className="btn btn-primary home-page-class-button">View</a>
              </div>
            </div>
          </div>

          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                <br/><h5 className="card-title">Mark Return Sheets - Multi Disciplinary </h5><br/>
                <a href="/arviewmtdmarks" className="btn btn-primary home-page-class-button">View</a>
              </div>
            </div>
          </div>

          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                <br/><h5 className="card-title">Certify Marks</h5><br/>
                <a href="/arCertifyMarks" className="btn btn-primary home-page-class-button">Certify</a>
              </div>
            </div>
          </div>

          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                  <br/><h5 className="card-title">Manage Results Boards</h5><br/>
                <a href="/createResultsBoard" className="btn btn-primary home-page-class-button">Manage</a>
              </div>
            </div>
          </div>
          
        </div>

      </div>

    </div>
  )
}
