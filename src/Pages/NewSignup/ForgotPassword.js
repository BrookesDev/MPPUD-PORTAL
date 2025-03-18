import React, { useState, useEffect } from "react";
import classes from "./ForgotPassword.module.css";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../api/api";
// import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ogunlogo from "../../Asset/ogunlogonew.svg"
import slide from "../../Asset/slide.svg"
import crossedEyeIcon from '../../Asset/crossedEyeIcon.svg';
import errorIcon from '../../Asset/error.svg';
import Carousel from "react-bootstrap/Carousel";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../API/Api";
// import axios from "axios";
import { Spinner } from "react-bootstrap";



function ForgotPassword() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);  
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const selectedPlan = location.state?.selectedPlan;
  const [showPassword, setShowPassword] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Function to handle indicator click
  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};

const handleProceedd = () => {
  navigate('/verify_otp');
}

// const handleProceed = async () => {
//   setLoading(true);
//   try {
//       const response = await axios.post(`${BASE_URL}/forget_password`,
//           {
//               email: email,
//           }
//       );
//       Swal.fire({
//           icon: 'success',
//           title: 'Successful',
//           text: response.data.message,
//         });
//         navigate('/verify_account', { state: { email } });
//         setEmail('');

//   } catch (error) {
//     let errorMessage = 'An error occurred. Please try again.';
//     if (error.response && error.response.data && error.response.data.message) {
//       if (typeof error.response.data.message === 'string') {
//         errorMessage = error.response.data.message;
//       } else if (Array.isArray(error.response.data.message)) {
//         errorMessage = error.response.data.message.join('; ');
//       } else if (typeof error.response.data.message === 'object') {
//         errorMessage = JSON.stringify(error.response.data.message);
//       }
//       setErrorMessage(JSON.stringify(error.response.data.message));
//       setShowErrorMessage(true);
//       // Swal.fire({
//       //   icon: 'error',
//       //   title: 'Failed',
//       //   text: JSON.stringify(error.response.data.message),
//       // });
//     }
//   } finally {
//       setLoading(false);
//   }
// }

const handleEmail = (e) => {
  setEmail(e.target.value);
  setShowErrorMessage(false);
};

  return (
    <div >
        <div className={classes.maincontainer}>
        <div className={classes.lftcontainer}>
          <Row>
            <Col md={2}>
              <img src={ogunlogo} className={classes.logoimage} alt="logo" />
            </Col>
            <Col md={10}>
              <h1
              style={{
                color: 'white',  
                fontSize: '30px',  
                fontWeight: '600',
                fontFamily: 'Inter, sans-serif',
                margin: 0,
              }}>
                Ogun State Budget System
              </h1>
            </Col>
          </Row>
          <Row>
            <Col md={2}>
            </Col>
            <Col md={10}>
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
                    <h1> Forgot Password </h1>
                    <h6> Enter your registered email address </h6>
                    <Form.Group>
                        <Form.Label className={classes.inputLabel}>Email address</Form.Label>
                        <Form.Control onChange={handleEmail}  type="name" placeholder="Enter your email address" className={classes.inputField}/>
                        {showErrorMessage === true && (
                          <div className={classes.errorCt}>
                            <p>{errorMessage}</p>
                            <img src={errorIcon} alt="Hide Password" style={{ height: "20px", width: "20px" }} />
                        </div>
                        )}
                    </Form.Group>
                    <Button variant="success" className={classes.btngreen} >
                    {loading ? (
                      <>
                                <Spinner size='sm' />
                                <span style={{ marginLeft: '5px' }}>Processing, please wait...</span>
                            </>
                        ) : (
                          "Proceed"
                        )} 
                        
                    </Button>
                    <p style={{ textAlign: 'center', color: '#333333', fontSize: '15px', fontWeight: '400', marginTop: '12px'}}>
              {" "}
              Remember your password?{" "}
              <span onClick={() => navigate('/login')} style={{ textAlign: 'center', color: "#21B55A", cursor: 'pointer' }} className={classes.textsign} > Login</span>{" "}
            </p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ForgotPassword;
