import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Header from './components/shared/header/header';
import AuthProvider from './contexts/AuthContext';
import LoginPage from './components/pages/Login/LoginPage';
import DashboardPage from './components/pages/Dashboard/DashboardPage';

import PublicRoute from './components/shared/routes/PublicRoute';
import PrivateRoute from './components/shared/routes/PrivateRoute';
import SignUpPage from './components/pages/SignUp/SignUpPage';
import theme from './constants/theme';
import NotFoundPage from './components/pages/NotFound/NotFoundPage';
import UnsubscribePage from './components/pages/Unsubscribe/UnsubscribePage';

ReactDOM.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <Router>
        <AuthProvider>
          <Flex direction="column" minHeight="100vh">
            <Header />
            <Flex
              flexGrow={1}
              flexDirection="column"
              justify="center"
              align="center"
            >
              <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <LoginPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/sign-up"
                  element={
                    <PublicRoute>
                      <SignUpPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <DashboardPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/unsubscribe"
                  element={
                    <PublicRoute>
                      <UnsubscribePage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="*"
                  element={
                    <PublicRoute>
                      <NotFoundPage />
                    </PublicRoute>
                  }
                />
              </Routes>
            </Flex>
          </Flex>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
);
