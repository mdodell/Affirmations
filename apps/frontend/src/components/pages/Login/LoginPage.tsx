import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  Text,
  useBoolean,
} from '@chakra-ui/react';
import { MdOutlineEmail } from 'react-icons/md';
import { AiOutlineLock } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import { AuthContextType, useAuth } from '../../..//contexts/AuthContext';

const LoginPage: React.VFC = () => {
  const { signIn } = useAuth() as AuthContextType;

  const [showPassword, setShowPassword] = useBoolean(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  return (
    <Flex grow={1} w="100%" bg="gray.200" justify="center" align="center">
      <Stack align="center">
        <Icon as={FaUserCircle} w={12} h={12} color="purple.500" />
        <Text
          fontSize="6xl"
          fontWeight="extrabold"
          bgGradient="linear(to-r, purple.500, pink.500, blue.300)"
          bgClip="text"
        >
          Welcome
        </Text>
        <Box minW={{ base: '90%', md: '468px' }}>
          <Box bg="white" boxShadow="md" padding="30">
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={MdOutlineEmail} color="gray.300" />}
                />
                <Input
                  id="email"
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="effirmations@effirmations-app.com"
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password" mt={2}>
                Password
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={AiOutlineLock} color="gray.300" />}
                />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter password"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={setShowPassword.toggle}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Text align="right" color="teal.500">
              <Link as={RouterLink} to="forgot-password">
                Forgot your password?
              </Link>
            </Text>
            <Button
              disabled={emailInput === '' || passwordInput === ''}
              width="100%"
              padding="sm"
              textColor="white"
              mt="4"
              onClick={() => signIn(emailInput, passwordInput)}
            >
              Login
            </Button>
          </Box>
        </Box>
        <Text align="right" w="100%">
          New?{' '}
          <Link as={RouterLink} to="/sign-up" color="teal.500" my={2}>
            Sign up
          </Link>
        </Text>
      </Stack>
    </Flex>
  );
};

export default LoginPage;
