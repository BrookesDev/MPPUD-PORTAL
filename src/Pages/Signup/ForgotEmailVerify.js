import React, { useState, useEffect, useRef } from "react";
import classes from "./ForgotVerify.module.css";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../api/api";
// import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import errorIcon from '../../Assets/error.svg';
import logo from "../../Assets/olarmsLogo.svg";
import slide from "../../Assets/slide.svg";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import { BASE_URL } from "../../API/Api";


function ForgotEmailVerify() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const {email, firstName, phone, lastName, password, confirmPassword} = location.state;
 const [errorMessage, setErrorMessage] = useState("");
     const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [seconds, setSeconds] = useState(34);
  const [isCounting, setIsCounting] = useState(false); 
  const [message, setMessage] = useState("");
  const [otp, setOtp] = React.useState(Array(5).fill("")); // Replace 6 with the number of OTP inputs

  const inputRefs = useRef([]); // To hold references to the input fields

  // Function to handle input change and move focus to the next field
  const handleChange = (e, index) => {
    const { value } = e.target;
  
    // Ensure only one character is added
    if (value.length > 1) return;
  
    const newOtp = [...otp];
    newOtp[index] = value; // Update the specific index with the new value
    setOtp(newOtp);
  setShowErrorMessage(false);
  setIsCounting(false);
    // Automatically move to the next input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  
 // Function to handle indicator click
  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
    
  };


  useEffect(() => {
    let timer;
    if (isCounting && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsCounting(false);
      setMessage("Kindly check your email again.");
    }

    return () => clearInterval(timer);
  }, [seconds, isCounting]);

  // const handleResend = () => {
  //   setSeconds(34); 
  //   setIsCounting(true); 
  //   setMessage("");
  // };

  const getOtpString = () => otp.join("");

  const handleSignup = async () => {
    setLoading(true);
    setShowErrorMessage(false);
    try {
      
      const otpString = getOtpString();
      const response = await axios.post(`${BASE_URL}/verifyOtp`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        password: password,
        confirm_password: confirmPassword,
        otp: otpString
      });
  
      navigate('/success');

    } catch (error) {
      let errorMessage = 'An error occurred. Please try again.';
      if (error.response && error.response.data && error.response.data.message) {
        if (typeof error.response.data.message === 'string') {
          errorMessage = error.response.data.message;
        } else if (Array.isArray(error.response.data.message)) {
          errorMessage = error.response.data.message.join('; ');
        } else if (typeof error.response.data.message === 'object') {
          errorMessage = JSON.stringify(error.response.data.message);
        }
        setErrorMessage(JSON.stringify(error.response.data.message));
        setShowErrorMessage(true);
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Failed',
        //   text: JSON.stringify(error.response.data.message),
        // });
      }
      
    } finally {
      setLoading(false);
    }
  };
  
  const handleResendOtp = async () => {
    setOtpLoading(true);
    setShowErrorMessage(false);
    setOtp(Array(5).fill(""));
    try {
      
      const otpString = getOtpString();
      const response = await axios.post(`${BASE_URL}/resend_otp`, {
        email: email,
      });
      setSeconds(34); 
    setIsCounting(true); 
    setMessage("");
 
  
    } catch (error) {
      let errorMessage = 'An error occurred. Please try again.';
      if (error.response && error.response.data && error.response.data.message) {
        if (typeof error.response.data.message === 'string') {
          errorMessage = error.response.data.message;
        } else if (Array.isArray(error.response.data.message)) {
          errorMessage = error.response.data.message.join('; ');
        } else if (typeof error.response.data.message === 'object') {
          errorMessage = JSON.stringify(error.response.data.message);
        }
        setErrorMessage(JSON.stringify(error.response.data.message));
        setShowErrorMessage(true);
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Failed',
        //   text: JSON.stringify(error.response.data.message),
        // });
      }
      
    } finally {
      setOtpLoading(false);
    }
  };

  const isButtonDisabled = !otp || loading;
  return (
    <div >
        <div className={classes.maincontainer}>
        <div className={classes.lftcontainer}>
          <div className={classes.logohead}>
            <img src={logo} alt="Olarms Logo" className={classes.logoimage} />
          </div>

          <Carousel
        activeIndex={activeIndex}
        onSelect={handleSelect}
        controls={false}
        indicators={false} // Disable default indicators
        className={classes.customCarousel}
      >
            <Carousel.Item className={classes.textdown}>
            <h6 className={classes.textdownH}>
                  {" "}
                  Seamless Land <br />
                  Administration Starts Here
                </h6>
                <p className={classes.textdownP}>
                  Welcome to the Ogun State Land Administration <br />
                  and Revenue Management System (OLARMS).
                </p>{" "}
            </Carousel.Item>
            <Carousel.Item className={classes.textdown}>
            <h6 className={classes.textdownH}>
                  {" "}
                  Your Gateway to Owning Land <br />
                  Starts Here!
                </h6>
                <p className={classes.textdownP}>
                Discover the simplicity of land ownership with Ogun State's <br />
                premier Land Administration and Revenue Management System.
                </p>{" "}
            </Carousel.Item>
            <Carousel.Item className={classes.textdown}>
                <h6 className={classes.textdownH}>
                  {" "}
                  Invest in Your Future <br />
                  with Land in Ogun State!
                </h6>
                <p className={classes.textdownP}>
                Unlock seamless access to affordable and secure land <br />
                ownership through Ogun State’s trusted OLARMS.
                </p>{" "}
            </Carousel.Item>
          </Carousel>
      <div className={classes.slidehead4}>
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            onClick={() => handleSelect(index)}
            className={`${classes.indicator} ${
              activeIndex === index ? classes.activeIndicator : ""
            }`}
          ></span>
        ))}
      </div>
        </div>
            <div className={classes.rgtcontainer}>
                <div className={classes.maintext}>
                    <h1> Verify your account </h1>
                    <h6> Enter verification code sent to  <span style={{ color: "#21B55A", fontWeight: 400}}> {email} </span> </h6>

                    <Form>
      <Form.Group className={classes.otpGroup}>
      <div className={classes.otpInputs}>
      {otp.map((_, index) => (
  <Form.Control
    key={index}
    type="text"
    name={`otp-${index}`}
    maxLength="1"
    className={classes.otpInput}
    value={otp[index]} // Bind the value to state
    onChange={(e) => handleChange(e, index)}
    ref={(el) => (inputRefs.current[index] = el)} // Assign input refs
    style={{ backgroundColor: "#E7E7E7", color: "black" }}
  />
))}
      </div>
      </Form.Group>
    </Form>
    {showErrorMessage === true && (
              <div className={classes.errorCt}>
                <p style={{color: "red"}}>{errorMessage}</p>
                <img src={errorIcon} alt="Hide Password" style={{ height: "20px", width: "20px" }} />
              </div>
              )}

    <h6 style={{marginTop: showErrorMessage === true ? 70 : 0}}> Didn’t get the code?  
      <span style={{ color: "#21B55A", cursor: "pointer", marginLeft: 5}}  onClick={handleResendOtp}> 
        {
          otpLoading ? "Resending OTP, Please wait..." : "Resend"
        } 
        </span> <br />  <br /> 
      {isCounting && (
        <span style={{ color: "#21B55A" }}>{`${seconds} secs`}</span>
      )}
      {!isCounting && message && (
        <span style={{ color: "#21B55A" }}>{message}</span>
      )}
    </h6>

   


                    <Button disabled={isButtonDisabled} onClick={handleSignup} variant="success" className={classes.btngreen}>
                    {loading ? (
                            <>
                                <Spinner size='sm' />
                                <span style={{ marginLeft: '5px' }}>Verifying...</span>
                            </>
                        ) : (
                            "Verify Account"
                        )}        
                    </Button>
                </div>
            </div>
        </div>
    </div>
  );
}
export default ForgotEmailVerify;
