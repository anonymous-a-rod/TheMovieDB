import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Spinner from "./Spinner"


const Trending = () => {
    const [loading, setLoading] = useState(true);
    const [trending, setTrending] = useState([]);

    useEffect(()=>{
        setLoading(true);
        try{
            fetch(`${"https://api.themoviedb.org/3/trending/all/day?api_key=09cbcde820a19e4959494fa25a97a645"}`)
                .then((response) => response.json())
                .then((data) => setTrending(data.results))

        } catch(error){
            console.log(error)
        }
        setLoading(false);
    },[])

    console.log(trending)


    return ( 
        <>
            { loading && <Spinner /> }
            { !loading && 
            <div className="max-w-6xl mx-auto flex flex-col items-center">
                <h2>Trending</h2>
                { trending?.length > 0 && trending.map((movie)=>
                    (
                        <>
                        
                        <div key={movie.id}>
                            <MovieCard movie={movie} />
                            <h1>hello</h1> 
                        </div>
                              
                       
                        
                        </>
                          
                    )

                )}
            </div>
            }      
        </>
     );
}
 
export default Trending;