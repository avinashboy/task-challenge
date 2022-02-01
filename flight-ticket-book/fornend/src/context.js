import { createContext, useState } from "react";

const appUrl = "https://flightpayement.herokuapp.com/";

const initial = { appUrl };

export const Flight = createContext(initial);

export const Provider = ({ children }) => {
  const [data, setData] = useState(initial);
  return (
    <Flight.Provider
      value={{
        data,
        setData,
      }}
    >
      {children}
    </Flight.Provider>
  );
};
