// // export function renderReviews(reviews) {
// //     const reviewList = document.getElementById('review-list');

// //     const reviewsHTML = reviews.map((review) => `
// //         <li class="review-item swiper-slide">
// //             <p class="review-text">${review.review}</p>
// //             <div class="person-box">
// //                 <img class="person-icon" src="${review.avatar_url}" alt="Фото автора">
// //                 <p class="person-text">${review.author}</p>
// //             </div>
// //         </li>
// //     `).join('');

// //     reviewList.insertAdjacentHTML('beforeend', reviewsHTML);
// // }


// import { register } from 'swiper/element/bundle';
// import axios from 'axios';
// import Swiper from 'swiper';

// register();

// const BASE_URL = "https://portfolio-js.b.goit.study/api/reviews";
// const reviewList = document.querySelector(".review-list");
// const prevButton = document.querySelector(".prev-button");
// const nextButton = document.querySelector(".next-button");

// let swiper; // Змінна для збереження екземпляра Swiper

// // Параметри для Swiper
// const swiperParams = {
//     slidesPerView: 1,
//     loop: false,
//     spaceBetween: 32,
//     speed: 500,
//     navigation: {
//         nextEl: '.next-button',
//         prevEl: '.prev-button',
//     },
//     keyboard: {
//         enabled: true,
//         onlyInViewport: false,
//     },
//     mousewheel: {
//         invert: false,
//     },
//     a11y: {
//         enabled: true,
//         prevSlideMessage: 'Попередній слайд',
//         nextSlideMessage: 'Наступний слайд',
//     }
// };

// async function fetchReviews() {
//     try {
//         const response = await axios.get(BASE_URL);
//         const reviews = response.data;
        
//         renderReviews(reviews); 
//         initializeSwiper();    
//     } catch (error) {
//         alert("Not Found");
//         reviewList.innerHTML = '<li class="not-found">Not found</li>';
//     }
// }

// function renderReviews(reviews) {
//     const reviewsMarkup = reviews.map(({review, avatar_url, author}) => `
//         <li class="review-item swiper-slide">
//             <p class="review-text">${review}</p>
//             <div class="person-box">
//                 <img class="person-icon" src="${avatar_url}" alt="${author}">
//                 <p class="person-text">${author}</p>
//             </div>
//         </li>
//     `).join("");
    
//     // Додаємо елементи до reviewList
//     reviewList.insertAdjacentHTML("beforeend", reviewsMarkup);
// }
// function initializeSwiper() {
//     swiper = new Swiper('.swiper-container', swiperParams);

//     swiper.on('reachBeginning', () => {
//         prevButton.disabled = true;
//         prevButton.classList.add('disabled');
//     });

//     swiper.on('reachEnd', () => {
//         nextButton.disabled = true;
//         nextButton.classList.add('disabled');
//     });

//     swiper.on('fromEdge', () => {
//         prevButton.disabled = false;
//         nextButton.disabled = false;
//         prevButton.classList.remove('disabled');
//         nextButton.classList.remove('disabled');
//     });

// }

// fetchReviews();
