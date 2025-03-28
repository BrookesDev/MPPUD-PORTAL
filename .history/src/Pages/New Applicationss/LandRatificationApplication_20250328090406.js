import React, { useState, useEffect, useRef } from "react";
import DashboardNav from "../../Components/Navigation.js/Navigation";
import Horheader from "../../Components/horheader/horheader";
import ProfileIcon from "../../Asset/Profile Icon.png";
import classes from "./LandRatificationApplicational.module.css";
import PdfIcon from "../../Asset/pdf.svg";
import UploadIcon from "../../Asset/upload.png";

import crop from "../../Asset/repoort.png";

import HOC from "../../Asset/hoc.png";
import CurrencyInput from "react-currency-input-field";
import verified from "../../Asset/tick-circle.png";
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

import { Link, redirect, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../../API/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Row, Col } from "react-bootstrap";
import ImageIcon from "../../Asset/piclogo.png";
import { Navbar, Container, Button } from "react-bootstrap";
// import localStorage from "@react-native-async-storage/async-storage";
import { COUNTRIES, STATES, LGA } from "../../API/country";
import { useTheme } from "../../ThemeContext";
// import NewApplications from '../New Application/NewApplicationns';

// import axios from 'axios';
// import localStorage from '@react-native-async-storage/async-storage';

