import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const Question = ({title, info}) => {
  const [showInfo, setShowInfo] = useState(false);


  return (
    <article className='p-1 mt-4 mb-4 shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg flex flex-col justify-center'>
      <header className='flex pt-2 pb-2 w-full flex-row justify-between  p-1 pl-2'>
        <h4 className="text-xl text-gray-800 font-semibold">{title}</h4>
        <button className='' onClick={()=> setShowInfo(!showInfo)}>
          <div className='rounded-full p-2 text-gray-800 font-semibold'>
            {showInfo? <AiOutlineMinus /> : <AiOutlinePlus /> }
          </div>
        </button>
      </header>
      { showInfo && <p className='pr-16 mb-4 pl-2 text-gray-600'>{info}</p>}
    </article>
  );
};

export default Question;