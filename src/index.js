import './styles.css';
import './css/form.css';

import imagesList from './templates/imagesList.hbs';
import ImagesApiService from './js/apiService';

import * as basicLightbox from 'basiclightbox';

const refs = getRefs();

const imagesApiService = new ImagesApiService();

refs.searchQuery.addEventListener('submit', onSearch);
refs.input.addEventListener('input', cleanInput);

function onSearch(e) {
  e.preventDefault();

  imagesApiService.query = e.target.elements.query.value;

  if (imagesApiService.query.trim() === '') {
    return alert('GG');
  }

  imagesApiService.resetPage();
  cleanImagesContainer();
  fetchGallery();
  friconix_update();
}

function fetchGallery() {
  imagesApiService.fetchImages().then(hits => {
    appendImagesMarkup(hits);
    friconix_update();
  });
  refs.searchQuery.classList.add('isFetch');
  refs.target.style.display = 'block';
}

function appendImagesMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', imagesList(hits));
}

function cleanImagesContainer() {
  refs.gallery.innerHTML = '';
}

function cleanInput(e) {
  if (e.target.value.length === 0) {
    cleanImagesContainer();
    refs.target.style.display = 'none';
    refs.searchQuery.classList.remove('isFetch');
  }
}

function getRefs() {
  return {
    input: document.getElementById('searchQuery'),
    searchQuery: document.querySelector('.form'),
    gallery: document.querySelector('.gallery'),
    target: document.querySelector('.target'),
  };
}

// ----------------  Intersection Observer ----------------- //
// ================ or infinty scroll ===================== //

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (imagesApiService.query !== '') {
        fetchGallery();
      }
    }
  });
};
const options = {
  rootMargin: '200px',
};
const observer = new IntersectionObserver(onEntry, options);

observer.observe(refs.target);

// scrollToTop
const offset = 100;
const scrollUp = document.querySelector('.scroll-up');
const scrollUpSvgPath = document.querySelector('.scroll-up__svg-path');
const pathLength = scrollUpSvgPath.getTotalLength();

scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms';

const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

//updateDashoffset
const updateDashoffset = () => {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const dashoffset = pathLength - (getTop() * pathLength) / height;
  scrollUpSvgPath.style.strokeDashoffset = dashoffset;
};

//onScroll
window.addEventListener('scroll', () => {
  updateDashoffset();
  if (getTop() > offset) {
    scrollUp.classList.add('scroll-up--active');
  } else {
    scrollUp.classList.remove('scroll-up--active');
  }
});

//click
scrollUp.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

//-------------MODAL WINDOW----------//

// const instance = basicLightbox.create(`
//     <img src="${largeImageUrl}">
// `);

// instance.show();
