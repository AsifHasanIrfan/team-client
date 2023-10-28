import React, { useId, useState } from 'react';
import Input from '@views/UserProfile/partials/Input';

type DrawbackReasonProps = {
  label?: string;
  name?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  handleInputChange?: any;
};

const DrawbackReason: React.FC<DrawbackReasonProps> = ({
  label,
  handleInputChange,
  name,
  placeholder,
  value,
  required,
}) => {
  const forId = useId();
  return (
    <div className="flex flex-col mb-2.5 mt-[14px] w-full relative">
      <label htmlFor={forId} className="font-medium text-base leading-6 mb-2.5">
        {label}
      </label>
      <div className="w-full h-[120px]">
        <textarea
          id={forId}
          className="w-full h-full py-5 px-5 focus:outline-none rounded-[8px] border border-[#E0E0E0] resize-none"
          name={name}
          required={required}
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};
export default DrawbackReason;
