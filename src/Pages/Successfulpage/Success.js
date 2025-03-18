import React from "react";
import classes from './Success.module.css'
import { Link } from "react-router-dom"
import ogirslogo from '../../Asset/ogirslogo.png'
import Done from '../../Asset/Done.png'

function Successfulpage() {


    return (
        <div className={classes.cont4}>
            <div className={classes.leftsuccess}>
                <Link className={classes.logoimg} to='/'>
                    <img src={ogirslogo} className={classes.ogirslogosuccess} />
                </Link>
                <p className={classes.logoimgtxt}>Ogun state Budget System</p>
                <p className={classes.underlogotxt}>Effortless Budget Management:Request, Track, and <br /> Approve with Ease.</p>


            </div>
            <div className={classes.rightsuccess}>
                <Link className={classes.Successimg}>
                    <img src={Done} className={classes.Done}/>
                </Link>
                <h1> Password Reset Successful</h1>
                <h2> Your passsword have been reset successfully,<br /> you can now log into your account with your email and new password.</h2>

                <center><Link className={classes.link_tg}to='/dashboard'> 
                    <button className={classes.passwordbtnsuccess}>Login to my account</button>
                </Link></center>

            </div>
        </div>

    );
};

export default Successfulpage;