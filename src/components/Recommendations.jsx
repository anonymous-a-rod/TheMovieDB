import { useEffect, useState } from 'react';
import { BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Recommendations = ({info, title, videoType="movie"}) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);
    const [type, setType] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        if(title.toLowerCase() === 'recommendations'){
            setType('recommendations')
        }
        else if(title.toLowerCase() === 'more like this'){
            setType('similar')
        }
    },[title])

    const handleScroll = () => {
        const container = document.getElementById(type);
        const maxScrollPosition = container.scrollWidth - container.offsetWidth;
        setShowLeft(container.scrollLeft > 0);
        setShowRight(container.scrollLeft < maxScrollPosition - 100);
      };

      const handleScrollRight = () => {
        const container = document.getElementById(type);
        const containerWidth = container.offsetWidth;
        container.scrollBy({ left: containerWidth, behavior: 'smooth' });
        setScrollPosition(container.scrollLeft + containerWidth);
        console.log(scrollPosition)
      };
    
      const handleScrollLeft = () => {
        const container = document.getElementById(type);
        const containerWidth = container.offsetWidth;
        container.scrollBy({ left: -containerWidth, behavior: 'smooth' });
        setScrollPosition(container.scrollLeft - containerWidth); 
      };

      console.log(info)
    return ( 
        <div className="my-6 max-w-6xl mx-auto">
            <h3 className={"text-3xl my-4"}>{title}</h3>
            <div className="relative">
            <div className="flex overflow-hidden gap-2" id={type === "recommendations"? 'recommendations' : "similar"} onScroll={()=>handleScroll()}>
                {
                    info && info.map((item)=>{
                        if(videoType === "movie"){
                            return(

                                <img
                                    src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                                    alt={item.title}
                                    className="w-50 h-60 cursor-pointer"
                                    key={item.id}
                                    onClick={()=>navigate(`/movie-details/${item.id}`)}
                                    
                                />
                            )
                        }

                        return(
                            <img
                                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                                alt={item.title}
                                className="w-50 h-60 cursor-pointer"
                                key={item.id}
                                onClick={()=>navigate(`/tv-show-details/${item.id}`)}     
                            />
                        )
                    })
                }
                <BsFillArrowRightSquareFill className={showRight ? "absolute right-5 top-1/2 -translate-y-1/2 z-20 h-20 w-20 text-red-700 text-opacity-80 cursor-pointer hover:opacity-90" : "hidden"} onClick={()=>handleScrollRight()} />
                <BsFillArrowLeftSquareFill className={showLeft ? "absolute left-5 top-1/2 -translate-y-1/2 z-20 h-20 w-20 text-red-700 text-opacity-80 cursor-pointer hover:opacity-90" : "hidden"} onClick={()=>handleScrollLeft()} />
            </div>
            </div>
        </div>
    );
}
 
export default Recommendations;