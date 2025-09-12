import React, { useState, useEffect } from "react";
import classes from "./OnboardingStin.module.css";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../api/api";
// import axios from "axios";
import ogunlogo from "../../Asset/ogunlogonew.svg"
import Valid from '../../Asset/valid.png';
import Invalid from '../../Asset/invalid.png';
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
import Swal from "sweetalert2";
// import localStorage from "@react-native-async-storage/async-storage";



function OnboardingStin() {
  const [bearer, setBearer] = useState('');
  const location = useLocation();
  const selectedRegType = location.state?.selectedRegType || '';
   const [loading, setLoading] = useState(false);
   const [showValidations, setShowValidations] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [tinLoading, setTinLoading] = useState(false);
       const [isTaxpayer, setIsTaxpayer] = useState(""); // Tracks the taxpayer status
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fetchData, setFetchedData] = useState(false);
     const [responseMessage, setResponseMessage] = useState('');
        const [taxLoading, setTaxLoading] = useState(false);
         const [showErrorMessage1, setShowErrorMessage1] = useState(false);
        const [showResponseMessage, setShowResponseMessage] = useState(false);
      const [errorMessage, setErrorMessage] = useState("");
           const [showErrorMessage, setShowErrorMessage] = useState(false);
     const [sTin, setSTin] = useState("");
      const [userType, setUserType] = useState("");
  const navigate = useNavigate();
