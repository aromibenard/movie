import React from 'react'
import { Button } from './ui/button'
import { Add } from '@mui/icons-material'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';

 export interface Movie {
  poster_path: string | null
  title: string 
  release_date: string
}

interface MovieSearchListProps {
  movies: Movie[]
  userId: string
  addToWatchlist: (movie: Movie) => void
}

interface MovieProps {
  image: string | null
  title: string 
  release_date: string
  movie: Movie
  addToWatchlist : (movie : Movie) => void
}

const MovieSearchList: React.FC<MovieSearchListProps> = ({movies, userId, addToWatchlist }) => {

  return (
    <div>
      <div className='grid grid-cols-4 gap-1.5'>
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
        
        <div className='m-1 p-1 grid'>
          <p className='font-semibold text-gray-600 text-pretty px-2'>{title}</p>
          <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={'link'} className='my-1 px-1 flex mx-auto' onClick={handleClick}>
                  <p><span><Add/></span>Add to Watchlist</p>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{movie.title} Added!</AlertDialogTitle>
                <AlertDialogDescription>
                  Visit your watchlist to view all your movies😉
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Okay</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      
    </div>
  )
}


export default MovieSearchList
