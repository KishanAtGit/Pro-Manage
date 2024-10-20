import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import AuthForm from './AuthForm';
import { loginUser } from '../../services/api.users';

import emailIcon from '../../assets/loginPageIcons/emailIcon.png';
import lockIcon from '../../assets/loginPageIcons/lockIcon.png';
import passwordIcon from '../../assets/loginPageIcons/passwordIcon.png';
import viewPasswordIcon from '../../assets/loginPageIcons/viewPasswordIcon.png';

export default function Login() {
  const navigate = useNavigate();

  const loginFields = [
    {
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      validation: { required: 'Please enter a valid email' },
      icons: { emailIcon },
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      validation: { required: 'Please enter a valid password' },
      icons: { lockIcon, passwordIcon, viewPasswordIcon },
    },
  ];

  const onSubmit = async data => {
    const res = await loginUser(data);
    if (res && res.status === 202) {
      navigate('/dashboard');
    }
  };

  return (
    <>
      <div className='heading'>Login</div>
      <AuthForm onSubmit={onSubmit} fields={loginFields} buttonLabel='Login' />
      <div style={{ fontSize: '1.2em', fontWeight: '300' }}>
        Have no account yet ?
      </div>
      <Link to='/auth/register'>
        <div className='auth-button button'>Register</div>
      </Link>
    </>
  );
}
