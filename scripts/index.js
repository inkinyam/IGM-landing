import Form from "./form.js";

//подключаем swiper для отображения картинок в слайдере
const swiper = new Swiper('.mySwiper', {
  loop: true,
  pagination: {
    el: ".swiper__pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper__button_type_next",
    prevEl: ".swiper__button_type_prev",
  },
  centeredSlides:true
});

//переменные для открытия мобильного меню
const openMenuButton   = document.querySelector('.header__mobile-button');
const headerMobileMenu = document.querySelector('.header__mobile-menu');
const headerLogo       = document.querySelector('.header__mobile-logo'); 
const header           = document.querySelector('.header_ver_mobile');

// функция открывающая/закрывающая меню в мобильной версии
const toggleStationMenu = () => {
  headerLogo.classList.toggle('header__mobile-logo_opened');
  openMenuButton.classList.toggle('header__mobile-button_opened');
  header.classList.toggle('header_ver_mobile-open');
  headerMobileMenu.classList.toggle('header__mobile-menu_opened');
}

// слушатель на открытие мобильного меню по нажатию кнопки
openMenuButton.addEventListener('click', toggleStationMenu);


//переменные для открытия формы обратной связи
const openFormButton   = document.querySelector('.contact-us__button');
const contactUsForm    = document.querySelector('.form-section');

//функция, открывающая форму обратной связи
const openContactUsForm = () => {
  contactUsForm.classList.add('form-section_open');
}

openFormButton.addEventListener('click', openContactUsForm);

const initForm = (formId) => {
  return new Form (formId);
}

const contactForm = initForm('contactForm');
contactForm.setEventListeners();

