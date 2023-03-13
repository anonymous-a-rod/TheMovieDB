import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import WatchListCard from "../components/WatchListCard";
import { db } from "../firebase";



const Profile = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [movieWatchList, setMovieWatchList] = useState([]);
    const [tvWatchList, setTvWatchList] = useState([]);
    const [changeDetail, setChangeDetail] = useState(false);
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })
    const [watchList, setWatchList] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const {name, email} = formData;
 
    console.log("watchlist")
    console.log(watchList)
    console.log(loggedIn)


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

    console.log(movieWatchList)
    console.log(tvWatchList)


    // fetch watchlist and set states
    async function fetchWatchList() {
        setLoading(true);
        const docRef = doc(db, "watchlist", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        setLoading(false);

        if (docSnap.exists()) {
            const watchListData = docSnap.data();
            if (watchListData.hasOwnProperty("movies")) {
                setMovieWatchList(watchListData["movies"]);
            } else {
                setMovieWatchList([]);
            }
            if (watchListData.hasOwnProperty("tvshows")) {
                setTvWatchList(watchListData["tvshows"]);
            } else {
                setTvWatchList([]);
            }
        } else {
            setMovieWatchList([]);
            setTvWatchList([]);
        }
    };

    // filter out removed selection
    function handleChange(type, ID) {
        // if (loggedIn) {
        // setWatchList({
        //     ...watchList,
        //     [type]: watchList[type].filter(item => item !== ID)
        // });
        // } else {
        //     toast.error("Sign in to add to watchlist");
        // }
    }

    // // update firebase after removing docs
    // useEffect(() => {
    //     if (loggedIn && watchList !== null) {
    //         const watchListRef = doc(db, "watchlist", auth.currentUser.uid);
    //         setDoc(watchListRef, watchList );
    //     }
    //     fetchWatchList()
    //     // eslint-disable-next-line
    // }, [watchList, loggedIn]);
    
    function onLogout(){
        auth.signOut();
        navigate('/');
    }

    function onChange(e){
        setFormData(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }


    async function onSubmit(){
        try {
       
            if(auth.currentUser.displayName !== name){
                await updateProfile(auth.currentUser, {
                    displayName: name
                })
            const docRef = doc(db, "users", auth.currentUser.uid);
            await updateDoc(docRef, {
                name,
            })
            }
            toast.success("Profile username updated");

        } catch(error){
            toast.error("Could not update the profile username")
            
        }
    }

    




    const style = {
        email: `w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out`,
        edit: `text-red-600 pr-3 hover:text-red-700 transition ease-in-out duration-200 cursor-pointer ml-1`,
        signout: `text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer`
    }

    return ( 
        <>
            <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
                <h1 className="text-3xl text-center mt-12 font-bold">My Profile</h1>
              
                <div className="w-full md:w-[50%] mt-6 mb-6 px-3">
                    <form>
                        <div className="relative">
                        
                            <input 
                                type="text" 
                                id="name" 
                                value={name} 
                                className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${
                                    changeDetail && "bg-red-200 focus:bg-red-200"
                                }`}
                            
                                disabled={!changeDetail}
                                onChange={()=>onChange()}
                                placeholder="Username"
                            />
                        </div>
                        <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            className={style.email}
                            disabled 
                        />
                        <div className="flex mb-6 justify-between whitespace-nowrap text-sm sm:text-lg">
                            <p className="flex items-center ">Change username? 
                            <span onClick={() => {
                                changeDetail && onSubmit();
                                setChangeDetail((prevState) => !prevState);
                            }} className={style.edit}>{ changeDetail ? "Apply change" : "Edit" }</span></p>
                            <p onClick={onLogout} className={style.signout}>Sign out</p>
                        </div>
                    </form>
                </div>
                { !loading &&  (movieWatchList?.length > 0) &&
                <>                          
                    <h2 className="text-3xl text-center font-semibold mb-6 mt-6">
                    Watchlist
                    </h2>
                    <div className="flex flex-wrap justify-center items-center  gap-6 mb-10">     
                    { movieWatchList?.length > 0 && movieWatchList.map((MovieID)=>
                        (
                            <div key={MovieID}>

                                <div>
                                    <WatchListCard 
                                        ID={MovieID} 
                                        type="movies"
                                        onRemove={handleChange} 
                                    />
                                </div>
                            </div>     
                        )
                    )}
                    { tvWatchList.map((showID)=>
                        (
                            <div key={showID}>

                                <div>
                                    <WatchListCard 
                                        ID={showID} 
                                        type="tvshows" 
                                        onRemove={handleChange} 
                                    />
                                </div>
                            </div>     
                        )
                    )}
                    </div>
                </>
                }
                
            </section>
        </>
     );
}
 
export default Profile;