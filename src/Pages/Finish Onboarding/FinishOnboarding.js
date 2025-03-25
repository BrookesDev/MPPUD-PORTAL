import React, { useState, useEffect,useRef } from "react";
import DashboardNav from "../../Components/Navigation.js/Navigation";
import Horheader from "../../Components/horheader/horheader";
import ProfileIcon from "../../Asset/Profile Icon.png";
import classes from "./FinishOnboarding.module.css";
import UploadIcon from "../../Asset/upload.png";
import ImageIcon from "../../Asset/piclogo.png";
import Swal from "sweetalert2";
import {
  Spinner,
  Badge,
  Modal,
  Form,
  Tabs,
  Tab,
  Pagination,
  Row,
  Col,
} from "react-bootstrap";
import { Navbar, Container, Button } from "react-bootstrap";
import CameraIcon from "../../Asset/camera.png";
// import ProfileIcon from "../../Asset/profile.png";
import DeleteIcon from "../../Asset/delete.png";
import MasterIcon from "../../Asset/master.png";
import VisaIcon from "../../Asset/visa.png";
import EmailIcon from "../../Asset/email.png";
import CallIcon from "../../Asset/call.png";
import LocationIcon from "../../Asset/location.png";
import FbIcon from "../../Asset/fb.png";
import XIcon from "../../Asset/x.png";
import IgIcon from "../../Asset/ig.png";
import { BASE_URL } from "../../API/Api";
import axios from "axios";
import Calender from "../../Asset/caln.png";
import { useLocation, useNavigate } from "react-router-dom";
import FirstIcon from "../../Asset/import.png";
import SecondIcon from "../../Asset/repeat-circle.png";
import ThirdIcon from "../../Asset/3.png";
import FourthIcon from "../../Asset/4.png";
import { Link } from "react-router-dom";

import PaidIcon from "../../Asset/completed.png";
import NotPaidIcon from "../../Asset/npaid.png";
import ReviewIcon from "../../Asset/review.png";
import Pending from "../../Asset/Pending.png";
import MoreIcon from "../../Asset/more.png";
import DownloadIcon from "../../Asset/download.png";
import TrackIcon from "../../Asset/track.png";
import ContactIcon from "../../Asset/support.png";

import makePay from "../../Asset/make-payment.svg";
import exports from "../../Asset/export-icon.svg";
import download from "../../Asset/download-icon.svg";
import invoice from "../../Asset/view-invoice.svg";
import Location from './Location.json'
// import localStorage from "@react-native-async-storage/async-storage";

// import axios from 'axios';
// import localStorage from '@react-native-async-storage/async-storage';

