import React, { useState, useEffect, useRef } from 'react';
import DashboardNav from '../../Components/Navigation.js/Navigation';
import Horheader from '../../Components/horheader/horheader';
import classes from './AllApplications.module.css';
import { Spinner, Badge, Modal, Form, Tabs, Tab, Placeholder, PlaceholderButton } from 'react-bootstrap';
import {
  Pagination,
  Accordion,
} from "react-bootstrap";
import PaidIcon from '../../Asset/PaidIc.png';
import MakePaymentIcon from '../../Asset/wallet.png';
import PendingPaymentIcon from '../../Asset/Pending.png';
import NotPaidPaymentIcon from '../../Asset/Notpaid.png';
import MoreIcon from '../../Asset/more.png';
import search from "../../Asset/search.svg";
import Calender from "../../Asset/calendar.svg";
import Printer from '../../Asset/printer.png';
import xport from "../../Asset/export.png";
import Chart from "../../Components/Chart";
import DownloadIcon from '../../Asset/download.png';
import TrackIcon from '../../Asset/track.png';
import ContactIcon from '../../Asset/support.png';
import Card from "../../Components/Card";
import ViewIcon from "../../Asset/eye.png";
import notransaction from '../../Asset/no-transaction-icon.svg';
import { Link, useNavigate } from 'react-router-dom';
import featured from '../../Asset/Featured icon.png';
import featuredtwo from '../../Asset/4.png';
import plus from '../../Asset/plus.png';
import PdfIcon from "../../Asset/pdf.svg";
import TotalIcon from '../../Asset/1.png';
import PendingIcon from '../../Asset/3.png';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Row, Col } from "react-bootstrap";
// import localforage from 'localforage';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../API/Api';
import Notification from '../../Components/Notification/Notification';
import { useTheme } from '../../ThemeContext';
import Alert from "react-bootstrap/Alert";

// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const AllApplications = () => {
  const [show, setShow] = useState(false);
  const [selectedFile3, setSelectedFile3] = useState("");
  const [showRatification, setShowRatification] = useState(false);
  const [showPermit, setShowPermit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShow(false);
  const [customer, setCustomer] = useState([]);
  const handleCloseModal = () => setShowModal(false);
  const handleShow = () => setShow(true);
  const [tableData1, setTableData1] = useState([]);
  const [bearer, setBearer] = useState('');
  const [roless, setRoless] = useState([]);
  const [totalCompleted, setTotalCompleted] = useState('');
  const [totalApplications, setTotalApplications] = useState('');
  const [totalPending, setTotalPending] = useState('');
  const [name, setName] = useState('');
  const [isFilled, setIsFilled] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [clockTime, setClockTime] = useState(false);
  const [personal, setPersonal] = useState({});
  const handleCloseRatification = () => setShowRatification(false);
  const handleClosePermit = () => setShow(false);
  const [show50, setShow50] = useState(false);
  const handleClockTime = () => {
    setClockTime(!clockTime);
  }
  const [foundInvoice, setFoundInvoice] = useState([]);
  const [foundInvoiceID, setFoundInvoiceID] = useState("");
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  const [benLoading, setBenLoading] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = tableData.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(tableData.length / entriesPerPage);
  const [visibleDropdown, setVisibleDropdown] = useState(null);
  const [showUploadTCC, setShowUploadTCC] = useState(false);
  const [applicationDocs, setApplicationDocs] = useState([]);
  const [payment, setPayment] = useState([]);
  const dropdownRef = useRef(null);

  const handleMoreClick = (id) => {
    setVisibleDropdown((prev) => (prev === id ? null : id));
  };

  const handleShowTCC = () => {
    setShowUploadTCC(true);
  };



  const readData = async () => {
    try {
      const detail = await localStorage.getItem('userName');
      const detail1 = await localStorage.getItem('firstName');
      const detail2 = await localStorage.getItem('secondName');
      const details = await localStorage.getItem('userToken');
      const detailss = await localStorage.getItem('isFilledState');


      if (detail !== null) {
        // const firstName = detail.split(' ')[0];
        setName(detail);

      }


      if (details !== null) {
        setBearer(details);
      }
      if (detail1 !== null) {
        setFirstName(detail1);
      }
      if (detail2 !== null) {
        setLastName(detail2);
      }

      if (detailss !== null) {
        setIsFilled(detailss);
      }

 
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };

  useEffect(() => {
    readData();
  }, []);

 

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${bearer}`,
  };



  const fetchDashboardData = async () => {
    setBenLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/applicant/applications`,
        { headers }
      );
      const results = response.data?.data;
      const resultx = response.data?.data?.completed_applications;
      const resultxx = response.data?.data?.pending_applications;
      const resultxxx = response.data?.data?.total_applications;
      console.log(response?.data?.data);
      setTableData(results);
      setTotalCompleted(resultx);
      setTotalPending(resultxx);
      setTotalApplications(resultxxx);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // navigate('/applications');
      } else {
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
            // toast.error(errorMessage)
            console.log(errorMessage);
          }
        }
        setTableData([]);
      }
    } finally {
      setBenLoading(false);
    }
  };

  useEffect(() => {
    if (bearer) {
      fetchDashboardData();
    }
  }, [bearer]);



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setVisibleDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const handleMoreClick = (rowId) => {
  //   setVisibleDropdown(visibleDropdown === rowId ? null : rowId);
  // };


  const handlePrevPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, totalPages));
  };


  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
    return formattedDate;
  }

  function padZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  const toSentenceCase = (name) => {
    if (!name) return '';

    // Check if the name is already in sentence case
    const isSentenceCase = name.split(' ').every(word =>
      word.charAt(0) === word.charAt(0).toUpperCase() &&
      word.slice(1) === word.slice(1).toLowerCase()
    );

    if (isSentenceCase) {
      return name;
    }

    // Convert to sentence case
    return name
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const fetchData1 = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/application_details`, {
        headers,
        params: { id },
      });
      const roleList = response.data?.data[0];
      const customer = response.data?.data[0]?.customer;
      const customerTyp = response.data?.data[0]?.customer?.user_type;
      const applicationdocs = response.data?.data[0]?.application_document;
      const payment = response.data?.data[0]?.payment;
      console.log(roleList, ".LLSKKS");
      setCustomer(customer)
    
   
    } catch (error) {
      if (error.response && error.response.status === 401) {
      } else {
        const errorStatus = error.response?.data?.message;
        console.log(errorStatus);
        setRoless([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fullName = `${toSentenceCase(firstName)} ${toSentenceCase(lastName)}`;
  const truncatedName = fullName.length > 17 
    ? fullName.split(" ").reduce((acc, word) => {
        return acc.length + word.length <= 17 ? acc + " " + word : acc;
      }, "").trim() + "..."
    : fullName;

    const handleEyeClick = async (id, appType) => {
      console.log(appType);
      const foundInvoice = tableData.find((item) => item.id === id);
      setFoundInvoiceID(id);
      setFoundInvoice(foundInvoice);
  
      await fetchData1(id);
  
      // setShow20(true);
      if (appType === "Land Allocation") {

      } 
      else if ( appType === "Planning Permit" ) {
        setShowRatification
      }
      else {
        // setShow20(true);
      }
    };

    const handleShow50 = () => {
      setShow50(true);
    };

    const openFileInModal = (fileUrl) => {
      if (fileUrl) {
        setSelectedFile3(fileUrl);
        setShowModal(true);
      } else {
        console.error("Invalid file URL");
        alert("File not available.");
      }
    };
    const handlePrintInvoice = (item) => {
      const foundUser = tableData1.find((items) => items.id === item.id);
      console.log(foundUser)
      if (item.description.includes("INVOICE FOR APPLICATION")) {
        navigate('/invoice_print', { state: { item,userData: foundUser } });
      }
      else if(item.description.includes("INVOICE FOR ASSESSMENT")) {
        navigate('/print_letter_of_assessment', { state: { item,userData: foundUser } });
      }
      // const selectedInvoice = tableData.find(items => items.id === item.id);
      // navigate('/accounting/customers_receiptssss', { state: { selectedInvoice } });
    };
  

  return (
    <>
         <Modal
              show={showRatification}
              onHide={handleCloseRatification}
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
                  Application Details
                </Modal.Title>
                <Button
                  variant="close"
                  onClick={handleCloseRatification}
                ></Button>
              </Modal.Header>
              <Modal.Body>
                <Accordion
                  defaultActiveKey="1"
                  style={{ paddingBottom: "30px" }}
                >
                  <Accordion.Item eventKey="1">
                    <Accordion.Header
                      style={{
                        maxWidth: "900px",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Application Details
                    </Accordion.Header>
                    <Accordion.Body>
                      {roless.status !== "1" && (
                        <div className={classes.divUpdate}>
                          {/* <button className={classes.updateBtn}>
                            Update Application
                          </button> */}
                        </div>
                      )}

                      <table className="table m-0 bg-white display table-bordered table-striped table-hover card-table">
                        <tbody style={{ whiteSpace: "nowrap" }}>
                          <tr>
                            <th style={{ width: "50%" }}>Application Number</th>
                            <td style={{ width: "50%" }}>
                              {roless.application_number}
                            </td>
                          </tr>
                          <tr>
                            <th> Area</th>
                            {/* {roless.status === "0" ? (
                              <td>
                                <Row>
                                  <Col md={12}>
                                    <Form.Group controlId="landUse">
                                      <Form.Select
                                        className={classes.optioncss}
                                        onChange={handleAreaChange}
                                        value={selectedArea}
                                      >
                                        <option value="">Select Area</option>
                                        {tableArea?.map((item, index) => (
                                          <option
                                            key={index}
                                            value={item.id}
                                            name={item.description}
                                          >
                                            {item.description}
                                          </option>
                                        ))}
                                      </Form.Select>
                                    </Form.Group>
                                  </Col>
                                </Row>
                              </td>
                            ) : (
                              <td>
                                {
                                  tableArea.find(
                                    (item) =>
                                      String(item.id) === String(roless.area)
                                  )?.description
                                }
                              </td>
                            )} */}
                            <td>{roless?.area?.description}</td>
                          </tr>
                          <tr>
                            <th> Location</th>
                            <td>{roless.location?.description}</td>
                          </tr>
                          <tr>
                            <th>Development Status of Land</th>
                            <td>{roless.land_development_status}</td>
                          </tr>
                          <tr>
                            <th>Land Use</th>
                            <td>{roless?.land_use?.name}</td>
                          </tr>
                          <tr>
                            <th>Proposed Residential Building</th>
                            <td>
                              {roless.proposed_residential_building === "1"
                                ? "Single-Family Home"
                                : roless.proposed_residential_building === "2"
                                ? "Multi-Family Home"
                                : roless.proposed_residential_building === "3"
                                ? "Townhouse"
                                : roless.proposed_residential_building === "4"
                                ? "Apartment"
                                : roless.proposed_residential_building === "5"
                                ? "Bungalow"
                                : roless.proposed_residential_building === "6"
                                ? "Villa"
                                : roless.proposed_residential_building === "7"
                                ? "Duplex"
                                : roless.proposed_residential_building === "8"
                                ? "Penthouse"
                                : roless.proposed_residential_building === "9"
                                ? "Studio Apartment"
                                : "Unknown"}
                            </td>
                          </tr>
                          <tr>
                          <th>Proposed Development Timeline</th>
                          <td>{roless.development_timeframe}</td>
                            </tr>
                            <tr>
                            <th>Size in Plot</th>
                            <td>{roless.size_in_plot}</td>
                            </tr>
                            <tr>
                            <th>Size in Sqm</th>
                            <td>{  roless.size_in_sqm}</td>
                            </tr>
                            <tr>
                                <th>Proposed Source of Fund</th>
                                <td>{ roless.proposed_source_of_fund}</td>
                              </tr>
                              <tr>
                              <th>Estimated Development Value</th>
                              <td>{roless.estimated_development_amount}</td>
                              </tr>
                              <tr>
                              <th>Document Value (If it's Govt. allocated land)</th>
                              <td>{roless?.document_value}</td>
                              </tr>
              
                          {/* <tr>
                            <th> Location</th>
                            {roless.status === "0" ? (
                              <td>
                                <Row>
                                  <Col md={12}>
                                    <Form.Group controlId="landUse">
                                      <Form.Select
                                        className={classes.optioncss}
                                        onChange={handleLocationChange}
                                        value={selectedLocation}
                                      >
                                        <option value="">
                                          Select Location
                                        </option>
                                        {tableData2?.map((item, index) => (
                                          <option
                                            key={index}
                                            value={item.id}
                                            name={item.description}
                                          >
                                            {item.description}
                                          </option>
                                        ))}
                                      </Form.Select>
                                    </Form.Group>
                                  </Col>
                                </Row>
                              </td>
                            ) : (
                              <td>
                                {
                                  tableData2.find(
                                    (item) =>
                                      String(item.id) ===
                                      String(roless.location)
                                  )?.description
                                }
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th> Land Allocation Date</th>
                            <td>
                              {roless.status === "0" ? (
                                <Row>
                                  <Col md={12}>
                                    <Form.Group controlId="landLocation">
                                      <Form.Control
                                        type="date"
                                        className={classes.optioncss}
                                        placeholder="Enter Allocation Date"
                                        value={allocationDate}
                                        onChange={(e) =>
                                          setAllocationDate(e.target.value)
                                        }
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                              ) : (
                                roless.allocation_date
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th>Development Status of Land</th>
                           
                            {roless.status === "0" ? (
                              <td>
                                <Row>
                                  <Col md={12}>
                                    <Form.Group controlId="developmentStatus">
                                      <Form.Select
                                        className={classes.optioncss}
                                        value={selectedDevelopment}
                                        onChange={handleDevStatus}
                                      >
                                        <option value="">
                                          Select Land Development Status
                                        </option>
                                        <option value="Fully Developed">
                                          Fully Developed
                                        </option>
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
                              </td>
                            ) : (
                              roless.land_development_status
                            )}
                          </tr>

                          <tr>
                            <th>Land Use</th>
                            {roless.status === "0" ? (
                              <td>
                                <Row>
                                  <Col md={12}>
                                    <Form.Group controlId="landUse">
                                      <Form.Select
                                        className={classes.optioncss}
                                        onChange={handleLandUse}
                                        value={selectedLandUse}
                                      >
                                        <option value="">
                                          Select Land Use Type
                                        </option>
                                        <option value="1">Residential</option>
                                        <option value="2">
                                          Industrial/Commercial/Agricultural
                                        </option>
                                        <option value="3">
                                          Civic/Religious/Charitable Programme
                                        </option>
                                      </Form.Select>
                                    </Form.Group>
                                  </Col>
                                </Row>
                              </td>
                            ) : (
                              <td>
                                {roless.land_development_status === "1"
                                  ? "Residential"
                                  : roless.land_development_status === "2"
                                    ? "Industrial/Commercial/Agricultural"
                                    : roless.land_development_status === "3"
                                      ? "Civic/Religious/Charitable Programme"
                                      : "Unknown"}
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th>Proposed Residential Building</th>
                            {roless.status === "0" ? (
                              <td>
                                <Row>
                                  <Col md={12}>
                                    <Form.Group controlId="propsedBuild">
                                      <Form.Select
                                        className={classes.optioncss}
                                        onChange={handleProposedBuild}
                                        value={proposedRBuilding}
                                      >
                                        <option value="">
                                          Select Building Type
                                        </option>
                                        <option value="1">
                                          Single-Family Home
                                        </option>
                                        <option value="2">
                                          Multi-Family Home
                                        </option>
                                        <option value="3">Townhouse</option>
                                        <option value="4">Apartment</option>
                                        <option value="5">Bungalow</option>
                                        <option value="6">Villa</option>
                                        <option value="7">Duplex</option>
                                        <option value="8">Penthouse</option>
                                        <option value="9">
                                          Studio Apartment
                                        </option>
                                      </Form.Select>
                                    </Form.Group>
                                  </Col>
                                </Row>
                              </td>
                            ) : (
                              <td>
                                {roless.proposed_residential_building === "1"
                                  ? "Single-Family Home"
                                  : roless.proposed_residential_building === "2"
                                    ? "Multi-Family Home"
                                    : roless.proposed_residential_building === "3"
                                      ? "Townhouse"
                                      : roless.proposed_residential_building === "4"
                                        ? "Apartment"
                                        : roless.proposed_residential_building === "5"
                                          ? "Bungalow"
                                          : roless.proposed_residential_building === "6"
                                            ? "Villa"
                                            : roless.proposed_residential_building === "7"
                                              ? "Duplex"
                                              : roless.proposed_residential_building === "8"
                                                ? "Penthouse"
                                                : roless.proposed_residential_building === "9"
                                                  ? "Studio Apartment"
                                                  : "Unknown"}
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th>Proposed Development Timeline</th>
                          
                            {roless.status === "0" ? (
                              <td>
                                <Row>
                                  <Col md={12}>
                                    <Form.Group controlId="landLocation">
                                      <Form.Control
                                        type="text"
                                        className={classes.optioncss}
                                        placeholder="Enter TimeLine"
                                        value={timeline}
                                        onChange={(e) =>
                                          setTimeLine(e.target.value)
                                        }
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                              </td>
                            ) : (
                              roless.land_development_status
                            )}
                          </tr>

                          <tr>
                            <th>Size in Plot</th>
                            <td>
                              {roless.status === "0" ? (
                                <Row>
                                  <Col md={12}>
                                    <Form.Group controlId="lengthpossession">
                                      <Form.Control
                                        type="text"
                                        className={classes.optioncss}
                                        placeholder="Enter plot size"
                                        value={plotSize}
                                        onChange={(e) =>
                                          setPlotSize(e.target.value)
                                        }
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                              ) : (
                                roless.size_in_plot
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th>Size in Sqm</th>

                            <td>
                              {roless.status === "0" ? (
                                <Row>
                                  <Col md={12}>
                                    <Form.Group controlId="lengthpossession">
                                      <Form.Control
                                        type="text"
                                        className={classes.optioncss}
                                        placeholder="Enter size in sqm"
                                        value={sqm}
                                        onChange={(e) => setSqm(e.target.value)}
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                              ) : (
                                roless.size_in_sqm
                              )}
                            </td>
                          </tr>

                          <tr>
                            <th>Proposed Source of Fund</th>
                            {roless.status === "0" ? (
                              <td>
                                <Row>
                                  <Col md={12}>
                                    <Form.Group controlId="landLocation">
                                      <Form.Control
                                        type="text"
                                        className={classes.optioncss}
                                        placeholder="Enter TimeLine"
                                        value={fund}
                                        onChange={(e) =>
                                          setFund(e.target.value)
                                        }
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                              </td>
                            ) : (
                              roless.proposed_source_of_fund
                            )}
                          </tr>
                          <tr>
                            <th>Estimated Development Value</th>
                            <td>
                              {roless.status === "0" ? (
                                <Row>
                                  <Col md={12}>
                                    <Form.Group controlId="developmentvalue">
                                      <Form.Control
                                        type="text"
                                        className={classes.optioncss}
                                        placeholder="Enter Development Value"
                                        value={developmentValue}
                                        onChange={(e) =>
                                          setDevelopmentValue(e.target.value)
                                        }
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                              ) : (
                                roless.estimated_development_amount
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th>
                              Document Value (If it's Govt. allocated land)
                            </th>
                            <td>
                              {roless.status === "0" ? (
                                <Row>
                                  <Col md={12}>
                                    <Form.Group controlId="developmentvalue">
                                      <Form.Control
                                        type="text"
                                        className={classes.optioncss}
                                        placeholder="Enter document value"
                                        value={documentValue}
                                        onChange={(e) =>
                                          setDocumentValue(e.target.value)
                                        }
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                              ) : (
                                roless.estimated_development_amount
                              )}
                            </td>
                          </tr> */}
                        </tbody>
                      </table>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="2">
                    <Accordion.Header
                      style={{
                        maxWidth: "900px",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Uploaded Documents
                    </Accordion.Header>
                    <Accordion.Body>
                      {roless.type === "1" && (
                        <>
                          <h5>Survey Plan</h5>
                          {roless.survey_plan ? (
                            <iframe
                              src={roless.survey_plan}
                              width="100%"
                              height="500px"
                              style={{ border: "none" }}
                              title="Survey Plan"
                            ></iframe>
                          ) : (
                            <p>No survey plan available.</p>
                          )}

                          <h5>Land Receipt</h5>
                          {roless.land_receipt ? (
                            <iframe
                              src={roless.land_receipt}
                              width="100%"
                              height="500px"
                              style={{ border: "none" }}
                              title="Land Receipt"
                            ></iframe>
                          ) : (
                            <p>No land receipt available.</p>
                          )}
                        </>
                      )}

                      {roless.type === "2" && (
                        <>
                          <h5>File</h5>
                          {roless.file ? (
                            <iframe
                              src={roless.file}
                              width="100%"
                              height="500px"
                              style={{ border: "none" }}
                              title="File"
                            ></iframe>
                          ) : (
                            <p>No file available.</p>
                          )}

                          <h5>Document</h5>
                          {roless.document ? (
                            <iframe
                              src={roless.document}
                              width="100%"
                              height="500px"
                              style={{ border: "none" }}
                              title="Document"
                            ></iframe>
                          ) : (
                            <p>No document available.</p>
                          )}
                        </>
                      )}

                      {roless.type === "3" && (
                        <>
                          <h5>C of O Document</h5>
                          {roless.cofo_document ? (
                            <iframe
                              src={roless.cofo_document}
                              width="100%"
                              height="500px"
                              style={{ border: "none" }}
                              title="C of O Document"
                            ></iframe>
                          ) : (
                            <p>No C of O document available.</p>
                          )}
                        </>
                      )}

                      {roless.type === "4" && (
                        <>
                          <h5>Evidence of Ownership</h5>
                          {roless.evidence_of_ownership ? (
                            <iframe
                              src={roless.evidence_of_ownership}
                              width="100%"
                              height="500px"
                              style={{ border: "none" }}
                              title="Evidence of Ownership"
                            ></iframe>
                          ) : (
                            <p>No evidence of ownership available.</p>
                          )}

                          <h5>Building Plan</h5>
                          {roless.building_plan ? (
                            <iframe
                              src={roless.building_plan}
                              width="100%"
                              height="500px"
                              style={{ border: "none" }}
                              title="Building Plan"
                            ></iframe>
                          ) : (
                            <p>No building plan available.</p>
                          )}
                        </>
                      )}

                      {roless.type === "5" && (
                        <>
                          <h5>Evidence of Title</h5>
                          {roless.evidence_of_title ? (
                            <iframe
                              src={roless.evidence_of_title}
                              width="100%"
                              height="500px"
                              style={{ border: "none" }}
                              title="Evidence of Title"
                            ></iframe>
                          ) : (
                            <p>No evidence of title available.</p>
                          )}

                          <h5>Site Plan</h5>
                          {roless.site_plan ? (
                            <iframe
                              src={roless.site_plan}
                              width="100%"
                              height="500px"
                              style={{ border: "none" }}
                              title="Site Plan"
                            ></iframe>
                          ) : (
                            <p>No site plan available.</p>
                          )}
                        </>
                      )}

                      <h5>Other Supporting Documents</h5>
                      {roless.document ? (
                        <iframe
                          src={roless.document}
                          width="100%"
                          height="500px"
                          style={{ border: "none" }}
                          title="Land Receipt"
                        ></iframe>
                      ) : (
                        <p>No other documents available.</p>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header
                      style={{
                        maxWidth: "900px",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      GIS Details
                    </Accordion.Header>
                    <Accordion.Body>No data</Accordion.Body>
                  </Accordion.Item>

                  <div className={classes.formIntBtn}>
                    {/* {shouldShowAlert && !showAlert && ( */}
                    <Alert variant="warning" className="w-100">
                      <Alert.Heading>Requirement Checklist</Alert.Heading>
                      {/* <p>
                          The application is missing the following required
                          fields:
                        </p> */}
                      <ul style={{ listStyleType: "none", padding: 0 }}>
                        <li style={{ color: customer.tin ? "green" : "red" }}>
                          {customer.tin ? "✔" : "❌"} STIN (State Tax
                          Identification Number)
                        </li>
                        {customer.user_type === "corporate" && (
                          <li style={{ color: customer.cac ? "green" : "red" }}>
                            {customer.cac ? "✔" : "❌"} CAC
                          </li>
                        )}
                        {customer.user_type === "individual" && (
                          <li style={{ color: customer.nin ? "green" : "red" }}>
                            {customer.nin ? "✔" : "❌"} NIN (National
                            Identification Number)
                          </li>
                        )}
                        <li style={{ color: customer.tcc ? "green" : "red" }}>
                          {customer.tcc ? "✔" : "❌"} Tax Clearance Certificate
                          {customer.ogun_resident === "No" && !customer.tcc && (
                            <span
                              className={classes.tccStyle}
                              onClick={handleShowTCC}
                            >
                              Click here to upload TCC
                            </span>
                          )}
                        </li>
                      </ul>
                    </Alert>
                    {/* / )} */}
                  </div>
                  <Tabs
                    defaultActiveKey="invoicesandreceipts"
                    id="uncontrolled-tab-example"
                    className="mb-3 confirm-tabs "
                    variant="underline"
                    color="white"
                    style={{ marginTop: "15px", textDecoration: "none" }}
                  >
                    <Tab
                      eventKey="invoicesandreceipts"
                      title="Invoices and Receipts"
                    >
                      <div className="w-100" style={{ margin: "20px 0 0 0" }}>
                        <div className={classes.formIntBtn12}>
                          <h5>Invoices & Receipts</h5>
                        </div>
                        <table className="table m-0 bg-white display table-bordered table-striped table-hover card-table">
                          <thead style={{ whiteSpace: "nowrap" }}>
                            <tr>
                              <th>S/N</th>
                              <th>Description</th>
                              <th>Transaction Date</th>
                              <th>Payment Code</th>
                              <th>Status</th>
                              <th>Amount</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody style={{ whiteSpace: "nowrap" }}>
                            {payment.map((item, index) => {
                              return (<tr key={index}>
                                <td>{index + 1}</td>
                                <td style={{ whiteSpace: "wrap" }}>
                                  {item.description}
                                </td>
                                <td>
                                  {new Date(item.created_at).toLocaleString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "2-digit",
                                      day: "2-digit",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    }
                                  )}
                                </td>
                                <td>{item.payment_code}</td>
                                <td
                                  style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  {item.status === "1" ? (
                                    <div
                                      style={{
                                        height: 15,
                                        width: 70,
                                        border: "1px solid #50b848",
                                        borderRadius: 3,
                                        color: "#50b848",
                                        fontSize: 10,
                                        textAlign: "center",
                                        fontWeight: 700,
                                      }}
                                    >
                                      PAID
                                    </div>
                                  ) : (
                                    <div
                                      style={{
                                        height: 15,
                                        width: 70,
                                        border: "1px solid #ff5400",
                                        borderRadius: 3,
                                        color: "#ff5400",
                                        fontSize: 10,
                                        textAlign: "center",
                                        fontWeight: 700,
                                      }}
                                    >
                                      UNPAID
                                    </div>
                                  )}
                                </td>
                                <td>
                                  {parseFloat(item.amount).toLocaleString(
                                    "en-US",
                                    {
                                      minimumIntegerDigits: 1,
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }
                                  )}
                                </td>
                                <td>
                                <div onClick={() => handlePrintInvoice(item)} className="btn btn-sm printbtninv">
                                <i className="fa fa-print dawg" style={{ color: "#17a2b8", backgroundColor: "#afe1e9", padding: 2, borderColor: "#b0d1d6", borderRadius: 5, fontSize: 12 }}></i>
                              </div>
                                </td>
                              </tr>)
                            })}
                          </tbody>
                        </table>
                      </div>
                    </Tab>
                    <Tab eventKey="documents" title="Documents">
                      <div className="w-100" style={{ margin: "20px 0 0 0" }}>
                        <div className={classes.formIntBtn12}>
                          <h5>Uploaded Document</h5>
                          <Button
                            variant="success"
                            className={classes.btn1}
                            onClick={handleShow50}
                          >
                            Add New Document
                          </Button>
                        </div>
                        {applicationDocs.length > 0 && (
                          <Container>
                            {applicationDocs
                              .reduce((rows, item, index) => {
                                if (index % 2 === 0) {
                                  rows.push([]);
                                }
                                rows[rows.length - 1].push(item);
                                return rows;
                              }, [])
                              .map((row, rowIndex) => (
                                <Row key={rowIndex} className="mb-3">
                                  {row.map((item, index) => (
                                    <Col key={index} lg={6}>
                                      <p>{item.description}</p>
                                      <div className={classes.pdfTablem}>
                                        <div className={classes.pdfTableL}>
                                          <img
                                            src={PdfIcon}
                                            alt="icon"
                                            className={classes.pdfIcon}
                                          />
                                          <span>
                                            {item.document_path
                                              ? item.document_path
                                                  .split("/")
                                                  .pop().length > 30
                                                ? item.document_path
                                                    .split("/")
                                                    .pop()
                                                    .substring(0, 30) + "..."
                                                : item.document_path
                                                    .split("/")
                                                    .pop()
                                              : "No File"}
                                          </span>
                                        </div>
                                        <div
                                          className={classes.pdfTableR}
                                          onClick={() =>
                                            openFileInModal(item.document_path)
                                          }
                                          style={{ cursor: "pointer" }}
                                        >
                                          <p>
                                            {" "}
                                            View{" "}
                                            <span>
                                              <img
                                                src={DownloadIcon}
                                                alt="Download icon"
                                                className={classes.downloadIcon}
                                              />
                                            </span>
                                          </p>
                                        </div>
                                      </div>
                                    </Col>
                                  ))}
                                </Row>
                              ))}
                          </Container>
                        )}
                      </div>
                    </Tab>
                  </Tabs>
                </Accordion>
              </Modal.Body>
            </Modal>
      <div className={classes.appcontainer}>
        <div className={classes.sidenav}>
          <Navbar expand="lg" className={`d-none d-md-block ${classes.navbar}`}>
            <Container fluid>
            </Container>
          </Navbar>
          <Navbar bg="light" expand={false} className={`d-md-none ${classes.bglight}`}>
            <Container fluid>
              <Button classes={{ backgroundColor: "#21B55A", border: "none" }} variant="success" onClick={handleShow}>
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
              <div className={classes.wlcmcont}>
                <p classes={{ color: isDarkMode ? "white" : "#000" }} className={classes.wlcm}>Applications</p>
               
              </div>
              <button onClick={() => setShowModal(true)} className={classes.btnadd}><img src={plus} className={classes.plusiconstyl} />
                <span> Make New Application</span>
              </button>
            </div>

            <Modal
              show={showModal}
              onHide={handleCloseModal}
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
                  Services Offered by MPPUD
                </Modal.Title>
                <Button variant="close" onClick={handleCloseModal}></Button>
              </Modal.Header>
              <Modal.Body>
                <div className={classes.crdCont}>
                 <div
                                     
                                      className={classes.card}
                                    >
                                      
                                        <div>
                                          <h3
                                            className={classes.cardTitle}
                                            style={{ wordWrap: "break-word" }}
                                          >
                                            Building Permit Application
                                          </h3>
                                        </div>
                                   
                                      <p
                                        className={classes.textPrg}
                                        style={{ wordWrap: "break-word" }}
                                      >
                                        Click the Apply Button to start your application
                                      </p>
                                      <div className={classes.bottomBtn}>
                                        <Button
                                          onClick={() =>
                                            navigate('/applications_building_permit')
                                          }
                                          variant="success"
                                          className={classes.appBtn}
                                        >
                                          Apply
                                        </Button>
                                      </div>
                                    </div>
                                    </div>
              </Modal.Body>
            </Modal>


            <div className={classes.allcards}>
              <div className={classes.card_rd}>
                <div className={classes.card1}>
                  {" "}
                  <Card title="Overall Amount Requested" amount={'00,000,000'} />
                  <Card title="Total Amount Approved" amount={'00,000,000'} />
                </div>
                <div className={classes.card2}>
                  {" "}
                  <Card title="Total Amount Utilized" amount={'00,000,000'} />
                </div>
              </div>
              {/* <div className={classes.chartSection}>
                <Chart />
              </div> */}

            </div>


            {/* Table container starts here */}

            <div className={isDarkMode ? classes.applicationHistory1 : classes.applicationHistory}>
              <div className={classes.hortrstns}>
              <h1 className={classes.recenttrsd}>My Applications</h1>
              <div className={classes.midDiv}>
                <div className={classes.divSearch}>
                  <img src={search} alt="search" className={classes.searchIcon} />
                  <input
                    type="text"
                    placeholder="Search"
                    className={classes.search}
                  />
                </div>
                <Form.Select
                  id='status'
                  style={{
                    width: 100,
                    height: 40,
                    borderRadius: 8,
                    fontSize: 12,
                    border: '1px solid #E0E0E0',
                    fontWeight: 400,
                    color: '#4F4F4F',
                    padding: '0.5rem',
                    // backgroundColor: '#F2F2F2',
                    // border: 0
                  }}
                  name="DataTables_Table_0_length"
                  aria-controls="DataTables_Table_0"
                  className="custom-select custom-select-sm form-control form-control-sm"
                >
                  <option value="All">Status</option>
                  <option value="All">Status</option>
                  <option value="All">Status</option>
                  <option value="All">Status</option>
                </Form.Select>



                <button className={classes.bttens}>
                  Pick date <img src={Calender} className={classes.imgss} alt="calender icon" />
                </button>

                <label
                  style={{
                    fontSize: 14,
                    color: " #828282",
                    fontWeight: 600,
                    gap: 10,
                    borderRadius: 8,
                    // backgroundColor: '#F2F2F2',
                    marginLeft: 10
                  }}

                >

                  <div className={classes.divBtn}>
                    <div className={classes.divOne}>
                      <div className={classes.stIC}>
                        <p className={classes.stN}>Export</p>
                        <img src={xport} alt="status" className={classes.filter} />
                      </div>
                    </div>
                  </div>


                </label>

              </div>
            </div>

              <div className={classes.mainTables}>
                {benLoading ? (
                  <>
                    <Placeholder xs={6} />
                    <Placeholder className="w-75" /> <Placeholder classes={{ width: '25%' }} />
                  </>
                  
                ) : currentEntries.length === 0 ? (
                  <div className={classes.notFound}>
                    <img src={notransaction} alt="not-found" />
                    <p>No Applications found</p>
                  </div> 
                 ) : ( 
                  <div >
                    <table classes={{ width: "98%" }}>

                      <thead classes={{ whiteSpace: 'nowrap' }}>
                        <tr>
                          <th classes={{ color: isDarkMode && "white" }}>S/N</th>
                          <th classes={{ color: isDarkMode && "white" }}>Application Number</th>
                          <th classes={{ color: isDarkMode && "white" }}>Application Type</th>
                          <th classes={{ color: isDarkMode && "white" }}>Submission Date</th>
                          <th classes={{ color: isDarkMode && "white" }}>Application Status</th>
                          <th classes={{ color: isDarkMode && "white" }}>Payment Status</th>
                          <th classes={{ color: isDarkMode && "white" }}>Approval Required by</th>
                          {/* <th classes={{ color: isDarkMode && "white" }}>Amount</th> */}
                          <th></th>
                        </tr>
                      </thead>

                      <tbody style={{ whiteSpace: "wrap" }}>
                    {currentEntries.map((rowId, index) => (
                      <tr key={rowId} style={{
                        backgroundColor: index % 2 !== 0 ? "rgba(30, 165, 82, 0.1)" : "transparent",
                      }}>
                        <td style={{ padding: 10 }}>{index + 1}</td>
                        <td style={{ padding: 10 }}>{rowId.uuid}</td>
                        <td style={{ padding: 10 }}>{rowId.apptype?.description}</td>
                        <td style={{ padding: 10 }}>{formatDate(rowId.updated_at)}</td>
                        <td style={{ padding: 10 }}>{rowId.approval_status === 0 ? "Ongoing" : "Completed"}</td>
                        <td style={{ padding: 10 }}>{rowId.payment_status === "0" ? "Unpaid" : "Paid"}</td>
                        <td style={{ padding: 10 }}>{rowId.payment_status === "0"
                                    ? "Awaiting your Payment"
                                    : rowId.payment_status === "1" &&
                                      rowId.approval_status === "0"
                                    ? rowId.role?.name
                                    : rowId.payment_status === "1" &&
                                    rowId.approval_status === "1"
                                  ? "Approved"
                                    : null}</td>
                        {/* <td style={{ padding: 10 }}>₦528,861.00</td> */}
                        <td style={{ padding: 10 }} className={classes.moreTxt}>
                          <div style={{ position: "relative" }} className={classes.menuWeb}>
                            <img
                              className={classes.moreIcon}
                              src={MoreIcon}
                              alt="more"
                              onClick={() => handleMoreClick(rowId)}
                              style={{ cursor: "pointer" }}
                            />
                            {visibleDropdown === rowId && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "100%",
                                  right: 0,
                                  backgroundColor: "white",
                                  zIndex: 9999,
                                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                                  borderRadius: "4px",
                                }}
                              >
                                <div
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                padding: "5px 10px",
                                                cursor: "pointer",
                                                textAlign: "left",
                                                whiteSpace: "nowrap"
                                              }}
                                              
                                            >
                                              <img
                                                src={Printer}
                                                alt="invoice"
                                                style={{
                                                  width: "20px",
                                                  marginRight: "10px",
                                                }}
                                              />
                                              Print Receipt
                                            </div>
                                            <div
      onClick={() => {
        handleEyeClick(rowId.id, rowId?.apptype?.description);
        handleMoreClick(null);
      }}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "5px 10px",
        cursor: "pointer",
         textAlign: "left",
         whiteSpace: "nowrap"
      }}
    >
      <img
        src={ViewIcon}
        alt="view application"
        style={{
          width: "20px",
          marginRight: "10px",
        }}
      />
      View Application
    </div>

                              </div>
                            )}
                          </div>
                        </td>
                      
                      </tr>
                    ))}
                  </tbody>
                    </table>
                  </div>
                 )} 
              </div>

              <div className={classes.mobileView}>
                <div className={classes.mainTable}>
                  {benLoading ? (
                    <p>Loading data, Please wait...</p>
                  ) : (
                    <div
                      className={classes.tableCon}
                      classes={{
                        overflowX: "auto", // Horizontal scroll for table
                        whiteSpace: "nowrap", // Prevent table from wrapping
                        maxWidth: "100%", // Limit container width to screen size

                      }}
                    >
                      <table
                        className="table display table-hover m-0 card-table"
                        classes={{
                          minWidth: "600px", // Minimum table width to ensure visibility
                        }}
                      >
                        <thead>
                          <tr>
                          <th classes={{ color: isDarkMode && "white" }}>S/N</th>
                          <th classes={{ color: isDarkMode && "white" }}>Application Number</th>
                          <th classes={{ color: isDarkMode && "white" }}>Application Type</th>
                          <th classes={{ color: isDarkMode && "white" }}>Submission Date</th>
                          <th classes={{ color: isDarkMode && "white" }}>Status</th>
                          <th classes={{ color: isDarkMode && "white" }}>Approval Required by</th>
                          <th classes={{ color: isDarkMode && "white" }}>Amount</th>
                          <th></th>
                          </tr>
                        </thead>
                        <tbody style={{ whiteSpace: "wrap" }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((rowId, index) => (
                      <tr key={rowId} style={{
                        backgroundColor: index % 2 !== 0 ? "rgba(30, 165, 82, 0.1)" : "transparent",
                      }}>
                        <td style={{ padding: 10 }}>{rowId}</td>
                        <td style={{ padding: 10 }}>ACME MEDICARE CLINICS LTD</td>
                        <td style={{ padding: 10 }}>January 2025 Monthly PAYE Returns</td>
                        <td style={{ padding: 10 }}>₦528,861.00</td>
                        <td style={{ padding: 10 }}>₦528,861.00</td>
                        <td style={{ padding: 10 }}>0003000178320</td>
                        <td style={{ padding: 10 }}>
                          {/* <img
                                className={classes.statusIconsuccess}
                                src={succesful}
                                alt="status"
                            /> */}
                          <td style={{ padding: 10 }} className={classes.info1}>
                            <p
                              className={`${classes["status-success"]} ${classes.info}`}
                            >
                              Approved
                            </p>
                          </td>
                        </td>

                        <td style={{ padding: 10 }} className={classes.moreTxt}>
                          <div style={{ position: "relative" }} className={classes.menuWeb}>
                            <img
                              className={classes.moreIcon}
                              src={MoreIcon}
                              alt="more"
                              onClick={() => handleMoreClick(rowId)}
                              style={{ cursor: "pointer" }}
                            />
                            {visibleDropdown === rowId && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "100%",
                                  right: 0,
                                  backgroundColor: "white",
                                  zIndex: 9999,
                                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                                  borderRadius: "4px",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "5px 10px",
                                    cursor: "pointer",
                                  }}
                                >
                                  <img
                                    src={Printer} // Replace with your actual path
                                    alt="contact"
                                    style={{ width: "20px", marginRight: "10px" }}
                                  />
                                  Print Receipt
                                </div>

                              </div>
                            )}
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
              {!benLoading && (
                <div className={classes.endded}>
                  <div className={classes.showTxt}>
                    <div className={classes.show}>
                      <label classes={{
                        fontSize: 14,
                        color: isDarkMode ? '#ffffff' : '#333333',
                        fontWeight: 600,
                        gap: 10
                      }} className="d-flex justify-content-start align-items-center">
                        Showing
                        <Form.Select classes={{ width: 114, height: 44, borderRadius: 8, fontSize: 14, fontWeight: 600 }} name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" className="custom-select custom-select-sm form-control form-control-sm"
                          value={entriesPerPage}
                          onChange={(e) => {
                            setEntriesPerPage(parseInt(e.target.value));
                            setCurrentPage(1);
                          }}
                        >
                          <option value={10} >10 entries</option>
                          <option value={25} >25 entries</option>
                          <option value={50} >50 entries</option>
                          <option value={100} >100 entries</option>
                        </Form.Select>
                      </label>
                    </div>
                  </div>

                  <div className={classes.btmPagination}>
                    <div classes={{ display: 'flex' }}>
                      <button
                        classes={{ textAlign: "center", border: '1px solid #F1F1F1', backgroundColor: '#fff', borderRadius: 8, height: '32px', width: '32px', fontWeight: 700, fontSize: 14, color: '#000000', cursor: "pointer" }}
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                      >
                        {"<"}
                      </button>
                      {[...Array(totalPages)].map((_, page) => {
                        // Show only 5 pages or less if available
                        if (page < 3 || page === currentPage - 1 || page === totalPages - 1) {
                          return (
                            <button
                              key={page + 1}
                              classes={{
                                textAlign: "center",
                                marginLeft: '0.4rem',
                                marginRight: '0.4rem',
                                fontSize: '14px',
                                fontWeight: 700,
                                color: page + 1 === currentPage ? '#ffffff' : '#333333',
                                backgroundColor: page + 1 === currentPage ? '#21B55A' : '#fff',
                                height: '32px',
                                borderRadius: '8px',
                                //   padding: '0.5rem',
                                border: '1px solid #F1F1F1',
                                width: '32px',
                                cursor: "pointer"
                              }}
                              onClick={() => setCurrentPage(page + 1)}
                            >
                              {page + 1}
                            </button>
                          );
                        }
                        return null;
                      })}
                      <button
                        classes={{ textAlign: "center", border: '1px solid #F1F1F1', backgroundColor: '#fff', borderRadius: 8, height: '32px', width: '32px', fontWeight: 700, fontSize: 14, color: '#000000', cursor: "pointer" }}
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                      >
                        {">"}
                      </button>
                    </div>
                  </div>

                </div>
              )}
              {/* <div className={classes.notFound}>
                <img src={notransaction} alt="not-found" />
                <p>No Applications found</p>
                </div> */}
            </div>
 {/* transaction details table  starts here*/}


            {/* Table container ends here */}
          </div>
        </div>
      </div>
    </>
  );
}

export default AllApplications;