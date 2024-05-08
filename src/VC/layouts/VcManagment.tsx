import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { SpinerLoading } from "../../layouts/Utils/SpinerLoading";
import { Navebar } from "../../Lecture/layouts/NavbarAndFooter/Navebar";

export const VcManagment: React.FC = () => {
  // to handle Spring Loading
  const [isLoading, setIsloading] = useState(false);
  // to handle okta authentication
  const { authState } = useOktaAuth();
  // to handle new score feeding

  if (authState?.accessToken?.claims.userType === undefined) {
    return <Redirect to="/home" />;
  }
  // to desplay score feeding form
  return (
    <div className="container">
      <Navebar />
      <div className="mt-5">
        <h1>Manage certify</h1>

        <div className="container mt-3 md-5">
          <div className="card shadow-lg">
            <div className="card-header card-headr-color">
              <h5>Vice Chansoller Section </h5>
            </div>
            {isLoading ? (
              <SpinerLoading /> // to load spinner
            ) : (
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Department</label>
                    <select className="form-select">
                      <option value="option1">ICT</option>
                      <option value="option2">ET</option>
                      <option value="option3">BST</option>
                    </select>
                    <button
                      type="button"
                      className="btn btn-success mt-3 ms-2"
                      // onClick={CompleteCourse} // call submit score method
                    >
                      View Result sheet
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
