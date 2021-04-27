import './styles.css';
import './css/form.css';

import imagesList from './templates/imagesList.hbs';
import ImagesApiService from './js/apiService';

const refs = getRefs();

const imagesApiService = new ImagesApiService();

refs.searchQuery.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  imagesApiService.query = e.target.elements.query.value;

  if (imagesApiService.query.trim() === '') {
    return alert('GG');
  }
  imagesApiService.resetPage();
  clearImagesContainer();
  fetchGallery();
  friconix_update();
}

function fetchGallery() {
  imagesApiService.fetchImages().then(hits => {
    appendImagesMarkup(hits);
    friconix_update();
  });
}

function appendImagesMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', imagesList(hits));
}

function clearImagesContainer() {
  refs.gallery.innerHTML = '';
}

function getRefs() {
  return {
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