const [activeIndex, setActiveIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const handleTaxpayerChange = (e) => {
    setIsTaxpayer(e.target.value);
    setShowErrorMessage1(false);
    setShowResponseMessage(false);
  };

  const handleSTinChange = (e) => {
    setSTin(e.target.value);
    setShowErrorMessage1(false);
    setShowResponseMessage(false);
    setStinValid(false);
  };

 
  const readData = async () => {
    try {
      const detail = await localStorage.getItem('userName');
      const details = await localStorage.getItem('userToken');
       const dtt = await localStorage.getItem('userType');



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

    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };

  useEffect(() => {
    readData();
  }, []);

  const validateTaxPayer = async () => {
    setTaxLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/verify-tin`, {
        params: { 
          tin: sTin, 
          type: selectedRegType 
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearer}`,
        },
      });
  
      const responseData = response.data;
     setResponseMessage(responseData?.message);
     setShowResponseMessage(true);
      setStinValid(true);
    } catch (error) {
      setResponseMessage(JSON.stringify(error.response?.data?.message));
      setShowErrorMessage1(true);
       setStinValid(false);
      setSTin("");
      console.log(error.response?.data?.message);
    
  
    } finally {
      setTaxLoading(false);
    }
  };

  const [stinCreated, setStinCreated] = useState(false);
  const [stinValid, setStinValid] = useState(false);

  const createStin = async () => {
    const confirmed = await Swal.fire({
      title: 'Are you sure you want to create an S-TIN?',
      text: 'All previous tax history will not be accessed on the new S-TIN ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, create it!',
      cancelButtonText: 'No, cancel',
    });

    if (!confirmed.isConfirmed) {
      return; // User canceled, do nothing
    }
    setTinLoading(true);
    setShowErrorMessage1(false);
    try {
      const response = await axios.get
      (`${BASE_URL}/create-tin`, {
        params: { 
          type: selectedRegType 
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearer}`,
        },
      });
  
      const responseData = response.data;
      const responseDatas = response.data?.data;
      setSTin(responseDatas);
      setFetchedData(true);
     setResponseMessage(responseData?.message);
     setShowResponseMessage(true);
     setStinCreated(true);
      setStinValid(true);
    
    } catch (error) {
      setResponseMessage(error.response?.data?.message);
      setShowErrorMessage1(true);
      setSTin("");
      console.log(error.response?.data?.message);
    
      setStinCreated(false);
      setStinValid(false);
    } finally {
      setTinLoading(false);
    }
  };

  const handleBlur = async () => {
    if (!sTin) {
      setShowErrorMessage1(false);
      setShowResponseMessage(false);
      return;
    }
  
    setShowErrorMessage1(false);
    setShowResponseMessage(false);
  
    await validateTaxPayer(); // `stin` will be cleared inside validateTaxPayer if there’s an error
  };

   const handleSignup = async () => {
    setLoading(true);
    setShowErrorMessage(false);
  
    try {
    //   let isValid = true; // Default to true if validation is not required
    // if (!stinCreated) {
    //   console.log('Validating taxpayer...'); // Debug: Check if validation is triggered
    //   isValid = await validateTaxPayer();

    //   console.log('Validation result:', isValid); // Debug: Log validation result
    //   if (!isValid) {
    //     console.log('Validation failed'); // Debug: Log failure reason
    //     setLoading(false);
    //     setShowErrorMessage(true);
    //     setErrorMessage('Taxpayer validation failed. Please check your details.');
    //     return;
    //   }
    // }
  
      // Proceed with signup if validation passes
      const response = await axios.post(
        `${BASE_URL}/customer_registration`,
        {
          tin: sTin,
          registration_type: selectedRegType,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearer}`,
          },
        }
      );
  
      // Navigate to the next page on success
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
  
        setErrorMessage(JSON.stringify(errorMessage));
        setShowErrorMessage(true);
      }
    } finally {
      setLoading(false);
    }
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
                }}>
                Effortless Budget Management: Request, Track, and<br />Approve with Ease
              </p>
            </Col>
          </Row>
        </div>
        <div className={classes.rgtcontainer}>
          <div className={classes.maintext}>
            <h1> STIN Verification </h1>
            <h6>{selectedRegType === 'individual' ? 'To continue, please select your personal S-TIN (State Tax Identification Number) from the dropdown below or generate if you dont have one.' :   'To continue, please select your Company S-TIN (State Tax Identification Number) from the dropdown below or generate if you dont have one.'}</h6>

            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
              {/* <Form.Label className={classes.inputLabel}>Are you an Ogun State Resident?</Form.Label> */}
              {/* <Form.Select
              style={{
                padding: "10px",
                height: '46px',
                width: "100%",
              }}
                value={isTaxpayer}
                onChange={handleTaxpayerChange}
                id="status"
                className={classes.inputContt}>
               <option value="">Select</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>

              </Form.Select> */}
              {/* {isTaxpayer === "Yes" && ( */}
                    <>
                      <div className={`mb-3 ${classes.stintext}`} style={{marginTop: 10}}>
                        <label htmlFor="sTin" className={classes.textstyle}>
                          S-TIN
                        </label>
                        <input
                          disabled={fetchData === true}
                          type="text"
                          id="sTin"
                          style={{
                            padding: "10px",
                            height: '46px',
                            width: "100%",
                          }}
                          className="form-control"
                          placeholder="Enter S-TIN"
                          value={sTin}
                          onChange={handleSTinChange}
                          onBlur={handleBlur}
                        />
                      </div>
              
                      {taxLoading && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <Spinner size='sm' />
                          <span style={{ marginLeft: 5 }}>Verifying... please wait</span>
                        </div>
                      )}
              
                      {showErrorMessage1 && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <img src={Invalid} alt="Invalid Tin" style={{ width: '20px', height: '20px' }} />
                          <span style={{ color: "red", fontSize: 14, fontWeight: 500 }}>{responseMessage}</span>
                        </div>
                      )}
              
                      {showResponseMessage && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <img src={Valid} alt="Valid Tax" style={{ width: '20px', height: '20px' }} />
                          <span style={{ color: "green", fontSize: 14, fontWeight: 500 }}>{responseMessage}</span>
                        </div>
                      )}
              
                      {tinLoading ? (
                        <p
                          style={{
                            textAlign: "left",
                            color: "#000",
                            fontSize: "15px",
                            fontWeight: "400",
                            marginTop: "12px",
                          }}
                        >
                          Processing your request, please wait...
                        </p>
                      ) : (
                        <p
                          style={{
                            textAlign: "left",
                            color: "#333333",
                            fontSize: "15px",
                            fontWeight: "400",
                            marginTop: "12px",
                          }}
                        >
                          Don't have an Stin?{" "}
                          <span
                            onClick={createStin}
                            style={{ color: "#21B55A", cursor: "pointer" }}
                            className={classes.textsign}
                          >
                            Click Here!
                          </span>
                        </p>
                      )}
                    </>
                  {/* )} */}
            </Form.Group>
           
           
           

           {!stinValid  ? (
            <Button disabled={!sTin}  variant="success" className={classes.btngreen} onClick={validateTaxPayer} >
           {loading ? (
                             <>
                               <Spinner size='sm' />
                               <span style={{ marginLeft: '5px' }}>Processing...</span>
                             </>
                           ) : (
                             "Verify STIN"
                           )}
            </Button>
) : (
            <Button disabled={!sTin}  variant="success" className={classes.btngreen} onClick={handleSignup} >
           {loading ? (
                             <>
                               <Spinner size='sm' />
                               <span style={{ marginLeft: '5px' }}>Processing...</span>
                             </>
                           ) : (
                             "Submit"
                           )}
            </Button>
           )}
          {showErrorMessage && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 10 }}>
                  <img src={Invalid} alt="Invalid Tin" style={{ width: '20px', height: '20px' }} />
                  <span style={{ color: "red", fontSize: 14, fontWeight: 500 }}>{errorMessage}</span>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnboardingStin;
