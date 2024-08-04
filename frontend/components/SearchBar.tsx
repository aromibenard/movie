'use client'

import { SearchBarProps } from "@/types/types";
import { Input } from "@mui/material"
import React from "react";


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
