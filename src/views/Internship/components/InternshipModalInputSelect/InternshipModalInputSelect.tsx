import Button from '@components/Button';
import React, { useId } from 'react';
import { GrFormDown } from 'react-icons/gr';

function InternshipModalInputSelect() {
  const id = useId();
  return (
    <div className="flex flex-col gap-2.5">
      <label
        htmlFor={id}
        className="text-base leading-[150%] font-medium select-none"
      >
        Country
      </label>
      <div className="relative">
        <select className="py-4 pl-5 border border-[#E0E0E0] _internshipInputShadow rounded-lg outline-none text-sm placeholder:leading-[15px] text-black w-full appearance-none">
          <option value="select" hidden selected>
            Select
          </option>
          <option value="opt">Options</option>
          <option value="opt">Options</option>
          <option value="opt">Options</option>
          <option value="opt">Options</option>
          <option value="opt">Options</option>
          <option value="opt">Options</option>
        </select>

        <span className="absolute top-1/2 -translate-y-1/2 text-[#263238] pointer-events-none right-0 px-6">
          <GrFormDown size={16} />
        </span>
      </div>
    </div>
  );
}

export default InternshipModalInputSelect;
