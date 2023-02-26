import data from "../data/bios"
import { FaGithub, FaLink, FaLinkedin } from "react-icons/fa"

const Team = () => {



    return ( 
        <section className="team-section">
            <h2>Our Team</h2>
            <div className="cards-container">
            {data.map((item) => (
                <article className="bio-card">
                    <img src={item.pictureURL} alt={item.name} className="bio"/>
                    <h3>{item.name}</h3>
                    <a href={item.websiteHref} target="_blank" rel="noreferrer" className="bio">{item.website}</a>
                    <p className="bio">{item.bio}</p>
                    <div>
                        <a href={item.linkedIn} className="bio-icon" target="_blank" rel="noreferrer"><FaLinkedin /></a>
                        <a href={item.github} className="bio-icon" target="_blank" rel="noreferrer"><FaGithub /></a>
                        <a href={item.websiteHref} className="bio-icon" target="_blank" rel="noreferrer"><FaLink /></a>         
                    </div>
                </article>
            ))}
            </div>

        </section>
     );
}
 
export default Team;