// import { useReducer } from "react";

const reducer = (state, action) => {
  console.log('reducer logs : state:', state, 'action:', { ...action });
  switch (action.type) {
    case 'UPDATE':
      const newState = action.payload;

      return {
        ...newState,
      };

    case 'SET_FIRST_APP_LOAD':
      //   const newState = state.filter((item) => item !== action.payload);
      return {
        ...state,
        firstLoad: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
