import React, { useState, useEffect } from "react";
import classes from "./ResetPassword.module.css";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../api/api";
// import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../../Assets/olarmsLogo.svg"
import slide from "../../Assets/slide.svg"
import crossedEyeIcon from '../../Assets/crossedEyeIcon.svg';
import errorIcon from '../../Assets/error.svg';
import Carousel from "react-bootstrap/Carousel";
import { BASE_URL } from "../../API/Api";
import axios from "axios";
import Swal from "sweetalert2";



function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedPlan = location.state?.selectedPlan;
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
    const {email } = location.state;
  const [errorMessage, setErrorMessage] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  // Function to handle indicator click
  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};

const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
};

const handleReset = async () => {
  setLoading(true);
  setShowErrorMessage(false);
  try {

    const response = await axios.post(`${BASE_URL}/reset_password`, {
      // full_name: fullName,
      email: email,
      password: password,
      password_confirmation: confirmPassword
    }
  );
    Swal.fire({
      icon: 'success',
      title: 'Successful',
      text: response.data.message,
    });
    navigate('/reset_success', { state: { email, firstName, lastName, password, confirmPassword } });

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
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: JSON.stringify(error.response.data.message),
      });
    }
    
  } finally {
    setLoading(false);
  }
};

const handlePassword = (e) => {
  setPassword(e.target.value);
  setShowErrorMessage(false);
};
const handleConfirmPassword = (e) => {
  setConfirmPassword(e.target.value);
  setShowErrorMessage(false);
};

const isButtonDisabled = !password || !confirmPassword || loading;


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
                    <h1> Reset Password </h1>
                    {/* <h6> Sign up now to experience seamless land administration. </h6> */}
                    <Form.Group>
                        <Form.Label className={classes.inputLabel}>Enter New Password</Form.Label>
                        <Form.Control onChange={handlePassword} type={showPassword ? 'text' : 'password'} placeholder="Enter password" className={classes.inputField}/>
                        <button
                                type="button"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    float: 'right',
                                    left: "-10px",
                                    marginTop: '-45px',
                                    position: 'relative',
                                    zIndex: 2
                                }}
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <img src={crossedEyeIcon} alt="Hide Password" style={{ height: "17px", width: "17px" }} />
                                ) : (
                                    '👁️'
                                )}
                        </button>
                        <div className={classes.errorCt}>
                            <p>Password should be a minimum of 8 characters</p>
                            <img src={errorIcon} alt="Hide Password" style={{ height: "20px", width: "20px" }} />
                        </div>
                    </Form.Group>
                    <Form.Group className={classes.inputGroup}>
                        <Form.Label className={classes.inputLabel}>Confirm Password</Form.Label>
                        <Form.Control onChange={handleConfirmPassword} type={showPassword2 ? 'text' : 'password'} placeholder="Confirm password" className={classes.inputField}/>
                        <button
                                type="button"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    float: 'right',
                                    left: "-10px",
                                    marginTop: '-45px',
                                    position: 'relative',
                                    zIndex: 2
                                }}
                                onClick={togglePasswordVisibility2}
                            >
                                {showPassword2 ? (
                                    <img src={crossedEyeIcon} alt="Hide Password" style={{ height: "17px", width: "17px" }} />
                                ) : (
                                    '👁️'
                                )}
                          </button>

                    </Form.Group>
                    {showErrorMessage === true && (
              <div className={classes.errorCt}>
                <p>{errorMessage}</p>
                <img src={errorIcon} alt="Hide Password" style={{ height: "20px", width: "20px" }} />
              </div>
              )}


<Button disabled={isButtonDisabled} variant="success" className={classes.btngreen} onClick={handleReset} >
            {loading ? (
                            <>
                                <Spinner size='sm' />
                                <span style={{ marginLeft: '5px' }}>Processing, please wait...</span>
                            </>
                        ) : (
                            "Reset Password"
                        )}          
            </Button>                    {/* <p> Already have an account? <span style={{ color: "#21B55A"}}> Log in</span> </p>
                    <p> By Signing up, you agree to our <span style={{ color: "#21B55A"}}> terms of services</span> <br /> 
                    and that you have read our <span style={{ color: "#21B55A"}}>privacy policy</span></p> */}

                </div>
            </div>
        </div>
    </div>
  );
}

export default ResetPassword;
