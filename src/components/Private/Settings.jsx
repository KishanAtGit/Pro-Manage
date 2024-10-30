import Form from '../Form';

import nameIcon from '../../assets/loginPageIcons/nameIcon.png';
import emailIcon from '../../assets/loginPageIcons/emailIcon.png';
import lockIcon from '../../assets/loginPageIcons/lockIcon.png';
import passwordIcon from '../../assets/loginPageIcons/passwordIcon.png';
import viewPasswordIcon from '../../assets/loginPageIcons/viewPasswordIcon.png';

export default function Settings() {
  const settingFields = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Name',

      icons: { nameIcon },
    },
    {
      name: 'updateEmail',
      type: 'email',
      placeholder: 'Update Email',
      icons: { emailIcon },
    },
    {
      name: 'oldPassword',
      type: 'password',
      placeholder: 'Old Password',
      validation: {
        minLength: {
          value: 6,
          message: 'Password must be at least 6 characters',
        },
      },
      icons: { lockIcon, passwordIcon, viewPasswordIcon },
    },
    {
      name: 'newPassword',
      type: 'password',
      placeholder: 'New Password',
      validation: {
        minLength: {
          value: 6,
          message: 'Password must be at least 6 characters',
        },
      },
      icons: { lockIcon, passwordIcon, viewPasswordIcon },
    },
  ];

  return (
    <div className='settings'>
      <div className='heading'>Settings</div>
      <div className='settings-form'>
        <Form fields={settingFields} buttonLabel='Update' mode={'settings'} />
      </div>
    </div>
  );
}