const LandRatificationApp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { serviceID, paymentCode, appNumber } = location.state || {};
  const [schemes, setSchemes] = useState([]);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [consentTypes, setConsentTypes] = useState([]);
  const [caveatTypes, setCaveatTypes] = useState([]);
  const [show, setShow] = useState(false);

  const [show30, setShow30] = useState(false);

  const [roleLoading, setRoleLoading] = useState(false);
  const [show10, setShow10] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShow10 = () => setShow10(true);

  const [bearer, setBearer] = useState("");
  const [bearer1, setBearer1] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [imgError, setImgError] = useState("");
  const [imgError2, setImgError2] = useState("");
  const [imgError4, setImgError4] = useState("");
  const [imgError21, setImgError21] = useState("");
  const [imgError22, setImgError22] = useState("");
  const [surveyPlanNumber, setSurveyPlanNumber] = useState("");

  const [acquisitionType, setAcquisitionType] = useState("");
  const [structureNo, setStructureNo] = useState("");
  const [occupantsNo, setOccupantsNo] = useState("");

  const [imgError1, setImgError1] = useState("");
  // const [imgError2, setImgError2] = useState("");
  const [imgError3, setImgError3] = useState("");
  const [plotSize, setPlotSize] = useState("");

  const [tableData, setTableData] = useState([]);
  const [customerLoading, setCustomerLoading] = useState(false);
  const [tableData32, setTableData32] = useState([]);
  const [allApplications, setAllApplications] = useState([]);
  const [tableData1, setTableData1] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [name, setName] = useState("");

  const [propertySize, setPropertySize] = useState("");
  const [cofoNumber, setCofONumber] = useState("");

  const [fileName, setFileName] = useState("Building Architectural Plan");
  const [fileName30, setFileName30] = useState("Electrical Architectural Plan");
  const [fileName31, setFileName31] = useState("Structural Engineering");
  const [fileName32, setFileName32] = useState("Title Document");
  const [fileName40, setFileName40] = useState("Mechanical Architectural Plan");
  const [fileName1, setFileName1] = useState("Survey Plan");
  const [architectural, setArchitectural] = useState("Architectural Documents");
  const [title, setTitle] = useState("Title Documents");
  const [frontPhoto, setFrontPhoto] = useState(
    "Photograph of the photo(front view)"
  );
  const [structuralDrawing, setStructuralDrawing] =
    useState("Structural Drawing");

  const fileInputRef = useRef(null);

  const fileInputRef1 = useRef(null);

  const fileInputRef30 = useRef(null);
  const fileInputRef40 = useRef(null);
  const fileInputRef31 = useRef(null);
  const fileInputRef32 = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleClick30 = () => {
    fileInputRef30.current.click();
  };

  const handleClick31 = () => {
    fileInputRef31.current.click();
  };
  const handleClick32 = () => {
    fileInputRef32.current.click();
  };
  const handleClick40 = () => {
    fileInputRef40.current.click();
  };

  const handleClick1 = () => {
    fileInputRef1.current.click();
  };

  const [isLoading, setIsLoading] = useState(false);

  const [createLoading, setCreateLoading] = useState(false);
  const [selectedLGA, setSelectedLGA] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedAreaName, setSelectedAreaName] = useState("");
  // const [selectedAppId, setSelectedAppId] = useState(null);
  const [selectedStation, setSelectedStation] = useState("");
  // const [selectedStationName, setSelectedStationName] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedLocationName, setSelectedLocationName] = useState("");
  const [selectedDevelopment, setSelectedDevelopment] = useState("");
  const [selectedLandUse, setSelectedLandUse] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedBuildingType, setSelectedBuildingType] = useState("");

  const [landLocation, setLandLocation] = useState("");

  const [documentAmount, setDocumentValue] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [attestation, setAttestation] = useState(false);
  const [allocationDate, setAllocationDate] = useState("");
  const [timeLine, setTimeLine] = useState("");
  const [sizePlot, setSizePlot] = useState("");

  const [sizeSqm, setSizeSqm] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFile21, setSelectedFile21] = useState(null);
  const [selectedFile22, setSelectedFile22] = useState(null);

  const [selectedFile15, setSelectedFile15] = useState(null);
  const [selectedFile40, setSelectedFile40] = useState(null);
  const [customerPicture, setCustomerPicture] = useState("");
  const [businessName, setBusinessName] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);
  const [allLands, setAllLands] = useState([]);

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

  // const totalPages = 10; // Total number of pages

  const readData = async () => {
    try {
      const detail = await localStorage.getItem("userType");
      const details = await localStorage.getItem("userToken");
      //  const detail = await localStorage.getItem("userType");
      //       const details = await localStorage.getItem("userToken");
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

  const handleDevStatus = e => {
    setSelectedDevelopment(e.target.value);
    // setShowErrorMessage(false);
  };

  const handleLandUse = e => {
    setSelectedLandUse(e.target.value);
    // setShowErrorMessage(false);
  };

  const handleProposedBuild = e => {
    setSelectedBuildingType(e.target.value);
    // setShowErrorMessage(false);
  };

  const handleAreaChange = e => {
    const selectedId = e.target.value;
    const areaName =
      tableData.find(item => item.id.toString() === selectedId)?.description ||
      "";
    setSelectedArea(selectedId);
    setSelectedAreaName(areaName);
    console.log(areaName);
    if (selectedId) {
      fetchLocation(selectedId); // Fetch locations based on selected area
    }
  };

  const handleLocationChange = e => {
    const selectedId = e.target.value;
    const stationName =
      tableData2.find(item => item.id.toString() === selectedId)?.location ||
      "";
    setSelectedLocationName(stationName);
    setSelectedLocation(e.target.value);
    // setShowErrorMessage(false);
  };

  const handleSourceFund = e => {
    setSelectedSource(e.target.value);
    // setShowErrorMessage(false);
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

  const handleFileChange = event => {
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
    }
  };
  const handleErrorClose = () => {
    setShowModalError(false);
    // handleShowPaymentModal();
  };
  const handleErrorOpen = () => {
    setShowModalError(true);
    // handleShowPaymentModal();
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

  const handleFileChange2 = event => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setImgError4("File is larger than 2MB. Max upload size is 2MB.");
        setFileName("");
        return;
      } // Get the first selected file
      setFileName(file.name); // Set the file name
      setSelectedFile2([file]);
      setImgError4(""); // Store the file in state
    }
  };

  const handleFileChange30 = event => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setImgError2("File is larger than 2MB. Max upload size is 2MB.");
        setFileName30("");
        return;
      } // Get the first selected file
      setFileName30(file.name); // Set the file name
      setSelectedFile15([file]);
      setImgError2(""); // Store the file in state
    }
  };

  const handleFileChange31 = event => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setImgError21("File is larger than 2MB. Max upload size is 2MB.");
        setFileName31("");
        return;
      } // Get the first selected file
      setFileName31(file.name); // Set the file name
      setSelectedFile21([file]);
      setImgError21(""); // Store the file in state
    }
  };

  const handleFileChange32 = event => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setImgError22("File is larger than 2MB. Max upload size is 2MB.");
        setFileName32("");
        return;
      } // Get the first selected file
      setFileName32(file.name); // Set the file name
      setSelectedFile22([file]);
      setImgError22(""); // Store the file in state
    }
  };

  const handleFileChange40 = event => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setImgError3("File is larger than 2MB. Max upload size is 2MB.");
        setFileName40("");
        return;
      } // Get the first selected file
      setFileName40(file.name); // Set the file name
      setSelectedFile40([file]);
      setImgError3(""); // Store the file in state
    }
  };

  const handleCheckboxChange = event => {
    setAttestation(event.target.checked);
    // setAttestation(true);
  };

  useEffect(() => {
    // Check if all required fields are filled
    const isValid =
      // selectedLGA &&
      landLocation &&
      allocationDate &&
      selectedDevelopment &&
      selectedLandUse &&
      selectedBuildingType &&
      timeLine &&
      selectedSource &&
      totalAmount &&
      selectedFile &&
      selectedFile2 &&
      attestation;

    setIsFormValid(isValid);
  }, [
    // selectedLGA,
    landLocation,
    allocationDate,
    selectedDevelopment,
    selectedLandUse,
    selectedBuildingType,
    timeLine,
    selectedSource,
    totalAmount,
    selectedFile,
    attestation,
    selectedFile2,
  ]);

  // setSelectedAppId(id);
  // setShowModal(true);

  console.log(selectedFile);

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

  const createApplication1 = async () => {
    setCreateLoading(true);
    try {
      const formData = new FormData();

      if (selectedFile && selectedFile.length > 0) {
        formData.append("survey_plan", selectedFile[0]);
      }
      if (selectedFile15 && selectedFile15.length > 0) {
        formData.append("purchase_agreement", selectedFile15[0]);
      }
      if (selectedFile40 && selectedFile40.length > 0) {
        formData.append("purchase_receipt", selectedFile40[0]);
      }
      if (selectedFile2 && selectedFile2.length > 0) {
        formData.append("land_receipt", selectedFile2[0]);
      }
      if (selectedFile21 && selectedFile21.length > 0) {
        formData.append("land_receipt", selectedFile21[0]);
      }
      if (selectedFile22 && selectedFile22.length > 0) {
        formData.append("land_receipt", selectedFile22[0]);
      }

      formData.append("lga_of_land", selectedArea);
      formData.append("estimated_development_amount", totalAmount);
      formData.append("land_development_status", selectedDevelopment);
      formData.append("land_location", selectedLocation);
      formData.append("landuse_id", selectedLandUse);
      formData.append("proposed_residential_building", selectedBuildingType);
      formData.append("proposed_source_of_fund", selectedSource);
      formData.append("size_in_plot", sizePlot);
      formData.append("size_in_sqm", sizeSqm);
      // formData.append("type", serviceID);
      formData.append("price_bought_per_plot", documentAmount);
      formData.append("code", paymentCode);
      formData.append("location_name", selectedLocationName);
      formData.append("app_number", appNumber);
      formData.append("area_name", selectedAreaName);

      // console.log(selectedFile);

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${bearer}`,
      };

      const response = await axios.post(
        `${BASE_URL}/application/make-new`,
        formData,
        { headers }
      );

      setModalMessage(response.data.message);

      // Swal.fire({
      //   icon: 'success',
      //   title: 'Success',
      //   text: response.data.message,
      // });

      Swal.fire({
        imageUrl: verified,
        title: "Success!",
        text: response.data.message,
        confirmButtonText: "Okay",
        imageWidth: 48,
        imageHeight: 48,
        customClass: {
          title: classes.myTitle,
          popup: classes.myText,
          confirmButton: classes.myButton,
        },
        allowOutsideClick: false,
        preConfirm: () => {
          Swal.close(); // Explicitly close the modal
        },
      });
      navigate("/applications");
      setAllocationDate("");
      setSelectedDevelopment("");
      setSelectedStation("");
      setSelectedArea("");
      setSelectedLocation("");
      setLandLocation("");
      setCofONumber("");
      setTimeLine("");
      setSelectedBuildingType("");
      setSelectedDevelopment("");
      setPlotSize("");
      setSizePlot("");
      setPropertySize("");
      setSizeSqm("");
      setSelectedLGA("");
      setSelectedLandUse("");
      setSelectedSource("");
      setTotalAmount("");
      setDocumentValue("");
      setFileName1("Survey Plan");
      setFileName("Survey Plan");
      setSelectedFile("Other Supporting documents");
      setFileName30("Purchase Agreement");
      setFileName31("Purchase Agreement");
      setFileName32("Purchase Agreement");
      setSelectedFile15("");
      setSelectedFile40("");
      setFileName40();
      setSurveyPlanNumber("");
      setAcquisitionType("");
      setStructureNo("");
      setOccupantsNo("");
      setArchitectural("Architectural Documents");
      title("");
      setTitle("");
      setFrontPhoto("Photograph of the photo(front view)");
      setStructuralDrawing("");

      // fetchBeneficiaries();
      // fetchStat();
      // fetchArchivedData();
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
          },
        });
      }
    } finally {
      setCreateLoading(false);
    }
  };

  // const handleCloseSuccessModal = () => {
  //   setShowModalSuccess(false);
  //   navigate("/applications"); // Navigate after closing the modal
  // };
  const handleOpenSuccessModal = () => {
    setShowModalSuccess(true);
    navigate("/applications"); // Navigate after closing the modal
  };

  const handlePrevPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const fetchAllLandUse = async () => {
    // setRoleLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}applications/get-land-use-type`, { headers });
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

  useEffect(() => {
    if (bearerToken) {
      fetchTaxStations();
    }
  }, [bearerToken]);

  const fetchTax = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get_areas`, {
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

  const fetchLocation = async areaId => {
    try {
      const response = await axios.get(
        `${BASE_URL}/location_by_area?id=${areaId}`,
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

  useEffect(() => {
    if (bearer) {
      fetchLocation();
    }
  }, [bearer]);

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

  // console.log(allApplications)
  const { isDarkMode } = useTheme();
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
            <div>
              <div
                className={
                  isDarkMode
                    ? classes.applicationHistoryy
                    : classes.applicationHistory
                }
              >
                <div className={classes.prgText1}>
                <h4 className={isDarkMode ? classes.wlcm1 : classes.wlcm}>
                  APPLICATION FORM FOR BUILDING PERMIT
                </h4>
                </div>
                <div className={classes.prgText1}>
                <small className={classes.prgText1}>
                  (Please update your personal details using the account menu
                  before completing the form if necessary)
                </small>
                </div>

                <div className={classes.firstDiv}>
                  <div
                    className={
                      isDarkMode ? classes.firstInfos : classes.firstInfo
                    }
                  >
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
                    src={customerPicture || customerPicture || ProfileIcon}
                    className={classes.imgPass}
                    alt="profileImage"
                    onError={e => (e.target.src = ProfileIcon)}
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
                  <p className={classes.formPrg} style={{}}>
                    All fields marked with an asterisk (*) are required
                  </p>
                  {/* {userData === "individual" && ( */}
                  <div
                                className={
                                  isDarkMode
                                    ? classes.firstInfos
                                    : classes.firstInfo
                                }
                                style={{ marginTop: 30 }}
                              >
                                <h1>Personal Information</h1>
                              </div>

                    <Container>
                      <Form>
                        <Row className="mb-3">
                          <Col md={6}>
                            <Form.Group controlId="formInput1">
                              <Form.Label
                                className={
                                  isDarkMode
                                    ? classes.formLabel1
                                    : classes.formLabel
                                }
                              >
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
                              <Form.Label
                                className={
                                  isDarkMode
                                    ? classes.formLabel1
                                    : classes.formLabel
                                }
                              >
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
                              <Form.Label
                                className={
                                  isDarkMode
                                    ? classes.formLabel1
                                    : classes.formLabel
                                }
                                l
                              >
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
                              <Form.Label
                                className={
                                  isDarkMode
                                    ? classes.formLabel1
                                    : classes.formLabel
                                }
                              >
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
                              <Form.Label
                                className={
                                  isDarkMode
                                    ? classes.formLabel1
                                    : classes.formLabel
                                }
                              >
                                Email Address
                              </Form.Label>
                              <Form.Control
                                className={classes.formInpt}
                                disabled
                                value={customerEmail}
                                onChange={e => setCustomerEmail(e.target.value)}
                                type="email"
                                placeholder="adekoyatoluwani5@gmail.com"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group controlId="formInput4">
                              <Form.Label
                                className={
                                  isDarkMode
                                    ? classes.formLabel1
                                    : classes.formLabel
                                }
                              >
                                Phone Number
                              </Form.Label>
                              <Form.Control
                                className={classes.formInpt}
                                disabled
                                value={customerPhone}
                                type="tel"
                                placeholder="070 1798 1231"
                                onChange={e => setCustomerPhone(e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row className="mb-3">
                          <Col md={6}>
                            <Form.Group controlId="dob">
                              <Form.Label  className={
                                  isDarkMode
                                    ? classes.formLabel1
                                    : classes.formLabel
                                }>Date of Birth</Form.Label>
                              <Form.Control
                                disabled
                                value={dateBirth}
                                className={classes.formInpt}
                                type="date"
                                onChange={e => setDateBirth(e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group controlId="formInput6">
                              <Form.Label
                                className={
                                  isDarkMode
                                    ? classes.formLabel1
                                    : classes.formLabel
                                }
                                l
                              >
                                Gender
                              </Form.Label>
                              <Form.Select
                                className={classes.formInpt}
                                disabled
                                value={gender}
                                onChange={e => setGender(e.target.value)}
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
                              <Form.Label
                                className={
                                  isDarkMode
                                    ? classes.formLabel1
                                    : classes.formLabel
                                }
                              >
                                Address
                              </Form.Label>
                              <Form.Control
                                className={classes.formInpt}
                                disabled
                                value={customerAddress}
                                type="text"
                                placeholder="Enter address"
                                onChange={e =>
                                  setCustomerAddress(e.target.value)
                                }
                              />
                            </Form.Group>
                          </Col>

                          <Col md={6}>
                            <Form.Group controlId="formInput6">
                              <Form.Label
                                className={
                                  isDarkMode
                                    ? classes.formLabel1
                                    : classes.formLabel
                                }
                                l
                              >
                                Marital Status
                              </Form.Label>
                              <Form.Select
                                className={classes.formInpt}
                                disabled
                                value={status}
                                onChange={e => setStatus(e.target.value)}
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
                              <Form.Label
                                className={
                                  isDarkMode
                                    ? classes.formLabel1
                                    : classes.formLabel
                                }
                                l
                              >
                                Nationality
                              </Form.Label>
                              <Form.Select
                                className={classes.formInpt}
                                disabled
                                value={nationality}
                                onChange={e => setNationality(e.target.value)}
                              >
                                <option>Select Nationality</option>
                                <option value="s">Nigerian</option>
                                <option value="m">Non-Nigerian</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>

                          <Col md={6}>
                            <Form.Group controlId="formInput6">
                              <Form.Label
                                className={
                                  isDarkMode
                                    ? classes.formLabel1
                                    : classes.formLabel
                                }
                                l
                              >
                                State
                              </Form.Label>
                              <Form.Select
                                className={classes.formInpt}
                                disabled
                                value={
                                  statesInNigeria.find(
                                    state =>
                                      state.toUpperCase() ===
                                      customerState.toUpperCase()
                                  ) || ""
                                }
                                onChange={e => setCustomerState(e.target.value)}
                              >
                                <option>Select State</option>
                                {statesInNigeria.map(state => (
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
                              <Form.Label
                                className={
                                  isDarkMode
                                    ? classes.formLabel1
                                    : classes.formLabel
                                }
                              >
                                Local Government Area
                              </Form.Label>
                              <Form.Select
                                className={classes.formInpt}
                                disabled
                                value={
                                  ogunStateLGAs.find(
                                    lga =>
                                      lga.replace(/\s+/g, "_").toUpperCase() ===
                                      customerLga.toUpperCase()
                                  ) || ""
                                }
                                onChange={e => setCustomerLga(e.target.value)}
                              >
                                <option>Select LGA</option>
                                {ogunStateLGAs.map(lga => (
                                  <option key={lga} value={lga}>
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
                      {userData === "individual" && (
                        <>
                          <div style={{}} />
                          <div
                            className={
                              isDarkMode
                                ? classes.applicationHistoryy
                                : classes.applicationHistory
                            }
                          >
                            <div className={classes.firstDiv}></div>

                            <div className={classes.formCont}>
                              <div
                                className={
                                  isDarkMode
                                    ? classes.firstInfos
                                    : classes.firstInfo
                                }
                                style={{ marginTop: 30,paddingLeft:20 }}
                              >
                                <h1>Occupation Information</h1>
                              </div>

                              <Form style={{padding:20}}>
                                <Row className="mb-3">
                                  <Col md={6}>
                                    <Form.Group controlId="formInput1">
                                      <Form.Label
                                        className={
                                          isDarkMode
                                            ? classes.formLabel1
                                            : classes.formLabel
                                        }
                                      >
                                        Company's Name
                                      </Form.Label>
                                      <Form.Control
                                        className={classes.formInpt}
                                        value={businessName}
                                        disabled
                                        onChange={e =>
                                          setBusinessName(e.target.value)
                                        }
                                        type="text"
                                        placeholder="ABC Company"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md={6}>
                                    <Form.Group controlId="formInput2">
                                      <Form.Label
                                        className={
                                          isDarkMode
                                            ? classes.formLabel1
                                            : classes.formLabel
                                        }
                                      >
                                        Job Title/Position
                                      </Form.Label>
                                      <Form.Control
                                        className={classes.formInpt}
                                        value={jobTitle}
                                        disabled
                                        onChange={e =>
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
                                      <Form.Label
                                        className={
                                          isDarkMode
                                            ? classes.formLabel1
                                            : classes.formLabel
                                        }
                                      >
                                        Business Industry
                                      </Form.Label>
                                      <Form.Select
                                        disabled
                                        value={selectedBusinessIndustry}
                                        onChange={e =>
                                          setSelectedBusinessIndustry(
                                            e.target.value
                                          )
                                        }
                                        className={classes.formInpt}
                                      >
                                        <option>
                                          Select Business Industry
                                        </option>
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
                                        ].map(industry => (
                                          <option
                                            key={industry}
                                            value={industry}
                                          >
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
                                      <Form.Label
                                        className={
                                          isDarkMode
                                            ? classes.formLabel1
                                            : classes.formLabel
                                        }
                                      >
                                        Company's Address
                                      </Form.Label>
                                      <Form.Control
                                        className={classes.formInpt}
                                        value={compAddress}
                                        disabled
                                        onChange={e =>
                                          setAddress(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Enter Address"
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>

                                <Row className="mb-3">
                                  <Col md={6}>
                                    <Form.Group controlId="formInput2">
                                      <Form.Label
                                        className={
                                          isDarkMode
                                            ? classes.formLabel1
                                            : classes.formLabel
                                        }
                                      >
                                        Company's Phone Number
                                      </Form.Label>
                                      <Form.Control
                                        className={classes.formInpt}
                                        value={compPhone}
                                        disabled
                                        onChange={e =>
                                          setcompPhone(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Enter Phone Number"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md={6}>
                                    <Form.Group controlId="formInput2">
                                      <Form.Label
                                        className={
                                          isDarkMode
                                            ? classes.formLabel1
                                            : classes.formLabel
                                        }
                                      >
                                        Company's Email Address
                                      </Form.Label>
                                      <Form.Control
                                        className={classes.formInpt}
                                        value={CompEmail}
                                        disabled
                                        onChange={e =>
                                          setCompEmail(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Enter Email Address"
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
                      {userData === "individual" && (
                        <>
                          <div style={{}} />
                          <div
                            className={
                              isDarkMode
                                ? classes.applicationHistoryy
                                : classes.applicationHistory
                            }
                          >
                            <div className={classes.firstDiv}></div>

                            <div className={classes.formCont}>
                              <div
                                className={
                                  isDarkMode
                                    ? classes.firstInfos
                                    : classes.firstInfo
                                }
                              >
                                <h1>Next of Kin Information</h1>
                              </div>

                              <Form style={{padding:20}}>
                                <Row className="mb-3">
                                  <Col md={6}>
                                    <Form.Group controlId="formInput1">
                                      <Form.Label
                                        className={
                                          isDarkMode
                                            ? classes.formLabel1
                                            : classes.formLabel
                                        }
                                      >
                                        First Name
                                      </Form.Label>
                                      <Form.Control
                                        className={classes.formInpt}
                                        value={nokFirstName}
                                        disabled
                                        onChange={e =>
                                          setNokFirstName(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Toluwani"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md={6}>
                                    <Form.Group controlId="formInput2">
                                      <Form.Label
                                        className={
                                          isDarkMode
                                            ? classes.formLabel1
                                            : classes.formLabel
                                        }
                                      >
                                        Last Name
                                      </Form.Label>
                                      <Form.Control
                                        className={classes.formInpt}
                                        value={nokLastName}
                                        disabled
                                        onChange={e =>
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
                                      <Form.Label
                                        className={
                                          isDarkMode
                                            ? classes.formLabel1
                                            : classes.formLabel
                                        }
                                      >
                                        Email
                                      </Form.Label>
                                      <Form.Control
                                        className={classes.formInpt}
                                        value={nokEmail}
                                        disabled
                                        onChange={e =>
                                          setNokEmail(e.target.value)
                                        }
                                        type="email"
                                        placeholder="adekoyatoluwani5@gmail.com"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md={6}>
                                    <Form.Group controlId="formInput4">
                                      <Form.Label
                                        className={
                                          isDarkMode
                                            ? classes.formLabel1
                                            : classes.formLabel
                                        }
                                      >
                                        Telephone Number
                                      </Form.Label>
                                      <Form.Control
                                        className={classes.formInpt}
                                        value={nokPhone}
                                        disabled
                                        onChange={e =>
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
                                      <Form.Label
                                        className={
                                          isDarkMode
                                            ? classes.formLabel1
                                            : classes.formLabel
                                        }
                                      >
                                        Address
                                      </Form.Label>
                                      <Form.Control
                                        className={classes.formInpt}
                                        value={nokAddress}
                                        disabled
                                        onChange={e =>
                                          setNokAddress(e.target.value)
                                        }
                                        type="address"
                                        placeholder="adekoyatoluwani5@gmail.com"
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
                  {/* )} */}
                  {userData === "corporate" && (
                    <Container>
                      <Form>
                        <Row className="mb-3">
                          <Col md={6}>
                            <Form.Group controlId="formInput1">
                              <Form.Label
                                className={
                                  isDarkMode
                                    ? classes.formLabel1
                                    : classes.formLabel
                                }
                              >
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
                              <Form.Label
                                className={
                                  isDarkMode
                                    ? classes.formLabel1
                                    : classes.formLabel
                                }
                              >
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
                              <Form.Label
                                className={
                                  isDarkMode
                                    ? classes.formLabel1
                                    : classes.formLabel
                                }
                              >
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
                              <Form.Label
                                className={
                                  isDarkMode
                                    ? classes.formLabel1
                                    : classes.formLabel
                                }
                              >
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
                              <Form.Label
                                className={
                                  isDarkMode
                                    ? classes.formLabel1
                                    : classes.formLabel
                                }
                              >
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
                              <Form.Label
                                className={
                                  isDarkMode
                                    ? classes.formLabel1
                                    : classes.formLabel
                                }
                              >
                                Date of Incorporation
                              </Form.Label>
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
                              <Form.Label
                                className={
                                  isDarkMode
                                    ? classes.formLabel1
                                    : classes.formLabel
                                }
                                l
                              >
                                State
                              </Form.Label>
                              <Form.Select
                                className={classes.formInpt}
                                disabled
                                value={
                                  statesInNigeria.find(
                                    state =>
                                      state.toUpperCase() ===
                                      customerState.toUpperCase()
                                  ) || ""
                                }
                              >
                                <option>Select State</option>
                                {statesInNigeria.map(state => (
                                  <option key={state} value={state}>
                                    {state}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group controlId="formInput5">
                              <Form.Label
                                className={
                                  isDarkMode
                                    ? classes.formLabel1
                                    : classes.formLabel
                                }
                              >
                                Local Government Area
                              </Form.Label>
                              <Form.Select
                                disabled
                                value={customerLga}
                                className={classes.formInpt}
                                onChange={e => setCustomerLga(e.target.value)}
                              >
                                <option>Select LGA</option>
                                {ogunStateLGAs.map(lga => (
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
                              <Form.Label
                                className={
                                  isDarkMode
                                    ? classes.formLabel1
                                    : classes.formLabel
                                }
                                l
                              >
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
            </div>
            {/* <div className={classes.formContainer}> */}
            <Form
              className={
                isDarkMode ? classes.formContainer1 : classes.formContainer
              }
            >
              {/* <Row className="mb-3">
                                    <Col md={12}>
                                      <Form.Group controlId="lga">
                                        <Form.Label className={classes.labelTxt}>
                                          Tax Station
                                        </Form.Label>
                                        <Form.Control
                                          as="select"
                                          className={`form-select ${classes.optioncss}`}
                                          value={selectedStation}
                                          onChange={handleStationChange}
                                          required
                                        >
                                          <option value="">Select Tax Station</option>
                                          {tableData1?.map((item, index) => (
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
                                  </Row> */}

              {/* <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="lga">
                    <Form.Label
                      className={
                        isDarkMode ? classes.labelTxt1 : classes.labelTxt
                      }
                    >
                      Area
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
                    <Form.Label
                      className={
                        isDarkMode ? classes.labelTxt1 : classes.labelTxt
                      }
                    >
                      Location
                    </Form.Label>
                    <Form.Control
                      as="select"
                      className={`form-select ${classes.optioncss}`}
                      value={selectedLocation}
                      onChange={handleLocationChange}
                      required
                    >
                      <option value="">Select Location</option>
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
                  <Form.Group controlId="developmentStatus">
                    <Form.Label
                      className={
                        isDarkMode ? classes.labelTxt1 : classes.labelTxt
                      }
                    >
                      Development Status of Land
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
                <Col md={6}>
                  <Form.Group controlId="landUse">
                    <Form.Label
                      className={
                        isDarkMode ? classes.labelTxt1 : classes.labelTxt
                      }
                    >
                      Land Use
                    </Form.Label>
                    <Form.Select
                      className={classes.optioncss}
                      onChange={handleLandUse}
                    >
                      <option value="">Select Land Use Type</option>
                      <option value="1">Residential</option>
                      <option value="2">Industrial</option>
                      <option value="3">
                        Civic/Religious/Charitable Programme
                      </option>
                      <option value="4">Agricultural</option>
                      <option value="5">Commercial</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="option3">
                    <Form.Label
                      className={
                        isDarkMode ? classes.labelTxt1 : classes.labelTxt
                      }
                    >
                      Proposed Residential Building
                    </Form.Label>
                    <Form.Select
                      className={classes.optioncss}
                      onChange={handleProposedBuild}
                    >
                      <option value="">Select Building Type</option>
                      <option value="1">Single-Family Home</option>
                      <option value="2">Multi-Family Home</option>
                      <option value="3">Townhouse</option>
                      <option value="4">Apartment</option>
                      <option value="5">Bungalow</option>
                      <option value="6">Villa</option>
                      <option value="7">Duplex</option>
                      <option value="8">Penthouse</option>
                      <option value="9">Studio Apartment</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="proposedTimeline">
                    <Form.Label
                      className={
                        isDarkMode ? classes.labelTxt1 : classes.labelTxt
                      }
                    >
                      Proposed Development Timeline
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className={classes.optioncss}
                      placeholder="Enter Timeline"
                      value={timeLine}
                      onChange={e => setTimeLine(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="proposedTimeline">
                    <Form.Label
                      className={
                        isDarkMode ? classes.labelTxt1 : classes.labelTxt
                      }
                    >
                      Size in plot
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className={classes.optioncss}
                      placeholder="Enter plot size in number e.g 2"
                      value={sizePlot}
                      onChange={e => setSizePlot(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="proposedTimeline">
                    <Form.Label
                      className={
                        isDarkMode ? classes.labelTxt1 : classes.labelTxt
                      }
                    >
                      Size in Sqm
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className={classes.optioncss}
                      placeholder="Enter sqm size in number e.g 2"
                      value={sizeSqm}
                      onChange={e => setSizeSqm(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="sourceOfFunds">
                    <Form.Label
                      className={
                        isDarkMode ? classes.labelTxt1 : classes.labelTxt
                      }
                    >
                      Proposed Source of Funds
                    </Form.Label>
                    <Form.Select
                      className={classes.optioncss}
                      onChange={handleSourceFund}
                    >
                      <option value="">Select Source of Income</option>
                      <option value="Salary">Salary</option>
                      <option value="Investment">Investment</option>
                      <option value="Loan">Loan</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="estimatedValue">
                    <Form.Label
                      className={
                        isDarkMode ? classes.labelTxt1 : classes.labelTxt
                      }
                    >
                      Estimated Development Value
                    </Form.Label>
                    <CurrencyInput
                      id="total-amount"
                      name="totalAmount"
                      value={totalAmount}
                      decimalsLimit={2}
                      onValueChange={value => setTotalAmount(value)}
                      prefix="₦"
                      groupSeparator=","
                      placeholder="Enter Amount"
                      className={`form-control ${classes.optioncss}`}
                    />
                  </Form.Group>
                </Col>
              </Row> */}

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="surveyPlan">
                    <Form.Label
                      className={
                        isDarkMode ? classes.labelTxt1 : classes.labelTxt
                      }
                    >
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
                        className={classes.hiddenFile}
                      />
                    </div>
                    <p style={{ fontSize: 12, color: "red" }}>{imgError}</p>
                    {/* <Form.Control className={classes.optioncss} type="file" accept=".pdf" onChange={handleFileChange} /> */}
                  </Form.Group>
                </Col>
                <Col md={6}>
                <Form.Group controlId="BuildingArchitectural">
                <Form.Label
                    className={
                      isDarkMode ? classes.labelTxt1 : classes.labelTxt
                    }
                  >
                    Building Architectural Plan
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
                  <p style={{ fontSize: 12, color: "red" }}>{imgError4}</p>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label
                    className={
                      isDarkMode ? classes.labelTxt1 : classes.labelTxt
                    }
                  >
                    Electrical Architectural Plan
                  </Form.Label>
                  <div className={classes.fileUpload} onClick={handleClick30}>
                    <img
                      src={ImageIcon}
                      alt="icon"
                      className={classes.leftIcon}
                    />
                    <span className={classes.uploadText}>
                      {fileName30.length > 30
                        ? fileName30.slice(0, 30) + "..."
                        : fileName30}
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
                      ref={fileInputRef30}
                      onChange={handleFileChange30}
                      className={classes.hiddenFile}
                    />
                  </div>
                  <p style={{ fontSize: 12, color: "red" }}>{imgError2}</p>
                </Col>
                <Col md={6}>
                  <Form.Label
                    className={
                      isDarkMode ? classes.labelTxt1 : classes.labelTxt
                    }
                  >
                    Mechanical Architectural Plan
                  </Form.Label>
                  <div className={classes.fileUpload} onClick={handleClick40}>
                    <img
                      src={ImageIcon}
                      alt="icon"
                      className={classes.leftIcon}
                    />
                    <span className={classes.uploadText}>
                      {fileName40
                        ? fileName40.length > 30
                          ? fileName40.slice(0, 30) + "..."
                          : fileName40
                        : ""}
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
                      ref={fileInputRef40}
                      onChange={handleFileChange40}
                      className={classes.hiddenFile}
                    />
                  </div>
                  <p style={{ fontSize: 12, color: "red" }}>{imgError3}</p>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label
                    className={
                      isDarkMode ? classes.labelTxt1 : classes.labelTxt
                    }
                  >
                    Structural Engineering
                  </Form.Label>
                  <div className={classes.fileUpload} onClick={handleClick31}>
                    <img
                      src={ImageIcon}
                      alt="icon"
                      className={classes.leftIcon}
                    />
                    <span className={classes.uploadText}>
                      {fileName31.length > 30
                        ? fileName31.slice(0, 30) + "..."
                        : fileName31}
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
                      ref={fileInputRef31}
                      onChange={handleFileChange31}
                      className={classes.hiddenFile}
                    />
                  </div>
                  <p style={{ fontSize: 12, color: "red" }}>{imgError21}</p>
                </Col>
                <Col md={6}>
                  <Form.Label
                    className={
                      isDarkMode ? classes.labelTxt1 : classes.labelTxt
                    }
                  >
                    Title Document
                  </Form.Label>
                  <div className={classes.fileUpload} onClick={handleClick32}>
                    <img
                      src={ImageIcon}
                      alt="icon"
                      className={classes.leftIcon}
                    />
                    <span className={classes.uploadText}>
                      {fileName32
                        ? fileName32.length > 30
                          ? fileName32.slice(0, 30) + "..."
                          : fileName32
                        : ""}
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
                      ref={fileInputRef32}
                      onChange={handleFileChange32}
                      className={classes.hiddenFile}
                    />
                  </div>
                  <p style={{ fontSize: 12, color: "red" }}>{imgError22}</p>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="option3">
                    <Form.Label
                      className={
                        isDarkMode ? classes.labelTxt1 : classes.labelTxt
                      }
                    >
                      Select Land Use Type
                    </Form.Label>
                    <Form.Select
                      className={classes.optioncss}
                      onChange={handleProposedBuild}
                    >
                      {/* <option value="">Select Land Use Type</option>
                      <option value="1">Single-Family Home</option>
                      <option value="2">Multi-Family Home</option>
                      <option value="3">Townhouse</option>
                      <option value="4">Apartment</option>
                      <option value="5">Bungalow</option>
                      <option value="6">Villa</option>
                      <option value="7">Duplex</option>
                      <option value="8">Penthouse</option>
                      <option value="9">Studio Apartment</option> */}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="proposedTimeline">
                    <Form.Label
                      className={
                        isDarkMode ? classes.labelTxt1 : classes.labelTxt
                      }
                    >
                      Select Type
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className={classes.optioncss}
                      placeholder="Enter Timeline"
                      value={timeLine}
                      onChange={e => setTimeLine(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={12}>
                  <Form.Group controlId="attestation">
                    <Form.Label>Attestation</Form.Label>
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
                    onClick={createApplication1}
                    // disabled={!isFormValid}
                    disabled={!attestation}
                  >
                    {createLoading ? (
                      <>
                        <Spinner size="sm" />
                        <span style={{ marginLeft: "5px" }}>
                          Processing, please wait...
                        </span>
                      </>
                    ) : (
                      "Continue"
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
            <Modal
              show={showModalSuccess}
              onHide={() => setShowModalSuccess(false)}
            >
              <Modal.Header closeButton>
                {/* <Modal.Title>Success</Modal.Title> */}
              </Modal.Header>
              <Modal.Body
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className={classes.modalbodynew}
              >
                <img
                  src={verified}
                  style={{ height: 48, width: 48, objectFit: "contain" }}
                  alt="Verify"
                  className={classes.picverfied}
                />
                <div className={classes.textss}>
                  <p
                    style={{
                      fontWeight: 700,
                      marginTop: 17,
                      fontSize: 16,
                      color: "#000000",
                      textAlign: "center",
                    }}
                  >
                    Success!
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
                </div>
                <div className="d-flex justify-content-center">
                  <Button
                    style={{
                      borderRadius: 8,
                      width: 185,
                      height: 44,
                      fontWeight: 500,
                      marginTop: 20,
                      fontSize: 16,
                      color: "#fff",
                      backgroundColor: "#21B55A",
                    }}
                    className={classes.btnmodal}
                    variant="success"
                    onClick={() => setShowModalSuccess(false)}
                  >
                    Okay
                  </Button>
                </div>
              </Modal.Body>
            </Modal>
            <Modal
              show={showModalError}
              onHide={() => setShowModalError(false)}
            >
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
                  Failed!
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
                  onClick={() => setShowModalError(false)}
                >
                  Okay
                </Button>
              </Modal.Body>
            </Modal>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandRatificationApp;
