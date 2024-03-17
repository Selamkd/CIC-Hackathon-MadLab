import React, { createContext, useEffect, useReducer, useContext } from 'react';
import reducer from '../ContextReducer';
import { questions } from '../../utils/Questions';
import { getData, storeData, resetStorage } from '../../utils/AsyncStorage';
import { fetchData, saveData } from '../../utils/ContextHelper';

const AllQuestionsContext = createContext();

const initialState = questions;
export const AllQuestionsProvider = ({ children }) => {
  const [allQuestionsState, dispatchAllQuestions] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    fetchData('allQuestions', initialState, dispatchAllQuestions);
  }, []);

  useEffect(() => {
    saveData('allQuestions', allQuestionsState);
  }, [allQuestionsState]);

  return (
    <AllQuestionsContext.Provider
      value={{ allQuestionsState, dispatchAllQuestions }}
    >
      {children}
    </AllQuestionsContext.Provider>
  );
};

export const useAllQuestions = () => useContext(AllQuestionsContext);
