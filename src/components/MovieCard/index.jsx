import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import './MovieCard.css';
import { useDispatch } from 'react-redux';
import { updateMovie, setMovieAction } from '../../redux/slices/movieSlice';
import { useDeleteMovieMutation } from '../../redux/moviesAPI';

const MovieCard = ({ id, img, title, description, rate, category }) => {
  const dispatch = useDispatch();
  const [deleteMovie, { isError: isErrorDelete }] = useDeleteMovieMutation();

  const handleClickEdit = () => {
    dispatch(updateMovie({ id, img, title, description, rate, category }));
    dispatch(setMovieAction('Edit movie'));
  };

  const handleClickDelete = async (id, title) => {
    if (window.confirm(`Ви дійсно бажаєте видалити ${title}`)) {
      await deleteMovie(id);
      alert(isErrorDelete ? 'Спробуйте ще раз!' : 'Дані успішно видалені!');
    }
  };

  return (
    <div className="movie__card-wrapper">
      <div className="movie__card-flex">
        <div className="movie__card-img">
          <img src={img} alt={title} />
        </div>
        <div className="movie__card">
          <div className="movie__card-details">
            <h2>{title}</h2>
            <p>Rate: {rate}</p>
            <p>Category: {category}</p>
          </div>
          <Link to="/edit-movie" className="movie__card-actions">
            <Button title="Edit" className="movie__card-edit" onClick={handleClickEdit} />
          </Link>
        </div>
      </div>
      <Button
        title="Delete"
        className="movie__card-delete"
        onClick={() => handleClickDelete(id, title)}
      />
    </div>
  );
};

export default MovieCard;
