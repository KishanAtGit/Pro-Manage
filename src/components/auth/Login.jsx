import React from 'react';
import Form from './Form';
import { Link } from 'react-router-dom';

export default function Login() {
  const loginFields = [
    {
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      validation: { required: 'Email is required' },
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      validation: { required: 'Password is required' },
    },
  ];

  const onSubmit = data => {
    console.log('Login Data:', data);
    // Handle login submission here
  };

  return (
    <>
      <div className='heading'>Login</div>
      <Form onSubmit={onSubmit} fields={loginFields} buttonLabel='Login' />
      <div style={{ fontSize: '1.2em', fontWeight: '300' }}>
        Have no account yet ?
      </div>
      <Link to='/auth/register'>
        <div className='auth-button button'>Register</div>
      </Link>
    </>
  );
}
