import { Link } from "react-router-dom";

const Footer = () => {
    return ( 
        <footer className="w-full">
            <nav className="max-w-6xl mx-auto flex justify-center items-center my-10">
                <Link to="/about" className="px-2">About</Link>|
                <Link to="/faq" className="px-2">FAQ</Link>|
                <Link to="/team" className="px-2">Team</Link>    
            </nav>
        </footer>
     );
}
 
export default Footer;