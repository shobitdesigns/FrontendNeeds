import { createContext, useContext, useState } from "react";

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);



  const addToCompare = (product, index = null) => {
    setCompareList((prev) => {
      const newList = [...prev];

      if (index !== null) {
        newList[index] = product;
      } else {
        const exists = newList.find((item) => item.id === product.id);
        if (!exists) {
          if (newList.length < 4) {
            newList.push(product);
          }
        }
      }

      return newList;
    });
  };

  const removeFromCompare = (id) => {
    setCompareList((prev) => prev.filter((item) => item.id !== id));
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
