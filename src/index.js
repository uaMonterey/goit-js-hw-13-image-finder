import './styles.css';

import imagesList from './templates/imagesList.hbs';
import ImagesApiService from './js/apiService';
import LoadMoreBtn from './js/components/load-more-btn';

const refs = {
  searchQuery: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

loadMoreBtn.enable();

const imagesApiService = new ImagesApiService();

refs.searchQuery.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchGallery);

function onSearch(e) {
  e.preventDefault();

  imagesApiService.query = e.target.elements.query.value;

  //TODO Поправить уcловие проврки!!!

  if (imagesApiService.query.trim() === '') {
    return alert('GG');
  }
  loadMoreBtn.show();
  imagesApiService.resetPage();
  clearImagesContainer();
  fetchGallery();
}

function fetchGallery() {
  loadMoreBtn.disable();
  imagesApiService.fetchImages().then(hits => {
    appendImagesMarkup(hits);
    windowsScrolling();
    loadMoreBtn.enable();
  });
}

function appendImagesMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', imagesList(hits));
}

function clearImagesContainer() {
  refs.gallery.innerHTML = '';
}

function windowsScrolling() {
  const totalScrollHeight = refs.gallery.clientHeight;

  window.scrollTo({
    top: totalScrollHeight,
    left: 0,
    behavior: 'smooth',
  });
}

// //! Вариант скролла
// function windowsScrolling2() {
//   const scrollHeight = Math.max(
//     document.body.scrollHeight,
//     document.documentElement.scrollHeight,
//     document.body.offsetHeight,
//     document.documentElement.offsetHeight,
//     document.body.clientHeight,
//     document.documentElement.clientHeight,
//   );

//   window.scrollTo({
//     top: scrollHeight,
//     left: 0,
//     behavior: 'smooth',
//   });
// }
