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
const openMobilMenuButton   = document.querySelector('.header__mobile-button');
const mobilHeaderMenu  = document.querySelector('.header__mobile-menu');
const mobilHeaderLogo  = document.querySelector('.header__mobile-logo'); 
const mobilHeader       = document.querySelector('.header_ver_mobile');
const showMoreButton   = document.querySelector('.header__mobile-menu-next');


// функция открывающая/закрывающая меню в мобильной версии
const toggleStationMenu = () => {
  mobilHeaderLogo.classList.toggle('header__mobile-logo_opened');
  openMobilMenuButton.classList.toggle('header__mobile-button_opened');
  mobilHeader.classList.toggle('header_ver_mobile-open');
  mobilHeaderMenu.classList.toggle('header__mobile-menu_opened');
  //если меню открыто и мы его закрываем, скрыть доп.разделы
  if (mobilHeaderMenu.classList.contains('header__mobile-menu_opened')) {
    hideMoreMobileSection();
  }
}

// слушатель на открытие мобильного меню по нажатию кнопки
openMobilMenuButton.addEventListener('click', toggleStationMenu);


//переменные для открытия формы обратной связи
const openFormButton   = document.querySelector('.contact-us__button');
const contactUsForm    = document.querySelector('.form-section');

//функция, открывающая форму обратной связи
const openContactUsForm = () => {
  contactUsForm.classList.add('form-section_open');
}

openFormButton.addEventListener('click', openContactUsForm);

// создаем форму 
const initForm = (formId) => {
  return new Form (formId);
}



const mobileMenuSection = document.querySelector('.header__mobile-list-block');

//функция, открывающая доп.разделы в мобильном меню
const showMoreMobileSections = () => {
  showMoreButton.classList.add('header__mobile-menu-next_hide');
  mobileMenuSection.classList.add('header__mobile-list-block_open');
}

const hideMoreMobileSection = () => {
  showMoreButton.classList.remove('header__mobile-menu-next_hide');
  mobileMenuSection.classList.remove('header__mobile-list-block_open');
}

  showMoreButton.addEventListener('click', showMoreMobileSections);

  initForm('contactForm');
