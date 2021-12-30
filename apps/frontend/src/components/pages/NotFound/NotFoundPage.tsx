import { Text, Flex, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as NotFoundLogo } from './images/not-found.svg';

const NotFoundPage: React.VFC = () => {
  const navigate = useNavigate();
  return (
    <Flex direction="column" justifyContent="center" align="center">
      <NotFoundLogo width="300px" height="300px" />
      <Text fontSize="2xl" fontWeight="light">
        Page not found!
      </Text>
      <Button mt="4" onClick={() => navigate('/')}>
        Go back to safety
      </Button>
    </Flex>
  );
};

export default NotFoundPage;
