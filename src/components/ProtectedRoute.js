import { useEffect } from 'react';
import { Navigate } from 'react-router';

const ProtectedRouteElement = ({ loggedIn, children }) => {
  return loggedIn === true ? (
    <>{children}</>
  ) : (
    <Navigate to='/sign-in' replace />
  );
};

export default ProtectedRouteElement;
