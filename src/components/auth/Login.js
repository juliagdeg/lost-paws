import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import lostPawsLogo from  "../nav/lostPawsLogo.png"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("srcrankitup@yahoo.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/owners?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("paws_user", JSON.stringify({
                        id: user.id,
                        staff: user.isStaff
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section className="login_section">
                <form className="form--login" onSubmit={handleLogin}>
                    <img className="login_logo" src={ lostPawsLogo } alt="example" />
                    <h2 className="sign_in_label">Please sign in</h2>
                    <fieldset>
                        <label className="email_instructions" htmlFor="inputEmail"> Enter your email address here! </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button className="top-bottom_button" type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Lost some Paws? Sign up here!</Link>
            </section>
        </main>
    )
}

