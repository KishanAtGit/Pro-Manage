import { Navigate, Route, Routes } from 'react-router-dom';
import WelcomeSection from '../components/WelcomeSection';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';

import '../components/auth/authPageStyles.css';

export default function Auth() {
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
