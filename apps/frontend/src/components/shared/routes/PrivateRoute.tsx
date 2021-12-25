import { ReactNode, FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <h1>Loading</h1>;
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
