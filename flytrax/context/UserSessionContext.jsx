import React, { createContext, useState } from "react";

export const UserSessionContext = createContext({});

export const UserSessionContextProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  return (
    <UserSessionContext.Provider value={{ session, setSession }}>
      {children}
    </UserSessionContext.Provider>
  );
};
