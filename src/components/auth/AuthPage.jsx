import { Navigate, Route, Routes } from 'react-router-dom';
import WelcomeSection from './WelcomeSection';
import Register from './Register';
import Login from './Login';

import './authPageStyles.css';

export default function AuthPage() {
  return (
    <div className='auth-page'>
      <WelcomeSection />
      <Routes>
        <Route path='/' element={<Navigate to='/auth/register' />} />
        <Route
          path='register'
          element={
            <div className='auth-section flex-center'>
              <Register />
            </div>
          }
        />
        <Route
          path='login'
          element={
            <div className='auth-section flex-center'>
              <Login />
            </div>
          }
        />
      </Routes>
    </div>
  );
}
