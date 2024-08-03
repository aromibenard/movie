'use client'

import Clock from "@/components/Clock";
import { ContentTab } from "@/components/ContentTab";
import Loading from "@/components/Loading";
import Nav from "@/components/Nav";
import { Button, buttonVariants } from "@/components/ui/button";
import { auth } from "@/firebase";
import { Avatar } from "@mui/material";
import { ClockIcon } from "@radix-ui/react-icons";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from '@/firebase'
import { collection, getDocs, doc, addDoc, deleteDoc, updateDoc, deleteField, getDoc, DocumentData } from "firebase/firestore";
import { Movie } from "@/components/MovieSearchList";
import Link from "next/link";



export default function HomePage() {

    const [loading, setLoading] = useState(true)
    const [userName, setUserName] = useState('')
    const [photoURL, setPhotoURL] = useState('')
    const [user, setUser] = useState<User | null>(null)
    const [userId, setUserId] = useState<string>('')
    const [watchlist, setWatchlist] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [totalResults, setTotalResults ] = useState(0)
    const [currentPage, setCurrentPage ] = useState(1)
    const [movies, setMovies] = useState([]);

    const numberPages = Math.ceil(totalResults / 20 )
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY
    const router = useRouter()

    useEffect(() => {
        
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            router.push('/home')
    
            const user = auth.currentUser
            setUser(user)
            const uid = user!.uid
            setUserId(uid)
            const photoURL = user?.photoURL
            setUserName(user!.displayName!)
            setPhotoURL(user?.photoURL || '')
            
            fetchWatchlist(uid)
            
    
          } else {
            setUser(null)
            router.push('/auth/register');
          }
          setLoading(false)
        });
    
        // Clean up function
        return () => unsubscribe();
    }, [router]);

    const fetchWatchlist = async (uid:string) => {
      try {
        const querySnapshot = await getDocs( collection(db, 'users', uid, 'watchlist'))
        const watchlistData = querySnapshot.docs.map(doc => doc.data())
        setWatchlist(watchlistData)
      } catch (error) {
        console.error("Error fetching watchlist:", error)
      }
      
    }

    const addToWatchlist = async (movie:Movie) => { 

      try {
        const docRef = await addDoc(collection(db, 'users', userId, 'watchlist'), movie);
        console.log('Movie added to watchlist with ID: ', docRef.id);
        setWatchlist(prevWatchlist => [...prevWatchlist, { ...movie, id: docRef.id }])
  
      } catch (error) {
        console.error('Error adding movie to watchlist:', error);
      }
      
    }

    // const deleteFromWatchlist = async (id: string) => {
    //   try {
    //     const userRef = doc(db, 'users', userId); // Reference to the user document
    
    //     // Fetch the current watchlist data
    //     const watchlistSnapshot = await getDoc(userRef);
    //     const currentWatchlist = watchlistSnapshot.data()?.watchlist || [];
    
    //     // Filter out the movie to delete
    //     const updatedWatchlist = currentWatchlist.filter(
    //       (movie: Movie) => movie.id !== Number(id)
    //     );
    
    //     // Update the 'watchlist' field in Firestore
    //     await updateDoc(userRef, { watchlist: updatedWatchlist });
    
    //     // Update local state (assuming you're using a state management library like React)
    //     setWatchlist(updatedWatchlist);
    
    //     console.log(`Movie ${id} deleted from watchlist`);
    //   } catch (error) {
    //     console.error("Error deleting movie from watchlist:", error);
    //   }
    // };
    

    const deleteFromWatchlist = async (id: string) => {
      try {
        const movieRef = doc(db, 'users', userId, 'watchlist', id);
        await deleteDoc(movieRef);
        setWatchlist(prevWatchlist => prevWatchlist.filter(movie => movie.id !== Number(id)));
        console.log(`Movie ${id} deleted from watchlist`);
      } catch (error) {
        console.error('Error deleting movie from watchlist:', error);
      }
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`
        )
        const data = await response.json()
        setMovies(data.results)
        setTotalResults(data.total_results)
        setCurrentPage(1) // Reset to first page on new search
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setSearchTerm(e.target.value);
    }

    const nextPage = async (pageNumber: number) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&page=${pageNumber}`
        );
        const data = await response.json();
        setMovies(data.results); // Set new movies, replacing old ones
        setCurrentPage(pageNumber);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
      if (loading) {
        return <Loading/>
      }

    return(
        <div>
          <Nav userName={userName} photoURL={photoURL} user={user}/>

          {/* body component used here is on the same file */}
          <Body 
            userName={userName} 
            photoURL={photoURL} 
            user={user} 
            userId={userId} 
            watchlist={watchlist}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            addToWatchlist={addToWatchlist}
            deleteFromWatchlist={deleteFromWatchlist}
            nextPage={nextPage}
            currentPage={currentPage}
            searchTerm={searchTerm}
            numberPages={numberPages}
            movies={movies}
            totalResults={totalResults}
            router={router}
          />
        </div>
    )
}

export interface BodyProps {
  userName?: string;
  photoURL?: string;
  user?: User | null;
  userId?: string | null;
  watchlist: Movie[];
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addToWatchlist: (movie: Movie) => void;
  nextPage: (pageNumber: number) => void;
  deleteFromWatchlist: (id: string) => void;
  currentPage: number;
  searchTerm: string;
  numberPages: number;
  movies: Movie[];
  totalResults: number;
  router?: any;
}

//sub components
const Body: React.FC<BodyProps> = ({
  userName, 
  photoURL, 
  userId, 
  watchlist,
  currentPage,
  searchTerm,
  numberPages,
  movies,
  totalResults,
  handleSubmit,
  handleChange,
  addToWatchlist,
  nextPage,
  deleteFromWatchlist,
  router

}) => {
  
  const logout = async () => {

    try {
      await signOut(auth)
      router.push('/')
    } catch {(error: any) => {}}
  }

  return (
    <div className="h-dvh bg-slate-50 md:max-w-5xl mx-auto p-4">
      <div className="grid md:grid-cols-4 gap-4 h-[15rem]">
        <div className="bg-yellow-100 p-4 col-span-1 flex flex-col items-center">
          <Avatar 
            src={photoURL}
            alt={userName}
            sx={{height: 180, width: 180}}
            className="flex mx-auto"
          />
          <h2 className="m-3 font-semibold flex mx-auto">{userName}</h2>
          <div className="flex items-center space-x-2 m-3 mx-auto">
            <ClockIcon className="text-2xl"/>
            <Clock />
          </div>
          <div className="grid space-y-4">
            <Link href={'/profile'} className = {buttonVariants({ variant:'outline' })}>
              View Profile
            </Link>
            <Button onClick={logout} >
              Log Out
            </Button>
          </div>
        </div>
        <div className=" p-4 col-span-3">
          <ContentTab 
            userId={userId} 
            watchlist={watchlist}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            addToWatchlist={addToWatchlist}
            nextPage={nextPage}
            currentPage={currentPage}
            searchTerm={searchTerm}
            numberPages={numberPages}
            movies={movies}
            totalResults={totalResults}
            deleteFromWatchlist={deleteFromWatchlist}

          />
        </div>
      </div>
    </div>
  )
}

