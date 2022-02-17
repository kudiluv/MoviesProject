import AsyncStorage from '@react-native-community/async-storage';
import React, {useContext, useEffect, useState} from 'react';

type UserContextType = {
  accessToken: string;
  setAccessToken?: (value: string) => void;
};

const initialState: UserContextType = {
  accessToken: '',
};

const UserContext = React.createContext(initialState);

export const useUser = () => useContext(UserContext);

export const UserContexProvider = ({children}: any) => {
  const [accessToken, setAccessToken] = useState('');
  const [synced, setSynced] = useState(false);
  useEffect(() => {
    if (accessToken) {
      AsyncStorage.setItem('ACCESS_TOKEN', accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    AsyncStorage.getItem('ACCESS_TOKEN').then(value => {
      if (value) {
        setAccessToken(value);
      }
      setSynced(true);
    });
  }, []);
  return synced ? (
    <UserContext.Provider value={{accessToken, setAccessToken}}>
      {children}
    </UserContext.Provider>
  ) : (
    <></>
  );
};

export default UserContext;
