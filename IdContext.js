// context/IdContext.js
import React, { createContext, useContext, useState } from 'react';

 const IdContext = createContext();

export const IdProvider = ({ children }) => {
  const [ids, setIds] = useState(null);

  return (
    <IdContext.Provider value={{ ids, setIds }}>
      {children}
    </IdContext.Provider>
  );
};

export const useId = () => useContext(IdContext);
