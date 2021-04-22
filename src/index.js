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

  //TODO Поправить уловие проврки!!!

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
    loadMoreBtn.enable();
  });
}

function appendImagesMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', imagesList(hits));
}

function clearImagesContainer() {
  refs.gallery.innerHTML = '';
}
