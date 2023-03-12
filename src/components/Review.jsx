import React, {useEffect, useRef, useState} from 'react';
import { BsBoxArrowDown, BsBoxArrowUp } from 'react-icons/bs';

export default function Review({item}) {
    const [text, setText] = useState('');
    const textRef = useRef(null);
    const [showMore, setShowMore] = useState(false);
    const [isShortReview, setIsShortReview] = useState(false)

    useEffect(() => {
        if (item.content) {
          setTimeout(() => {
            setText(textRef.current.innerText);
          }, 0);
        }
      }, [item.content]);

      useEffect(() => {
        setIsShortReview(text.length < 100);
      }, [text]);
    
      console.log("isShortReview")
      console.log(isShortReview)

  return (
    <div>
        <div className='flex flex-col items-center mb-4 p-4 bg-gray-800 rounded-lg border-2 border-slate-600 md:flex-row'>
            <div className="flex items-center flex-col mx-10 w-20">
                {(item.author_details.avatar_path !== null)
                    ?<img src={(item.author_details.avatar_path.includes('/https:'))?`${item.author_details.avatar_path.substring(1)}`:`https://image.tmdb.org/t/p/w500${item.author_details.avatar_path}`} 
                    alt="avatar"
                    className="w-20 h-20 rounded-full"/>
                    :<img src="https://images.unsplash.com/photo-1546776310-eef45dd6d63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2010&q=80" 
                    alt="default"
                    className="w-20 h-20 rounded-full"/>
                }
                <h4 className="w-20 text-center mt-2">{item.author}</h4>
            </div>
            <div className="relative w-full text-lg overflow-hidden">
                {!isShortReview && 
                <>
                    {(showMore)?
                        <BsBoxArrowUp  
                            onClick={()=>setShowMore(!showMore)} 
                            className='w-5 h-5 absolute bottom-0 right-5 cursor-pointer' 
                        />
                    :
                        <BsBoxArrowDown 
                            onClick={()=>setShowMore(!showMore)} 
                            className='w-5 h-5 absolute bottom-0 right-5 cursor-pointer'
                        />
                    }
                </>}
                <div    
                    className={`${(showMore)?'':'truncate '} mb-4`}
                    id={item.id}
                    ref={textRef}
                >
                    {item.content}
                </div>
                <p className='mt-2'>{(item.author_details.rating !== '')?item.author_details.rating:'0'}/10</p>
            </div>
        </div>
    </div>
  )
}
