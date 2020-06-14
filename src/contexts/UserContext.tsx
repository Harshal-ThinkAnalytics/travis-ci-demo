import * as React from "react";

type ContextType = {
    authenticated: boolean;
    setAuthenticated: (value: boolean) => void;
  };

const UserContext = React.createContext<
  ContextType | undefined
>(undefined);

type Props = {
    children: React.ReactNode
  };
  export const UserProvider = ({
    children
  }: Props) => {
    const [authenticated, setAuthenticated] = React.useState(false);
  
    React.useEffect(() => {
      setAuthenticated(false);
    }, []);
  
    return (
      <UserContext.Provider value={{authenticated,setAuthenticated}}>
        {children}
      </UserContext.Provider>
    );
  };

  export const useAuth = () =>
  React.useContext(UserContext);