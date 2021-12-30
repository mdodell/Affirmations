import { Flex, Text, Button, useToast, toast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useQuery from '../../../hooks/useQuery';
import { ReactComponent as SadLogo } from './images/sad.svg';

const UnsubscribePage: React.VFC = () => {
  const query = useQuery();
  const toast = useToast();
  const navigate = useNavigate();

  const token = query.get('token');

  const subscriptionStatus = query.get('subscriptionStatus');

  useEffect(() => {
    // if no subscription status or token, navigate back to the index page.
    if (!token || !subscriptionStatus) {
      navigate('/');
    }
  }, [token, subscriptionStatus, navigate]);

  const onUnsubscribe = () => {
    fetch(
      `/api/receivers/subscriptionStatus?token=${token}&subscriptionStatus=${subscriptionStatus}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then(() => {
        toast({
          title: 'You have been unsubscribed successfully.',
          description: 'We hope to see you back soon!',
          status: 'success',
          position: 'top',
          duration: 6000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: 'There was an error with unsubscribing you.',
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
      <SadLogo width="300" height="300" />
      <Text fontSize="2xl" fontWeight="light" align="center">
        We're sad to see you go. <br />
        Are you sure you want to unsubscribe?
      </Text>
      <Button mt="4" colorScheme="red" onClick={onUnsubscribe}>
        Unsubscribe
      </Button>
    </Flex>
  );
};

export default UnsubscribePage;
