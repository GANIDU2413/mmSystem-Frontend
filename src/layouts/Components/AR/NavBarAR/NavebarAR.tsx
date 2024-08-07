import { Link, NavLink } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { SpinerLoading } from "../../../Utils/SpinerLoading";
import { IoMenuSharp } from "react-icons/io5";

export const NavebarAR = () => {

  const {oktaAuth , authState} = useOktaAuth();

  if(!authState){
    return <SpinerLoading/>
  }
  

  const handleLogout = async () =>{
    oktaAuth.signOut();
  }
  

  console.log(authState);
  return (
    <nav className="navbar bg-primary fixed-top">
      <div className="container-fluid">
        <a
          className="navbar-brand text-white"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          href="#"
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <IoMenuSharp size={35} /> Faculty Of Technology, Marking Management System 
        </a>
        <ul className="navbar-nav ms-auto">
           {!authState.isAuthenticated?
               <li className="nav-item m-1">
               <Link type="button" className="btn btn-outline-light" to='/login'>
                 Sign in
               </Link>
             </li>

             :
             <li>
              <button className='btn btn-outline-light' onClick={handleLogout}>Logout</button>
             </li>
          
          }
           

          </ul>
        <div
          className="offcanvas offcanvas-start"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h6 className="offcanvas-title" id="offcanvasNavbarLabel">
            Hello, {authState?.idToken?.claims.name /*Display user's username*/}
            </h6>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">

              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/arhome">
                 Dashboard
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/viewMedicals">
                   Medicals List
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/viewablist">
                Exam Absentees
                </a>
              </li>

              {/* <hr></hr> */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Marks return sheets
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/arviewictmarks">
                      Department of ICT
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/arviewetmarks">
                      Department of ET
                    </a>
                  </li>
                  <li></li>
                  <li>
                    <a className="dropdown-item" href="/arviewbstmarks">
                      Department of BST
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/arviewmtdmarks">
                      Department of Multi Disciplinary
                    </a>
                  </li>
                </ul>
              </li>
              {/* <hr></hr> */}
              
              <li className="nav-item">
                <a className="nav-link" href="/createResultsBoard">
                  Manage Results Boards
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/arCertifyMarks">
                  Certify Marks
                </a>
              </li>
              
      
              
            </ul>
            
            
          </div>
        </div>
      </div>
    </nav>
  );
};