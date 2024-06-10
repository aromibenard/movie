import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import SearchBar from "./SearchBar"
import React, { useState } from "react"
import MovieSearchList from "./MovieSearchList"

export function ContentTab() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY

  type Movie = {
    id: number;
    title: string;

  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetch (`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`)
    .then (data => data.json())
    .then (data => {
      console.log(data)
      setMovies(prevMovies => [...prevMovies, ...data.results]);
    })

  }

  const handleChange = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchTerm(e.target.value)

  }




  return (
    <Tabs defaultValue="watchlist" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="watchlist">Watch List</TabsTrigger>
        <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
      </TabsList>
      <TabsContent value="watchlist">
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
              <MovieSearchList  movies = {movies}/>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="recommendations">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, youll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
