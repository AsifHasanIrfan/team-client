import { InternshipModalInputLabelType } from '@config/types';
import classNames from 'classnames';
import { useField } from 'formik';
import React, { useId } from 'react';

type InputProps = React.ComponentProps<'input'>;

function InternshipModalInputLabel({
  label,
  name,
  ...props
}: InternshipModalInputLabelType & InputProps) {
  const id = useId();

  const [field, meta] = useField(name);

  return (
    <div className="space-y-1">
      <div className="flex flex-col gap-2.5">
        <label
          htmlFor={id}
          className={classNames(
            'text-base leading-[150%] font-medium select-none',
            meta.error && 'text-lightHover'
          )}
        >
          {label}
        </label>
        <input
          id={id}
          {...props}
          {...field}
          className={classNames(
            'py-4 pl-5 border border-[#E0E0E0] _internshipInputShadow rounded-lg outline-none placeholder:text-sm placeholder:leading-[15px] placeholder:text-black/60 placeholder:capitalize',
            meta.error && 'border-lightHover'
          )}
        />
      </div>

      {meta.touched && meta.error && (
        <p className="text-lightHover font-primary text-base pl-4">
          {meta.error}
        </p>
      )}
    </div>
  );
}

export default InternshipModalInputLabel;
