import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movie: {
    title: '',
    description: '',
    img: '',
    rate: '',
    category: '',
  },
  movieAction: 'Add movie',
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    updateMovie(state, action) {
      state.movie = action.payload;
    },
    clearInput(state) {
      state.movie.id = '';
      state.movie.title = '';
      state.movie.description = '';
      state.movie.img = '';
      state.movie.rate = '';
      state.movie.category = '';
    },
    setMovieAction(state, action) {
      state.movieAction = action.payload;
    },
  },
});

export const { updateMovie, clearInput, setMovieAction } = movieSlice.actions;
export default movieSlice.reducer;
