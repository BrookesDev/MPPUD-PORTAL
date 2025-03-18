import React, { useState } from "react";
import classes from './Forgotpassword.module.css'
import { Link } from "react-router-dom"
import ogirslogo from '../../Asset/ogirslogo.png'


const Forgotpassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Password reset link sent to:", email);
    }
    return (
        <div className={classes.cont1}>
            <div className={classes.leftforgotpassword}>
                <Link className={classes.logoimg} to='/'>
                    <img src={ogirslogo} className={classes.ogirslogoforgotpassword} />
                </Link>
                <p className={classes.logoimgtxt}>Ogun state Budget System</p>
                <p className={classes.underlogotxt}>Effortless Budget Management:Request, Track, and <br /> Approve with Ease.</p>
            </div>


            <div className={classes.rightforgotpassword}>
                <h1> Forgot Password</h1>
                <h2> Enter your registered email address</h2>

                <form onSubmit={handleSubmit}>
                    <p>Email Address</p>
                    <input
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Link className={classes.passbtn} to='/verification'>
                        <button className={classes.passwordbtnforgotpassword}>Proceed</button>
                    </Link>
                </form>
            </div>
        </div>

    );
}

export default Forgotpassword;