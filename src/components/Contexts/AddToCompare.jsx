// context/CompareContext.js
import { createContext, useContext, useState } from "react";

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);

  const addToCompare = (product) => {
    const exists = compareList.find((item) => item.id === product.id);
    if (!exists) {
      setCompareList([...compareList, product]);
    }
  };

  const removeFromCompare = (id) => {
    setCompareList(compareList.filter((item) => item.id !== id));
  };

  const isInCompare = (id) => {
    return compareList.some((item) => item.id === id);
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
