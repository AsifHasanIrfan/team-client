import Image from 'next/image';
import React from 'react';

const CoreValuesRight: React.FC = () => {
  return (
    <div className="__coreValuesRightGsap translate-y-32 opacity-0 lg:block md:hidden block">
      <Image
        src="/images/core-values.png"
        width={600}
        height={400}
        layout="responsive"
        alt="core value img"
      />
    </div>
  );
};

export default CoreValuesRight;
