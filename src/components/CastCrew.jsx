import { useState } from "react";

const CastCrew = ({info, title, showMoreInfo}) => {
    const [showMore, setShowMore] = useState(false); 

    console.log(showMoreInfo)

    return ( 
        <div className={(info.length >= 0)?'relative mb-10 max-w-6xl mx-auto':'hidden'}>
            <h3 className={"text-3xl ml-10 mb-10 w-full capitalize"}>{title}</h3>
            <div className="mx-auto max-w-4xl min-w-min grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden mb-2 justify-items-start items-start">
            {info.map((item, index) => {
                if (!showMore && index > 3) {
                return <></>;
                }

                return (
                <>
                    {item.name && (
                    <div
                        key={item.name + index}
                        className={
                        item.profile_path !== null
                            ? "flex flex-row justify-start items-center pl-8 sm:pl-24 md:pl-12"
                            : "hidden"
                        }
                    >
                        <img
                        alt={item.name}
                        src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
                        className="w-32 min-w-32 h-32 object-cover rounded-full"
                        />
                        <div className="ml-4">
                        <p className="text-xl w-full text-left font-bold">
                            {item.character ? `${item.character}` : item.department ? `${item.department}` : ""}
                        </p>
                        <p className="text-lg w-full text-left">{item.name}</p>
                        </div>
                    </div>
                    )}
                </>
                );
            })}
            </div>

            { showMoreInfo &&
            <div className="w-full text-right cursor-pointer">
                <p className="text-end mr-10 cursor-pointer" onClick={()=>setShowMore(!showMore)}>{(showMore)?`Show less ${title.toLowerCase()}...`:`Show more ${title.toLowerCase()}...`}</p>
            </div>
            }
        </div>
     );
}
 
export default CastCrew;