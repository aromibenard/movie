import React from 'react'
import { Button } from './ui/button'
import { Add } from '@mui/icons-material'
import { db } from '@/firebase'
import { addDoc, collection } from "firebase/firestore";

interface Movie {
  poster_path: string | null
  title: string 
  release_date: string
}

interface MovieSearchListProps {
  movies: Movie[]
}

interface MovieProps {
  image: string | null
  title: string 
  release_date: string
  movie: Movie
  addToWatchlist : (movie : Movie) => void
}

const MovieSearchList: React.FC<MovieSearchListProps> = ({movies, userId}) => {
  const addToWatchlist = async (movie:Movie) => {
    try {
      const docRef = await addDoc(collection(db, 'users', userId, 'watchlist'), movie);
      console.log('Movie added to watchlist with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding movie to watchlist:', error);
    }
    
  }

  return (
    <div>
      <div className='grid grid-cols-3 gap-1.5'>
        {
          movies.map((movie, i ) => {
              return (
                  <Movie 
                    key={i} 
                    image={movie.poster_path} 
                    title={movie.title} 
                    release_date={movie.release_date}
                    movie={movie}
                    addToWatchlist={addToWatchlist}
                  />
              )
          })
        }
        
      </div>
    </div>
  )
}



const Movie : React.FC<MovieProps> = ({ image, title, release_date, movie, addToWatchlist  }) => {
  const handleClick = () => {
    addToWatchlist(movie)
  }

  return (
    <div className='border shadow-sm hover:scale-95 transition rounded cursor-pointer '>
        
        <div className=''>
            {image == null ? (
              <img src={'https://picsum.photos/id/357/200/300'} alt='default image' style={{ width: '100%' }} />
            ) : (
              <img src={`http://image.tmdb.org/t/p/w185${image}`} alt='movie poster' style={{ width: '100%' }} />
            )}
        </div>
        
        <div className='m-1 p-1'>
          <p className='font-semibold text-gray-600 text-pretty px-2'>{title}</p>
          <Button variant={'link'} className='my-2' onClick={handleClick}>
            <span><Add/></span>Add to Watchlist
          </Button>
        </div>
      
    </div>
  )
}


export default MovieSearchList
