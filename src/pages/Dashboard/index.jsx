import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Input from '../../components/Input';
import search__icon from '../../assets/img/search__icon.svg';
import Button from '../../components/Button';
import { useGetMoviesQuery } from '../../redux/moviesAPI';
import { Link } from 'react-router-dom';
import MovieCard from '../../components/MovieCard';
import { useDispatch } from 'react-redux';
import { setMovieAction, clearInput } from '../../redux/slices/movieSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState({
    searchValue: '',
  });
  const {
    data = [],
    isError: isErrorGet,
    isLoading: isLoadingGet,
  } = useGetMoviesQuery(search.searchValue);

  useEffect(() => {
    dispatch(clearInput());
  }, [dispatch]);

  if (isErrorGet) {
    return <h1>Сталася помилка, спробуйте перезавантажити сторінку!</h1>;
  }

  if (isLoadingGet) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard__nav-section">
        <div className="dashboard__search">
          <Input
            placeholder="Search"
            type="text"
            name="searchValue"
            value={search.searchValue}
            inputFunc={setSearch}
            className="search__input"
          />
          <img src={search__icon} alt="search__icon" />
        </div>
        <Link to="add-movie" className="dashboard__addButton">
          <Button
            title="Add movie"
            className="button__add"
            onClick={() => dispatch(setMovieAction('Add movie'))}
          />
        </Link>
      </div>
      {data.length ? (
        <div className="movie__list">
          {data.map((item) => (
            <MovieCard key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <h1>Результатів не знайдено!</h1>
      )}
    </div>
  );
};

export default Dashboard;
