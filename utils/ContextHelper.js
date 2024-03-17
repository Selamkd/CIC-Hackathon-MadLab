import { getData, storeData } from '././AsyncStorage';

export const fetchData = async (contextString, initState, contextDipatch) => {
  try {
    const data = await getData(contextString);

    if (!data) {
      console.log('loading initial ', contextString, initState);
      await storeData(contextString, initState);
      // dispatchConfig({ type: 'UPDATE' }, { payload: initialState });
      contextDipatch({ type: 'SET_FIRST_APP_LOAD', payload: false });
      console.log('IS FIRSL LOAD SET TO FALSE');
    } else {
      console.log('loading from AsyncStore', data);
      contextDipatch({ type: 'UPDATE', payload: data });
    }
  } catch (error) {
    console.log('UserConfigContext error Fetching data: ', error);
  }
};

export const saveData = async (contextString, contextState) => {
  if (!contextState.firstLoad && contextState) {
    try {
      await storeData(contextString, contextState);
      console.log('....savin updated Context', contextState);
    } catch (error) {
      console.log(error);
    }
  }
};
