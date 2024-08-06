import { User } from "firebase/auth"

export interface BodyProps {
    userName?: string
    photoURL?: string
    user?: User | null
    userId?: string | null
    watchlist: Movie[]
    handleSubmit: (e: React.FormEvent) => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    addToWatchlist: (movie: Movie) => void
    nextPage: (pageNumber: number) => void
    deleteFromWatchlist: (id: string) => void
    currentPage: number
    searchTerm: string
    numberPages: number
    movies: Movie[]
    totalResults: number
    router?: any
    isLoading?: boolean
    isFetching?: boolean 
}

export interface ContentTabProps extends BodyProps {
}

export interface Movie {
    poster_path: string | null
    title: string
    release_date: string
    id: number
}

export interface MovieItemProps {
    movie: Movie;
    deleteFromWatchlist: (id: string) => void;
    key: number;
}

export interface MovieSearchListProps {
    movies: Movie[]
    userId: string | null
    addToWatchlist: (movie: Movie) => void
    isFetching: boolean
}


export interface MovieProps {
    image: string | null
    title: string 
    release_date: string
    movie: Movie
    addToWatchlist : (movie : Movie) => void
    isFetching: boolean
}

export interface NavProps {
    userName: string,
    photoURL: string,
    user: User | null
}

export interface PaginationProps  {
    pages: number;
    nextPage: (page: number) => void;
    currentPage: number;
}

export interface SearchBarProps {
    searchTerm: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
} 

export interface AuthContextTypes {
    user: User | null
    loading?: boolean
    userName: string
    photoURL: string
    userId: string
    watchlist: []
}
  