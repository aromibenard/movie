import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import SearchBar from "./SearchBar"
import React, { useState } from "react"
import MovieSearchList from "./MovieSearchList"
import Pagination from "./Pagination"
import MovieItem from "./MovieItem"

export function ContentTab({ userId, watchlist }) {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalResults, setTotalResults ] = useState(0)
  const [currentPage, setCurrentPage ] = useState(1)
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY

  type Movie = {
    id: number;
    title: string;

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`
      );
      const data = await response.json();
      setMovies(data.results);
      setTotalResults(data.total_results);
      setCurrentPage(1); // Reset to first page on new search
    } catch (error) {
      console.error("Error fetching data:", error);
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

  const numberPages = Math.ceil(totalResults / 20 )


  return (
    <Tabs defaultValue="add-watchlist" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="add-watchlist">Add to Watch List</TabsTrigger>
        <TabsTrigger value="watchlist">My Watchlist</TabsTrigger>
      </TabsList>
      <TabsContent value="add-watchlist">
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription>
              Search for movie here. Click Add to update your watchlist
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <SearchBar 
                searchTerm={searchTerm}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            </div>
           
            <div className="space-y-1">
              <MovieSearchList  movies = {movies} userId={userId}/>
              {totalResults > 20 && (
                <Pagination
                  pages={numberPages}
                  nextPage={nextPage}
                  currentPage={currentPage}
                />
              )}
            </div>
          </CardContent>
          <CardFooter>
            
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="watchlist">
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className='grid grid-cols-3 gap-1.5'>
              {watchlist.map((movie, i) => (
                <MovieItem key={i} movie={movie}/>
              ))}
            </div>
              
          </CardContent>
          <CardFooter>
            <Button></Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
