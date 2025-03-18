import React, { useState } from "react";
import classes from './Reset.module.css'
import { Link } from "react-router-dom"
import ogirslogo from '../../Asset/ogirslogo.png'


const Reset = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Password reset link sent to:", email);
    }
    return (
        <div className={classes.cont3}>
            <div className={classes.leftreset}>
                <Link className={classes.logoimg} to='/'>
                    <img src={ogirslogo} className={classes.ogirslogoreset} />
                </Link>
                <p className={classes.logoimgtxt}>Ogun state Budget System</p>
                <p className={classes.underlogotxt}>Effortless Budget Management:Request, Track, and <br /> Approve with Ease.</p>

            </div>

            <div className={classes.rightreset}>
                <h1> Reset Password</h1>
                <h2> Enter New Password</h2>

                <form onSubmit={handleSubmit}>
                    <p>Password</p>
                    <input
                        type="email"
                        placeholder="Enter Password"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <p>Confirm Password</p>
                    <input
                        type="email"
                        placeholder="Enter Password"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
              
                <Link className={classes.passbtn} to='/Success'>
                <button className={classes.passwordbtnreset}>Proceed</button>
                </Link>
                </form>
            </div>
        </div>

    );
}

export default Reset;