import{r as l}from"./vendor-DIkDjTNm.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();l();const i=document.querySelector("swiper-container"),c={slidesPerView:1,loop:!0,spaceBetween:32,speed:500,navigation:{nextEl:".next-button",prevEl:".prev-button"},keyboard:{enabled:!0,onlyInViewport:!1},mousewheel:{invert:!1},a11y:{enabled:!0,prevSlideMessage:"Попередній слайд",nextSlideMessage:"Наступний слайд"}};Object.assign(i,c);i.initialize();
//# sourceMappingURL=main-CMZECEEU.js.map
