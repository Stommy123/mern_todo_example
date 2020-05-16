import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { parseStringifiedJSON, mapErrorCodeToMessage } from 'utils';

export const AppContext = createContext({});

const getUserFromStorage = _ => parseStringifiedJSON(sessionStorage.getItem('CURRENT_USER'));

export const AppContextProvider = ({ children }) => {
  const history = useHistory();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(_ => getUserFromStorage() || null);

  const signIn = async credentials => {
    const { data } = await axios.post('/sign-in', credentials);

    if (data.error || !data.success) {
      await signOut();
      throw new Error(mapErrorCodeToMessage(data.error));
    }

    const userToSet = data.user;

    setCurrentUser(userToSet);
    sessionStorage.setItem('CURRENT_USER', JSON.stringify(userToSet));

    const isFromLoginPath = location.pathname.includes('/login');
    if (isFromLoginPath) history.push('/');
  };

  const signOut = async _ => {
    await axios.post('/sign-out');

    setCurrentUser(null);
    sessionStorage.removeItem('CURRENT_USER');
  };

  // if there is a user in session storage, we sign them in on intial load
  useEffect(_ => {
    const userInStorage = getUserFromStorage();

    if (!userInStorage) return;

    const signInUserFromStorage = async _ => {
      try {
        await signIn({ _id: userInStorage._id });
      } catch (err) {
        console.error('Error signing in user from storage', err);
      }
    };
    signInUserFromStorage();
  }, []);

  return <AppContext.Provider value={{ currentUser, signIn, signOut }}>{children}</AppContext.Provider>;
};
