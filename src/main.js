import Swiper from 'swiper';
// import Swiper styles
import 'swiper/css';

const swiper = new Swiper('.swiper', {
    loop: false,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },
    slidesPerView: 1, // Кількість слайдів за замовчуванням
    spaceBetween: 16, // Відстань між слайдами

    // Респонсивність для різних розмірів екрану
    breakpoints: {
        1280: {
            slidesPerView: 2, // Два слайди одночасно на екранах 1280px і більше
            spaceBetween: 32, // Відстань між слайдами на великих екранах
        },
    },
});

const API_URL = 'https://portfolio-js.b.goit.study/api/reviews'; // URL вашого API
let reviews = [];
let currentIndex = 0; // Змінна для відстеження поточного відгуку

// Функція для отримання відгуків з сервера
async function fetchReviews() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Не вдалося отримати відгуки');
        }
        reviews = await response.json();
        renderReview(); // Відобразити перший відгук
        updateButtons(); // Оновити кнопки після рендеру
    } catch (error) {
        alert(error.message); // Вивести повідомлення про помилку
        renderPlaceholder(); // Відобразити текст-заглушку
    }
}

// Функція для відображення поточного відгуку
function renderReview() {
    const slideList = document.getElementById('slide-list');
    slideList.innerHTML = ''; // Очистити список

    // Отримати поточний відгук
    const currentReview = reviews[currentIndex];

    // Формування HTML для відгуку
    const markup = `
        <li class="slide-item">
            <p class="reviews-text">${currentReview.review}</p>
            <div class="person-box">
                <img class="person-icon" src="${currentReview.avatar_url}" alt="${currentReview.author}'s Avatar">
                <p class="person-text">${currentReview.author}</p>
            </div>
        </li>
    `;
    slideList.innerHTML = markup; // Додати HTML до slideList

    // Оновити слайдер
    swiper.update();

    updateButtons(); // Оновити кнопки
}

// Функція для відображення тексту-заглушки
function renderPlaceholder() {
    const slideList = document.getElementById('slide-list');
    slideList.innerHTML = '<li class="slide-item"><p class="reviews-text">Not found</p></li>';
    document.getElementById('prev-button').disabled = true;
    document.getElementById('next-button').disabled = true;
}

// Функція для оновлення стану кнопок
function updateButtons() {
    document.getElementById('prev-button').disabled = currentIndex === 0; // Вимкнути, якщо перший відгук
    document.getElementById('next-button').disabled = currentIndex === reviews.length - 1; // Вимкнути, якщо останній відгук
}

// Функція для переходу до попереднього відгуку
function showPreviousReview() {
    if (currentIndex > 0) {
        currentIndex--;
        renderReview();
    }
}

// Функція для переходу до наступного відгуку
function showNextReview() {
    if (currentIndex < reviews.length - 1) {
        currentIndex++;
        renderReview();
    }
}

// Додати обробники подій до кнопок
document.getElementById('prev-button').addEventListener('click', showPreviousReview);
document.getElementById('next-button').addEventListener('click', showNextReview);

// Виклик функції для отримання відгуків
fetchReviews();