const FinishOnboarding = () => {
  const navigate = useNavigate();
  const [errorMessage1, setErrorMessage1] = useState("");
  
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
   const [imgError1, setImgError1] = useState("");
   const [nationality, setNationality] = useState("");
   const [maritalStatus, setMaritalStatus] = useState("");
    const [fileName, setFileName] = useState("Upload Recent Passport");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [bearer, setBearer] = useState("");
    const [selectedFile2, setSelectedFile2] = useState(null);
  const [userData, setUserData] = useState("");
  const [cac, setCac] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerImage, setCustomerImage] = useState(null);
  const [dateInc, setDateInc] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [customerState, setCustomerState] = useState("");
  const [customerLga, setCustomerLga] = useState("");
  const [stin, setStin] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [nokFirstName, setNokFirstName] = useState("");
  const [nokEmail, setNokEmail] = useState("");
  const [nokPhone, setNokPhone] = useState("");
  const [nokAddress, setNokAddress] = useState("");
  const [nokLastName, setNokLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [nin, setNin] = useState("");
  const [lastName, setLastName] = useState("");
  const [compName, setCompName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [businessIndustry, setBusinessIndustry] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [clockTime, setClockTime] = useState(false);
  const [personal, setPersonal] = useState({});
  const [compAddress, setAddress] = useState("");
  const [compPhone, setcompPhone] = useState("");
  const [CompEmail, setCompEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingg, setLoadingg] = useState(false);
  const [selectedState, setSelectedState] = useState(customerState || "");
  const [selectedLga, setSelectedLga] = useState(customerLga || "");
  const [localGovts, setLocalGovts] = useState([]);

  console.log(customerPhone, typeof customerPhone);


  useEffect(() => {
    // Find LGAs for the selected state
    const stateData = Location.locations.find(
      (loc) => loc.state.toUpperCase() === selectedState.toUpperCase()
    );
    setLocalGovts(stateData ? stateData.localGovt : []);
  }, [selectedState]);

  const handleClockTime = () => {
    setClockTime(!clockTime);
  };

  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleCloses = () => {
    setShowModal(false);
  };

  const handleDeleteConfirm = () => {
    // Add your delete logic here
    console.log("Item deleted");
    setShowModal(false);
  };
  const [selectedOption, setSelectedOption] = useState(null);
  const totalPages = 10; // Total number of pages
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleDropdown, setVisibleDropdown] = useState(null);
  const [customerPicture,setCustomerPicture] = useState("")
  const [businessName,setBusinessName] = useState("")
   const fileInputRef = useRef(null);

   const handleClick = () => {
    fileInputRef.current.click();
  };

  const readData = async () => {
    try {
      const detail = await localStorage.getItem("userType");
      const details = await localStorage.getItem("userToken");
      const detailss = await localStorage.getItem("cac");
      const detailsss = await localStorage.getItem("userName");
      const businessName = await localStorage.getItem("businessName");
      const add = await localStorage.getItem("add");
      const inc = await localStorage.getItem("incorporationDate");
      const em = await localStorage.getItem("em");
      const ph = await localStorage.getItem("ph");
      const st = await localStorage.getItem("st");
      const lg = await localStorage.getItem("lg");
      const tin = await localStorage.getItem("tin");
      const nin = await localStorage.getItem("nin");
      const dateOfBirth = await localStorage.getItem("dateOfBirth");
      const gender = await localStorage.getItem("gender");
      const firstName = await localStorage.getItem("firstName");
      const secondName = await localStorage.getItem("secondName");
      const customerImage = await localStorage.getItem("customerImage");
      const customerPicture = await localStorage.getItem("customerPicture");
      
      console.log(customerImage)
      if (details !== null) {
        setBearer(details);
      }
      if (nin !== null) {
        setNin(nin);
      }
      if (businessName !== null) {
        setBusinessName(businessName);
      }
      if (dateOfBirth !== null) {
        setDateBirth(dateOfBirth);
      }
      if (customerImage !== null) {
        setCustomerImage(customerImage);
      }
      if (customerPicture !== null) {
        setCustomerPicture(customerPicture);
        console.log(customerPicture);
      }
      if (gender !== null) {
        setGender(gender);
      }
      if (firstName !== null) {
        setFirstName(firstName);
      }
      if (secondName !== null) {
        setLastName(secondName);
      }
      if (detail !== null) {
        setUserData(detail);
      }
      if (detailsss !== null) {
        setCustomerName(detailsss);
      }
      if (detailss !== null) {
        setCac(detailss);
      }
      if (add !== null) {
        setCustomerAddress(add);
      }
      if (inc !== null) {
        setDateInc(inc);
      }
      if (em !== null) {
        setCustomerEmail(em);
      }
      if (tin !== null) {
        setStin(tin);
      }
      if (ph !== null) {
        setCustomerPhone(ph);
      }
      if (st !== null) {
        setCustomerState(st);
      }
      if (lg !== null) {
        setCustomerLga(lg);
      }
    } catch (e) {
      alert("Failed to fetch the input from storage");
    }
  };

  useEffect(() => {
    readData();
  }, []);

  const statesInNigeria = [
    "Ogun",
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",

    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "FCT (Federal Capital Territory)",
  ];

  const ogunStateLGAs = [
    "Abeokuta North",
    "Abeokuta South",
    "Ado-Odo/Ota",
    "Ewekoro",
    "Ifo",
    "Ijebu East",
    "Ijebu North",
    "Ijebu North East",
    "Ijebu Ode",
    "Ikenne",
    "Imeko Afon",
    "Ipokia",
    "Obafemi Owode",
    "Odeda",
    "Odogbolu",
    "Ogun Waterside",
    "Remo North",
    "Shagamu",
    "Yewa North",
    "Yewa South",
  ];

  const handleFileChange2 = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setImgError1("File is larger than 2MB. Max upload size is 2MB.");
        setFileName("");
        return;
      } // Get the first selected file
      setFileName(file.name); // Set the file name
      setSelectedFile2([file]);
      setImgError1(""); // Store the file in state
    }
  };

  const createApplication = async () => {
    setCreateLoading(true);
    try {
      const formData = new FormData();
   
      formData.append("photo", selectedFile2[0]);
    

      
      const response = await axios.post(
        `${BASE_URL}/customer/update`,
        formData,
        { headers: 
         {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${bearer}`,
          }
    
         }
      );

     
    
      console.log(response.data.message);
    } catch (error) {
      let errorMessage = "An error occurred. Please try again.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        if (typeof error.response.data.message === "string") {
          errorMessage = error.response.data.message;
        } else if (Array.isArray(error.response.data.message)) {
          errorMessage = error.response.data.message.join("; ");
        } else if (typeof error.response.data.message === "object") {
          errorMessage = JSON.stringify(error.response.data.message);
        }
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: JSON.stringify(error.response.data.message),
        });
      }
    } finally {
      setCreateLoading(false);
    }
  };


const corpDisable =  !customerAddress || !nationality || !selectedState || !selectedLga

const validateFields = () => {
  let newErrors = {};

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!customerAddress) newErrors.customerAddress = "Customer address is required.";
  if (!nationality) newErrors.nationality = "Nationality is required.";
  if (!maritalStatus) newErrors.maritalStatus = "Marital status is required.";
  if (nationality === "nigerian" && !selectedState) {
    newErrors.selectedState = "State is required.";
  }

  // Show LGA error only if nationality is "nigerian" AND state is selected but LGA is empty
  if (nationality === "nigerian" && selectedState && !selectedLga) {
    newErrors.selectedLga = "LGA is required.";
  }

  if (!compName) newErrors.compName = "Company name is required.";
  if (!businessIndustry) newErrors.businessIndustry = "Business industry is required.";
  if (!compAddress) newErrors.compAddress = "Company address is required.";
  if (!compPhone) newErrors.compPhone = "Company phone is required.";

  if (!CompEmail) {
    newErrors.CompEmail = "Company email is required.";
  } else if (!emailRegex.test(CompEmail)) {
    newErrors.CompEmail = "Invalid company email address.";
  }

  if (!jobTitle) newErrors.jobTitle = "Job title is required.";
  if (!nokFirstName) newErrors.nokFirstName = "Next of kin first name is required.";
  if (!nokLastName) newErrors.nokLastName = "Next of kin last name is required.";
  if (!nokPhone) newErrors.nokPhone = "Next of kin phone is required.";
  if (!nokAddress) newErrors.nokAddress = "Next of kin address is required.";

  if (!nokEmail) {
    newErrors.nokEmail = "Next of kin email is required.";
  } else if (!emailRegex.test(nokEmail)) {
    newErrors.nokEmail = "Invalid next of kin email address.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0; // Returns true if no errors
};


const validateFields1 = () => {
  let newErrors = {};

  if (!customerAddress) newErrors.customerAddress = "Business address is required.";
  if (!nationality) newErrors.nationality = "Nationality is required.";

  // Show state error only if nationality is "nigerian"
  if (nationality === "nigerian" && !selectedState) {
    newErrors.selectedState = "State is required.";
  }

  // Show LGA error only if nationality is "nigerian" AND state is selected but LGA is empty
  if (nationality === "nigerian" && selectedState && !selectedLga) {
    newErrors.selectedLga = "LGA is required.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0; // Returns true if no errors
};


const createInformation = async () => {
  setLoading(true);
  setErrors({}); // Clear previous errors

  if (!validateFields()) {
    
    setLoading(false); // Stop loading if errors exist
    return;
  }

  try {
    const formData = new FormData();
    if (selectedFile2 && selectedFile2.length > 0) {
      formData.append("image", selectedFile2[0]);
    }
    // formData.append('email', customerEmail);
    formData.append('phone', customerPhone);
    formData.append('dob', dateBirth);
    formData.append('address', customerAddress);
    formData.append('gender', gender);
    formData.append('state', selectedState);
    formData.append('lga', selectedLga);
    formData.append('business_name', compName);
    formData.append('business_industry', businessIndustry);
    formData.append('company_address', compAddress);
    formData.append('company_phone', compPhone);
    formData.append('company_email', CompEmail);
    formData.append('job_title', jobTitle);
    formData.append('marital_status', maritalStatus);
    formData.append('kin_first_name', nokFirstName);
    formData.append('kin_last_name', nokLastName);
    formData.append('kin_phone', nokPhone);
    formData.append('kin_address', nokAddress);
    formData.append('kin_email', nokEmail);

    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${bearer}`,
    };

    const response = await axios.post(`${BASE_URL}/customer/update`, formData, { headers });

    console.log(response.data.message);
    navigate('/login');

  } catch (error) {
    let errorMessage = 'An error occurred. Please try again.';
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = typeof error.response.data.message === 'string' 
        ? error.response.data.message 
        : JSON.stringify(error.response.data.message);

      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: errorMessage,
      });
    }
  } finally {
    setLoading(false);
  }
};
const createInformation3 = async () => {
  setLoadingg(true);

  try {
    const formData = new FormData();
    if (selectedFile2 && selectedFile2.length > 0) {
      formData.append("image", selectedFile2[0]);
    }
    // formData.append('email', customerEmail);
    formData.append('phone', customerPhone);
    formData.append('dob', dateBirth);
    formData.append('address', customerAddress);
    formData.append('gender', gender);
    formData.append('state', selectedState);
    formData.append('lga', selectedLga);
    formData.append('business_name', compName);
    formData.append('business_industry', businessIndustry);
    formData.append('company_address', compAddress);
    formData.append('company_phone', compPhone);
    formData.append('company_email', CompEmail);
    formData.append('job_title', jobTitle);
    formData.append('marital_status', maritalStatus);
    formData.append('kin_first_name', nokFirstName);
    formData.append('kin_last_name', nokLastName);
    formData.append('kin_phone', nokPhone);
    formData.append('kin_address', nokAddress);
    formData.append('kin_email', nokEmail);

    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${bearer}`,
    };

    const response = await axios.post(`${BASE_URL}/customer/save-data`, formData, { headers });

    console.log(response.data.message);
    navigate('/login');

  } catch (error) {
    let errorMessage = 'An error occurred. Please try again.';
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = typeof error.response.data.message === 'string' 
        ? error.response.data.message 
        : JSON.stringify(error.response.data.message);

      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: errorMessage,
      });
    }
  } finally {
    setLoadingg(false);
  }
};



  const createInformation2 = async () => {
    setLoading(true);
    setErrors({}); // Clear previous errors
  
    if (!validateFields1()) {
      
      setLoading(false); // Stop loading if errors exist
      return;
    }
  
    try {
      const formData = new FormData();
    
    
      // formData.append('business_name', businessName);
      // formData.append('date_incorporated', dateInc);
      formData.append('company_address', customerAddress);
      // formData.append('company_phone', customerPhone);
      // formData.append('company_email', customerEmail);
      formData.append('nationality', nationality);
      formData.append('state', selectedState);
      formData.append('lga', selectedLga);

     
  

  
      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${bearer}`,
      };
  
      const response = await axios.post(`${BASE_URL}/corporate/update-details`,
        formData,
        { headers }
      );
      
      console.log(response.data.message)

     
  
 navigate('/login');
      
      // return
      console.log(response.data);

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

        // setErrorMessage(JSON.stringify(error.response.data.message));
        // setShowErrorMessage(true);
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: JSON.stringify(error.response.data.message),
        });
      }
    } finally {
      setLoading(false);
    }
  };
  const createInformation4 = async () => {
    setLoadingg(true);
    
  
    try {
      const formData = new FormData();
    
    
      // formData.append('business_name', businessName);
      // formData.append('date_incorporated', dateInc);
      formData.append('company_address', customerAddress);
      // formData.append('company_phone', customerPhone);
      // formData.append('company_email', customerEmail);
      formData.append('nationality', nationality);
      formData.append('state', selectedState);
      formData.append('lga', selectedLga);

     
  

  
      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${bearer}`,
      };
  
      const response = await axios.post(`${BASE_URL}/corporate/save-data`,
        formData,
        { headers }
      );
      
      console.log(response.data.message)

     
  
 navigate('/login');
      
      // return
      console.log(response.data);

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

        // setErrorMessage(JSON.stringify(error.response.data.message));
        // setShowErrorMessage(true);
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: JSON.stringify(error.response.data.message),
        });
      }
    } finally {
      setLoadingg(false);
    }
  };

  return (
    <>
      <div className={classes.appcontainer}>
        {/* <div className={classes.sidenav}>
          <Navbar expand="lg" className={`d-none d-md-block ${classes.navbar}`}>
            <Container fluid></Container>
          </Navbar>
          <Navbar
            bg="light"
            expand={false}
            className={`d-md-none ${classes.bglight}`}
          >
            <Container fluid>
              <Button
                style={{ backgroundColor: "#21B55A", border: "none" }}
                variant="success"
                onClick={handleShow}
              >
                ☰
              </Button>
            </Container>
          </Navbar>
          <DashboardNav show={show} handleClose={handleClose} />
        </div> */}

        <div className={classes.maincontent}>
          {/* <div className={classes.mobileHeader}>
            <Horheader />
          </div> */}
          <div className={classes.dashBoardCont}>
            <div className={classes.usrwlcm}>
              {/* <div>
                <p className={classes.wlcm}>Settings</p>
              </div> */}
            </div>
<h1 style={{marginTop: 20, fontSize: 25, fontWeight: 700, }}>WELCOME, <span style={{color: "#21B55A"}}>{firstName} {lastName}</span> 👋</h1>
            <div className={classes.applicationHistory}>
                  <div className={classes.firstDiv}>
                    <div className={classes.firstInfo}>
                      <h1>
                        {userData === "corporate"
                          ? "Complete Your Corporate Registration"
                          : "Complete Your Individual Registration"}
                      </h1>
                      <h2>The field with asterik <span style={{color: "red"}}> * </span> is required to complete your onboarding process.</h2>
                    </div>
                    {/* <div className={classes.editDetailsBtn}>
                      <h1>Edit Details</h1>
                    </div> */}
                  </div>
                  <div className={classes.profileContainer}>
                  <img
  // src={customerImage || customerPicture || ProfileIcon}
  src={customerPicture || ProfileIcon}
  className={classes.imgPass}
  alt="profileImage"
  onError={(e) => (e.target.src = ProfileIcon)}
/>

                    {/* <img
        className={classes.profileIcon}
        src={ProfileIcon}
        alt="profile"
      /> */}
                  </div>
                  {/* <div className={classes.cameraPtn}>
      <img
        className={classes.cameraIcon}
        src={CameraIcon}
        alt="camera"
      />
    </div> */}
                  <div className={classes.formCont}>
                    {userData === "individual" && (
                      <Container>
                        <Form>
                          <Row className="mb-3">
                            <Col md={6}>
                              <Form.Group controlId="formInput1">
                                <Form.Label className={classes.formLabel}>
                                  First Name
                                </Form.Label>
                                <Form.Control
                                  className={classes.formInpt}
                                  disabled
                                  value={firstName}
                                  type="text"
                                  placeholder="Toluwani"
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group controlId="formInput2">
                                <Form.Label className={classes.formLabel}>
                                  Last Name
                                </Form.Label>
                                <Form.Control
                                  className={classes.formInpt}
                                  disabled
                                  value={lastName}
                                  type="text"
                                  placeholder="Adekoya"
                                />
                              </Form.Group>
                            </Col>
                          </Row>

                          <Row className="mb-3">
                          <Col md={6}>
                              <Form.Group controlId="formInput5">
                                <Form.Label className={classes.formLabel}>
                                  NIN Number
                                </Form.Label>
                                <Form.Control
                                  disabled
                                  value={nin}
                                  className={classes.formInpt}
                                  type="text"
                                  placeholder="123456789098764"
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group controlId="formInput6">
                                <Form.Label className={classes.formLabel} l>
                                  S-TIN
                                </Form.Label>
                                <Form.Control
                                  disabled
                                  value={stin}
                                  className={classes.formInpt}
                                  type="text"
                                  placeholder="12345678-1234"
                                />
                              </Form.Group>
                            </Col>
                            
                          </Row>

                          <Row className="mb-3">
  <Col md={6}>
    <Form.Group controlId="formInput3">
      <Form.Label className={classes.formLabel}>Email Address</Form.Label>
      <Form.Control
        className={classes.formInpt}
        disabled
        // disabled={customerEmail !== "null"}
        value={customerEmail}
        onChange={(e) => setCustomerEmail(e.target.value)}
        type="email"
        placeholder="adekoyatoluwani5@gmail.com"
      />
    </Form.Group>
  </Col>

  <Col md={6}>
    <Form.Group controlId="formInput4">
      <Form.Label className={classes.formLabel}>Phone Number <span style={{color: "red"}}>*</span></Form.Label>
      <Form.Control
        className={classes.formInpt}
        // disabled={customerPhone !== "null"}
        value={customerPhone === "null" ? "" : customerPhone}
        onChange={(e) => setCustomerPhone(e.target.value)}
        type="tel"
        placeholder="070 1798 1231"
      />
    </Form.Group>
  </Col>
</Row>

<Row className="mb-3">
  <Col md={6}>
    <Form.Group controlId="dob">
      <Form.Label>Date of Birth <span style={{color: "red"}}>*</span></Form.Label>
      <Form.Control
        className={classes.formInpt}
        // disabled={!!dateBirth}
        value={dateBirth === "null" ? "" : dateBirth}
        onChange={(e) => setDateBirth(e.target.value)}
        type="date"
      />
    </Form.Group>
  </Col>

  <Col md={6}>
    <Form.Group controlId="formInput6">
      <Form.Label className={classes.formLabel}>Gender <span style={{color: "red"}}>*</span></Form.Label>
      <Form.Select
        className={classes.formInpt}
        // disabled={!!gender}
        value={gender === "null" ? "" : gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </Form.Select>
    </Form.Group>
  </Col>
</Row>

                          <Row className="mb-3">
                          <Col md={6}>
                              <Form.Group controlId="formInput5">
                                <Form.Label className={classes.formLabel}>
                                  Address <span style={{color: "red"}}>*</span>
                                </Form.Label>
                                <Form.Control
                                  className={classes.formInpt}
                                  // disabled
                                  value={customerAddress === "null" ? "" : customerAddress}
                                  onChange={(e) => setCustomerAddress(e.target.value)}
                                  type="text"
                                  placeholder="Enter address"
                                />
                            {errors.customerAddress && <p style={{ color: 'red' }}>{errors.customerAddress}</p>}
                              </Form.Group>
                            </Col>
                          <Col md={6}>
                              <Form.Group controlId="formInput6">
                                <Form.Label className={classes.formLabel} l>
                                  Marital Status <span style={{color: "red"}}>*</span>
                                </Form.Label>
                                <Form.Select
                                  className={classes.formInpt}
                                  // disabled
                                  value={maritalStatus}
                                  onChange={(e) => setMaritalStatus(e.target.value)}
                                >
                                  <option>Select Status</option>
                                  <option value="single">Single</option>
                                  <option value="married">Married</option>
                                  <option value="separated">Separated</option>
                                  <option value="divorced">Divorced</option>
                                </Form.Select>
                            {errors.maritalStatus && <p style={{ color: 'red' }}>{errors.maritalStatus}</p>}
                              </Form.Group>
                            </Col>
                           
                            
                            
                            
                          </Row>

                          <Row className="mb-3">
                          <Col md={6}>
                              <Form.Group controlId="formInput6">
                                <Form.Label className={classes.formLabel} l>
                                  Nationality <span style={{color: "red"}}>*</span>
                                </Form.Label>
                                <Form.Select
                                  className={classes.formInpt}
                                  // disabled
                                  value={nationality}
                                  onChange={(e) => setNationality(e.target.value)}
                                >
                                  <option>Select nationality</option>
                                  <option value="nigerian">Nigerian</option>
                                  <option value="non-nigerian">Non-Nigerian</option>
                                  
                                </Form.Select>
                            {errors.nationality && <p style={{ color: 'red' }}>{errors.nationality}</p>}
                              </Form.Group>
                            </Col>
                          <Col md={6}>
                              <Form.Group controlId="formInput6">
                                <Form.Label className={classes.formLabel} l>
                                  State {nationality === "nigerian" && <span style={{ color: "red" }}>*</span>}
                                </Form.Label>
                                <Form.Select
                                  className={classes.formInpt}
                                  disabled={nationality === "non-nigerian"}
                                  value={
                                    selectedState
                                  }
                                  onChange={(e) => setSelectedState(e.target.value)}
                                >
                                  <option>Select State</option>
                                  {Location.locations.map((loc) => (
          <option key={loc.state} value={loc.state}>
            {loc.state.toUpperCase()}
          </option>
           ))}
                                </Form.Select>
           {errors.selectedState && <p style={{ color: 'red' }}>{errors.selectedState}</p>}
                              </Form.Group>
                            </Col>
                            
                            
                          </Row>
                          <Row className="mb-3">
                          <Col md={6}>
                              <Form.Group controlId="formInput5">
                                <Form.Label className={classes.formLabel}>
                                  Local Government Area {nationality === "nigerian" && <span style={{ color: "red" }}>*</span>}
                                </Form.Label>
                                <Form.Select
                                  className={classes.formInpt}
                                  disabled={!selectedState}
                                  value={
                                   selectedLga
                                  }
                                  
                                  onChange={(e) => setSelectedLga(e.target.value)}
                                >
                                  <option>Select L.G.A</option>
                                  {localGovts.map((lga) => (
          <option key={lga} value={lga}>
            {lga.toUpperCase()}
          </option>
        ))}
                                </Form.Select>
                            {errors.selectedLga && <p style={{ color: 'red' }}>{errors.selectedLga}</p>}
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                          <Form.Label className={classes.labelTxt}>
                           Upload Recent Passport Photograph 
                          </Form.Label>
                          <div
                            className={classes.fileUpload}
                            onClick={handleClick}
                          >
                            <img
                              src={ImageIcon}
                              alt="icon"
                              className={classes.leftIcon}
                            />
                            <span className={classes.uploadText}>
                              {fileName.length > 30
                                ? fileName.slice(0, 30) + "..."
                                : fileName}
                            </span>
                            <div className={classes.uploadButton}>
                              <img
                                src={UploadIcon}
                                alt="upload"
                                className={classes.uploadIcon}
                              />
                            </div>
                            <input
                              type="file"
                              accept=".jpeg,.jpeg,.png"
                              ref={fileInputRef}
                              onChange={handleFileChange2}
                              className={classes.hiddenFile}
                            />
                          </div>
                          <p style={{ fontSize: 12, color: "red" }}>
                            {imgError1}
                          </p>
                        </Col>
                       </Row>
                       {/* <Button className={classes.editDetailsBtn1} variant="success" onClick={() => createApplication()}>
                        {createLoading ? (
                                                      <>
                                                        <Spinner size="sm" />
                                                        
                                                      </>
                                                    ) : (
                                                      "Upload"
                                                    )}
                        </Button> */}
                        </Form>
                      </Container>
                    )}
                    {userData === "corporate" && (
                      <Container>
                        <Form>
                          <Row className="mb-3">
                            <Col md={6}>
                              <Form.Group controlId="formInput1">
                                <Form.Label className={classes.formLabel}>
                                  Business Name 
                                </Form.Label>
                                <Form.Control
                                  className={classes.formInpt}
                                  disabled
                                  value={businessName}
                                  type="text"
                                  placeholder="Toluwani"
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group controlId="formInput2">
                                <Form.Label className={classes.formLabel}>
                                  BN/RC Number 
                                </Form.Label>
                                <Form.Control
                                  className={classes.formInpt}
                                  disabled
                                  value={cac}
                                  type="text"
                                  placeholder="Adekoya"
                                />
                              </Form.Group>
                            </Col>
                          </Row>

                          <Row className="mb-3">
                          <Col md={6}>
                              <Form.Group controlId="formInput6">
                                <Form.Label className={classes.formLabel} l>
                                  S-TIN 
                                </Form.Label>
                                <Form.Control
                                  className={classes.formInpt}
                                  disabled
                                  value={stin}
                                  type="text"
                                  placeholder="12345678-1234"
                                />
                              </Form.Group>
                            </Col>

                            <Col md={6}>
                              <Form.Group controlId="dob">
                                <Form.Label>Date of Incorporation </Form.Label>
                                <Form.Control
                                  className={classes.formInpt}
                                  disabled
                                  value={dateInc}
                                  type="date"
                                />
                              </Form.Group>
                            </Col>
                         
                          </Row>

                          <Row className="mb-3">
                          <Col md={6}>
                              <Form.Group controlId="formInput3">
                                <Form.Label className={classes.formLabel}>
                                  Business Email Address 
                                </Form.Label>
                                <Form.Control
                                  className={classes.formInpt}
                                  disabled
                                  value={customerEmail}
                                  onChange={(e) => setCustomerEmail(e.target.value)}
                                  type="email"
                                  placeholder="adekoyatoluwani5@gmail.com"
                                />
                              </Form.Group>
                            </Col>
                              
                            <Col md={6}>
                              <Form.Group controlId="formInput4">
                                <Form.Label className={classes.formLabel}>
                                  Business Phone Number 
                                </Form.Label>
                                <Form.Control
                                  className={classes.formInpt}
                                  type="tel"
                                  disabled
                                  value={customerPhone}
                                  onChange={(e) => setCustomerPhone(e.target.value)}
                                  placeholder="070 1798 1231"
                                />
                              </Form.Group>
                            </Col>
                           
                           
                          </Row>
          
                          <Row className="mb-3">
                          <Col md={6}>
                              <Form.Group controlId="formInput5">
                                <Form.Label className={classes.formLabel}>
                                  Business Address <span style={{color: "red"}}>*</span>
                                </Form.Label>
                                <Form.Control
                                  className={classes.formInpt}
                                  type="text"
                                  // disabled
                                  value={!customerAddress ? "" : customerAddress}
                                  onChange={(e) => setCustomerAddress(e.target.value)}
                                  placeholder="Enter address"
                                />
                                 {errors.customerAddress && <p style={{ color: 'red' }}>{errors.customerAddress}</p>}
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group controlId="formInput6">
                                <Form.Label className={classes.formLabel} l>
                                  Nationality <span style={{color: "red"}}>*</span>
                                </Form.Label>
                                <Form.Select
                                  className={classes.formInpt}
                                  // disabled
                                  value={nationality}
                                  onChange={(e) => setNationality(e.target.value)}
                                >
                                  <option>Select nationality</option>
                                  <option value="nigerian">Nigerian</option>
                                  <option value="non-nigerian">Non-Nigerian</option>
                                  
                                </Form.Select>
                            {errors.nationality && <p style={{ color: 'red' }}>{errors.nationality}</p>}
                              </Form.Group>
                            </Col>
                       
                           
                          </Row>

                          <Row className="mb-3">
                          <Col md={6}>
                              <Form.Group controlId="formInput6">
                                <Form.Label className={classes.formLabel} l>
                                  State {nationality === "nigerian" && <span style={{ color: "red" }}>*</span>}
                                </Form.Label>
                                <Form.Select
                                  className={classes.formInpt}
                                  disabled={nationality === "non-nigerian"}
                                  value={
                                    selectedState
                                  }
                                  onChange={(e) => setSelectedState(e.target.value)}
                                >
                                  <option>Select State</option>
                                  {Location.locations.map((loc) => (
          <option key={loc.state} value={loc.state}>
            {loc.state.toUpperCase()}
          </option>
        ))}
                                </Form.Select>
                                {errors.selectedState && <p style={{ color: 'red' }}>{errors.selectedState}</p>}
                              </Form.Group>
                            </Col>

                          <Col md={6}>
                              <Form.Group controlId="formInput5">
                                <Form.Label className={classes.formLabel}>
                                  Local Government Area {nationality === "nigerian" && <span style={{ color: "red" }}>*</span>}
                                </Form.Label>
                                <Form.Select
                                 disabled={!selectedState}
                                  value={
                                   selectedLga
                                  }
                                  className={classes.formInpt}
                                  onChange={(e) => setSelectedLga(e.target.value)}
                                >
                                  <option>Select L.G.A</option>
                                  {localGovts.map((lga) => (
          <option key={lga} value={lga}>
            {lga.toUpperCase()}
          </option>
        ))}
                                </Form.Select>
                                {errors.selectedLga && <p style={{ color: 'red' }}>{errors.selectedLga}</p>}
                              </Form.Group>
                            </Col>
                           
                          </Row>
                          
                        </Form>
                        <div className={classes.twoBtns}>
                        <Button  onClick={createInformation2} variant="success" className={classes.submitBtn}>
                              {loading ? (
                                                                                    <>
                                                                                      <Spinner size="sm" />
                                                                                      {/* <span style={{ marginLeft: "5px" }}>
                                                                                        Uploading, please wait...
                                                                                      </span> */}
                                                                                    </>
                                                                                  ) : (
                                                                                    "Submit"
                                                                                  )}
                            </Button>
                        <Button  onClick={createInformation4} variant="success" className={classes.submitBtnn}>
                              {loadingg ? (
                                                                                    <>
                                                                                      <Spinner size="sm" />
                                                                                      {/* <span style={{ marginLeft: "5px" }}>
                                                                                        Uploading, please wait...
                                                                                      </span> */}
                                                                                    </>
                                                                                  ) : (
                                                                                    "Submit"
                                                                                  )}
                            </Button>
                            {/* <Button onClick={() => navigate('/login')} variant="primary" className={classes.cancelBtn}>Cancel</Button> */}
                          </div>
                      </Container>
                    )}
                  </div>
                </div>

                {userData === "individual" && (
                  <>
                    <div style={{ marginTop: -70 }} />
                    <div className={classes.applicationHistory}>
                      <div className={classes.firstDiv}>
                        <div className={classes.firstInfo}>
                          <h1>Occupation Information</h1>
                        </div>
                        {/* <div className={classes.editDetailsBtn}>
                          <h1>Edit Details</h1>
                        </div> */}
                      </div>

                      <div className={classes.formCont}>
                        <Container>
                          <Form>
                            <Row className="mb-3">
                              <Col md={6}>
                                <Form.Group controlId="formInput1">
                                  <Form.Label className={classes.formLabel}>
                                    Company's Name <span style={{color: "red"}}>*</span>
                                  </Form.Label>
                                  <Form.Control
                                    className={classes.formInpt}
                                    value={compName}
                                    onChange={(e) =>
                                      setCompName(e.target.value)
                                    }
                                    type="text"
                                    placeholder="ABC Company"
                                  />
                              {errors.compName && <p style={{ color: 'red' }}>{errors.compName}</p>}
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group controlId="formInput2">
                                  <Form.Label className={classes.formLabel}>
                                    Job Title/Position <span style={{color: "red"}}>*</span>
                                  </Form.Label>
                                  <Form.Control
                                    className={classes.formInpt}
                                    value={jobTitle}
                                    onChange={(e) =>
                                      setJobTitle(e.target.value)
                                    }
                                    type="text"
                                    placeholder="Managing Director"
                                  />
                              {errors.jobTitle && <p style={{ color: 'red' }}>{errors.jobTitle}</p>}
                                </Form.Group>
                              </Col>
                            </Row>

                            <Row className="mb-3">
                              <Col md={6}>
                                <Form.Group controlId="formInput3">
                                  <Form.Label className={classes.formLabel}>
                                    Business Industry <span style={{color: "red"}}>*</span>
                                  </Form.Label>
                                  <Form.Select value={businessIndustry} onChange={(e) => setBusinessIndustry(e.target.value)} className={classes.formInpt}>
                                    <option>Select Business Industry</option>
                                    {[
                                      "Agriculture",
                                      "Technology",
                                      "Healthcare",
                                      "Finance",
                                      "Education",
                                      "Manufacturing",
                                      "Retail",
                                      "Construction",
                                      "Transportation",
                                      "Hospitality",
                                    ].map((industry) => (
                                      <option key={industry} value={industry}>
                                        {industry}
                                      </option>
                                    ))}
                                  </Form.Select>
                              {errors.businessIndustry && <p style={{ color: 'red' }}>{errors.businessIndustry}</p>}
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group controlId="formInput2">
                                  <Form.Label className={classes.formLabel}>
                                    Company's Email Address <span style={{color: "red"}}>*</span>
                                  </Form.Label>
                                  <Form.Control
                                    className={classes.formInpt}
                                    value={CompEmail}
                                    onChange={(e) =>
                                      setCompEmail(e.target.value)
                                    }
                                    type="text"
                                    placeholder="Enter Email Address"
                                  />
                              {errors.CompEmail && <p style={{ color: 'red' }}>{errors.CompEmail}</p>}
                                </Form.Group>
                              </Col>
                            </Row>

                            <Row className="mb-3">
                              <Col md={6}>
                                <Form.Group controlId="formInput1">
                                  <Form.Label className={classes.formLabel}>
                                    Company's Address <span style={{color: "red"}}>*</span>
                                  </Form.Label>
                                  <Form.Control
                                    className={classes.formInpt}
                                    value={!compAddress ? "" : compAddress}
                                    onChange={(e) =>
                                      setAddress(e.target.value)
                                    }
                                    type="text"
                                    placeholder="Enter Address"
                                  />
                              {errors.compAddress && <p style={{ color: 'red' }}>{errors.compAddress}</p>}
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group controlId="formInput2">
                                  <Form.Label className={classes.formLabel}>
                                    Company's Phone Number <span style={{color: "red"}}>*</span>
                                  </Form.Label>
                                  <Form.Control
                                    className={classes.formInpt}
                                    value={compPhone}
                                    onChange={(e) =>
                                      setcompPhone(e.target.value)
                                    }
                                    type="text"
                                    placeholder="Enter Phone Number"
                                  />
                              {errors.compPhone && <p style={{ color: 'red' }}>{errors.compPhone}</p>}
                                </Form.Group>
                              </Col>
                            </Row>

                            <Row>
                            
                            </Row>

                          </Form>
                        </Container>
                      </div>
                    </div>
                  </>
                )}
                {userData === "individual" && (
                  <>
                    <div style={{ marginTop: -70 }} />
                    <div className={classes.applicationHistory}>
                      <div className={classes.firstDiv}>
                        <div className={classes.firstInfo}>
                          <h1>Next of Kin Information</h1>
                        </div>
                        {/* <div className={classes.editDetailsBtn}>
                          <h1>Edit Details</h1>
                        </div> */}
                      </div>

                      <div className={classes.formCont}>
                        <Container>
                          <Form>
                            <Row className="mb-3">
                              <Col md={6}>
                                <Form.Group controlId="formInput1">
                                  <Form.Label className={classes.formLabel}>
                                    First Name <span style={{color: "red"}}>*</span>
                                  </Form.Label>
                                  <Form.Control
                                    className={classes.formInpt}
                                    value={nokFirstName}
                                    onChange={(e) =>
                                      setNokFirstName(e.target.value)
                                    }
                                    type="text"
                                    placeholder="Toluwani"
                                  />
                              {errors.nokFirstName && <p style={{ color: 'red' }}>{errors.nokFirstName}</p>}
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group controlId="formInput2">
                                  <Form.Label className={classes.formLabel}>
                                    Last Name <span style={{color: "red"}}>*</span>
                                  </Form.Label>
                                  <Form.Control
                                    className={classes.formInpt}
                                    value={nokLastName}
                                    onChange={(e) =>
                                      setNokLastName(e.target.value)
                                    }
                                    type="text"
                                    placeholder="Adekoya"
                                  />
                              {errors.nokLastName && <p style={{ color: 'red' }}>{errors.nokLastName}</p>}
                                </Form.Group>
                              </Col>
                            </Row>

                            <Row className="mb-3">
                              <Col md={6}>
                                <Form.Group controlId="formInput3">
                                  <Form.Label className={classes.formLabel}>
                                    Email <span style={{color: "red"}}>*</span>
                                  </Form.Label>
                                  <Form.Control
                                    className={classes.formInpt}
                                    value={nokEmail}
                                    onChange={(e) =>
                                      setNokEmail(e.target.value)
                                    }
                                    type="email"
                                    placeholder="adekoyatoluwani5@gmail.com"
                                    />
                                    {errors.nokEmail && <p style={{ color: 'red' }}>{errors.nokEmail}</p>}
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group controlId="formInput4">
                                  <Form.Label className={classes.formLabel}>
                                    Telephone Number <span style={{color: "red"}}>*</span>
                                  </Form.Label>
                                  <Form.Control
                                    className={classes.formInpt}
                                    value={nokPhone}
                                    onChange={(e) =>
                                      setNokPhone(e.target.value)
                                    }
                                    type="tel"
                                    placeholder="070 1798 1231"
                                  />
                              {errors.nokPhone && <p style={{ color: 'red' }}>{errors.nokPhone}</p>}
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row className="mb-3">
                              <Col md={12}>
                                <Form.Group controlId="formInput3">
                                  <Form.Label className={classes.formLabel}>
                                    Address <span style={{color: "red"}}>*</span>
                                  </Form.Label>
                                  <Form.Control
                                    className={classes.formInpt}
                                    value={!nokAddress ? "" : nokAddress}
                                    onChange={(e) =>
                                      setNokAddress(e.target.value)
                                    }
                                    type="address"
                                    placeholder="Oke Mosan"
                                  />
                              {errors.nokAddress && <p style={{ color: 'red' }}>{errors.nokAddress}</p>}
                                </Form.Group>
                              </Col>
                            </Row>
                          </Form>
                          <div className={classes.twoBtns}>
                            <Button  onClick={createInformation} variant="success" className={classes.submitBtn}>
                              {loading ? (
                                                                                    <>
                                                                                      <Spinner size="sm" />
                                                                                      {/* <span style={{ marginLeft: "5px" }}>
                                                                                        Uploading, please wait...
                                                                                      </span> */}
                                                                                    </>
                                                                                  ) : (
                                                                                    "Submit"
                                                                                  )}
                            </Button>
                            <Button  onClick={createInformation3} variant="success" className={classes.submitBtnn}>
                              {loadingg ? (
                                                                                    <>
                                                                                      <Spinner size="sm" />
                                                                                      {/* <span style={{ marginLeft: "5px" }}>
                                                                                        Uploading, please wait...
                                                                                      </span> */}
                                                                                    </>
                                                                                  ) : (
                                                                                    "Submit & Complete KYC Later"
                                                                                  )}
                            </Button>
                            {/* <Button onClick={() => navigate('/login')} variant="secondary" className={classes.cancelBtn}>Cancel</Button> */}
                          </div>
                            
                        </Container>
                      </div>
                    </div>
                  </>
                )}


            <Modal show={showModal} onHide={handleCloses} centered>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body className="text-center">
                <img
                  src={DeleteIcon}
                  alt="warning"
                  className={classes.modalImage}
                />
                <p className={classes.modalText}>
                  Are you sure you want to delete this card?
                </p>
                <p className={classes.modalText1}>
                  Are you sure you want to delete this card? This action cannot
                  be undone, and the card will no longer be usable.
                </p>
                <div className={classes.modalButtons}>
                  <Button
                    className={classes.modBtn}
                    variant="secondary"
                    onClick={handleCloses}
                  >
                    Cancel
                  </Button>
                  <Button
                    className={classes.modBtn1}
                    variant="danger"
                    onClick={handleDeleteConfirm}
                  >
                    Delete
                  </Button>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinishOnboarding;
