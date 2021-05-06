import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import debounce from 'lodash.debounce';

import { info } from '@pnotify/core';

const API_KEY = '20675292-983eeb99019a7539d0696693a';
const BASE_URL =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    return fetch(
      `${BASE_URL}=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`,
    )
      .then(response => response.json())
      .then(({ hits }) => {
        if (hits.length === 0) {
          info({
            title: 'You entered an invalid request!',
            delay: 1500,
            text: 'Nothing not found',
          });
        }
        this.incrementPage();

        return hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
