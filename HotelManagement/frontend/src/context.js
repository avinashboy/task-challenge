import React, { createContext, useState } from "react";

const metaInfo = JSON.parse(localStorage.getItem("currentUser"));


const foodList = JSON.parse(localStorage.getItem("foodList")) || [];

export const initial = { metaInfo, foodList };

export const Smooth = createContext(initial);

export const Provider = ({ children }) => {
  const [data, setData] = useState(initial);
  return (
    <Smooth.Provider value={{ data, setData }}>{children}</Smooth.Provider>
  );
};
