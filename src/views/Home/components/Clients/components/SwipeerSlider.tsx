import React from 'react';

const SwipeerSlider = () => {
    return (
        <div>

        </div>
    );
};

export default SwipeerSlider;
// import { clientSildeData } from '@config/constants';
// import Image from 'next/image';
// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from "swiper";
// import 'swiper/css';

// const SwipeerSlider = () => {
//     return (
//         <div className='mt-[40px]'>
//             <Swiper
//                 loop={true}
//                 // data-swiper-slide-index={id + Math.random()}
//                 autoplay={{
//                     delay: 2200,
//                     disableOnInteraction: false,
//                 }}
//                 modules={[Autoplay]}
//                 breakpoints={{
//                     // when window width is >= 640px
//                     0: {
//                         slidesPerView: 2,
//                         spaceBetween: 50,
//                     },
//                     768: {
//                         slidesPerView: 3,
//                         spaceBetween: 50,
//                     },
//                     1024: {
//                         slidesPerView: 4,
//                         spaceBetween: 120,
//                     },
//                     1440: {
//                         slidesPerView: 4,
//                         spaceBetween: 180,
//                     },
//                 }}
//                 className='mySwiper'
//             >
//                 {
//                     clientSildeData.map((item, index) => <SwiperSlide key={index}>
//                         <Image src={item.imgSrc} width={145} height={35} alt='sliderimg' />
//                     </SwiperSlide>
//                     )
//                 }

//             </Swiper>
//         </div>
//     );
// };

// export default SwipeerSlider;