import { register } from 'swiper/element/bundle';
import axios from 'axios';
import Swiper from 'swiper';

register();

const BASE_URL = "https://portfolio-js.b.goit.study/api/reviews";
const reviewList = document.querySelector(".review-list");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

let swiper;
let reviews = []; // Масив для збереження відгуків
let currentIndex = 0; // Індекс поточного відгуку

const swiperParams = {
    // slidesPerView: 1, // За замовчуванням 1 слайд
    loop: false,
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
    mousewheel: true,
    a11y: {
        enabled: true,
        prevSlideMessage: 'Попередній слайд',
        nextSlideMessage: 'Наступний слайд',
    },
    breakpoints: {
        // Параметри для різних розмірів екрану
        1280: {
            slidesPerView: 2, // Відображати 2 слайди при ширині >= 1280px
        },
        768: {
            slidesPerView: 1, // Відображати 1 слайд при ширині >= 768px
        },
        360: {
            slidesPerView: 1,
        }
    }
};

async function fetchReviews() {
    try {
        const response = await axios.get(BASE_URL);
        reviews = response.data;
        
        showCurrentReview(); // Показуємо перший відгук
        initializeSwiper();    
    } catch (error) {
        alert("Not Found");
        reviewList.innerHTML = '<li class="not-found">Not found</li>';
    }
}

function showCurrentReview() {
    const review = reviews[currentIndex];
    reviewList.innerHTML = `
        <li class="review-item swiper-slide">
            <p class="review-text">${review.review}</p>
            <div class="person-box">
                <img class="person-icon" src="${review.avatar_url}" alt="${review.author}">
                <p class="person-text">${review.author}</p>
            </div>
        </li>
    `;
    updateButtonStates();
}

function initializeSwiper() {
    swiper = new Swiper('.swiper-container', swiperParams);

    // Вмикаємо і вимикаємо кнопки на основі поточного слайда
    swiper.on('slideChange', () => {
        updateButtonStates();
    });
}

function updateButtonStates() {
    const isBeginning = currentIndex === 0;
    const isEnd = currentIndex === reviews.length - 1;

    prevButton.disabled = isBeginning;
    nextButton.disabled = isEnd;

    prevButton.classList.toggle('disabled', isBeginning);
    nextButton.classList.toggle('disabled', isEnd);
}

// Слухачі для кнопок навігації
nextButton.addEventListener("click", () => {
    if (currentIndex < reviews.length - 1) {
        currentIndex++;
        showCurrentReview();
    }
});

prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        showCurrentReview();
    }
});

// Додаємо слухачів для клавіш
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" && !nextButton.disabled) {
        nextButton.click();
    } else if (event.key === "ArrowLeft" && !prevButton.disabled) {
        prevButton.click();
    }
});

// Завантаження відгуків при завантаженні сторінки
fetchReviews();
