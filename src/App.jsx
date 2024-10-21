import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './context/AuthContext';
import AppProvider from './context/AppContext';
import PrivateRoute from './routes/PrivateRoute';
import NotFoundPage from './components/PageNotFound';
import Authpage from './routes/Auth';
import Dashboard from './routes/Dashboard';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/auth' />} />
          <Route path='/auth/*' element={<Authpage />} />
          <Route
            path='/dashboard/*'
            element={
              <PrivateRoute>
                <AppProvider>
                  <Dashboard />
                </AppProvider>
              </PrivateRoute>
            }
          />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  );
}
