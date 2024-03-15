import React, { createContext, useEffect, useReducer, useContext } from 'react';
import reducer from '../ContextReducer';
import { questions } from '../../utils/Questions';
import { getData, storeData, resetStorage } from '../../utils/AsyncStorage';

const ConfigContext = createContext();

const initialState = {
  customCompanyName: null,
  customizedSecondSplash: null,
  adminPassword: null,
  isAdminPasswordSet: false,
  customBackgroundColor: null,
};

export const ConfigProvider = ({ children }) => {
  const [stateConfig, dispatchConfig] = useReducer(reducer, initialState);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = await getData('config');

        if (config) {
          dispatchConfig({
            type: 'UPDATE',
            payload: config || initialState,
          });
        }
      } catch (error) {
        console.log('ConfigContext error Fetching data: ', error);
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
    <ConfigContext.Provider value={{ stateConfig, dispatchConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
