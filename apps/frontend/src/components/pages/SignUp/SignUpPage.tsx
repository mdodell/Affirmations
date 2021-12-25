import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
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
import { BiUser } from 'react-icons/bi';
import { Link as RouterLink } from 'react-router-dom';
import { ChangeEvent, useCallback, useReducer, useState } from 'react';
import { AuthContextType, useAuth } from '../../..//contexts/AuthContext';

interface SignUpFormState {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

const reducer = (
  state: SignUpFormState,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case action.type:
      return {
        ...state,
        [action.type]: action.payload,
      };
    default:
      return state;
  }
};

const SignUpPage: React.VFC = () => {
  const { signUp } = useAuth() as AuthContextType;

  const [showPassword, setShowPassword] = useBoolean(false);
  const [showConfirmPassword, setShowConfirmPassword] = useBoolean(false);

  const [state, dispatch] = useReducer(reducer, {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });

  const { email, firstName, lastName, password, confirmPassword } = state;

  const samePassword = password !== confirmPassword;

  const setFormValue = useCallback(
    (key: string, event: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: key,
        payload: (event.target as HTMLInputElement).value,
      });
    },
    []
  );

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
          Register
        </Text>
        <Box maxW={{ base: '90%', md: '468px' }}>
          <Box bg="white" boxShadow="md" padding="30">
            {/* Email */}
            <FormControl isRequired={true}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={MdOutlineEmail} color="gray.300" />}
                />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setFormValue('email', event)}
                  placeholder="effirmations@effirmations-app.com"
                />
              </InputGroup>
            </FormControl>
            <HStack mt={2}>
              {/* First Name */}
              <FormControl isRequired={true}>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={BiUser} color="gray.300" />}
                  />
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(event) => setFormValue('firstName', event)}
                    placeholder="John"
                  />
                </InputGroup>
              </FormControl>
              {/* Last Name */}
              <FormControl isRequired={true}>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={BiUser} color="gray.300" />}
                  />
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(event) => setFormValue('lastName', event)}
                    placeholder="Doe"
                  />
                </InputGroup>
              </FormControl>
            </HStack>
            {/* Password */}
            <FormControl isRequired={true}>
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
                  value={state.password}
                  onChange={(event) => setFormValue('password', event)}
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
            {/* Confirm Password */}
            <FormControl isRequired={true} isInvalid={samePassword}>
              <FormLabel htmlFor="confirmPassword" mt={2}>
                Confirm Password
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={AiOutlineLock} color="gray.300" />}
                />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(event) => setFormValue('confirmPassword', event)}
                  placeholder="Enter password"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={setShowConfirmPassword.toggle}
                  >
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {samePassword && (
                <FormErrorMessage>Passwords do not match.</FormErrorMessage>
              )}
            </FormControl>

            <Button
              disabled={Object.values(state).includes('')}
              width="100%"
              padding="sm"
              textColor="white"
              mt="4"
              onClick={() => signUp({ firstName, lastName, password, email })}
            >
              Sign Up
            </Button>
          </Box>
          <Text align="right" w="100%" my={2}>
            Already have an account?{' '}
            <Link as={RouterLink} to="/login" color="teal.500">
              Login
            </Link>
          </Text>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUpPage;
