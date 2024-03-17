import React, { createContext, useEffect, useReducer, useContext } from 'react';
import reducer from '../ContextReducer';
import { fetchData, saveData } from '../../utils/ContextHelper';
const UserConfigContext = createContext();
const initialState = {
  customCompanyName: 'Your Business',
  customizedSecondSplash: null,
  adminPassword: null,
  customBackgroundColor: '#000005',
  isUserSet: false,
  firstLoad: true,
};

export const UserConfigProvider = ({ children }) => {
  const [stateConfig, dispatchConfig] = useReducer(reducer, initialState);
  //Update Global state from AsyncStore
  useEffect(() => {
    fetchData('config', initialState, dispatchConfig);
  }, []);
  useEffect(() => {
    saveData('config', stateConfig);
  }, [stateConfig]);

  return (
    <UserConfigContext.Provider value={{ stateConfig, dispatchConfig }}>
      {children}
    </UserConfigContext.Provider>
  );
};

export const useConfig = () => useContext(UserConfigContext);
