import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { CgPlayListRemove } from "react-icons/cg"


const WatchListCard = ({ID, type, onRemove}) => {
    const [details,setDetails] = useState(null);
    const [stars, setStars] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        if(details){
            const rating = details.vote_average / 2;
            const filledStars = Math.floor(rating);
            const hasHalfStar = rating - filledStars >= 0.5;
            // Create an array of stars to display
            const stars = Array.from({ length: 5 }, (_, index) => {
                if (index < filledStars) {
                    // Display a filled star
                    return <FaStar key={index} className="text-yellow-500 text-xl m-[0.5px]" />;
                } else if (index === filledStars && hasHalfStar) {
                    // Display a half-filled star
                    return <FaStarHalfAlt key={index} className="text-yellow-500 text-xl m-[0.5px]" />;
                } else {
                    // Display an unfilled star
                    return <FaRegStar key={index} className="text-yellow-500 text-xl m-[0.5px]" />;
                }
            });
            setStars(stars)
        }
    },[details])

    useEffect(()=>{
        const getData = async ()=>{
            if(type === "movies"){
                const getMovie = await axios.get(`https://api.themoviedb.org/3/movie/${ID}?api_key=09cbcde820a19e4959494fa25a97a645&language=en-US`);
                setDetails(getMovie.data);    
            } else if(type === "tvshows"){
                const getMovie = await axios.get(`https://api.themoviedb.org/3/tv/${ID}?api_key=09cbcde820a19e4959494fa25a97a645&language=en-US`);
                setDetails(getMovie.data);    
            }
        }
        getData().catch(err=>console.log(err));  
    },[ID, type]);

    console.log(details)

    return ( 
        <>
        { details &&
        <article
        className=" relative w-[200px] h-[300px] bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer group lg:w-[250px] lg:h-[350px]"
        >
            <div 
                onClick={()=>onRemove(type, ID)}
                className="cursor-pointer hidden group-hover:flex text-red-500 absolute top-1 right-1"
            >
                <CgPlayListRemove 
                    className="inline text-3xl" 
                />
            </div>
            <div
                onClick={() => navigate(`/${details.title ? "movie-details" : "tv-show-details"}/${details.id}`)}
            >
            <div className="absolute pt-2 pl-2 hidden group-hover:flex ">
                {stars}
            </div>
            <img
                src={`https://image.tmdb.org/t/p/original${details.poster_path}`}
                alt={details.title}
                className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 z-10 bg-black w-full bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-70">
                <h4 className="p-2 py-4 font-semibold text-xl text-center text-white text-opacity-0 group-hover:text-opacity-100">{details.title ? details.title : details.name}</h4>
            </div>
            </div>
        </article>
        }
        </>
     );
}
 
export default WatchListCard;

