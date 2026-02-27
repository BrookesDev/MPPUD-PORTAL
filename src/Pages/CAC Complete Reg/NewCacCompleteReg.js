import React, { useState, useEffect } from "react";
import classes from "./NewCacCompleteReg.module.css";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../api/api";
// import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../../Asset/olarmsLogo.svg"
import slide from "../../Asset/slide.svg"
import crossedEyeIcon from '../../Asset/crossedEyeIcon.svg';
import errorIcon from '../../Asset/error.svg';
import Carousel from "react-bootstrap/Carousel";
import { BASE_URL } from "../../API/Api";
import axios from "axios";
// import localStorage from "@react-native-async-storage/async-storage";
import Valid from '../../Asset/valid.png';
import Invalid from '../../Asset/invalid.png';
import ogunlogo from "../../Asset/ogunlogonew.svg"



function NewCacCompleteReg() {
  const location = useLocation();
    const navigate = useNavigate();
     const [taxLoading, setTaxLoading] = useState(false);
    const [bearer, setBearer] = useState('');
    const [name, setName] = useState('');
    const [responseMessage, setResponseMessage] = useState('');  
          const [showResponseMessage, setShowResponseMessage] = useState(false);
     const [showErrorMessage1, setShowErrorMessage1] = useState(false);
      const {
        selectedRegType
      } = location.state || '';
   
    const [cac, setCac] = useState('');

   const [loading, setLoading] = useState(false);
   const [showValidations, setShowValidations] = useState(false);
   const [tins, setTins] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [phone, setPhone] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


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

  const validateTaxPayer = async () => {
    setTaxLoading(true);
    setShowErrorMessage1(false);
    setShowResponseMessage(false);
    try {
      const response = await axios.get(`${BASE_URL}/verify-cac`, {
        params: { 
          cac_number: cac, 
       
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearer}`,
        },
      });
  
      const responseData = response.data;
     setResponseMessage(responseData?.message);
     setShowResponseMessage(true);
      setTins(responseData?.data);
     navigate('/complete_your_registration_stin', {state:{selectedRegType, sTins: responseData?.data}});
    } catch (error) {
      setResponseMessage(JSON.stringify(error.response?.data?.message));
      setShowErrorMessage1(true);
      setCac("");
      console.log(error.response?.data?.message);
    
  
    } finally {
      setTaxLoading(false);
    }
  };

  const handleNinChange = (e) => {
    setCac(e.target.value);
    setShowErrorMessage1(false);
    setShowResponseMessage(false);
  };

  const handleBlur = async () => {
    if (!cac) {
      setShowErrorMessage1(false);
      setShowResponseMessage(false);
      return;
    }
  
    setShowErrorMessage1(false);
    setShowResponseMessage(false);
  
    await validateTaxPayer(); // `stin` will be cleared inside validateTaxPayer if there’s an error
  };

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
                  maxWidth: "450px",
                }}>
                Welcome to the Ogun State Ministry of Physical Planning and Urban Development (MPPUD)  Application Portal  
                {/* Effortless Budget Management: Request, Track, and<br />Approve with Ease */}
              </p>
            </Col>
          </Row>
        </div>
        <div className={classes.rgtcontainer}>
          <div className={classes.maintext}>
            <h1> CAC Number </h1>
            <h6> To continue, please enter CAC Number</h6>

            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
              <Form.Label className={classes.inputLabel}>CAC Number</Form.Label>
              <Form.Control className={classes.formInput} value={cac} onChange={handleNinChange} onBlur={handleBlur} placeholder="Enter CAC" size="lg" type="text" id="cacregnumber" />
            </Form.Group>
           
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
           

           
<Button  disabled={taxLoading}  variant="success" className={classes.btngreen} onClick={validateTaxPayer}>
           {taxLoading ? (
                             <>
                               <Spinner size='sm' />
                               <span style={{ marginLeft: '5px' }}>Verifying, Please wait...</span>
                             </>
                           ) : (
                              "Verify & Continue"
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

export default NewCacCompleteReg;
