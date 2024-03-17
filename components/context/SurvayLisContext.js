import React, { createContext, useEffect, useReducer, useContext } from 'react';
import reducer from '../ContextReducer';
import { fetchData, saveData } from '../../utils/ContextHelper';
const SurvayListContext = createContext();
const initialState = {
  data: [],
  firstLoad: true,
};

export const SurvayListProvider = ({ children }) => {
  const [stateSurvayList, dispatchSurvayList] = useReducer(
    reducer,
    initialState
  );
  //Update Global state from AsyncStore
  useEffect(() => {
    fetchData('survayList', initialState, dispatchSurvayList);
  }, []);
  useEffect(() => {
    saveData('survayList', stateSurvayList);
  }, [stateSurvayList]);

  return (
    <SurvayListContext.Provider value={{ stateSurvayList, dispatchSurvayList }}>
      {children}
    </SurvayListContext.Provider>
  );
};

export const useSurvayList = () => useContext(SurvayListContext);
