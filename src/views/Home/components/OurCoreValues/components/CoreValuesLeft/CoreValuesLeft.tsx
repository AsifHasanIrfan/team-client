import React from 'react';
import CoreValuesLeftBottom from '../CoreValuesLeftBottom';

const CoreValuesLeft: React.FC = () => {
  return (
    <div className="__coreValuesLeftGsap translate-y-32 opacity-0 md:order-first order-last mt-4 md:mt-0 lg:col-span-1 md:col-span-2">
      <div>
        <h1 className="lg:text-4xl md:text-[32px] text-3xl font-semibold">
          Our <span className="text-primary">Core</span> Values
        </h1>

        <p className="md:text-base text-sm mt-[10px] font-normal">
          These are some of the values that we live by as a company. We work by
          them, too. We’re building a platform and products that we believe in,
          knowing that there is real value to be gained from helping people to
          simplify whatever it is that they do and bring more of themselves to
          their work, wherever they are.
        </p>
      </div>

      <CoreValuesLeftBottom />
    </div>
  );
};

export default CoreValuesLeft;
