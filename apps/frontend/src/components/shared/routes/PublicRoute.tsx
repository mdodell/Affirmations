import { ReactNode, FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Loader from '../loader/Loader';

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: FC<PublicRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return user ? <Navigate to="/dashboard" /> : <>{children}</>;
};

export default PublicRoute;
