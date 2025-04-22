import React, { useState, useEffect } from 'react';
import DashboardNav from '../../Components/Navigation.js/Navigation';
import Horheader from '../../Components/horheader/horheader';
import classes from './Reports.module.css';
import { Spinner, Badge, Modal, Form, Tabs, Tab, Pagination, Placeholder } from 'react-bootstrap';
import DeclinedIcon from '../../Asset/warning-2.png';
import search from "../../Asset/search.svg";
import MarkIcon from "../../Asset/markk.png";
import FeaturedIcon from '../../Asset/fticon.png'
import Swal from "sweetalert2";
import DeleteIcon from '../../Asset/trash.png';
import ViewIcon from '../../Asset/eye.png';
import ResolveIcon from '../../Asset/Resolve.png';
import greens from '../../Asset/greencircle.png';
import status from "../../Asset/status-icon.svg";
import { BASE_URL } from "../../API/Api";
import axios from "axios";
import Calender from "../../Asset/caln.png";
import { useNavigate } from "react-router-dom";
import FirstIcon from '../../Asset/import.png';
import SecondIcon from '../../Asset/repeat-circle.png';
import ThirdIcon from "../../Asset/3.png";
import FourthIcon from "../../Asset/4.png";
import { Link } from "react-router-dom";
import notransaction from '../../Asset/no-transaction-icon.svg';
import PaidIcon from "../../Asset/completed.png";
import BackgroundIcon from "../../Asset/backk.jpg";
import NotPaidIcon from "../../Asset/npaid.png";
import ReviewIcon from "../../Asset/review.png";
import Pending from "../../Asset/Pending.png";
import MoreIcon from "../../Asset/more.png";
import DownloadIcon from "../../Asset/download.png";
import TrackIcon from "../../Asset/track.png";
import ContactIcon from "../../Asset/support.png";

import SendIcon from '../../Asset/sendicon.png';


import makePay from "../../Asset/make-payment.svg";
import exports from "../../Asset/export-icon.svg";
import download from "../../Asset/download-icon.svg";
import invoice from "../../Asset/view-invoice.svg";

import { Navbar, Container, Button } from 'react-bootstrap';
import localforage from 'localforage';
import { useTheme } from '../../ThemeContext';


