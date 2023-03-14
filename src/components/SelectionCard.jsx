import { useNavigate } from "react-router-dom";
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

const SelectionCard = ({selection}) => {
    const navigate = useNavigate();

    const rating = selection.vote_average / 2;
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
    // console.log(selection)
    // console.log("selection")

    return ( 
        <article
            onClick={() => navigate(`../${selection.title ? "movie-details" : "tv-show-details"}/${selection.id}`)}
            className="ease-in-out duration-300 relative w-[200px] h-[300px] bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer group lg:w-[250px] lg:h-[350px]"
        >
            <div className="absolute pt-2 pl-2 hidden group-hover:flex ">
                {stars}
            </div>
            <img
                src={selection.poster_path !== null?`https://image.tmdb.org/t/p/original${selection.poster_path}`:'/assets/CINETRAIL.png'}
                alt={selection.title}
                className={selection.poster_path !== null?"w-full h-full object-cover":'object-center'}
            />
            <div className="absolute bottom-0 z-10 bg-black w-full bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-70">
                <h4 className="p-2 py-4 font-semibold text-xl text-center text-white text-opacity-0 group-hover:text-opacity-100">{selection.title ? selection.title : selection.name}</h4>
            </div>
            <div className={selection.poster_path === null?'absolute bottom-28 left-1/2 -translate-x-1/2 rounded-md p-2 w-full':'hidden'}>
                <p className="text-xl uppercase text-center text-black font-mono">{selection.name}</p>
            </div>
        </article>
     );
}
 
export default SelectionCard;