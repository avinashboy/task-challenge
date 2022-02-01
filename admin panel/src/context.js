import { createContext, useState } from "react";

const appUrl = "https://617a699fcb1efe001700fe3a.mockapi.io/";

const dataInfo = [];

const changeData = "";

export const initial = { appUrl, dataInfo, changeData };

export const Con = createContext(initial);

export const Provider = ({ children }) => {
  const [data, setData] = useState(initial);
  return <Con.Provider value={{ data, setData }}>{children}</Con.Provider>;
};
