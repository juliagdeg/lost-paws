import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

// NavBar links for Lost Paws:
// Homepage (takes you to the landing feed)
//

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/pets">Homepage</Link>
            </li>
            <li className="navbar__item navbar__logout">
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
        </ul>
    )
}

