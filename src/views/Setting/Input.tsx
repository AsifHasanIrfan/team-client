import { cx } from '@config/constants';
import React, { useId } from 'react';

type InputProps = {
  error?: string;
  label?: string;
  urlErrs?: any;
} & React.ComponentProps<'input'>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, urlErrs, ...props }, ref) => {
    const forId = useId();
    let isThere = false

    if (Object.keys(urlErrs || {}).includes(props.name || '')) {
      isThere = true
    }

    return (
      <div className={cx('flex flex-col mb-2.5', 'w-full')}>
        <label
          className={cx('font-medium text-base leading-6 mb-2.5')}
          htmlFor={forId}
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
            isThere && urlErrs[props.name || ''] && 'border-[1px] border-[red]',
            className
          )}
        />
        {isThere && urlErrs[props.name || ''] ? <small className='text-[15px] block text-[red] mt-[3px]' >{error || 'Enter valid URL'}</small> : ''}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
