import React, { useState, useEffect } from "react";
import classes from './Verification.module.css'
import { Link } from "react-router-dom"
import ogirslogo from '../../Asset/ogirslogo.png'


const Verification = () => {
    const [code, setCode] = useState(Array(5).fill(""));
    const [timer, setTimer] = useState(null);
    const [isTimerActive, setIsTimerActive] = useState(false);

    const handleCodeChange=(index, value) => {
        if (value.lenght > 1) return;
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
    };

    useEffect(() => {
        if (isTimerActive && timer > 0) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isTimerActive, timer]);

    const startTimer = () =>{
        setTimer(30);
        setIsTimerActive(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Entered verification code:", code.join(""));
    }
    return (
        <div className={classes.cont2}>
            <div className={classes.left}>
                <Link className={classes.logoimg} to='/'>
                    <img src={ogirslogo} className={classes.ogirslogo} />
                </Link>
                <p className={classes.logoimgtxt}>Ogun state Budget System</p>
                <p className={classes.underlogotxt}>Effortless Budget Management:Request, Track, and <br /> Approve with Ease.</p>

            </div>

            <div className={classes.right}>
                <h1> Forgot Password</h1>
                <h2> Enter verification code sent to<a className={classes.mail}href="#">adekoyatoluwani5@gmail.com</a></h2>

                <form onSubmit={handleSubmit}>
                    <div className={classes.codeinputcontainer}  style={{boxSizing: 'none !important'}}>
                        {code.map((digit, index) => (
                             <input
                             key={index}
                             type="text"
                             maxLength="1"
                             placeholder=""
                             value={digit}
                             onChange={(e) => handleCodeChange(index, e.target.value)}
                             required
                             className={classes.codeinput}
                            
                         />

                        ))}
                        </div>
                   
                   
                    
                    <p className={classes.code}>Don't get the code? <a href='#'>Resend</a></p>
              <a className={classes.sec} href="#">34secs</a>
                </form>

                <Link className={classes.passbtn} to='/Reset'>
                <button className={classes.passwordbtn}>Verify Account</button>
                </Link>
                
            </div>
        </div>

    );
}

export default Verification;