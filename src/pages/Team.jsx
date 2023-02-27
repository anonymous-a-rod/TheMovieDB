import data from "../data/bios"
import { FaGithub, FaLink, FaLinkedin } from "react-icons/fa"

const Team = () => {



    return ( 
        <section className="max-w-6xl mx-auto">
            <h2 className="text-4xl w-full text-center pb-10">Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.map((item) => (
                <article className="bg-white rounded-lg shadow-md text-center cursor-pointer">
                    <img src={item.pictureURL} alt={item.name} className="w-full h-64 object-cover rounded-t-lg" />
                    <div className="p-6">
                    <h3 className="text-xl font-medium mb-2">{item.name}</h3>
                    <a href={item.websiteHref} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">{item.website}</a>
                    <p className="text-gray-600 mt-2">{item.bio}</p>
                    <div className="mt-4 flex flex-row mx-auto justify-center">
                        <a href={item.linkedIn} className="text-gray-600 hover:text-blue-500 mr-4" target="_blank" rel="noreferrer"><FaLinkedin /></a>
                        <a href={item.github} className="text-gray-600 hover:text-blue-500 mr-4" target="_blank" rel="noreferrer"><FaGithub /></a>
                        <a href={item.websiteHref} className="text-gray-600 hover:text-blue-500" target="_blank" rel="noreferrer"><FaLink /></a>         
                    </div>
                    </div>
                </article>
                ))}
            </div>
        </section>

     );
}
 
export default Team;