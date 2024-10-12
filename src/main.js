import { register } from 'swiper/element/bundle';
import axios from 'axios';
import Swiper from 'swiper';

register();

const BASE_URL = "https://portfolio-js.b.goit.study/api/reviews";
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

let swiper;
let reviews = []; // Масив для збереження відгуків

const swiperParams = {
    slidesPerView: 1, // За замовчуванням показуємо 1 слайд
    spaceBetween: 32, // Відстань між слайдами
    loop: false,
    speed: 500,
    navigation: {
        nextEl: '.next-button',
        prevEl: '.prev-button',
    },
    breakpoints: {
        360: {
            slidesPerView: 1,
            slidesPerGroup: 1,
        },
        768: {
            slidesPerView: 1,
            slidesPerGroup: 1,
        },
        1280: {
            slidesPerView: 2, // Показуємо 2 слайди для 1280px
        },
    },
};

async function fetchReviews() {
    try {
        const response = await axios.get(BASE_URL);
        reviews = response.data;

        // Ініціалізуємо Swiper тут
        initializeSwiper();
        renderReviews(); // Відображаємо відгуки
    } catch (error) {
        alert("Not Found");
    }
}

function renderReviews() {
    const reviewItems = reviews.map(({ review, avatar_url, author }) => `
        <li class="review-item swiper-slide">
            <p class="review-text">${review}</p>
            <div class="person-box">
                <img class="person-icon" src="${avatar_url}" alt="${author}">
                <p class="person-text">${author}</p>
            </div>
        </li>
    `).join('');

    // Додаємо всі слайди в swiper-wrapper
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML = reviewItems; // Вставляємо HTML для всіх слайдів
    swiper.update(); // Оновлюємо Swiper після додавання слайдів

    // Вмикаємо і вимикаємо кнопки на основі поточного слайда
    updateButtonStates();
}

function initializeSwiper() {
    swiper = new Swiper('.swiper-container', {
        ...swiperParams,
        on: {
            slideChange: () => {
                updateButtonStates();
            }
        }
    });
}

// Оновлення стану кнопок
function updateButtonStates() {
    const isBeginning = swiper.isBeginning; // Використання вбудованого методу
    const isEnd = swiper.isEnd; // Використання вбудованого методу

    prevButton.disabled = isBeginning;
    nextButton.disabled = isEnd;

    prevButton.classList.toggle('disabled', isBeginning);
    nextButton.classList.toggle('disabled', isEnd);
}

// Слухачі для кнопок навігації
nextButton.addEventListener("click", () => {
    swiper.slideNext(); // Переходимо до наступного слайда
});

prevButton.addEventListener("click", () => {
    swiper.slidePrev(); // Переходимо до попереднього слайда
});

// Додаємо слухачів для клавіш
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" && !nextButton.disabled) {
        event.preventDefault(); // Запобігаємо стандартному поведінці
        swiper.slideNext(); // Використовуємо метод Swiper для переходу
    } else if (event.key === "ArrowLeft" && !prevButton.disabled) {
        event.preventDefault(); // Запобігаємо стандартному поведінці
        swiper.slidePrev(); // Використовуємо метод Swiper для переходу
    }
});

// Додаємо слухача подій для зміни розміру вікна
window.addEventListener('resize', () => {
    if (swiper) {
        swiper.update(); // Оновлюємо Swiper при зміні розміру вікна
    }
});

// Завантаження відгуків при завантаженні сторінки
fetchReviews();
