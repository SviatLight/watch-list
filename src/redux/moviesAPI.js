import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const moviesAPI = createApi({
  reducerPath: 'moviesAPI',
  tagTypes: ['Movies'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (build) => ({
    getMovies: build.query({
      query: (search) => `movies${search ? `?q=${search}` : ''}`,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Movies', id })), { type: 'Movies', id: 'LIST' }]
          : [{ type: 'Movies', id: 'LIST' }],
    }),
    addMovies: build.mutation({
      query: (body) => ({
        url: 'movies',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Movies', id: 'LIST' }],
    }),
    updateMovie: build.mutation({
      query: (body) => ({
        url: `movies/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Movies', id: 'LIST' }],
    }),
    deleteMovie: build.mutation({
      query: (id) => ({
        url: `movies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Movies', id: 'LIST' }],
    }),
  }),
});

export const {
  useAddMoviesMutation,
  useGetMoviesQuery,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
} = moviesAPI;
