import React from 'react'

export default function Production({info, head}) {
    console.log(info); 
  return (
    <div className='my-10 max-w-6xl mx-auto'>
        <h3 className='text-3xl mb-10 w-full capitalize ml-0 text-center sm:text-start sm:ml-10'>{head}</h3>
        <div className='grid grid-cols-1 items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-2 mx-10'>
        {info.length > 0 &&
            info.map((item)=>{
                return (item.logo_path !== null)? 
                <div className='mx-10' key={item.id}>
                    {(item.iso_3166_1) && 
                        <img src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${item.iso_3166_1}.svg`} 
                        alt={item.name} />
                    }
                    {(item.name) && !(item.iso_3166_1) &&
                        <img alt={item.name} src={`https://image.tmdb.org/t/p/original${item.logo_path}`} 
                        className='drop-shadow-[0_2px_2px_gray]' />
                    }                  
                </div>
                :<div>
                     <p className='text-xl uppercase'>{item.name}</p>   
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

