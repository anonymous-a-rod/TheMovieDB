import React from 'react'

export default function DetailsTable({item, title}) {
  console.log(item)
  return (
    <div className='my-10 max-w-6xl mx-auto'>
        <h3 className="text-center text-3xl text-white">{title}</h3>
        <div className="flex flex-col justify-center items-start gap-5 mt-5 bg-black p-5 rounded-md">
            <table className="table-fixed w-full text-xl">
              <tbody className="divide-y divide-gray-600">
                <tr>
                  <td className="w-1/2 py-2">Release date:</td>
                  <td className="w-1/2 py-2 text-right">{item.release_date}</td>
                </tr>
                <tr>
                  <td className="w-1/2 py-2">Original language:</td>
                  <td className="w-1/2 py-2 text-right">{item.original_language}</td>
                </tr>
                <tr>
                  <td className="w-1/2 py-2">Runtime:</td>
                  <td className="w-1/2 py-2 text-right">{item.runtime} minutes</td>
                </tr>
                <tr>
                  <td className="w-1/2 py-2">Status:</td>
                  <td className="w-1/2 py-2 text-right">{item.status}</td>
                </tr>
                <tr>
                  <td className="w-1/2 py-2">Rating:</td>
                  <td className="w-1/2 py-2 text-right">{item.vote_average.toFixed(1)}/10</td>
                </tr>
                {(item.budget || item.budget === 0 || item.budget === "0") &&
                <tr>
                  <td className="w-1/2 py-2">Budget:</td>
                  <td className="w-1/2 py-2 text-right">{item.budget !== "0"? "$" + (item.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : "N/A"}</td>
                </tr>  
                }
                {(item.revenue || item.revenue === 0 || item.revenue === "0") &&
                <tr>
                  <td className="w-1/2 py-2">Revenue:</td>
                  <td className="w-1/2 py-2 text-right">{item.revenue !== "0"? "$" + (item.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : "N/A"}</td>
                </tr>
                }
              </tbody>
            </table>
        </div>  
    </div>
  )
}
