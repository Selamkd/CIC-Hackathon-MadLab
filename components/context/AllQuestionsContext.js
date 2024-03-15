import React, { createContext, useEffect, useReducer, useContext } from 'react';
import reducer from '../ContextReducer';
import { questions } from '../../utils/Questions';
import { getData, storeData, resetStorage } from '../../utils/AsyncStorage';

const AllQuestionsContext = createContext();

const initialState = questions;
export const AllQuestionsProvider = ({ children }) => {
  const [allQuestionsState, dispatchAllQuestions] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allQuestions = await getData('allQuestions');

        if (allQuestions) {
          dispatchAllQuestions({
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
        await storeData('allQuestions', allQuestionsState);
      } catch (error) {
        console.log(error);
      }
    };

    saveData();
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
