import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function AuthForm({ onSubmit, fields, buttonLabel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [showPasswordForPasswordField, setShowPasswordForPasswordField] =
    useState(false);
  const [
    showPasswordForConfirmPasswordField,
    setShowPasswordForConfirmPasswordField,
  ] = useState(false);

  return (
    <form className='flex-center' onSubmit={handleSubmit(onSubmit)}>
      {fields.map(({ name, type, placeholder, validation, icons }) => {
        return (
          <div key={name}>
            <div className='input-fields'>
              <img
                className='input-field-icon-1'
                src={Object.values(icons)[0]}
                alt={name + 'Icon'}
              />
              <input
                id={name}
                type={
                  (name === 'password' && showPasswordForPasswordField) ||
                  (name === 'confirmPassword' &&
                    showPasswordForConfirmPasswordField)
                    ? 'text'
                    : type
                }
                {...register(
                  name,
                  name === 'confirmPassword'
                    ? {
                        ...validation,
                        validate: value =>
                          value === watch('password') ||
                          'Passwords do not match',
                      }
                    : validation
                )}
                placeholder={placeholder}
              />
              {(name === 'password' || name === 'confirmPassword') && (
                <img
                  onClick={
                    name === 'password'
                      ? () =>
                          setShowPasswordForPasswordField(
                            !showPasswordForPasswordField
                          )
                      : () =>
                          setShowPasswordForConfirmPasswordField(
                            !showPasswordForConfirmPasswordField
                          )
                  }
                  className='input-field-icon-2 cursor-pointer'
                  src={
                    name === 'password'
                      ? !showPasswordForPasswordField
                        ? Object.values(icons)[1]
                        : Object.values(icons)[2]
                      : !showPasswordForConfirmPasswordField
                      ? Object.values(icons)[1]
                      : Object.values(icons)[2]
                  }
                  alt={name + 'Icon'}
                />
              )}
            </div>
            {errors[name] && <p className='error'>{errors[name]?.message}</p>}
          </div>
        );
      })}
      <button className='submit-button button' type='submit'>
        {buttonLabel}
      </button>
    </form>
  );
}
