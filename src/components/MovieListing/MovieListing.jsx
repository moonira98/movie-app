import React from 'react';
import { useSelector } from 'react-redux';
import { getAllMovies, getAllShows } from '../../features/movies/movieSlice';
import MovieCard from '../MovieCard/MovieCard';
import "./MovieListing.scss";
import Slider from "react-slick";
import { Settings } from '../../common/settings';

const MovieListing = () => {
 
  const movies = useSelector(getAllMovies);
  const shows = useSelector(getAllShows);

  let renderMovies = "";
  if (movies.Response === "True") {
    renderMovies = movies.Search.map((movie) => (
      <MovieCard key={movie.imdbID} data={movie} />
    ));
  } else {
    renderMovies = <div className="movies-error"><h3>{movies.Error}</h3></div>;
  }

  let renderShows = "";
  if (shows.Response === "True") {
    renderShows = shows.Search.map((show) => (
      <MovieCard key={show.imdbID} data={show} />
    ));
  } else {
    renderShows = <div className="movies-error"><h3>{shows.Error}</h3></div>;
  }

  return (
    <div className='movie-wrapper'>
      <div className='movie-list'>
        <h2>Movie</h2>
        <div className='movie-container'>
          <Slider {...Settings}>{renderMovies}</Slider>
        </div>
      </div>
      <div className='show-list'>
        <h2>Shows</h2>
        <div className='movie-container'>
        <Slider {...Settings}>{renderShows}</Slider>
        </div>
      </div>
    </div>
  );
};

export default MovieListing;
