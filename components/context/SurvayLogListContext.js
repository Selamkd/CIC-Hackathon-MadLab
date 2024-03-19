import React, { createContext, useEffect, useReducer, useContext } from 'react';
import reducer from '../ContextReducer';
import { fetchData, saveData } from '../../utils/ContextHelper';
const SurvayLogContext = createContext();
const initialState = {
  data: {},
  firstLoad: true,
};

export const SurvayLogProvider = ({ children }) => {
  const [stateSurvayLog, dispatchSurvayLog] = useReducer(reducer, initialState);
  //Update Global state from AsyncStore
  useEffect(() => {
    fetchData('survayLog', initialState, dispatchSurvayLog);
  }, []);
  useEffect(() => {
    saveData('survayLog', stateSurvayLog);
  }, [stateSurvayLog]);

  return (
    <SurvayLogContext.Provider value={{ stateSurvayLog, dispatchSurvayLog }}>
      {children}
    </SurvayLogContext.Provider>
  );
};

export const useSurvayLog = () => useContext(SurvayLogContext);
