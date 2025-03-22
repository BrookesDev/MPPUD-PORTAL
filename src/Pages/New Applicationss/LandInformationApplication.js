import React, { useState, useEffect, useRef } from "react";
import DashboardNav from "../../Components/Navigation.js/Navigation";
import Horheader from "../../Components/horheader/horheader";
import classes from "./LandInformationApplication.module.css";
import PdfIcon from "../../Assets/pdf.svg";
import UploadIcon from "../../Assets/upload.png";

import crop from "../../Assets/repoort.png";
import verified from "../../Assets/tick-circle.png";
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




const LandInformationApplication = () => {
    const location = useLocation();
    const { serviceID, paymentCode } = location.state || {}; 
     const [showModalSuccess, setShowModalSuccess] = useState(false);
        const [showModalError, setShowModalError] = useState(false);
  const [schemes, setSchemes] = useState([]);
  const [consentTypes, setConsentTypes] = useState([]);
  const [caveatTypes, setCaveatTypes] = useState([]);
  const [show, setShow] = useState(false);
  const [roleLoading, setRoleLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [bearer, setBearer] = useState("");
  const [bearer1, setBearer1] = useState("");
  const [imgError, setImgError] = useState("");
  // const [pageNumber, setPageNumber] = useState("");
  const [surveyPlanNumber, setSurveyPlanNumber] = useState("");
  const [surveyorName, setSurveyorName] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
 

  const [tableData, setTableData] = useState([]);
  const [tableData32, setTableData32] = useState([]);
  const [allApplications, setAllApplications] = useState([]);
  const [tableData1, setTableData1] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [name, setName] = useState("");
  const [fileName1, setFileName1] = useState("Survey Plan");

  const fileInputRef1 = useRef(null);

  const handleClick1 = () => {
    fileInputRef1.current.click();
  };

  const navigate = useNavigate();
  const [modalMessage,setModalMessage] = useState("")
  const [benLoading, setBenLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [selectedDevelopment, setSelectedDevelopment] = useState("");
  const [selectedLandUse, setSelectedLandUse] = useState("");
  const [selectedLandStatus, setSelectedLandStatus] = useState("");
  const [selectedBuildingType, setSelectedBuildingType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [landLocation, setLandLocation] = useState("");
  
  const [totalAmount, setTotalAmount] = useState("");
  const [attestation, setAttestation] = useState(false);
  const [allocationDate, setAllocationDate] = useState("");
  const [timeLine, setTimeLine] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFile3, setSelectedFile3] = useState(null);
  const [selectedFile4, setSelectedFile4] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [allLands, setAllLands] = useState([]);
  const totalPages = 10; // Total number of pages


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


  const handleCloseSuccessModal = () => {
    setShowModalSuccess(false);
    navigate("/applications"); // Navigate after closing the modal
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

  


  const createLandInfomation = async () => {
    setCreateLoading(true);
    try {
      const formData = new FormData();
      if (selectedFile4 && selectedFile4.length > 0) {
        formData.append("survey_plan", selectedFile[0]);
      }

      formData.append("land_location", propertyAddress);
      formData.append("surveyor_name", surveyorName);
      formData.append("landuse_id", selectedLandUse);
      formData.append("survey_plan_number", surveyPlanNumber);
      formData.append("date_issued", selectedDate);
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
      setSurveyPlanNumber("");
      setSelectedDate("");
      setPropertyAddress("");
      setSurveyorName("");
      setSelectedFile("");
      setPropertyAddress("");
      setSurveyorName("");
      setSelectedLandUse("");
      setSurveyPlanNumber("");
      setSelectedDate("");
      fileName1("Survey Plan");
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
               <h4 className={classes.wlcm} style={{marginBottom: "25px"}}>Land Information Application</h4>
            <Form className={classes.formContainer}>
              <Col md={12}>
                <Container>
                  {/* <Form.Group controlId="landUse">
                                      <Form.Label className={classes.labelTxt}>
                                        Land Status
                                      </Form.Label>
                                      <Form.Select
                                        className={classes.optioncss}
                                        onChange={handleLandStatus}
                                      >
                                        <option value="">Select Land Status</option>
                                        {tableData32.map((item, index) => (
                                          <option key={index} value={item.id}>
                                            {item.name}
                                          </option>
                                        ))}
                                      </Form.Select>
                                    </Form.Group> */}
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="landLocation">
                        <Form.Label className={classes.labelTxt}>
                          Land Location
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className={classes.optioncss}
                          placeholder="Enter Land Address"
                          value={propertyAddress}
                          onChange={(e) => setPropertyAddress(e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group controlId="landLocation">
                        <Form.Label className={classes.labelTxt}>
                          Surveyor's Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className={classes.optioncss}
                          placeholder="Enter Survey Plan Coordinates"
                          value={surveyorName}
                          onChange={(e) => setSurveyorName(e.target.value)}
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
                          {allLands.map((item, index) => (
                            <option key={index} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group controlId="surveyPlanNumber">
                        <Form.Label className={classes.labelTxt}>
                          Survey Plan Number
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className={classes.optioncss}
                          placeholder="Enter Plan Number"
                          value={surveyPlanNumber}
                          onChange={(e) => setSurveyPlanNumber(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
              
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="landLocation">
                        <Form.Label className={classes.labelTxt}>
                          Date
                        </Form.Label>
                        <Form.Control
                          type="Date"
                          className={classes.optioncss}
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group controlId="surveyPlan">
                        <Form.Label className={classes.labelTxt}>
                          Survey Plan
                        </Form.Label>
                        <div
                          className={classes.fileUpload}
                          onClick={handleClick1}
                        >
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
                  {/* <Row className="mb-3">
                                      <Col md={12}>
                                        <Form.Group controlId="proposedTimeline">
                                          <Form.Label className={classes.labelTxt}>
                                            Land Size
                                          </Form.Label>
                                          <Form.Control
                                            type="text"
                                            className={classes.optioncss}
                                            placeholder="Enter Size in plot"
                                            value={sizePlot}
                                            onChange={e => setSizePlot(e.target.value)}
                                          />
                                        </Form.Group>
                                      </Col>
                                    </Row> */}
                  <Row className="mb-3">
                  
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
                    <Col md={{span:6,offset:3}} className="text-center">
                      <Button
                        className={classes.modBtnn}
                        variant="success"
                        onClick={createLandInfomation}
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
              </Col>
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

export default LandInformationApplication;
