import React from 'react';

type PaymentSubInputProps = {
  label?: string;
  isEmail?: boolean;
  title?: string;
} & React.ComponentProps<'input'>;

const PaymentSubInput = React.forwardRef<
  HTMLInputElement,
  PaymentSubInputProps
>(({ className = '', ...props }, ref) => {
  return (
    <div className="mt-[15px]">
      <p className="text-[16px] font-[500] leading-[22px] mb-[15px]">
        {props?.isEmail ? 'Email' : props?.title}
      </p>

      <div className="rounded-[10px] px-[15px] py-[12px] border-[#E9EBEB] border-2 flex items-center">
        <input
          className="w-full px-3 py-1.5 text-sm font-normal border-none focus:outline-none"
          ref={ref}
          {...props}
        />
      </div>
    </div>
  );
});
PaymentSubInput.displayName = 'PaymentSubInput';
export default PaymentSubInput;
