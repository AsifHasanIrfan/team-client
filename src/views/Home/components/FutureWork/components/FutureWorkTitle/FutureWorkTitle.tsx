import React from 'react';

const FutureWorkTitle: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="lg:w-7/12 md:w-9/12 sm:11/12">
        <h1 className="text-3xl lg:text-4xl font-semibold mb-4 text-center __futureTitleGsap">
          <span className="text-primary">Digital Gregg</span> where the future
          works
        </h1>
        <p className="md:text-base text-sm text-center __futureDescGsap">
          Every day , we refine, iterate and explore how to make work better for
          everyone. Join us in creating a better future of work that’s more
          coonected, inclusive and flexible
        </p>
      </div>
    </div>
  );
};

export default FutureWorkTitle;
