import { register } from 'swiper/element/bundle';
register();

const swiperEl = document.querySelector('swiper-container');
const swiperParams = {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 32,
    speed: 500,
    navigation: {
        nextEl: '.next-button',
        prevEl: '.prev-button',
    },
    keyboard: {
        enabled: true,
        onlyInViewport: false,
    },
    mousewheel: {
        invert: false,
    },
    a11y: {
        enabled: true,
        prevSlideMessage: 'Попередній слайд',
        nextSlideMessage: 'Наступний слайд',
    }
};
Object.assign(swiperEl, swiperParams);
swiperEl.initialize();
