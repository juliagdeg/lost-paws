import { Link, useNavigate } from "react-router-dom"
import lostPawsLogo from  "./lostPawsLogo.png"
import "./NavBar.scss"

// NavBar links for Lost Paws:
// Homepage (takes you to the landing feed)
//

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <img className="menu_logo" src={ lostPawsLogo } alt="example" />
            <div className="nav_link_container">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Homepage</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/profile">Profile</Link>
            </li>
            {
                localStorage.getItem("paws_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("paws_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
            </div>
        </ul>
    )
}

