import { Button, Flex, useToast, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useQuery from '../../../hooks/useQuery';
import { ReactComponent as SubscribeLogo } from './images/subscribe.svg';

const ResubscribePage: React.VFC = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const toast = useToast();

  const token = query.get('token');

  useEffect(() => {
    // if no token, navigate back to the index page.
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  const onResubscribe = () => {
    fetch(
      `/api/receivers/subscriptionStatus?token=${token}&subscriptionStatus=true`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then(() => {
        toast({
          title: 'You have been subscribed successfully.',
          description: 'We are so glad to have you back!',
          status: 'success',
          position: 'top',
          duration: 6000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: 'There was an error with resubscribing you.',
          description: 'We will try to fix the error soon!',
          status: 'error',
          position: 'top',
          duration: 6000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex direction="column" justifyContent="center" align="center">
      <SubscribeLogo width="300" height="300" />
      <Text fontSize="2xl" fontWeight="light" align="center">
        We're so glad to have you back. <br />
        Are you sure you want to resubscribe?
      </Text>
      <Button mt="4" colorScheme="green" onClick={onResubscribe}>
        Resubscribe
      </Button>
    </Flex>
  );
};

export default ResubscribePage;
