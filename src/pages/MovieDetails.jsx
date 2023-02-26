import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

const MovieDetails = () => {
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        try{

        } catch(error){
            console.log(error)
        }
        setLoading(false);
    },[])

    return ( 
        <>
            { loading && <Spinner /> }
            { !loading && 
            <section className="moviedetails-section">
                <h2>Movie Details</h2>
            </section>
            }
        </>
     );
}
 
export default MovieDetails;
