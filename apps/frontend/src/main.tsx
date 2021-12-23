import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './components/app';
import Header from './components/shared/header/header';
import AuthProvider from './contexts/AuthContext';
import LoginPage from './components/pages/Login/LoginPage';
import DashboardPage from './components/pages/Dashboard/DashboardPage';
import PrivateRoute from './components/shared/header/routes/PrivateRoute';

ReactDOM.render(
  <StrictMode>
    <ChakraProvider>
      <Router>
        <AuthProvider>
          <Flex direction="column" minHeight="100vh">
            <Header />
            <Flex
              flexGrow={1}
              flexDirection="column"
              justify="center"
              align="center"
            ></Flex>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Flex>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
);
