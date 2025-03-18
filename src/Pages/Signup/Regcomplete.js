import React, { useState, useEffect } from "react";
import classes from './Regcomplete.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../Assets/olarmsLogo.svg";
import left from "../../Assets/arrow-left1.png";
// import greenrect from "../../Assets/GRectangle.png";
// import greenrectan from "../../Assets/GreenRect.png";
import mark from "../../Assets/Success.png";



function Complete() { 
    
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/dashboard");
      };

    return (
        <div>
            {/* <div className={classes.navbar}>
            <img src={logo} alt="Olarms Logo" className={classes.logoimage} />
                <div className={classes.navR}>
                <img src={left} alt="Left Icon" className={classes.lefticon} />
                   <p className={classes.navtext}>Go back</p>
                </div>
            </div> */}
              <div className={classes.mainlayout}>
              <div className={classes.formlayout}>
                  <img src={mark} alt="Complete Icon" className={classes.mark} />
                  <div>
                      <h1 className={classes.maintext}> Your Registration is Complete</h1>
                      <p className={classes.bodytext} >Thank you for completing your registration! You're now <br /> ready to manage your land administration <br /> and property needs effortlessly with OLARMS.</p>
                  </div>
                  <div>
                    <button className={classes.mainbtn} onClick={handleLogin}>
                        Go to Dashboard
                    </button>
                  </div>
              </div>
              </div>
            
        </div>

    )
}

export default Complete;