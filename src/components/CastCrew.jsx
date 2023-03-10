import { useState } from "react";

const CastCrew = ({info, title}) => {
    const [showMore, setShowMore] = useState(false); 

    return ( 
        <div className='relative mb-10 max-w-6xl mx-auto'>
            <h3 className={"text-center text-3xl mb-10 w-full capitalize"}>{title}</h3>
            <div className={`mx-auto  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 overflow-hidden mb-2`}>
            {
                info.map((item,index)=>{
                    if(!showMore && index > 3){
                        return <></>
                    }
                    
                    return(
                        <>
                        { item.profile_path &&
                            <div className={(item.profile_path !== null)?"flex flex-col justify-start items-center":'hidden'}> 
                                <img alt={item.name} src={`https://image.tmdb.org/t/p/original${item.profile_path}`} 
                                className='w-60 h-70' />
                                <p className="text-xl mb-5 w-full text-center">{item.character? `${item.character}: ` : item.department? `${item.department}: ` : "" }{item.name}</p>
                            </div>
                        }
                        </>
                    )
                })
            }
            </div>
            <div className="w-full text-right cursor-pointer">
                <p className="text-end mr-10 cursor-pointer" onClick={()=>setShowMore(!showMore)}>{(showMore)?`Show less ${title.toLowerCase()}...`:`Show more ${title.toLowerCase()}...`}</p>
            </div>
        </div>
     );
}
 
export default CastCrew;