import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from "../components/Spinner";
import { FaStar, FaRegStar } from 'react-icons/fa';

export default function Banner() {

    const [data, setData] = useState(null); 
    const [counter, setCounter] = useState(1); 
    const [currMovie, setCurrMovie] = useState(null); 
    const [display, setDisplay] = useState(false); 
    const [displayWhole, setDisplayWhole] = useState(false);
    const [firstMovie, setFirstMovie] = useState(null);
    const [stars, setStars] = useState(null); 
    const [average, setAverage] = useState(null);

    useEffect(()=>{
        const getPopular = async ()=>{
            setDisplayWhole(false);
            const getData = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=09cbcde820a19e4959494fa25a97a645&page=1');
            setData(getData.data);
            setCurrMovie(getData.data.results[1]); 
            setFirstMovie(getData.data.results[0]); 
            console.log(getData.data.results[0]); 
            setDisplayWhole(true);
        };
        getPopular().catch(err=>console.log(err));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => { 
            setDisplay(true);
            setCurrMovie(data.results[counter]);
            setAverage(Math.round(currMovie.vote_average / 2));
            setCounter(counter => counter + 1);
            if(counter >= data.results.length){
                setCounter(1);
                setDisplay(false);
            }
        }, 5000);
        return () => clearInterval(interval);
      }, [counter, data, currMovie]);

      useEffect(()=>{
        // Create an array of stars to display
        setStars(Array.from({ length: 5 }, (_, index) => {
            if (index < average) {
            // Display a filled star
            return <FaStar key={index} className="text-yellow-500 text-xl m-[0.5px]" />;
            } else {
            // Display an unfilled star
            return <FaRegStar key={index} className="text-yellow-500 text-xl m-[0.5px]" />;
            }
        }));
    },[average, counter]); 

  return (
    <div>
        {(displayWhole)?<div className='w-screen h-screen relative bg-gradient-to-r from-black z-20 transition-all delay-150'>
                <h1 className='absolute bottom-96 left-20 z-20 text-5xl text-white'>{(display) ? currMovie.title : firstMovie.title}</h1>
                <p className='absolute bottom-72 left-20 z-20 text-white w-1/2'>{(display) ? currMovie.overview : firstMovie.overview}</p>
                <h2 className='absolute bottom-56 left-20 z-20 text-3xl text-white'>{(display) ? currMovie.release_date : firstMovie.release_date}</h2>
                <p className='flex absolute bottom-40 left-20 z-20'>{stars}</p>
                <img src={`https://image.tmdb.org/t/p/original${(display) ? currMovie.backdrop_path : firstMovie.backdrop_path}`}
                alt={(display) ? currMovie.title : firstMovie.title}
                className="w-screen h-screen mix-blend-overlay z-10" />
              </div>
            :<Spinner />
            }
    </div>
  )
}
