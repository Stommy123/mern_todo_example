import React, { createContext, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { StorageKey, ApiRoutes } from 'global_constants';
import { parseStringifiedJSON, mapErrorCodeToMessage } from 'utils';
import { useRequestClient } from 'hooks';

export const AppContext = createContext({});

const getUserFromStorage = _ => parseStringifiedJSON(sessionStorage.getItem(StorageKey.CURRENT_USER));

export const AppContextProvider = ({ children }) => {
  const requestClient = useRequestClient();

  const history = useHistory();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(_ => getUserFromStorage() || null);

  const signIn = async credentials => {
    const { data } = await requestClient.post(ApiRoutes.signIn, credentials);

    if (data.error || !data.success) {
      setCurrentUser(null);
      sessionStorage.removeItem(StorageKey.AUTH_TOKEN);
      sessionStorage.removeItem(StorageKey.CURRENT_USER);
      throw new Error(mapErrorCodeToMessage(data.error));
    }

    const userToSet = data.user;

    setCurrentUser(userToSet);
    sessionStorage.setItem(StorageKey.CURRENT_USER, JSON.stringify(userToSet));
    sessionStorage.setItem(StorageKey.AUTH_TOKEN, data.token);

    const isFromLoginPath = location.pathname.includes('/login');
    if (isFromLoginPath) history.push('/');
  };

  const signOut = async _ => {
    await requestClient.post(ApiRoutes.signOut);

    setCurrentUser(null);
    sessionStorage.removeItem(StorageKey.CURRENT_USER);
    sessionStorage.removeItem(StorageKey.AUTH_TOKEN);
    history.push('/');
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
