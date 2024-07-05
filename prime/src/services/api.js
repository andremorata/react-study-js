import axios from 'axios';

// TMDB API
// Base URL => https://api.themoviedb.org/3
// Now playing => /movie/now_playing?api_key=e25ce4c1fd8672c1ee97853eae8f8704&language=pt-BR

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export default api;