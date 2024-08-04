import { MovieItemProps } from '@/types/types';
import { Button } from '@mui/material';
import React from 'react';

const MovieItem: React.FC<MovieItemProps> = ({ movie, deleteFromWatchlist, key }) => {

  const handleClick = () => {
    deleteFromWatchlist(movie.id.toString())
  }

  return (
    <div className='border shadow-sm hover:scale-95 transition rounded cursor-pointer'>
      <div>
        {movie.poster_path == null ? (
          <img src={'https://picsum.photos/id/357/200/300'} alt='default image' style={{ width: '100%' }} />
        ) : (
          <img src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`} alt='movie poster' style={{ width: '100%' }} />
        )}
      </div>
      <div className='m-1 p-1'>
        <p className='font-semibold text-gray-600 text-pretty px-2'>{movie.title}</p>
        <Button onClick={handleClick}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default MovieItem;
