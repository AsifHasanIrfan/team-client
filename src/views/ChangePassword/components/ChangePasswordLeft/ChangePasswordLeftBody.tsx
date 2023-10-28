import Image from 'next/image';
import React, { useState } from 'react';

const ChangePasswordLeftBody: React.FC = () => {
  const [showPassword, setShowPassword] = useState<string>('password');
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<string>('password');

  return (
    <div className="rounded-lg flex flex-col md:ml-auto w- mt-5 2xl:mt-[50px] lg:mt-[30px] relative">
      <div className="mb-5 ">
        <div className="mb-3">
          <label htmlFor="full-name" className="text-2xl leading-7 ">
            New Password
          </label>
        </div>
        <input
          placeholder="New password"
          type={showPassword}
          id="newpass"
          name="newpass"
          className="w-full text-base bg-white rounded border border-[#dddddd] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-700  py-4 px-5 leading-8 transition-colors duration-200 ease-in-out"
        />

        <div
          className="absolute right-[20px] top-[65px] cursor-pointer"
          onClick={() =>
            setShowPassword(showPassword === 'password' ? 'text' : 'password')
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
      </div>

      <div className="relative mb-5">
        <div className="mb-3 ">
          <label htmlFor="password" className="w-full text-2xl leading-7">
            Confirm Password
          </label>
        </div>
        <input
          placeholder="Confrim password"
          type={showConfirmPassword}
          id="password"
          name="password"
          className="w-full text-base bg-white rounded border border-[#dddddd] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-700 py-4 px-5 leading-8 transition-colors duration-200 ease-in-out"
        />

        <div
          className="absolute right-[20px] top-[65px] cursor-pointer"
          onClick={() =>
            setShowConfirmPassword(
              showConfirmPassword === 'password' ? 'text' : 'password'
            )
          }
        >
          {showConfirmPassword === 'password' ? (
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
      </div>

      <button
        type="button"
        className="px-8 py-5 text-base text-white border-0 rounded bg-secondary focus:outline-none hover:bg-primary"
      >
        Change password
      </button>
    </div>
  );
};

export default ChangePasswordLeftBody;
