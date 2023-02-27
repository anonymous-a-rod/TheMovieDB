import { useEffect, useState } from "react";
import Spinner from "../components/Spinner"


const TvShows = () => {
    const [loading, setLoading] = useState(true);

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
            <section className="max-w-6xl mx-auto flex flex-col items-center">
                <h2>TvShows</h2>
            </section>
            }      
        </>
     );
}
 
export default TvShows;