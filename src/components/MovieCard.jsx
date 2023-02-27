import { useNavigate } from "react-router-dom";

const MovieCard = ({movie}) => {
    const navigate = useNavigate();

    return ( 
        <article onClick={()=>navigate(`../movie-details/${movie.id}`)}>
            <img 
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
                alt={movie.title}
                className="w-40" 
            />
            <h4>{movie.title}</h4>
        </article>
     );
}
 
export default MovieCard;