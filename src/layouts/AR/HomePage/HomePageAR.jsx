import { useOktaAuth } from "@okta/okta-react";
import { NavebarAR } from "../../Components/AR/NavBarAR/NavebarAR";
import { Redirect } from "react-router-dom";
import './homePageAR.css';
import { SpinerLoading } from "../../Utils/SpinerLoading";
import { useHistory } from "react-router-dom";


export default function HomePageAR() {
  const { authState } = useOktaAuth();

  const history = useHistory();


const handleChange = (link) => {
  history.push(link);
}
  
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

        <div className="row">



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
                <br/><h5 className="card-title">Marks Return Sheets </h5><br/>
                
                <select className="form-select home-page-class-button marksheet-select-box-button" onChange={(e)=>{handleChange(e.target.value)}}>

                  <option selected disabled style={{color:"rgb(100, 100, 100)"}}>
                    Select department
                  </option>

                  <option value='/arviewictmarks'>
                    <a href="/arviewictmarks" className="btn btn-primary home-page-class-button">ICT</a>
                  </option>

                  <option value='/arviewetmarks'>
                    <a href="/arviewetmarks" className="btn btn-primary home-page-class-button">ET</a>
                  </option>

                  <option value='/arviewbstmarks'>
                    <a href="/arviewbstmarks" className="btn btn-primary home-page-class-button">BST</a>
                  </option>

                  <option value='/arviewmtdmarks'>
                    <a href="/arviewmtdmarks" className="btn btn-primary home-page-class-button">Multi Disciplinary</a>
                  </option>
                
                </select>
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

          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                <br/><h5 className="card-title">Certify Marks Sheets</h5><br/>
                <a href="/arCertifyMarks" className="btn btn-primary home-page-class-button">Certify</a>
              </div>
            </div>
          </div>

          
          
        </div>

      </div>

    </div>
  )
}
