import React, { useState, useEffect, useRef } from 'react';
import DashboardNav from '../../Components/Navigation.js/Navigation';
import Horheader from '../../Components/horheader/horheader';
import classes from './Dashboard.module.css';
import { Spinner, Badge, Modal, Form, Tabs, Tab, Placeholder, PlaceholderButton } from 'react-bootstrap';
import PaidIcon from '../../Asset/PaidIc.png';
import MakePaymentIcon from '../../Asset/wallet.png';
import PendingPaymentIcon from '../../Asset/Pending.png';
import NotPaidPaymentIcon from '../../Asset/Notpaid.png';
import MoreIcon from '../../Asset/more.png';
import DownloadIcon from '../../Asset/download.png';
import TrackIcon from '../../Asset/track.png';
import ContactIcon from '../../Asset/support.png';
import Card from "../../Components/Card";
import Chart from "../../Components/Chart";
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

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [bearer, setBearer] = useState('');
  const [totalCompleted, setTotalCompleted] = useState('');
  const [totalApplications, setTotalApplications] = useState('');
  const [totalAmountPaid, setTotalAmountPaid] = useState('');
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
        `${BASE_URL}/customer/dashboard`,
        { headers }
      );
      const results = response.data?.data?.applications;
      // const resultx = response.data?.data?.completed_applications;
      const resultxx = response.data?.data?.pending_applications;
      const resultxxx = response.data?.data?.total_applications;
      const totalPaid = results.reduce((sum, item) => sum + Number(item.amount || 0), 0);
      console.log(response?.data?.data);
      setTotalAmountPaid(totalPaid);
      setTableData(results);
      // setTotalCompleted(resultx);
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

  const fullName = `${toSentenceCase(firstName)} ${toSentenceCase(lastName)}`;
  const truncatedName = fullName.length > 17 
    ? fullName.split(" ").reduce((acc, word) => {
        return acc.length + word.length <= 17 ? acc + " " + word : acc;
      }, "").trim() + "..."
    : fullName;


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
                <p classes={{ color: isDarkMode ? "white" : "#000" }} className={classes.wlcm}>Welcome, {truncatedName}👋 <span style={{ fontSize: 15 }}><Badge style={{ borderRadius: 88, border: isFilled === "2" ? "none" : "1px solid #EB5757", color: isFilled === "2" ? "#fff" : "#EB5757" }} bg={isFilled === "2" ? "success" : "light"}>{isFilled === "2" ? "Verified" : "Not Verified"}</Badge></span></p>
                <p
                  className={isFilled === "2" ? classes.wlcmintro : ""}
                  style={(isFilled === "0" || isFilled === "1") ? {
                    background: "linear-gradient(to bottom, #21B55A, #0C5C2B)",
                    color: "#fff",
                    textAlign: "center",
                    padding: "10px",
                    // borderRadius: "5px",
                    fontWeight: 700,
                    cursor: "pointer",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  } : {}}
                  onClick={isFilled === "0" ? () => navigate("/complete_your_registration") : isFilled === "1" ? () => navigate("/finish_onboarding_process") : undefined}
                >
                  {isFilled === "2" ?
                    "Here’s a summary of the current activity on your account." :
                    <>
                    ⚠️ Application incomplete. 👉 Tap to complete!
                  </>
                  }
                </p>
              </div>
              <button className={classes.btnadd}><img src={plus} className={classes.plusiconstyl} />
                <span> Make New Request</span>
              </button>
            </div>




            <div className={classes.allcards}>
              {/* <div className={classes.card_rd}>
                <div className={classes.card1}>
                  {" "}
                  <Card title="Total Amount Paid" amount={'00,000,000'} />
                  <Card title="Total Applications" amount={'00,000,000'} />
                </div>
                <div className={classes.card2}>
                  {" "}
                  <Card title="Total Pending Applications" amount={'00,000,000'} />
                </div>
              </div> */}

              <div className={classes.onekad}>
                <div className={classes.onekadfrstp}>
                  {/* <img src={featured} className={classes.featuredicon} /> */}
                  <p className={classes.walltp}>Total Amount Paid</p>
                  <p className={classes.walltpm}>

                    {benLoading ? (
                      <Placeholder animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    ) : (
                      `₦${parseFloat(totalAmountPaid).toLocaleString('en-US', {
                        minimumIntegerDigits: 1,
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    )}

                  </p>
                </div>

              </div>

              <div className={isDarkMode ? classes.twokad1 : classes.twokad}>
                <div className={classes.twokadfrstp}>
                  {/* <img src={TotalIcon} className={classes.featuredicon2} /> */}
                  <p className={isDarkMode ? classes.walltp22 : classes.walltp2}>Total Applications</p>
                  <p className={`${isDarkMode ? classes.walltpmblkk : classes.walltpmblk} ${classes.walltpmblka}`}>
                    {benLoading ? (
                      <Placeholder animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    ) : (
                      totalApplications
                    )}
                  </p>
                </div>
              </div>

              <div className={isDarkMode ? classes.twokad1 : classes.twokad}>
                <div className={classes.twokadfrstp}>
                  {/* <img src={PendingIcon} className={classes.featuredicon2} /> */}
                  <p className={isDarkMode ? classes.walltp22 : classes.walltp2}>Total Pending Applications</p>
                  <p className={isDarkMode ? classes.walltpmblkk : classes.walltpmblk}>{benLoading ? (
                    <Placeholder animation="glow">
                      <Placeholder xs={12} />
                    </Placeholder>
                  ) : (
                    totalPending
                  )}</p>
                </div>
              </div>




            </div>
            <div className={classes.chartSection}>
              <Chart />
            </div>

            {/* Table container starts here */}

            <div className={isDarkMode ? classes.applicationHistory1 : classes.applicationHistory}>
              <h1>Recent Transactions</h1>
              <div className={classes.mainTables}>
                {benLoading ? (
                  <>
                    <Placeholder xs={6} />
                    <Placeholder className="w-75" /> <Placeholder classes={{ width: '25%' }} />
                  </>
                  // <p>Loading data, Please wait...</p>
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
                          <th classes={{ color: isDarkMode && "white" }}>Application Type</th>
                          <th classes={{ color: isDarkMode && "white" }}>Payment Code</th>
                          <th classes={{ color: isDarkMode && "white" }}>Date</th>
                          <th classes={{ color: isDarkMode && "white" }}>Amount</th>
                          <th classes={{ color: isDarkMode && "white" }}>Status</th>
                          <th></th>
                        </tr>
                      </thead>

                      <tbody classes={{ whiteSpace: "nowrap" }}>
                        {currentEntries.map((rowId) => (
                          <tr key={rowId}>
                            <td classes={{ padding: 10, width: 100 }}>{rowId?.service?.name}</td>
                            <td classes={{ padding: 10, fontWeight: 500, color: isDarkMode ? "#21B55A" : "#0E4F27", }}>{rowId.payment[0]?.payment_code}</td>
                            <td classes={{ padding: 10 }}>{formatDate(rowId.created_at)}</td>
                            <td classes={{ padding: 10, color: isDarkMode ? "#ffffff" : "#333333", fontWeight: 500 }}>₦{parseFloat(rowId.amount).toLocaleString('en-US', {
                              minimumIntegerDigits: 1,
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}</td>
                            <td classes={{ padding: 10 }}>
                              <img
                                className={classes.statusIcon}
                                src={rowId.payment_status === "0" ? NotPaidPaymentIcon : PaidIcon}
                                alt="status"
                              />
                            </td>
                            <td classes={{ padding: 10 }} className={classes.moreTxt}>
                              <div classes={{ position: "relative" }}>
                                <img
                                  className={classes.moreIcon}
                                  src={MoreIcon}
                                  alt="more"
                                  onClick={() => handleMoreClick(rowId)}
                                  classes={{ cursor: "pointer" }}
                                />
                                {visibleDropdown === rowId && (
                                  <div
                                    ref={dropdownRef} // Attach ref to the dropdown
                                    classes={{
                                      position: "absolute",
                                      top: "100%",
                                      right: 0,
                                      backgroundColor: "white",
                                      zIndex: 9999,
                                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    {rowId.payment_status === "0" ? (
                                      <div
                                        classes={{
                                          display: "flex",
                                          alignItems: "center",
                                          padding: "5px 10px",
                                          cursor: "pointer",
                                        }}
                                      >
                                        <a
                                          href={rowId.payment[0]?.payment_url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          classes={{
                                            textDecoration: "none",
                                            color: "#101828",
                                            padding: 0,
                                          }}
                                        >

                                          Make Payment
                                        </a>
                                      </div>
                                    ) : (
                                      <div
                                        classes={{
                                          display: "flex",
                                          alignItems: "center",
                                          padding: "5px 10px",
                                          cursor: "pointer",
                                        }}
                                      >
                                        Track Application
                                      </div>
                                    )}
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
                            <th >Application Type</th>
                            <th >Payment Code</th>
                            <th >Date</th>
                            <th >Amount</th>
                            <th >Status</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentEntries.map((rowId) => (
                            <tr key={rowId}>
                              <td classes={{ padding: 10, width: 100 }}>{rowId.service.name}</td>
                              <td classes={{ padding: 10, color: "#0E4F27", fontWeight: 500 }}>{rowId.payment[0]?.payment_code}</td>
                              <td classes={{ padding: 10 }}>{formatDate(rowId.created_at)}</td>
                              <td classes={{ padding: 10, color: "#333333", fontWeight: 500 }}>₦{parseFloat(rowId.amount).toLocaleString('en-US', {
                                minimumIntegerDigits: 1,
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}</td>
                              <td classes={{ padding: 10 }}>
                                <img
                                  className={classes.statusIcon}
                                  src={rowId.payment_status === "0" ? NotPaidPaymentIcon : PaidIcon}
                                  alt="status"
                                />
                              </td>
                              {/* <td classes={{ padding: 10 }}>Tue 28th June - 9:30 AM</td> */}
                              <td classes={{ padding: 10 }} className={classes.moreTxt}>
                                <div classes={{ display: 'flex', flexDirection: "row", gap: 10 }}>
                                  <img
                                    src={rowId?.payment_status === "0" ? MakePaymentIcon : TrackIcon} // Replace with your actual path
                                    alt="download"
                                    classes={{ width: "20px", marginRight: "10px" }}
                                  />
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

            {/* Table container ends here */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;