const Reports = () => {
  const [show, setShow] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow(false);
  const handleShow1 = () => setShow(true);
  const handleClose2 = () => setShow(false);
  const handleShow2 = () => setShow(true);
  const [bearer, setBearer] = useState('');
  const [description, setDescription] = useState('');
  const [complaintTitle, setComplaintTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [clockTime, setClockTime] = useState(false);
  const [loading, setLoading] = useState(false);
  const [personal, setPersonal] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showSelectedDetailModal, setShowSelectedDetailModal] = useState(false);
  const [showSelectedDetailModal1, setShowSelectedDetailModal1] = useState(false);
  const [showSelectedDetailModal2, setShowSelectedDetailModal2] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleOpenModal1 = (rowData) => {
    setSelectedReport(rowData);
    // setVisibleDropdown(false);
    setShowModal1(true);
  }
  const handleOpenModal2 = () => setShowModal2(true);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isConfirmed1, setIsConfirmed1] = useState(false);
  const [isConfirmed2, setIsConfirmed2] = useState(false);
  const handleSelectedDetailModal = () => {
    setShowSelectedDetailModal(true);
    setShowModal(false);
  }
  const handleSelectedDetailModal1 = () => {
    setShowSelectedDetailModal1(true);
    setShowModal1(false);
  }
  const handleSelectedDetailModal2 = () => {
    setShowSelectedDetailModal2(true);
    setShowModal2(false);
  }
  const { isDarkMode } = useTheme();
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value)
  }

  const handleRadioClick = () => {
    setIsConfirmed(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOption(null);
  }
  const handleCloseModal1 = () => {
    setShowModal1(false);
    setSelectedOption1(null);
  }
  const handleCloseModal2 = () => {
    setShowModal2(false);
    setSelectedOption2(null);
  }

  const handleCloseSelectedDetailModal = () => {
    setShowModal(false);
    setShowSelectedDetailModal(null);
    setIsConfirmed(null);
  }
  const handleCloseSelectedDetailModal1 = () => {
    setShowModal1(false);
    setShowSelectedDetailModal1(null);
    setIsConfirmed1(null);
  }
  const handleCloseSelectedDetailModal2 = () => {
    setShowModal2(false);
    setShowSelectedDetailModal2(null);
    setIsConfirmed2(null);
  }
  const [benLoading, setBenLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [stat, setStat] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleDropdown, setVisibleDropdown] = useState(null);

  const readData = async () => {
    try {
      const detail = await localStorage.getItem('userName');
      const details = await localStorage.getItem('userToken');
      const detailss = await localStorage.getItem('isFilledState');

      if (details !== null) {
        setBearer(details);
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

  const handleMoreClick = (rowId) => {
    setVisibleDropdown(visibleDropdown === rowId ? null : rowId);
  };

  const [modalSize, setModalSize] = useState("lg"); // Default size for large screens

  useEffect(() => {
    const updateModalSize = () => {
      if (window.innerWidth < 950) {
        setModalSize("sm"); // Small modal for small screens
      } else {
        setModalSize(null); // Default size for larger screens
      }
    };

    updateModalSize(); // Check size on mount
    window.addEventListener("resize", updateModalSize);

    return () => window.removeEventListener("resize", updateModalSize);
  }, []);



  const handlePrevPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, totalPages));
  };

  const fetchDashboardData = async () => {
    setBenLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/customer/view_complaints`,
        { headers }
      );
      const results = response.data?.data?.report;
      const resultss = response.data?.data;

      console.log(response?.data?.data);
      setTableData(results);
      setStat(resultss);

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

  const createCustomer = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/customer/file_complain`,
        {
          title: complaintTitle,
          description: description
        },
        { headers }
      );
      console.log(response.data.message)
      fetchDashboardData();
      setShowSelectedDetailModal(true);
      setShowModal(false);
      setComplaintTitle('');
      setDescription('');
      console.log(response.data);

    } catch (error) {
      const errorStatus = error.response.data.message;
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: JSON.stringify(error.response.data.message)
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/customer/respond_to_admin`,
        {
          uuid: selectedReport?.uuid,
          description: description
        },
        { headers }
      );
      console.log(response.data.message)
      fetchDashboardData();
      handleCloseModal1(false);
      setDescription('');
      console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: 'Successful',
        text: response.data.message,
      });
    } catch (error) {
      const errorStatus = error.response.data.message;
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: JSON.stringify(error.response.data.message)
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const formatDateForComparison = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  const filteredData = tableData.filter((item) => {
    const matchesDate = selectedDate
      ? formatDateForComparison(item.created_at) === selectedDate
      : true;

    const matchesSearch = searchTerm.trim()
      ? item?.title?.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
      : true;


    return matchesDate && matchesSearch;
  });
  const totalPages = Math.ceil(tableData.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);



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

              <Button style={{ backgroundColor: "#21B55A", border: "none" }} variant="success" onClick={handleShow}>
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
                <p className={classes.wlcm}>Support Tickets</p>
                <p style={{marginTop: -20, }}>Need help? Our support team is just a ticket away.</p>
              </div>
              <div>
                <button onClick={handleOpenModal} className={classes.applctnbtn}>New Ticket</button>
              </div>
            </div>
            <Modal show={showModal} size={modalSize} onHide={handleCloseModal} centered>
              <Modal.Header>
                <Modal.Title style={{
                  fontSize: 18,
                  color: "#333333",
                  fontWeight: 500
                }}>Ticket</Modal.Title>
                <Button variant="close" onClick={handleCloseModal}></Button>
              </Modal.Header>
              <Modal.Body>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <p className={classes.rtxt}>We are very sorry for the inconvenience, let’s hear what happened with your application</p>
                  <Form>
                    <Form.Group className="mb-2 mt-1" controlId="exampleForm.ControlInput1">
                      <Form.Label>Complaint title</Form.Label>
                      <Form.Control value={complaintTitle} onChange={(e) => setComplaintTitle(e.target.value)} type="text" placeholder="Input title" />
                    </Form.Group>
                    <Form.Group className="mb-1 mt-4" controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Description</Form.Label>
                      <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} as="textarea" placeholder="Explain the issue here" rows={3} />
                    </Form.Group>
                  </Form>
                </div>

                <div className={classes.bottomBtnn}>
                  <div className={classes.btn2}
                    style={{
                      backgroundColor: "#D92D20",
                      color: "white",
                      cursor: PointerEvent,
                      width: "100%"
                    }}
                    onClick={createCustomer}
                  >
                    <h1>
                      {loading ? (
                        <>
                          <Spinner size='sm' />
                          <span style={{ marginLeft: '5px' }}>Submitting, Please wait...</span>
                        </>
                      ) : (
                        "Report an Issue"
                      )}
                    </h1>
                  </div>
                </div>
              </Modal.Body>
            </Modal>

            <Modal show={showSelectedDetailModal} size={modalSize} onHide={handleCloseSelectedDetailModal} centered>
              <Modal.Header>
                <Modal.Title style={{
                  fontSize: 18,
                  color: "#333333",
                  fontWeight: 500
                }}>Success</Modal.Title>
                <Button variant="close" onClick={handleCloseSelectedDetailModal}></Button>
              </Modal.Header>
              <Modal.Body>
                <div className={classes.dbtn}>
                  <img src={greens} className={classes.greenss} alt="tick icon" />
                  <h1 className={classes.txtRe}>Ticket submitted</h1>
                  <p className={classes.txtA}>We apologize for the inconvenience. Our team will <br /> reach out to you shortly</p>

                  <div className={classes.bottomBtnn}>
                    <div onClick={handleCloseSelectedDetailModal} className={classes.btn1}>
                      <h1>Go back to Support Tickets</h1>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
            <div className={classes.allcards}>
              <div className={isDarkMode ? classes.twokadss : classes.twokad}>
                <div className={classes.twokadfrstp}>
                  <img src={FirstIcon} className={classes.featuredicon2} />
                  <p className={isDarkMode ? classes.walltp22 :classes.walltp2}>Total Tickets</p>
                  <p className={`${isDarkMode ? classes.walltpmblkk : classes.walltpmblk} ${classes.walltpmblka}`}>
                    {benLoading ? (
                      <Placeholder animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    ) : (
                      stat?.total_report
                    )}
                  </p>
                </div>
              </div>

              <div className={isDarkMode ? classes.twokadss : classes.twokad}>
                <div className={classes.twokadfrstp}>
                  <img src={SecondIcon} className={classes.featuredicon2} />
                  <p className={isDarkMode ? classes.walltp22 :classes.walltp2}>Pending Tickets</p>
                  <p className={`${isDarkMode ? classes.walltpmblkk : classes.walltpmblk} ${classes.walltpmblka}`}>
                    {benLoading ? (
                      <Placeholder animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    ) : (
                      stat?.pending_report
                    )}
                  </p>
                </div>
              </div>

              <div className={isDarkMode ? classes.twokadss : classes.twokad}>
                <div className={classes.twokadfrstp}>
                  <img src={FourthIcon} className={classes.featuredicon2} />
                  <p className={isDarkMode ? classes.walltp22 :classes.walltp2}>Resolved Tickets</p>
                  <p className={isDarkMode ? classes.walltpmblkk : classes.walltpmblk}>
                    {benLoading ? (
                      <Placeholder animation="glow">
                        <Placeholder xs={12} />
                      </Placeholder>
                    ) : (
                      stat?.resolved_report
                    )}
                  </p>
                </div>
              </div>

              {/* <div className={classes.twokad}>
                <div className={classes.twokadfrstp}>
                  <img src={ThirdIcon} className={classes.featuredicon2} />
                  <p className={classes.walltp2}>Unresolved Reports</p>
                  <p className={classes.walltpmblk}>0</p>
                </div>
              </div> */}

            </div>




            <div className={isDarkMode ? classes.applicationHistory1 : classes.applicationHistory}>

              <div className={classes.navlay}>

                {/* <div className={classes.divSearch}>
                  <img src={search} alt="search" className={classes.searchIcon} />
                  <input
                    type="text"
                    placeholder="Search ticket"
                    className={classes.search}
                  />
                </div>
                <div className={classes.bttns}>
                  <label
                    style={{
                      fontSize: 14,
                      color: " #828282",
                      fontWeight: 600,
                      gap: 10,
                      borderRadius: 8,
                      backgroundColor: '#F2F2F2',
                      marginRight: 5
                    }}
                  className="d-flex justify-content-start align-items-center"
                  >

                    <Form.Select
                      id='status'
                      style={{
                        width: 140,
                        height: 40,
                        borderRadius: 8,
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#828282',
                        backgroundColor: '#F2F2F2',
                        border: 0
                      }}
                      name="DataTables_Table_0_length"
                      aria-controls="DataTables_Table_0"
                      className="custom-select custom-select-sm form-control form-control-sm"
                     value={entriesPerPage}
                        onChange={(e) => {
                        setEntriesPerPage(parseInt(e.target.value));
                        setCurrentPage(1);
                        }}
                    >
                      <option value="All">Select Status</option>
                      <option value="All">Pending</option>
                      <option value="All">Open</option>
                      <option value="All">Closed</option>
                    </Form.Select>
                  </label>
                  <input type="date" className={classes.bttens}>
                  </input>
                    Select date <img src={Calender} className={classes.imgss} alt="calender icon" />
                </div> */}
              </div>

              <div className={classes.mainTables}>
                {benLoading ? (
                  <>
                    <Placeholder xs={6} />
                    <Placeholder className="w-75" /> <Placeholder style={{ width: '25%' }} />
                  </>
                ) : currentEntries.length === 0 ? (
                  <div className={classes.notFound}>
                    <img src={notransaction} alt="not-found" />
                    <p>No Ticket found</p>
                  </div>
                ) : (
                  <div >
                    <table style={{ width: "100%" }}>

                      <thead style={{ whiteSpace: 'nowrap' }}>
                        <tr>
                          {/* <th >Application ID</th> */}
                          <th style={{ width: 200 }}>Ticket title</th>
                          <th >Submitted On</th>
                          <th >Status</th>
                          {/* <th >Last Updated</th> */}

                          <th></th>
                        </tr>
                      </thead>
                      <tbody style={{ whiteSpace: "nowrap" }}>
                        {currentEntries.map((rowId) => (
                          <tr key={rowId}>
                            {/* <td style={{ padding: 10 }}>#123456</td> */}
                            <td style={{ padding: 10 }}>{rowId.title}</td>
                            <td style={{ padding: 10 }}>{formatDateForComparison(rowId.created_at)}</td>
                            <td style={{ padding: 10 }}>
                              <Badge
                                style={{
                                  borderRadius: 88,
                                  border: rowId.status === "0" ? "1px solid #FEC53D" : "none",
                                  color: rowId.status === "0" ? "#FEC53D" : "#fff",
                                }}
                                bg={
                                  rowId.status === "0" ? "light" :
                                    rowId.status === "1" ? "primary" :
                                      "success"
                                }
                              >
                                {rowId.status === "0" ? "Pending" : rowId.status === "1" ? "Open" : "Closed"}
                              </Badge>
                            </td>

                            {/* <td style={{ padding: 10 }}>Tue 28th June - 9:30 AM</td> */}
                            <td style={{ padding: 10 }} className={classes.moreTxt}>
                              <div style={{ position: "relative" }}>
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
                                      top: "100%", // Adjust based on your design
                                      right: 0, // Adjust based on your design
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
                                        src={ViewIcon} // Replace with your actual path
                                        alt="view"
                                        style={{ width: "20px", marginRight: "10px" }}

                                      />
                                      <span
                                        onClick={() => {
                                          handleOpenModal1(rowId); // Open the modal
                                          setVisibleDropdown(null); // Close the dropdown
                                        }}
                                      >
                                        View Ticket Details
                                      </span>
                                    </div>

                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "5px 10px",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <img
                                        src={DeleteIcon} // Replace with your actual path
                                        alt="Delete"
                                        style={{ width: "20px", marginRight: "10px" }}
                                      />
                                      Delete Tickets
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
              <Modal show={showModal1} onHide={handleCloseModal1} centered>
                <Modal.Header style={{ background: '#fff', color: "#000" }}>
                  <Modal.Title >
                    <div className={classes.titleH} >
                      <h6 className={classes.titttl}>Support Ticket - {selectedReport?.uuid}</h6>
                      {/* <p className={classes.tdate}>02 - January - 2025: 09:30am</p> */}
                    </div>
                  </Modal.Title>
                  <Button style={{ color: '#21B55A' }} variant="close" onClick={handleCloseModal1}></Button>
                </Modal.Header>
                <Modal.Body
                  style={{
                    backgroundImage: `url(${BackgroundIcon})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                  }}
                >
                  <div >
                    <div >
                    </div>
                    <div className={classes.chatContainer}>
                      <div className={classes.messageBox}>
                        <p className={classes.messageText}>{selectedReport?.description}</p>
                        <div className={classes.messageInfo}>
                          <span className={classes.messageTime}>
                            {new Date(selectedReport?.created_at).toLocaleString('en-US', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          <span className={classes.messageStatus}>
                            <img src={MarkIcon} alt='mark' />
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div style={{ marginTop: 15 }} />
                  <>
                    {selectedReport ? (
                      (() => {
                        const customerResponses = selectedReport?.cus_response || [];
                        const adminResponses = selectedReport?.response || [];

                        // Merge both responses into one array
                        const allMessages = [
                          ...customerResponses.map(item => ({ ...item, type: "customer" })),
                          ...adminResponses.map(item => ({ ...item, type: "admin" })),
                        ];

                        // Sort messages by created_at timestamp
                        allMessages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

                        // Check if no messages exist
                        if (allMessages.length === 0) {
                          return (
                            <p style={{ color: "#000", fontStyle: "italic", fontWeight: 600 }}>
                              Awaiting response from Admin, kindly wait...
                            </p>
                          );
                        }

                        return (
                          <div>
                            {allMessages.map((item, index) => (
                              <div
                                key={index}
                                className={item.type === "customer" ? classes.chatContainer : classes.chatContainers}
                              >
                                <div className={item.type === "customer" ? classes.messageBox : classes.messageBoxs}>
                                  <p className={classes.messageText}>{item?.response || item?.response}</p>
                                  <div className={classes.messageInfo}>
                                    <span className={classes.messageTime}>
                                      {new Date(item?.created_at).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                      })}
                                    </span>
                                    <span className={classes.messageStatus}>
                                      <img src={MarkIcon} alt="mark" />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })()
                    ) : null}
                  </>


                  {selectedReport?.status !== "2" && (
                    <div className={classes.msgbox} >
                      <textarea
                        rows={3}
                        className={classes.inputConttts}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleResponse()}
                        placeholder="Type a message..."
                      />
                      <button
                        onClick={handleResponse}
                        className={classes.btnSndd}
                      >
                        {loading ? (
                          <>
                            <Spinner size='sm' />

                          </>
                        ) : (
                          <img src={SendIcon} alt="MarkIcon" className={classes.btnsend} />
                        )}

                      </button>
                    </div>
                  )}
                </Modal.Body>
              </Modal>
              <div className={classes.mobileView}>
                <div className={classes.mainTable}>
                {benLoading ? (
                  <>
                    <Placeholder xs={6} />
                    <Placeholder className="w-75" /> <Placeholder style={{ width: '25%' }} />
                  </>
                ) : currentEntries.length === 0 ? (
                  <div className={classes.notFound}>
                    <img src={notransaction} alt="not-found" />
                    <p>No Ticket found</p>
                  </div>
                ) : (
                  <div className="table-responsive" >
                    <table className="table display table-hover  m-0 card-table">

                      <thead style={{ whiteSpace: 'nowrap' }}>
                        <tr>
                          {/* <th >Application ID</th> */}
                          <th >Ticket title</th>
                          <th >Submitted On</th>
                          <th >Status</th>
                          {/* <th >Last Updated</th> */}
                          <th></th>
                        </tr>
                      </thead>
                      <tbody style={{ whiteSpace: "nowrap" }}>
                        {currentEntries.map((rowId) => (
                          <tr key={rowId}>
                            {/* <td style={{ padding: 10 }}>#123456</td> */}
                            <td style={{ padding: 10 }}>{rowId.title}</td>
                            <td style={{ padding: 10 }}>{formatDateForComparison(rowId.created_at)}</td>
                            <td style={{ padding: 10 }}>
                              <Badge
                                style={{
                                  borderRadius: 88,
                                  border: rowId.status === "0" ? "1px solid #FEC53D" : "none",
                                  color: rowId.status === "0" ? "#FEC53D" : "#fff",
                                }}
                                bg={
                                  rowId.status === "0" ? "light" :
                                    rowId.status === "1" ? "primary" :
                                      "success"
                                }
                              >
                                {rowId.status === "0" ? "Pending" : rowId.status === "1" ? "Open" : "Closed"}
                              </Badge>
                            </td>

                            {/* <td style={{ padding: 10 }}>Tue 28th June - 9:30 AM</td> */}
                            <td style={{ padding: 10 }} className={classes.moreTxt}>
                              <div style={{ position: "relative" }}>
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
                                      top: "100%", // Adjust based on your design
                                      right: 0, // Adjust based on your design
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
                                        src={ViewIcon} // Replace with your actual path
                                        alt="view"
                                        style={{ width: "20px", marginRight: "10px" }}

                                      />
                                      <span
                                        onClick={() => {
                                          handleOpenModal1(rowId); // Open the modal
                                          setVisibleDropdown(null); // Close the dropdown
                                        }}
                                      >
                                        View Ticket Details
                                      </span>
                                    </div>

                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "5px 10px",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <img
                                        src={DeleteIcon} // Replace with your actual path
                                        alt="Delete"
                                        style={{ width: "20px", marginRight: "10px" }}
                                      />
                                      Delete Tickets
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

              <div className={classes.endded}>
                <div className={classes.showTxt}>
                  <div className={classes.show}>
                    <label style={{
                      fontSize: 14,

                      color: isDarkMode ? '#ffffff' : '#333333',
                      fontWeight: 600,
                      gap: 10
                    }} className="d-flex justify-content-start align-items-center">
                      Showing
                      <Form.Select style={{ width: 114, height: 44, textAlign: 'center', borderRadius: 8, fontSize: 14, fontWeight: 600 }} name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" className="custom-select custom-select-sm form-control form-control-sm"
                      //  value={entriesPerPage}
                      //     onChange={(e) => {
                      //     setEntriesPerPage(parseInt(e.target.value));
                      //     setCurrentPage(1);
                      //     }}
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
                  <div style={{ display: 'flex' }}>
                    <button
                      style={{ textAlign: "center", border: '1px solid #F1F1F1', backgroundColor: '#fff', borderRadius: 8, height: '32px', width: '32px', fontWeight: 700, fontSize: 14, color: '#000000', cursor: "pointer" }}
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
                            style={{
                              marginLeft: '0.4rem',
                              textAlign: 'center',
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
                      style={{ textAlign: "center", border: '1px solid #F1F1F1', backgroundColor: '#fff', borderRadius: 8, height: '32px', width: '32px', fontWeight: 700, fontSize: 14, color: '#000000', cursor: "pointer" }}
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >
                      {">"}
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Reports;