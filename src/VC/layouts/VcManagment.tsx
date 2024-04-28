import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { SpinerLoading } from "../../layouts/Utils/SpinerLoading";

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
              <div className="card-body"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
