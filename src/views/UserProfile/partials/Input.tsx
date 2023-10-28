import { cx } from '@config/constants';
import Image from 'next/image';
import React, { useId, useState } from 'react';

type InputProps = {
  label?: string;
  eyeButton?: any;
  showPassword?: string;
  setShowPassword?: React.Dispatch<React.SetStateAction<string>>;
} & React.ComponentProps<'input'>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      label,
      eyeButton,
      showPassword,
      setShowPassword,
      ...props
    },
    ref
  ) => {
    const forId = useId();

    return (
      <div className="flex flex-col mb-2.5 w-full relative">
        <label
          htmlFor={forId}
          className="font-medium text-base leading-6 mb-2.5"
        >
          {label}
        </label>
        <input
          ref={ref}
          {...props}
          id={forId}
          className={cx(
            'focus:outline-none rounded-[8px] border border-[#E0E0E0]',
            'w-full h-[60px] py-5 px-5',
            className
          )}
        />
        {eyeButton && (
          <div
            className="absolute right-[20px] top-[50px] cursor-pointer"
            onClick={() =>
              setShowPassword!(
                showPassword === 'password' ? 'text' : 'password'
              )
            }
          >
            {showPassword === 'password' ? (
              <Image
                src="/images/eye-off.svg"
                width={24}
                height={24}
                alt="hide"
              />
            ) : (
              <Image src="/images/eye.png" width={24} height={24} alt="hide" />
            )}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
export default Input;
