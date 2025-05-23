import React, { useState, useEffect, useRef } from 'react';
import DashboardNav from '../../Components/Navigation.js/Navigation';
import Horheader from '../../Components/horheader/horheader';
import classes from './AllApplications.module.css';
import { Spinner, Badge, Modal, Form, Tabs, Tab, Placeholder, PlaceholderButton } from 'react-bootstrap';
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
import TotalIcon from '../../Asset/1.png';
import PendingIcon from '../../Asset/3.png';
import { Navbar, Container, Button } from 'react-bootstrap';
// import localforage from 'localforage';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../API/Api';
import Notification from '../../Components/Notification/Notification';
import { useTheme } from '../../ThemeContext';

// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const AllApplications = () => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShow = () => setShow(true);
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
  const dropdownRef = useRef(null);

  const handleMoreClick = (id) => {
    setVisibleDropdown((prev) => (prev === id ? null : id));
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
        // console.log(roless);
        // setShowAllocation(true);
      // } else if (appType === "Confirmation") {
      //   console.log(roless);
      //   setShowConfirmation(true);
      // } else if (appType === "Land Ratification") {
      //   setShowRatification(true);
      // } else if (appType === "Certificate of Occupancy") {
      //   setShowCFO(true);
      // } else if (appType === "Land Search") {
      //   setShowLand(true);
      // } else if (appType === "Land Information") {
      //   setShowInfo(true);
      // } else if (appType === "Governor's Consent") {
      //   setShowGovernor(true);
      // } else if (appType === "Scheme Allocation") {
      //   setShowScheme(true);
      } else {
        // setShow20(true);
      }
    };


  return (
    <>
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