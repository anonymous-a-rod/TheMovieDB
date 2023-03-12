import React from 'react'

export default function Production({info, head}) {
    console.log(info); 
  return (
    <div className='my-10 max-w-6xl mx-auto'>
        <h3 className='text-3xl mb-10 w-full capitalize'>{head}</h3>
        <div className='mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 overflow-hidden mb-2 justify-center items-center'>
        {info.length > 0 &&
            info.map((item)=>{
                return <div className='mx-10' key={item.id}>
                    {(item.iso_3166_1) && 
                        <img src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${item.iso_3166_1}.svg`} 
                        alt={item.name}/>
                    }
                    {(item.name) && !(item.iso_3166_1) && 
                        <img alt={item.name} src={`https://image.tmdb.org/t/p/original${item.logo_path}`} 
                        className='w-60 h-70 ' />
                    }                    
                </div>
            })
        }
        </div>
    </div>
  )
}



// id
// : 
// 111422
// logo_path
// : 
// "/6H3JNNi6bFy7RAMYcTHbf0uSozR.png"
// name
// : 
// "Lovely Productions"
// origin_country
// : 
// "IE"

