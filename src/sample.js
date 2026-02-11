import React, { useState, useEffect, useRef } from "react";
import DashboardNav from "../../Components/Navigation.js/Navigation";
import Horheader from "../../Components/horheader/horheader";
import classes from "./LandAllocationApplication.module.css";
import crop from "../../Assets/repoort.png";
import ProfileIcon from "../../Assets/Profile Icon.png";
import UploadIcon from "../../Assets/upload.png";
import verified from "../../Assets/tick-circle.png";
import Governor from "../../Assets/governor.png";
import LandSearch from "../../Assets/landsearch.png";
import HOC from "../../Assets/hoc.png";
import CurrencyInput from "react-currency-input-field";
import {
  Spinner,
  Badge,
  Modal,
  Form,
  Tabs,
  Tab,
  Pagination,
  Placeholder,
  Accordion,
  Card,
} from "react-bootstrap";

import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../../API/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import ImageIcon from "../../Assets/piclogo.png";
import { Navbar, Container, Button } from "react-bootstrap";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../../ThemeContext";
import { FaInfoCircle } from "react-icons/fa"; 
import { FaPlus, FaTrash } from 'react-icons/fa';



const LandAlloc = () => {
  const location = useLocation();
    const [passportPhotograpy, setPassportPhotograph] = useState("Passport Photograph");
   const [showModal, setShowModal] = useState(false);
     const [customerLoading, setCustomerLoading] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
     const [loading, setLoading] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const { serviceID, paymentCode, appNumber,customer, applicationType,  plotNumber} = location.state || {};
   const [landUse, setLandUse] = useState(applicationType || "");
  // console.log(customer)
  const [modalMessage, setModalMessage] = useState("");
  const [titleDocument, setTitleDocument] = useState("");
  const [schemes, setSchemes] = useState([]);
  const [consentTypes, setConsentTypes] = useState([]);
  const [caveatTypes, setCaveatTypes] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState('');

  const [roleLoading, setRoleLoading] = useState(false);
  
  const handleClose = () => setShow(false);

  
  const handleShow = () => setShow(true);
  


  const [show8, setShow8] = useState(false);

  const [bearer, setBearer] = useState("");
  const [bearer1, setBearer1] = useState("");
  const [imgError, setImgError] = useState("");
  // const [pageNumber, setPageNumber] = useState("");
  const [tableData, setTableData] = useState([]);
  const [imgError1, setImgError1] = useState("");
  const [imgError2, setImgError2] = useState("");
  const [imgError3, setImgError3] = useState("");
  const [tableData32, setTableData32] = useState([]);
  const [allApplications, setAllApplications] = useState([]);
  const [tableData1, setTableData1] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [tableData45, setTableData45] = useState([]);
  const [name, setName] = useState("");
  const [measurement, setMeasurement] = useState([]);
  // const [errorMessage, setErrorMessage] = useState("");
  const [fileName, setFileName] = useState("Other Supporting documents");
  const [fileName10, setFileName10] = useState("Purchase Agreement");
  const [fileName20, setFileName20] = useState("Purchase Receipt");
  const [fileName1, setFileName1] = useState("Survey Plan");
  const fileInputRef = useRef(null);
  const fileInputRef1 = useRef(null);
    const filePassportRef = useRef(null);
 
 
  const fileInputRef10 = useRef(null);
  const fileInputRef20 = useRef(null);

  const [isJointOwnership, setIsJointOwnership] = useState(false);
  const [ninValues, setNinValues] = useState([]);
  const [nameValues, setNameValues] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loadingStates, setLoadingStates] = useState([]);
  const debounceTimers = useRef([]);
  const [stampCode, setStampCode] = useState('');
  const [stampError, setStampError] = useState('');
  const [isJointOwnershipNumeric, setIsJointOwnershipNumeric] = useState(0);

  

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleClick10 = () => {
    fileInputRef10.current.click();
  };
  const handleClick20 = () => {
    fileInputRef20.current.click();
  };


  const handleClick1 = () => {
    fileInputRef1.current.click();
  };

   const handlePassportPhotograph = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setImgError5("File is larger than 2MB. Max upload size is 2MB.");
        setPassportPhotograph("");
        return;
      } // Get the first selected file
      setPassportPhotograph(file.name); // Set the file name
      setSelectedFile3([file]);
      setImgError5(""); // Store the file in state
    }
  };

  
  const handleConfirm = () => {
    setShowModal(false);
    setCreateLoading(true);
    createApplication(); // Call your function
  };
  const navigate = useNavigate();
  const [benLoading, setBenLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [selectedLGA, setSelectedLGA] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedAreaName, setSelectedAreaName] = useState("");
 
  const [selectedDevelopment, setSelectedDevelopment] = useState("");
  const [selectedLandUse, setSelectedLandUse] = useState("");
  const [selectedBuildingType, setSelectedBuildingType] = useState("");

  const [landLocation, setLandLocation] = useState("");
 
  const [totalAmount, setTotalAmount] = useState("");
  const [attestation, setAttestation] = useState(false);
  const [allocationDate, setAllocationDate] = useState("");
  const [timeLine, setTimeLine] = useState("");
  
  const [sizeSqm, setSizeSqm] = useState("");
 
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  
  const [selectedFile30, setSelectedFile30] = useState(null);
  const [selectedFile20, setSelectedFile20] = useState(null);
 
  const [isFormValid, setIsFormValid] = useState(false);
  const [allLands, setAllLands] = useState([]);
  const handleShowPaymentModal = () => setShowPaymentModal(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
   const [documentAmount, setDocumentValue] = useState("");

    const [sizePlot, setSizePlot] = useState(plotNumber || "");
    const [imgError5, setImgError5] = useState("");
  const [selectedFile13, setSelectedFile13] = useState(null);

   
    const [selectedFile15, setSelectedFile15] = useState(null);
    const [selectedFile40, setSelectedFile40] = useState(null);
     const [selectedFile3, setSelectedFile3] = useState(null);
      const [customerPicture, setCustomerPicture] = useState("");
      const [businessName, setBusinessName] = useState("");
  
  
   
      const [nationality, setNationality] = useState("");
      const [status, setStatus] = useState("");
     
      const [userData, setUserData] = useState("");
      const [cac, setCac] = useState("");
      const [customerAddress, setCustomerAddress] = useState("");
      const [customerImage, setCustomerImage] = useState(null);
      const [dateInc, setDateInc] = useState("");
      const [customerEmail, setCustomerEmail] = useState("");
      const [selectedBusinessIndustry, setSelectedBusinessIndustry] = useState("");
      const [selectedEmploymentStatus, setSelectedEmploymentStatus] = useState("");
      const [customerPhone, setCustomerPhone] = useState("");
     
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
      const [preview, setPreview] = useState(false);
      const handlePreview = () => setPreview(true);
      const handleClosePreview = () => setPreview(false);
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
const lttAuthRef = useRef(null);
 const handleClick12 = () => {
    lttAuthRef.current.click();
  };
   const handleFileChange14 = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setImgError("File is larger than 2MB. Max upload size is 2MB.");
        setlttAuto("");
        return;
      } // Get the first selected file
      setlttAuto(file.name); // Set the file name
      setSelectedFile13([file]);
      setImgError(""); // Store the file in state
    }
  };
