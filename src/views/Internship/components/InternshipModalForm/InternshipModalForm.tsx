import { InternshipSubscribeFormProps } from '@config/types';
import React from 'react';
import InternshipModalInputLabel from '../InternshipModalInputLabel';

function InternshipModalForm({ handleSubmit }: InternshipSubscribeFormProps) {
  return (
    <form
      className=" w-[360px] sm:w-[480px] md:w-[590px] p-5"
      onSubmit={handleSubmit}
    >
      <div className="font-primary w-full space-y-6">
        <h2 className="leading-[35px] text-2xl font-semibold">
          Subscribe for Job alerts
        </h2>
        <InternshipModalInputLabel
          name="name"
          label="Name"
          placeholder="type here"
        />
        <InternshipModalInputLabel
          name="email"
          label="Email"
          placeholder="example:digitalgregg@gmail.com"
        />

        <button className="block w-full py-[15px] !mt-10 bg-primary hover:bg-lightHover rounded-[10px] duration-100 text-base font-medium text-white">
          Subscribe
        </button>
      </div>
    </form>
  );
}

export default InternshipModalForm;
