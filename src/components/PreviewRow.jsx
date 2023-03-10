import SelectionCard from "./SelectionCard";
import Spinner from "./Spinner";
import React, { useState, useEffect } from 'react';
import { BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill } from 'react-icons/bs';

const PreviewRow = ({category, searchQuery, additionalQuery}) => {
  const [loading, setLoading] = useState(true);
  const [selections, setSelections] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      fetch(`https://api.themoviedb.org/3/${searchQuery}?api_key=09cbcde820a19e4959494fa25a97a645${additionalQuery}`)
        .then((response) => response.json())
        .then((data) => setSelections(data.results))
    } catch(error) {
      console.log(error)
    }
    setLoading(false);
  }, [searchQuery, additionalQuery]);

  const handleScrollRight = () => {
    const container = document.getElementById(category);
    const containerWidth = container.offsetWidth;
    container.scrollBy({ left: containerWidth, behavior: 'smooth' });
    setScrollPosition(container.scrollLeft + containerWidth);
  };

  const handleScrollLeft = () => {
    const container = document.getElementById(category);
    const containerWidth = container.offsetWidth;
    container.scrollBy({ left: -containerWidth, behavior: 'smooth' });
    setScrollPosition(container.scrollLeft - containerWidth); 
    console.log(scrollPosition);
  };

  const handleScroll = () => {
    const container = document.getElementById(category);
    const maxScrollPosition = container.scrollWidth - container.offsetWidth;
    setShowLeft(container.scrollLeft > 0);
    setShowRight(container.scrollLeft < maxScrollPosition);
  };

  return ( 
    <>
      { loading && <Spinner /> }
      { !loading && 
        <div className="w-screen flex flex-col items-center relative">
          <h2 className="text-4xl font-bold capitalize mb-4 w-full text-left ml-20">{category}</h2>
          <div className='w-full flex overflow-scroll overflow-y-hidden my-5 z-10 p-2 scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100' id={category} onScroll={handleScroll}>
            <BsFillArrowRightSquareFill className={showRight ? "absolute right-5 top-1/2 -translate-y-1/2 z-20 h-20 w-20 text-red-700 text-opacity-80" : "hidden"} onClick={handleScrollRight} />
            <BsFillArrowLeftSquareFill className={showLeft ? "absolute left-5 top-1/2 -translate-y-1/2 z-20 h-20 w-20 text-red-700 text-opacity-80" : "hidden"} onClick={handleScrollLeft} />
            { selections?.length > 0 && selections.map((selection) =>
              (
                <div key={selection.id}>
                  <div>
                    <SelectionCard selection={selection} />
                  </div>
                </div>     
              )
            )}
          </div>
        </div>
      }      
    </>
  );
}
 
export default PreviewRow;