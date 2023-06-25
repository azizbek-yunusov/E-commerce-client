import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { token } from "../utils/baseUrls";

const Protected = ({ children }) => {
  const { isLogged } = useSelector((state) => state.auth);

  if (!token || !isLogged) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default Protected;
