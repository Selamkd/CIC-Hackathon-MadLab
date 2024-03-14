// import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      const newData = action.payload;

      return {
        ...newData,
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