const [lttAuth, setlttAuto] = useState(" Letter of Authorisation");
 const [dirFirstName, setDirFirstName] = useState(customer?.director[0]?.first_name || "");
          const [dirFirstName2, setDirFirstName2] = useState(customer?.director[1]?.first_name || "");
      const [dirLastName, setDirLastName] = useState(customer?.director[0]?.last_name || "");
      const [dirLastName2, setDirLastName2] = useState(customer?.director[1]?.last_name || "");
      const [dirEmail, setDirEmail] = useState(customer?.director[0]?.email || "");
      const [dirEmail2, setDirEmail2] = useState(customer?.director[1]?.email || "");
      const [dirPhone, setDirPhone] = useState(customer?.director[0]?.phone || "");
      const [dirPhone2, setDirPhone2] = useState(customer?.director[1]?.phone || "");
      const [dirAddress, setDirAddress] = useState("");
      const [dirAddress2, setDirAddress2] = useState("");
      const [dirNin1, setDirNin1] = useState(customer?.director[0]?.nin || "");
      const [dirStin1, setDirStin1] = useState(customer?.director[0]?.stin || "");
      const [dirNin2, setDirNin2] = useState(customer?.director[0]?.nin || "");
      const [dirStin2, setDirStin2] = useState(customer?.director[1]?.stin || "");

  const readData = async () => {
    try {
      // const detail = await AsyncStorage.getItem("userName");
      // const details = await AsyncStorage.getItem("userToken");
      const detail = await AsyncStorage.getItem("userType");
            const details = await AsyncStorage.getItem("userToken");
            //  const detail = await AsyncStorage.getItem("userType");
            //       const details = await AsyncStorage.getItem("userToken");
                  const detailss = await AsyncStorage.getItem("cac");
                  const detailsss = await AsyncStorage.getItem("userName");
                  const businessName = await AsyncStorage.getItem("businessName");
                  const add = await AsyncStorage.getItem("add");
                  const inc = await AsyncStorage.getItem("incorporationDate");
                  const em = await AsyncStorage.getItem("em");
                  const ph = await AsyncStorage.getItem("ph");
                  const st = await AsyncStorage.getItem("st");
                  const lg = await AsyncStorage.getItem("lg");
                  const tin = await AsyncStorage.getItem("tin");
                  const nin = await AsyncStorage.getItem("nin");
                  const dateOfBirth = await AsyncStorage.getItem("dateOfBirth");
                  const gender = await AsyncStorage.getItem("gender");
                  const firstName = await AsyncStorage.getItem("firstName");
                  const secondName = await AsyncStorage.getItem("secondName");
                  const customerImage = await AsyncStorage.getItem("customerImage");
                  const customerPicture = await AsyncStorage.getItem("customerPicture");
                  const customerPhone = await AsyncStorage.getItem("userPhone");
                  const customerAddress = await AsyncStorage.getItem("userAddress");
                  const dob = await AsyncStorage.getItem("dateBirth");
                  const customerState = await AsyncStorage.getItem("stateOfOrigin");
                  const jobTitle = await AsyncStorage.getItem("businessType");
                  console.log(jobTitle, "Fetch job title");
                  const companyAddress = await AsyncStorage.getItem("companyAddress");
                  const companyPhone = await AsyncStorage.getItem("companyPhone");
                  const companyEmail = await AsyncStorage.getItem("companyEmail");
                  const nextOfKinFirstName = await AsyncStorage.getItem(
                    "nextOfKinFirstName"
                  );
                  const nextOfKinLastName = await AsyncStorage.getItem("nextOfKinLastName");
                  const nextOfKinEmail = await AsyncStorage.getItem("nextOfKinEmail");
                  const nextOfKinPhone = await AsyncStorage.getItem("nextOfKinPhone");
                  const nextOfKinAddress = await AsyncStorage.getItem("nextOfKinAddress");
                  const maritalStatus = await AsyncStorage.getItem("maritalStatus");
                  const nationality = await AsyncStorage.getItem("nationality");

      if (detail !== null) {
        // const firstName = detail.split(' ')[0];
        setName(detail);
      }

      if (details !== null) {
        setBearer(details);
      }
      if (detail !== null) {
        // const firstName = detail.split(' ')[0];
        setName(detail);
      }

      if (details !== null) {
        setBearer(details);
      }
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

  const fetchMeasurement = async () => {
    // setRoleLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/get_land_sizes`, { headers });
      const results = response.data?.data;
      // console.log(results, "measurement");
      setMeasurement(results);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to login page if unauthorized
        // navigate("/");
      } else {
        const errorStatus = error.response?.data?.message;
        console.log(errorStatus);
        setMeasurement([]);
      }
    } finally {
      // setRoleLoading(false);
    }
  };

  const fetchCaveatTypes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/all_caveat_type`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearer}`,
        },
      });

      const results = response.data?.data || [];
      setCaveatTypes(results);
      console.log(results);
    } catch (error) {
      console.error(error.response?.data?.message || "Error fetching data");
      setCaveatTypes([]);
    }
  };
  const fetchGovernorsType = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/all_governor_consent_type`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearer}`,
          },
        }
      );

      const results = response.data?.data || [];
      setConsentTypes(results);
      console.log(results);
    } catch (error) {
      console.error(error.response?.data?.message || "Error fetching data");
      setConsentTypes([]);
    }
  };

  useEffect(() => {
    if (bearer) {
      fetchCaveatTypes();
      fetchGovernorsType();
      fetchMeasurement();
    }
  }, [bearer]);

  useEffect(() => {
    readData();
  }, []);

  // const ogirsbearer = '160899|RABQPvT1BkXLzgNRJGczilhF3ulicc16GbhGSiIG';
  // setBearer1(ogirsbearer);

  // specify header
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${bearer}`,
  };

  useEffect(() => {
    const fetchSchemes = async () => {
      setRoleLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/customer/show_all_scheme`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearer}`,
            },
          }
        );
        const results = response.data?.data;
        setSchemes(results);
      } catch (error) {
        if (error.response && error.response.status === 401) {
        } else {
          const errorStatus = error.response?.data?.message;
          console.log(errorStatus);
          setSchemes([]);
        }
      } finally {
        setRoleLoading(false);
      }
    };
    fetchSchemes();
  }, [bearer]);

const [selectedZone, setSelectedZone] = useState("");
 const [selectedLocation, setSelectedLocation] = useState("");
const [selectedZoneName, setSelectedZoneName] = useState("");
const [selectedLocationName, setSelectedLocationName] = useState("");

  const handleDevStatus = (e) => {
    setSelectedDevelopment(e.target.value);
    // setShowErrorMessage(false);
  };

  const handleLandUse = (e) => {
    setSelectedLandUse(e.target.value);
    // setShowErrorMessage(false);
  };

  const handleProposedBuild = (e) => {
    setSelectedBuildingType(e.target.value);
    // setShowErrorMessage(false);
  };

  const handleAreaChange = (e) => {
    const selectedId = e.target.value;
    const areaName =
      tableData.find((item) => item.id.toString() === selectedId)
        ?.description || "";
    setSelectedArea(selectedId);
    setSelectedAreaName(areaName);
    console.log(areaName);
    if (selectedId) {
      fetchZone(selectedId); // Fetch locations based on selected area
    }
  };

  const handleZoneChange = (e) => {
      const selectedId = e.target.value;
      const zoneName =
        tableData2.find((item) => item.id.toString() === selectedId)
          ?.description || "";
      setSelectedZone(selectedId);
      setSelectedZoneName(zoneName);
      
      if (selectedId) {
        fetchArea(selectedId); // Fetch locations based on selected area
      }
    };
const [landLocationName, setLandLocationName] = useState('');

  const handleLocationChange = (e) => {
    const selectedId = e.target.value;
    const stationName =
      tableData2.find((item) => item.id.toString() === selectedId)?.location ||
      "";
    setLandLocationName(stationName);
    setLandLocation(e.target.value);
    // setShowErrorMessage(false);
  };

  const handleSourceFund = (e) => {
    setSelectedSource(e.target.value);
    // setShowErrorMessage(false);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setImgError("File is larger than 2MB. Max upload size is 2MB.");
        setFileName1("");
        return;
      }
      setFileName1(file.name);
      setSelectedFile([file]);
      setImgError("");
      // console.log(selectedFile)
    }
  };
  const handleErrorClose = () => {
    setShowModalError(false);
    handleShowPaymentModal();
  };

   const handleClickPass = () => {
    filePassportRef.current.click();
  };


  <Modal show={showModalError} onHide={handleErrorClose}>
    <Modal.Header closeButton>
      {/* <Modal.Title>Warning!</Modal.Title> */}
    </Modal.Header>
    <Modal.Body
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      className={classes.modalbodynew21}
    >
      <img
        src={crop}
        style={{ height: 48, width: 48, objectFit: "contain" }}
        alt="error"
      />
      <p
        style={{
          fontWeight: 700,
          marginTop: 17,
          fontSize: 16,
          color: "#000000",
        }}
      >
        Verification Failed
      </p>
      <p
        style={{
          fontWeight: 400,
          marginTop: 17,
          fontSize: 14,
          color: "#2E2E2E",
        }}
      >
        {modalMessage}
      </p>
      <Button
        style={{
          borderRadius: 8,
          width: 185,
          height: 44,
          fontWeight: 500,
          marginTop: 20,
          fontSize: 16,
          color: "#fff",
          backgroundColor: "#D92D20",
        }}
        className={classes.btnmodalerror}
        variant="danger"
        onClick={handleErrorClose}
      >
        Okay
      </Button>
    </Modal.Body>
  </Modal>;

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
  const handleFileChange10 = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setImgError3("File is larger than 2MB. Max upload size is 2MB.");
        setFileName10("");
        return;
      } // Get the first selected file
      setFileName10(file.name); // Set the file name
      setSelectedFile30([file]);
      setImgError3(""); // Store the file in state
    }
  };

  const handleFileChange20 = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setImgError2("File is larger than 2MB. Max upload size is 2MB.");
        setFileName20("");
        return;
      } // Get the first selected file
      setFileName20(file.name); // Set the file name
      setSelectedFile20([file]);
      setImgError2(""); // Store the file in state
    }
  };

  const handleCheckboxChange = (event) => {
    setAttestation(event.target.checked);
    // setAttestation(true);
  };

  useEffect(() => {
    // Check if all required fields are filled
    const isValid =
      selectedArea &&
      landLocation &&
      // sizeSqm &&
      selectedDevelopment &&
      // selectedLandUse &&
      selectedBuildingType &&
      // timeLine &&
      selectedUnit &&
      sizePlot &&
      selectedSource &&
      totalAmount &&
      selectedFile &&
      selectedFile30 &&
      selectedFile20 &&
      ninValues &&
      // selectedFile2 &&
      attestation;
     

    setIsFormValid(isValid);
  }, [
    selectedArea ,
    landLocation ,
    // sizeSqm ,
    selectedDevelopment ,
    // selectedLandUse ,
    selectedBuildingType ,
    // timeLine ,
    selectedSource ,
    selectedUnit,
    sizePlot,
    totalAmount ,
    selectedFile ,
    selectedFile30 ,
    selectedFile20 ,
    ninValues,
    // selectedFile2 ,
    attestation
  ]);

  console.log(selectedFile);
  const handleErrorOpen = () => {
    setShowModalError(true);
    // handleShowPaymentModal();
  };

  const createApplication = async () => {
    setCreateLoading(true);
    try {
      const formData = new FormData();
      if (selectedFile && selectedFile.length > 0) {
        formData.append("file", selectedFile[0]);
      }
      if (selectedFile2 && selectedFile2.length > 0) {
        formData.append("document", selectedFile2[0]);
      }
      if (selectedFile30 && selectedFile30.length > 0) {
        formData.append("purchase_agreement", selectedFile30[0]);
      }
      if (selectedFile20 && selectedFile20.length > 0) {
        formData.append("purchase_receipt", selectedFile20[0]);
      }
      if (selectedFile && selectedFile.length > 0) {
        formData.append("file", selectedFile[0]);
      }
      if (selectedFile2 && selectedFile2.length > 0) {
        formData.append("document", selectedFile2[0]);
      }
      if (selectedFile3 && selectedFile3.length > 0) {
        formData.append("passport_photograph", selectedFile3[0]);
      }
      if (selectedFile13 && selectedFile13.length > 0) {
        formData.append("letter_of_auth", selectedFile13[0]);
      }
      formData.append("lga_of_land", selectedArea);
      formData.append("estimated_development_amount", totalAmount);
      formData.append("title_of_document", titleDocument);
      formData.append("land_development_status", selectedDevelopment);
      formData.append("land_location", landLocation);
      formData.append("time_line", timeLine);
      formData.append("size_in_plot", sizePlot);
      formData.append("size_in_sqm", selectedUnit);
      formData.append("landuse_id", landUse);
      formData.append("proposed_residential_building", selectedBuildingType);
      formData.append("proposed_source_of_fund", selectedSource);
      formData.append("code", paymentCode);
      // formData.append("nin_number", ninValues);
      // formData.append("type", serviceID);
      formData.append("app_number", appNumber);
      ninValues.forEach((nin) => {
        formData.append("nin[]", nin); 
      });
      formData.append("is_joint", isJointOwnershipNumeric);
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${bearer}`,
      };
      const response = await axios.post(
        `${BASE_URL}/apply_for_land_allocation`,
        formData,
        { headers }
      );
      // setModalMessage(response.data.message);

      Swal.fire({
        imageUrl: verified,
        title: 'Success!',
        text: response.data.message,
        confirmButtonText: "Okay",
        imageWidth: 48, 
  imageHeight: 48, 
  customClass: {
    title: classes.myTitle,
    popup: classes.myText,
    confirmButton: classes.myButton,
  },
  allowOutsideClick: false, // Prevent closing by clicking outside
  preConfirm: () => {
    Swal.close(); // Explicitly close the modal
  }
      });
navigate('/applications');
      setAllocationDate("");
      setLandLocation("");
      // setTimeLine("");
      setSelectedArea("");
      setSelectedUnit("");
      setSizePlot("");
      setSelectedDevelopment("");
      setSelectedBuildingType("");
      setSelectedDevelopment("");
      setSelectedLGA("");
      setSelectedLandUse("");
      setSelectedSource("");
      setTotalAmount("");
      setSelectedFile("");
      setFileName1("Survey Plan");
      setFileName("Other Supporting documents");
      setAttestation(false);
      setFileName10("Purchase Agreement");
      setSelectedFile30("");
      setFileName20("Purchase Receipt");
      setSelectedFile20("");
      
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
        // setShowModalError(true);
        // setModalMessage(JSON.stringify(error.response.data.message));
        Swal.fire({
          imageUrl: crop,
          imageWidth: 48, 
          imageHeight: 48, 
          title: "Failed!",
          confirmButtonText: "Okay",
          text: JSON.stringify(error.response.data.message),
          customClass: {
            title: classes.myTitle,
            popup: classes.myText,
            confirmButton: classes.myDeclineButton,
          },
          allowOutsideClick: false, // Prevent closing by clicking outside
          preConfirm: () => {
            Swal.close(); // Explicitly close the modal
          }
        });
      }
    } finally {
      setCreateLoading(false);
    }
  };

  <Modal show={true} onHide={handleErrorClose}>
    <Modal.Header closeButton>
      {/* <Modal.Title>Warning!</Modal.Title> */}
    </Modal.Header>
    <Modal.Body
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      className={classes.modalbodynew21}
    >
      <img
        src={crop}
        style={{ height: 48, width: 48, objectFit: "contain" }}
        alt="error"
      />
      <p
        style={{
          fontWeight: 700,
          marginTop: 17,
          fontSize: 16,
          color: "#000000",
        }}
      >
        Verification Failed
      </p>
      <p
        style={{
          fontWeight: 400,
          marginTop: 17,
          fontSize: 14,
          color: "#2E2E2E",
        }}
      >
        {modalMessage}
      </p>
      <Button
        style={{
          borderRadius: 8,
          width: 185,
          height: 44,
          fontWeight: 500,
          marginTop: 20,
          fontSize: 16,
          color: "#fff",
          backgroundColor: "#D92D20",
        }}
        className={classes.btnmodalerror}
        variant="danger"
        onClick={handleErrorClose}
      >
        Okay
      </Button>
    </Modal.Body>
  </Modal>;



