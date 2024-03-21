import { Link, NavLink } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { SpinerLoading } from "../Utils/SpinerLoading";

export const Navebar = () => {

  const {oktaAuth , authState} = useOktaAuth();

  if(!authState){
    return <SpinerLoading/>
  }

  const handleLogout = async () => oktaAuth.signOut();

  console.log(authState);
  return (
    <nav className="navbar main-color fixed-top">
      <div className="container-fluid">
        <a
          className="navbar-brand text-white"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          href="#"
        >
          Faculty Of Technology, Marking Management System 
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
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
             Mr. { authState?.idToken?.claims.name}
            </h5>
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
                <a className="nav-link active" aria-current="page" href="#">
                 Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Marks Feeding
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Final Marks
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Level I Sem I
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                    Level I Sem II
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                    Level II Sem I
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                    Level II Sem II
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                    Level III Sem I
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                    Level III Sem II
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                    Level IV Sem I
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                    Level IV Sem II
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            
            <hr></hr>
          </div>
        </div>
      </div>
    </nav>
  );
};
