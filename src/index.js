import './styles.css';
import './css/form.css';

import { error } from '@pnotify/core';

import imagesList from './templates/imagesList.hbs';

import ImagesApiService from './js/apiService';
import onOpenModal from './js/components/openModal';
import getRefs from './js/components/refs';
import './js/components/scrollToTop';

const refs = getRefs();

const API = new ImagesApiService();

refs.searchQuery.addEventListener('submit', onSearch);
refs.input.addEventListener('input', cleanInput);
refs.gallery.addEventListener('click', onOpenModal);

function onSearch(e) {
  e.preventDefault();

  API.query = e.target.elements.query.value;

  if (API.query.trim() === '') {
    return info({
      title: 'Uh Oh!',
      delay: 2000,
      text: 'Too many matches found. Please enter a more specific query!',
    });
  }

  API.resetPage();
  cleanImagesContainer();
  fetchGallery();
  friconix_update();
}

function fetchGallery() {
  API.fetchImages().then(hits => {
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

// ---- Intersection Observer ---- //

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (API.query !== '') {
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
