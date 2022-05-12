import React, { createContext, useState } from "react";

const metaInfo = JSON.parse(localStorage.getItem("currentUser"));

const appUrl = "https://mren-hotel.herokuapp.com";

const foodList = JSON.parse(localStorage.getItem("foodList")) || [];

export const initial = { metaInfo, foodList, appUrl };

export const Smooth = createContext(initial);

export const Provider = ({ children }) => {
  const [data, setData] = useState(initial);
  return (
    <Smooth.Provider value={{ data, setData }}>{children}</Smooth.Provider>
  );
};
