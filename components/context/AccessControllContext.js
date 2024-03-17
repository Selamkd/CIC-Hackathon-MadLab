import React, { createContext, useContext, useState } from 'react';
// import reducer from '../ContextReducer';

const AccessControllContext = createContext();

export const AccessControllProvider = ({ children }) => {
  const [stateAccessConteroll, setAccessContoroll] = useState(true);
  return (
    <AccessControllContext.Provider
      value={{ stateAccessConteroll, setAccessContoroll }}
    >
      {children}
    </AccessControllContext.Provider>
  );
};

export const useAccessControll = () => useContext(AccessControllContext);
