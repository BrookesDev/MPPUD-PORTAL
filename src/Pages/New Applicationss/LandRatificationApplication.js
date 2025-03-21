import React, { useState, useEffect, useRef } from "react";
import DashboardNav from "../../Components/Navigation.js/Navigation";
import Horheader from "../../Components/horheader/horheader";
import classes from "./LandRatificationApplicational.module.css";
import PdfIcon from "../../Assets/pdf.svg";
import UploadIcon from "../../Assets/upload.png";

import crop from "../../Assets/repoort.png";

import HOC from "../../Assets/hoc.png";
import CurrencyInput from "react-currency-input-field";
import verified from "../../Assets/tick-circle.png";
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
import { COUNTRIES, STATES, LGA } from "../../API/country";
// import NewApplications from '../New Application/NewApplicationns';

// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';


const LandRatificationApp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { serviceID, paymentCode } = location.state || {};
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
  const [surveyPlanNumber, setSurveyPlanNumber] = useState("");
 
  
  const [acquisitionType, setAcquisitionType] = useState("");
  const [structureNo, setStructureNo] = useState("");
  const [occupantsNo, setOccupantsNo] = useState("");

  const [imgError1, setImgError1] = useState("");
  // const [imgError2, setImgError2] = useState("");
  const [imgError3, setImgError3] = useState("");
  const [plotSize, setPlotSize] = useState("");

  const [tableData, setTableData] = useState([]);
  const [tableData32, setTableData32] = useState([]);
  const [allApplications, setAllApplications] = useState([]);
  const [tableData1, setTableData1] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [name, setName] = useState("");
 
  const [propertySize, setPropertySize] = useState("");
  const [cofoNumber, setCofONumber] = useState("");

  const [fileName, setFileName] = useState("Other Supporting documents");
  const [fileName30, setFileName30] = useState("Purchase Agreement");
  
  const [fileName40, setFileName40] = useState("Purchase Receipt");
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

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleClick30 = () => {
    fileInputRef30.current.click();
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
 
  const [selectedFile15, setSelectedFile15] = useState(null);
  const [selectedFile40, setSelectedFile40] = useState(null);

 
  const [isFormValid, setIsFormValid] = useState(false);
  const [allLands, setAllLands] = useState([]);
  
  // const totalPages = 10; // Total number of pages


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



  const handleLocationChange = (e) => {
    const selectedId = e.target.value;
    const stationName =
      tableData2.find((item) => item.id.toString() === selectedId)?.location ||
      "";
    setSelectedLocationName(stationName);
    setSelectedLocation(e.target.value);
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
  </Modal>
  
  const handleFileChange2 = (event) => {
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

  
  const handleFileChange30 = (event) => {
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
  const handleFileChange40 = (event) => {
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


    // setSelectedAppId(id);
    // setShowModal(true);

   

  console.log(selectedFile);

 

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

      formData.append("lga_of_land", selectedArea);
      formData.append("estimated_development_amount", totalAmount);
      formData.append("land_development_status", selectedDevelopment);
      formData.append("land_location", selectedLocation);
      formData.append("landuse_id", selectedLandUse);
      formData.append("proposed_residential_building", selectedBuildingType);
      formData.append("proposed_source_of_fund", selectedSource);
      formData.append("size_in_plot", sizePlot);
      formData.append("size_in_sqm", sizeSqm);
      formData.append("type", serviceID);
      formData.append("price_bought_per_plot", documentAmount);
      formData.append("code", paymentCode);
      formData.append("location_name", selectedLocationName);

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
                 }
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



  // console.log(allApplications)

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
            <h4 className={classes.wlcm} style={{marginBottom: '25px', fontSize: 20}}>Land Ratification Application</h4>
            {/* <div className={classes.formContainer}> */}
            <Form className={classes.formContainer} >
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
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="lga">
                    <Form.Label className={classes.labelTxt}>Area</Form.Label>
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
                    <Form.Label className={classes.labelTxt}>
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
                      <option value="2">Industrial/Commercial</option>
                      <option value="3">
                        Civic/Religious/Charitable Programme
                      </option>
                      <option value="4">Agricultural</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="option3">
                    <Form.Label className={classes.labelTxt}>
                      Proposed Residential Building
                    </Form.Label>
                    <Form.Select className={classes.optioncss} onChange={handleProposedBuild}>
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
              </Row>

              <Row className="mb-3">
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
              </Row>

              <Row className="mb-3">
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
                      <option value="Salary">Salary</option>
                      <option value="Investment">Investment</option>
                      <option value="Loan">Loan</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
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
                      className={`form-control ${classes.optioncss}`}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="estimatedValue">
                    <Form.Label className={classes.labelTxt}>
                      Document Value{" "}
                      <span style={{ fontSize: "13px", color: "#555555" }}>
                        <b> (If it's Govt. allocated land)</b>
                      </span>
                    </Form.Label>
                    <CurrencyInput
                      id="document-amount"
                      name="documentAmount"
                      value={documentAmount}
                      decimalsLimit={2}
                      onValueChange={(value) => setDocumentValue(value)}
                      prefix="₦"
                      groupSeparator=","
                      placeholder="Enter documentt value"
                      className={`form-control ${classes.optioncss}`}
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
                  <Form.Label className={classes.labelTxt}>
                    Purchase Receipt
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
                  <p style={{ fontSize: 12, color: "red" }}>{imgError4}</p>
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

              <Row className="mb-3 mx">
                <Col md={{ span: 6, offset: 3 }} className="text-center">
                  <Button
                    className={classes.modBtnn}
                    variant="success"
                    onClick={createApplication1}
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
                                    style={{borderRadius: 8, width: 185, height: 44, fontWeight: 500, marginTop: 20, fontSize: 16, color: "#fff", backgroundColor: "#21B55A"}}
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
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandRatificationApp;
