import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { LoaderOverlay } from "../../components/common/loader/LoderOverley";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <LoaderOverlay />;
  }

  if (
    user &&
    user?.user_role == "super-admin" &&
    user?.is_verified == true &&
    user?.user_status == "active" &&
    user?.login_credentials
  ) {
    return children;
  }

  return <Navigate to="/sign-in" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
