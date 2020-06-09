import React, { useState } from 'react'

type ContextType = {
    token: string;
    setToken: (value: string) => void;
  };

  const AppContext = React.createContext<
  ContextType | undefined
>(undefined);

type Props = {
    children: React.ReactNode
  };

export const AppProvider = ({
    children
  }: Props) => {
    const [token, setToken] = React.useState('')
  
    return (
      <AppContext.Provider value={{ token, setToken }}>
        {children}
      </AppContext.Provider>
    );
  };

  export const useToken = () =>
  React.useContext(AppContext);