import { Link, NavLink } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { SpinerLoading } from "../Utils/SpinerLoading";
import { IoMenuSharp } from "react-icons/io5";

export const NavebarHOD = ({ handleButtonClick }) => {
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) {
    return <SpinerLoading />;
  }

  const handleLogout = async () => oktaAuth.signOut();

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
          <IoMenuSharp size={35} /> Faculty Of Technology, Marking Management
          System
        </a>
        <ul className="navbar-nav ms-auto">
          {!authState.isAuthenticated ? (
            <li className="nav-item m-1">
              <Link type="button" className="btn btn-outline-light" to="/login">
                Sign in
              </Link>
            </li>
          ) : (
            <li>
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
        <div
          className="offcanvas offcanvas-start"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              User Name
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
                <a className="nav-link active" aria-current="page" href="/HODDashBoard">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/HODmarkstable">
                  Student Details
                </a>
              </li>
              <hr></hr>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  
                >
                  Department of ICT
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <p
                      className="dropdown-item"
                      onClick={() => handleButtonClick(1, 1)}
                    >
                      Level I Sem I
                    </p>
                  </li>
                  <li>
                    <p
                      className="dropdown-item"
                      onClick={() => handleButtonClick(1, 2)}
                    >
                      Level I Sem II
                    </p>
                  </li>
                  <li>
                    <p
                      className="dropdown-item"
                      onClick={() => handleButtonClick(2, 1)}
                    >
                      Level II Sem I
                    </p>
                  </li>
                  <li>
                    <p
                      className="dropdown-item"
                      onClick={() => handleButtonClick(2, 2)}
                    >
                      Level II Sem II
                    </p>
                  </li>
                  <li>
                    <p
                      className="dropdown-item"
                      onClick={() => handleButtonClick(3, 1)}
                    >
                      Level III Sem I
                    </p>
                  </li>
                  <li>
                    <p
                      className="dropdown-item"
                      onClick={() => handleButtonClick(3, 2)}
                    >
                      Level III Sem II
                    </p>
                  </li>
                  <li>
                    <p
                      className="dropdown-item"
                      onClick={() => handleButtonClick(4, 1)}
                    >
                      Level IV Sem I
                    </p>
                  </li>
                  <li>
                    <p
                      className="dropdown-item"
                      onClick={() => handleButtonClick(4, 2)}
                    >
                      Level IV Sem II
                    </p>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  
                >
                  Department of ET
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <p
                      className="dropdown-item"
                      // onClick={() => handleButtonClick(1, 1)}
                    >
                      Level I Sem I
                    </p>
                  </li>
                  <li>
                    <p
                      className="dropdown-item"
                      // onClick={() => handleButtonClick(1, 2)}
                    >
                      Level I Sem II
                    </p>
                  </li>
                  <li>
                    <p
                      className="dropdown-item"
                      // onClick={() => handleButtonClick(2, 1)}
                    >
                      Level II Sem I
                    </p>
                  </li>
                  <li>
                    <p
                      className="dropdown-item"
                      // onClick={() => handleButtonClick(2, 2)}
                    >
                      Level II Sem II
                    </p>
                  </li>
                  <li>
                    <p
                      className="dropdown-item"
                      // onClick={() => handleButtonClick(3, 1)}
                    >
                      Level III Sem I
                    </p>
                  </li>
                  <li>
                    <p
                      className="dropdown-item"
                      // onClick={() => handleButtonClick(3, 2)}
                    >
                      Level III Sem II
                    </p>
                  </li>
                  <li>
                    <p
                      className="dropdown-item"
                      // onClick={() => handleButtonClick(4, 1)}
                    >
                      Level IV Sem I
                    </p>
                  </li>
                  <li>
                    <p
                      className="dropdown-item"
                      // onClick={() => handleButtonClick(4, 2)}
                    >
                      Level IV Sem II
                    </p>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  
                >
                  Department of BST
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <p
                      className="dropdown-item"
                      // onClick={() => handleButtonClick(1, 1)}
                    >
                      Level I Sem I
                    </p>
                  </li>
                  <li>
                    <p
                      className="dropdown-item"
                      // onClick={() => handleButtonClick(1, 2)}
                    >
                      Level I Sem II
                    </p>
                  </li>
                  <li>
                    <p
                      className="dropdown-item"
                      // onClick={() => handleButtonClick(2, 1)}
                    >
                      Level II Sem I
                    </p>
                  </li>
                  <li>
                    <p
                      className="dropdown-item"
                      // onClick={() => handleButtonClick(2, 2)}
                    >
                      Level II Sem II
                    </p>
                  </li>
                  <li>
                    <p
                      className="dropdown-item"
                      // onClick={() => handleButtonClick(3, 1)}
                    >
                      Level III Sem I
                    </p>
                  </li>
                  <li>
                    <p
                      className="dropdown-item"
                      // onClick={() => handleButtonClick(3, 2)}
                    >
                      Level III Sem II
                    </p>
                  </li>
                  <li>
                    <p
                      className="dropdown-item"
                      // onClick={() => handleButtonClick(4, 1)}
                    >
                      Level IV Sem I
                    </p>
                  </li>
                  <li>
                    <p
                      className="dropdown-item"
                      // onClick={() => handleButtonClick(4, 2)}
                    >
                      Level IV Sem II
                    </p>
                  </li>
                </ul>
              </li>
            </ul>

            
          </div>
        </div>
      </div>
    </nav>
  );
};
