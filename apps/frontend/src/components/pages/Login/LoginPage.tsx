import { Button } from '@chakra-ui/react';
import { AuthContextType, useAuth } from '../../..//contexts/AuthContext';

interface LoginPageProps {}

const LoginPage: React.VFC<LoginPageProps> = () => {
  const { signIn } = useAuth() as AuthContextType;
  return (
    <Button onClick={() => signIn('hello@test.com', 'abc12345')}>Login</Button>
  );
};

export default LoginPage;
