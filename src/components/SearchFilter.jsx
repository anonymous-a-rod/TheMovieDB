import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchFilter = () => {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");

    const handleSearchSubmit = () => {
        navigate(`/search/${searchInput}`)
        setSearchInput("")
      }
    
      const handleInputKeyDown = (event) => {
        if (event.key === "Enter") {
          // Do something when the user presses Enter
          handleSearchSubmit()
        }
      };

    return ( 
        <div className="relative">
            <input
                className="w-64 h-8 rounded-md indent-2 pl-1 mr-3 focus:outline-none border"
                type="text"
                placeholder="Find Your Meal" 
                value={searchInput}
                onChange={(e)=>setSearchInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
            />
            <button 
                className="absolute right-[18px] top-[8px]"
                onClick={handleSearchSubmit}
            >
                <FaSearch />
            </button>
        </div>
     );
}
 
export default SearchFilter;