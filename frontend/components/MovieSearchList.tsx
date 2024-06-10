import React from 'react'
import { Button } from './ui/button'
import { Add } from '@mui/icons-material'

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
}

const MovieSearchList: React.FC<MovieSearchListProps> = ({movies}) => {
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
                  />
              )
          })
        }
        
      </div>
    </div>
  )
}



const Movie : React.FC<MovieProps> = ({ image, title, release_date }) => {
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
          <Button variant={'link'} className='my-2'>
            <span><Add/></span>Add to Watchlist
          </Button>
        </div>
      
    </div>
  )
}


export default MovieSearchList
