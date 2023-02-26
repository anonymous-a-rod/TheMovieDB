import { Link } from "react-router-dom";

const Header = () => {
    return ( 
        <nav className="container">
            <div className="item">
                <Link to="/">logo here</Link>    
            </div>
            <div className="item">
                <Link to="/">Home</Link>
                <Link to="/team">Team</Link>
                <Link to="about">About</Link>    
            </div> 
        </nav>
     );
}
 
export default Header;