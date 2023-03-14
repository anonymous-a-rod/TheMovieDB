import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import axios from "axios";
import Review from "../components/Review";
import CastCrew from "../components/CastCrew";
import Recommendations from "../components/Recommendations";
import Production from "../components/Production";
import DetailsTable from "../components/DetailsTable";
import WatchList from "../components/WatchList";

const MovieDetails = () => {
    const [loading, setLoading] = useState(false);
    const [MovieDetails, setMovieDetails] = useState(null);
    const [ReviewDetails, setReviewDetails] = useState(null);
    const [VideoDetails, setVideoDetails] = useState(null); 
    const [stars, setStars] = useState(null); 
    const [average, setAverage] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [trailerSecondary, setTrailerSecondary] = useState(null);
    const [showWhole, setShowWhole] = useState(false);
    const [credits, setCredits] = useState(null);
    const [recommendations, setRecommendations] = useState(null);
    const [similar, setSimilar] = useState(null);

    const param = useParams().id;

    useEffect(()=>{
        const getData = async ()=>{
            setLoading(true);
            const getMovie = await axios.get(`https://api.themoviedb.org/3/movie/${param}?api_key=09cbcde820a19e4959494fa25a97a645&language=en-US`);
            setMovieDetails(getMovie.data);
            const getReview = await axios.get(`https://api.themoviedb.org/3/movie/${param}/reviews?api_key=09cbcde820a19e4959494fa25a97a645&language=en-US&page=1`);
            setReviewDetails(getReview.data);
            console.log(getReview.data);
            const getVideo = await axios.get(`https://api.themoviedb.org/3/movie/${param}/videos?api_key=09cbcde820a19e4959494fa25a97a645&language=en-US`);
            setVideoDetails(getVideo.data);
            const getCredits = await axios.get(`https://api.themoviedb.org/3/movie/${param}/credits?api_key=09cbcde820a19e4959494fa25a97a645&language=en-US`);
            setCredits(getCredits.data);
            const getRecommendations = await axios.get(`https://api.themoviedb.org/3/movie/${param}/recommendations?api_key=09cbcde820a19e4959494fa25a97a645&language=en-US`);
            setRecommendations(getRecommendations.data.results);
            const getSimilar = await axios.get(`https://api.themoviedb.org/3/movie/${param}/similar?api_key=09cbcde820a19e4959494fa25a97a645&language=en-US`);
            setSimilar(getSimilar.data.results);
            setAverage((getMovie.data.vote_average / 2));
            setTrailerSecondary((getVideo.data.results.length >= 1)?getVideo.data.results.filter((item, index)=>index === 0):null);
            setTrailer(getVideo.data.results.filter(item=>item.name === 'Official Trailer'));
            setLoading(false);
        }
        getData().catch(err=>console.log(err));  
    },[param]);

    // console.log("movie details")
    // console.log(MovieDetails)
    // console.log("credits")
    // console.log(credits)
    // console.log("recommendations")
    // console.log(recommendations)
    // console.log("similar")
    // console.log(similar)

    // console.log("reviewDetails")
    // console.log(ReviewDetails)

    useEffect(()=>{
        // Create an array of stars to display
        setStars(Array.from({ length: 5 }, (_, index) => {
            if (index < Math.floor(average)) {
                // Display a filled star
                return <FaStar key={index} className="text-yellow-500 text-xl m-[0.5px]" />;
            } else if (index === Math.floor(average) && average - Math.floor(average) >= 0.5) {
                // Display a half-filled star
                return <FaStarHalfAlt key={index} className="text-yellow-500 text-xl m-[0.5px]" />;
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
                <div className={(VideoDetails?.results.length > 0)?"relative pt-[56.25%]":'h-10'}>
                <div className={(VideoDetails?.results.length > 0)?"absolute top-0 left-0 right-0 bottom-0":'relative'}>
                        {(VideoDetails?.results.length > 0)?<iframe width='100%'
                        height='100%'
                        src={(trailer?.length > 0)?`https://www.youtube.com/embed/${trailer[0].key}`:`https://www.youtube.com/embed/${trailerSecondary[0].key}`} 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                        :<p className="text-center text-3xl mt-20">No Trailer Available</p>
                        }
                    </div>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col justify-center items-center m-10 md:flex-row mt-20">
                        <img
                            src={`https://image.tmdb.org/t/p/original${MovieDetails.poster_path}`}
                            alt={MovieDetails.title}
                            className="w-52 h-62 object-cover sm:w-72 sm:h-92 m-auto"
                        />
                        <div className="gap-y-3 flex flex-col justify-around m-10">
                            <h2 className="text-2xl">{MovieDetails.title}</h2>
                            <h3 className="flex">{stars}</h3>
                            <div className='flex'>
                                {MovieDetails.genres.map((item, index) => {
                                    return (
                                    <p 
                                        className="mr-2"
                                        key={item.name}>
                                        {item.name}
                                        {index !== MovieDetails.genres.length - 1 ? ', ' : ''}
                                    </p>
                                    );
                                })}
                            </div>
                            <div>
                                {MovieDetails.overview.length > 0 &&
                                    <p>{MovieDetails.overview}</p>
                                }
                            </div>
                            <WatchList param={param} type="movies"/>
                        </div>
                    </div>

                    {ReviewDetails?.results.length > 0 &&
                    <div className="mx-auto max-w-6xl relative">
                        <h3 className={(ReviewDetails?.results.length > 0)?"text-center text-3xl":'hidden'}>Reviews</h3>
                        <div className="mx-10 mt-10" >
                            {ReviewDetails.results.map((item,index)=>{
                                if(!showWhole && index > 1){
                                    return <></>
                                } else{
                                    return <Review key={item.content} item={item} />
                                }     
                                })
                            }
                        </div>
                        <div>
                            <p className={(ReviewDetails?.results.length > 2)?"text-end mr-10 cursor-pointer":'hidden'} onClick={()=>setShowWhole(!showWhole)}>
                                {(showWhole)?'Show Less...':'Show More Reviews...'}
                            </p>
                        </div>
                    </div>
                    }

                    {!ReviewDetails?.results.length > 0 &&
                    <p className="flex justify-center items-start text-4xl mt-20 mb-32">No Reviews</p>
                    }

                    { credits.cast?.filter(member => member.profile_path !== null).length > 0 &&
                        <CastCrew 
                            info={credits.cast.filter(member => member.profile_path !== null)} 
                            title="Cast" 
                            showMoreInfo={(credits.cast.filter(member => member.profile_path !== null).length > 4)}
                        />
                    }

                    { credits.crew?.filter(member => member.profile_path !== null).length > 0 &&
                        <CastCrew 
                            info={credits.crew.filter(member => member.profile_path !== null)} 
                            title="Crew" 
                            showMoreInfo={(credits.crew.filter(member => member.profile_path !== null).length > 4)}
                        />
                    }

                    { recommendations?.length > 0 &&
                       <Recommendations info={recommendations} title="Recommendations" /> 
                    }

                    { similar?.length > 0 &&
                       <Recommendations info={similar} title="More like this" /> 
                    }

                    {MovieDetails && 
                        <DetailsTable item={MovieDetails} title='Details' />
                    }
                    
                    {MovieDetails.production_companies?.length > 0 && 
                        <Production info={MovieDetails.production_companies} head='Production Companies'/>
                    }

                    {MovieDetails.production_countries?.length > 0  &&
                        <Production info={MovieDetails.production_countries} head='Production Countries'/>
                    }   

                </div>
            </section>
            }
        </>
     );
}
 
export default MovieDetails;
