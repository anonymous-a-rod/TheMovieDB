
import { Link } from "react-router-dom";
import SearchFilter from "./SearchFilter";

const Header = () => {
    return ( 
        <header className="w-full bg-pink-400">
            <nav className="max-w-6xl w-full mx-auto flex flex-row justify-between items-center">
                <div className="flex flex-row items-center justify-start">
                    <Link to="/" className="mr-10"><img src={`/assets/netflix144.png`} alt="netflix" /></Link> 
                    <Link to="/" className="mx-3">Home</Link>
                    <Link to="/tv-shows" className="mx-3">TV Shows</Link>
                    <Link to="/movies" className="mx-3">Movies</Link>

                </div>
                <div className="">
                    <SearchFilter />
                </div> 
            </nav>    
        </header>
        
     );
}
 
export default Header;