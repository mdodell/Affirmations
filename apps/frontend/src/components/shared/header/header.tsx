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

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      bg="pink.500"
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
        <Button
          variant="outline"
          _hover={{
            bg: 'pin.700',
            borderColor: 'pink.700',
          }}
          cursor="pointer"
        >
          Create account
        </Button>
      </Box>
    </Flex>
  );
};

export default Header;
