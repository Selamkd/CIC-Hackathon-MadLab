import React, { createContext, useEffect, useReducer, useContext } from 'react';
import reducer from '../ContextReducer';
import { questions } from '../../utils/Questions';
import { getData, storeData, resetStorage } from '../../utils/AsyncStorage';

const AllQuestionsContext = createContext();

const initialState = questions;
export const AllQuestionsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allQuestions = await getData('allQuestions');
        console.log('getD', allQuestions.key ? true : false);
        if (allQuestions) {
          dispatch({
            type: 'UPDATE',
            payload: allQuestions || initialState,
          });
        }
      } catch (error) {
        console.log('AllQuestionsContext error Fetching data: ', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        console.log('saveing......');
        await storeData('allQuestions', state);
      } catch (error) {
        console.log(error);
      }
    };

    saveData();
  }, [state]);

  return (
    <AllQuestionsContext.Provider value={{ state, dispatch }}>
      {children}
    </AllQuestionsContext.Provider>
  );
};

export const useAllQuestions = () => useContext(AllQuestionsContext);
