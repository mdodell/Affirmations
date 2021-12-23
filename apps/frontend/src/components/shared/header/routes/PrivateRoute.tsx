import { ReactNode, FC } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContextType, useAuth } from '../../../../contexts/AuthContext';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth();
  console.log({ user });

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
