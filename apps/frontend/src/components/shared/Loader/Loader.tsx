import { Flex, Spinner, Stack, Text } from '@chakra-ui/react';

const Loader: React.VFC = () => {
  return (
    <Flex grow={1} w="100%" justify="center" align="center">
      <Stack align="center">
        <Spinner size="xl" color="purple.500" />
        <Text
          align="center"
          fontSize="4xl"
          mt={2}
          fontWeight="bold"
          bgGradient="linear(to-r, purple.500, pink.500, blue.300)"
          bgClip="text"
        >
          Loading...
        </Text>
      </Stack>
    </Flex>
  );
};

export default Loader;
