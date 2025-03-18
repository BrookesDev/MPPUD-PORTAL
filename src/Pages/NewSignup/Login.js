import React, { useState, useEffect } from "react";
import classes from "./Login.module.css";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Swal from "sweetalert2";
import { BASE_URL } from "../../API/Api";
import axios from "axios";



function Login() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Function to handle indicator click
  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};

const handleForgot = () => {
  navigate('/forgot_password');
}



const handleLogin = async () => {
  setLoading(true);
  try {
      const response = await axios.post(`${BASE_URL}/login`,
          {
              email: email,
              password: password
          }
      );
    
      const result = response.data?.data?.user?.name;
      const cac = response.data?.data?.user?.customer?.cac;
      const businessName = response.data?.data?.user?.customer?.business_name;
      const add = response.data?.data?.user?.customer?.address;
      const incorporationDate = response.data?.data?.user?.customer?.date_incorporated;
      const em = response.data?.data?.user?.customer?.email;
      const ph = response.data?.data?.user?.customer?.phone;
      const st = response.data?.data?.user?.customer?.state;
      const lg = response.data?.data?.user?.customer?.lga;
      const tin = response.data?.data?.user?.customer?.tin;
      const nin = response.data?.data?.user?.customer?.nin;
      const gender = response.data?.data?.user?.customer?.gender;
      const userType = response.data?.data?.user?.user_type;
      const resulth = response.data?.data?.user?.first_name;
      const resulthh = response.data?.data?.user?.last_name;
      const resultx = response.data?.data?.user?.email;
      const resultxx = response.data?.data?.user?.phone;
      const address = response.data?.data?.user?.address;
      const dob = response.data?.data?.user?.customer?.dob;
      const state = response.data?.data?.user?.state;
      const results = response.data?.data?.token;
      const isFilled = response.data?.data?.user?.is_fill;
      const customerImage = response.data?.data?.user?.image;
      const customerPicture = response.data?.data?.user?.customer?.picture;
      const createdBy = response.data?.data?.user?.created_by;
     
      console.log(response.data?.data?.user?.customer?.picture);

      AsyncStorage.setItem('userName', result);
      AsyncStorage.setItem('createdBy', createdBy);
      AsyncStorage.setItem('businessName', businessName);
      AsyncStorage.setItem('customerImage', customerImage);
      AsyncStorage.setItem('cac', cac);
      AsyncStorage.setItem('gender', gender);
      AsyncStorage.setItem('tin', tin);
      AsyncStorage.setItem('nin', nin);
      AsyncStorage.setItem('add', add);
      AsyncStorage.setItem('incorporationDate', incorporationDate);
      AsyncStorage.setItem('em', em);
      AsyncStorage.setItem('ph', ph);
      AsyncStorage.setItem('st', st);
      AsyncStorage.setItem('lg', lg);
      AsyncStorage.setItem('userType', userType);
      AsyncStorage.setItem('firstName', resulth);
      AsyncStorage.setItem('secondName', resulthh);
      AsyncStorage.setItem('userToken', results);
      AsyncStorage.setItem('userEmail', resultx);
      AsyncStorage.setItem('userPhone', resultxx);
      AsyncStorage.setItem('userAddress', address);
      AsyncStorage.setItem('dateOfBirth', dob);
      AsyncStorage.setItem('stateOfOrigin', state);
      AsyncStorage.setItem('isFilledState', isFilled);
      AsyncStorage.setItem('customerPicture', customerPicture);
   
      if (isFilled === "0") {
        navigate('/complete_your_registration');
      } else if (isFilled === "1") {
        navigate('/dashboard');
      }
  

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
}

const handleKeyPress = (e) => {
  if (e.key === 'Enter' && !isButtonDisabled) {
      handleLogin();
  }
};
const handleEmail = (e) => {
  setEmail(e.target.value);
  setShowErrorMessage(false);
};
const handlePassword = (e) => {
  setPassword(e.target.value);
  setShowErrorMessage(false);
};

const isButtonDisabled = !email || !password || loading;

const handleLogin2 = () => {
  navigate('/signup');
}

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
                    <h1> Welcome back </h1>
                    <h6> Log in to your account and experience seamless land administration. </h6>
                    <Form.Group>
                        <Form.Label className={classes.inputLabel}>Email address</Form.Label>
                        <Form.Control onChange={handleEmail} type="email" placeholder="Enter your email address" className={classes.inputField}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={classes.inputLabel}>Password</Form.Label>
                        <Form.Control onChange={handlePassword} type={showPassword ? 'text' : 'password'} placeholder="Enter password" className={classes.inputField} onKeyPress={handleKeyPress}/>
                        <button
                                type="button"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    float: 'right',
                                    left: "-2%",
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
                          {showErrorMessage === true && (
                          <div className={classes.errorCt}>
                            <p>{errorMessage}</p>
                            <img src={errorIcon} alt="Hide Password" style={{ height: "20px", width: "20px" }} />
                        </div>
                        )}
                    </Form.Group>
                    <div style={{paddingTop: showErrorMessage === true ? 30 : 0}}>
                    <span  className={classes.loginclk} onClick={handleForgot}> Forgot password?</span>
                    </div>
                    <Button onClick={handleLogin} variant="success" className={classes.btngreen} disabled={isButtonDisabled}>
                    {loading ? (
                            <>
                                <Spinner size='sm' />
                                <span style={{ marginLeft: '5px' }}>Signing in...</span>
                            </>
                        ) : (
                            "Login"
                        )}           
                    </Button>

                    <p style={{ textAlign: 'left', color: '#333333', fontSize: '15px', fontWeight: '400', marginTop: '12px'}}>
              {" "}
              You don't have an account?{" "}
              <span onClick={handleLogin2} style={{ textAlign: 'center', color: "#21B55A", cursor: 'pointer' }} className={classes.textsign} > Sign Up</span>{" "}
            </p>

                </div>
            </div>
        </div>
    </div>
  );
}

export default Login;
