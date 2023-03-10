import React, {useState} from 'react';
import { BsBoxArrowDown, BsBoxArrowUp } from 'react-icons/bs';

export default function Review({item}) {

    const [showMore, setShowMore] = useState(false);

  return (
    <div>
        <div key={item.id} className='flex items-center mb-5 p-2'>
            <div className="flex items-center flex-col mr-20 w-20">
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
            <div className="relative w-full text-lg">
                {(showMore)?<BsBoxArrowUp  onClick={()=>setShowMore(!showMore)} 
                className='w-5 h-5 absolute bottom-0 right-5' />
                :<BsBoxArrowDown onClick={()=>setShowMore(!showMore)} 
                className={(item.content.length > 200)?'absolute -bottom-5 right-5 w-5 h-5':'hidden'}/>}
                <p className={(showMore)?'h-full':'h-5 overflow-hidden'}>{item.content}</p>
                <p className='mt-2'>{(item.author_details.rating !== '')?item.author_details.rating:'0'}/10</p>
            </div>
        </div>
    </div>
  )
}
