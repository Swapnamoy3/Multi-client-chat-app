import React from 'react';
import { FormField } from './FormField';

export function Password({ register, error }) {
  const [showPassword, setShowPassword] = React.useState(false);
  function toggleShowPassword(event) {
    event.preventDefault();
    setShowPassword(s => !s);
  }
  return (
    <div className='relative'>
      <FormField
        label="Password"
        id="password"
        type={showPassword ? "text" : "password"}
        placeholder="********"
        {...register("password", { required: false })}
        error={error} />
      {showPassword && <span
        onClick={toggleShowPassword}
        className='absolute right-3 top-1/2'><box-icon name='show'></box-icon></span>}
      {!showPassword && <span
        onClick={toggleShowPassword}
        className='absolute right-3 top-1/2'><box-icon name='hide'></box-icon></span>}
    </div>
  );
}
