import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SelectionCard from "../components/SelectionCard";
import Spinner from "../components/Spinner";

const Search = () => {
    const [loading, setLoading] = useState(false);
    const [selections, setSelections] = useState(null);

    const param = useParams().id;

    console.log(param)

    useEffect(()=>{
        setLoading(true);
        try{
            fetch(`${`https://api.themoviedb.org/3/search/movie?api_key=09cbcde820a19e4959494fa25a97a645&query=${param}`}`)
            .then((response) => response.json())
            .then((data) => setSelections(data.results))

        } catch(error){
            console.log(error)
        }
        setLoading(false);
        
    },[param])

    // useEffect(()=>{
    //     console.log(selections)
    // },[selections])
    

    return ( 
        <>
            <section className="max-w-6xl mx-auto">
                <h1 className="text-6xl w-full text-center my-10 capitalize">{param && param.replaceAll("+", " ")}</h1>
                { loading && <Spinner /> }
                { !loading && selections && 
                <div className="mx-auto grid grid-cols-1 gap-8 mb-2 items-center justify-items-center sm:max-w-[432px] sm:grid-cols-2 md:grid-cols-3 md:max-w-[664px] lg:max-w-[814px] xl:max-w-[1096px] xl:grid-cols-4">
                { selections?.length > 0 && selections.map((selection)=>
                    (
                        <>
                            <div key={selection.id}>
                                <SelectionCard selection={selection} />
                            </div>
                        </>     
                    )
                )}
                </div>
                }
            </section>
        </>
     );
}
 
export default Search;