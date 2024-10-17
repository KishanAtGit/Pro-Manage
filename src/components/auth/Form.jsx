import React from 'react';
import { useForm } from 'react-hook-form';

export default function ReusableForm({ onSubmit, fields, buttonLabel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  return (
    <form className='flex-center' onSubmit={handleSubmit(onSubmit)}>
      {fields.map(({ name, type, placeholder, validation }) => (
        <div key={name} className='input-fields'>
          <input
            id={name}
            type={type}
            {...register(
              name,
              name === 'confirmPassword'
                ? {
                    ...validation,
                    validate: value =>
                      value === watch('password') || 'Passwords do not match',
                  }
                : validation
            )}
            placeholder={placeholder}
          />
          {errors[name] && <p className='error'>{errors[name]?.message}</p>}
        </div>
      ))}
      <button className='submit-button button' type='submit'>
        {buttonLabel}
      </button>
    </form>
  );
}
