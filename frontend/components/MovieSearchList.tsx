import React from 'react'
import { Button } from './ui/button'
import { Add } from '@mui/icons-material'
import { AlertDialog, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from './ui/alert-dialog';
import Loading from './Loading';
import { Skeleton } from './ui/skeleton';
import { MovieProps, MovieSearchListProps } from '@/types/types';


const MovieSearchList: React.FC<MovieSearchListProps> = ({
  movies, userId, addToWatchlist, isFetching }) => {
  return (
    <div>
      <div className='grid grid-cols-4 gap-1.5'>
        {Array.isArray(movies) ? (
            movies.map((movie, i ) => {
                return (
                    <Movie 
                      key={i} 
                      image={movie.poster_path} 
                      title={movie.title} 
                      release_date={movie.release_date}
                      movie={movie}
                      addToWatchlist={addToWatchlist}
                      isFetching={isFetching}
                    />
                )
            })
        ): (
          <div className='w-full flex justify-center'><Loading/></div>
        )}
        
      </div>
    </div>
  )
}

const Movie : React.FC<MovieProps> = ({ 
 image, title, release_date, movie, addToWatchlist, isFetching  }) => {
    
  const handleClick = () => {
    addToWatchlist(movie)

  }

  return (
    <div className='border shadow-sm hover:scale-95 transition rounded cursor-pointer '>
        
        <div className=''>
          {isFetching ? (
            <div style={{ width: '100%', height: '100%' }}>
              <Skeleton className='w-full h-full'/>
            </div>
            ) : (
              image == null ? (
                <img src={'https://picsum.photos/id/357/200/300'} alt='default image' style={{ width: '100%' }} />
              ) : (
                <img src={`http://image.tmdb.org/t/p/w185${image}`} alt='movie poster' style={{ width: '100%' }} />
              )
            )
          }
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
