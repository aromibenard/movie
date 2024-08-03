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
import { useToast } from "./ui/use-toast"
import { ToastAction } from "./ui/toast"
import { BodyProps } from "@/app/home/page"


interface ContentTabProps extends BodyProps {
}

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
  deleteFromWatchlist
  
} : ContentTabProps) {
  
  interface Movie {
    poster_path: string | null;
    title: string;
    release_date: string;
    id: number
  }

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
              {watchlist.map((movie : Movie, i : number) => (
                <MovieItem key={i} movie={movie} deleteFromWatchlist={deleteFromWatchlist}/>
              ))}
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
              <MovieSearchList  movies = {movies} userId={userId} addToWatchlist={addToWatchlist} />
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
