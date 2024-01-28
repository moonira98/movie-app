import React from 'react';
import { Link } from 'react-router-dom';
import user from "../../images/user.png";
import "./Header.scss";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice';


const Header = () => {
  const [term, setTerm] = useState('');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if(term === '') return alert('Please enter search term')
    dispatch(fetchAsyncMovies(term))
    dispatch(fetchAsyncShows(term))
    setTerm('');
    
  }
  return (
    <div className='header'>
       <Link to='/'><div className='logo'> Movie app</div></Link>
       <div className='search-bor'>
          <form onSubmit={submitHandler}>
            <input type='text' value={term} placeholder='Search movies or Shows'
            onChange={(e) => setTerm(e.target.value)} />
            <button><i className='fa fa-search'>Click</i></button>
          </form>
       </div>
       <div className='user-image'>
            <img src={user} alt='user' />
         </div>
    </div>
    
  )
}

export default Header