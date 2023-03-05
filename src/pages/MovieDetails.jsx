import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { FaStar, FaRegStar } from 'react-icons/fa';
import axios from "axios";

const MovieDetails = () => {
    const [loading, setLoading] = useState(false);
    const [MovieDetails, setMovieDetails] = useState(null);
    const [ReviewDetails, setReviewDetails] = useState(null);
    const [VideoDetails, setVideoDetails] = useState(null); 
    const [stars, setStars] = useState(null); 
    const [average, setAverage] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [trailerSecondary, setTrailerSecondary] = useState(null);

    const param = useParams().id;

    console.log(param)

    useEffect(()=>{
        const getData = async ()=>{
            setLoading(true);
            const getMovie = await axios.get(`https://api.themoviedb.org/3/movie/${param}?api_key=09cbcde820a19e4959494fa25a97a645&language=en-US`);
            setMovieDetails(getMovie.data);
            const getReview = await axios.get(`https://api.themoviedb.org/3/movie/${param}/reviews?api_key=09cbcde820a19e4959494fa25a97a645&language=en-US&page=1`);
            setReviewDetails(getReview.data);
            const getVideo = await axios.get(`https://api.themoviedb.org/3/movie/${param}/videos?api_key=09cbcde820a19e4959494fa25a97a645&language=en-US`);
            setVideoDetails(getVideo.data);
            setAverage(Math.round(getMovie.data.vote_average / 2));
            setTrailerSecondary((getVideo.data.results.length >= 1)?getVideo.data.results.filter((item, index)=>index === 0):null);
            setTrailer(getVideo.data.results.filter(item=>item.name === 'Official Trailer'));
            setLoading(false);
        }
        getData().catch(err=>console.log(err));  
    },[param])

    useEffect(()=>{
        const filledStars = Math.round(average);
        // Create an array of stars to display
        setStars(Array.from({ length: 5 }, (_, index) => {
            if (index < filledStars) {
            // Display a filled star
            return <FaStar key={index} className="text-yellow-500 text-xl m-[0.5px]" />;
            } else {
            // Display an unfilled star
            return <FaRegStar key={index} className="text-yellow-500 text-xl m-[0.5px]" />;
            }
        }));
    },[average]); 
    
    

    return ( 
        <>
            { loading && <Spinner /> }
            { !loading && MovieDetails && 
            <section className="">
                <div className="relative pt-[56.25%]">
                    <div className="absolute top-0 left-0 right-0 bottom-0">
                        {(VideoDetails.results.length > 0)?<iframe width='100%'
                        height='100%'
                        src={(trailer.length > 0)?`https://www.youtube.com/embed/${trailer[0].key}`:`https://www.youtube.com/embed/${trailerSecondary[0].key}`} 
                        title="YouTube video player" 
                        frameborder="1"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                        
                        :<p>No Trailer Available</p>
                        }
                    </div>
                </div>
                <div>
                    <div>
                        <h2>{MovieDetails.title}</h2>
                        <h3 className="flex">{stars}</h3>
                        <img
                            src={`https://image.tmdb.org/t/p/original${MovieDetails.poster_path}`}
                            alt={MovieDetails.title}
                            className="w-52 h-52object-cover"
                        />
                        <div>
                            {
                                MovieDetails.genres.map((item)=>{
                                    return <p>{item.name}</p>
                                })
                            }
                        </div>
                        <div>
                            <p>{MovieDetails.overview}</p>
                        </div>
                    </div>
                    <div>
                        <h3>Reviews</h3>
                        <div>
                            {(ReviewDetails.results.length > 0)?ReviewDetails.results.map(item=>{
                                    return(<div>
                                    {(item.author_details.avatar_path !== null)
                                        ?<img src={(item.author_details.avatar_path.includes('/https:'))?`${item.author_details.avatar_path.substring(1)}`:`https://image.tmdb.org/t/p/w500${item.author_details.avatar_path}`} 
                                        alt="avatar"
                                        className="w-10 h-10"/>
                                        :<img src="https://images.unsplash.com/photo-1546776310-eef45dd6d63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2010&q=80" 
                                        alt="default"
                                        className="w-10 h-10"/>
                                    }
                                    <h4>Author: {item.author}</h4>
                                    <p>{item.content}</p>
                                    <p>{item.author_details.rating}</p>
                                    </div>)
                                })
                                :<p>No Reviews</p>
                            }
                        </div>
                    </div>
                </div>
            </section>
            }
        </>
     );
}
 
export default MovieDetails;
