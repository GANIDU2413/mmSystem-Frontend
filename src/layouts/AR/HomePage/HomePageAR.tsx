import { useOktaAuth } from "@okta/okta-react";
import { NavebarAR } from "../../Components/AR/NavBarAR/NavebarAR";
import { Redirect } from "react-router-dom";
import './homePageAR.css';


export default function HomePageAR() {
  const { authState } = useOktaAuth();

  // if (authState?.accessToken?.claims.userType !== 'ar') {
  //   return <Redirect to="/ar" />;
  // }
  
  
  return (
    <div>
      
      {/* horizontall cards*/ }
      <div className="container functionCardContainer" >

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">

          
          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                  <br/><h5 className="card-title">Create Result Board</h5><br/>
                <a href="#" className="btn btn-primary home-page-class-button">Create</a>
              </div>
            </div>
          </div>

          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                  <br/><h5 className="card-title">View Medical List</h5><br/>
                <a href="/viewMedicals" className="btn btn-primary home-page-class-button">View</a>
              </div>
            </div>
          </div>

          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                <br/><h5 className="card-title">Update E* Grades </h5><br/>
                <a href="/viewEStarList" className="btn btn-primary home-page-class-button">Update</a>
              </div>
            </div>
          </div>

          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                <br/><h5 className="card-title">Certify Marks - ICT</h5><br/>
                <a href="/arcerfityictmarks" className="btn btn-primary home-page-class-button">Certify</a>
              </div>
            </div>
          </div>

          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                <br/><h5 className="card-title">Certify Marks - ET</h5><br/>
                <a href="/arcerfityetmarks" className="btn btn-primary home-page-class-button">Certify</a>
              </div>
            </div>
          </div>

          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                <br/><h5 className="card-title">Certify Marks - BST</h5><br/>
                <a href="/arcertifybstmarks" className="btn btn-primary home-page-class-button">Certify</a>
              </div>
            </div>
          </div>

          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                <br/><h5 className="card-title">View Marks - ICT </h5><br/>
                <a href="/arviewictmarks" className="btn btn-primary home-page-class-button">View</a>
              </div>
            </div>
          </div>

          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                <br/><h5 className="card-title">View Marks - ET </h5><br/>
                <a href="/arviewetmarks" className="btn btn-primary home-page-class-button">View</a>
              </div>
            </div>
          </div>

          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                <br/><h5 className="card-title">View Marks - BST </h5><br/>
                <a href="/arviewbstmarks" className="btn btn-primary home-page-class-button">View</a>
              </div>
            </div>
          </div>

          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                <br/><h5 className="card-title">View Marks - Multi Disciplinary </h5><br/>
                <a href="/arviewmtdmarks" className="btn btn-primary home-page-class-button">View</a>
              </div>
            </div>
          </div>

          

          
          


        </div>

      </div>

    </div>
  )
}