const handleOpenSuccessModal = () => {
  setShowModalSuccess(true);
  navigate("/applications"); // Navigate after closing the modal
};




  const fetchAllLandUse = async () => {
    // setRoleLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/all_land_use`, { headers });
      const results = response.data?.data;
      // console.log(results);
      setAllLands(results);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to login page if unauthorized
        // navigate("/");
      } else {
        const errorStatus = error.response?.data?.message;
        console.log(errorStatus);
        setAllLands([]);
      }
    } finally {
      // setRoleLoading(false);
    }
  };

  const fetchAllApplications = async () => {
    setRoleLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/fetch_all`, { headers });
      const results = response.data?.data;
      setAllApplications(results);
      console.log(results);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to login page if unauthorized
        // navigate('/');
      } else {
        const errorStatus = error.response?.data?.message;
        console.log(errorStatus);
        setAllApplications([]);
      }
    } finally {
      setRoleLoading(false);
    }
  };

  useEffect(() => {
    if (bearer) {
      fetchAllLandUse();
      fetchAllApplications();
    }
  }, [bearer]);

  const bearerToken = "160899|RABQPvT1BkXLzgNRJGczilhF3ulicc16GbhGSiIG";

  const fetchTaxStations = async () => {
    // Set up headers with the Bearer token
    const headers = {
      Authorization: `Bearer ${bearerToken} `,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.get(
        "https://api.ogetax.ogunstate.gov.ng/api/get-areas",
        { headers }
      );

      // const results = response.data?.data?.areas;
      const resultsss = response.data?.data?.stations;
      // setTableData(results);
      setTableData1(resultsss);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to login page if unauthorized
        // navigate("/");
      } else {
        const errorStatus = error.response?.data?.message;
        console.log(errorStatus);
        setTableData1([]);
      }
    }
  };

  // useEffect(() => {
  //   if (bearerToken) {
  //     fetchTaxStations();
  //   }
  // }, [bearerToken]);

  const fetchTax = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/fetch-local-govt`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearer}`,
        },
      });

      const results = response.data?.data;
      // const resultsss = response.data?.data?.stations;
      setTableData(results);
      // setTableData1(resultsss);
      console.log(results);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to login page if unauthorized
        // navigate("/");
      } else {
        const errorStatus = error.response?.data?.message;
        console.log(errorStatus);
        setTableData([]);
      }
    }
  };

  useEffect(() => {
    if (bearer) {
      fetchTax();
    }
  }, [bearer]);

  const fetchStatus = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/all_land_status`, {
        headers,
      });
      const results = response.data?.data;
      setTableData32(results);
      console.log(results);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setTableData32([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (bearer) {
      fetchStatus();
    }
  }, [bearer]);

 const fetchZone = async (selectedArea) => {
     try {
       const response = await axios.get(
         `${BASE_URL}/get_zones_by_lga?id=${selectedArea}`,
         {
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${bearer}`,
           },
         }
       );
 
       const resultsss = response.data?.data;
       setTableData2(resultsss);
       console.log(resultsss);
     } catch (error) {
       if (error.response && error.response.status === 401) {
         // Redirect to login page if unauthorized
         // navigate("/");
       } else {
         const errorStatus = error.response?.data?.message;
         console.log(errorStatus);
         setTableData2([]); // Ensure this is set properly
       }
     }
   };
 
   const fetchArea = async (selectedZone) => {
     try {
       const response = await axios.get(
         `${BASE_URL}/get_locations_by_zone?id=${selectedZone}`,
         {
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${bearer}`,
           },
         }
       );
 
       const resultsss = response.data?.data;
       setTableData45(resultsss);
       console.log(resultsss);
     } catch (error) {
       if (error.response && error.response.status === 401) {
         // Redirect to login page if unauthorized
         // navigate("/");
       } else {
         const errorStatus = error.response?.data?.message;
         console.log(errorStatus);
         setTableData45([]); // Ensure this is set properly
       }
     }
   };
 
   useEffect(() => {
     if (bearer) {
       fetchArea();
       fetchZone();
     }
   }, [bearer]);

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

   const [stampLoading, setStampLoading] = useState(false);
       const fetchStampCode = async () => {
         setStampLoading(true);
       try {
         const response = await axios.get(`${BASE_URL}/validate-payment-code`, {
           params: {
             code: stampCode
           },
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${bearer}`,
           },
         });
   
         const results = response.data?.message || '';
         setStampError(results);
        //  setValidateStamp(true)
         console.log(results);
       } catch (error) {
         // console.error(response?.data?.message || "Error fetching data");
         setStampError(error?.response.data?.message);
         
        //  setValidateStamp(false)
       } finally {
         setStampLoading(false);
       }
     };

    useEffect(() => {
      if (stampCode.trim() === '') {
        setStampError('');
        return;
      }
    
      const delayDebounceFn = setTimeout(() => {
        fetchStampCode();
      }, 600); 
    
      return () => clearTimeout(delayDebounceFn);
    }, [stampCode, bearer]);
  
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

  const handleAddOwner = () => {
    setNinValues([...ninValues, '']);
    setNameValues([...nameValues, { firstname: '', surname: '' }]);
    // setNameValues([nameValues]);
    setErrors([...errors, '']);
    setLoadingStates([...loadingStates, false]);
    debounceTimers.current.push(null);
  };

  const handleRemoveOwner = (index) => {
    const newNinValues = [...ninValues];
    const newNameValues = [...nameValues];
    const newErrors = [...errors];
    const newLoadingStates = [...loadingStates];
    newNinValues.splice(index, 1);
    newNameValues.splice(index, 1);
    newErrors.splice(index, 1);
    newLoadingStates.splice(index, 1);
    debounceTimers.current.splice(index, 1);
    setNinValues(newNinValues);
    // setNameValues([nameValues]);
    setNinValues(newNinValues);
    setNameValues(newNameValues);
    setErrors(newErrors);
    setLoadingStates(newLoadingStates);
  };

  const validateNIN = (value) => {
    if (!/^\d{11}$/.test(value)) {
      return 'Please input a valid NIN (11 digits)';
    }
    return '';
  };

  
  const handleNinChange = (index, value) => {
    const newNinValues = [...ninValues];
    newNinValues[index] = value;
    setNinValues(newNinValues);

    const error = validateNIN(value);
    const newErrors = [...errors];
    newErrors[index] = error;
    setErrors(newErrors);

    const newNameValues = [...nameValues];
    newNameValues[index] = { firstname: '', surname: '' };
    setNameValues(newNameValues);
    // setNameValues([nameValues]);

    if (!error) {
      const newLoadingStates = [...loadingStates];
      newLoadingStates[index] = true;
      setLoadingStates(newLoadingStates);

      if (debounceTimers.current[index]) {
        clearTimeout(debounceTimers.current[index]);
      }

      debounceTimers.current[index] = setTimeout(() => {
        validateNINFromAPI(value, index);
      }, 2000);
    } else {
      const newLoadingStates = [...loadingStates];
      newLoadingStates[index] = false;
      setLoadingStates(newLoadingStates);
    }
  };


  const validateNINFromAPI = async (nin, index) => {
    try {
      const response = await axios.get(`${BASE_URL}/validate_for_joint`, {
        params: { 
          nin: nin, 
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearer}`,
        },
      });
  
      const newNameValues = [...nameValues];
      newNameValues[index] = {
        firstname: response.data.data.first_name || '',
        surname: response.data.data.last_name || '',
      };
      setNameValues(newNameValues);
      // setNameValues(response.data.data);
      const newErrors = [...errors];
      newErrors[index] = response.data.message || 'Validation successful';
      setErrors(newErrors);
    } catch (error) {
      console.error('API Validation Error:', error);

      const newErrors = [...errors];
    // Safely access the message from error response
    const errorMessage =
      error?.response?.data?.message || 'Failed to validate NIN';
    newErrors[index] = errorMessage;
    setErrors(newErrors);

    // Clear name on failure
    const newNameValues = [...nameValues];
    newNameValues[index] = { firstname: '', surname: '' };
    setNameValues(newNameValues);
      
    } finally {
      const updatedLoadingStates = [...loadingStates];
      updatedLoadingStates[index] = false;
      setLoadingStates(updatedLoadingStates);
    }
  };


  useEffect(() => {
    if (!isJointOwnership) {
      setNinValues([]);
      setNameValues([]);
      setErrors([]);
      setLoadingStates([]);
      debounceTimers.current = [];
    } else if (ninValues.length === 0) {
      handleAddOwner();
    }
  }, [isJointOwnership]);

  const handleJointOwnershipChange = (e) => {
    const value = e.target.checked;
    setIsJointOwnership(value);
    setIsJointOwnershipNumeric(value ? 1 : 0);
    console.log("boolean:", value, "numeric:", value ? 1 : 0);
  };



