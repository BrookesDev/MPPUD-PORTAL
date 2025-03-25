import React, { useState, useEffect } from "react";
import classes from "./CacCompleteReg.module.css";
import Form from "react-bootstrap/Form";
import { Link, Navigate } from "react-router-dom";
import { Button, Col, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../api/api";
import Valid from '../../Assets/valid.png';
import Invalid from '../../Assets/invalid.png';
// import axios from "axios";
import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import logo from "../../Assets/olarmsLogo.svg";
import arrow from "../../Assets/arrow-back.png";
import nav from "../../Assets/cacnav.png";
import prev from "../../Assets/prev.png";
// import slide from "../../Assets/slide.svg";
// import crossedEyeIcon from "../../Assets/crossedEyeIcon.svg";
// import errorIcon from "../../Assets/error.svg";
import Carousel from "react-bootstrap/Carousel";
import SubHeader from "../../Components/SubHeader/SubHeader";
import { FaUser, FaBuilding } from "react-icons/fa";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../../API/Api";




function CacCompleteReg() {
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
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [cac, setCac] = useState('');

    const readData = async () => {
        try {
            const detail = await AsyncStorage.getItem('userName');
            const details = await AsyncStorage.getItem('userToken');
            const detailss = await AsyncStorage.getItem('firstName');
                const detailsss = await AsyncStorage.getItem('secondName');
      
           
      
      
            if (details !== null) {
                setBearer(details);
            }
            if (detail !== null) {
                setName(detail);
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
         navigate('/complete_your_registration_stin', {state:{selectedRegType}});
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
        <div className={classes.mains}>
            <div className={classes.logohead}>
                <img src={logo} alt="Olarms Logo" className={classes.logoimage} />
                <div className={classes.headstfh}>
                    <img src={arrow} alt="back" className={classes.arrow} />
                    <p className={classes.bak} >Go back</p>
                </div>
            </div>


            <div className={classes.cntntbdy}>
                
            <div className={classes.layoutf}>
                <div className={classes.bgshii}>
                    <div className={classes.headershi}>
                        <p className={classes.wlcm}>Welcome  to OLARMS, {name?.split(" ")[0]}</p>
                        <p className={classes.wlcmsml}>You have a few steps to complete your registration</p>
                    </div>
                    <div className={classes.navin}>
                        <img src={nav} className={classes.navshi} />
                        <div>
                            <div className={classes.bdyptreg}>
                                <div className={classes.bdyptgall} >
                                    <p className={classes.bdyptg}>Complete Registration</p>
                                    <p className={classes.bdyptgtu}>Start your registration process</p>
                                </div>
                            </div>
                            <div className={classes.bdyptregrst}>
                                <div className={classes.bdyptgall} >
                                    <p className={classes.bdyptg}>KYC Verification</p>
                                    <p className={classes.bdyptgtu}>Select your Registration type</p>
                                </div>
                            </div>
                            <div className={classes.bdyptregrst}>
                                <div className={classes.bdyptgall} >
                                    <p className={classes.bdyptg}>Identity Verification</p>
                                    <p className={classes.bdyptgtu}>Enter your NIN as an Individual and CAC as a business</p>
                                </div>
                            </div>
                            <div className={classes.bdyptregrst}>
                                <div className={classes.bdyptgall} >
                                    <p className={classes.bdyptg}>STIN</p>
                                    <p className={classes.bdyptgtu}>Enter your State Tax Identification Number</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    </div>
                </div>

                <div className={classes.btmDiv}>
                    {/* <img src={prev} className={classes.prevvv} /> */}
                    <div className={classes.ritebg}>

                        <div className={classes.texthead}>
                            <p className={classes.pshii}>CAC Number</p>
                            <p className={classes.textcac}>To continue, please enter CAC Number</p>
                        </div>
                        <div className={classes.formfield}>

                        
                            <Form.Group>
                                <Form.Label className={classes.formLabel} htmlFor="cacregnumber">CAC Number</Form.Label>
                                <Form.Control className={classes.formInput} onChange={handleNinChange} onBlur={handleBlur} placeholder="Enter CAC" size="lg" type="text" id="cacregnumber" />
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
                            </Form.Group>
                        <div className={classes.btnall}>
                        <Button disabled={taxLoading} variant="success" onClick={validateTaxPayer} className={classes.rgbtn}>
                            {taxLoading ? (
                              
                                                                                        <>
                                                                                            <Spinner size='sm' />
                                                                                            <span style={{ marginLeft: '5px' }}>Verifying, Please wait...</span>
                                                                                        </>
                                                                                    ) : (
                                                                                        "Verify & Continue"
                                                                                    )}         
                        </Button>
                            
                        </div>
                        
                        </div>



                    </div>
                </div>
            </div>




        </div>

    );
}

export default CacCompleteReg;