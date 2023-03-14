import { useEffect, useState } from "react";
import SelectionCard from "../components/SelectionCard";
import Spinner from "../components/Spinner"


const TvShows = () => {
    const [loading, setLoading] = useState(false);
    const [selections, setSelections] = useState(null);
    const [page, setPage] = useState(2)

    const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


    useEffect(()=>{
        setLoading(true);
        try{
            fetch(`${`https://api.themoviedb.org/3/tv/popular?api_key=09cbcde820a19e4959494fa25a97a645&page=${page}`}`)
            .then((response) => response.json())
            .then((data) => setSelections(data.results))

        } catch(error){
            console.log(error)
        }
        setLoading(false);
        
    },[page])

    const handlePageChange = (index) => {
        setPage(index)
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }


    return ( 
        <>
        <section className="max-w-6xl mx-auto">
            { loading && <Spinner /> }
            <h1 className="text-4xl lg:text-6xl w-full text-center my-10">Popular TV Shows</h1>
            { !loading && selections && 
            <div className="mx-auto grid grid-cols-1 gap-8 mb-2 items-center justify-items-center sm:max-w-[432px] sm:grid-cols-2 md:grid-cols-3 md:max-w-[664px] lg:max-w-[814px] xl:max-w-[1096px] xl:grid-cols-4">
            { selections?.length > 0 && selections.map((selection)=>
                (
                    <div key={selection.id}>
                        <div>
                            <SelectionCard selection={selection} />
                        </div>
                    </div>     
                )
            )}
            </div>
            }
            <div className="w-full flex justify-center my-10">
                {pages && pages.map((index)=>{
                    return <p key={index}
                            className={`mx-3 inline cursor-pointer text-lg sm:mx-4 ${page === (index+1)? "text-red-600":"hover:opacity-70"}`}
                            onClick={()=>handlePageChange(index+1)}
                            >
                                {index}
                            </p>
                })}    
            </div>
            

        </section>

        </>
     );
}
 
export default TvShows;