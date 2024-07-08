// import { Link, NavLink } from "react-router-dom";
// import { useOktaAuth } from "@okta/okta-react";
// import { SpinerLoading } from "../Utils/SpinerLoading";
// import { IoMenuSharp } from "react-icons/io5";

// export const NavebarDean = () => {
//   const { oktaAuth, authState } = useOktaAuth();

//   if (!authState) {
//     return <SpinerLoading />;
//   }

//   const handleLogout = async () => oktaAuth.signOut();

//   console.log(authState);
//   return (
//     <nav className="navbar bg-primary fixed-top">
//       <div className="container-fluid">
//         <a
//           className="navbar-brand text-white"
//           data-bs-toggle="offcanvas"
//           data-bs-target="#offcanvasNavbar"
//           aria-controls="offcanvasNavbar"
//           href="#"
//           style={{
//             cursor: "pointer",
//             display: "flex",
//             alignItems: "center",
//             gap: "10px",
//           }}
//         >
//           <IoMenuSharp size={35} /> Faculty Of Technology, Marking Management
//           System
//         </a>
//         <ul className="navbar-nav ms-auto">
//           {!authState.isAuthenticated ? (
//             <li className="nav-item m-1">
//               <Link type="button" className="btn btn-outline-light" to="/login">
//                 Sign in
//               </Link>
//             </li>
//           ) : (
//             <li>
//               <button className="btn btn-outline-light" onClick={handleLogout}>
//                 Logout
//               </button>
//             </li>
//           )}
//         </ul>
//         <div
//           className="offcanvas offcanvas-start"
//           id="offcanvasNavbar"
//           aria-labelledby="offcanvasNavbarLabel"
//         >
//           <div className="offcanvas-header">
//             <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
//               User Name
//             </h5>
//             <button
//               type="button"
//               className="btn-close"
//               data-bs-dismiss="offcanvas"
//               aria-label="Close"
//             ></button>
//           </div>
//           <div className="offcanvas-body">
//             <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
//               <li className="nav-item">
//                 <a className="nav-link active" aria-current="page" href="dean">
//                   Dashboard
//                 </a>
//               </li>

              

//               {/* <li className="nav-item">
//                 <a className="nav-link active" aria-current="page" href="#">
//                   Student Details
//                 </a>
//               </li> */}
//               <li className="nav-item dropdown">
//                 <a
//                   className="nav-link dropdown-toggle"
//                   href="#"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   Final Marks
//                 </a>
//                 <ul className="dropdown-menu">
//                   <li>
//                       <a href="/deanFinalMarkSheet/1/1" className="dropdown-item">
//                           Level I Sem I
//                       </a>
//                   </li>
//                   <li>
//                       <Link to="/deanFinalMarkSheet/1/2" className="dropdown-item">
//                       Level I Sem II
//                       </Link>
//                   </li>
//                   <li>
//                       <Link to="/deanFinalMarkSheet/2/1" className="dropdown-item">
//                       Level II Sem I
//                       </Link>
//                   </li>
//                   <li>
//                     <Link to="/deanFinalMarkSheet/2/2" className="dropdown-item">
//                       Level II Sem II
//                     </Link>
//                   </li>
//                   <li>
//                     <a href="/deanFinalMarkSheet/3/1" className="dropdown-item">
//                         Level III Sem I
//                     </a>
//                   </li>
//                   <li>
//                      <Link to="/deanFinalMarkSheet/3/2" className="dropdown-item">
//                         Level III Sem II
//                     </Link>
//                   </li>
//                   <li>
//                      <Link to="/deanFinalMarkSheet/4/1" className="dropdown-item">
//                       Level IV Sem I
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/deanFinalMarkSheet/4/2" className="dropdown-item">
//                       Level IV Sem II
//                     </Link>
//                   </li>
//                 </ul>
//               </li>
//             </ul>

//             <hr></hr>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

import { Link } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { SpinerLoading } from "../Utils/SpinerLoading";
import { IoMenuSharp } from "react-icons/io5";

export const NavebarDean = () => {
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) {
    return <SpinerLoading />;
  }

  const handleLogout = async () => oktaAuth.signOut();

  console.log(authState);


  //const levels=["I","II","III","IV"];
  const levels =[1,2,3,4]
  //const semesters=["I","II"];
  const semesters=[1,2]
  const department=["ICT","ET","BST"];

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
            <h6 className="offcanvas-title" id="offcanvasNavbarLabel">
            </h6>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
            
          </div>
          <div className="offcanvas-body">
              
              <div className=" h5 mt-2">
                {/*Display user's username*/}
                {authState?.idToken?.claims.name }
              </div>
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3" style={{listStyleType:"none"}}>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/dean">
                  Dashboard
                </a>
              </li>
              <hr />
              <li className="nav-item">
                <a className="nav-link active" aria-current="page">
                    Approvel of Marks
                </a>
              </li>
              {department.map((dept, index) => (
                
                <li className="nav-item dropdown mx-5">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  
                >
                  Department of {dept}
                </a>
                <ul className="dropdown-menu" >
                  {levels.map((level, index) => {
                    return semesters.map((semester, index) => (    
                      <>
                        <li className="nav-item">
                          <a href={`/deanFinalMarkSheet/${level}/${semester}/${dept}`} className="dropdown-item">
                            Level {level} Sem {semester}
                          </a>
                        </li>
                        
                      </>
                    ));
                  })}
                </ul>
              </li>
              
              
            ))}
            <hr />
            </ul>

            
          </div>
        </div>
      </div>
    </nav>
  );
};

