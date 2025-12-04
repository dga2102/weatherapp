"use client"

import { useEffect, useState } from "react";

export default function SearchBar({ onSearch }) {
    
    
    return (
        <form className="relative flex justify-center text-gray-600 p-10" >
            <input type="search" 
                   placeholder="Choose your location" 
                   className="bg-white h-10 px-5 pr-10 rounded-full text-lg shadow focus:outline-none"
                   
             />
            <button type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4 ml-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </button>
        </form>
        
    )
        
}