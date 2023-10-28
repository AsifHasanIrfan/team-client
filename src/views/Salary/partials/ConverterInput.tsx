import { ConverterInputProps } from "@config/types";
import Image from "next/image";
import React, { useState } from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const ConverterInput: React.FC<ConverterInputProps> = ({ amount, currency, onAmountChange, onCurrencyChange, currencies }) => {
  const defaultOption = currencies[0];

  return (
    <div className="rounded-[10px] px-[15px] py-[12px] border-[#E9EBEB] border-2 flex items-center relative converter-input" >
      <div className="w-[65px] rounded-t-[10px] relative cursor-pointer" >
        <select
          value={`${currency}`}
          onChange={event => onCurrencyChange(event.target.value)}
          className='flex-auto font-inherit dropdown-main border-none outline-none cursor-pointer w-[57px] font-[500] text-[14px] leading-[19px] text-[#C7C7C7]'
        >
          {currencies.map(((currency: any, i: any) => (
            <option key={i} value={currency} className='p-[5px] cursor-pointer' >{currency}</option>
          )))}
        </select>
      </div>

      <div className="w-[2px] h-[18px] bg-[#E9EBEB] ml-[12px] mr-[20px]"></div>

      <div className="converter w-full" >
        <input type="number"
          value={`${amount}`}
          onChange={(e: any) => onAmountChange(e.target.value)}
          className="w-full px-3 py-1.5 text-sm font-normal border-none focus:outline-none"
          placeholder="00"
        />
      </div>
    </div>
  )
}

export default ConverterInput