import React, { useEffect, useState } from "react";
import classes from "./CooprateInformation.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import errorIcon from '../../../Assets/error.svg';
import SubHeader from "../../../Components/SubHeader/SubHeader";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../../API/Api";
import axios from "axios";
import Valid from '../../../Assets/valid.png';
import Invalid from '../../../Assets/invalid.png';

const initialState = () => {
  return [{ name: '', email: '', phone: '', nin: ''}];
};

export const CopInformation = () => {
  const [businessTaxError, setBusinessTaxError] = useState('');
  const [taxLoading, setTaxLoading] = useState(false);
  const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [formData, setFormData] = useState(initialState);
    const [bearer, setBearer] = useState('');
      const [firstName, setFirstName] = useState('');
      const [lastName, setLastName] = useState('');
    const [orgName, setOrgName] = useState('');
    const [orgPhone, setOrgPhone] = useState('');
    const [orgEmail, setOrgEmail] = useState('');
    const [orgAddress, setOrgAddress] = useState('');
    const [cac, setCac] = useState('');
    const [tin, setTin] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [stin, setStin] = useState('');
    const [email, setEmail] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedBusinessType, setSelectedBusinessType] = useState('');
    const [selectedBusinessCategory, setSelectedBusinessCategory] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessage1, setErrorMessage1] = useState("");
        const [showErrorMessage, setShowErrorMessage] = useState(false);
        const [showErrorMessage1, setShowErrorMessage1] = useState(false);
        const [showResponseMessage, setShowResponseMessage] = useState(false);
    const navigate = useNavigate();
    const selectedOption = location.state?.selectedOption || '';
   
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearer}`
  };
  
  const readData = async () => {
    try {
        const detail = await AsyncStorage.getItem('firstName');
        const detailsd = await AsyncStorage.getItem('secondName');
        const details = await AsyncStorage.getItem('userToken');
        const detailss = await AsyncStorage.getItem('userEmail');
        

        if (detail !== null) {
            // const firstName = detail.split(' ')[0];
            setFirstName(detail);

        }
        if (detailsd !== null) {
            // const firstName = detailsd.split(' ')[0];
            setLastName(detailsd);

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

const handleSignup = async () => {
  setLoading(true);
  setShowErrorMessage(false);

  try {
    const names = formData.map((row) => row.name).filter((name) => name !== undefined);
    const phones = formData.map((row) => row.phone).filter((name) => name !== undefined);
    const emails = formData.map((row) => row.email).filter((name) => name !== undefined);
    const nins = formData.map((row) => row.nin).filter((name) => name !== undefined);

    const response = await axios.post(
      `${BASE_URL}/customer_registration`,
      {
        first_name: firstName,
        last_name: lastName,
    registration_type: selectedOption, 
    business_name: orgName, 
    phone_number: orgPhone, 
    email:orgEmail, 
    rc_number:cac, 
    date_incorporated: selectedDate,
     tin:tin, 
     stin:stin, 
     business_type: selectedBusinessType,
    business_industry: selectedBusinessCategory,
    company_address: orgAddress,
    director_name: names,
    director_email: emails,
    director_phone: phones,
    director_nin: nins
      }, // Data payload
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearer}`,
        },
      } // Config for headers
    );

    // Navigate to the next page
    navigate('/completed_registration_successful');
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

const handleOrgName = (e) => {
  setOrgName(e.target.value);
  setShowErrorMessage(false);
};
const handleOrgEmail = (e) => {
  setOrgEmail(e.target.value);
  setShowErrorMessage(false);
};
const handleOrgPhone = (e) => {
  setOrgPhone(e.target.value);
  setShowErrorMessage(false);
};
const handleOrgAddress = (e) => {
  setOrgAddress(e.target.value);
  setShowErrorMessage(false);
};
const handleCac = (e) => {
  setCac(e.target.value);
  setShowErrorMessage(false);
};
const handleTin = (e) => {
  setTin(e.target.value);
  setShowErrorMessage(false);
};
const handleDate = (e) => {
  setSelectedDate(e.target.value);
  setShowErrorMessage(false);
};
const handleStin = (e) => {
  setStin(e.target.value);
  setShowErrorMessage(false);
  // setShowErrorMessage1(false);
};
const handleBusinessType = (e) => {
  setSelectedBusinessType(e.target.value);
  setShowErrorMessage(false);
};
const handleBusinessCategory = (e) => {
  setSelectedBusinessCategory(e.target.value);
  setShowErrorMessage(false);
};

const handleInputChange = (index, field, value) => {
  const updatedFormData = [...formData];
  updatedFormData[index][field] = value;
  setFormData(updatedFormData);
};


