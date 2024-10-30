import { Link, useNavigate } from 'react-router-dom';
import Form from '../Form';
import { registerUser } from '../../services/api.users';

import nameIcon from '../../assets/loginPageIcons/nameIcon.png';
import emailIcon from '../../assets/loginPageIcons/emailIcon.png';
import lockIcon from '../../assets/loginPageIcons/lockIcon.png';
import passwordIcon from '../../assets/loginPageIcons/passwordIcon.png';
import viewPasswordIcon from '../../assets/loginPageIcons/viewPasswordIcon.png';

export default function Register() {
  const navigate = useNavigate();

  const registerFields = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Name',
      validation: { required: 'Name is required' },
      icons: { nameIcon },
    },
    {
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      validation: { required: 'Email is required' },
      icons: { emailIcon },
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      validation: {
        required: 'Password is required',
        minLength: {
          value: 6,
          message: 'Password must be at least 6 characters',
        },
      },
      icons: { lockIcon, passwordIcon, viewPasswordIcon },
    },
    {
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password',
      validation: {
        required: 'Please confirm your password',
      },
      icons: { lockIcon, passwordIcon, viewPasswordIcon },
    },
  ];

  const onSubmit = async data => {
    const res = await registerUser(data);
    if (res && res.status === 201) {
      navigate('/auth/login');
    }
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
