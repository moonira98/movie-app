import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from '../../common/apis/movieApi'
import { APIkey } from '../../common/apis/MovieApiKey'

export const fetchAsyncMovies = createAsyncThunk(
  'movies/fetchAsyncMovies', 
  async (term) => {
    try {
      const response = await movieApi.get(
        `?apiKey=${APIkey}&s=${term}&type=movie`);
      return response.data;
    } catch (error) {
      throw Error('Failed to fetch movies');
    }
  }
);

export const fetchAsyncShows = createAsyncThunk(
  'movies/fetchAsyncShows', 
  async (term) => {
    try {
      const response = await movieApi.get(
        `?apiKey=${APIkey}&s=${term}&type=series`);
      return response.data;
    } catch (error) {
      throw Error('Failed to fetch shows');
    }
  }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  'movies/fetchAsyncMovieOrShowDetail',  
  async (id) => {
    try {
      const response = await movieApi.get(
        `?apiKey=${APIkey}&i=${id}&Plot=full`  
      );
      return response.data;
    } catch (error) {
      throw Error('Failed to fetch movie or show detail');
    }
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectMovieOrShow: {},
  isLoading: false,
  error: null
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    removeSelectMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.movies = payload;
      })
      .addCase(fetchAsyncMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAsyncShows.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.shows = payload;
      })
      .addCase(fetchAsyncShows.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAsyncMovieOrShowDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.selectMovieOrShow = payload;
      })
      .addCase(fetchAsyncMovieOrShowDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
  }
});

export const { removeSelectMovieOrShow, setIsLoading, setError } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectMovieOrShow = (state) => state.movies.selectMovieOrShow;
export const getIsLoading = (state) => state.movies.isLoading;
export const getError = (state) => state.movies.error;
export default movieSlice.reducer;
