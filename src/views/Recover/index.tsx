import React, { useState } from 'react';
import MainPage from './components/MainPage/MainPage';
import Success from './components/Success';

const Index: React.FC = () => {

    const [showSucces, setShowSuccess] = useState<boolean>(false)

    return (
        <section className="bg-[#f7f8fa] xl:pt-[160px] xl:pb-[110px] md:pt-[140px] md:pb-[90px] pt-[80px] pb-[40px]">
            <div className="container">

                {!showSucces ? <MainPage setShowSuccess={setShowSuccess} /> : <Success setShowSuccess={setShowSuccess} />}

            </div>
        </section>
    );
};

export default Index;