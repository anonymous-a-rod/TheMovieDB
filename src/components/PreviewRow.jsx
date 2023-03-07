import { useEffect, useState } from "react";
import SelectionCard from "./SelectionCard";
import Spinner from "./Spinner";
import { BsArrowRightSquare, BsArrowLeftSquare } from 'react-icons/bs';

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
            <div className="w-screen flex flex-col items-center relative">
                <h2 className="text-4xl font-bold capitalize mb-4 w-full text-left">{category}</h2>
                <div className='w-full flex overflow-scroll overflow-y-hidden my-5 border-2 z-10'>
                <BsArrowRightSquare className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-20 w-20" />
                <BsArrowLeftSquare className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-20 w-20" />
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
            </div>
            }      
        </>
     );
}
 
export default PreviewRow;