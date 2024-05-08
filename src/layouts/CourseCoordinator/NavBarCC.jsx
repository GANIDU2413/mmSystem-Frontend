import { Link } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { SpinerLoading } from "../Utils/SpinerLoading";
import { IoMenuSharp } from "react-icons/io5";

export default function NavBarCC() {
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) {
    return <SpinerLoading />;
  }

  const handleLogout = async () => oktaAuth.signOut();

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
                            <div>
                                <h6>Course Cordinator</h6>
                                <p className=" mx-5">{authState?.idToken?.claims.name}</p>
                            </div>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/course_cordinator">
                                    Dashboard
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/ccmarksapproval">
                                    Marks Approval
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/managestaff">
                                    View CA Eligibility
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/attendencesysan">
                                    View FA Eligibility
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/medicalsysan">
                                    Course Criteria
                                </a>
                            </li>
                            <hr></hr>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}