const {isDarkMode} = useTheme()
  return (
    <>
       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Body className="text-center" style={{backgroundColor: isDarkMode && 'black',border: isDarkMode && "1px solid white",borderRadius:'8px'}}>
            <FaInfoCircle size={50} className="text-warning mb-3" />
    
              <h5 className="fw-bold" style={{color:isDarkMode && "white"}}>Submit Open Land Allocation Form</h5>
              <p className={isDarkMode ? "text-white" : "text-muted"}>Are you sure you want to proceed?</p>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center" style={{backgroundColor: isDarkMode && 'black',border: isDarkMode && "1px solid white"}}>
              <Button variant="secondary" onClick={() => setShowModal(false)} className={classes.invBtn}>
                No
              </Button>
              <Button variant="primary" onClick={handleConfirm} className={classes.appBtn}>
                Yes, Proceed
              </Button>
            </Modal.Footer>
          </Modal>
        <Modal
                    show={preview}
                    onHide={handleClosePreview}
                    size="lg"
                    centered
                  >
                    <Modal.Header>
                      <Modal.Title
                        style={{
                          fontSize: 18,
                          color: "#333333",
                          fontWeight: 500,
                        }}
                      >
                       Preview Open Land Allocation Form
                      </Modal.Title>
                      <Button
                        variant="close"
                        onClick={handleClosePreview}
                      ></Button>
                    </Modal.Header >
                    <Modal.Body style={{backgroundColor: isDarkMode && 'black',border: isDarkMode && "1px solid white"}}>
                    <div>
              
              <div className={isDarkMode ? classes.applicationHistoryy : classes.applicationHistory} style={{border: isDarkMode && "0px"}}>
               <div></div>
              <h4 className={isDarkMode ? classes.wlcm1 : classes.wlcmModal}>APPLICATION FORM FOR OPEN LAND ALLOCATION</h4>
            
            
                             <div className={classes.firstDiv}>
                         
                               <div className={isDarkMode ? classes.firstInfos : classes.firstInfo}>
                            
                                 
                                 {/* <h1>
                                   {userData === "corporate"
                                     ? "Corporate Information"
                                     : "Personal Information"}
                                 </h1> */}
                                 {/* <h2>Update your photo and details here.</h2> */}
                               </div>
                               {/* <div className={classes.editDetailsBtn}>
                                 <h1>Edit Details</h1>
                               </div> */}
                             </div>
                             <div className={classes.profileContainer}>
                               <img
                                 src={
                                     customer?.photo
                                       ? customer.photo
                                       : customer?.picture
                                       ? customer.picture
                                       : ProfileIcon
                                   }
                                 className={classes.imgPass}
                                 alt="profileImage"
                                 onError={(e) => (e.target.src = ProfileIcon)}
                               />
           
                     
                             </div>
                             {/* <div className={classes.cameraPtn}>
                 <img
                   className={classes.cameraIcon}
                   src={CameraIcon}
                   alt="camera"
                 />
               </div> */}
               
                             <div className={classes.formCont}>
                             <div className={isDarkMode ? classes.firstInfos : classes.firstInfo} style={{marginTop:30}}>
                                     <h1 style={{textTransform:'uppercase',marginTop:10,marginLeft:0}}>{customer?.user_type === "individual" ? 'PERSONAL INFORMATION' : 'CORPORATE INFORMATION'}</h1>
                                   </div>
                             {/* <p  className={classes.formPrg} style={{}}>All fields marked with an asterisk (*) are required</p> */}
                               {customer?.user_type === "individual" && (
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
                                             value={customer?.first_name}
                                             type="text"
                                             //placeholder="Toluwani"
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
                                             value={customer?.last_name}
                                             type="text"
                                             //placeholder="Adekoya"
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
                                             value={customer?.tin}
                                             className={classes.formInpt}
                                             type="text"
                                             //placeholder="12345678-1234"
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
                                             value={customer?.nin}
                                             className={classes.formInpt}
                                             type="text"
                                             //placeholder="123456789098764"
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
                                             value={customer?.email}
                                             onChange={(e) =>
                                               setCustomerEmail(e.target.value)
                                             }
                                             type="email"
                                             //placeholder="adekoyatoluwani5@gmail.com"
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
                                             value={customer?.phone}
                                             type="tel"
                                             //placeholder="070 1798 1231"
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
                                             value={customer?.dob}
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
                                             value={customer?.gender}
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
                                             disabled
                                             value={customer?.address}
                                             type="text"
                                             //placeholder="Enter address"
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
                                             disabled
                                             value={customer?.marital_status}
                                             onChange={(e) => setStatus(e.target.value)}
                                           >
                                             <option>Select Status</option>
                                             <option value="single">Single</option>
                                             <option value="married">Married</option>
                                             <option value="divorce">Divorce</option>
                                             <option value="seperated">Seperated</option>
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
                                             disabled
                                             value={customer?.nationality}
                                             onChange={(e) =>
                                               setNationality(e.target.value)
                                             }
                                           >
                                             <option>Select Nationality</option>
                                             <option value="nigerian">Nigerian</option>
                                             <option value="non-nigerian">Non-Nigerian</option>
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
                                             disabled
                                             value={
                                              customer?.state
                                             }
                                             onChange={(e) =>
                                               setCustomerState(e.target.value)
                                             }
                                           >
                                             <option>Select State</option>
                                             {statesInNigeria.map((state) => (
                                               <option key={state} value={state.toLowerCase()}>
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
                                             disabled
                                             value={
                                               customer?.lga ?? ""
                                             }
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
    {/*               
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
                                       </Col> */}
                                     </Row>
           
                                     <Row className="mb-3"></Row>
           
                                     {/* <Button
                                       className={classes.editDetailsBtn1}
                                       variant="success"
                                       onClick={() => customerInfo()}
                                     >
                                       {customerLoading ? (
                                         <>
                                           <Spinner size="sm" />
                                        
                                         </>
                                       ) : userData === "corporate" ? (
                                         "Upload Corporate Information"
                                       ) : (
                                         "Upload Personal Information"
                                       )}
                                     </Button> */}
                                   </Form>
                                   {customer?.user_type === "individual" && (
                             <>
                               <div style={{ }} />
                               <div className={isDarkMode ? classes.applicationHistoryy : classes.applicationHistory} style={{border: isDarkMode && "0px",paddingLeft:isDarkMode && "0px"}}>
                                 <div className={classes.firstDiv}>
                                  
                                 </div>
           
                                 <div className={classes.formCont}>
                                 <div className={isDarkMode ? classes.firstInfos : classes.firstInfo} style={{marginTop:30}}>
                                     <h1 style={{textTransform:'uppercase'}}>Occupation Information</h1>
                                   </div>
                                  
                                     <Form>
                                       <Row className="mb-3">
                                         <Col md={6}>
                                           <Form.Group controlId="formInput1">
                                             <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                               Company's Name
                                             </Form.Label>
                                             <Form.Control
                                               className={classes.formInpt}
                                               value={customer?.business_name}
                                               disabled
                                               onChange={(e) =>
                                                 setBusinessName(e.target.value)
                                               }
                                               type="text"
                                               //placeholder="ABC Company"
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
                                               value={customer?.job_title}
                                               disabled
                                               onChange={(e) =>
                                                 setJobTitle(e.target.value)
                                               }
                                               type="text"
                                               //placeholder="Managing Director"
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
                                             disabled
                                               value={customer?.business_industry}
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
                                               value={customer?.company_address}
                                               disabled
                                               onChange={(e) => setAddress(e.target.value)}
                                               type="text"
                                               //placeholder="Enter Address"
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
                                               value={customer?.company_phone}
                                               disabled
                                               onChange={(e) =>
                                                 setcompPhone(e.target.value)
                                               }
                                               type="text"
                                               //placeholder="Enter Phone Number"
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
                                               value={customer?.company_email}
                                               disabled
                                               onChange={(e) =>
                                                 setCompEmail(e.target.value)
                                               }
                                               type="text"
                                               //placeholder="Enter Email Address"
                                             />
                                           </Form.Group>
                                         </Col>
                                       </Row>
                                     </Form>
                                  
                                   {/* <div className={classes.editDetailsBtn}>
                                     <button onClick={() => occupationInformation()}>
                                       {loading ? "Updating" : "Update Details"}
                                     </button>
                                   </div> */}
                                 </div>
                               </div>
                             </>
                           )}
                           {customer?.user_type === "individual" && (
                             <>
                               <div style={{  }} />
                               <div className={isDarkMode ? classes.applicationHistoryy : classes.applicationHistory} style={{border: isDarkMode && "0px",paddingLeft:isDarkMode && "0px"}}>
                                 <div className={classes.firstDiv}>
                                  
                                 </div>
           
                                 <div className={classes.formCont}>
                                 <div className={isDarkMode ? classes.firstInfos : classes.firstInfo}>
                                     <h1 style={{textTransform:'uppercase'}}>Next of Kin Information</h1>
                                   </div>
                                   
                                     <Form>
                                       <Row className="mb-3">
                                         <Col md={6}>
                                           <Form.Group controlId="formInput1">
                                             <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                               First Name
                                             </Form.Label>
                                             <Form.Control
                                               className={classes.formInpt}
                                               value={customer?.kin_first_name}
                                               disabled
                                               onChange={(e) =>
                                                 setNokFirstName(e.target.value)
                                               }
                                               type="text"
                                               //placeholder="Toluwani"
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
                                               value={customer?.kin_last_name}
                                               disabled
                                               onChange={(e) =>
                                                 setNokLastName(e.target.value)
                                               }
                                               type="text"
                                               //placeholder="Adekoya"
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
                                               value={customer?.kin_email}
                                               disabled
                                               onChange={(e) =>
                                                 setNokEmail(e.target.value)
                                               }
                                               type="email"
                                               //placeholder="adekoyatoluwani5@gmail.com"
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
                                               value={customer?.kin_phone}
                                               disabled
                                               onChange={(e) =>
                                                 setNokPhone(e.target.value)
                                               }
                                               type="tel"
                                               //placeholder="070 1798 1231"
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
                                               value={customer?.kin_address}
                                               disabled
                                               onChange={(e) =>
                                                 setNokAddress(e.target.value)
                                               }
                                               type="address"
                                               //placeholder="adekoyatoluwani5@gmail.com"
                                             />
                                           </Form.Group>
                                         </Col>
                                       </Row>
                                     </Form>
                                   
                                   {/* <div className={classes.editDetailsBtn}>
                                     <button onClick={() => occupationInformation()}>
                                       {loading ? "Updating" : "Update Details"}
                                     </button>
                                   </div> */}
                                 </div>
                               </div>
                             </>
                           )}
           
                                 </Container>
                               )}
                               {customer?.user_type === "corporate" && (
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
                                                             value={customer?.business_name}
                                                             type="text"
                                                             //placeholder="Toluwani"
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
                                                             value={customer?.cac}
                                                             type="text"
                                                             //placeholder="Adekoya"
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
                                                             value={customer?.email}
                                                             type="email"
                                                             //placeholder="adekoyatoluwani5@gmail.com"
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
                                                             value={customer?.phone}
                                                             //placeholder="070 1798 1231"
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
                                                             value={customer?.address}
                                                             //placeholder="Enter address"
                                                           />
                                                         </Form.Group>
                                                       </Col>
                                                       <Col md={6}>
                                                         <Form.Group controlId="dob">
                                                           <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>Date of Incorporation</Form.Label>
                                                           <Form.Control
                                                             className={classes.formInpt}
                                                             disabled
                                                             value={customer?.date_incorporated}
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
                                                               customer?.state
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
                                                             value={customer?.lga}
                                                             type="text"
                                                             //placeholder="12345678-1234"
                                                           />
                                                         </Form.Group>
                                                       </Col>
                                                       {/* <Col md={6}>
                                                       <Form.Group controlId="formInput5">
                                                         <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>NIN Number</Form.Label>
                                                         <Form.Control className={classes.formInpt} type="text" //placeholder="123456789098764" />
                                                       </Form.Group>
                                                     </Col> */}
                                                     </Row>

                                                     <div>

                                            <div className={classes.firstDiv}>
                                              <div className={classes.firstInfo}>
                                                <h1>Director's Information</h1>
                                              </div>
                                              {/* <div className={classes.editDetailsBtn}>
                                                <h1>Edit Details</h1>
                                              </div> */}
                                            </div>
                      

                                            <div>
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
                                                          // value={dirFirstName}
                                                          disabled
                                                          // onChange={(e) =>
                                                          //   setDirFirstName(e.target.value)
                                                          // }
                                                          type="text"
                                                          //placeholder="Toluwani"
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
                                                          // value={dirLastName}
                                                          // onChange={(e) =>
                                                          //   setDirLastName(e.target.value)
                                                          // }
                                                          type="text"
                                                          //placeholder="Adekoya"
                                                        />
                                                   
                                                      </Form.Group>
                                                    </Col>
                                                  </Row>
                      
                                                  <Row className="mb-3">
                                                    <Col md={6}>
                                                      <Form.Group controlId="formInput3">
                                                        <Form.Label className={classes.formLabel}>
                                                          Email 
                                                        </Form.Label>
                                                        <Form.Control
                                                          className={classes.formInpt}
                                                          disabled
                                                          // value={dirEmail}
                                                          // onChange={(e) =>
                                                          //   setDirEmail(e.target.value)
                                                          // }
                                                          type="email"
                                                          //placeholder="adekoyatoluwani5@gmail.com"
                                                          />
                                                          
                                                      </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                      <Form.Group controlId="formInput4">
                                                        <Form.Label className={classes.formLabel}>
                                                          Telephone Number 
                                                        </Form.Label>
                                                        <Form.Control
                                                          className={classes.formInpt}
                                                          disabled
                                                          // value={dirPhone}
                                                          // onChange={(e) =>
                                                          //   setDirPhone(e.target.value)
                                                          // }
                                                          type="number"
                                                          //placeholder="070 1798 1231"
                                                        />
                                                    
                                                      </Form.Group>
                                                    </Col>
                                                  </Row>
                                                  <Row className="mb-3">
                                                    
                                                    <Col md={6}>
                                                      <Form.Group controlId="formInput3">
                                                        <Form.Label className={classes.formLabel}>
                                                          NIN 
                                                        </Form.Label>
                                                        <Form.Control
                        className={classes.formInpt}
                        disabled

                        // value={dirNin1}
                        // disabled
                        // onChange={(e) => {
                        //   const value = e.target.value;
                          
                        //     setDirNin1(value);
                        // }}
                        type="number"
                        //placeholder="12345678900"
                      />
                      
                         
                                                      </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                      <Form.Group controlId="formInput3">
                                                        <Form.Label className={classes.formLabel}>
                                                          STIN 
                                                        </Form.Label>
                                                        <Form.Control
                                                        
                                                        disabled
                                                          className={classes.formInpt}
                                                          // value={dirStin1}
                                                          // onChange={(e) =>
                                                          //   setDirStin1(e.target.value)
                                                          // }
                                                          type="number"
                                                          //placeholder="12345678900"
                                                        />
                                                        
                                                   
                                                      </Form.Group>
                                                    </Col>
                                                  </Row>
                                                </Form>
                                            
                                              </Container>
                                            </div>
                      
                                            <div>
                                            <div className={classes.firstDiv}>
                                              <div className={classes.firstInfo}>
                                                <h1>Director's Information</h1>
                                              </div>
                                              
                                            </div>
                                            <div >
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
                                                          value={dirFirstName2}
                                                          onChange={(e) =>
                                                            setDirFirstName2(e.target.value)
                                                          }
                                                          type="text"
                                                          //placeholder="Toluwani"
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
                                                          value={dirLastName2}
                                                          onChange={(e) =>
                                                            setDirLastName2(e.target.value)
                                                          }
                                                          type="text"
                                                          //placeholder="Adekoya"
                                                        />
                                                    
                                                      </Form.Group>
                                                    </Col>
                                                  </Row>
                      
                                                  <Row className="mb-3">
                                                    <Col md={6}>
                                                      <Form.Group controlId="formInput3">
                                                        <Form.Label className={classes.formLabel}>
                                                          Email 
                                                        </Form.Label>
                                                        <Form.Control
                                                          className={classes.formInpt}
                                                          disabled
                                                          value={dirEmail2}
                                                          onChange={(e) =>
                                                            setDirEmail2(e.target.value)
                                                          }
                                                          type="email"
                                                          //placeholder="adekoyatoluwani5@gmail.com"
                                                          />
                                                          
                                                      </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                      <Form.Group controlId="formInput4">
                                                        <Form.Label className={classes.formLabel}>
                                                          Telephone Number 
                                                        </Form.Label>
                                                        <Form.Control
                                                        disabled
                                                          className={classes.formInpt}
                                                          value={dirPhone2}
                                                          onChange={(e) =>
                                                            setDirPhone2(e.target.value)
                                                          }
                                                          type="number"
                                                          //placeholder="070 1798 1231"
                                                        />
                                                   
                                                      </Form.Group>
                                                    </Col>
                                                  </Row>
                                                  <Row className="mb-3">
                                                  <Col md={6}>
                                                      <Form.Group controlId="formInput3">
                                                        <Form.Label className={classes.formLabel}>
                                                          NIN 
                                                        </Form.Label>
                                                        <Form.Control
                        className={classes.formInpt}
                        disabled
                        value={dirNin2}
                        // disabled
                        onChange={(e) => {
                          const value = e.target.value;
                            setDirNin2(value);                      }}
                        type="number"
                        //placeholder="12345678900"
                      />
                                                    
                                                      
                                                      </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                      <Form.Group controlId="formInput3">
                                                        <Form.Label className={classes.formLabel}>
                                                          STIN 
                                                        </Form.Label>
                                                        <Form.Control
                                                       
                                                        disabled
                                                          className={classes.formInpt}
                                                         
                                                          value={dirStin2}
                                                          onChange={(e) =>
                                                            setDirStin2(e.target.value)
                                                          }
                                                          type="number"
                                                          //placeholder="12345678900"
                                                        />
                                                        
                                                     
                                                      </Form.Group>
                                                    </Col>
                                                  </Row>
                                                </Form>
                                                
                                                  
                                              </Container>
                                            </div>
                      
                                            </div>
                      
                      
                                          </div>
                                      
                                                   </Form>
                                 </Container>
                               )}
                             </div>
                           </div>
           
                          
                           <div style={{ marginTop: -70 }} />
                           {/* <div className={isDarkMode ? classes.applicationHistory11 : classes.applicationHistory1}>
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
                                           //placeholder="Enter Current Password"
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
                                           //placeholder="Enter New Password"
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
                                           //placeholder="Confirm New Password"
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
         </div>
         {/* <div className={classes.formContainer}> */}
         <div className={isDarkMode ? classes.firstInfos : classes.firstInfo} style={{marginTop:30}}>
                                     <h1 style={{textTransform:'uppercase',marginLeft:isDarkMode ? 30 : 10,}}>Open Land Allocation Form</h1>
                                   </div>
                                   <Form className={isDarkMode ? classes.formContainer1 : classes.formContainer} style={{paddingTop:0,marginTop:0,border: isDarkMode && "0px",paddingLeft:isDarkMode ? "30px" : "10px"}}>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="lga">
                    <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                     Local Government Area of Land
                    </Form.Label>
                    <Form.Control
                      as="select"
                      className={`form-select ${classes.optioncss}`}
                      value={selectedArea}
                      onChange={handleAreaChange}
                      required
                      disabled
                    >
                      <option value="">Select Area</option>
                     {tableData?.map((item, index) => (
                 <option
                   key={index}
                   value={item.id}
                   name={item.local_govt}
                 >
                   {item.local_govt}
                 </option>
               ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                 <Col md={6}>
                                  <Form.Group controlId="lga">
                                    <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                                      Zone of Land<span style={{color:"red"}}>*</span>
                                    </Form.Label>
                                    <Form.Control
                                      as="select"
                                      className={`form-select ${classes.optioncss}`}
                                      value={selectedZone}
                                      onChange={handleZoneChange}
                                      required
                                      disabled
                                    >
                                      <option value="">Select Zone</option>
                                      {tableData2?.map((item, index) => (
                                        <option
                                          key={index}
                                          value={item.id}
                                          name={item.description}
                                        >
                                          {item.description}
                                        </option>
                                      ))}
                                    </Form.Control>
                                  </Form.Group>
                                </Col>
                <Col md={6}>
                  <Form.Group controlId="lga">
                    <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                      Land Location
                    </Form.Label>
                    <Form.Control
                      as="select"
                      className={`form-select ${classes.optioncss}`}
                      value={landLocation}
                      onChange={handleLocationChange}
                      required
                      disabled
                    >
                      <option value="">Select Location</option>
                      {tableData45?.map((item, index) => (
                        <option
                          key={index}
                          value={item.id}
                          name={item.description}
                        >
                          {item.description}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
         <Form.Group controlId="landUnitSelect">
                <Form.Label>Unit Of Measurement of Land</Form.Label>
                <Form.Select value={selectedUnit}  disabled className={classes.optioncss} onChange={(e) => setSelectedUnit(e.target.value)}>
                <option value="">Select Unit</option>
                {measurement.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
                </Form.Select>
              </Form.Group>
         </Col>
                  <Col md={6}>
                              <Form.Group controlId="proposedTimeline">
                                <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                                  Size of Land
                                </Form.Label>
                                <Form.Control
                                  type="number"
                                  className={classes.optioncss}
                                  //placeholder="Enter size of land in number e.g 2"
                                  value={sizePlot}
                                  disabled
                                  onChange={(e) => setSizePlot(e.target.value)}
                                />
                              </Form.Group>
                            </Col>
                    
       </Row>

              <Row className="mb-3">
                
                <Col md={6}>
                  <Form.Group controlId="developmentStatus">
                    <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                      Development Status of Land
                    </Form.Label>
                    <Form.Select
                      className={classes.optioncss}
                      onChange={handleDevStatus}
                      value={selectedDevelopment}
                      disabled
                    >
                      <option value="">Select Land Development Status</option>
                      <option value="Fully Developed">Fully Developed</option>
                      <option value="Development Ongoing">
                        Development Ongoing
                      </option>
                      <option value="Fenced">Fenced</option>
                      <option value="No Development Yet">
                        No Development Yet
                      </option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="landUse">
                    <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                      Land Use
                    </Form.Label>
                    <Form.Select
                      className={classes.optioncss}
                      // onChange={handleLandUse}
                      value={landUse}
                      disabled
                    >
                      <option value="">Select Land Use Type</option>
                      {allLands.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
             
                <Col md={6}>
                  <Form.Group controlId="option3">
                    <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                      Proposed Building Type
                    </Form.Label>
                    <Form.Select
                      className={classes.optioncss}
                      onChange={handleProposedBuild}
                      value={selectedBuildingType}
                      disabled
                    >
                      <option value="">Select Building Type</option>
              <option value="Single-Family Home">Single-Family Home</option>
                            <option value="Multi-Family Home">Multi-Family Home</option>
                            <option value="Townhouse">Townhouse</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Bungalow">Bungalow</option>
                            <option value="Villa">Villa</option>
                            <option value="Duplex">Duplex</option>
                            <option value="Penthouse">Penthouse</option>
                            <option value="Studio Apartment">Studio Apartment</option>
                            <option value="Recreation">Recreation</option>
                            <option value="Educational">Educational</option>
                            <option value="Religious">Religious</option>
                            <option value="Warehouse">Warehouse</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="proposedTimeline">
                    <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                      Proposed Development Timeline
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className={classes.optioncss}
                      //placeholder="Enter Timeline"
                      value={timeLine}
                      disabled={["Fully Developed"].includes(selectedDevelopment)}
                      onChange={(e) => setTimeLine(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                
                <Col md={6}>
                  <Form.Group controlId="sourceOfFunds">
                    <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                      Proposed Source of Funds
                    </Form.Label>
                    <Form.Select
                      className={classes.optioncss}
                      onChange={handleSourceFund}
                      value={selectedSource}
                      disabled
                    >
                      <option value="">Select Source of Income</option>
                      <option value="salary">Salary</option>
                      <option value="investment">Investment</option>
                      <option value="loan">Loan</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="estimatedValue">
                    <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                      Estimated Development Value
                    </Form.Label>
                    <CurrencyInput
                      id="total-amount"
                      name="totalAmount"
                      value={totalAmount}
                      disabled
                      decimalsLimit={2}
                      onValueChange={(value) => setTotalAmount(value)}
                      prefix="₦"
                      groupSeparator=","
                      //placeholder="Enter Amount"
                      className={`form-control ${classes.optioncss}`}
                    />
                  </Form.Group>
                </Col>

              </Row>

              <Row className="mb-3">
              
                <Col md={6}>
                  <Form.Group controlId="surveyPlan">
                    <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                      Survey Plan
                    </Form.Label>
                    <div className={classes.fileUpload} onClick={handleClick1}>
                      <img
                        src={ImageIcon}
                        alt="icon"
                        className={classes.leftIcon}
                      />
                      <span className={classes.uploadText}>
                        {fileName1.length > 30
                          ? fileName1.slice(0, 30) + "..."
                          : fileName1}
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
                        accept=".pdf"
                        ref={fileInputRef1}
                        onChange={handleFileChange}
                        disabled
                        className={classes.hiddenFile}
                      />
                    </div>
                    <p style={{ fontSize: 12, color: "red" }}>{imgError}</p>
                    {/* <Form.Control className={classes.optioncss} type="file" accept=".pdf" onChange={handleFileChange} /> */}
                  </Form.Group>
                </Col>
                    
                <Col md={6}>
                  <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                    Purchase Agreement
                  </Form.Label>
                  <div className={classes.fileUpload} onClick={handleClick10}>
                    <img
                      src={ImageIcon}
                      alt="icon"
                      className={classes.leftIcon}
                    />
                    <span className={classes.uploadText}>
                      {fileName10.length > 30
                        ? fileName10.slice(0, 30) + "..."
                        : fileName10}
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
                      accept=".pdf"
                      ref={fileInputRef10}
                      onChange={handleFileChange10}
                      disabled
                      className={classes.hiddenFile}
                    />
                  </div>
                  <p style={{ fontSize: 12, color: "red" }}>{imgError3}</p>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                                                      <Form.Group controlId="proposedTimeline">
                                                        <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                                                          Title of Document  
                                                        </Form.Label>
                                                        <Form.Control
                                                          type="text"
                                                          disabled
                                                          className={classes.optioncss}
                                                          //placeholder="Enter title of document"
                                                          value={titleDocument}
                                                          onChange={(e) => setTitleDocument(e.target.value)}
                                                        />
                                                      </Form.Group>
                                                    </Col>
                <Col md={6}>
                  <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                    Purchase Receipt
                  </Form.Label>
                  <div className={classes.fileUpload} onClick={handleClick20}>
                    <img
                      src={ImageIcon}
                      alt="icon"
                      className={classes.leftIcon}
                    />
                    <span className={classes.uploadText}>
                      {fileName20.length > 30
                        ? fileName20.slice(0, 30) + "..."
                        : fileName20}
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
                      accept=".pdf"
                      ref={fileInputRef20}
                      disabled
                      onChange={handleFileChange20}
                      className={classes.hiddenFile}
                    />
                  </div>
                  <p style={{ fontSize: 12, color: "red" }}>{imgError2}</p>
                </Col>
                 {/* <Col md={6}>
                  <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                    Passport Photograph
                    <span style={{ fontSize: "13px", color: isDarkMode ? "#ffffff" : "#555555" }}>
                 <b> (Only JPEG allowed)</b>
               </span>
               
                  </Form.Label>
                  <div className={classes.fileUpload} onClick={handleClickPass}>
                    <img
                      src={ImageIcon}
                      alt="icon"
                      className={classes.leftIcon}
                    />
                    <span className={classes.uploadText}>
                      {passportPhotograpy.length > 30
                        ? passportPhotograpy.slice(0, 30) + "..."
                        : passportPhotograpy}
                    </span>
                    <div className={classes.uploadButton}>
                      <img
                        src={UploadIcon}
                        alt="upload"
                        className={classes.uploadIcon}
                      />
                    </div>
                    <input
                    disabled
                      type="file"
                      accept="image/jpeg"
                      ref={filePassportRef}
                      onChange={handlePassportPhotograph}
                      className={classes.hiddenFile}
                    />
                  </div>
                  <p style={{ fontSize: 12, color: "red" }}>{imgError5}</p>
                </Col> */}
                {/* <Col md={6}>
                  <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                    Other Supporting Document
                  </Form.Label>
                  <div className={classes.fileUpload} onClick={handleClick}>
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
                      accept=".pdf"
                      ref={fileInputRef}
                      disabled
                      onChange={handleFileChange2}
                      className={classes.hiddenFile}
                    />
                  </div>
                  <p style={{ fontSize: 12, color: "red" }}>{imgError1}</p>
                </Col> */}
              </Row>

              <Row className="mb-3">
              {/* <Col md={6}>
                  <Form.Group controlId="PaymentCode">
                    <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                      Stamp Payment Code <span style={{color:"red"}}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                     disabled
                      className={classes.optioncss}
                      //placeholder="Enter Stamp Payment Code"
                      value={stampCode}
                      onChange={(e) => setStampCode(e.target.value)}
                    />
                  
                  </Form.Group>
                </Col> */}
                </Row>

              <Row>
              <div>
              <div className="d-flex justify-content-between align-items-center">
        <Form.Check 
          type="checkbox" 
          label="Joint Ownership" 
          checked={isJointOwnership} 
          onChange={handleJointOwnershipChange}
          className={classes.checkbox}
        />
       {isJointOwnership && (
          <Button 
             
            onClick={handleAddOwner} 
            className={classes.iconButton1}
          >
            <FaPlus  />
          </Button>
        )}
      </div>
          

      {isJointOwnership && (
        <div className={classes.repeaterContainer}>
          {ninValues.map((nin, index) => (
            <Row key={index} className={classes.ownerRow}>
              <Col md={5}>
                <Form.Control
                  type="text"
                  //placeholder="NIN Number"
                  disabled
                  value={nin}
                  className={`form-control ${classes.optioncss}`}
                  onChange={(e) => handleNinChange(index, e.target.value)}
                />
                 {loadingStates[index] && (
                  <div className="mt-1 text-success">
                    <Spinner animation="border" size="sm" /> Validating...
                  </div>
                )}
                {errors[index] && (
                  <p
                  className={
                    errors[index]?.toLowerCase().includes('fail') ||
                    errors[index]?.toLowerCase().includes('digit')
                      ? classes.errorText
                      : errors[index]?.toLowerCase().includes('success')
                      ? classes.successText
                      : ''
                  }
                >
                  {errors[index]}
                </p>
                )}
              </Col>
              {[nameValues].map((name, id) => (
              <Col md={6}>
                <Form.Control
                  type="text"
                  //placeholder="Name"
                  value={`${nameValues[index]?.firstname || ''} ${nameValues[index]?.surname || ''}`.trim()}
                  className={`form-control ${classes.optioncss}`}
                  disabled
                />
              </Col>
          ))}
              <Col md={1} className="">
                <Button 
                  variant="danger" 
                  onClick={() => handleRemoveOwner(index)} 
                  className={classes.iconButton}
                >
                  <FaTrash />
                </Button>
              </Col>
            </Row>
          ))}

        
        </div>
      )}
    </div>
            </Row>


              <Row className="mb-3">
                <Col md={12}>
                  <Form.Group controlId="attestation">
                    <Form.Label>Attestation</Form.Label>
                    <Form.Check
                      type="checkbox"
                      checked={attestation}
                      onChange={handleCheckboxChange}
                      disabled
                      label={
                        <div
                          style={{
                            fontSize: "15px",
                            color: isDarkMode ? "#ffffff" : "#333",
                            textAlign: "justify",
                          }}
                        >
                          <p>
                            Information supplied in this form is treated as
                            strictly confidential. <br />
                            I/We realise that it is an offense to make a false
                            statement/claim in this form and that any allocation
                            granted me on the basis of such false claim is
                            revocable and may be revoked, and if a certificate
                            of occupancy has been granted, such certificate must
                            be revoked.
                            <br />
                            The Bureau of Lands and Survey accepts no
                            responsibility for an application form not completed
                            properly and for which reason such an application
                            may be rejected. <br />
                            I/We undertake to pay all necessary fees due to the
                            preparation of a certificate of occupancy which may
                            be issued consequent upon this application. <br />
                            Should I withdraw the above application after making
                            such deposit, I agree to forfeit the whole or such
                            portion thereof as the Governor may decide.
                          </p>
                        </div>
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

             
            </Form>
                                 
         <div className={classes.btnBom}>
         <Button variant="secondary" onClick={handleClosePreview} className={classes.invBtn}>
                Cancel
              </Button>
              <Button variant="success"     onClick={() => setShowModal(true)} className={classes.appBtn}>
              {createLoading ? (
                   <>
                     <Spinner size="sm" />
                   </>
                 ) : (
                   "Submit"
                 )}
              </Button>
         </div>
                     
                    </Modal.Body>
                  
                  </Modal>
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
                 
                         <div>
                       
                              <div className={isDarkMode ? classes.applicationHistoryy : classes.applicationHistory}>
                               <div></div>
                              <h4 className={isDarkMode ? classes.wlcm1 : classes.wlcm}>APPLICATION FORM FOR OPEN LAND ALLOCATION</h4>
                              <small className={classes.prgText1} >(Please update your personal details using the account menu before completing the form if necessary)</small>
                            
                                             <div className={classes.firstDiv}>
                                         
                                               <div className={isDarkMode ? classes.firstInfos : classes.firstInfo}>
                                            
                                                 
                                                 {/* <h1>
                                                   {userData === "corporate"
                                                     ? "Corporate Information"
                                                     : "Personal Information"}
                                                 </h1> */}
                                                 {/* <h2>Update your photo and details here.</h2> */}
                                               </div>
                                               {/* <div className={classes.editDetailsBtn}>
                                                 <h1>Edit Details</h1>
                                               </div> */}
                                             </div>
                                             <div className={classes.profileContainer}>
                                               <img
                                                 src={
                                                     customer?.photo
                                                       ? customer.photo
                                                       : customer?.picture
                                                       ? customer.picture
                                                       : ProfileIcon
                                                   }
                                                 className={classes.imgPass}
                                                 alt="profileImage"
                                                 onError={(e) => (e.target.src = ProfileIcon)}
                                               />
                           
                                     
                                             </div>
                                             {/* <div className={classes.cameraPtn}>
                                 <img
                                   className={classes.cameraIcon}
                                   src={CameraIcon}
                                   alt="camera"
                                 />
                               </div> */}
                               
                                             <div className={classes.formCont}>
                                               
                                             <p  className={classes.formPrg} style={{marginLeft:30}}>All fields marked with an asterisk (*) are required</p>
                                             <div className={isDarkMode ? classes.firstInfos : classes.firstInfo} style={{marginTop:30}}>
                                              <h1 style={{textTransform:'uppercase',marginLeft:30}}>{customer?.user_type === "individual" ? 'PERSONAL INFORMATION' : 'CORPORATE INFORMATION'}</h1>
                                            </div>
                                               {customer?.user_type === "individual" && (
                                                 <Container style={{padding:30,paddingTop:0,paddingBottom:0}}>
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
                                                             value={customer?.first_name}
                                                             type="text"
                                                             //placeholder="Toluwani"
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
                                                             value={customer?.last_name}
                                                             type="text"
                                                             //placeholder="Adekoya"
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
                                                             value={customer?.tin}
                                                             className={classes.formInpt}
                                                             type="text"
                                                             //placeholder="12345678-1234"
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
                                                             value={customer?.nin}
                                                             className={classes.formInpt}
                                                             type="text"
                                                             //placeholder="123456789098764"
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
                                                             value={customer?.email}
                                                             onChange={(e) =>
                                                               setCustomerEmail(e.target.value)
                                                             }
                                                             type="email"
                                                             //placeholder="adekoyatoluwani5@gmail.com"
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
                                                             value={customer?.phone}
                                                             type="tel"
                                                             //placeholder="070 1798 1231"
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
                                                             value={customer?.dob}
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
                                                             value={customer?.gender}
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
                                                             disabled
                                                             value={customer?.address}
                                                             type="text"
                                                             //placeholder="Enter address"
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
                                                             disabled
                                                             value={customer?.marital_status}
                                                             onChange={(e) => setStatus(e.target.value)}
                                                           >
                                                             <option>Select Status</option>
                                                             <option value="single">Single</option>
                                                             <option value="married">Married</option>
                                                             <option value="divorce">Divorce</option>
                                                             <option value="seperated">Seperated</option>
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
                                                             disabled
                                                             value={customer?.nationality}
                                                             onChange={(e) =>
                                                               setNationality(e.target.value)
                                                             }
                                                           >
                                                             <option>Select Nationality</option>
                                                             <option value="nigerian">Nigerian</option>
                                                             <option value="non-nigerian">Non-Nigerian</option>
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
                                                             disabled
                                                             value={customer?.state
                                                             }
                                                             onChange={(e) =>
                                                               setCustomerState(e.target.value)
                                                             }
                                                           >
                                                             <option>Select State</option>
                                                             {statesInNigeria.map((state) => (
                                                               <option key={state} value={state.toLowerCase()}>
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
                                                             disabled
                                                             value={
                                                              customer?.lga
                                                             }
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
             {/*               
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
                                                       </Col> */}
                                                     </Row>
                           
                                                     <Row className="mb-3"></Row>
                           
                                                     {/* <Button
                                                       className={classes.editDetailsBtn1}
                                                       variant="success"
                                                       onClick={() => customerInfo()}
                                                     >
                                                       {customerLoading ? (
                                                         <>
                                                           <Spinner size="sm" />
                                                        
                                                         </>
                                                       ) : userData === "corporate" ? (
                                                         "Upload Corporate Information"
                                                       ) : (
                                                         "Upload Personal Information"
                                                       )}
                                                     </Button> */}
                                                   </Form>
                                                   {customer?.user_type === "individual" && (
                                             <>
                                               <div style={{ }} />
                                               <div className={isDarkMode ? classes.applicationHistoryy : classes.applicationHistory} style={{border:'0px',paddingLeft: isDarkMode && "0px"}}>
                                                 <div className={classes.firstDiv}>
                                                  
                                                 </div>
                           
                                                 <div className={classes.formCont}>
                                                 <div className={isDarkMode ? classes.firstInfos : classes.firstInfo} style={{marginTop:30}}>
                                                     <h1 style={{textTransform:'uppercase',marginTop:20}}>Occupation Information</h1>
                                                   </div>
                                                  
                                                     <Form>
                                                       <Row className="mb-3">
                                                         <Col md={6}>
                                                           <Form.Group controlId="formInput1">
                                                             <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                                               Company's Name
                                                             </Form.Label>
                                                             <Form.Control
                                                               className={classes.formInpt}
                                                               value={customer?.job_title}
                                                               disabled
                                                               onChange={(e) =>
                                                                 setBusinessName(e.target.value)
                                                               }
                                                               type="text"
                                                               //placeholder="ABC Company"
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
                                                               value={customer?.business_industry}
                                                               disabled
                                                               onChange={(e) =>
                                                                 setJobTitle(e.target.value)
                                                               }
                                                               type="text"
                                                               //placeholder="Managing Director"
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
                                                             disabled
                                                               value={customer?.
                                                                business_industry
                                                                }
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
                                                               value={customer?.company_address}
                                                               disabled
                                                               onChange={(e) => setAddress(e.target.value)}
                                                               type="text"
                                                               //placeholder="Enter Address"
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
                                                               value={customer?.company_phone}
                                                               disabled
                                                               onChange={(e) =>
                                                                 setcompPhone(e.target.value)
                                                               }
                                                               type="text"
                                                               //placeholder="Enter Phone Number"
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
                                                               value={customer?.company_email}
                                                               disabled
                                                               onChange={(e) =>
                                                                 setCompEmail(e.target.value)
                                                               }
                                                               type="text"
                                                               //placeholder="Enter Email Address"
                                                             />
                                                           </Form.Group>
                                                         </Col>
                                                       </Row>
                                                     </Form>
                                                  
                                                   {/* <div className={classes.editDetailsBtn}>
                                                     <button onClick={() => occupationInformation()}>
                                                       {loading ? "Updating" : "Update Details"}
                                                     </button>
                                                   </div> */}
                                                 </div>
                                               </div>
                                             </>
                                           )}
                                           {customer?.user_type === "individual" && (
                                             <>
                                               <div style={{  }} />
                                               <div className={isDarkMode ? classes.applicationHistoryy : classes.applicationHistory} style={{border:'0px',paddingLeft:isDarkMode && "0px"}}>
                                                 <div className={classes.firstDiv}>
                                                  
                                                 </div>
                           
                                                 <div className={classes.formCont}>
                                                 <div className={isDarkMode ? classes.firstInfos : classes.firstInfo}>
                                                     <h1 style={{textTransform:'uppercase',marginTop:20}}>Next of Kin Information</h1>
                                                   </div>
                                                   
                                                     <Form>
                                                       <Row className="mb-3">
                                                         <Col md={6}>
                                                           <Form.Group controlId="formInput1">
                                                             <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>
                                                               First Name
                                                             </Form.Label>
                                                             <Form.Control
                                                               className={classes.formInpt}
                                                               value={customer?.kin_first_name}
                                                               disabled
                                                               onChange={(e) =>
                                                                 setNokFirstName(e.target.value)
                                                               }
                                                               type="text"
                                                               //placeholder="Toluwani"
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
                                                               value={customer?.kin_last_name}
                                                               disabled
                                                               onChange={(e) =>
                                                                 setNokLastName(e.target.value)
                                                               }
                                                               type="text"
                                                               //placeholder="Adekoya"
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
                                                               value={customer?.kin_email}
                                                               disabled
                                                               onChange={(e) =>
                                                                 setNokEmail(e.target.value)
                                                               }
                                                               type="email"
                                                               //placeholder="adekoyatoluwani5@gmail.com"
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
                                                               value={customer?.kin_phone}
                                                               disabled
                                                               onChange={(e) =>
                                                                 setNokPhone(e.target.value)
                                                               }
                                                               type="tel"
                                                               //placeholder="070 1798 1231"
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
                                                               value={customer?.kin_address}
                                                               disabled
                                                               onChange={(e) =>
                                                                 setNokAddress(e.target.value)
                                                               }
                                                               type="address"
                                                               //placeholder="adekoyatoluwani5@gmail.com"
                                                             />
                                                           </Form.Group>
                                                         </Col>
                                                       </Row>
                                                     </Form>
                                                   
                                                   {/* <div className={classes.editDetailsBtn}>
                                                     <button onClick={() => occupationInformation()}>
                                                       {loading ? "Updating" : "Update Details"}
                                                     </button>
                                                   </div> */}
                                                 </div>
                                               </div>
                                             </>
                                           )}
                           
                                                 </Container>
                                               )}
                                               {customer?.user_type === "corporate" && (
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
                                                             value={customer?.business_name}
                                                             type="text"
                                                             //placeholder="Toluwani"
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
                                                             value={customer?.cac}
                                                             type="text"
                                                             //placeholder="Adekoya"
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
                                                             value={customer?.email}
                                                             type="email"
                                                             //placeholder="adekoyatoluwani5@gmail.com"
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
                                                             value={customer?.phone}
                                                             //placeholder="070 1798 1231"
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
                                                             value={customer?.address}
                                                             //placeholder="Enter address"
                                                           />
                                                         </Form.Group>
                                                       </Col>
                                                       <Col md={6}>
                                                         <Form.Group controlId="dob">
                                                           <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>Date of Incorporation</Form.Label>
                                                           <Form.Control
                                                             className={classes.formInpt}
                                                             disabled
                                                             value={customer?.date_incorporated}
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
                                                               customer?.state
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
                                                             value={customer?.lga}
                                                             type="text"
                                                             //placeholder="12345678-1234"
                                                           />
                                                         </Form.Group>
                                                       </Col>
                                                       {/* <Col md={6}>
                                                       <Form.Group controlId="formInput5">
                                                         <Form.Label className={isDarkMode ? classes.formLabel1 : classes.formLabel}>NIN Number</Form.Label>
                                                         <Form.Control className={classes.formInpt} type="text" //placeholder="123456789098764" />
                                                       </Form.Group>
                                                     </Col> */}
                                                     </Row>
                                                     <div>
                                            <div className={classes.firstDiv}>
                                              <div className={classes.firstInfo}>
                                                <h1>Director's Information</h1>
                                              </div>
                                              {/* <div className={classes.editDetailsBtn}>
                                                <h1>Edit Details</h1>
                                              </div> */}
                                            </div>
                      
                                            <div>
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
                                                          value={dirFirstName}
                                                          disabled
                                                          onChange={(e) =>
                                                            setDirFirstName(e.target.value)
                                                          }
                                                          type="text"
                                                          //placeholder="Toluwani"
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
                                                          value={dirLastName}
                                                          onChange={(e) =>
                                                            setDirLastName(e.target.value)
                                                          }
                                                          type="text"
                                                          //placeholder="Adekoya"
                                                        />
                                                   
                                                      </Form.Group>
                                                    </Col>
                                                  </Row>
                      
                                                  <Row className="mb-3">
                                                    <Col md={6}>
                                                      <Form.Group controlId="formInput3">
                                                        <Form.Label className={classes.formLabel}>
                                                          Email 
                                                        </Form.Label>
                                                        <Form.Control
                                                          className={classes.formInpt}
                                                          disabled
                                                          value={dirEmail}
                                                          onChange={(e) =>
                                                            setDirEmail(e.target.value)
                                                          }
                                                          type="email"
                                                          //placeholder="adekoyatoluwani5@gmail.com"
                                                          />
                                                          
                                                      </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                      <Form.Group controlId="formInput4">
                                                        <Form.Label className={classes.formLabel}>
                                                          Telephone Number 
                                                        </Form.Label>
                                                        <Form.Control
                                                          className={classes.formInpt}
                                                          disabled
                                                          value={dirPhone}
                                                          onChange={(e) =>
                                                            setDirPhone(e.target.value)
                                                          }
                                                          type="number"
                                                          //placeholder="070 1798 1231"
                                                        />
                                                    
                                                      </Form.Group>
                                                    </Col>
                                                  </Row>
                                                  <Row className="mb-3">
                                                    
                                                    <Col md={6}>
                                                      <Form.Group controlId="formInput3">
                                                        <Form.Label className={classes.formLabel}>
                                                          NIN 
                                                        </Form.Label>
                                                        <Form.Control
                        className={classes.formInpt}
                        disabled

                        value={dirNin1}
                        // disabled
                        onChange={(e) => {
                          const value = e.target.value;
                          
                            setDirNin1(value);
                        }}
                        type="number"
                        //placeholder="12345678900"
                      />
                      
                         
                                                      </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                      <Form.Group controlId="formInput3">
                                                        <Form.Label className={classes.formLabel}>
                                                          STIN 
                                                        </Form.Label>
                                                        <Form.Control
                                                        
                                                        disabled
                                                          className={classes.formInpt}
                                                          value={dirStin1}
                                                          onChange={(e) =>
                                                            setDirStin1(e.target.value)
                                                          }
                                                          type="number"
                                                          //placeholder="12345678900"
                                                        />
                                                        
                                                   
                                                      </Form.Group>
                                                    </Col>
                                                  </Row>
                                                </Form>
                                            
                                              </Container>
                                            </div>
                      
                                            <div>
                                            <div className={classes.firstDiv}>
                                              <div className={classes.firstInfo}>
                                                <h1>Director's Information</h1>
                                              </div>
                                              
                                            </div>
                                            <div >
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
                                                          value={dirFirstName2}
                                                          onChange={(e) =>
                                                            setDirFirstName2(e.target.value)
                                                          }
                                                          type="text"
                                                          //placeholder="Toluwani"
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
                                                          value={dirLastName2}
                                                          onChange={(e) =>
                                                            setDirLastName2(e.target.value)
                                                          }
                                                          type="text"
                                                          //placeholder="Adekoya"
                                                        />
                                                    
                                                      </Form.Group>
                                                    </Col>
                                                  </Row>
                      
                                                  <Row className="mb-3">
                                                    <Col md={6}>
                                                      <Form.Group controlId="formInput3">
                                                        <Form.Label className={classes.formLabel}>
                                                          Email 
                                                        </Form.Label>
                                                        <Form.Control
                                                          className={classes.formInpt}
                                                          disabled
                                                          value={dirEmail2}
                                                          onChange={(e) =>
                                                            setDirEmail2(e.target.value)
                                                          }
                                                          type="email"
                                                          //placeholder="adekoyatoluwani5@gmail.com"
                                                          />
                                                          
                                                      </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                      <Form.Group controlId="formInput4">
                                                        <Form.Label className={classes.formLabel}>
                                                          Telephone Number 
                                                        </Form.Label>
                                                        <Form.Control
                                                        disabled
                                                          className={classes.formInpt}
                                                          value={dirPhone2}
                                                          onChange={(e) =>
                                                            setDirPhone2(e.target.value)
                                                          }
                                                          type="number"
                                                          //placeholder="070 1798 1231"
                                                        />
                                                   
                                                      </Form.Group>
                                                    </Col>
                                                  </Row>
                                                  <Row className="mb-3">
                                                  <Col md={6}>
                                                      <Form.Group controlId="formInput3">
                                                        <Form.Label className={classes.formLabel}>
                                                          NIN 
                                                        </Form.Label>
                                                        <Form.Control
                        className={classes.formInpt}
                        disabled
                        value={dirNin2}
                        // disabled
                        onChange={(e) => {
                          const value = e.target.value;
                            setDirNin2(value);                      }}
                        type="number"
                        //placeholder="12345678900"
                      />
                                                    
                                                      
                                                      </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                      <Form.Group controlId="formInput3">
                                                        <Form.Label className={classes.formLabel}>
                                                          STIN 
                                                        </Form.Label>
                                                        <Form.Control
                                                       
                                                        disabled
                                                          className={classes.formInpt}
                                                         
                                                          value={dirStin2}
                                                          onChange={(e) =>
                                                            setDirStin2(e.target.value)
                                                          }
                                                          type="number"
                                                          //placeholder="12345678900"
                                                        />
                                                        
                                                     
                                                      </Form.Group>
                                                    </Col>
                                                  </Row>
                                                </Form>
                                                
                                                  
                                              </Container>
                                            </div>
                      
                                            </div>
                      
                      
                                          </div>
                                      
                                                   </Form>
                                                 </Container>
                                               )}
                                                <div className={isDarkMode ? classes.firstInfos : classes.firstInfo} style={{}}>
                                              <h1 style={{textTransform:'uppercase',marginLeft:30}}>Open Land Allocation Form</h1>
                                            </div>
                                            <Form className={isDarkMode ? classes.formContainer1 : classes.formContainer} style={{marginTop:0,border:"0px"}}>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="lga">
                    <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                     Local Government Area of Land <span style={{color:"red"}}>*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      className={`form-select ${classes.optioncss}`}
                      value={selectedArea}
                      onChange={handleAreaChange}
                      required
                    >
                      <option value="">Select Area</option>
                     {tableData?.map((item, index) => (
                 <option
                   key={index}
                   value={item.id}
                   name={item.local_govt}
                 >
                   {item.local_govt}
                 </option>
               ))}
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col md={6}>
                                  <Form.Group controlId="lga">
                                    <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                                      Zone of Land<span style={{color:"red"}}>*</span>
                                    </Form.Label>
                                    <Form.Control
                                      as="select"
                                      className={`form-select ${classes.optioncss}`}
                                      value={selectedZone}
                                      onChange={handleZoneChange}
                                      required
                                    >
                                      <option value="">Select Zone</option>
                                      {tableData2?.map((item, index) => (
                                        <option
                                          key={index}
                                          value={item.id}
                                          name={item.description}
                                        >
                                          {item.description}
                                        </option>
                                      ))}
                                    </Form.Control>
                                  </Form.Group>
                                </Col>

               
              </Row>

              <Row className="mb-3">
                 <Col md={6}>
                  <Form.Group controlId="lga">
                    <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                      Land Location <span style={{color:"red"}}>*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      className={`form-select ${classes.optioncss}`}
                      value={landLocation}
                      onChange={handleLocationChange}
                      required
                    >
                      <option value="">Select Location</option>
                      {tableData45?.map((item, index) => (
                        <option
                          key={index}
                          value={item.id}
                          name={item.description}
                        >
                          {item.description}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
         <Form.Group controlId="landUnitSelect">
                <Form.Label>Unit Of Measurement of Land<span style={{color:"red"}}>*</span></Form.Label>
                <Form.Select value={selectedUnit}   className={classes.optioncss} onChange={(e) => setSelectedUnit(e.target.value)}>
                <option value="">Select Unit</option>
                {measurement.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
                </Form.Select>
              </Form.Group>
         </Col>
                 
                    
       </Row>

              <Row className="mb-3">
                 <Col md={6}>
                              <Form.Group controlId="proposedTimeline">
                                <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                                  Size of Land <span style={{color:"red"}}>*</span>
                                </Form.Label>
                                <Form.Control
                                  type="number"
                                  className={classes.optioncss}
                                  //placeholder="Enter size of land in number e.g 2"
                                  value={sizePlot}
                                  onChange={(e) => setSizePlot(e.target.value)}
                                />
                              </Form.Group>
                            </Col>
               
                <Col md={6}>
                  <Form.Group controlId="developmentStatus">
                    <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                      Development Status of Land <span style={{color:"red"}}>*</span>
                    </Form.Label>
                    <Form.Select
                      className={classes.optioncss}
                      onChange={handleDevStatus}
                    >
                      <option value="">Select Land Development Status</option>
                      <option value="Fully Developed">Fully Developed</option>
                      <option value="Development Ongoing">
                        Development Ongoing
                      </option>
                      <option value="Fenced">Fenced</option>
                      <option value="No Development Yet">
                        No Development Yet
                      </option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                    
             

              </Row>

              <Row className="mb-3">
                   <Col md={6}>
                  <Form.Group controlId="landUse">
                    <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                      Land Use <span style={{color:"red"}}>*</span>
                    </Form.Label>
                    <Form.Select
                      className={classes.optioncss}
                     value={landUse}
                        onChange={(e) => setLandUse(e.target.value)}
                      disabled={!!landUse}
                    >
                      <option value="">Select Land Use Type</option>
                      {allLands.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
               
                <Col md={6}>
                  <Form.Group controlId="option3">
                    <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                      Proposed Building Type <span style={{color:"red"}}>*</span>
                    </Form.Label>
                    <Form.Select
                      className={classes.optioncss}
                      onChange={handleProposedBuild}
                    >
                      <option value="">Select Building Type</option>
               <option value="Single-Family Home">Single-Family Home</option>
                            <option value="Multi-Family Home">Multi-Family Home</option>
                            <option value="Townhouse">Townhouse</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Bungalow">Bungalow</option>
                            <option value="Villa">Villa</option>
                            <option value="Duplex">Duplex</option>
                            <option value="Penthouse">Penthouse</option>
                            <option value="Studio Apartment">Studio Apartment</option>
                            <option value="Recreation">Recreation</option>
                            <option value="Educational">Educational</option>
                            <option value="Religious">Religious</option>
                            <option value="Warehouse">Warehouse</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              

              </Row>

              <Row className="mb-3">
                  <Col md={6}>
                  <Form.Group controlId="proposedTimeline">
                    <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                      Proposed Development Timeline 
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className={classes.optioncss}
                      //placeholder="Enter Timeline"
                      value={timeLine}
                      onChange={(e) => setTimeLine(e.target.value)}
                      disabled={["Fully Developed"].includes(selectedDevelopment)}
                    />
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group controlId="sourceOfFunds">
                    <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                      Proposed Source of Funds <span style={{color:"red"}}>*</span>
                    </Form.Label>
                    <Form.Select
                      className={classes.optioncss}
                      onChange={handleSourceFund}
                    >
                      <option value="">Select Source of Income</option>
                      <option value="salary">Salary</option>
                      <option value="investment">Investment</option>
                      <option value="loan">Loan</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
               
              </Row>

              <Row className="mb-3">
                 <Col md={6}>
                  <Form.Group controlId="estimatedValue">
                    <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                      Estimated Development Value <span style={{color:"red"}}>*</span>
                    </Form.Label>
                    <CurrencyInput
                      id="total-amount"
                      name="totalAmount"
                      value={totalAmount}
                      decimalsLimit={2}
                      onValueChange={(value) => setTotalAmount(value)}
                      prefix="₦"
                      groupSeparator=","
                      //placeholder="Enter Amount"
                      className={`form-control ${classes.optioncss}`}
                    />
                  </Form.Group>
                </Col>
               
                <Col md={6}>
                  <Form.Group controlId="surveyPlan">
                    <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                      Survey Plan 
                      <span style={{ fontSize: "13px", color: isDarkMode ? "#ffffff" : "#555555" }}>
                 <b> (Only PDF allowed)</b>
               </span>
               <span style={{color:"red"}}>*</span>
                    </Form.Label>
                    <div className={classes.fileUpload} onClick={handleClick1}>
                      <img
                        src={ImageIcon}
                        alt="icon"
                        className={classes.leftIcon}
                      />
                      <span className={classes.uploadText}>
                        {fileName1.length > 30
                          ? fileName1.slice(0, 30) + "..."
                          : fileName1}
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
                        accept=".pdf"
                        ref={fileInputRef1}
                        onChange={handleFileChange}
                        className={classes.hiddenFile}
                      />
                    </div>
                    <p style={{ fontSize: 12, color: "red" }}>{imgError}</p>
                    {/* <Form.Control className={classes.optioncss} type="file" accept=".pdf" onChange={handleFileChange} /> */}
                  </Form.Group>
                </Col>

               
              </Row>
               <Row className="mb-3">
                                   {userData === "agent" && (
                                     <Col md={6}>
                                       <Form.Label
                                         className={
                                           isDarkMode ? classes.labelTxt1 : classes.labelTxt
                                         }
                                       >
                                         Letter of Authorisation
                                         <span
                                           style={{
                                             fontSize: "13px",
                                             color: isDarkMode ? "#ffffff" : "#555555",
                                           }}
                                         >
                                           <b> (Only PDF allowed)</b>
                                         </span>
                                         <span style={{ color: "red" }}>*</span>
                                       </Form.Label>
                                       <div className={classes.fileUpload} onClick={handleClick12}>
                                         <img
                                           src={ImageIcon}
                                           alt="icon"
                                           className={classes.leftIcon}
                                         />
                                         <span className={classes.uploadText}>
                                           {lttAuth.length > 30
                                             ? lttAuth.slice(0, 30) + "..."
                                             : lttAuth}
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
                                           accept=".pdf"
                                           disabled
                                           ref={lttAuthRef}
                                           onChange={handleFileChange14}
                                           className={classes.hiddenFile}
                                         />
                                       </div>
                                       <p style={{ fontSize: 12, color: "red" }}>{imgError}</p>
                                     </Col>
                                   )}
                                 </Row>

              <Row className="mb-3"> 
                 <Col md={6}>
                  <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                    Purchase Agreement 
                    <span style={{ fontSize: "13px", color: isDarkMode ? "#ffffff" : "#555555" }}>
                 <b> (Only PDF allowed)</b>
               </span>
               <span style={{color:"red"}}>*</span>
                  </Form.Label>
                  <div className={classes.fileUpload} onClick={handleClick10}>
                    <img
                      src={ImageIcon}
                      alt="icon"
                      className={classes.leftIcon}
                    />
                    <span className={classes.uploadText}>
                      {fileName10.length > 30
                        ? fileName10.slice(0, 30) + "..."
                        : fileName10}
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
                      accept=".pdf"
                      ref={fileInputRef10}
                      onChange={handleFileChange10}
                      className={classes.hiddenFile}
                    />
                  </div>
                  <p style={{ fontSize: 12, color: "red" }}>{imgError3}</p>
                </Col>
                <Col md={6}>
                                                      <Form.Group controlId="proposedTimeline">
                                                        <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                                                          Title of Document  
                                                        </Form.Label>
                                                        <Form.Control
                                                          type="text"
                                                          className={classes.optioncss}
                                                          //placeholder="Enter title of document"
                                                          value={titleDocument}
                                                          onChange={(e) => setTitleDocument(e.target.value)}
                                                        />
                                                      </Form.Group>
                                                    </Col>  
              
                 {/* <Col md={6}>
                  <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                    Passport Photograph
                    <span style={{ fontSize: "13px", color: isDarkMode ? "#ffffff" : "#555555" }}>
                 <b> (Only JPEG allowed)</b>
               </span>
               
                  </Form.Label>
                  <div className={classes.fileUpload} onClick={handleClickPass}>
                    <img
                      src={ImageIcon}
                      alt="icon"
                      className={classes.leftIcon}
                    />
                    <span className={classes.uploadText}>
                      {passportPhotograpy.length > 30
                        ? passportPhotograpy.slice(0, 30) + "..."
                        : passportPhotograpy}
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
                      accept="image/jpeg"
                      ref={filePassportRef}
                      onChange={handlePassportPhotograph}
                      className={classes.hiddenFile}
                    />
                  </div>
                  <p style={{ fontSize: 12, color: "red" }}>{imgError5}</p>
                </Col> */}
                {/* <Col md={6}>
                  <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                    Other Supporting Document 
                    <span style={{ fontSize: "13px", color: isDarkMode ? "#ffffff" : "#555555" }}>
                 <b> (Only PDF allowed)</b>
               </span>
               <span style={{color:"red"}}>*</span>
                  </Form.Label>
                  <div className={classes.fileUpload} onClick={handleClick}>
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
                      accept=".pdf"
                      ref={fileInputRef}
                      onChange={handleFileChange2}
                      className={classes.hiddenFile}
                    />
                  </div>
                  <p style={{ fontSize: 12, color: "red" }}>{imgError1}</p>
                </Col> */}
              </Row>
              
              <Row className="mb-3">
                  <Col md={6}>
                  <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                    Purchase Receipt 
                    <span style={{ fontSize: "13px", color: isDarkMode ? "#ffffff" : "#555555" }}>
                 <b> (Only PDF allowed)</b>
               </span>
               <span style={{color:"red"}}>*</span>
                  </Form.Label>
                  <div className={classes.fileUpload} onClick={handleClick20}>
                    <img
                      src={ImageIcon}
                      alt="icon"
                      className={classes.leftIcon}
                    />
                    <span className={classes.uploadText}>
                      {fileName20.length > 30
                        ? fileName20.slice(0, 30) + "..."
                        : fileName20}
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
                      accept=".pdf"
                      ref={fileInputRef20}
                      onChange={handleFileChange20}
                      className={classes.hiddenFile}
                    />
                  </div>
                  <p style={{ fontSize: 12, color: "red" }}>{imgError2}</p>
                </Col>
              {/* <Col md={6}>
                  <Form.Group controlId="PaymentCode">
                    <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt}>
                      Stamp Payment Code <span style={{color:"red"}}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                     
                      className={classes.optioncss}
                      //placeholder="Enter Stamp Payment Code"
                      value={stampCode}
                      onChange={(e) => setStampCode(e.target.value)}
                    />
                      <p
                  style={{
                    color: stampError?.toLowerCase().includes('success') ? 'green' : 'red',
                    fontWeight: 500,
                    marginTop: "5px",
                  }}
                >
                  {stampError}
                </p>
                  </Form.Group>
                </Col> */}
                </Row>


              <Row>
              <div>
              <div className="d-flex justify-content-between align-items-center">
        <Form.Check 
          type="checkbox" 
          label="Joint Ownership" 
          checked={isJointOwnership} 
          onChange={handleJointOwnershipChange}
          className={classes.checkbox}
        />
       {isJointOwnership && (
          <Button 
             
            onClick={handleAddOwner} 
            className={classes.iconButton1}
          >
            <FaPlus  />
          </Button>
        )}
      </div>
          

      {isJointOwnership && (
        <div className={classes.repeaterContainer}>
          {ninValues.map((nin, index) => (
            <Row key={index} className={classes.ownerRow}>
              <Col md={5}>
                <Form.Control
                  type="text"
                  //placeholder="NIN Number"
                  value={nin}
                  className={`form-control ${classes.optioncss}`}
                  onChange={(e) => handleNinChange(index, e.target.value)}
                />
                 {loadingStates[index] && (
                  <div className="mt-1 text-success">
                    <Spinner animation="border" size="sm" /> Validating...
                  </div>
                )}
                {errors[index] && (
                  <p
                  className={
                    errors[index]?.toLowerCase().includes('fail') ||
                    errors[index]?.toLowerCase().includes('digit')
                      ? classes.errorText
                      : errors[index]?.toLowerCase().includes('success')
                      ? classes.successText
                      : ''
                  }
                >
                  {errors[index]}
                </p>
                )}
              </Col>
              {[nameValues].map((name, id) => (
              <Col md={6}>
                <Form.Control
                  type="text"
                  //placeholder="Name"
                  value={`${nameValues[index]?.firstname || ''} ${nameValues[index]?.surname || ''}`.trim()}
                  className={`form-control ${classes.optioncss}`}
                  disabled
                />
              </Col>
          ))}
              <Col md={1} className="">
                <Button 
                  variant="danger" 
                  onClick={() => handleRemoveOwner(index)} 
                  className={classes.iconButton}
                >
                  <FaTrash />
                </Button>
              </Col>
            </Row>
          ))}

         
        </div>
      )}
    </div>
            </Row>


              <Row className="mb-3">
                <Col md={12}>
                  <Form.Group controlId="attestation">
                    <Form.Label>Attestation  <span style={{color:"red"}}>*</span> </Form.Label>
                    <Form.Check
                      type="checkbox"
                      checked={attestation}
                      onChange={handleCheckboxChange}
                      label={
                        <div
                          style={{
                            fontSize: "15px",
                            color: isDarkMode ? "#ffffff" : "#333",
                            textAlign: "justify",
                          }}
                        >
                          <p>
                            Information supplied in this form is treated as
                            strictly confidential. <br />
                            I/We realise that it is an offense to make a false
                            statement/claim in this form and that any allocation
                            granted me on the basis of such false claim is
                            revocable and may be revoked, and if a certificate
                            of occupancy has been granted, such certificate must
                            be revoked.
                            <br />
                            The Bureau of Lands and Survey accepts no
                            responsibility for an application form not completed
                            properly and for which reason such an application
                            may be rejected. <br />
                            I/We undertake to pay all necessary fees due to the
                            preparation of a certificate of occupancy which may
                            be issued consequent upon this application. <br />
                            Should I withdraw the above application after making
                            such deposit, I agree to forfeit the whole or such
                            portion thereof as the Governor may decide.
                          </p>
                        </div>
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

             
                           <Row className="mb-3 mx">
                             <Col md={{ span: 6, offset: 3 }} className="text-center">
                               <Button
                                 className={classes.modBtnn}
                                 variant="success"
                                 // onClick={createApplication1}
                                 onClick={handlePreview}
                                 // disabled={!isFormValid}
                                 disabled={!isFormValid}
                               >
                                Preview
                               </Button>
                              </Col>
                           </Row>
            </Form>
                                             </div>
                                           </div>
                           
                                          
                                           <div style={{ marginTop: -70 }} />
                                           {/* <div className={isDarkMode ? classes.applicationHistory11 : classes.applicationHistory1}>
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
                                                           //placeholder="Enter Current Password"
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
                                                           //placeholder="Enter New Password"
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
                                                           //placeholder="Confirm New Password"
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
                         </div>
            
             <Modal show={showModalSuccess} onHide={() => setShowModalSuccess(false)}>
                                             <Modal.Header closeButton>
                                               {/* <Modal.Title>Success</Modal.Title> */}
                                             </Modal.Header>
                                             <Modal.Body style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}} className={classes.modalbodynew}>
                                               <img src={verified} style={{height: 48, width: 48, objectFit: "contain"}} alt="Verify"  className={classes.picverfied}/>
                                               <div className={classes.textss}>
                                               <p style={{fontWeight: 700, marginTop: 17, fontSize: 16, color: "#000000", textAlign: "center"}}>Success!</p>
                                               <p style={{fontWeight: 400, marginTop: 17, fontSize: 14, color: "#2E2E2E"}}>{modalMessage}</p>
                                               </div>
                                               <div className="d-flex justify-content-center">
                                               <Button
                                                 className={classes.btnmodal}
                                                 variant="success"
                                                 onClick={() => setShowModalSuccess(false)}
                                               >
                                                 Okay
                                               </Button>
                                               </div>
                                             </Modal.Body>
                                           </Modal>
                                           <Modal show={showModalError} onHide={() => setShowModalError(false)}>
                                             <Modal.Header closeButton>
                                               {/* <Modal.Title>Warning!</Modal.Title> */}
                                             </Modal.Header>
                                             <Modal.Body style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}  className={classes.modalbodynew21}>
                                               <img src={crop} style={{height: 48, width: 48, objectFit: "contain"}} alt="error" />
                                               <p style={{fontWeight: 700, marginTop: 17, fontSize: 16, color: "#000000"}}>Failed!</p>
                                               <p style={{fontWeight: 400, marginTop: 17, fontSize: 14, color: "#2E2E2E"}}>{modalMessage}</p>
                                               <Button
                                               style={{borderRadius: 8, width: 185, height: 44, fontWeight: 500, marginTop: 20, fontSize: 16, color: "#fff", backgroundColor: "#D92D20"}}
                                                 className={classes.btnmodalerror}
                                                 variant="danger"
                                                 onClick={() => setShowModalError(false)}
                                               >
                                                 Okay
                                               </Button>
                                             </Modal.Body>
                                           </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandAlloc;
