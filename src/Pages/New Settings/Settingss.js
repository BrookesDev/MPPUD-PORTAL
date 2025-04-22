import React, { useState, useEffect,useRef } from "react";
import DashboardNav from "../../Components/Navigation.js/Navigation";
import Horheader from "../../Components/horheader/horheader";
import ProfileIcon from "../../Asset/Profile Icon.png";
import classes from "./Settingss.module.css";
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
  Card,
} from "react-bootstrap";
import { Navbar, Container, Button } from "react-bootstrap";
import CameraIcon from "../../Asset/camera.png";
// import ProfileIcon from "../../Assets/profile.png";
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

// import localStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../../ThemeContext";

// import axios from 'axios';
// import localStorage from '@react-native-async-storage/async-storage';

const Settingss = () => {
  
  const [show, setShow] = useState(false);
  const [nationality,setNationality] = useState("")
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
  const [notificationType, setNotificationType] = useState("");
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

  const [preferences, setPreferences] = useState({
    email: false,
    sms: false,
    call: false,
    whatsapp: false,
  });

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
  const [customerLoading,setCustomerLoading] = useState(false)
  const totalPages = 10; // Total number of pages
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleDropdown, setVisibleDropdown] = useState(null);
  const [customerPicture,setCustomerPicture] = useState("")
  const [businessName,setBusinessName] = useState("")
   const fileInputRef = useRef(null);
   const { isDarkMode, toggleTheme } = useTheme();

 

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
      console.log(jobTitle,'Fetch job title')
      const companyAddress = await localStorage.getItem("companyAddress");
      const companyPhone = await localStorage.getItem("companyPhone");
      const companyEmail = await localStorage.getItem("companyEmail");
      const nextOfKinFirstName = await localStorage.getItem("nextOfKinFirstName");
      const nextOfKinLastName = await localStorage.getItem("nextOfKinLastName");
      const nextOfKinEmail = await localStorage.getItem("nextOfKinEmail");
      const nextOfKinPhone = await localStorage.getItem("nextOfKinPhone");
      const nextOfKinAddress = await localStorage.getItem("nextOfKinAddress");
      const maritalStatus = await localStorage.getItem("maritalStatus");
      const nationality = await localStorage.getItem("nationality");
     
      
      console.log(customerImage)
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
        console.log(jobTitle)
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
        console.log(customerState)
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
    console.log(files)
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
  

  const createApplication = async () => {
    setCreateLoading(true);
    try {
      const formData = new FormData();
   
      formData.append("photo", selectedFile2);
    

      
      const response = await axios.post(
        `${BASE_URL}/customer/update_picture`,
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

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearer}`
  };


  const customerInfo = async () => {
    setCustomerLoading(true);
   
   
    try {
      const formData = new FormData();
      formData.append("first_name",firstName)
      formData.append("last_name",lastName)
      formData.append("email",customerEmail)
      formData.append("address",customerAddress)
      formData.append("phone",customerPhone)
      formData.append("dob",dateBirth)
      formData.append("gender",gender)
      formData.append("state",customerState)
      formData.append("lga",customerLga)
      formData.append("marital_status",status)
      formData.append("nationality",nationality)
      formData.append("image",selectedFile2[0])
      const response =await axios.post(`${BASE_URL}/customer/update`,
        formData,
        { headers: 
          {
             "Content-Type": "multipart/form-data",
             Authorization: `Bearer ${bearer}`,
           }
     
          }
      );
      Swal.fire({
        icon: 'success',
        title: 'Successful',
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
    let errorMessage = 'An error occurred. Please try again.';
    if (error.response && error.response.data && error.response.data.message) {
      if (typeof error.response.data.message === 'string') {
        errorMessage = error.response.data.message;
      } else if (Array.isArray(error.response.data.message)) {
        errorMessage = error.response.data.message.join('; ');
      } else if (typeof error.response.data.message === 'object') {
        errorMessage = JSON.stringify(error.response.data.message);
      }
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: JSON.stringify(error.response.data.message),
      });
    }
  } finally {
    setCustomerLoading(false);
  }
}
  const occupationInformation = async () => {
    setLoading(true);
   
    try {
      const response =await axios.post(`${BASE_URL}/customer/update`,
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
        icon: 'success',
        title: 'Successful',
        text: response.data.message,
      });

         
      // return
      // toast.success(response.data.message);
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
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: JSON.stringify(error.response.data.message),
      });
    }
  } finally {
      setLoading(false);
  }
}



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
     {/* <div className={isDarkMode ? classes.dark : classes.light}> */}
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
                <p className={classes.wlcm}>Settings</p>
                <p style={{marginTop: -20, }}>Customize Your Experience – Configure Settings Your Way</p>
              </div>
            </div>

            <Card className="p-3" style={{ border: isDarkMode ? "1px solid gray" : 'none', boxShadow: 'none' , marginTop: 20, backgroundColor: isDarkMode ? "black" : "white"}}>
<h1 style={{fontSize: 20, fontWeight: 700,   color: isDarkMode ? "white" : "inherit"}}>Notification Preference</h1>
<p style={{fontSize: 15,   color: isDarkMode ? "white" : "inherit"}}>Please select how you want to receive your application notification</p>
              {Object.keys(preferences).map((type) => (
                <Form.Group 
                  key={type} 
                  className="d-flex align-items-center"
                  style={{  gap: 10 }}
                >
                  <Form.Check
                    type="switch"
                    id={`switch-${type}`}
                    checked={preferences[type]}
                    onChange={() => handleToggle(type)}
                  />
                  <Form.Label style={{fontSize: 15, fontWeight: 500, textTransform: "capitalize", marginTop: 10,   color: isDarkMode ? "white" : "inherit"}} >{type}</Form.Label>
                  
                </Form.Group>
              ))}
            </Card>

            <Card  className="p-3" style={{ border: isDarkMode ? "1px solid gray" : 'none', boxShadow: 'none' , marginTop: 20, backgroundColor: isDarkMode ? "black" : "white"}}>
<h1 style={{fontSize: 20, fontWeight: 700,   color: isDarkMode ? "white" : "inherit"}}>App Preference</h1>
<p style={{fontSize: 15,   color: isDarkMode ? "white" : "inherit"}}>Please select your app mode preference</p>
              
                <Form.Group 
               
                  className="d-flex align-items-center mb-4 "
                  style={{  gap: 10 }}
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
      
            </Card>
            
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Settingss;
