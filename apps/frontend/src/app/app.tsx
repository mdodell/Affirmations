import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Text } from '@chakra-ui/react';
import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';
import Header from '../components/shared/header/header';

export function App() {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetch('/api')
      .then((data) => data.json())
      .then((msg: { message: string }) => setMessage(msg.message));
  }, []);
  return (
    <>
      <Header />
      <Text>{message}</Text>
    </>
  );
}

export default App;
