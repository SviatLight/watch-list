import React, { useState } from 'react';
import './Movie.css';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateMovie, clearInput } from '../../redux/slices/movieSlice';
import { useAddMoviesMutation, useUpdateMovieMutation } from '../../redux/moviesAPI';

const Movie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addMovie, { isError: isErrorAdd }] = useAddMoviesMutation();
  const [putMovie, { isError: isErrorEdit }] = useUpdateMovieMutation();
  const { movie: movieRedux, movieAction } = useSelector((state) => state.movieSlice);
  const [movie, setMovie] = useState(movieRedux);

  const inputProperties = [
    {
      lableTitle: 'Movie Title',
      type: 'text',
      name: 'title',
      placeholder: 'Movie Title ...',
    },
    {
      lableTitle: 'Description',
      type: 'text',
      name: 'description',
      placeholder: 'Description ...',
    },
    {
      lableTitle: 'Image',
      type: 'text',
      name: 'img',
      placeholder: 'Image URL ...',
    },
    {
      lableTitle: 'Rate',
      type: 'number',
      name: 'rate',
      placeholder: 'Rate ...',
    },
    {
      lableTitle: 'Category',
      type: 'text',
      name: 'category',
      placeholder: 'Category ...',
    },
  ];

  const hanldeClick = async () => {
    if (!movie.title || !movie.description || !movie.img || !movie.rate || !movie.category) {
      alert('Ви не ввели звповнили всі поля!');
      return;
    }
    if (movieAction === 'Add movie') {
      await addMovie(movie).unwrap();
      alert(isErrorAdd ? 'Сталася помилка, спробуйте ще раз!' : 'Дані успішно добавлені!');
    } else if (movieAction === 'Edit movie') {
      await putMovie(movie).unwrap();
      alert(isErrorEdit ? 'Сталася помилка, спробуйте ще раз!' : 'Дані успішно оновлені!');
    }
    dispatch(updateMovie(movie));
    dispatch(clearInput());
    navigate('/');
  };

  return (
    <div className="movie">
      <div className="movie__introduce">
        <div className="introduce-img">
          <img src={movie.img} alt="" />
        </div>
        <div className="introduce-details">
          <h2>"{movie.title}"</h2>
          <h3>Description:</h3>
          <div className="introduce-description">
            <p>{movie.description}</p>
          </div>
          <div className="introduce-category">
            <h3>Category: {movie.category}</h3>
          </div>
          <div className="introduce-rate">
            <h3>Rate: {movie.rate}</h3>
          </div>
        </div>
      </div>
      <div className="movie__set">
        {inputProperties.map((item, index) => (
          <Input
            key={index}
            lableTitle={item.lableTitle}
            type={item.type}
            name={item.name}
            value={movie[item.name]}
            placeholder={item.placeholder}
            className="movie__input"
            inputFunc={setMovie}
          />
        ))}
        <div className="action__btn">
          <Button title={movieAction} className="movie__add-btn" onClick={hanldeClick} />
        </div>
      </div>
    </div>
  );
};

export default Movie;
