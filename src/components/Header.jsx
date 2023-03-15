import { useState, useEffect } from "react";
import { BiMenu } from "react-icons/bi"; // from react-icons
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom";
import SearchFilter from "./SearchFilter";

const Header = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const [user, setUser] = useState(null);
  const [pageState, setPageState] = useState("Sign in");
  const [showMenu, setShowMenu] = useState(false);
  const [animate, setAnimate] = useState(false); 
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // adjust screen size as needed

    };

    handleResize(); // set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setAnimate(!animate); 
  };

  return (
    <header className="w-full shadow-md py-4 sticky left-0 right-0 top-0 z-50 bg-black bg-opacity-95">
      <nav className="max-w-6xl w-full mx-auto flex flex-row justify-between items-center px-4">
      <div className="flex flex-row items-center justify-start relative">
        {isSmallScreen ? (
            <button onClick={toggleMenu}>
            <BiMenu className="h-6 w-6 text-gray-300" />
            </button>
        ) : (
            <div className="flex flex-row items-center justify-start">
            <Link to="/" ><img src={`/assets/CINETRAIL.png`} alt="cinetrail" className="h-11" /></Link> 
            <Link to="/tv-shows" className="mx-3">
                TV Shows
            </Link>
            <Link to="/movies" className="mx-3">
                Movies
            </Link>
            </div>
        )}
        {isSmallScreen && (
            <div className={(animate)?"flex flex-col top-11 absolute left-[-16px] z-50 w-screen transition-all duration-500":'flex flex-col top-11 absolute left-[-16px] z-50 w-0 overflow-hidden transition-all duration-500'}>
              <Link
                  to="/"
                  className="block px-6 py-1 text-center bg-black bg-opacity-95 text-gray-300 font-semibold border border-gray-700"
                  onClick={toggleMenu}
              >
                  <p className="text-center">Home</p>
              </Link>
              <Link
                  to="/tv-shows"
                  className="block px-6 py-1 text-center bg-black bg-opacity-95 text-gray-300 font-semibold border border-gray-700"
                  onClick={toggleMenu}
              >
                  <p className="text-center">TV Shows</p>
              </Link>
              <Link
                  to="/movies"
                  className="block px-6 py-1 text-center bg-black bg-opacity-95 text-gray-300 font-semibold border border-gray-700"
                  onClick={toggleMenu}
              >
                  Movies
              </Link>
            <button
              className="px-4 py-1 text-white font-semibold rounded-b-sm bg-red-700 h-[30px]"
              onClick={() => {
                navigate(pageState === "Sign in" ? "/signin" : "/profile");
                toggleMenu(); 
              }}>
              {pageState}
            </button>
          </div>
        )}
        </div>


        <div className="flex flex-row items-center">
          <SearchFilter />
          {!isSmallScreen &&
            <button
              className='px-4 py-1 bg-black text-white rounded-lg font-semibold bg-red-700'
              onClick={() =>
                navigate(pageState === "Sign in" ? "/signin" : "/profile")
              }
            >
              {pageState}
            </button>
          }
        </div>
      </nav>
    </header>
  );
};

export default Header;