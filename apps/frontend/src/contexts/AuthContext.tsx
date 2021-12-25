import { useToast } from '@chakra-ui/react';
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../types/User';
import { createGenericContext } from './GenericContext';

export interface AuthContextType {
  // TODO: Update to shared User type
  user: User;
  loading: boolean;
  signIn: (email: string, password: string, callback?: VoidFunction) => void;
  signOut: (callback?: VoidFunction) => void;
  signUp: (user: User, callback?: VoidFunction) => void;
}

const [auth, AuthContextProvider] = createGenericContext<AuthContextType>();

export const useAuth = auth;

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const toast = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await fetch('/api/auth/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin',
        });
        const response = await data.json();
        if (response.statusCode === 200) {
          setUser(response.user);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const signIn = (email: string, password: string, callback?: VoidFunction) => {
    const signInUser = async (email: string, password: string) => {
      const data = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const response = await data.json();

      if (response.statusCode === 401) {
        toast({
          title: 'Error',
          description: response.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      } else {
        setUser(response);
        navigate('/dashboard');
      }
    };

    signInUser(email, password);
  };

  const signUp = (user: User, callback?: VoidFunction) => {
    const signUpUser = async (user: User) => {
      const data = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const response = await data.json();
      if (response.statusCode !== 500) {
        setUser(response);
        navigate('/dashboard');
      } else {
        for (const { message } of response.error.errors) {
          toast({
            title: 'Error',
            description: message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top',
          });
        }
      }
    };
    signUpUser(user);
  };

  const signOut = () => {
    fetch('api/auth/logout', {
      method: 'POST',
    })
      .then(() => setUser(null))
      .finally(() => navigate('/login'));
  };

  const value = {
    user,
    signIn,
    signUp,
    signOut,
    loading,
  };

  return <AuthContextProvider value={value}>{children}</AuthContextProvider>;
};

export default AuthProvider;
