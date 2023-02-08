import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const ProtectedRouteElement = ({ loggedIn, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn === false) {
      navigate('/sign-in');
    }
  }, [loggedIn, navigate]);

  return <>{children}</>;
};

export default ProtectedRouteElement;
