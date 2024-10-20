import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NotFoundPage from './components/PageNotFound';
import Authpage from './components/auth/AuthPage';
import Dashboard from './components/Dashboard';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/auth' />} />
          <Route path='/auth/*' element={<Authpage />} />
          <Route path='/dashboard/*' element={<Dashboard />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}
