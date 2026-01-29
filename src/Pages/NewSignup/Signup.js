import React, { useState, useEffect } from "react";
import classes from "./Signup.module.css";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../API/Api";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TickIcon from "../../Asset/tick-circle.png"
import logo from "../../Asset/olarmsLogo.svg"
import slide from "../../Asset/slide.svg"
import ogunlogo from "../../Asset/ogunlogonew.svg"
import crossedEyeIcon from '../../Asset/crossedEyeIcon.svg';
import errorIcon from '../../Asset/error.svg';
import Carousel from "react-bootstrap/Carousel";
import Swal from "sweetalert2";




function SignUp() {
  const [loading, setLoading] = useState(false);
   const [showValidations, setShowValidations] = useState(false);
   const [checkedBox, setCheckedBox] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
    match: false,
    number: false
  });
  const selectedPlan = location.state?.selectedPlan;
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  console.log(checkedBox);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  const handleLogin = () => {
    navigate('/login');
  }
  const handleVerify = () => {
    navigate('/verify_account');
  }

  const handleSignup = async () => {
    setLoading(true);
    setShowErrorMessage(false);
    
    // Validation: Check if fields are empty
    if (!firstName.trim()) {
      setErrorMessage("First name is required.");
      setShowErrorMessage(true);
      setLoading(false);
      return;
    }
    if (!lastName.trim()) {
      setErrorMessage("Last name is required.");
      setShowErrorMessage(true);
      setLoading(false);
      return;
    }
    if (!email.trim()) {
      setErrorMessage("Email address is required.");
      setShowErrorMessage(true);
      setLoading(false);
      return;
    }
    if (!phone.trim()) {
      setErrorMessage("Phone number is required.");
      setShowErrorMessage(true);
      setLoading(false);
      return;
    }
    if (!password.trim()) {
      setErrorMessage("Password is required.");
      setShowErrorMessage(true);
      setLoading(false);
      return;
    }
    if (!confirmPassword.trim()) {
      setErrorMessage("Confirm Password is required.");
      setShowErrorMessage(true);
      setLoading(false);
      return;
    }
  
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setErrorMessage("Password and Confirm Password do not match.");
      setShowErrorMessage(true);
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post(`${BASE_URL}/signup`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: phone,
        password: password,
        confirm_password: confirmPassword
      });
     Swal.fire({
               imageUrl: TickIcon,
               imageWidth: 48,
               imageHeight: 48,
               title: "Success!",
               confirmButtonText: "Okay",
               text: response.data.message,
               customClass: {
                 title: classes.myTitle,
                 popup: classes.myText,
                 confirmButton: classes.myDeclineButton,
               },
               allowOutsideClick: false,
               preConfirm: () => {
                 Swal.close();
               },
             });
      // navigate('/verify_otp', { state: { email, firstName, lastName, phone, password, confirmPassword } });
  setFirstName('');
  setLastName('');
  setEmail('');
  setPhone('');
  setPassword('');
  setConfirmPassword('');
  navigate('/login');
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
      }
      setErrorMessage(errorMessage);
      setShowErrorMessage(true);
    } finally {
      setLoading(false);
    }
  };
  

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setShowErrorMessage(false);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
    setShowErrorMessage(false);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setShowErrorMessage(false);
  };
  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    setShowErrorMessage(false);
    setShowValidations(true);
    setPasswordValidations({
      length: value.length >= 6,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      match: confirmPassword === value, 
      number: /\d/.test(value),
    });
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
    setShowErrorMessage(false);
  };
  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setShowErrorMessage(false);

    setPasswordValidations((prev) => ({
      ...prev,
      match: password === value,
    }));
  };

  const isButtonDisabled = !email || !password || !firstName || !lastName || !confirmPassword || loading || !Object.values(passwordValidations).every(Boolean);

  return (
    <div >
      <div className={classes.maincontainer}>
        <div className={classes.lftcontainer}>
          <Row>
            <Col md={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={ogunlogo} className={classes.logoimage} alt="logo" />
            </Col>
            <Col md={12}>
              <h1
                style={{
                  color: 'white',
                  fontSize: '30px',
                  fontWeight: '600',
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: 2,
                  textAlign: 'center',
                }}>
                MPPUD PORTAL
              </h1>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
            </Col>
            <Col md={12}>
              <p
                style={{
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '400',
                  fontFamily: 'Inter, sans-serif',
                  textAlign: 'center',
                  margin: 0,
                  maxWidth: "450px"
                }}>
                Welcome to the Ogun State Ministry of Physical Planning and Urban Development (MPPUD)  Application Portal  
              </p>
            </Col>
          </Row>
        </div>
        <div className={classes.rgtcontainer}>
          <div className={classes.maintext}>
            <h1> Create Account </h1>
            <h6> Sign up and Effortlessly manage Budget Management. </h6>
            <div className="row">
              <div className="col-md-6">
              <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
              <Form.Label className={classes.inputLabel}>First name <span style={{color: "red"}}>*</span></Form.Label>
              <Form.Control onChange={handleFirstName} type="name" placeholder="Enter your first name" className={classes.inputField} />
            </Form.Group>
            </div>
            <div className="col-md-6">
            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
              <Form.Label className={classes.inputLabel}>Last name <span style={{color: "red"}}>*</span></Form.Label>
              <Form.Control onChange={handleLastName} type="name" placeholder="Enter your last name" className={classes.inputField} />
            </Form.Group>
            </div>
            </div>
            <div className="row">
            <div className="col-md-6">
            <Form.Group className={classes.errorCt12}>
              <Form.Label className={classes.inputLabel}>Email address <span style={{color: "red"}}>*</span></Form.Label>
              <Form.Control onChange={handleEmail} type="email" placeholder="Enter your email address" className={classes.inputField} />             
            </Form.Group>
            </div>
            <div className="col-md-6">
            <Form.Group  className={classes.errorCt12}>
              <Form.Label className={classes.inputLabel}>Phone Number <span style={{color: "red"}}>*</span></Form.Label>
              <Form.Control onChange={handlePhone} type="phone" placeholder="Enter your phone number" className={classes.inputField} />             
            </Form.Group>
            </div>
            </div>

            <div className="row">
            <div className="col-md-6">
            <Form.Group >
              <Form.Label className={classes.inputLabel}>Password <span style={{color: "red"}}>*</span></Form.Label>
              <Form.Control onChange={handlePassword} type={showPassword ? 'text' : 'password'} placeholder="Enter password" className={classes.inputField} />
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  float: 'right',
                  marginRight: '10px',                  
                  // left: "-3%",
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

            </Form.Group>
            </div>
            <div className="col-md-6">
            <Form.Group>
              <Form.Label className={classes.inputLabel}>Confirm Password <span style={{color: "red"}}>*</span></Form.Label>
              <Form.Control onChange={handleConfirmPassword} type={showPassword2 ? 'text' : 'password'} placeholder="Confirm password" className={classes.inputField} />
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  float: 'right',
                  // left: "-3%",
                  marginTop: '-45px',
                  marginRight: '10px',
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
            </div>
            </div>
            {password && showValidations && (
            <ul style={{ listStyleType: "none", padding: 0 }}>
            <div className={classes.passwordAut}>
  <li style={{ color: passwordValidations.number ? "green" : "red" }}>
    {passwordValidations.length ? "✔" : "❌"} Must contain at least a number
  </li>
  <li style={{ color: passwordValidations.length ? "green" : "red" }}>
    {passwordValidations.length ? "✔" : "❌"} Must be at least 6 characters
  </li>
  <li style={{ color: passwordValidations.uppercase ? "green" : "red" }}>
    {passwordValidations.uppercase ? "✔" : "❌"} Must contain an uppercase letter
  </li>
  <li style={{ color: passwordValidations.lowercase ? "green" : "red" }}>
    {passwordValidations.lowercase ? "✔" : "❌"} Must contain a lowercase letter
  </li>
  <li style={{ color: passwordValidations.specialChar ? "green" : "red" }}>
    {passwordValidations.specialChar ? "✔" : "❌"} Must contain a special character
  </li>
  <li style={{ color: passwordValidations.match ? "green" : "red" }}>
    {passwordValidations.match ? "✔" : "❌"} Passwords must match
  </li>
  </div>
</ul>
            )}

            {showErrorMessage === true && (
              <div className={classes.errorCt}>
                <p>{errorMessage}</p>
                <img src={errorIcon} alt="Hide Password" style={{ height: "20px", width: "20px" }} />
              </div>
              )}

              <div>
              <Form.Check 
        type="checkbox"
        label="Agree to Terms and Conditions"
        checked={checkedBox}
        onChange={(e) => setCheckedBox(e.target.checked)}
      />
              </div>

            <Button disabled={isButtonDisabled} variant="success" className={classes.btngreen} onClick={handleSignup} >
            {loading ? (
                            <>
                                <Spinner size='sm' />
                                <span style={{ marginLeft: '5px' }}>Signing up...</span>
                            </>
                        ) : (
                            "Signup"
                        )}          
            </Button>
            <div className={classes.btmTxt}>
            <p> Already have an account? <span className={classes.loginclk} onClick={handleLogin}> Log in</span> </p>
            {/* <p style={{marginTop: 10}}> By Signing up, you agree to our <span style={{ color: "#21B55A" }}> Terms of Services</span> </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
