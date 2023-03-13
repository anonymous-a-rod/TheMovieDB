import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { CgPlayListAdd, CgPlayListRemove } from "react-icons/cg"
import { toast } from "react-toastify";
// import { db } from "../firebase";
// import { getDoc, doc } from "firebase/firestore";

const WatchList = ({param, type}) => {
    const [watch, setWatch] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false)
    // const [watchList, setWatchList] = useState([]);
    // const [loading, setLoading] = useState(true);

    const auth = getAuth();

    useEffect(()=>{
        onAuthStateChanged(auth, user => {
            if(user){
                setLoggedIn(true)
            } else {
                setLoggedIn(false) 
            }
        })
    }, [auth])


    function handleChange(){
        if(loggedIn){
          setWatch(!watch)  
        }else{
            toast.error("Sign in to add to watchlist")
        }
    }

    return ( 
        <>
            { true && (
                <>
                { !watch? (
                    <div 
                        onClick={handleChange}
                        className="cursor-pointer items-center text-green-500"
                    >
                        <CgPlayListAdd className="inline text-3xl" />
                        <p className="inline">Add to watchlist</p>
                    </div>
                ) : (
                    <div 
                        onClick={handleChange}
                        className="cursor-pointer  text-red-500"
                    >
                        <CgPlayListRemove className="inline text-3xl" />
                        <p className="inline">Remove from watchlist</p>
                    </div>
                )}
                </>
            )}
        </>
     );
}
 
export default WatchList;