import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from "../components/Spinner";
import { FaStar, FaRegStar } from 'react-icons/fa';
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
            setCurrMovie(getData.data.results[0]); 
            setAverage(Math.round(getData.data.results[0].vote_average / 2)); 
            setDisplayWhole(true);
        };
        getPopular().catch(err=>console.log(err));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => { 
            setAverage(Math.round(data.results[counter].vote_average / 2));
            setCurrMovie(data.results[counter]);
            setCounter(counter => counter + 1);
            if(counter >= data.results.length - 1){
                setCounter(0);
            }
        }, 6000);
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

    //import { useSpring, animated as s} from 'react-spring';
    // const springLeft = useSpring({
    //   from: {left: -400, opacity: 0},
    //   left: 0,
    //   opacity: 1, 
    //   config: {mass: 1, tension: 25, friction: 20}
    // });
    //style={{...springLeft}}

  return (
    <div className='relative'>
        {(displayWhole)?<div className='w-screen h-screen bg-gradient-to-r from-black z-20 cursor-pointer'
                onClick={() => navigate(`/movie-details/${currMovie.id}`)}>
                <div className='flex flex-col justify-around absolute top-40 left-20 z-20 h-1/2 mt-20'>
                  <h1 className='text-5xl text-white'>{currMovie.title}</h1>
                  <p className='text-white w-1/2'>{currMovie.overview}</p>
                  <h2 className='text-3xl text-white'>{currMovie.release_date}</h2>
                  <p className='flex'>{stars}</p>
                </div>
                <img src={`https://image.tmdb.org/t/p/original${currMovie.backdrop_path}`}
                alt={currMovie.title}
                className="w-screen h-screen mix-blend-overlay z-10" />
              </div>
            :<Spinner />
            }
            <BsFillArrowLeftCircleFill onClick={()=>{
              if(counter <= 0){
                setCounter(data.results.length);
              };
              console.log('down');
              setCounter(counter=>counter - 1);
              console.log(counter); 
              setCurrMovie(data.results[counter]);
            }}
              className='absolute left-5 top-1/2 h-10 w-10 z-30 text-red-700'/>
            <BsFillArrowRightCircleFill onClick={()=>{
              if(counter >= data.results.length - 1){
                setCounter(0);
              };
              console.log('up');
              setCounter(counter=>counter + 1);
              console.log(counter); 
              setCurrMovie(data.results[counter]);
            }}
              className='absolute right-5 top-1/2 h-10 w-10 z-30 text-red-700'/>
    </div>
  )
}
