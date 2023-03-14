import { useState, useRef } from "react";

const CastCrew = ({info, title, showMoreInfo}) => {
    const [showMore, setShowMore] = useState(false); 
    const containerRef = useRef(null);

    const handleShowMore = () => {
        setShowMore(!showMore);
        containerRef.current.scrollIntoView();
    };

    return ( 
        <div className={(info.length >= 0)?'relative my-10 max-w-6xl mx-auto':'hidden'} ref={containerRef}>
            <h3 className={"text-3xl mb-10 w-full text-center capitalize ml-0 md:text-left md:ml-10"}>{title}</h3>
            <div className="ml-8 sm:ml-16 md:ml-16 lg:ml-36 xl:ml-48 mx-auto max-w-lg md:max-w-4xl min-w-min grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden mb-2 justify-items-start items-start">
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
                            ? "flex flex-row justify-start items-center m-5"
                            : "hidden"
                        }
                    >
                        <img
                            alt={item.name}
                            src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
                            className="w-32 min-w-[128px] h-32 object-cover rounded-full"
                        />
                        <div className="flex flex-col ml-4">
                            <p className="text-xl w-full text-left font-semibold">
                                {item.character ? `${item.character}` : item.department ? `${item.department}` : ""}
                            </p>
                            <p className="text-lg w-full text-left font-light">{item.name}</p>
                        </div>
                    </div>
                    )}
                </>
                );
            })}
            </div>

            { showMoreInfo &&
            <div className="w-full text-right cursor-pointer">
                <p className="text-end mr-10 cursor-pointer" onClick={handleShowMore}>{(showMore)?`Show less ${title.toLowerCase()}...`:`Show more ${title.toLowerCase()}...`}</p>
            </div>
            }
        </div>
     );
}
 
export default CastCrew;