import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Box as MuiBox } from '@mui/material';

import banner1 from '@assets/images/banner1.avif';
import banner2 from '@assets/images/banner2.avif';

import { ImgWrapper } from './HomeCarousel.styles';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const banners = [banner1, banner2];

/**
 * HomeCarousel component displays promotional banners in a slider.
 * It supports autoplay, navigation controls, and pagination indicators.
 */
export const HomeCarousel = () => (
    <MuiBox width="100%" mt={3}>
        <Swiper
            // enable navigation arrows, pagination dots, and autoplay
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            loop
            speed={800}
            autoplay={{
                delay: 2500,
                // continue autoplay even after user interaction
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation
        >
            {banners.map((banner, index) => (
                <SwiperSlide key={index}>
                    <ImgWrapper
                        component="img"
                        src={banner}
                        alt={`Promotional banner ${index + 1}`}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    </MuiBox>
);
