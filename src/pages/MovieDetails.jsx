import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const MovieDetails = () => {
    const [loading, setLoading] = useState(false);
    const [MovieDetails, setMovieDetails] = useState(null);

    const param = useParams().id;

    console.log(param)

    useEffect(()=>{
        setLoading(true);
        try{
            fetch(`https://api.themoviedb.org/3/movie/${param}?api_key=09cbcde820a19e4959494fa25a97a645&language=en-US`)
            .then((response) => response.json())
            .then((data) => setMovieDetails(data))

        } catch(error){
            console.log(error)
        }
        setLoading(false);
        
    },[param])

    useEffect(()=>{
        console.log(MovieDetails)
    },[MovieDetails])
    

    return ( 
        <>
            { loading && <Spinner /> }
            { !loading && MovieDetails && 
            <section className="max-w-6xl mx-auto flex flex-col items-center">
                <h2>{MovieDetails.title}</h2>
                <p>{MovieDetails.overview}</p>
                
            </section>
            }
        </>
     );
}
 
export default MovieDetails;
