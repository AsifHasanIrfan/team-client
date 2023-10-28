import React from 'react';
import FutureWorkCards from './components/FutureWorkCards';
import FutureWorkTitle from './components/FutureWorkTitle';

const FutureWork: React.FC = () => {
  return (
    <section className="bg-[#F1F4FA]">
      <div className="py-[60px] container">
        <FutureWorkTitle />
        <FutureWorkCards />
      </div>
    </section>
  );
};
export default FutureWork;
