import axios from 'axios';
import {
  API_KEY
} from '../store/types';

const instanse = axios.create({
  baseURL: 'https://api.themoviedb.org/'
});

export const getSlickMovies = () => {
  return instanse.get(`3/trending/all/day?api_key=${API_KEY}`);
}

export const getNowPlayingMovies = (page) => {
  page = typeof page !== 'undefined' ? page : 1;
  return instanse.get(`3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`);
}

export const getPopularMovies = () => {
  return instanse.get(`3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
}

export const getUpcomingMovies = () => {
  return instanse.get(`3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`);
}

export const getNowPlayingSerials = () => {
  return instanse.get(`3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`);
}

export const getPopularSerials = (page) => {
  page = typeof page !== 'undefined' ? page : 1;
  return instanse.get(`3/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
}

export const getTopRatedSerials = () => {
  return instanse.get(`3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
}

export const getActors = (page) => {
  page = typeof page !== 'undefined' ? page : 1;
  return instanse.get(`3/person/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
}

export const getExactMovieInfo = (id) => {
  return instanse.get(`3/movie/${id}?api_key=${API_KEY}&language=en-US`);
}

export const getSimilarMovies = (id) => {
  return instanse.get(`3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`);
}

export const getExactSerial = (id) => {
  return instanse.get(`3/tv/${id}?api_key=${API_KEY}&language=en-US`);
}

export const getSimilarSerials = (id) => {
  return instanse.get(`3/tv/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`)
}

export const getExactActor = (id) => {
  return instanse.get(`3/person/${id}?api_key=${API_KEY}&language=en-US`);
}

export const getSessionForGuest = () => {
  return instanse.get(`3/authentication/guest_session/new?api_key=${API_KEY}`);
}

export const createToken = () => {
  return instanse.get(`3/authentication/token/new?api_key=${API_KEY}`);
}

export const getUserRequest = ({username, password, request_token}) => {
  return instanse.post(`3/authentication/token/validate_with_login?api_key=${API_KEY}`, {
    username: username,
    password: password,
    request_token: request_token,
  })
}

export const getUserInfo = ({session_id}) => {
  return instanse.get(`3/account?api_key=${API_KEY}&session_id=${session_id}`)
}

export const createSession = ({request_token}) => {
  return instanse.post(`3/authentication/session/new?api_key=${API_KEY}`, {
    request_token : request_token
  })
}