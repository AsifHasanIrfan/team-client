import React from 'react';
import InclusiveCard from '../InclusiveCard/InclusiveCard';

const InclusiveCards: React.FC = () => {
  return (
    <div className="grid __inclusiveEnvironmentSection gap-[30px] lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 mt-[40px]">
      <InclusiveCard
        img="/images/home/ie-1.svg"
        title="Diversity, engagement and belonging"
        description="The Diversity, engagement and belonging (DEB) programme unlocks the potential of all employees by investing in an inclusive community centred on education, introspection, opportunity and growth."
      />

      <InclusiveCard
        img="/images/home/ie-2.svg"
        title="Rising Tides"
        description="The Diversity, engagement and belonging (DEB) programme unlocks the potential of all employees by investing in an inclusive community centred on education, introspection, opportunity and growth."
      />

      <InclusiveCard
        img="/images/home/ie-3.svg"
        title="Employee resource groups"
        description="The Diversity, engagement and belonging (DEB) programme unlocks the potential of all employees by investing in an inclusive community centred on education, introspection, opportunity and growth."
      />

      <InclusiveCard
        img="/images/home/ie-4.svg"
        title="Partnerships"
        description="The Diversity, engagement and belonging (DEB) programme unlocks the potential of all employees by investing in an inclusive community centred on education, introspection, opportunity and growth.                "
      />
    </div>
  );
};

export default InclusiveCards;