const addRow = () => {
  const newRow = {
    name: '', email: '', phone: '', nin: ''
  };
  setFormData([...formData, newRow]);
};

const deleteRow = (index) => {
  const updatedData = formData.filter((_, i) => i !== index);
  setFormData(updatedData);
};

const validateTaxPayer = async () => {
  setTaxLoading(true);
  try {
    const response = await axios.get(`${BASE_URL}/verify-tin`, {
      params: { 
        tin: stin, 
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
    setStin("");
    console.log(error.response?.data?.message);
  

  } finally {
    setTaxLoading(false);
  }
};


const handleBlur = async () => {
  if (!stin) {
    setShowErrorMessage1(false);
    setShowResponseMessage(false);
    return;
  }

  setShowErrorMessage1(false);
  setShowResponseMessage(false);

  await validateTaxPayer(); // `stin` will be cleared inside validateTaxPayer if there’s an error
};





const isButtonDisabled = !orgName || !orgAddress || loading;

  return (
    <div>
     <div style={{position:"sticky",top:0,zIndex:'1'}}>
      <SubHeader />
     </div>
  
      <div className={classes.maincontainer}>
        <div className={classes.maintext}>

        <div className={classes.formlayout}>
          <h1 style={{marginBottom: '16px'}}> Corporate Information <span className={classes.required}>* required</span> </h1>
          <hr />
          <Row style={{marginTop: 50}}>
  <Col md={6}>
    <Form.Group>
      <Form.Label htmlFor="firstName">Contact First Name <span className={classes.required}>*</span></Form.Label>
      <Form.Control value={firstName} disabled size="lg" type="text" id="fullname" className={classes.passDn} />
    </Form.Group>
  </Col>
  <Col md={6}>
    <Form.Group>
      <Form.Label htmlFor="lastName">Contact Last Name <span className={classes.required}>*</span></Form.Label>
      <Form.Control value={lastName} disabled size="lg" type="text" id="phnNumber" className={classes.passDn} />
    </Form.Group>
  </Col>
</Row>
          <Row >
  <Col md={6}>
    <Form.Group>
      <Form.Label htmlFor="fullname">Organization Name <span className={classes.required}>*</span></Form.Label>
      <Form.Control onChange={handleOrgName} size="lg" type="text" id="fullname" className={classes.passDn} />
    </Form.Group>
  </Col>
  <Col md={6}>
    <Form.Group>
      <Form.Label htmlFor="phnNumber">Primary Phone Number <span className={classes.required}>*</span></Form.Label>
      <Form.Control onChange={handleOrgPhone} size="lg" type="text" id="phnNumber" className={classes.passDn} />
    </Form.Group>
  </Col>
</Row>

<Row>
  <Col md={6}>
    <Form.Group>
      <Form.Label htmlFor="emailAdd">Business Email Address <span className={classes.required}>*</span></Form.Label>
      <Form.Control onChange={handleOrgEmail} size="lg" type="text" id="emailAdd" className={classes.passDn} />
    </Form.Group>
  </Col>
  <Col md={6}>
    <Form.Group>
      <Form.Label htmlFor="cacregnumber">Corporate Registration Number (CAC) <span className={classes.required}>*</span></Form.Label>
      <Form.Control onChange={handleCac} size="lg" type="text" id="cacregnumber" className={classes.passDn} />
    </Form.Group>
  </Col>
</Row>

<Row>
  <Col md={6}>
    <Form.Group>
      <Form.Label htmlFor="stin">S-TIN <span className={classes.required}>*</span></Form.Label>
      <Form.Control value={stin} onChange={handleStin} size="lg" type="text" id="stin" className={classes.passDn} onBlur={handleBlur}/>
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

    </Form.Group>
    
  </Col>
  <Col md={6}>
    <Form.Group>
      <Form.Label htmlFor="stin">Tax Identification Number (TIN) <span className={classes.required}>*</span></Form.Label>
      <Form.Control onChange={handleTin} size="lg" type="text" id="stin" className={classes.passDn} />
    </Form.Group>
  </Col>
  
</Row>

<Row>
<Col md={6}>
    <Form.Group>
      <Form.Label>Type of Business <span className={classes.required}>*</span></Form.Label>
      <Form.Select onChange={handleBusinessType} className={`form-select ${classes.optioncss}`} required>
        <option value="" selected disabled>Select type of business</option>
        <option value="sole-proprietorship">Sole Proprietorship</option>
        <option value="partnership">Partnership</option>
      </Form.Select>
    </Form.Group>
  </Col>

  <Col md={6}>
    <Form.Group>
      <Form.Label>Business Category/Industry <span className={classes.required}>*</span></Form.Label>
      <Form.Select onChange={handleBusinessCategory} className={`form-select ${classes.optioncss}`} required>
        <option value="" selected disabled>Select Business Category/Industry</option>
        <option value="health">Health</option>
        <option value="agric">Agribusiness</option>
        <option value="real estate">Real Estate</option>
        <option value="technology">Technology</option>
        <option value="media">Media and Entertainment</option>
        <option value="retail">Retail and E-Commerce</option>
        <option value="transportation">Transportation and Logistics</option>
        <option value="others">Others</option>
      </Form.Select>
    </Form.Group>
  </Col>
  
 
</Row>

<Row>
<Col md={6}>
    <Form.Group>
      <Form.Label  htmlFor="businessaddress">Date of Incorporation <span className={classes.required}>*</span></Form.Label>
      <Form.Control onChange={handleDate} size="lg" type="date" id="businessaddress" className={classes.passDn} />
    </Form.Group>
  </Col>
<Col md={6}>
    <Form.Group>
      <Form.Label  htmlFor="businessaddress">Registered Business Address <span className={classes.required}>*</span></Form.Label>
      <Form.Control onChange={handleOrgAddress} size="lg" type="text" id="businessaddress" className={classes.passDn} />
    </Form.Group>
  </Col>

  
</Row>
<Row>
<Col md={6}>
    <Form.Group>
      <Form.Label htmlFor="branchaddress">Operational/Branch Address (if different) <span className={classes.required}>*</span></Form.Label>
      <Form.Control size="lg" type="text" id="branchaddress" className={classes.passDn} />
    </Form.Group>
  </Col>

  
</Row>


<h1 style={{marginBottom: '16px'}}> Directors' Information </h1>
<hr />
<div className="row" style={{ maxWidth: "100%", marginTop: 10 }}>
                  <div className="table-responsive">
                    <table className="table m-0 bg-white display table-bordered table-striped table-hover card-table">
                    <thead style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                        <tr>
                        <th style={{ width: "200px" }}>Name</th>
                        <th style={{ width: "200px" }}>Email Address</th>
                        <th style={{ width: "90px" }}>Phone Number</th>
                        <th style={{ width: "135px" }}>N.I.N</th>
                          <th>
                          <div className="btn btn-sm printbtninv" onClick={() => addRow()}>
                              <i className="fas fa-plus" style={{color: "#17a2b8", backgroundColor: "#afe1e9", padding: 2, borderColor: "#b0d1d6", borderRadius: 5, fontSize: 12}}></i>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody style={{ whiteSpace: "nowrap" }}>
                          {formData.map((row, index) => (
            <tr key={index}>
              <td style={{ width: "200px" }}>
                <Form.Control size="lg" type="text" id="branchaddress" className={classes.passDn} value={row.name} onChange={(e) => handleInputChange(index, "name", e.target.value)} />
              </td>
              <td style={{ width: "200px" }}>
                <Form.Control size="lg" type="text" id="branchaddress" className={classes.passDn} value={row.email}
                    onChange={(e) => handleInputChange(index, "email", e.target.value)} />
              </td>
              <td style={{ width: '70px' }}>
              <Form.Control size="lg" type="text" id="branchaddress" className={classes.passDn} value={row.phone}
                    onChange={(e) => handleInputChange(index, "phone", e.target.value)}/>
              </td>
              <td style={{ width: '100px' }}>
              <Form.Control size="lg" type="text" id="branchaddress" className={classes.passDn} value={row.nin}
                    onChange={(e) => handleInputChange(index, "nin", e.target.value)}/>
              </td>
              <td style={{ textAlign: "center", width: "2rem" }}>
              <div className="btn btn-danger-soft btn-sm" onClick={() => deleteRow(index)}>
                <i className="far fa-trash-alt"  style={{color: "#dc3545", backgroundColor: "#dc35451a", padding: 2, borderColor: "#dc35454d", borderRadius: 5, fontSize: 12}}></i>
                </div>
              </td>
            </tr>
          ))}
                      </tbody>
                    </table>

                  </div>
                </div>
                
                {showErrorMessage === true && (
                          <div className={classes.errorCt}>
                            <p style={{color: "EB0000"}}>{errorMessage}</p>
                            <img src={errorIcon} alt="Hide Password" style={{ height: "20px", width: "20px" }} />
                        </div>
                      )}
<div className={classes.btmBtnCont}>
          <Button disabled={isButtonDisabled} variant="success" className={classes.btngreen} onClick={handleSignup}>
          {loading ? (
                            <>
                                <Spinner size='sm' />
                                <span style={{ marginLeft: '5px' }}>Signing up...</span>
                            </>
                        ) : (
                            "Submit"
                        )}        
          </Button>
        </div>
        </div>
          </div>
      </div>
    </div>
  );
};
