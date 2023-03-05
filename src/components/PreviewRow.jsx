import { useEffect, useState } from "react";
import SelectionCard from "./SelectionCard";
import Spinner from "./Spinner"

const PreviewRow = ({category, searchQuery, additionalQuery}) => {
    const [loading, setLoading] = useState(true);
    const [selections, setSelections] = useState([]);



    useEffect(()=>{
        setLoading(true);
        try{
            fetch(`${`https://api.themoviedb.org/3/${searchQuery}?api_key=09cbcde820a19e4959494fa25a97a645${additionalQuery}`}`)
                .then((response) => response.json())
                .then((data) => setSelections(data.results))
        } catch(error){
            console.log(error)
        }
        setLoading(false);
    },[searchQuery, additionalQuery])

    // console.log(selections)


    return ( 
        <>
            { loading && <Spinner /> }
            { !loading && 
            <div className="max-w-6xl mx-auto flex flex-col items-center">
                <h2 className="text-4xl font-bold capitalize mb-4 w-full text-left">{category}</h2>
                <div className="flex flex-row overflow-hidden">
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
            </div>
            }      
        </>
     );
}
 
export default PreviewRow;