import { createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NotFoundPage from './components/PageNotFound';
import Authpage from './components/auth/AuthPage';
import Dashboard from './components/Dashboard';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

export const AppContext = createContext();

export default function App() {
  const customModalStyles = {
    overlay: {
      backgroundColor: '#303D438C',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/auth' />} />
          <Route path='/auth/*' element={<Authpage />} />
          <Route
            path='/dashboard/*'
            element={
              <AppContext.Provider value={{ customModalStyles }}>
                <Dashboard />
              </AppContext.Provider>
            }
          />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}
