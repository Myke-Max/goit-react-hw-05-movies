const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'a9d0376fe63e93e22beddbd74b8cc702';

const getMovies = (url = '') => {
  return fetch(url)
    .then(r => r.json())
    .catch(error => new Error(`${error}`));
};

export function getPopularMovies() {
  return getMovies(`${BASE_URL}trending/movie/day?api_key=${API_KEY}`);
}
export function getMoviesByQuery(query) {
  return getMovies(
    `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
  );
}

export function getMoviesDetail(movieId) {
  return getMovies(`${BASE_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`);
}

export function getInformationAboutTheCast(movieId) {
  return getMovies(`${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
}

export function getReviewsMovie(movieId) {
  return getMovies(`${BASE_URL}movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`);
}
