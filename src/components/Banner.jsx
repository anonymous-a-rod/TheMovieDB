import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from "../components/Spinner";
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';

export default function Banner() {

  const navigate = useNavigate(); 

    const [data, setData] = useState(null); 
    const [counter, setCounter] = useState(0); 
    const [currMovie, setCurrMovie] = useState(null); 
    const [displayWhole, setDisplayWhole] = useState(false);
    const [stars, setStars] = useState(null); 
    const [average, setAverage] = useState(null); 

    useEffect(()=>{
        const getPopular = async ()=>{
            setDisplayWhole(false);
            const getData = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=09cbcde820a19e4959494fa25a97a645&page=1');
            setData(getData.data);
            console.log(getData.data);
            setCurrMovie(getData.data.results[0]); 
            setAverage((getData.data.results[0].vote_average / 2)); 
            setDisplayWhole(true);
        };
        getPopular().catch(err=>console.log(err));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => { 
            setAverage(Math.round(data.results[counter].vote_average / 2));
            setCurrMovie(data.results[counter]);
            setCounter(prev => prev + 1);
            if(counter >= data.results.length - 1){
                setCounter(0);
            }
        }, 6000);
        return () => clearInterval(interval);
      }, [data, counter]);

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
    },[average, counter]);

    //import { useSpring, animated as s} from 'react-spring';
    // const springLeft = useSpring({
    //   from: {left: -400, opacity: 0},
    //   left: 0,
    //   opacity: 1, 
    //   config: {mass: 1, tension: 25, friction: 20}
    // });
    //style={{...springLeft}}

  return (
    <div className='relative w-screen h-0 pb-[56.25%] mb-10'>
        {(displayWhole)?<div className='absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-gradient-to-r from-black z-20'
                >
                <img src={`https://image.tmdb.org/t/p/original${currMovie.backdrop_path}`}
                alt={currMovie.title}
                className="w-full h-full mix-blend-overlay z-10 object-fit object-cover" />
                
                <div className='flex flex-col gap-2 justify-around absolute top-5 left-20 z-20 h-1/2 mt-10 md:top-40 left-20'>
                  <h1 className='text-2xl md:text-5xl text-white'>{currMovie.title}</h1>
                  <p className='hidden sm:inline text-white w-3/4'>{currMovie.overview}</p>
                  <p className='text-red-600 cursor-pointer' onClick={() => navigate(`/movie-details/${currMovie.id}`)}>See more</p>
                  <h2 className='text-lg md:text-3xl text-white'>{currMovie.release_date}</h2>
                  <p className='flex'>{stars}</p>
                </div>
              </div>
            :<Spinner />
            }
            <BsFillArrowLeftCircleFill onClick={()=>{
              if (counter <= 0) {
                setCounter(data.results.length - 1);
                setCurrMovie(data.results[data.results.length - 1]);
                setAverage(Math.round(data.results[data.results.length - 1].vote_average / 2));
              } else {
                setCounter(prev => prev - 1);
                setCurrMovie(data.results[counter - 1]);
                setAverage(Math.round(data.results[counter - 1].vote_average / 2));
              }
            }}
              className='absolute left-5 top-1/2 h-10 w-10 z-30 text-red-700 cursor-pointer'/>
            <BsFillArrowRightCircleFill onClick={()=>{
              if (counter >= data.results.length - 1) {
                setCounter(0);
                setCurrMovie(data.results[0]);
                setAverage(Math.round(data.results[0].vote_average / 2));
              } else {
                setCounter(prev => prev + 1);
                setCurrMovie(data.results[counter + 1]);
                setAverage(Math.round(data.results[counter + 1].vote_average / 2));
              }
            }}
              className='absolute right-5 top-1/2 h-10 w-10 z-30 text-red-700 cursor-pointer'/>
    </div>
  )
}
