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
            className=" relative w-[200px] h-[300px] bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer group lg:w-[280px] lg:h-[380px]"
        >
            <div className="absolute pt-2 pl-2 hidden group-hover:flex ">
                {stars}
            </div>
            <img
                src={`https://image.tmdb.org/t/p/original${selection.poster_path}`}
                alt={selection.title}
                className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 z-10 bg-black w-full bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-70">
                <h4 className="p-2 py-4 font-semibold text-xl text-center text-white text-opacity-0 group-hover:text-opacity-100">{selection.title ? selection.title : selection.name}</h4>
            </div>
        </article>


     );
}
 
export default SelectionCard;