import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { createGenericContext } from './GenericContext';

export interface AuthContextType {
  // TODO: Update to shared User type
  user: any;
  signIn: (email: string, password: string, callback?: VoidFunction) => void;
  signOut: (callback?: VoidFunction) => void;
}

const [auth, AuthContextProvider] = createGenericContext<AuthContextType>();

export const useAuth = auth;

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    try {
      const data = await fetch('/api/auth/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      });
      const response = await data.json();
      console.log({ response });
      if (response.statusCode === 401) {
        throw new Error('bad');
      }
      navigate('/dashboard');
      setUser(response);
    } catch (e) {
      // navigate('/login');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const signIn = (email: string, password: string, callback?: VoidFunction) => {
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        navigate('/dashboard');
      })
      .catch((e) => {
        console.log(`There was an error with logging in: ${e}`);
      });
  };

  const signOut = () => {
    fetch('api/auth/logout', {
      method: 'POST',
    })
      .then(() => setUser(null))
      .catch((e) => console.log(e));
    navigate('/');
  };

  const value = {
    user,
    signIn,
    signOut,
  };

  return <AuthContextProvider value={value}>{children}</AuthContextProvider>;
};

export default AuthProvider;
