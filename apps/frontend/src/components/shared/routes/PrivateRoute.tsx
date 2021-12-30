import { ReactNode, FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Loader from '../Loader/Loader';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
