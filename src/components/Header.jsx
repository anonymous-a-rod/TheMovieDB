import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchFilter from "./SearchFilter";


const Header = () => {
    const navigate = useNavigate();
    const auth = getAuth();

    const [user, setUser] = useState(null);
    const [pageState, setPageState] = useState("Sign in");

    console.log(user)
    
    useEffect(()=>{
        onAuthStateChanged(auth, user => {
            if(user){
                setPageState("Profile");
                setUser(user);
            } else {
                setPageState("Sign in"); 
            }
        })
    }, [auth])




    return ( 
        <header className="w-full shadow-md py-4">
            <nav className="max-w-6xl w-full mx-auto flex flex-row justify-between items-center">
                <div className="flex flex-row items-center justify-start">
                    <Link to="/" className="mr-10"><img src={`/assets/CINETRAIL.png`} alt="CINETRAIL" className="max-h-12"/></Link> 
                    <Link to="/" className="mx-3">Home</Link>
                    <Link to="/tv-shows" className="mx-3">TV Shows</Link>
                    <Link to="/movies" className="mx-3">Movies</Link>

                </div>
                <div className="flex flex-row items-center">
                    <SearchFilter />
                    <button 
                        className="px-4 py-1 bg-black text-white rounded-lg font-semibold"
                        onClick={()=>navigate(pageState === "Sign in"? "/signin" : "/profile")}
                    >{pageState}</button>
                </div> 
            </nav>    
        </header>
        
     );
}
 
export default Header;