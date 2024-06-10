'use client'

import { Input } from "@mui/material"
import { Button } from "./ui/button";
import React from "react";

interface SearchBarProps {
    searchTerm: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
}  

const SearchBar : React.FC<SearchBarProps> = ({ searchTerm, handleChange, handleSubmit}) => {

    return (
        <div className="flex space-x-3">
            <form action='' onSubmit={handleSubmit} >
                <Input 
                    type="text"
                    placeholder="Search Movie"
                    onChange={handleChange}
                />
              
            </form>           
        </div>
    )
}

export default SearchBar
