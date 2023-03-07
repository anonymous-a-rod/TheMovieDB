import { useEffect, useState } from "react";
import SelectionCard from "../components/SelectionCard";
import Spinner from "../components/Spinner"


const Movies = () => {
    const [loading, setLoading] = useState(false);
    const [selections, setSelections] = useState(null);
    const [page, setPage] = useState(2)

    const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


    useEffect(()=>{
        setLoading(true);
        try{
            fetch(`${`https://api.themoviedb.org/3/movie/popular?api_key=09cbcde820a19e4959494fa25a97a645&page=${page}`}`)
            .then((response) => response.json())
            .then((data) => setSelections(data.results))

        } catch(error){
            console.log(error)
        }
        setLoading(false);
        
    },[page])

    // useEffect(()=>{
    //     console.log(selections)
    // },[selections])


    return ( 
        <>
        <section className="max-w-6xl mx-auto">
            { loading && <Spinner /> }
            <h1 className="text-6xl w-full text-center my-10">Popular Movies</h1>
            { !loading && selections && 
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center items-center mb-10">
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
                            className="inline cursor-pointer mx-4"
                            onClick={()=>setPage(index)}
                            >
                                {index}
                            </p>
                })}    
            </div>
            

        </section>

        </>
     );
}
 
export default Movies;