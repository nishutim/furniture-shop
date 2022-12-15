import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js';
import isMobile from './utils/isMobile.js';
import fetchProducts from './utils/fetchProducts.js';
import renderCartQty from './renderCartQty.js';
import renderCartProducts from './renderCartProducts.js';
import renderProducts from './renderProducts.js';
import sendToCart from './sendToCart.js';
import Cart from './services/cart.js';

window.onload = () => {
   const handleShowMoreBtnClick = async () => {
      const showmoreBtn = document.querySelector('.show-more-btn');
      showmoreBtn.disabled = true;
      try {
         const data = await fetchProducts();
         renderProducts(data);
      } catch (e) {
         alert(e.message);
      }
      showmoreBtn.remove();
   }

   const handleAddToCartBtnClick = async (addToCartBtn) => {
      addToCartBtn.disabled = true;
      try {
         sendToCart(addToCartBtn);
      } catch (e) {
         alert(e.message);
      }
   }

   const handleDeleteFromCartBtnClick = async (removeFromCartBtn) => {
      const id = removeFromCartBtn.closest('.cart-list__item').dataset.cartPid;
      Cart.removeProduct(id);
      renderCartQty();
      renderCartProducts();
   }

   const handleDocumentClick = async (e) => {
      const target = e.target;

      if (window.innerWidth > 768 && isMobile.any()) {
         // Header menu
         if (target.classList.contains('menu__btn')) {
            if (!target.closest('.menu__list-item').classList.contains('active')) {
               if (document.querySelector('.menu__list-item.active')) {
                  document.querySelector('.menu__list-item.active').classList.remove('active');
               }
               target.closest('.menu__list-item').classList.add('active');
            } else {
               target.closest('.menu__list-item').classList.remove('active');
            }
         }

         if (!target.closest('.menu__list-item') && document.querySelector('.menu__list-item.active')) {
            document.querySelector('.menu__list-item.active').classList.remove('active');
         }
      }

      // Header mobile menu
      if (target.classList.contains('menu-mobile__btn')) {
         const targetSubList = target.nextElementSibling;

         if (!target.closest('.menu-mobile__list-item').classList.contains('active')) {
            if (document.querySelector('.menu-mobile__list-item.active')) {
               const openedSubList = document.querySelector('.menu-mobile__list-item.active').querySelector('.menu-mobile__sub-list');

               document.querySelector('.menu-mobile__list-item.active').classList.remove('active');
               openedSubList.style.maxHeight = 0 + 'px';
            }
            target.closest('.menu-mobile__list-item').classList.add('active');
            targetSubList.style.maxHeight = targetSubList.scrollHeight + 'px';
         } else {
            target.closest('.menu-mobile__list-item').classList.remove('active');
            targetSubList.style.maxHeight = 0 + 'px';
         }
      }

      if (!target.closest('.menu-mobile__list-item') && document.querySelector('.menu-mobile__list-item.active')) {
         const openedSubList = document.querySelector('.menu-mobile__list-item.active').querySelector('.menu-mobile__sub-list');

         document.querySelector('.menu-mobile__list-item.active').classList.remove('active');
         openedSubList.style.maxHeight = 0 + 'px';
      }

      // Search
      if (target.classList.contains('search__btn_mobile')) {
         target.closest('.search').classList.toggle('active');
      }

      if (!target.closest('.search')) {
         document.querySelector('.search').classList.remove('active');
      }

      // Cart
      if (target.classList.contains('cart__btn') || target.closest('.cart__btn')) {
         if (document.querySelector('.cart-list').children.length) {
            target.closest('.cart').classList.toggle('active');
         }
      }

      if (!target.closest('.cart')) {
         document.querySelector('.cart').classList.remove('active');
      }

      // Add to cart 
      if (target.classList.contains('add-to-cart-btn')) {
         handleAddToCartBtnClick(target);
      }

      // Remove from cart
      if (target.classList.contains('delete-from-cart-btn')) {
         await handleDeleteFromCartBtnClick(target);
         if (!document.querySelector('.cart-list').children.length) {
            document.querySelector('.cart').classList.remove('active');
         }
      }

      // Burger menu
      if (target.closest('.burger-menu')) {
         target.closest('.burger-menu').classList.toggle('active');
         document.querySelector('.menu-mobile').classList.toggle('active');
      }

      // Footer menu
      if (target.classList.contains('footer-links-mobile__btn')) {
         const targetLinksList = target.nextElementSibling;

         if (!target.closest('.footer-links__column').classList.contains('active')) {
            if (document.querySelector('.footer-links__column.active')) {
               const openedLinksList = document.querySelector('.footer-links__column.active').querySelector('.footer-links__list');

               document.querySelector('.footer-links__column.active').classList.remove('active');
               openedLinksList.style.maxHeight = 0 + 'px';
            }
            target.closest('.footer-links__column').classList.add('active');
            targetLinksList.style.maxHeight = targetLinksList.scrollHeight + 'px';
         } else {
            target.closest('.footer-links__column').classList.remove('active');
            targetLinksList.style.maxHeight = 0 + 'px';
         }
      }

      if (!target.closest('.footer-links__column') && document.querySelector('.footer-links__column.active')) {
         const openedLinksList = document.querySelector('.footer-links__column.active').querySelector('.footer-links__list');

         document.querySelector('.footer-links__column.active').classList.remove('active');
         openedLinksList.style.maxHeight = 0 + 'px';
      }

      // Show more btn Products section
      if (target.classList.contains('show-more-btn')) {
         handleShowMoreBtnClick();
      }
   }

   // Subscriptions, rendering from localState
   document.addEventListener('click', handleDocumentClick);
   renderCartQty();
   renderCartProducts();

   // Header observer ================================================================================
   const headerElement = document.querySelector('.header');

   const callback = (entries) => {
      if (entries[0].isIntersecting) {
         headerElement.classList.remove('_scroll');
      } else {
         headerElement.classList.add('_scroll');
      }
   }

   const headerObserver = new IntersectionObserver(callback);
   headerObserver.observe(headerElement);

   // Sliders ================================================================================
   if (document.querySelector('.main-slider')) {
      new Swiper('.main-slider__body', {
         observer: true,
         observeParents: true,
         slidesPerView: 1,
         spaceBetween: 32,
         watchOverflow: true,
         speed: 800,
         loop: true,
         preloadImages: false,
         parallax: true,

         // If we need pagination
         pagination: {
            el: '.main-slider__pagination',
         },

         // Navigation arrows
         navigation: {
            nextEl: '.main-slider .slider-buttons__btn_next',
            prevEl: '.main-slider .slider-buttons__btn_prev',
         }
      });
   }

   if (document.querySelector('.slider-rooms')) {
      new Swiper('.slider-rooms__body', {
         observer: true,
         observeParents: true,
         slidesPerView: 'auto',
         spaceBetween: 24,
         watchOverflow: true,
         speed: 800,
         loop: true,
         loopAdditionalSlides: 5,
         parallax: true,

         // If we need pagination
         pagination: {
            el: '.slider-rooms__pagination',
         },

         // Navigation arrows
         navigation: {
            nextEl: '.slider-rooms .slider-buttons__btn_next',
            prevEl: '.slider-rooms .slider-buttons__btn_prev',
         }
      });
   }

   if (document.querySelector('.tips-slider')) {
      new Swiper('.tips-slider__body', {
         observer: true,
         observeParents: true,
         slidesPerView: 3,
         spaceBetween: 32,
         watchOverflow: true,
         speed: 800,
         loop: true,
         loopAdditionalSlides: 5,

         // If we need pagination
         pagination: {
            el: '.tips-slider__pagination',
         },

         // Navigation arrows
         navigation: {
            nextEl: '.tips-slider .slider-buttons__btn_next',
            prevEl: '.tips-slider .slider-buttons__btn_prev',
         },
         breakpoints: {
            320: {
               slidesPerView: 1,
               spaceBetween: 15
            },
            768: {
               slidesPerView: 2,
               spaceBetween: 20
            },
            992: {
               slidesPerView: 3,
               spaceBetween: 32
            },
         }
      });
   }
}