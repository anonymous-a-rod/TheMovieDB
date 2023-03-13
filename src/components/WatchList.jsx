import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { CgPlayListAdd, CgPlayListRemove } from "react-icons/cg"
import { toast } from "react-toastify";
import { db } from "../firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";

const WatchList = ({param, type}) => {
    const [watch, setWatch] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [watchList, setWatchList] = useState({
        tvshows: [],
        movies: []
    });

    const auth = getAuth();

    useEffect(()=>{
        onAuthStateChanged(auth, user => {
            if(user){
                setLoggedIn(true);
                fetchWatchList();
            } else {
                setLoggedIn(false);
                setWatchList(null);
            }
        })
        // eslint-disable-next-line
    }, [auth])

    useEffect(() => {
        if (loggedIn && watchList !== null) {
            const watchListRef = doc(db, "watchlist", auth.currentUser.uid);
            setDoc(watchListRef, watchList );
        }
        // eslint-disable-next-line
    }, [watchList]);

    async function fetchWatchList() {
        setLoading(true);
        const docRef = doc(db, "watchlist", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        setLoading(false);

        if (docSnap.exists()) {
            const watchListData = docSnap.data();
            if (watchListData.hasOwnProperty(type)) {
                setWatchList(watchListData);
                setWatch(watchListData[type].includes(param));
            } else {
                setWatchList({
                    ...watchList,
                    [type]: []
                });
            }
        } else {
            setWatchList({
                tvshows: [],
                movies: []
            });
        }
    };

    function handleChange() {
        if (loggedIn) {
            if (!watch) {
                setWatch(true);
                setWatchList({
                    ...watchList,
                    [type]: [...watchList[type], param]
                });
            } else {
                setWatch(false);
                setWatchList({
                    ...watchList,
                    [type]: watchList[type].filter(item => item !== param)
                });
            }
        } else {
            toast.error("Sign in to add to watchlist");
        }
    }

    return ( 
        <>
            { !loading && (
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
            { loading && (
                <>
                    <div 
                        onClick={handleChange}
                        className="cursor-pointer items-center text-green-500"
                    >
                        <CgPlayListAdd className="inline text-3xl" />
                        <p className="inline">Add to watchlist</p>
                    </div>
                </>
            )}
        </>
     );
}
 
export default WatchList;