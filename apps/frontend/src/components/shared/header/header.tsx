import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useCallback } from 'react';
import { AuthContextType, useAuth } from '../../../contexts/AuthContext';
import { sign } from 'crypto';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, signIn, signOut } = useAuth() as AuthContextType;

  const handleToggle = useCallback(
    () => (isOpen ? onClose() : onOpen()),
    [isOpen, onClose, onOpen]
  );

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="purple.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={'tighter'}>
          E-ffirmations
        </Heading>
      </Flex>

      <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>

      <Stack
        direction={{ base: 'column', md: 'row' }}
        display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
        width={{ base: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <Text>About</Text>
        <Text>Hello</Text>
        <Text>Test</Text>
      </Stack>

      <Box
        display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
        mt={{ base: 4, md: 0 }}
      >
        {user ? (
          <Button
            onClick={() => signOut()}
            variant="outline"
            _hover={{
              bg: 'purple.700',
              borderColor: 'purple.700',
            }}
            cursor="pointer"
          >
            Log out
          </Button>
        ) : (
          <Button
            onClick={() => null}
            variant="outline"
            _hover={{
              bg: 'purple.700',
              borderColor: 'purple.700',
            }}
            cursor="pointer"
          >
            Login
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
