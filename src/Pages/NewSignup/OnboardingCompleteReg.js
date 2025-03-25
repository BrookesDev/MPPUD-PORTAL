import React, { useState, useEffect } from "react";
import classes from "./OnboardingCompleteReg.module.css";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../api/api";
// import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ogunlogo from "../../Asset/ogunlogonew.svg"
import logo from "../../Asset/ogunlogonew.svg"
import slide from "../../Asset/slide.svg"
import crossedEyeIcon from '../../Asset/crossedEyeIcon.svg';
import errorIcon from '../../Asset/error.svg';
import Carousel from "react-bootstrap/Carousel";
import { BASE_URL } from "../../API/Api";
import axios from "axios";
// import localStorage from "@react-native-async-storage/async-storage";



function OnboardingCompleteReg() {
  const [bearer, setBearer] = useState('');
   const [loading, setLoading] = useState(false);
   const [showValidations, setShowValidations] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
   const [selectedRegType, setSelectedRegType] = useState('');
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
  const readData = async () => {
    try {
      const detail = await localStorage.getItem('userName');
      const details = await localStorage.getItem('userToken');


      if (detail !== null) {
        // const firstName = detail.split(' ')[0];
        setName(detail);

      }


      if (details !== null) {
        setBearer(details);
      }

    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };

  useEffect(() => {
    readData();
  }, []);

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

  const handleContinue = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/set_user_type`,
        {
          registration_type: selectedRegType,

        }, // Data payload
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearer}`,
          },
        } // Config for headers
      );

      handleNext();
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
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (selectedRegType === "individual") {
      navigate("/nin_verificaation", { state: { selectedRegType } });
    } else if (selectedRegType === "corporate") {
      navigate("/complete_your_registration_cac", { state: { selectedRegType } });
    } else {
      alert("Please select an option before proceeding.");
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    setShowErrorMessage(false);

    if (password !== confirmPassword) {
      setErrorMessage("Password and Confirm Password do not match");
      setShowErrorMessage(true);
      setLoading(false);
      return;
    }
    try {        
      const response = await axios.post(`${BASE_URL}/signup`, {
        // full_name: fullName,
        email: email,
        // password: password,
        // confirm_password: confirmPassword
      });  
      navigate('/verify_otp', { state: { email, firstName, lastName, phone, password, confirmPassword } });

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
                  margin: 0,
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
                }}>
                Effortless Budget Management: Request, Track, and<br />Approve with Ease
              </p>
            </Col>
          </Row>
        </div>
        <div className={classes.rgtcontainer}>
          <div className={classes.maintext}>
            <h1> Complete Registration </h1>
            <h6> To continue, please Select Registration type</h6>

            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
              <Form.Label className={classes.inputLabel}>Registration Type</Form.Label>
              <Form.Select
                value={selectedRegType}
                onChange={(e) => setSelectedRegType(e.target.value)}
                id="status"
                className={classes.inputContt}>
                <option value="">Select your registration type</option>
                <option value="individual">Individual</option>
                <option value="corporate">Corporate</option>

              </Form.Select>
            </Form.Group>
           
           
           

           
            <Button  variant="success" className={classes.btngreen} onClick={handleContinue} disabled={!selectedRegType} >
           {loading ? (
                             <>
                               <Spinner size='sm' />
                               <span style={{ marginLeft: '5px' }}>Processing...</span>
                             </>
                           ) : (
                             "Next"
                           )}
            </Button>
            <div className={classes.btmTxt}>
            {/* <p onClick={() => navigate('/dashboard')}> Skip</p> */}
            {/* <p style={{marginTop: 10}}> By Signing up, you agree to our <span style={{ color: "#21B55A" }}> Terms of Services</span> </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnboardingCompleteReg;
