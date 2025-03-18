import React, { useState, useEffect } from "react";
import classes from './Taxpayer.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../Assets/olarmsLogo.svg";
import left from "../../Assets/arrow-left1.png";
import greenrect from "../../Assets/GRectangle.png";
import greenrectan from "../../Assets/GreenRect.png";
import { BASE_URL } from "../../API/Api";
import axios from "axios";
import Valid from '../../Assets/valid.png';
import Invalid from '../../Assets/invalid.png';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Spinner } from "react-bootstrap";
// import green from "../../Assets/GreenRect.png";


function Taxpayer() { 
  const [responseMessage, setResponseMessage] = useState('');
   const [taxLoading, setTaxLoading] = useState(false);
    const [showErrorMessage1, setShowErrorMessage1] = useState(false);
           const [showResponseMessage, setShowResponseMessage] = useState(false);
 const [errorMessage, setErrorMessage] = useState("");
      const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [isTaxpayer, setIsTaxpayer] = useState(""); // Tracks the taxpayer status
    const [sTin, setSTin] = useState(""); // Tracks the S-TIN value
    const location = useLocation();
    const [bearer, setBearer] = useState('');
    // const [email, setEmail] = useState('');
        const [name, setName] = useState('');
    const {
      selectedOption,
      firstName,
      lastName,
      email,
      phone,
      selectedState,
      stateInput,
      dob,
      address,
      selectedCountry,
      selectedGender,
      selectedMaritalStatus,
      inputValue
    } = location.state;
    const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
    const handleTaxpayerChange = (e) => {
      setIsTaxpayer(e.target.value);
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearer}`
  };
  
  
    const readData = async () => {
      try {
          const detail = await AsyncStorage.getItem('userName');
          const details = await AsyncStorage.getItem('userToken');
          const detailss = await AsyncStorage.getItem('firstName');
          const detailsss = await AsyncStorage.getItem('secondName');
          const detailssss = await AsyncStorage.getItem('userEmail');
          const detailsssss = await AsyncStorage.getItem('userPhone');
          // const detailss = await AsyncStorage.getItem('userEmail');
          
  
          if (detail !== null) {
              // const firstName = detail.split(' ')[0];
              setName(detail);
  
          }
  
          // if (detailss !== null) {
          //     // const firstName = detail.split(' ')[0];
          //     setEmail(detailss);
  
          // }
  
  
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
  
  
    const handleSTinChange = (e) => {
      setSTin(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      window.location.reload();
    //   alert(`Taxpayer: ${isTaxpayer}, S-TIN: ${sTin}`);
    };

    const handleSignup = async () => {
      setLoading(true);
      setShowErrorMessage(false);
    
      try {
        const response = await axios.post(
          `${BASE_URL}/customer_registration`,
          {
            registration_type: selectedOption,
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            state: selectedState || stateInput,
            dob: dob,
            address: address,
            nationality: selectedCountry,
            gender: selectedGender,
            marital_status: selectedMaritalStatus,
            nin: inputValue
          }, // Data payload
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${bearer}`,
            },
          } // Config for headers
        );
    
        // Navigate to the next page
        navigate('/signup/nin_success');
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
    
          setErrorMessage(errorMessage);
          setShowErrorMessage(true);
        }
      } finally {
        setLoading(false);
      }
    };

    const isButtonDisabled = loading || !sTin || taxLoading;

    const handleNext = () => {
      navigate("/signup/nin_success");
    };

    const validateTaxPayer = async () => {
      setTaxLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/verify-tin`, {
          params: { 
            tin: sTin, 
            type: selectedOption 
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearer}`,
          },
        });
    
        const responseData = response.data;
       setResponseMessage(responseData?.message);
       setShowResponseMessage(true);
      } catch (error) {
        setResponseMessage(error.response?.data?.message);
        setShowErrorMessage1(true);
        setSTin("");
        console.log(error.response?.data?.message);
      
    
      } finally {
        setTaxLoading(false);
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
    
    return (
        <div>
            {/* <div className={classes.navbar}>
            <img src={logo} alt="Olarms Logo" className={classes.logoimage} />
                <div className={classes.navR}>
                <img src={left} alt="Left Icon" className={classes.lefticon} />
                   <p className={classes.navTxt}>Go back</p>
                </div>
            </div> */}
           <div className={classes.mainlayout}>
            <div className={classes.progressbar}>
            <img src={greenrect} alt="Green Progress Bar Icon" className={classes.greenicon} />
            <img src={greenrectan} alt="Green Progress Bar Icon" className={classes.greenicon} />
            <img src={greenrect} alt="Green Progress Bar Icon" className={classes.greenicon} />
            </div>
            <div>

             <div className={classes.formlayout}>
           <form onSubmit={handleSubmit}>
      <div className="mb-3">
      <h3  className={classes.formT}>Tax Information</h3>
        <label htmlFor="taxpayer" className={classes.textstyle}>
          Are You a Taxpayer?
        </label>
        <select
        style={{
            padding: "10px",
            height: '56px',
            width: "500px",
          }}
          id="taxpayer"
          className="form-select"
          value={isTaxpayer}
          onChange={handleTaxpayerChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {isTaxpayer === "Yes" && (
        <div className="mb-3">
          <label htmlFor="sTin" className={classes.textstyle}>
            S-TIN
          </label>
          <input
            type="text"
            id="sTin"
            style={{
            padding: "10px",
            height: '56px',
            width: "500px",
          }}
            className="form-control"
            placeholder="Enter S-TIN"
            value={sTin}
            onChange={handleSTinChange}
            onBlur={handleBlur}
          />
        </div>
        
      )}

{taxLoading && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                            <Spinner size='sm' />
                                            <span style={{ marginLeft: 5 }}>Verifying... please wait</span>
                                        </div>
                                    )}

{showErrorMessage1 && (
  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
    <img src={Invalid} alt="Invalid Tin" style={{ width: '20px', height: '20px' }} />
    <span style={{color: "red", fontSize: 14, fontWeight: 500}}>{responseMessage}</span>
  </div>
)}

{showResponseMessage && (
  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
    <img src={Valid} alt="Valid Tax" style={{ width: '20px', height: '20px' }} />
    <span style={{color: "green", fontSize: 14, fontWeight: 500}}>{responseMessage}</span>
  </div>
)}

      <Button  type="submit" style={{
            display: isTaxpayer === "No"  ? "none": "block" ,
            padding: "10px 20px",
            fontSize: "16px",
            textAlign: "center",
            border: "none",
            marginTop: "10px",
            cursor: 'pointer',
            backgroundColor: isTaxpayer === "Yes" ? "#21B55A" : " #21B55A66",
            color: "white",
            height: '40px',
            width: '-webkit-fill-available',
            borderRadius: "8px",
          }} className={classes.btntxt}disabled   onClick={handleSignup}>
        {loading ? (
                            <>
                                <Spinner size='sm' />
                                <span style={{ marginLeft: '5px' }}>Signing up...</span>
                            </>
                        ) : (
                            "Submit"
                        )}         
      </Button>
      <button
  type="submit"
  style={{
    display: isTaxpayer === "No" ? "block" : "none",
    padding: "10px 20px",
    fontSize: "16px",
    textAlign: "center",
    marginTop: "10px",
    cursor: "pointer",
    backgroundColor: "#21B55A",
    color: "white",
    height: "40px",
    width: "100%", // Changed from '-webkit-fill-available' for better compatibility
    borderRadius: "8px",
  }}
  className={classes.btntxt}
  onClick={() => window.open("https://portal.ogetax.ogunstate.gov.ng/#register", "_blank")}
>
  Register for S-TIN
</button>

    </form>

            </div>

            </div>

            </div>

        </div>
    )

} 

export default Taxpayer;