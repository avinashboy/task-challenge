import React,{ createContext, useState } from "react";

const appURL = "http://localhost:3030/";


const authToken = localStorage.getItem("token")

const linksInfo = []

export const initial = {authToken, appURL, linksInfo};

export const Short = createContext(initial);

export const Provider = ({ children }) => {
  const [data, setData] = useState(initial)
  return (
    <Short.Provider
      value={{data, setData}}
    >
      {children}
    </Short.Provider>
  );
};
