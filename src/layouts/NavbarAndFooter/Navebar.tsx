import { Link, NavLink } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { SpinerLoading } from "../Utils/SpinerLoading";

export const Navebar = () => {
  const { oktaAuth, authState } = useOktaAuth(); // handle state of authentication

  // load spriner if auth satate is false.
  if (!authState) {
    return <SpinerLoading />;
  }

  const handleLogout = async () => oktaAuth.signOut(); // handle logout from okta auth.

  return (
    <nav className="navbar main-color fixed-top">
      <div className="container-fluid">
        {!authState.isAuthenticated ? (
          <a className="navbar-brand text-white">
            Faculty Of Technology, Marking Management System
          </a>
        ) : (
          <a
            className="navbar-brand text-white"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            href="#"
          >
            Faculty Of Technology, Marking Management System
          </a>
        )}

        <ul className="navbar-nav ms-auto">
          {!authState.isAuthenticated /* check wether auth state is false or true */ ? (
            <li className="nav-item m-1">
              <Link type="button" className="btn btn-outline-light" to="/login">
                Sign in
              </Link>
            </li>
          ) : (
            <li>
              {/* handle logout function */}
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
      <div
        className="offcanvas offcanvas-start"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
            Mr. {authState?.idToken?.claims.name /*Display user's username*/}
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
              <Link
                className="nav-link px-2 mb-2 btn footer-color text-white"
                to={"/home"}
              >
                Dashbord
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link px-2 mb-2 btn footer-color text-white"
                to={"/lecture"}
              >
                Score Feeding
              </Link>
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
    </nav>
  );
};
