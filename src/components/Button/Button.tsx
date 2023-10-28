import CircularProgress from '@components/CircularProgress';
import { cx } from '@config/constants';
import { ButtonProps } from '@config/types';
import React from 'react';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      style = {},
      children,
      startIcon = null,
      endIcon = null,
      rounded = 'full',
      disabled,
      loading,
      loadingText,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        {...props}
        style={{
          ...style,
          boxShadow: disabled ? undefined : '0px 7px 20px 0px #FF00324D',
        }}
        disabled={disabled || loading}
        className={cx(
          'py-[15px] px-[45px] bg-primary hover:bg-[#EA002E] duration-300 text-white flex items-center justify-center gap-2 disabled:bg-[#DADADA] disabled:hover:bg-[#DADADA] relative overflow-hidden select-none',
          disabled && 'disabled:cursor-not-allowed',
          rounded === 'full' ? 'rounded-full' : 'rounded-md',
          className
        )}
      >
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-primary">
            <CircularProgress size={26} />{' '}
            {loadingText && <span className="ml-2">{loadingText}</span>}
          </div>
        )}
        {startIcon && <span className="shrink-0">{startIcon}</span>}
        {children}
        {endIcon && <span className="shrink-0">{endIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
