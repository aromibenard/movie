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
import React from "react"
import MovieSearchList from "./MovieSearchList"
import Pagination from "./Pagination"
import MovieItem from "./MovieItem"
import { Skeleton } from "./ui/skeleton"
import { ContentTabProps, Movie } from "@/types/types"

export function ContentTab({
  userId, 
  watchlist,
  handleSubmit,
  handleChange,
  addToWatchlist,
  nextPage,
  currentPage,
  searchTerm,
  numberPages,
  movies,
  totalResults,
  deleteFromWatchlist,
  isLoading,
  isFetching
  
} : ContentTabProps) {
  
  return (
    <Tabs defaultValue="watchlist" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="watchlist">My Watchlist</TabsTrigger>
        <TabsTrigger value="add-watchlist">Add to Watch List</TabsTrigger>
      </TabsList>
      <TabsContent value="watchlist">
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription>
              Current watchlist
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className='grid grid-cols-4 gap-1.5'>
              {isLoading ? (
                <div className="flex flex-col space-y-3 w-full h-full">
                  <Skeleton className="h-[220px] w-full rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-full w-full" />
                    <Skeleton className="h-full w-full" />
                  </div>
                </div>
              ) : (
                watchlist.map((movie : Movie, i : number) => (
                  <MovieItem key={i} movie={movie} deleteFromWatchlist={deleteFromWatchlist}/>
                ))
              )}
            </div>
                
          </CardContent>
          
          <CardFooter>
            
          </CardFooter>
        </Card>
      </TabsContent>
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
              <MovieSearchList  movies = {movies} 
                userId={userId}
                isFetching={isFetching} 
                addToWatchlist={addToWatchlist} 
              />
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
    </Tabs>
  )
}