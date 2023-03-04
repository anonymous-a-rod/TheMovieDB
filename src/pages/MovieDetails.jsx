import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
// import { FaStar, FaRegStar } from 'react-icons/fa';
import axios from "axios";

const MovieDetails = () => {
    const [loading, setLoading] = useState(false);
    const [MovieDetails, setMovieDetails] = useState(null);
    const [ReviewDetails, setReviewDetails] = useState(null);
    const [VideoDetails, setVideoDetails] = useState(null); 

    const param = useParams().id;

    console.log(param)

    useEffect(()=>{
        const getData = async ()=>{
            setLoading(true);
            const getMovie = await axios.get(`https://api.themoviedb.org/3/movie/${param}?api_key=09cbcde820a19e4959494fa25a97a645&language=en-US`);
            const getReview = await axios.get(`https://api.themoviedb.org/3/movie/${param}/reviews?api_key=09cbcde820a19e4959494fa25a97a645&language=en-US&page=1`);
            const getVideo = await axios.get(`https://api.themoviedb.org/3/movie/${param}/videos?api_key=09cbcde820a19e4959494fa25a97a645&language=en-US`);
            setMovieDetails(getMovie.data);
            setReviewDetails(getReview.data);
            setVideoDetails(getVideo.data);
            console.log(getReview.data);
            setLoading(false);
        }
        // try{
        //     fetch(`https://api.themoviedb.org/3/movie/${param}?api_key=09cbcde820a19e4959494fa25a97a645&language=en-US`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setMovieDetails(data)
        //         setGenre(data.genres)
        //         setRating(data.vote_average / 2)
        //https://www.youtube.com/watch?v=nLAQtGBMslU
        //     })

        // } catch(error){
        //     console.log(error)
        // }
        getData().catch(err=>console.log(err));  
        
    },[param])

    // useEffect(()=>{
    //     console.log(MovieDetails)
    //     console.log(genre)
    //     const filledStars = Math.round(rating);
    //     // Create an array of stars to display
    //     setStars(Array.from({ length: 5 }, (_, index) => {
    //         if (index < filledStars) {
    //         // Display a filled star
    //         return <FaStar key={index} className="text-yellow-500 text-xl m-[0.5px]" />;
    //         } else {
    //         // Display an unfilled star
    //         return <FaRegStar key={index} className="text-yellow-500 text-xl m-[0.5px]" />;
    //         }
    //     }));
    // },[MovieDetails, rating, genre])
    

    return ( 
        <>
            { loading && <Spinner /> }
            { !loading && MovieDetails && 
            <section className="max-w-6xl mx-auto flex flex-col items-center">
                <div>
                    {/* for video */}
                </div>
                <div>
                    <div>
                    {(VideoDetails.results.length > 0)?<iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    title={VideoDetails.results[0].name} 
                    src={`https://www.youtube.com/embed/${VideoDetails.results[0].key}`} ></iframe>
                    :null
                    }
                        <h2>{MovieDetails.title}</h2>
                        {/* <h3 className="flex">{stars}</h3> */}
                        <img
                            src={`https://image.tmdb.org/t/p/original${MovieDetails.poster_path}`}
                            alt={MovieDetails.title}
                            className="w-full h-full object-cover"
                        />
                        <div>
                            {
                                MovieDetails.genres.map((item)=>{
                                    return <p>{item.name}</p>
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <p>{MovieDetails.overview}</p>
                    </div>
                    <div>
                        <h3>Reviews</h3>
                        <div>
                            {(ReviewDetails.results.length > 0)?ReviewDetails.results.map(item=>{
                                    return(<div>
                                    {(item.author_details.avatar_path !== null)
                                        ?<img src={`https://image.tmdb.org/t/p/w500${item.author_details.avatar_path}`} alt="avatar"/>
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
