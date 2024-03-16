// import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      const newState = action.payload;

      return {
        ...newState,
      };
    case 'DELETE':
      //   const newState = state.filter((item) => item !== action.payload);
      return {
        // ...newState,
      };
    default:
      return state;
  }
};
export default reducer;
