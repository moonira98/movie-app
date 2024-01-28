import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import './MovieDetail.scss';
import { fetchAsyncMovieOrShowDetail, getSelectMovieOrShow, removeSelectMovieOrShow} from '../../features/movies/movieSlice';


const MovieDetail = () => {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(getSelectMovieOrShow);

  useEffect(() => {
    dispatch(fetchAsyncMovieOrShowDetail(imdbID));
    return () => {
      dispatch(removeSelectMovieOrShow());
    }
  }, [dispatch, imdbID]);


  return (
    <div className='movie-section'>
      {Object.keys(data).length === 0 ?
      (<div>...Loading</div>)
      :(
      <>
      <div className='section-left'>
        <div className='movie-title'>{data.Title}</div>
        <div className='movie-rating'>
          <span>
           <i className='fa fa-star'> IMDB Rating </i> : {data.imdbRating}
          </span>
          <span>
            <i className='fa fa-thumbs-up'> IMDB Votes</i> : {data.imdbVotes}
          </span>
          <span>
            <i className='fa fa-film'> Runtime</i> : {data.Runtime}
          </span>
          <span>
            <i className='fa fa-calendar'> Year</i> : {data.Year}
          </span>
        </div>
        <div className='movie-plot'>{data.Plot}</div>
        <div className='movie-info'>
          <div>
            <span>Director</span>
            <span>{data.Director}</span>
          </div>
          <div>
            <span>Stars</span>
            <span>{data.Actors}</span>
          </div>
          <div>
            <span>Genres</span>
            <span>{data.Genre}</span>
          </div>
          <div>
            <span>Languages</span>
            <span>{data.Language}</span>
          </div>
          <div>
            <span>Awards</span>
            <span>{data.Awards}</span>
          </div>
        </div>
      </div>
      <div className='section-right'>
        <img src={data.Poster} alt={data.Title} />
      </div>
      </>
      )}
    </div>
  );
};

export default MovieDetail;
