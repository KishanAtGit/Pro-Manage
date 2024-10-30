import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Form({ onSubmit, fields, buttonLabel, mode }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm();

  const [showPasswordForPasswordField, setShowPasswordForPasswordField] =
    useState(false);
  const [
    showPasswordForConfirmPasswordField,
    setShowPasswordForConfirmPasswordField,
  ] = useState(false);

  const [modifiedFields, setModifiedFields] = useState(new Set());

  // Watch each field and add to modifiedFields when it changes
  fields.forEach(({ name }) => {
    watch(value => {
      if (value[name] && !modifiedFields.has(name)) {
        setModifiedFields(prev => {
          const updated = new Set(prev);
          updated.add(name);
          return updated;
        });
      }
    });
  });

  //submit function for settings page
  const updateUserDetails = () => {
    if (modifiedFields.size === 0) {
      console.log('No fields to update');

      setError('form', {
        type: 'manual',
        message: 'Please update at least one field.',
      });
    } else if (modifiedFields.size > 1) {
      console.log('more than 1 field');

      setError('form', {
        type: 'manual',
        message: 'Please update only one field at a time.',
      });
    } else {
      console.log('clear error');

      clearErrors('form');
      // onSubmit(data); // Call the passed onSubmit function if validation passes
    }
  };

  return (
    <form
      className='flex-center'
      onSubmit={handleSubmit(
        mode === 'settings' ? updateUserDetails : onSubmit
      )}
    >
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
                  ((name === 'password' || name === 'oldPassword') &&
                    showPasswordForPasswordField) ||
                  ((name === 'confirmPassword' || name === 'newPassword') &&
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
              {(name === 'password' ||
                name === 'confirmPassword' ||
                name === 'oldPassword' ||
                name === 'newPassword') && (
                <img
                  onClick={
                    name === 'password' || name === 'oldPassword'
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
                    name === 'password' || name === 'oldPassword'
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
      {errors.form && <p className='error'>{errors.form.message}</p>}
      <button className='submit-button button' type='submit'>
        {buttonLabel}
      </button>
    </form>
  );
}
