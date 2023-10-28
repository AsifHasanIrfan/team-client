import React from 'react';
import LoginLeft from './components/LoginLeft/LoginLeft';
import LoginRight from './components/LoginRight/LoginRight';

const Login: React.FC = () => {
  return (
    <section className="bg-[#f7f8fa] 
                        xl:pt-[160px] xl:pb-[110px]
                        md:pt-[140px] md:pb-[90px]
                        pt-[80px] pb-[40px]
                        
    ">
      <div className="container">

        <div className="grid lg:grid-cols-2 grid-col-1 w-full lg:justify-between items-center lg:gap-[50px] xl:gap-[60px]">
          <div className="lg:order-none order-2 py-[30px] md:pb-0 md:pt-[5px] lg:py-0">
            <LoginLeft />
          </div>
          <div className="hidden lg:block">
            <LoginRight />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Login;
