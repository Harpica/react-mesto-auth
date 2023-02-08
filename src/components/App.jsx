import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import Content from './Content';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import ProtectedRouteElement from './ProtectedRoute';
import Register from './Register';
import { authApi } from '../utils/api';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useLocalStorage('user', {});

  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipStatus, setTooltipStatus] = useState('');

  const handleLoggedInCheck = useCallback(() => {
    setIsLoading(true);
    const token = JSON.parse(window.localStorage.getItem('user')).token;
    if (token !== undefined) {
      authApi
        .getUserData(token)
        .then(() => {
          setLoggedIn(true);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.log('Token is undefined');
      setIsLoading(false);
    }
  }, [setIsLoading, setLoggedIn]);

  useEffect(() => {
    handleLoggedInCheck();
  }, [handleLoggedInCheck]);

  async function handleLogin(values) {
    return authApi.loginUser(values).then((res) => {
      setLoggedIn(true);
      setUser(res);
    });
  }

  function handleLogout() {
    setLoggedIn(false);
    setUser({});
  }

  function closePopup() {
    setTooltipOpen(false);
  }

  return (
    <div className='root'>
      <BrowserRouter>
        <Routes>
          <Route
            index
            path='/'
            element={
              isLoading ? (
                <></>
              ) : (
                <ProtectedRouteElement
                  loggedInCheck={handleLoggedInCheck}
                  loggedIn={loggedIn}
                >
                  <Content userToken={user.token} handleLogout={handleLogout} />
                </ProtectedRouteElement>
              )
            }
          />
          <Route
            path='/sign-up'
            element={
              <Register
                setTooltipOpen={setTooltipOpen}
                setTooltipStatus={setTooltipStatus}
              />
            }
          />
          <Route
            path='/sign-in'
            element={
              <Login
                handleLogin={handleLogin}
                setTooltipOpen={setTooltipOpen}
                setTooltipStatus={setTooltipStatus}
              />
            }
          />
        </Routes>
      </BrowserRouter>
      <InfoTooltip
        isOpen={isTooltipOpen}
        onClose={closePopup}
        status={tooltipStatus}
      />
    </div>
  );
};

export default App;
