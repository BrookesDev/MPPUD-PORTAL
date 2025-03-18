import React, { useState, useEffect } from "react";
import classes from './NinCheck.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../Assets/olarmsLogo.svg";
import left from "../../Assets/arrow-left1.png";
import greenrect from "../../Assets/GRectangle.png";
import greenrectan from "../../Assets/GreenRect.png";
import whiterect from "../../Assets/WhiteRect.png";
import idcard from "../../Assets/id-card.png";
import bar from "../../Assets/Frame 16.png";



function NinCheck() { 
    
  //   const [inputValue, setInputValue] = useState("");

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   // Ensure only numeric values and a maximum of 11 characters
  //   if (/^\d{0,11}$/.test(value)) {
  //     setInputValue(value);
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   window.location.reload();
  //   // alert("Form submitted with value: " + inputValue);
  // };


  const location = useLocation();
    const {
      selectedOption,
      firstName,
      lastName,
      email,
      phone,
      selectedState,
      stateInput,
      dob,
      address,
      selectedCountry,
      selectedGender,
      selectedMaritalStatus,
      inputValue,
    } = location.state;
  const navigate = useNavigate();
  const handleNext = () => {
    navigate('/signup/nin_name', {state: {
      selectedOption,
        firstName,
        lastName,
        email,
        phone,
        selectedState,
        stateInput,
        dob,
        address,
        selectedCountry,
        selectedGender,
        selectedMaritalStatus,
        inputValue
    }});
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

            <div className={classes.formlayout}>
            <div className={classes.progressbar}>
            <img src={greenrect} alt="Green Progress Bar Icon" className={classes.greenicon} />
            <img src={greenrectan} alt="Green Progress Bar Icon" className={classes.greenicon} />
            <img src={whiterect} alt="White Progress Bar Icon" className={classes.whiteicon} />
            </div>
            <div className={classes.mainform}>
            <div  className={classes.center1} onClick={handleNext}>
            <img src={idcard} alt="IdCard Icon" className={classes.idcardicon} onClick={handleNext} />
               <h6 className={classes.Maintext}>Checking your NIN</h6>
              <p className={classes.textH}>Please keep this page open till it is verified</p>
            </div>
            <div className={classes.form}>
                <h6 className={classes.textNu}> 64% </h6>
                <img src={bar} alt="Progress Bar Icon" className={classes.longicon} />
            </div>
            </div>

            </div>
        </div>

    )
}

export default NinCheck;