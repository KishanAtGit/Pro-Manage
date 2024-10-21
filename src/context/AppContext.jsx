import { createContext, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export default function AppProvider({ children }) {
  const customModalStyles = {
    overlay: {
      backgroundColor: '#303D438C',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  return (
    <AppContext.Provider value={{ customModalStyles }}>
      {children}
    </AppContext.Provider>
  );
}
