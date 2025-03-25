import React, { useState, useEffect, useRef } from "react";
import DashboardNav from "../../Components/Navigation.js/Navigation";
import Horheader from "../../Components/horheader/horheader";
import classes from "./LandAllocationApplication.module.css";
import crop from "../../Assets/repoort.png";
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



const LandAlloc = () => {
  const location = useLocation();
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const { serviceID, paymentCode } = location.state || {};
  const [modalMessage, setModalMessage] = useState("");
  const [schemes, setSchemes] = useState([]);
  const [consentTypes, setConsentTypes] = useState([]);
  const [caveatTypes, setCaveatTypes] = useState([]);
  const [show, setShow] = useState(false);

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
  const [name, setName] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  const [fileName, setFileName] = useState("Other Supporting documents");
  const [fileName10, setFileName10] = useState("Purchase Agreement");
  const [fileName20, setFileName20] = useState("Purchase Receipt");
  const [fileName1, setFileName1] = useState("Survey Plan");
  const fileInputRef = useRef(null);
  const fileInputRef1 = useRef(null);
 
 
  const fileInputRef10 = useRef(null);
  const fileInputRef20 = useRef(null);
  

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
    }
  };
  const handleErrorClose = () => {
    setShowModalError(false);
    handleShowPaymentModal();
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
      formData.append("lga_of_land", selectedArea);
      formData.append("estimated_development_amount", totalAmount);
      formData.append("land_development_status", selectedDevelopment);
      formData.append("land_location", landLocation);
      formData.append("time_line", timeLine);
      formData.append("size_in_sqm", sizeSqm);
      formData.append("landuse_id", selectedLandUse);
      formData.append("proposed_residential_building", selectedBuildingType);
      formData.append("proposed_source_of_fund", selectedSource);
      formData.append("code", paymentCode);
      formData.append("type", serviceID);
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${bearer}`,
      };
      const response = await axios.post(
        `${BASE_URL}/application/make-new`,
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
      setTimeLine("");
      setSelectedArea("");
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
            <h4 className={classes.wlcm} style={{ marginBottom: "25px", fontSize: 20 }}>
              Land Allocation Application
            </h4>
            <Form className={classes.formContainer}>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="lga">
                    <Form.Label className={classes.labelTxt}>
                      Area of Land
                    </Form.Label>
                    <Form.Control
                      as="select"
                      className={`form-select ${classes.optioncss}`}
                      value={selectedArea}
                      onChange={handleAreaChange}
                      required
                    >
                      <option value="">Select Area</option>
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
                  <Form.Group controlId="proposedTimeline">
                    <Form.Label className={classes.labelTxt}>
                      Size in Sqm
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className={classes.optioncss}
                      placeholder="Enter Size in sqm"
                      value={sizeSqm}
                      onChange={(e) => setSizeSqm(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="developmentStatus">
                    <Form.Label className={classes.labelTxt}>
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
              </Row>

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
                    <Form.Label className={classes.labelTxt}>
                      Proposed Residential Building (Not Specified)
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
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="proposedTimeline">
                    <Form.Label className={classes.labelTxt}>
                      Proposed Development Timeline
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className={classes.optioncss}
                      placeholder="Enter Timeline"
                      value={timeLine}
                      onChange={(e) => setTimeLine(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="sourceOfFunds">
                    <Form.Label className={classes.labelTxt}>
                      Proposed Source of Funds
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
                    <Form.Label className={classes.labelTxt}>
                      Estimated Development Value
                    </Form.Label>
                    <CurrencyInput
                      id="total-amount"
                      name="totalAmount"
                      value={totalAmount}
                      decimalsLimit={2}
                      onValueChange={(value) => setTotalAmount(value)}
                      prefix="₦"
                      groupSeparator=","
                      placeholder="Enter Amount"
                      className={`form-select ${classes.optioncss}`}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="surveyPlan">
                    <Form.Label className={classes.labelTxt}>
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
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label className={classes.labelTxt}>
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
                      className={classes.hiddenFile}
                    />
                  </div>
                  <p style={{ fontSize: 12, color: "red" }}>{imgError3}</p>
                </Col>
                <Col md={6}>
                  <Form.Label className={classes.labelTxt}>
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
                      onChange={handleFileChange20}
                      className={classes.hiddenFile}
                    />
                  </div>
                  <p style={{ fontSize: 12, color: "red" }}>{imgError2}</p>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={12}>
                  <Form.Label className={classes.labelTxt}>
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
                      onChange={handleFileChange2}
                      className={classes.hiddenFile}
                    />
                  </div>
                  <p style={{ fontSize: 12, color: "red" }}>{imgError1}</p>
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

              <Row className="mb-3">
                <Col md={{ span: 6, offset: 3 }} className="text-center">
                  <Button
                    className={classes.modBtnn}
                    variant="success"
                    onClick={createApplication}
                    // disabled={!isFormValid}
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
