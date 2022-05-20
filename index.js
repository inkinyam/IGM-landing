const swiper = new Swiper('.mySwiper', {
  loop: true,
  pagination: {
    el: ".swiper__pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper__button_type_next",
    prevEl: ".swiper__button_type_prev",
  }
});