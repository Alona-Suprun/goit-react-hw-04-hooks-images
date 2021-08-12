const API_KEY = '22049228-dddf73462342363350e266d0d';
const BASE_URL = 'https://pixabay.com/api/';

export default class imageApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImagesApi() {
    return fetch(
      `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`,
    )
      .then(response => response.json())
      .then(({ hits }) => {
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
