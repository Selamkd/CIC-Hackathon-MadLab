import React, { createContext, useEffect, useReducer, useContext } from 'react';
import { fetchData, saveData } from '../../utils/ContextHelper';
import { questions } from '../../utils/Questions';
import reducer from '../ContextReducer';

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
