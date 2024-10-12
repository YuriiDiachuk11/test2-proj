import { register } from 'swiper/element/bundle';
import axios from 'axios';
import Swiper from 'swiper';

register();

const BASE_URL = "https://portfolio-js.b.goit.study/api/reviews";
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

async function fetchReviews() {
    try {
        const { data } = await axios.get(BASE_URL);
        renderReviews(data);
        initializeSwiper();
    } catch (error) {
        alert("Reviews not found.");
    }
}

function renderReviews(reviews) {
    const reviewItemsHTML = reviews.map(({ review, avatar_url, author }) => `
        <li class="review-item swiper-slide">
            <p class="review-text">${review}</p>
            <div class="person-box">
                <img class="person-icon" src="${avatar_url}" alt="${author}">
                <p class="person-text">${author}</p>
            </div>
        </li>
    `).join('');

    document.querySelector('.swiper-wrapper').innerHTML = reviewItemsHTML; 
}

function initializeSwiper() {
    const swiperParams = {
        slidesPerView: 1,
        spaceBetween: 32,
        loop: false,
        speed: 500,
        navigation: {
            nextEl: '.next-button',
            prevEl: '.prev-button',
        },
        breakpoints: {
            360: { slidesPerView: 1, slidesPerGroup: 1 },
            768: { slidesPerView: 1, slidesPerGroup: 1 },
            1280: { slidesPerView: 2, slidesPerGroup: 1 },
        },
        on: {
            slideChange: updateButtonStates,
        }
    };

    const swiper = new Swiper('.swiper-container', swiperParams);

    nextButton.addEventListener("click", () => swiper.slideNext());
    prevButton.addEventListener("click", () => swiper.slidePrev());

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight" && !nextButton.disabled) {
            event.preventDefault();
            swiper.slideNext();
        } else if (event.key === "ArrowLeft" && !prevButton.disabled) {
            event.preventDefault();
            swiper.slidePrev();
        }
    });

    window.addEventListener('resize', () => swiper.update());

    function updateButtonStates() {
        prevButton.disabled = swiper.isBeginning;
        nextButton.disabled = swiper.isEnd;
    }

    updateButtonStates();
}

fetchReviews();
