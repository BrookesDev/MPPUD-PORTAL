import React, { useState, useEffect, useRef } from "react";
import DashboardNav from "../../Components/Navigation.js/Navigation";
import Horheader from "../../Components/horheader/horheader";
import classes from "./CFOApplication.module.css";
import PdfIcon from "../../Assets/pdf.svg";
import UploadIcon from "../../Assets/upload.png";
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
import crop from "../../Assets/repoort.png";
import verified from "../../Assets/tick-circle.png";
import ImageIcon from "../../Assets/piclogo.png";
import { Navbar, Container, Button } from "react-bootstrap";
import AsyncStorage from "@react-native-async-storage/async-storage";



const CFOApplication = () => {
  const location = useLocation();
  const [modalMessage, setModalMessage] = useState("");
  const { serviceID, paymentCode, cofoType } = location.state || {};
  
  const [schemes, setSchemes] = useState([]);
  const [consentTypes, setConsentTypes] = useState([]);
  const [caveatTypes, setCaveatTypes] = useState([]);
  const [show, setShow] = useState(false);
  const [roleLoading, setRoleLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
 
  const [show5, setShow5] = useState(false);
  const [bearer, setBearer] = useState("");
  // const [bearer1, setBearer1] = useState("");
  const [imgError, setImgError] = useState("");
  // const [pageNumber, setPageNumber] = useState("");
 
  const [volumeNo, setVolumeNo] = useState("");
  const [imgError1, setImgError1] = useState("");
  const [imgError2, setImgError2] = useState("");
  const [imgError3, setImgError3] = useState("");
  const [imgError5, setImgError5] = useState("");

  const [tableData, setTableData] = useState([]);
  const [tableData32, setTableData32] = useState([]);
  const [allApplications, setAllApplications] = useState([]);
  const [tableData1, setTableData1] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [name, setName] = useState("");
 
  const [selectedPropertyOwnership, setSelectedPropertyOwnership] =
    useState("");


  const [fileName3, setFileName3] = useState("Evidence of ownership");
  const [fileName4, setFileName4] = useState(
    "Particulars of building plan (if any)"
  );
  const [fileName5, setFileName5] = useState(
    "Evidence of title (e.g conveyance, agreement, receipt e.t.c)"
  );
  const [fileName6, setFileName6] = useState(
    "Attach site plan and state polt no, block no where applicable"
  );

  const fileInputRef3 = useRef(null);
  const fileInputRef4 = useRef(null);
  const fileInputRef5 = useRef(null);
  const fileInputRef6 = useRef(null);

  const handleClick3 = () => {
    fileInputRef3.current.click();
  };
  const handleClick4 = () => {
    fileInputRef4.current.click();
  };
  const handleClick5 = () => {
    fileInputRef5.current.click();
  };
  const handleClick6 = () => {
    fileInputRef6.current.click();
  };



  const navigate = useNavigate();
    const [showModalSuccess, setShowModalSuccess] = useState(false);
      const [showModalError, setShowModalError] = useState(false);
  const [benLoading, setBenLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [selectedLGA, setSelectedLGA] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedAreaName, setSelectedAreaName] = useState("");
  const [selectedAppId, setSelectedAppId] = useState(null);
 
  const [selectedDevelopment, setSelectedDevelopment] = useState("");
  const [selectedLandUse, setSelectedLandUse] = useState("");
  const [selectedLandStatus, setSelectedLandStatus] = useState(cofoType || "");
  const [selectedBuildingType, setSelectedBuildingType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [landLocation, setLandLocation] = useState("");
  
 
  const [totalAmount, setTotalAmount] = useState("");
  const [attestation, setAttestation] = useState(false);
  const [allocationDate, setAllocationDate] = useState("");
  const [timeLine, setTimeLine] = useState("");
  const [sizePlot, setSizePlot] = useState("");
  const [sizeSqm, setSizeSqm] = useState("");
  const [presentValue, setPresentValue] = useState("");
  const [possessionLength, setPossessionLength] = useState("");
  const [propertyOwnership, setPropertyOwnership] = useState("");
  const [tenement, setTenement] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFile3, setSelectedFile3] = useState(null);
  const [selectedFile4, setSelectedFile4] = useState(null);
  const [selectedFile5, setSelectedFile5] = useState(null);
  
  const [isFormValid, setIsFormValid] = useState(false);
  const [allLands, setAllLands] = useState([]);
  // const [isConfirmed, setIsConfirmed] = useState(false);
  // const [selectedOption, setSelectedOption] = useState(null);
  // const totalPages = 10;
  // const [currentPage, setCurrentPage] = useState(1);
  // const [visibleDropdown, setVisibleDropdown] = useState(null);

  const readData = async () => {
    try {
      const detail = await AsyncStorage.getItem("userName");
      const details = await AsyncStorage.getItem("userToken");

      if (detail !== null) {
        // const firstName = detail.split(' ')[0];
        setName(detail);
      }

      if (details !== null) {
        setBearer(details);
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


  const handleLandUse = (e) => {
    setSelectedLandUse(e.target.value);
    // setShowErrorMessage(false);
  };

  const handleLandStatus = (e) => {
    setSelectedLandStatus(e.target.value);
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
      fetchLocation(selectedId); // Fetch locations based on selected area
    }
  };



  const handleLocationChanges = (e) => {
    const selectedId = e.target.value;
    // const stationName =
    //   tableData2.find((item) => item.id.toString() === selectedId)?.location ||
    //   "";
    // setSelectedLocationName(stationName);
    setLandLocation(e.target.value);
    // setShowErrorMessage(false);
  };


  const handlePropOwnership = (e) => {
    setSelectedPropertyOwnership(e.target.value);
    // setShowErrorMessage(false);
  };

 

  const handleFileChange4 = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setImgError5("File is larger than 2MB. Max upload size is 2MB.");
        setFileName3("");
        return;
      } // Get the first selected file
      setFileName3(file.name); // Set the file name
      setSelectedFile4([file]);
      setImgError5(""); // Store the file in state
    }
  };

  const handleFileChange6 = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setImgError2("File is larger than 2MB. Max upload size is 2MB.");
        setFileName4("");
        return;
      } // Get the first selected file
      setFileName5(file.name); // Set the file name
      setSelectedFile4([file]);
      setImgError2(""); // Store the file in state
    }
  };
  const handleFileChange7 = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setImgError3("File is larger than 2MB. Max upload size is 2MB.");
        setFileName6("");
        return;
      } // Get the first selected file
      setFileName6(file.name); // Set the file name
      setSelectedFile5([file]);
      setImgError3(""); // Store the file in state
    }
  };

  const handleFileChange5 = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setImgError("File is larger than 2MB. Max upload size is 2MB.");
        setFileName4("");
        return;
      } // Get the first selected file
      setFileName4(file.name); // Set the file name
      setSelectedFile5([file]);
      setImgError(""); // Store the file in state
    }
  };


  const handleCheckboxChange = (event) => {
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

  console.log(selectedFile);

 

  const createApplication4 = async () => {
    setCreateLoading(true);
    try {
      const formData = new FormData();

      if (selectedFile4 && selectedFile4.length > 0) {
        formData.append("evidence_of_ownership", selectedFile4[0]);
      }
      if (selectedFile5 && selectedFile5.length > 0) {
        formData.append("building_plan", selectedFile5[0]);
      }

      // formData.append("evidence_of_ownership", selectedFile4[0]);
      // formData.append("building_plan", selectedFile5[0]);
      formData.append("land_location", landLocation);
      formData.append("landuse_id", selectedLandUse);
      formData.append("tenement_rate_number", tenement);
      formData.append("size_in_plot", sizePlot);
      formData.append("value_of_property", presentValue);
      formData.append("ownership_capacity", propertyOwnership);
      formData.append("length_of_possession", possessionLength);
      formData.append("landstatus_id", selectedLandStatus);
      formData.append("type", serviceID);
      formData.append("code", paymentCode);

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${bearer}`,
      };

      const response = await axios.post(
        `${BASE_URL}/application/make-new`,
        formData,
        { headers }
      );

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
navigate('/applications')
      setAllocationDate("");
      setLandLocation("");
      setSelectedBuildingType("");
      setSelectedDevelopment("");
      setSelectedLGA("");
      setSelectedLandUse("");
      setSelectedSource("");
      setSelectedFile("");
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
                 }
               });
      }
    } finally {
      setCreateLoading(false);
    }
  };

  const handleErrorClose = () => {
    setShowModalError(false);
    // handleShowPaymentModal();
  };

  const handleCloseSuccessModal = () => {
    setShowModalSuccess(false);
    navigate("/applications"); // Navigate after closing the modal
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
    </Modal>

  const createApplication5 = async () => {
    setCreateLoading(true);
    try {
      const formData = new FormData();

      if (selectedFile4 && selectedFile4.length > 0) {
        formData.append("evidence_of_title", selectedFile4[0]);
      }
      if (selectedFile5 && selectedFile5.length > 0) {
        formData.append("site_plan", selectedFile5[0]);
      }

      // formData.append("evidence_of_title", selectedFile4[0]);
      // formData.append("site_plan", selectedFile5[0]);
      formData.append("land_location", landLocation);
      formData.append("landuse_id", selectedLandUse);
      formData.append("size_in_plot", sizeSqm);
      formData.append("development_expenses", presentValue);
      formData.append("development_timeframe", tenement);
      formData.append("other_property_size", sizePlot);
      formData.append("code", paymentCode);
      formData.append("type", serviceID);
      formData.append("property_state", selectedPropertyOwnership);
      formData.append("length_of_possession", possessionLength);
      formData.append("landstatus_id", selectedLandStatus);

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${bearer}`,
      };

      const response = await axios.post(
        `${BASE_URL}/application/make-new`,
        formData,
        { headers }
      );

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
navigate('/applications')
      setAllocationDate("");
      setLandLocation("");
      setSelectedBuildingType("");
      setSelectedDevelopment("");
      setSelectedLGA("");
      setSelectedLandUse("");
      setSelectedSource("");
      setSelectedFile("");
      setSelectedLandStatus("");
      setPropertyOwnership("");
      setPossessionLength("");
      setPresentValue("");
      setSizePlot("");
      setTenement("");
      setFileName3("Evidence of ownership");
      setSelectedFile4("");
      setFileName4("Particulars of building plan (if any)");
      setSelectedFile5("");
      setPossessionLength("");
      setSizeSqm("");
      setSelectedLandUse("");
      setSelectedPropertyOwnership("");
      setPresentValue("");
      setSizePlot("");
      setTenement("");
      setFileName5(
        "Evidence of title (e.g conveyance, agreement, receipt e.t.c)"
      );
      setSelectedFile4("");
      fileName6(
        "Attach site plan and state polt no, block no where applicable"
      );
      setSelectedFile5("");

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
                 }
               });
      }
    } finally {
      setCreateLoading(false);
    }
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

  const fetchLocation = async (areaId) => {
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
            <h4 className={classes.wlcm} style={{ marginBottom: "25px" }}>
              Certificate Of Occupancy Application
            </h4>
            <Form className={classes.formContainer}>
            
              {selectedLandStatus === 1 && (
                <Container>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="lga">
                        <Form.Label className={classes.labelTxt}>
                          Local Government Area of Land
                        </Form.Label>
                        <Form.Control
                          as="select"
                          className={`form-select ${classes.optioncss}`}
                          value={selectedArea}
                          onChange={handleAreaChange}
                          required
                        >
                          <option value="">Select LGA</option>
                          {tableData.map((item, index) => (
                            <option key={index} value={item.id}>
                              {item.description}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group controlId="lga">
                        <Form.Label className={classes.labelTxt}>
                          Land Location
                        </Form.Label>
                        <Form.Control
                          as="select"
                          className={`form-select ${classes.optioncss}`}
                          value={landLocation}
                          onChange={handleLocationChanges}
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
                      <Form.Group controlId="landLocation">
                        <Form.Label className={classes.labelTxt}>
                          Length of time of possession of property
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className={classes.optioncss}
                          placeholder="Length of time for which property has been in your possession"
                          value={possessionLength}
                          onChange={(e) => setPossessionLength(e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group controlId="landLocation">
                        <Form.Label className={classes.labelTxt}>
                          State capacity in which you own the property{" "}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className={classes.optioncss}
                          placeholder="e.g self built, by purchase, in inheritance, or how else"
                          value={propertyOwnership}
                          onChange={(e) => setPropertyOwnership(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>



                  <Row className="mb-3">
                  
                    <Col md={6}>
                      <Form.Group controlId="estimatedValue">
                        <Form.Label className={classes.labelTxt}>
                          Estimated Present Value of property
                        </Form.Label>
                        <CurrencyInput
                          id="value"
                          name="value"
                          value={presentValue}
                          decimalsLimit={2}
                          onValueChange={(value) => setPresentValue(value)}
                          prefix="₦"
                          groupSeparator=","
                          placeholder="Enter Estimated present value of property"
                          className={`form-select ${classes.optioncss}`}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group controlId="proposedTimeline">
                        <Form.Label className={classes.labelTxt}>
                          Size in plot
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className={classes.optioncss}
                          placeholder="Enter Size in plot"
                          value={sizePlot}
                          onChange={(e) => setSizePlot(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    
                    <Col md={6}>
                      <Form.Group controlId="proposedTimeline">
                        <Form.Label className={classes.labelTxt}>
                          State property tenement rate number (if any)
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className={classes.optioncss}
                          placeholder="Enter tenement rate"
                          value={tenement}
                          onChange={(e) => setTenement(e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group controlId="landUse">
                        <Form.Label className={classes.labelTxt}>
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
                      <Form.Group controlId="surveyPlan">
                        <Form.Label className={classes.labelTxt}>
                          Evidence of ownership
                        </Form.Label>
                        <div
                          className={classes.fileUpload}
                          onClick={handleClick3}
                        >
                          <img
                            src={ImageIcon}
                            alt="icon"
                            className={classes.leftIcon}
                          />
                          <span className={classes.uploadText}>
                            {fileName3.length > 30
                              ? fileName3.slice(0, 30) + "..."
                              : fileName3}
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
                            ref={fileInputRef3}
                            onChange={handleFileChange4}
                            className={classes.hiddenFile}
                          />
                        </div>
                        <p style={{ fontSize: 12, color: "red" }}>{imgError5}</p>
                        {/* <Form.Control className={classes.optioncss} type="file" accept=".pdf" onChange={handleFileChange} /> */}
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Label className={classes.labelTxt}>
                        Particulars of approved building plan (if any)
                      </Form.Label>
                      <div
                        className={classes.fileUpload}
                        onClick={handleClick4}
                      >
                        <img
                          src={ImageIcon}
                          alt="icon"
                          className={classes.leftIcon}
                        />
                        <span className={classes.uploadText}>
                          {fileName4.length > 30
                            ? fileName4.slice(0, 30) + "..."
                            : fileName4}
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
                          ref={fileInputRef4}
                          onChange={handleFileChange5}
                          className={classes.hiddenFile}
                        />
                      </div>
                      <p style={{ fontSize: 12, color: "red" }}>{imgError}</p>
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
                                color: "#333",
                                textAlign: "justify",
                              }}
                            >
                              <p>
                                Information supplied in this form is treated as
                                strictly confidential. <br />
                                I/We realise that it is an offense to make a
                                false statement/claim in this form and that any
                                allocation granted me on the basis of such false
                                claim is revocable and may be revoked, and if a
                                certificate of occupancy has been granted, such
                                certificate must be revoked.
                                <br />
                                The Bureau of Lands and Survey accepts no
                                responsibility for an application form not
                                completed properly and for which reason such an
                                application may be rejected. <br />
                                I/We undertake to pay all necessary fees due to
                                the preparation of a certificate of occupancy
                                which may be issued consequent upon this
                                application. <br />
                                Should I withdraw the above application after
                                making such deposit, I agree to forfeit the
                                whole or such portion thereof as the Governor
                                may decide.
                              </p>
                            </div>
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={12} className="text-center">
                      <Button
                        className={classes.modBtnn}
                        variant="success"
                        onClick={createApplication4}
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
                </Container>
              )}

              {selectedLandStatus === 2 && (
                <Container>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="lga">
                        <Form.Label className={classes.labelTxt}>
                          Local Government Area of Land
                        </Form.Label>
                        <Form.Control
                          as="select"
                          className={`form-select ${classes.optioncss}`}
                          value={selectedArea}
                          onChange={handleAreaChange}
                          required
                        >
                          <option value="">Select LGA</option>
                          {tableData.map((item, index) => (
                            <option key={index} value={item.id}>
                              {item.description}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group controlId="lga">
                        <Form.Label className={classes.labelTxt}>
                          Land Location
                        </Form.Label>
                        <Form.Control
                          as="select"
                          className={`form-select ${classes.optioncss}`}
                          value={landLocation}
                          onChange={handleLocationChanges}
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
                      <Form.Group controlId="landLocation">
                        <Form.Label className={classes.labelTxt}>
                          Length of time of possession of property
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className={classes.optioncss}
                          placeholder="Length of time for which property has been in your possession"
                          value={possessionLength}
                          onChange={(e) => setPossessionLength(e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group controlId="proposedTimeline">
                        <Form.Label className={classes.labelTxt}>
                          Size in Sqm/Feets
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className={classes.optioncss}
                          placeholder="Enter Size in sqm/feet"
                          value={sizeSqm}
                          onChange={(e) => setSizeSqm(e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                  </Row>
                  {/* <Row className="mb-3">
                    
                  </Row> */}
                  <Row className="mb-3">
                  
                    <Col md={6}>
                      <Form.Group controlId="landUse">
                        <Form.Label className={classes.labelTxt}>
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

                    <Col md={6}>
                      <Form.Group controlId="sourceOfFunds">
                        <Form.Label className={classes.labelTxt}>
                          Property Ownership
                        </Form.Label>
                        <Form.Select
                       className={`mt-3 ${classes.optioncss}`}
                          onChange={handlePropOwnership}
                          
                        >
                          <option value="">Select property ownership</option>
                          <option value="freehold">Freehold</option>
                          <option value="leasehold">Lease hold</option>
                          <option value="mortgage">Subject to Mortgage</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* <Row className="mb-3">
                   
                  </Row> */}
                  <Row className="mb-3">
                   

                    <Col md={6}>
                      <Form.Group controlId="estimatedValue">
                        <Form.Label className={classes.labelTxt}>
                          How much money are you prepared to invest on
                          developing the property or to continue developing it?
                        </Form.Label>
                        <CurrencyInput
                          id="value"
                          name="value"
                          value={presentValue}
                          decimalsLimit={2}
                          onValueChange={(value) => setPresentValue(value)}
                          prefix="₦"
                          groupSeparator=","
                          placeholder="How much money are you prepared to invest on developing the property or to continue developing it?"
                          className={`form-select ${classes.optioncss}`}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group controlId="proposedTimeline">
                        <Form.Label className={classes.labelTxt}>
                          Give the approximate size of any other property owned
                          by you in Ogun state
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className={classes.optioncss}
                          placeholder="Enter Size of any other property owned by you in Ogun state"
                          value={sizePlot}
                          onChange={(e) => setSizePlot(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                
                  <Row className="mb-3">
                   

                    <Col md={6}>
                      <Form.Group controlId="proposedTimeline">
                        <Form.Label className={classes.labelTxt}>
                          How soon are you prepared to make the investment?
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className={`mt-3 ${classes.optioncss}`}
                          placeholder="Enter how soon are you prepared to make the investment?"
                          value={tenement}
                          onChange={(e) => setTenement(e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group controlId="surveyPlan">
                        <Form.Label className={classes.labelTxt}>
                          Evidence of title (e.g conveyance, agreement, receipt
                          e.t.c)
                        </Form.Label>
                        <div
                          className={classes.fileUpload}
                          onClick={handleClick5}
                        >
                          <img
                            src={ImageIcon}
                            alt="icon"
                            className={classes.leftIcon}
                          />
                          <span className={classes.uploadText}>
                            {fileName5.length > 30
                              ? fileName5.slice(0, 30) + "..."
                              : fileName5}
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
                            ref={fileInputRef5}
                            onChange={handleFileChange6}
                            className={classes.hiddenFile}
                          />
                        </div>
                        <p style={{ fontSize: 12, color: "red" }}>{imgError2}</p>
                        {/* <Form.Control className={classes.optioncss} type="file" accept=".pdf" onChange={handleFileChange} /> */}
                      </Form.Group>
                    </Col>

                  </Row>
                  
                  <Row className="mb-3">
                 
                    <Col md={6}>
                      <Form.Label className={classes.labelTxt}>
                        Attach site plan and state polt no, block no where
                        applicable
                      </Form.Label>
                      <div
                        className={classes.fileUpload}
                        onClick={handleClick6}
                      >
                        <img
                          src={ImageIcon}
                          alt="icon"
                          className={classes.leftIcon}
                        />
                        <span className={classes.uploadText}>
                          {fileName6.length > 30
                            ? fileName6.slice(0, 30) + "..."
                            : fileName6}
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
                          ref={fileInputRef6}
                          onChange={handleFileChange7}
                          className={classes.hiddenFile}
                        />
                      </div>
                      <p style={{ fontSize: 12, color: "red" }}>{imgError3}</p>
                    </Col>
                  </Row>

                  {/* <Row className="mb-3">
                    
                  </Row> */}
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
                                color: "#333",
                                textAlign: "justify",
                              }}
                            >
                              <p>
                                Information supplied in this form is treated as
                                strictly confidential. <br />
                                I/We realise that it is an offense to make a
                                false statement/claim in this form and that any
                                allocation granted me on the basis of such false
                                claim is revocable and may be revoked, and if a
                                certificate of occupancy has been granted, such
                                certificate must be revoked.
                                <br />
                                The Bureau of Lands and Survey accepts no
                                responsibility for an application form not
                                completed properly and for which reason such an
                                application may be rejected. <br />
                                I/We undertake to pay all necessary fees due to
                                the preparation of a certificate of occupancy
                                which may be issued consequent upon this
                                application. <br />
                                Should I withdraw the above application after
                                making such deposit, I agree to forfeit the
                                whole or such portion thereof as the Governor
                                may decide.
                              </p>
                            </div>
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={12} className="text-center">
                      <Button
                        className={classes.modBtnn}
                        variant="success"
                        onClick={createApplication5}
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
                </Container>
              )}
            </Form>
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

export default CFOApplication;
