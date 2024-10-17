import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Authpage from './components/auth/AuthPage';
import NotFoundPage from './components/PageNotFound';

import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/auth' />} />
        <Route path='/auth/*' element={<Authpage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
