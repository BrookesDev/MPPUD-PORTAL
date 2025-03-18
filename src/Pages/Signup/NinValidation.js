import React, { useState, useEffect } from "react";
import classes from './NinValidation.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../Assets/olarmsLogo.svg";
import left from "../../Assets/arrow-left1.png";
import greenrect from "../../Assets/GRectangle.png";
import greenrectan from "../../Assets/GreenRect.png";
import whiterect from "../../Assets/WhiteRect.png";



function NinValidate() { 
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
    selectedMaritalStatus
  } = location.state;
    const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    // Ensure only numeric values and a maximum of 11 characters
    if (/^\d{0,11}$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.reload();
    // alert("Form submitted with value: " + inputValue);
  };

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
            <div className={classes.form}>
                <h4 style={{paddingBottom: '20px', paddingTop: '5px' }} className={classes.formT}>Government Identification</h4>
                <form onSubmit={handleSubmit}>
                <label htmlFor="NIN" style={{display: 'block', paddingBottom: 10 }} className={classes.textNin}>NIN</label>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter NIN"
          maxLength={11}
          style={{
            padding: "10px",
            height: '56px',
            width: "500px",
          }}
          className={classes.inputField}
        />
        <br />
        <button
          type="submit"
        //   disabled={inputValue.length !== 11}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            textAlign: "center",
            marginTop: "10px",
            cursor: inputValue.length === 11 ? "pointer" : "not-allowed",
            backgroundColor: inputValue.length === 11 ? "#21B55A" : " #21B55A66",
            color: inputValue.length === 11 ? "white" : "white",
            height: '40px',
            width: '-webkit-fill-available',
            borderRadius: "8px",
          }}
          className={classes.btntxt}
          onClick={handleNext}
        >
          Submit
        </button>
      </form>

            </div>

            </div>
        </div>

    )
}

export default NinValidate;