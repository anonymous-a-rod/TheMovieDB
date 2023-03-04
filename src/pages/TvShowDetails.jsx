import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const TvShowDetails = () => {
    const [loading, setLoading] = useState(false);
    const [TvShowDetails, setTvShowDetails] = useState(null);

    const param = useParams().id;

    console.log(param)

    useEffect(()=>{
        setLoading(true);
        try{
            fetch(`https://api.themoviedb.org/3/tv/${param}?api_key=09cbcde820a19e4959494fa25a97a645&language=en-US`)
            .then((response) => response.json())
            .then((data) => setTvShowDetails(data))

        } catch(error){
            console.log(error)
        }
        setLoading(false);
        
    },[param])

    useEffect(()=>{
        console.log(TvShowDetails)
    },[TvShowDetails])

    console.log(TvShowDetails)
    

    return ( 
        <>
            { loading && <Spinner /> }
            { !loading && TvShowDetails && 
            <section className="max-w-6xl mx-auto flex flex-col items-center">
                <h2>{TvShowDetails.name}</h2>
                <p>{TvShowDetails.overview}</p>
                
            </section>
            }
        </>
     );
}
 
export default TvShowDetails;