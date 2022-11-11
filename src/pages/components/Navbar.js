import { Link } from 'react-router-dom'

const Navbar = () => {
    return(
        <nav className='navbar'>
            <h1>The Toursit App</h1>
            <div className="links">
                <Link to="/signup">Sign Up</Link>
            </div>
        </nav>
    )
}

export default Navbar;