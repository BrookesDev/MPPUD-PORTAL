import React, { useState, useEffect } from "react";
import classes from "./NewNinVerification.module.css";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import ogunlogo from "../../Asset/ogunlogonew.svg"
import { Button, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../api/api";
// import axios from "axios";
import Invalid from '../../Asset/invalid.png';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Valid from '../../Asset/valid.png';
import logo from "../../Asset/olarmsLogo.svg"
import slide from "../../Asset/slide.svg"
import crossedEyeIcon from '../../Asset/crossedEyeIcon.svg';
import errorIcon from '../../Asset/error.svg';
import Carousel from "react-bootstrap/Carousel";
import { BASE_URL } from "../../API/Api";
import axios from "axios";
// import localStorage from "@react-native-async-storage/async-storage";



function NewNinVerification() {
  const [bearer, setBearer] = useState('');
   const [loading, setLoading] = useState(false);
   const [showValidations, setShowValidations] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
      const [nin, setNin] = useState('');
          const [responseMessage, setResponseMessage] = useState('');  
            const [showResponseMessage, setShowResponseMessage] = useState(false);
  const [phone, setPhone] = useState('');
    const [showErrorMessage1, setShowErrorMessage1] = useState(false);
  //  const [selectedRegType, setSelectedRegType] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
    match: false,
    number: false
  });
  const selectedRegType = location.state?.selectedRegType || '';
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
   const [taxLoading, setTaxLoading] = useState(false);

  //  console.log(selectedRegType);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };
  const readData = async () => {
    try {
        const detail = await localStorage.getItem('userName');
        const details = await localStorage.getItem('userToken');
         const dtt = await localStorage.getItem('userType');
        const detailss = await localStorage.getItem('firstName');
            const detailsss = await localStorage.getItem('secondName');
  
        if (detail !== null) {
            // const firstName = detail.split(' ')[0];
            setName(detail);
  
        }
         if (dtt !== null) {
        // const firstName = dtt.split(' ')[0];
        setUserType(dtt);

      }
  
  
        if (details !== null) {
            setBearer(details);
        }
        if (detailss !== null) {
          setFirstName(detailss);
      }
      if (detailsss !== null) {
          setLastName(detailsss);
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

  const validateTaxPayer = async () => {
    setTaxLoading(true);
    setShowErrorMessage1(false);
    setShowResponseMessage(false);
    try {
      const response = await axios.get(`${BASE_URL}/verify-nin`, {
        params: { 
          nin: nin, 
        //   type:selectedRegType,
          first_name: firstName,
          last_name: lastName
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearer}`,
        },
      });
  
      const responseData = response.data;
     setResponseMessage(responseData?.message);
     setShowResponseMessage(true);
     navigate('/complete_your_registration_stin', {state:{sTins: responseData?.data}});
    } catch (error) {
      setResponseMessage(JSON.stringify(error.response?.data?.message));
      setShowErrorMessage1(true);
      setNin("");
      console.log(error.response?.data?.message);
    
  
    } finally {
      setTaxLoading(false);
    }
  };


  const handleNext = () => {
    if (userType === "individual") {
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

  const handleNinChange = (e) => {
    setNin(e.target.value);
    setShowErrorMessage1(false);
    setShowResponseMessage(false);
  };

  const handleBlur = async () => {
    if (!nin) {
      setShowErrorMessage1(false);
      setShowResponseMessage(false);
      return;
    }
  
    setShowErrorMessage1(false);
    setShowResponseMessage(false);
  
    await validateTaxPayer(); // `stin` will be cleared inside validateTaxPayer if there’s an error
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
            <h1> NIN Verification </h1>
            <h6> To continue, please enter your NIN</h6>

            <div className={classes.finbtn}>

                    
                    <label style={{
                        fontSize: 16,
                        fontWeight: 400,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        alignItems: "flex-start",
                        
                        // margin: '0 auto',
                        color: "#333333",
                    }}>
                        NIN
                        <input
                        value={nin}
                        onChange={handleNinChange}
                        onBlur={handleBlur}
                            id="status"
                            placeholder="Enter NIN"
                            style={{
                                width: "500px",
                                height: "45px",
                                borderRadius: 8,
                                padding: 10,
                                fontSize: 14,
                                fontWeight: 600,
                                marginTop: 10,
                                
                                border: "1px solid #D9DCE0",
                                backgroundColor: "transparent",
                                // outline: 'none'

                            }} className={classes.inputfield} />



                    </label>
                    {/* {taxLoading && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                            <Spinner size='sm' />
                                            <span style={{ marginLeft: 5 }}>Verifying... please wait</span>
                                        </div>
                                    )} */}

{showErrorMessage1 && (
  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 10 }}>
    <img src={Invalid} alt="Invalid Tin" style={{ width: '20px', height: '20px' }} />
    <span style={{color: "red", fontSize: 14, fontWeight: 500}}>{responseMessage}</span>
  </div>
)}

{showResponseMessage && (
  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 10 }}>
    <img src={Valid} alt="Valid Tax" style={{ width: '20px', height: '20px' }} />
    <span style={{color: "green", fontSize: 14, fontWeight: 500}}>{responseMessage}</span>
  </div>
)}
                      <Row style={{ paddingTop: "15px" }}>
                        <Col md={6}>
                        <Button disabled={taxLoading} variant="success" onClick={validateTaxPayer}>
                            {taxLoading ? (
                                                                                        <>
                                                                                            <Spinner size='sm' />
                                                                                            <span style={{ marginLeft: '5px' }}>Verifying, Please wait...</span>
                                                                                        </>
                                                                                    ) : (
                                                                                        "Verify & Continue"
                                                                                    )}         
                        </Button>
                        </Col>
                        <Col md={6}>
                        {/* <Button variant="light" onClick={() => navigate('/complete_your_registration_stin', {state: {selectedRegType}})}>
                          Skip
                        </Button> */}
                        {/* <p  className={classes.skpbtn}>Skip</p> */}
                        </Col>
                      </Row>
                    {/* </div> */}
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewNinVerification;
