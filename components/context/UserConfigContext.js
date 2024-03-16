import React, { createContext, useEffect, useReducer, useContext } from 'react';
import reducer from '../ContextReducer';
import { getData, storeData, resetStorage } from '../../utils/AsyncStorage';

const UserConfigContext = createContext();

const initialState = {
  customCompanyName: 'Your Business',
  customizedSecondSplash: null,
  adminPassword: null,
  customBackgroundColor: '#000005',
  isUserSet: false,
};

export const UserConfigProvider = ({ children }) => {
  const [stateConfig, dispatchConfig] = useReducer(reducer, initialState);

  //Update Global state from AsyncStore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = await getData('config');

        if (config) {
          dispatchConfig({
            type: 'UPDATE',
            payload: config,
          });
        }
      } catch (error) {
        console.log('UserConfigContext error Fetching data: ', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await storeData('config', stateConfig);
      } catch (error) {
        console.log(error);
      }
    };

    saveData();
  }, [stateConfig]);

  return (
    <UserConfigContext.Provider value={{ stateConfig, dispatchConfig }}>
      {children}
    </UserConfigContext.Provider>
  );
};

export const useConfig = () => useContext(UserConfigContext);
