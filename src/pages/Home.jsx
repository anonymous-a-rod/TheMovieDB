import { useEffect, useState } from "react";
import SearchFilter from "../components/SearchFilter";
import Spinner from "../components/Spinner"


const Home = () => {
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
            <section className="home-section">
                <h2>Home</h2>
                <SearchFilter />
            </section>
            }      
        </>
     );
}
 
export default Home;