import React , { useEffect, useState }  from "react";
import classes from "./PersonalInformation.module.css";
import SubHeader from "../../../Components/SubHeader/SubHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import errorIcon from '../../../Assets/error.svg';
import greenrect from "../../../Assets/GRectangle.png";
import greenrectan from "../../../Assets/GreenRect.png";
import whiterect from "../../../Assets/WhiteRect.png";
import { BASE_URL } from "../../../API/Api.js";
// import whiterect from "../../../Assets/WhiteRect.png";
import { COUNTRIES, STATES, LGA } from "../../../API/country.js"; 
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const PersonalInformation = () => {
const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [bearer, setBearer] = useState('');
    const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
      const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();
  const selectedOption = location.state?.selectedOption || '';
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [stateInput, setStateInput] = useState("");
  const [lgaInput, setLgaInput] = useState("");
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearer}`
};


  const readData = async () => {
    try {
        const detail = await AsyncStorage.getItem('userName');
        const details = await AsyncStorage.getItem('userToken');
        const detailss = await AsyncStorage.getItem('userEmail');
        

        if (detail !== null) {
            // const firstName = detail.split(' ')[0];
            setName(detail);

        }

        if (detailss !== null) {
            // const firstName = detail.split(' ')[0];
            setEmail(detailss);

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
  
    const handleCountryChange = (e) => {
      const country = e.target.value;
      setSelectedCountry(country);
      setShowErrorMessage(false);
      setSelectedState(""); // Reset state selection
      setStateInput(""); // Reset state text input
      setLgaInput(""); // Reset LGA text input
    };
  
    const handleStateChange = (e) => {
      const state = e.target.value;
      setSelectedState(state);
      setShowErrorMessage(false);
      setLgaInput(""); // Reset LGA text input
    };
  
    const handleStateInputChange = (e) => {
      setStateInput(e.target.value);
      setShowErrorMessage(false);
    };
  
    const handleLgaInputChange = (e) => {
      setLgaInput(e.target.value);
      setShowErrorMessage(false);
    };

  
  const handleNext = () => {
    navigate('/signup/nin', {state: {
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
        selectedMaritalStatus
    }});
  };

  console.log(selectedOption)

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
        }, // Data payload
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearer}`,
          },
        } // Config for headers
      );
  
      // Navigate to the next page
      navigate('/signup/nin', {state: {
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
          selectedMaritalStatus
      }});
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
  const handlePhone = (e) => {
    setPhone(e.target.value);
    setShowErrorMessage(false);
  };
  
  const handleDOB = (e) => {
    setDob(e.target.value);
    setShowErrorMessage(false);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
    setShowErrorMessage(false);
  };
  const handleGender = (e) => {
    setSelectedGender(e.target.value);
    setShowErrorMessage(false);
  };
  const handleStatus = (e) => {
    setSelectedMaritalStatus(e.target.value);
    setShowErrorMessage(false);
  };

  const isButtonDisabled = !address || !firstName || !lastName || !selectedCountry || loading;
  return (
    <div>
      <div style={{ position: "sticky", top: 0, zIndex: "1" }}>
        <SubHeader />
      </div>
      <div className={classes.progressbar}>
          <img
            src={greenrect}
            alt="Green Progress Bar Icon"
            className={classes.greenicon}
          />
          <img
            src={whiterect}
            alt="Green Progress Bar Icon"
            className={classes.greenicon}
          />
          <img
            src={whiterect}
            alt="White Progress Bar Icon"
            className={classes.whiteicon}
          />
        </div>
      <div className={classes.maincontainer}>
        
        <div className={classes.maintext}>
          <h1> Personal Information </h1>
          <h6> To continue, please complete your registration. <span className={classes.required}>* required</span> </h6>
          <Row>
  <Col md={6}>
    <Form.Label htmlFor="firstName"> First Name <span className={classes.required}>*</span></Form.Label>
    <Form.Control size="lg" type="text" id="firstName" className={classes.passDn} onChange={handleFirstName} />
  </Col>
  <Col md={6}>
    <Form.Label htmlFor="lastName">Last Name <span className={classes.required}>*</span></Form.Label>
    <Form.Control size="lg" type="text" id="lastName" className={classes.passDn} onChange={handleLastName} />
  </Col>
</Row>

<Row>
  <Col md={6}>
    <Form.Label htmlFor="phnNumber">Phone Number <span className={classes.required}>*</span></Form.Label>
    <Form.Control size="lg" type="text" id="phnNumber" className={classes.passDn} onChange={handlePhone} />
  </Col>
  <Col md={6}>
    <Form.Label htmlFor="emailAdd">Email Address <span className={classes.required}>*</span></Form.Label>
    <Form.Control size="lg" type="text" id="emailAdd" className={classes.passDn} value={email} disabled />
  </Col>
</Row>
<Row>
  <Col md={12}>
    <Form.Label htmlFor="rsda">Residential Address <span className={classes.required}>*</span></Form.Label>
    <Form.Control size="lg" type="text" id="rsda" className={classes.passDn} onChange={handleAddress} />
  </Col>
</Row>
<Row>
  <Col md={6}>
    <Form.Label htmlFor="dob">Date of Birth <span className={classes.required}>*</span></Form.Label>
    <Form.Control size="lg" type="date" id="dob" className={classes.passDn} onChange={handleDOB} />
  </Col>
  <Col md={6}>
    <Form.Group>
      <Form.Label className={classes.inputLabel}>Gender <span className={classes.required}>*</span></Form.Label>
      <select id="gender-type" name="genderType" className={`form-select ${classes.optioncss}`} required onChange={handleGender}>
        <option value="" selected disabled>Select gender type</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </Form.Group>
  </Col>
</Row>

<Row>
  <Col md={6}>
    <Form.Group>
      <Form.Label className={classes.inputLabel}>Marital Status <span className={classes.required}>*</span></Form.Label>
      <select id="marital-type" name="maritalType" className={`form-select ${classes.optioncss}`} required onChange={handleStatus}>
        <option value="" selected disabled>Select marital status</option>
        <option value="married">Married</option>
        <option value="single">Single</option>
        <option value="divorced">Divorced</option>
        <option value="widowed">Widowed</option>
      </select>
    </Form.Group>
  </Col>
  <Col md={6}>
    <Form.Group controlId="country">
      <Form.Label className={classes.inputLabel}>Nationality <span className={classes.required}>*</span></Form.Label>
      <Form.Control as="select" value={selectedCountry} className={`form-select ${classes.optioncss}`} required onChange={handleCountryChange}>
        <option value="">Select Country</option>
        {COUNTRIES.map((country, index) => (
          <option key={index} value={country}>{country}</option>
        ))}
      </Form.Control>
    </Form.Group>
  </Col>
</Row>

<Row>
  <Col md={6}>
    <Form.Group controlId="soo">
      <Form.Label className={classes.inputLabel}>State of Origin <span className={classes.required}>*</span></Form.Label>
      {selectedCountry === "Nigeria" ? (
        <Form.Control as="select" value={selectedState} onChange={handleStateChange} className={`form-select ${classes.optioncss}`} required>
          <option value="">Select State</option>
          {STATES.map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </Form.Control>
      ) : (
        <Form.Control type="text" placeholder="Enter State of Origin" value={stateInput} className={classes.passDn} onChange={handleStateInputChange} required />
      )}
    </Form.Group>
  </Col>
  <Col md={6}>
    <Form.Group controlId="lga">
      <Form.Label className={classes.inputLabel}>Local Government Area (LGA) <span className={classes.required}>*</span></Form.Label>
      {selectedState === "Ogun" ? (
        <Form.Control as="select" className={`form-select ${classes.optioncss}`} required>
          <option value="">Select LGA</option>
          {LGA.map((lga, index) => (
            <option key={index} value={lga}>{lga}</option>
          ))}
        </Form.Control>
      ) : (
        <Form.Control type="text" required placeholder="Enter Local Government Area" value={lgaInput} className={classes.passDn} onChange={handleLgaInputChange} />
      )}
    </Form.Group>
  </Col>
</Row>

           {showErrorMessage === true && (
                          <div className={classes.errorCt}>
                            <p style={{color: "EB0000"}}>{errorMessage}</p>
                            <img src={errorIcon} alt="Hide Password" style={{ height: "20px", width: "20px" }} />
                        </div>
                      )}
                      <div className={classes.btmBtnCont}>
          <Button disabled={isButtonDisabled} variant="success" className={classes.btngreen}  onClick={handleNext}>
          {loading ? (
                            <>
                                <Spinner size='sm' />
                                <span style={{ marginLeft: '5px' }}>Signing up...</span>
                            </>
                        ) : (
                            "Next"
                        )}         
          </Button>
        </div>
        </div>
      </div>
    </div>
  );
};
