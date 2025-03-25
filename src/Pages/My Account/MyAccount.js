import React, { useState, useEffect, useRef } from "react";
import DashboardNav from "../../Components/Navigation.js/Navigation";
import Horheader from "../../Components/horheader/horheader";
import ProfileIcon from "../../Asset/Profile Icon.png";
import classes from "./MyAccount.module.css";
import UploadIcon from "../../Asset/upload.png";
import ImageIcon from "../../Asset/piclogo.png";
import Swal from "sweetalert2";
import { useTheme } from '../../ThemeContext';

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
import { useNavigate } from "react-router-dom";
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

// import localforage from "@react-native-async-storage/async-storage";
import localforage from "localforage";

// import axios from 'axios';
// import localforage from '@react-native-async-storage/async-storage';

const MyAccount = () => {
  const [show, setShow] = useState(false);
  const [nationality, setNationality] = useState("");
  const [status, setStatus] = useState("");
  const [imgError1, setImgError1] = useState("");
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
  const [selectedBusinessIndustry, setSelectedBusinessIndustry] = useState("");
  const [selectedEmploymentStatus, setSelectedEmploymentStatus] = useState("");
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

  const [selectedFiles, setSelectedFiles] = useState({});
  const [consultants, setConsultants] = useState([{ id: 1 }]);

  const handleFileChange = (event, fieldName) => {
    const file = event.target.files[0];
    setSelectedFiles((prev) => ({
      ...prev,
      [fieldName]: file ? file.name : "No file chosen",
    }));
  };

  const addConsultant = () => {
    setConsultants([...consultants, { id: Date.now() }]);
  };

  const removeConsultant = (id) => {
    setConsultants(consultants.filter((c) => c.id !== id));
  };

  const fields = [
    "Survey plan",
    "Building Architectural Plan",
    "Electrical Architectural Plan",
    "Mechanical Architectural Plan",
    "Structural Engineering",
    "Title Document",

  ];


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


  const [preferences, setPreferences] = useState({
    email: false,
    sms: false,
    call: false,
    whatsapp: false,
  });

  useEffect(() => {
    const loadNotificationType = async () => {
      const notificationType = await localStorage.getItem("notificationType");

      if (notificationType !== null) {
        const updatedPreferences = {};
        Object.keys(preferences).forEach((key) => {
          updatedPreferences[key] = key === notificationType;
        });
        setPreferences(updatedPreferences);
      }
    };

    loadNotificationType();
  }, []);

  const handleToggle = async (type) => {
    const updatedPreferences = {};

    // Reset all to false and activate only the selected one
    Object.keys(preferences).forEach((key) => {
      updatedPreferences[key] = false;
    });
    updatedPreferences[type] = true;

    setPreferences(updatedPreferences);

    try {
      const response = await axios.post(
        `${BASE_URL}/customer/update_notification`,
        { type },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${bearer}`,
          },
        }
      );

      await localStorage.setItem("notificationType", type); // Save new type
      console.log('Preference updated:', response.data);
    } catch (error) {
      console.error('Error updating preference:', error);
    }
  };

  const handleDeleteConfirm = () => {
    // Add your delete logic here
    console.log("Item deleted");
    setShowModal(false);
  };
  const [selectedOption, setSelectedOption] = useState(null);
  const [customerLoading, setCustomerLoading] = useState(false);
  const totalPages = 10; // Total number of pages
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleDropdown, setVisibleDropdown] = useState(null);
  const [customerPicture, setCustomerPicture] = useState("");
  const [businessName, setBusinessName] = useState("");
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
      const customerPhone = await localStorage.getItem("userPhone");
      const customerAddress = await localStorage.getItem("userAddress");
      const dob = await localStorage.getItem("dateBirth");
      const customerState = await localStorage.getItem("stateOfOrigin");
      const jobTitle = await localStorage.getItem("businessType");
      console.log(jobTitle, "Fetch job title");
      const companyAddress = await localStorage.getItem("companyAddress");
      const companyPhone = await localStorage.getItem("companyPhone");
      const companyEmail = await localStorage.getItem("companyEmail");
      const nextOfKinFirstName = await localStorage.getItem(
        "nextOfKinFirstName"
      );
      const nextOfKinLastName = await localStorage.getItem("nextOfKinLastName");
      const nextOfKinEmail = await localStorage.getItem("nextOfKinEmail");
      const nextOfKinPhone = await localStorage.getItem("nextOfKinPhone");
      const nextOfKinAddress = await localStorage.getItem("nextOfKinAddress");
      const maritalStatus = await localStorage.getItem("maritalStatus");
      const nationality = await localStorage.getItem("nationality");

      console.log(customerImage);
      if (details !== null) {
        setBearer(details);
      }
      if (nin !== null) {
        setNin(nin);
      }
      if (customerPhone !== null) {
        setCustomerPhone(customerPhone);
      }
      if (customerAddress !== null) {
        setCustomerAddress(customerAddress);
      }
      if (dob !== null) {
        setDateBirth(dob);
      }
      if (jobTitle !== null) {
        console.log(jobTitle);
        setJobTitle(jobTitle);
      }
      if (companyAddress !== null) {
        setAddress(companyAddress);
      }
      if (nextOfKinFirstName !== null) {
        setNokFirstName(nextOfKinFirstName);
      }
      if (nextOfKinLastName !== null) {
        setNokLastName(nextOfKinLastName);
      }
      if (nationality !== null) {
        setNationality(nationality);
      }
      if (nextOfKinEmail !== null) {
        setNokEmail(nextOfKinEmail);
      }
      if (nextOfKinPhone !== null) {
        setNokPhone(nextOfKinPhone);
      }
      if (companyEmail !== null) {
        setCompEmail(companyEmail);
      }
      if (nextOfKinAddress !== null) {
        setNokAddress(nextOfKinAddress);
      }
      if (nationality !== null) {
        setNokAddress(nextOfKinAddress);
      }
      if (maritalStatus !== null) {
        setStatus(maritalStatus);
      }
      if (companyPhone !== null) {
        setcompPhone(companyPhone);
      }
      if (customerState !== null) {
        console.log(customerState);
        setCustomerState(customerState);
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

  const { isDarkMode, toggleTheme } = useTheme();

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
    console.log(files);
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

      formData.append("photo", selectedFile2);

      const response = await axios.post(
        `${BASE_URL}/customer/update_picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${bearer}`,
          },
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

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${bearer}`,
  };

  const customerInfo = async () => {
    setCustomerLoading(true);

    try {
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("email", customerEmail);
      formData.append("address", customerAddress);
      formData.append("phone", customerPhone);
      formData.append("dob", dateBirth);
      formData.append("gender", gender);
      formData.append("state", customerState);
      formData.append("lga", customerLga);
      formData.append("marital_status", status);
      formData.append("nationality", nationality);
      formData.append("image", selectedFile2[0]);
      const response = await axios.post(
        `${BASE_URL}/customer/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${bearer}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Successful",
        text: response.data.message,
      });

      setCompName("");
      setJobTitle("");

      setAddress("");
      setcompPhone("");
      setCompEmail("");
      setAddress("");
      setNokFirstName("");
      setNokLastName("");
      setNokEmail("");
      setNokPhone("");
      setNokAddress("");
      // return
      // toast.success(response.data.message);
      console.log(response.data);
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
      setCustomerLoading(false);
    }
  };
  const occupationInformation = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/customer/update`,
        {
          business_name: businessName,
          business_industry: selectedBusinessIndustry,
          company_address: compAddress,
          company_phone: compPhone,
          company_email: CompEmail,
          job_title: jobTitle,
          employment_status: selectedEmploymentStatus,
          kin_first_name: nokFirstName,
          kin_last_name: nokLastName,
          kin_phone: nokPhone,
          kin_address: nokAddress,
          kin_email: nokEmail,

          // landuse_id: selectedLandUse,
        },
        { headers }
      );
      Swal.fire({
        icon: "success",
        title: "Successful",
        text: response.data.message,
      });

      // return
      // toast.success(response.data.message);
      console.log(response.data);
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
      setLoading(false);
    }
  };

  // const createInformation = async () => {
  //   setLoading(true);
  //   try {
  //     const formData = new FormData();
  //     // if (selectedFile && selectedFile.length > 0) {
  //     //   formData.append('image', selectedFile[0]);
  //     // }
  //     formData.append('business_name', compName);

  //     // formData.append('business_industry', industry);

  //     formData.append('company_address', compAddress);
  //     formData.append('phone', compPhone);
  //     formData.append('email', CompEmail);
  //     formData.append('job_title', jobTitle);

  //     // formData.append('employment_status', status);

  //     formData.append('kin_first_name', nokFirstName);
  //     formData.append('kin_last_name', nokLastName);
  //     formData.append('kin_phone', nokPhone);
  //     formData.append('kin_address', nokAddress);
  //     formData.append('kin_email', nokEmail);

  //     const headers = {
  //       'Content-Type': 'multipart/form-data',
  //       'Authorization': `Bearer ${bearer}`,
  //     };

  //     const response = await axios.post(`${BASE_URL}/customer/update`,
  //       formData,
  //       { headers }
  //     );

  //     console.log(response.data.message)

  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Successful',
  //       text: response.data.message,
  //     });

  //     // fetchDashboardData();
  //     // navigate(-1);
  //     // handleCloseModal();
  //     setCompName();
  //     setJobTitle();

  //     setAddress();
  //     setcompPhone();
  //     setCompEmail();
  //     setAddress();
  //     setNokFirstName();
  //     setNokLastName();
  //     setNokEmail();
  //     setNokPhone();
  //     setNokAddress();

  //     // return
  //     console.log(response.data);

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

  //       // setErrorMessage(JSON.stringify(error.response.data.message));
  //       // setShowErrorMessage(true);
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Failed',
  //         text: JSON.stringify(error.response.data.message),
  //       });
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <div className={classes.appcontainer}>
        <div className={classes.sidenav}>
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
        </div>

        <div className={classes.maincontent}>
          <div className={classes.mobileHeader}>
            <Horheader />
          </div>
          <div className={classes.dashBoardCont}>
            <div className={classes.usrwlcm}>
              <div>
                <p className={classes.wlcm}>My Account</p>
              </div>
            </div>

            <Tabs
              defaultActiveKey="information"
              id="uncontrolled-tab-example"
              className={`mb-3 complete-tabs ${classes.tabSet}`}
              variant="pills"
              color="#21B55A"
              style={{
                width: "30%",
                paddingLeft: 30,
                paddingTop: 5,
                height: 50,
                borderRadius: 8,
                backgroundColor: "#FFF",
              }}
            >
              <Tab eventKey="information" title="Personal Information" >
                <div className={isDarkMode ? classes.applicationHistoryy : classes.applicationHistory}>
                  <div className={classes.firstDiv}>
                    <div className={isDarkMode ? classes.firstInfos : classes.firstInfo}>
                      <h1>
                        {userData === "corporate"
                          ? "Corporate Information"
                          : "Personal Information"}
                      </h1>
                      <h2>Update your photo and details here.</h2>
                    </div>
                    {/* <div className={classes.editDetailsBtn}>
                      <h1>Edit Details</h1>
                    </div> */}
                  </div>
                  <div className={classes.profileContainer}>
                    <img
                      src={customerImage || customerPicture || ProfileIcon}
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
                                <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
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
                                <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
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
                              <Form.Group controlId="formInput6">
                                <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel} l>
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
                            <Col md={6}>
                              <Form.Group controlId="formInput5">
                                <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
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
                          </Row>

                          <Row className="mb-3">
                            <Col md={6}>
                              <Form.Group controlId="formInput3">
                                <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                  Email Address
                                </Form.Label>
                                <Form.Control
                                  className={classes.formInpt}
                                  disabled
                                  value={customerEmail}
                                  onChange={(e) =>
                                    setCustomerEmail(e.target.value)
                                  }
                                  type="email"
                                  placeholder="adekoyatoluwani5@gmail.com"
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group controlId="formInput4">
                                <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                  Phone Number
                                </Form.Label>
                                <Form.Control
                                  className={classes.formInpt}
                                  disabled
                                  value={customerPhone}
                                  type="tel"
                                  placeholder="070 1798 1231"
                                  onChange={(e) =>
                                    setCustomerPhone(e.target.value)
                                  }
                                />
                              </Form.Group>
                            </Col>
                          </Row>

                          <Row className="mb-3">
                            <Col md={6}>
                              <Form.Group controlId="dob">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control
                                  disabled
                                  value={dateBirth}
                                  className={classes.formInpt}
                                  type="date"
                                  onChange={(e) => setDateBirth(e.target.value)}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group controlId="formInput6">
                                <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel} l>
                                  Gender
                                </Form.Label>
                                <Form.Select
                                  className={classes.formInpt}
                                  disabled
                                  value={gender}
                                  onChange={(e) => setGender(e.target.value)}
                                >
                                  <option>Select Gender</option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                </Form.Select>
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col md={6}>
                              <Form.Group controlId="formInput5">
                                <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                  Address
                                </Form.Label>
                                <Form.Control
                                  className={classes.formInpt}
                                  // disabled
                                  value={customerAddress}
                                  type="text"
                                  placeholder="Enter address"
                                  onChange={(e) =>
                                    setCustomerAddress(e.target.value)
                                  }
                                />
                              </Form.Group>
                            </Col>

                            <Col md={6}>
                              <Form.Group controlId="formInput6">
                                <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel} l>
                                  Marital Status
                                </Form.Label>
                                <Form.Select
                                  className={classes.formInpt}
                                  // disabled
                                  value={status}
                                  onChange={(e) => setStatus(e.target.value)}
                                >
                                  <option>Select Status</option>
                                  <option value="SINGLE">Single</option>
                                  <option value="MARRIED">Married</option>
                                  <option value="DIVORCE">Divorce</option>
                                  <option value="SEPERATED">Seperated</option>
                                </Form.Select>
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col md={6}>
                              <Form.Group controlId="formInput6">
                                <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel} l>
                                  Nationality
                                </Form.Label>
                                <Form.Select
                                  className={classes.formInpt}
                                  // disabled
                                  value={nationality}
                                  onChange={(e) =>
                                    setNationality(e.target.value)
                                  }
                                >
                                  <option>Select Nationality</option>
                                  <option value="s">Nigerian</option>
                                  <option value="m">Non-Nigerian</option>
                                </Form.Select>
                              </Form.Group>
                            </Col>

                            <Col md={6}>
                              <Form.Group controlId="formInput6">
                                <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel} l>
                                  State
                                </Form.Label>
                                <Form.Select
                                  className={classes.formInpt}
                                  // disabled
                                  value={
                                    statesInNigeria.find(
                                      (state) =>
                                        state.toUpperCase() ===
                                        customerState.toUpperCase()
                                    ) || ""
                                  }
                                  onChange={(e) =>
                                    setCustomerState(e.target.value)
                                  }
                                >
                                  <option>Select State</option>
                                  {statesInNigeria.map((state) => (
                                    <option key={state} value={state}>
                                      {state}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Form.Group>
                            </Col>
                          </Row>

                          <Row className="mb-3">
                            <Col md={6}>
                              <Form.Group controlId="formInput5">
                                <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                  Local Government Area
                                </Form.Label>
                                <Form.Select
                                  className={classes.formInpt}
                                  // disabled
                                  value={
                                    ogunStateLGAs.find(
                                      (lga) =>
                                        lga
                                          .replace(/\s+/g, "_")
                                          .toUpperCase() ===
                                        customerLga.toUpperCase()
                                    ) || ""
                                  }
                                  onChange={(e) =>
                                    setCustomerLga(e.target.value)
                                  }
                                >
                                  <option>Select LGA</option>
                                  {ogunStateLGAs.map((lga) => (
                                    <option key={lga} value={lga}>
                                      {lga}
                                    </option>
                                  ))}
                                </Form.Select>
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

                          <Row className="mb-3"></Row>

                          <Button
                            className={classes.editDetailsBtn1}
                            variant="success"
                            onClick={() => customerInfo()}
                          >
                            {customerLoading ? (
                              <>
                                <Spinner size="sm" />
                                {/* <span style={{ marginLeft: "5px" }}>
                                                          Uploading, please wait...
                                                        </span> */}
                              </>
                            ) : userData === "corporate" ? (
                              "Upload Corporate Information"
                            ) : (
                              "Upload Personal Information"
                            )}
                          </Button>
                        </Form>
                      </Container>
                    )}
                    {userData === "corporate" && (
                      <Container>
                        <Form>
                          <Row className="mb-3">
                            <Col md={6}>
                              <Form.Group controlId="formInput1">
                                <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
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
                                <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
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
                              <Form.Group controlId="formInput3">
                                <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                  Business Email Address
                                </Form.Label>
                                <Form.Control
                                  className={classes.formInpt}
                                  disabled
                                  value={customerEmail}
                                  type="email"
                                  placeholder="adekoyatoluwani5@gmail.com"
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group controlId="formInput4">
                                <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                  Business Phone Number
                                </Form.Label>
                                <Form.Control
                                  className={classes.formInpt}
                                  type="tel"
                                  disabled
                                  value={customerPhone}
                                  placeholder="070 1798 1231"
                                />
                              </Form.Group>
                            </Col>
                          </Row>

                          <Row className="mb-3">
                            <Col md={6}>
                              <Form.Group controlId="formInput5">
                                <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                  Business Address
                                </Form.Label>
                                <Form.Control
                                  className={classes.formInpt}
                                  type="text"
                                  disabled
                                  value={customerAddress}
                                  placeholder="Enter address"
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group controlId="dob">
                                <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>Date of Incorporation</Form.Label>
                                <Form.Control
                                  className={classes.formInpt}
                                  disabled
                                  value={dateInc}
                                  type="date"
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          {/* <Row className="mb-3">
                          <Col md={6}>
                            <Form.Group controlId="formInput6">
                              <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel} l>Gender</Form.Label>
                              <Form.Select className={classes.formInpt}>
                                <option>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group controlId="formInput5">
                              <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>Religion</Form.Label>
                              <Form.Select className={classes.formInpt}>
                                <option>Select Religon</option>
                                <option value="christianity">Christianity</option>
                                <option value="islam">Islam</option>
                                <option value="hinduism">Hinduism</option>
                                <option value="buddhism">Buddhism</option>
                                <option value="judaism">Judaism</option>
                                <option value="other">Other</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>

                        </Row> */}
                          <Row className="mb-3">
                            <Col md={6}>
                              <Form.Group controlId="formInput6">
                                <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel} l>
                                  State
                                </Form.Label>
                                <Form.Select
                                  className={classes.formInpt}
                                  disabled
                                  value={
                                    statesInNigeria.find(
                                      (state) =>
                                        state.toUpperCase() ===
                                        customerState.toUpperCase()
                                    ) || ""
                                  }
                                >
                                  <option>Select State</option>
                                  {statesInNigeria.map((state) => (
                                    <option key={state} value={state}>
                                      {state}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group controlId="formInput5">
                                <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                  Local Government Area
                                </Form.Label>
                                <Form.Select
                                  disabled
                                  value={customerLga}
                                  className={classes.formInpt}
                                  onChange={(e) =>
                                    setCustomerLga(e.target.value)
                                  }
                                >
                                  <option>Select LGA</option>
                                  {ogunStateLGAs.map((lga) => (
                                    <option key={lga} value={lga.toLowerCase()}>
                                      {lga}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Form.Group>
                            </Col>
                          </Row>

                          <Row className="mb-3">
                            <Col md={6}>
                              <Form.Group controlId="formInput6">
                                <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel} l>
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
                            {/* <Col md={6}>
                            <Form.Group controlId="formInput5">
                              <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>NIN Number</Form.Label>
                              <Form.Control className={classes.formInpt} type="text" placeholder="123456789098764" />
                            </Form.Group>
                          </Col> */}
                          </Row>
                        </Form>
                      </Container>
                    )}
                  </div>
                </div>

                {userData === "individual" && (
                  <>
                    <div style={{ marginTop: -70 }} />
                    <div className={isDarkMode ? classes.applicationHistoryy : classes.applicationHistory}>
                      <div className={classes.firstDiv}>
                        <div className={isDarkMode ? classes.firstInfos : classes.firstInfo}>
                          <h1>Occupation Information</h1>
                        </div>
                      </div>

                      <div className={classes.formCont}>
                        <Container>
                          <Form>
                            <Row className="mb-3">
                              <Col md={6}>
                                <Form.Group controlId="formInput1">
                                  <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                    Company's Name
                                  </Form.Label>
                                  <Form.Control
                                    className={classes.formInpt}
                                    value={businessName}
                                    onChange={(e) =>
                                      setBusinessName(e.target.value)
                                    }
                                    type="text"
                                    placeholder="ABC Company"
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group controlId="formInput2">
                                  <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                    Job Title/Position
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
                                </Form.Group>
                              </Col>
                            </Row>

                            <Row className="mb-3">
                              <Col md={6}>
                                <Form.Group controlId="formInput3">
                                  <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                    Business Industry
                                  </Form.Label>
                                  <Form.Select
                                    value={selectedBusinessIndustry}
                                    onChange={(e) =>
                                      setSelectedBusinessIndustry(
                                        e.target.value
                                      )
                                    }
                                    className={classes.formInpt}
                                  >
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
                                </Form.Group>
                              </Col>
                              {/* <Col md={6}>
                                <Form.Group controlId="formInput4">
                                  <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                    Employment Status
                                  </Form.Label>
                                  <Form.Select value={selectedEmploymentStatus} onChange={(e) => setSelectedEmploymentStatus(e.target.value)} className={classes.formInpt}>
                                    <option>Select Employment Status</option>
                                    {[
                                      "Employed",
                                      "Self-Employed",
                                      "Unemployed",
                                      "Student",
                                      "Retired",
                                      "Freelancer",
                                      "Contractor",
                                    ].map((status) => (
                                      <option key={status} value={status}>
                                        {status}
                                      </option>
                                    ))}
                                  </Form.Select>
                                </Form.Group>
                              </Col> */}
                              <Col md={6}>
                                <Form.Group controlId="formInput1">
                                  <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                    Company's Address
                                  </Form.Label>
                                  <Form.Control
                                    className={classes.formInpt}
                                    value={compAddress}
                                    onChange={(e) => setAddress(e.target.value)}
                                    type="text"
                                    placeholder="Enter Address"
                                  />
                                </Form.Group>
                              </Col>
                            </Row>

                            <Row className="mb-3">
                              <Col md={6}>
                                <Form.Group controlId="formInput2">
                                  <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                    Company's Phone Number
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
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group controlId="formInput2">
                                  <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                    Company's Email Address
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
                                </Form.Group>
                              </Col>
                            </Row>
                          </Form>
                        </Container>
                        <div className={classes.editDetailsBtn}>
                          <button onClick={() => occupationInformation()}>
                            {loading ? "Updating" : "Update Details"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {userData === "individual" && (
                  <>
                    <div style={{ marginTop: -70 }} />
                    <div className={isDarkMode ? classes.applicationHistoryy : classes.applicationHistory}>
                      <div className={classes.firstDiv}>
                        <div className={isDarkMode ? classes.firstInfos : classes.firstInfo}>
                          <h1>Next of Kin Information</h1>
                        </div>
                      </div>

                      <div className={classes.formCont}>
                        <Container>
                          <Form>
                            <Row className="mb-3">
                              <Col md={6}>
                                <Form.Group controlId="formInput1">
                                  <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                    First Name
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
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group controlId="formInput2">
                                  <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                    Last Name
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
                                </Form.Group>
                              </Col>
                            </Row>

                            <Row className="mb-3">
                              <Col md={6}>
                                <Form.Group controlId="formInput3">
                                  <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                    Email
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
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group controlId="formInput4">
                                  <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                    Telephone Number
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
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row className="mb-3">
                              <Col md={6}>
                                <Form.Group controlId="formInput3">
                                  <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                    Address
                                  </Form.Label>
                                  <Form.Control
                                    className={classes.formInpt}
                                    value={nokAddress}
                                    onChange={(e) =>
                                      setNokAddress(e.target.value)
                                    }
                                    type="address"
                                    placeholder="adekoyatoluwani5@gmail.com"
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                          </Form>
                        </Container>
                        <div className={classes.editDetailsBtn}>
                          <button onClick={() => occupationInformation()}>
                            {loading ? "Updating" : "Update Details"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* <div style={{ marginTop: -70 }} />
                <div className={isDarkMode ? classes.applicationHistory11 : classes.applicationHistory1}>
                  <div className={classes.firstDiv}>
                    <div className={isDarkMode ? classes.firstInfos : classes.firstInfo}>
                      <h1>Password</h1>
                      <h2>
                        Please enter your current password to change your
                        password.
                      </h2>
                    </div>
                  </div>

                  <div className={classes.formCont}>
                    <Container>
                      <Form>
                        <Row className="align-items-center mb-4">
                          <Col md={6}>
                            <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                              Current Password
                            </Form.Label>
                            <p className={isDarkMode ? "text-light": "text-muted"}>
                              Your current password is needed to proceed
                            </p>
                          </Col>
                          <Col md={6}>
                            <Form.Group controlId="currentPassword">
                              <Form.Control
                                className={classes.formInpt}
                                type="password"
                                placeholder="Enter Current Password"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <hr style={{ borderTop: "1px solid #EAECF0" }} />
                        <Row className="align-items-center mb-4">
                          <Col md={6}>
                            <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                              New Password
                            </Form.Label>
                            <p className={isDarkMode ? "text-light": "text-muted"}>
                              Input the new password you want to be using
                            </p>
                          </Col>
                          <Col md={6}>
                            <Form.Group controlId="newPassword">
                              <Form.Control
                                className={classes.formInpt}
                                type="password"
                                placeholder="Enter New Password"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <hr style={{ borderTop: "1px solid #EAECF0" }} />
                        <Row className="align-items-center mb-4">
                          <Col md={6}>
                            <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                              Confirm New Password
                            </Form.Label>
                            <p className={isDarkMode ? "text-light": "text-muted"}>
                              Confirm your password to proceed
                            </p>
                          </Col>
                          <Col md={6}>
                            <Form.Group controlId="confirmNewPassword">
                              <Form.Control
                                className={classes.formInpt}
                                type="password"
                                placeholder="Confirm New Password"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Form>
                    </Container>
                    <div className={classes.editDetailsBtn}>
                      <button>Change Password</button>
                    </div>
                  </div>
                </div> */}
                <div className={classes.cont}>
                  <div className={classes.container}>
                    {fields.map((field, index) => (
                      <div key={index} className={classes.fileInput}>
                        <label>{field}*</label>
                        <div className={classes.inputWrapper}>
                          <span className={classes.fileName}>
                            {selectedFiles[field] || "Choose File"}
                          </span>
                          <input
                            type="file"
                            onChange={(e) => handleFileChange(e, field)}
                            accept=".pdf,.doc,.docx,.jpg,.png"
                          />
                        </div>
                      </div>
                    ))}
                  </div>



<div className={classes.selectContainer}>
  {/* Land Use Type Select */}
  <div className={classes.selectWrapper}>
    <label className={classes.selectLabel}>Land Use Type</label>
    <select>
      <option>Select Land Use Type</option>
      <option>Residential</option>
      <option>Commercial</option>
    </select>
  </div>

  {/* Select Type Select */}
  <div className={classes.selectWrapper}>
    <label className={classes.selectLabel}>Select Type*</label>
    <select>
      <option>Select Type</option>
      <option>Type A</option>
      <option>Type B</option>
    </select>
  </div>
</div>


                  <button className={classes.addMoreBtn} onClick={addConsultant}>
                    Add More
                  </button>
                  <div className={classes.bill}>
  {consultants.map((consultant) => (
    <div key={consultant.id} className={classes.consultantRow}>
      
      {/* Consultant Select Dropdown */}
      <div className={classes.inputGroup}>
        <label htmlFor={`consultant-${consultant.id}`}>Consultant</label>
        <select id={`consultant-${consultant.id}`}>
          <option>Choose Consultant</option>
          <option>John Doe</option>
          <option>Jane Smith</option>
        </select>
      </div>

      {/* Email Input */}
      <div className={classes.inputGroup}>
        <label htmlFor={`email-${consultant.id}`}>Email</label>
        <input 
          type="email" 
          id={`email-${consultant.id}`} 
          placeholder="" 
        />
      </div>

      {/* Designation Input */}
      <div className={classes.inputGroup}>
        <label htmlFor={`designation-${consultant.id}`}>Designated*</label>
        <input 
          type="text" 
          id={`designation-${consultant.id}`} 
          placeholder="" 
        />
      </div>

      {/* Delete Button */}
      <div className={classes.inputGroup}>
        <label>Del*</label>
        <button
          className={classes.deleteBtn}
          onClick={() => removeConsultant(consultant.id)}
        >
          Del
        </button>
      </div>
                      

                    </div>

                    


                  ))}
                    <button className={classes.Btn}>
                    Submit
                  </button>
                </div>
                </div>
              </Tab>

              <Tab eventKey="payments" title="Payments">
                <div className={isDarkMode ? classes.applicationHistory22 : classes.applicationHistory2}>
                  <div className={classes.firstDiv}>
                    <div className={isDarkMode ? classes.firstInfos : classes.firstInfo}>
                      <h1>Manage Cards</h1>
                      <h2>Add or remove card</h2>
                    </div>
                  </div>

                  <div className={classes.cardContt}>
                    <Container>
                      <Form>
                        <Row className="mb-4">
                          {/* Left Section with Text */}
                          <Col md={6}>
                            <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                              You saved cards
                            </Form.Label>
                            <p className={isDarkMode ? "text-light" : "text-muted"}>
                              Manage cards that you have saved{" "}
                            </p>
                          </Col>

                          {/* Right Section with Input */}
                          <Col md={6}>
                            <div className={classes.carddContainers}>
                              <div className={classes.carddContainer}>
                                <img
                                  src={MasterIcon}
                                  alt="card"
                                  className={classes.firstImage}
                                />
                                <div className={classes.textCont}>
                                  <p className={classes.textContent}>
                                    Adekoya Toluwani
                                  </p>
                                  <p className={classes.textContents}>
                                    **** **** **** 1211
                                  </p>
                                </div>
                                <img
                                  src={DeleteIcon}
                                  alt="delete"
                                  className={classes.secondImage}
                                  onClick={handleDeleteClick}
                                />
                              </div>

                              <div className={classes.carddContainer}>
                                <img
                                  src={VisaIcon}
                                  alt="card"
                                  className={classes.firstImage}
                                />
                                <div className={classes.textCont}>
                                  <p className={classes.textContent}>
                                    Adekoya Toluwani
                                  </p>
                                  <p className={classes.textContents}>
                                    **** **** **** 1211
                                  </p>
                                </div>
                                <img
                                  src={DeleteIcon}
                                  alt="delete"
                                  className={classes.secondImage}
                                  onClick={handleDeleteClick}
                                />
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <hr style={{ borderTop: "1px solid #EAECF0" }} />

                        <Row className="mb-4">
                          {/* Left Section with Text */}
                          <Col md={6}>
                            <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                              Add new card
                            </Form.Label>
                            <p className={isDarkMode ? "text-light" : "text-muted"}>
                              Input the details of your card to add a new one
                            </p>
                          </Col>

                          {/* Right Section with Input */}
                          <Col md={6}>
                            <div className={classes.newCarddContainers}>
                              <Form.Group controlId="formInputCardNumber">
                                <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                  Card number
                                </Form.Label>
                                <Form.Control
                                  className={classes.formInpt}
                                  type="text"
                                  placeholder="Input card number"
                                />
                              </Form.Group>

                              <div className={classes.newCarddrOWContainers}>
                                <Row>
                                  <Col md={6}>
                                    <Form.Group controlId="formInputExpiryDate">
                                      <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                        Expiry date
                                      </Form.Label>
                                      <Form.Control
                                        className={classes.formInpt}
                                        type="text"
                                        placeholder="MM/DD/YY"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md={6}>
                                    <Form.Group controlId="formInputCVV">
                                      <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                        CVV
                                      </Form.Label>
                                      <Form.Control
                                        className={classes.formInpt}
                                        type="text"
                                        placeholder="123"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <div className={classes.cardBtn}>
                                    <h1>+ Add new card</h1>
                                  </div>
                                </Row>
                              </div>
                            </div>
                          </Col>
                        </Row>

                        <hr style={{ borderTop: "1px solid #EAECF0" }} />
                      </Form>
                    </Container>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="delegates" title="Account Delegates">
                <div className={isDarkMode ? classes.applicationHistory22 : classes.applicationHistory2}>
                  <div className={classes.firstDiv}>
                    <div className={isDarkMode ? classes.firstInfos : classes.firstInfo}>
                      <h1>Manage Cards</h1>
                      <h2>Add or remove card</h2>
                    </div>
                  </div>

                  <div className={classes.cardContt}>
                    <Container>
                      <Form>
                        <Row className="mb-4">
                          {/* Left Section with Text */}
                          <Col md={6}>
                            <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                              You saved cards
                            </Form.Label>
                            <p className={isDarkMode ? "text-light" : "text-muted"}>
                              Manage cards that you have saved{" "}
                            </p>
                          </Col>

                          {/* Right Section with Input */}
                          <Col md={6}>
                            <div className={classes.carddContainers}>
                              <div className={classes.carddContainer}>
                                <img
                                  src={MasterIcon}
                                  alt="card"
                                  className={classes.firstImage}
                                />
                                <div className={classes.textCont}>
                                  <p className={classes.textContent}>
                                    Adekoya Toluwani
                                  </p>
                                  <p className={classes.textContents}>
                                    **** **** **** 1211
                                  </p>
                                </div>
                                <img
                                  src={DeleteIcon}
                                  alt="delete"
                                  className={classes.secondImage}
                                  onClick={handleDeleteClick}
                                />
                              </div>

                              <div className={classes.carddContainer}>
                                <img
                                  src={VisaIcon}
                                  alt="card"
                                  className={classes.firstImage}
                                />
                                <div className={classes.textCont}>
                                  <p className={classes.textContent}>
                                    Adekoya Toluwani
                                  </p>
                                  <p className={classes.textContents}>
                                    **** **** **** 1211
                                  </p>
                                </div>
                                <img
                                  src={DeleteIcon}
                                  alt="delete"
                                  className={classes.secondImage}
                                  onClick={handleDeleteClick}
                                />
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <hr style={{ borderTop: "1px solid #EAECF0" }} />

                        <Row className="mb-4">
                          {/* Left Section with Text */}
                          <Col md={6}>
                            <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                              Add new card
                            </Form.Label>
                            <p className={isDarkMode ? "text-light" : "text-muted"}>
                              Input the details of your card to add a new one
                            </p>
                          </Col>

                          {/* Right Section with Input */}
                          <Col md={6}>
                            <div className={classes.newCarddContainers}>
                              <Form.Group controlId="formInputCardNumber">
                                <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                  Card number
                                </Form.Label>
                                <Form.Control
                                  className={classes.formInpt}
                                  type="text"
                                  placeholder="Input card number"
                                />
                              </Form.Group>

                              <div className={classes.newCarddrOWContainers}>
                                <Row>
                                  <Col md={6}>
                                    <Form.Group controlId="formInputExpiryDate">
                                      <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                        Expiry date
                                      </Form.Label>
                                      <Form.Control
                                        className={classes.formInpt}
                                        type="text"
                                        placeholder="MM/DD/YY"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md={6}>
                                    <Form.Group controlId="formInputCVV">
                                      <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                        CVV
                                      </Form.Label>
                                      <Form.Control
                                        className={classes.formInpt}
                                        type="text"
                                        placeholder="123"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <div className={classes.cardBtn}>
                                    <h1>+ Add new card</h1>
                                  </div>
                                </Row>
                              </div>
                            </div>
                          </Col>
                        </Row>

                        <hr style={{ borderTop: "1px solid #EAECF0" }} />
                      </Form>
                    </Container>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="settings" title="Settings">
                <div className={isDarkMode ? classes.applicationHistory22 : classes.applicationHistory2}>
                  <div className={classes.firstDiv}>
                    <div className={isDarkMode ? classes.firstInfos : classes.firstInfo}>
                      <h1>Settings</h1>
                      <h2>Select your App and Notification Preferences</h2>
                    </div>
                  </div>

                  <div className={classes.cardContt}>
                    <Container>
                      <Form>
                        <Row className="mb-4">
                          {/* Left Section with Text */}
                          <Col md={6}>
                            <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                              Notification Preference
                            </Form.Label>
                            <p className={isDarkMode ? "text-light" : "text-muted"}>
                              Please select how you want to receive your application notification{" "}
                            </p>
                          </Col>

                          {/* Right Section with Input */}
                          <Col md={6}>
                            <div className={classes.carddContainers}>
                              <div className={isDarkMode ? classes.carddContainerr : classes.carddContainer}>

                                {Object.keys(preferences).map((type) => (
                                  <Form.Group
                                    key={type}
                                    className="d-flex align-items-center"
                                    style={{ gap: 10 }}
                                  >
                                    <Form.Check
                                      type="switch"
                                      id={`switch-${type}`}
                                      checked={preferences[type]}
                                      onChange={() => handleToggle(type)}
                                    />
                                    <Form.Label style={{ fontSize: 15, fontWeight: 500, textTransform: "capitalize", marginTop: 10, color: isDarkMode ? "white" : "inherit" }} >{type}</Form.Label>

                                  </Form.Group>
                                ))}
                              </div>


                            </div>
                          </Col>
                        </Row>
                        <hr style={{ borderTop: "1px solid #EAECF0" }} />

                        <Row className="mb-4">
                          {/* Left Section with Text */}
                          <Col md={6}>
                            <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                              App Preference
                            </Form.Label>
                            <p className={isDarkMode ? "text-light" : "text-muted"}>
                              Please select your app mode preference
                            </p>
                          </Col>

                          {/* Right Section with Input */}
                          <Col md={6}>
                            <div className={classes.carddContainers}>
                              <div className={isDarkMode ? classes.carddContainerr : classes.carddContainer}>

                                <Form.Group

                                  className="d-flex align-items-center mb-4 "
                                  style={{ gap: 10 }}
                                >
                                  <Form.Check
                                    type="switch"
                                    id="theme-switch"
                                    checked={isDarkMode}
                                    onChange={toggleTheme}
                                  />
                                  <Form.Label
                                    htmlFor="theme-switch"
                                    style={{
                                      fontSize: 15,
                                      fontWeight: 500,
                                      textTransform: "capitalize",
                                      marginTop: 10,
                                      color: isDarkMode ? "white" : "inherit"
                                    }}
                                  >
                                    Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
                                  </Form.Label>

                                </Form.Group>
                              </div>


                            </div>
                          </Col>
                        </Row>

                        <hr style={{ borderTop: "1px solid #EAECF0" }} />
                      </Form>
                    </Container>
                  </div>
                </div>
              </Tab>
            </Tabs>

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

export default MyAccount;
