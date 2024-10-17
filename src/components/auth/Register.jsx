import { Link } from 'react-router-dom';
import Form from './Form';

export default function Register() {
  const registerFields = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Name',
      validation: { required: 'Username is required' },
    },
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
    {
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password',
      validation: {
        required: 'Please confirm your password',
      },
    },
  ];

  const onSubmit = data => {
    console.log('Register Data:', data);
    // Handle register submission here
  };

  return (
    <>
      <div className='heading'>Register</div>
      <Form
        onSubmit={onSubmit}
        fields={registerFields}
        buttonLabel='Register'
      />
      <div style={{ fontSize: '1.2em', fontWeight: '300' }}>
        Have an account ?
      </div>
      <Link to='/auth/login'>
        <div className='auth-button button'>Login</div>
      </Link>
    </>
  );
}
