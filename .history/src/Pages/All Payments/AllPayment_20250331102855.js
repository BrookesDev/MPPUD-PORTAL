import React, { useState, useEffect, useRef } from "react";
import DashboardNav from "../../Components/Navigation.js/Navigation";
import Horheader from "../../Components/horheader/horheader";
import classes from "./AllPayment.module.css";
import PdfIcon from "../../Asset/pdf.svg";
import UploadIcon from "../../Asset/upload.png";
import Printer from '../../Asset/printer.png';
import xport from "../../Asset/export.png";
import search from "../../Asset/search.svg";
import Calender from "../../Asset/calendar.svg";
import agent from "../../Asset/agent.svg";
import { MdOutlineDownload } from "react-icons/md";
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
} from "react-bootstrap";
import PaidIcon from "../../Asset/completed.png";
import MoreIcon from "../../Asset/more.png";
import DownloadIcon from "../../Asset/download.png";
import TrackIcon from "../../Asset/track.png";
import NotPaidIcon from "../../Asset/Notpaid.png";
import Alert from "react-bootstrap/Alert";
import ContactIcon from "../../Asset/support.png";
import ViewIcon from "../../Asset/eye.png";
import InReviewIcon from "../../Asset/review.png";
import ReportIcon from "../../Asset/repoort.png";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../../API/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TimeLineIcon from "../../Asset/timeline.png";
import TimeLineIcon2 from "../../Asset/timeline2.png";
import TimeLineIcon3 from "../../Asset/timeline3.png";
import notransaction from "../../Asset/no-transaction-icon.svg";
import FirstIcon from "../../Asset/totalApp.png";
import SecondIcon from "../../Asset/notpaidd.png";
import ThirdIcon from "../../Asset/inrevieww.png";
import FourthIcon from "../../Asset/comp.png";
import PaymentIcon from "../../Asset/payment.png";
import TickIcon from "../../Asset/tick-circle.png";
import BuildingIcon from "../../Asset/buildings.png";
import { Row, Col } from "react-bootstrap";
import ImageIcon from "../../Asset/piclogo.png";
import { Navbar, Container, Button } from "react-bootstrap";
// import localStorage from "@react-native-async-storage/async-storage";
import CurrencyInput from "react-currency-input-field";
import { useTheme } from "../../ThemeContext";
// import NewApplications from '../New Application/NewApplicationns';

// import axios from 'axios';
// import localStorage from '@react-native-async-storage/async-storage';

const AllPayment = () => {
  const [eyeClicked, setEyeClicked] = useState("");
  const [cofoNumber, setCofONumber] = useState("");
   const [isFilled, setIsFilled] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
  const [proposedRBuilding, setProposedRBuilding] = useState("");
  const [otherProperty, setOtherProperty] = useState("");
  const [plotSize, setPlotSize] = useState("");
  const [tenant, setTenant] = useState("");
  const [sqm, setSqm] = useState("");
  const [valueProperty, setValueProperty] = useState("");
  const [timeline, setTimeLine] = useState("");
  const [stateCapacity, setStateCapacity] = useState("");
  const [possessionLength, setPossessionLength] = useState("");
  const [developmentValue, setDevelopmentValue] = useState("");
  // const [fund,setFund] = useState("")
  const [fund, setFund] = useState("");
  const [selectedLandUse, setSelectedLandUse] = useState("");
  const [selectedDevelopment, setSelectedDevelopment] = useState("");
  const [allocationDate, setAllocationDate] = useState("");
  const [roless, setRoless] = useState([]);
  const [show, setShow] = useState(false);
  const [show50, setShow50] = useState(false);
  const [rows, setRows] = useState([{ description: "", file: "" }]);
  const [show20, setShow20] = useState(false);
  const [download, setDownload] = useState(false);
  const [showUploadTCC, setShowUploadTCC] = useState(false);

  const fileInputRefs = useRef(null);
  const handleClose = () => setShow(false);
  const handleCloseTCC = () => setShowUploadTCC(false);
  const handleClose50 = () => setShow50(false);
  const handleClose20 = () => setShow20(false);
  const handleDownloadClose = () => setDownload(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleShowTCC = () => {
    setShowUploadTCC(true);
  };
  const handleShow50 = () => {
    setShow50(true);
  };
  const handleShow20 = async () => {
    await fetchData1(foundInvoice);
    setShow20(true);
  };

  const [bearer, setBearer] = useState("");
  console.log(roless, "kh");
  const [landLocation, setLandLocation] = useState();
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [clockTime, setClockTime] = useState(false);
  const [personal, setPersonal] = useState({});
  const [selectedFile3, setSelectedFile3] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const handleClockTime = () => {
    setClockTime(!clockTime);
  };
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [applicationModal1, setApplicationModal1] = useState(false);
  const [applicationModal2, setApplicationModal2] = useState(false);
  const [applicationModal3, setApplicationModal3] = useState(false);
  const [showSelectedDetailModal, setShowSelectedDetailModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [tableData1, setTableData1] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [tableData3, setTableData3] = useState([]);
  const [foundInvoice, setFoundInvoice] = useState([]);
  const [foundInvoiceID, setFoundInvoiceID] = useState("");
  const navigate = useNavigate();
  const [totalCompleted, setTotalCompleted] = useState("");
  const [totalNotPaid, setTotalNotPaid] = useState("");
  const [totalApplications, setTotalApplications] = useState("");
  const [totalPending, setTotalPending] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  // const currentEntries = tableData.slice(indexOfFirstEntry, indexOfLastEntry);
  const currentEntries1 = tableData1.slice(indexOfFirstEntry, indexOfLastEntry);
  const currentEntries2 = tableData2.slice(indexOfFirstEntry, indexOfLastEntry);
  const currentEntries3 = tableData3.slice(indexOfFirstEntry, indexOfLastEntry);
  // const totalPages = Math.ceil(tableData?.length / entriesPerPage);
  const totalPages1 = Math.ceil(tableData1.length / entriesPerPage);
  const totalPages2 = Math.ceil(tableData2.length / entriesPerPage);
  const totalPages3 = Math.ceil(tableData3.length / entriesPerPage);
  const [benLoading, setBenLoading] = useState(false);
  const [visibleDropdown, setVisibleDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const handleMoreClick = (id) => {
    setVisibleDropdown((prev) => (prev === id ? null : id));
  };

  const handleThirdModalClose = () => {
    setApplicationModal3(false);
    setApplicationModal1(false);
    setApplicationModal2(false);
    setSelectedOption(null);
    setIsConfirmed(false);
  };
  const handleSecondModalClose = () => {
    setApplicationModal3(false);
    setApplicationModal1(false);
    setApplicationModal2(false);
    setSelectedOption(null);
    setIsConfirmed(false);
  };
  const handleFirstModalClose = () => {
    setApplicationModal3(false);
    setApplicationModal1(false);
    setApplicationModal2(false);
    setSelectedOption(null);
    setIsConfirmed(false);
  };

  const handleOpenModal = () => setShowModal(true);
  const handleApplicationModal1 = () => {
    setApplicationModal1(true);
    setShowSelectedDetailModal(false);
  };
  const handleApplicationModal2 = () => {
    setApplicationModal2(true);
    setApplicationModal1(false);
  };
  const handleApplicationModal3 = () => {
    setApplicationModal3(true);
    setApplicationModal2(false);
  };

  const [isConfirmed, setIsConfirmed] = useState(false);
  const handleCloseApplicationModal1 = () => {
    setApplicationModal1(false);
    setShowSelectedDetailModal(true);
    setIsConfirmed(false);
  };
  const handleCloseApplicationModal2 = () => {
    setApplicationModal1(true);
    setApplicationModal2(false);
    setShowSelectedDetailModal(false);
    setIsConfirmed(false);
  };
  const handleCloseApplicationModal3 = () => {
    setApplicationModal2(true);
    setApplicationModal3(false);
    setShowSelectedDetailModal(false);
    setIsConfirmed(false);
  };
  const handleSelectedDetailModal = () => {
    setShowSelectedDetailModal(true);
    setShowModal(false);
  };
  const handleRadioClick = () => {
    setIsConfirmed(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOption(null);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${padZero(
      date.getMonth() + 1
    )}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(
      date.getMinutes()
    )} ${date.getHours() >= 12 ? "PM" : "AM"}`;
    return formattedDate;
  }

  function padZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  const handleCloseSelectedDetailModal = () => {
    setShowModal(true);
    setShowSelectedDetailModal(false);
    setIsConfirmed(false);
  };
  const [selectedOption, setSelectedOption] = useState(null);

  const readData = async () => {
    try {
      const detail = await localStorage.getItem("userName");
      const details = await localStorage.getItem("userToken");

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

  useEffect(() => {
    readData();
  }, []);

  const options = [
    "New Land Purchase/Allocation Application",
    "New Property Registration Programme Application",
    "New Home Owner's Charter (H.O.C) Application",
  ];

  const properties = [
    "LUD Site 1 , Ilaro",
    "Abeokuta Secretariat, Complex A",
    "Sagamu/Ogijo Road Acquisition",
    "New Town Acquisition",
    "Evergreen Estate, Adigbe/Obada-Oko Rd, Obada, Obafemi Owode LGA",
    "Lagos Univeristy Teaching Hospital, Along Lagos/Abeokuta Expresss Rd, Pakoto, Ifo LGA",
  ];

  // specify header
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${bearer}`,
  };

  //  useEffect(() => {
  //     const handleClickOutside = (event) => {
  //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //         setVisibleDropdown(null);
  //       }
  //     };

  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, []);

  // const fetchallApplications = async () => {
  //   setBenLoading(true);
  //   try {
  //     const response = await axios.get(`${BASE_URL}/customer/receipt`, {
  //       headers,
  //     });
  //     console.log(response)
  //     const results = response.data?.data?.applications;


  //     setTableData(results);
  //     console.log(results);
 
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
       
  //     } else {
  //       let errorMessage = "An error occurred. Please try again.";
  //       if (
  //         error.response &&
  //         error.response.data &&
  //         error.response.data.message
  //       ) {
  //         if (typeof error.response.data.message === "string") {
  //           errorMessage = error.response.data.message;
  //         } else if (Array.isArray(error.response.data.message)) {
  //           errorMessage = error.response.data.message.join("; ");
  //         } else if (typeof error.response.data.message === "object") {
           
  //           console.log(errorMessage);
  //         }
  //       }
  //       setTableData([]);
  //     }
  //   } finally {
  //     setBenLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (bearer) {
  //     fetchallApplications();
  //   }
  // }, [bearer]);

   const fetchDashboardData = async () => {
      setBenLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/customer/receipt`, {
          headers,
        });
        console.log(response);
        const results = response.data?.data?.customer_invoice;
        const resultx = response.data?.data?.completed_applications;
        const resultxx = response.data?.data?.pending_applications;
        const resultxxx = response.data?.data?.total_applications;
        console.log(response?.data?.data);
        setTableData(results);
        console.log(results?.customer_invoice,"print all customer invoice")
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

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  // const handlePrevPage = () => {
  //   setCurrentPage(Math.max(currentPage - 1, 1));
  // };

  // const handleNextPage = () => {
  //   setCurrentPage(Math.min(currentPage + 1, totalPages));
  // };

  const handleNewApplication = () => {
    navigate("/new_applications");
  };

  const [payment, setPayment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [customerType, setCustomerType] = useState("");
  const [applicationDocs, setApplicationDocs] = useState([]);

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
      console.log(payment)
      setCustomer(customer);
      setPayment(payment);
      setApplicationDocs(applicationdocs);
      setRoless(roleList);
      // console.log(roleList)
      setLandLocation(roleList.location?.description);
      setAllocationDate(roless.allocation_date);
      setSelectedDevelopment(roless.land_development_status);
      setSelectedLandUse(roless.landuse_id);
      setTimeLine(roless.development_timeframe);
      setFund(roless.proposed_source_of_fund);
      setDevelopmentValue(roless.estimated_development_amount);
      setPossessionLength(roless.length_of_possession);
      setStateCapacity(roless.property_state);
      setValueProperty(roless.value_of_property);
      setPlotSize(roless.size_in_plot);
      setSqm(roless.size_in_sqm);
      setTenant(roless.tenement_rate_number);
      setOtherProperty(roless.other_property_size);
      setProposedRBuilding(roless.proposed_residential_building);
      setCofONumber(roless.cofo_number);
      setCustomerType(customerTyp);
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
  const handleDevStatus = (e) => {
    setSelectedDevelopment(e.target.value);
    // setShowErrorMessage(false);
  };
  const handleChange = (index, field, value) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  const handleLandUse = (e) => {
    setSelectedLandUse(e.target.value);
    // setShowErrorMessage(false);
  };
  const handleProposedBuild = (e) => {
    setProposedRBuilding(e.target.value);
    // setShowErrorMessage(false);
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      handleChange(index, "file", file);
    }
  };

  const handleAddRow = () => {
    setRows([...rows, { description: "", file: null }]);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const handleTccUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.type !== "application/pdf") {
        setError("Only PDF files are allowed.");
        setSelectedFile(null);
        event.target.value = ""; // Reset the file input
      } else {
        setSelectedFile(file);
        setError(""); // Clear error if valid
      }
    }
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

  useEffect(() => {
    if (bearer) {
      fetchData1();
    }
  }, [bearer]);

  const missingFields = [];
  if (!customer.tin) missingFields.push("Unverified STIN");
  if (customerType === "corporate") {
    if (!customer.cac) {
      missingFields.push("Unverified CAC");
    }
  } else if (customerType === "individual") {
    if (!customer.nin) {
      missingFields.push("Unverified NIN");
    }
  }

  if (!customer.tcc == 0)
    missingFields.push("No Verified Tax Clearance Certificate");

  const shouldShowAlert = missingFields.length > 0;

  const handleEyeClick = async (id) => {
    const foundInvoice = tableData.find((item) => item.id === id);
    setFoundInvoiceID(id);
    setFoundInvoice(foundInvoice);
    await fetchData1(id); // Pass the ID to fetchData1 and wait for it to complete
    setShow20(true); // Open the modal after the data is fetched
  };
  const handleDownloadClick = async (id) => {
    const foundInvoice = tableData.find((item) => item.id === id);
    console.log(foundInvoice);
    setFoundInvoiceID(id);
    setFoundInvoice(foundInvoice);
    await fetchData1(id);
    setDownload(true);
  };

  const handleEyeClick1 = async (id) => {
    const foundInvoice = tableData1.find((item) => item.id === id);
    setFoundInvoiceID(id);
    setFoundInvoice(foundInvoice);
    await fetchData1(id); // Pass the ID to fetchData1 and wait for it to complete
    setShow20(true);
  };
  const handleEyeClick2 = async (id) => {
    const foundInvoice = tableData2.find((item) => item.id === id);
    setFoundInvoiceID(id);
    setFoundInvoice(foundInvoice);
    await fetchData1(id); // Pass the ID to fetchData1 and wait for it to complete
    setShow20(true);
  };
  const handleEyeClick3 = async (id) => {
    const foundInvoice = tableData3.find((item) => item.id === id);
    setFoundInvoiceID(id);
    setFoundInvoice(foundInvoice);
    await fetchData1(id); // Pass the ID to fetchData1 and wait for it to complete
    setShow20(true);
  };

  const addNewDocument = async () => {
    setPaymentLoading(true);
    try {
      const formData = new FormData();

      rows.forEach((data, index) => {
        console.log(`File at index ${index}:`, data.file);

        if (data.file instanceof File) {
          formData.append(`document[${index}]`, data.file); // ✅ Send the actual file, not just the name
        } else {
          console.warn(`Invalid file at index ${index}:`, data.file);
        }

        formData.append(`description[${index}]`, data.description);
      });

      formData.append("application_id", roless.id);

      const response = await axios.post(`${BASE_URL}/add-documents`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${bearer}`,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message,
      });

      setRows([{ description: "", file: "" }]);
      handleClose();
      fetchData1();
    } catch (error) {
      let errorMessage = "An error occurred. Please try again.";

      if (error.response?.data?.message) {
        errorMessage =
          typeof error.response.data.message === "string"
            ? error.response.data.message
            : JSON.stringify(error.response.data.message);

        Swal.fire({
          icon: "error",
          title: "Failed",
          text: errorMessage,
        });
      }
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleUploadTcc = async () => {
    setPaymentLoading(true);
    try {
      const formData = new FormData();

      formData.append("tcc", selectedFile);

      const response = await axios.post(
        `${BASE_URL}/customer/upload_tcc`,
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
        title: "Success",
        text: response.data.message,
      });

      handleCloseTCC();
      handleClose20();
      // fetchallApplications();
    } catch (error) {
      let errorMessage = "An error occurred. Please try again.";

      if (error.response?.data?.message) {
        errorMessage =
          typeof error.response.data.message === "string"
            ? error.response.data.message
            : JSON.stringify(error.response.data.message);

        Swal.fire({
          icon: "error",
          title: "Failed",
          text: errorMessage,
        });
      }
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleAssessmentClick = (id) => {
    const foundReceipt = tableData.find((item) => item.id === id);
    if (foundReceipt) {
      const foundPayment = foundReceipt.payment[0];

      if (foundReceipt.service?.name === "Land Ratification") {
        navigate("/letter_of_assessment", { state: { foundPayment } });
      } else if (foundReceipt.service?.name === "Land Allocation") {
        navigate("/land_allocation_letter", { state: { foundPayment } });
      }

      setEyeClicked(true);
    }
  };

  const handleEyeClick5= (id) => {
    const foundUser = tableData.find((item) => item.id === id);
    // const foundApps = applicationDet.find((item) => item.id === id);

    if (foundUser) {
      navigate('/view_invoices', { state: { userData: foundUser } });
    }
  };


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
            <div className={classes.usrwlcm}>
              <div>
                <p className={classes.wlcm}>Payments</p>
                <p style={{marginTop: -20, }}>Here, you can seamlessly submit budget requests, track approvals, monitor financial performance, and manage transactions.</p>
              </div>
             
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
                  New Application
                </Modal.Title>
                <Button variant="close" onClick={handleCloseModal}></Button>
              </Modal.Header>
              <Modal.Body>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    alignItems: "center",
                  }}
                >
                  {/* Options */}
                  {options.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleOptionClick(index)}
                      style={{
                        backgroundColor:
                          selectedOption === index ? "#F2F2F2" : "white",
                        border:
                          selectedOption === index
                            ? "1px solid #21B55A"
                            : "1px solid #8282822B",
                        width: "100%",
                        height: "65px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "8px",
                        cursor: "pointer",
                        color: selectedOption === index ? "#21B55A" : "#828282",
                        fontSize: 16,
                        fontWeight: 500,
                        marginBottom: "10px",
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>

                <div className={classes.bottomBtnn}>
                  <div onClick={handleCloseModal} className={classes.btn1}>
                    <h1>Back</h1>
                  </div>
                  <div
                    disabled={selectedOption === null}
                    className={classes.btn2}
                    style={{
                      backgroundColor:
                        selectedOption === null ? "#CCCCCC" : "#21B55A",
                      color: selectedOption === null ? "#666666" : "white",
                      cursor:
                        selectedOption === null ? "not-allowed" : "pointer",
                    }}
                    onClick={handleSelectedDetailModal}
                  >
                    <h1>Next</h1>
                  </div>
                </div>
              </Modal.Body>
            </Modal>

            <Modal show={show20} onHide={handleClose20} size="lg" centered>
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
                <Button variant="close" onClick={handleClose20}></Button>
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
                          <button className={classes.updateBtn}>
                            Update Application
                          </button>
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
                            <th>Application Type</th>
                            <td>
                              {roless.service?.name}
                            </td>
                          </tr>
                          <tr>
                            <th>Land Location</th>
                            {/* <td>{roless.status === "0" ? <input value={landLocation} onChange={(e) => setLandLocation(e.target.value)}/> : roless.land_location}</td> */}
                            <td>
                              {roless.status === "0" ? (
                                <Row>
                                  <Col md={12}>
                                    <Form.Group controlId="landLocation">
                                      <Form.Control
                                        type="text"
                                        className={classes.optioncss}
                                        placeholder="Enter Land Location"
                                        value={landLocation}
                                        onChange={(e) =>
                                          setLandLocation(e.target.value)
                                        }
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                              ) : (
                                roless.location?.description
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th>LGA of Land</th>
                            <td>{roless.lga_of_land}</td>
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
                            <th>Proposed Development Timeline</th>
                            {/* <td>{roless.land_development_status}</td> */}
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
                            <th>Land Development Status</th>
                            {/* <td>{roless.land_development_status}</td> */}
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
                            <th>Tenement Rate Number</th>
                            <td>{roless.tenement_rate_number}</td>
                          </tr>
                          <tr>
                            <th>Estimated Development Amount</th>
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
                            <th>Length of Time of Possession of Property</th>
                            <td>
                              {roless.status === "0" ? (
                                <Row>
                                  <Col md={12}>
                                    <Form.Group controlId="lengthpossession">
                                      <Form.Control
                                        type="text"
                                        className={classes.optioncss}
                                        placeholder="Length of time for which the property has been in your possession"
                                        value={possessionLength}
                                        onChange={(e) =>
                                          setPossessionLength(e.target.value)
                                        }
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                              ) : (
                                roless.length_of_possession
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th>
                              State Capacity in Which You Own the Property
                            </th>
                            <td>
                              {roless.status === "0" ? (
                                <Row>
                                  <Col md={12}>
                                    <Form.Group controlId="lengthpossession">
                                      <Form.Control
                                        type="text"
                                        className={classes.optioncss}
                                        placeholder="e.g self built, by purchase, in inheritance, or how else"
                                        value={stateCapacity}
                                        onChange={(e) =>
                                          setStateCapacity(e.target.value)
                                        }
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                              ) : (
                                roless.property_state
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th>Value of Property</th>
                            <td>
                              {roless.status === "0" ? (
                                <Row>
                                  <Col md={12}>
                                    <Form.Group controlId="lengthpossession">
                                      <Form.Control
                                        type="text"
                                        className={classes.optioncss}
                                        placeholder="Enter property value"
                                        value={valueProperty}
                                        onChange={(e) =>
                                          setValueProperty(e.target.value)
                                        }
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                              ) : (
                                roless.value_of_property
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
                            <th>
                              Give the approximate size of any other
                              <br /> property owned by you in Ogun state
                            </th>
                            <td>
                              {roless.status === "0" ? (
                                <Row>
                                  <Col md={12}>
                                    <Form.Group controlId="lengthpossession">
                                      <Form.Control
                                        type="text"
                                        className={classes.optioncss}
                                        placeholder="Enter Size of any other property owned by you in Ogun state"
                                        value={otherProperty}
                                        onChange={(e) =>
                                          setOtherProperty(e.target.value)
                                        }
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                              ) : (
                                roless.other_property_size
                              )}
                            </td>
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
                            <th>State Property Tenant Rate Number(if any)</th>

                            <td>
                              {roless.status === "0" ? (
                                <Row>
                                  <Col md={12}>
                                    <Form.Group controlId="lengthpossession">
                                      <Form.Control
                                        type="text"
                                        className={classes.optioncss}
                                        placeholder="Enter size in sqm"
                                        value={tenant}
                                        onChange={(e) =>
                                          setTenant(e.target.value)
                                        }
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                              ) : (
                                roless.tenement_rate_number
                              )}
                            </td>
                          </tr>

                          <tr>
                            <th>Proposed Source of Fund</th>
                            <td>{roless.proposed_source_of_fund}</td>
                          </tr>

                          <tr>
                            <th>C of O Number</th>
                            <td>
                              {roless.status === "0" ? (
                                <Row>
                                  <Col md={12}>
                                    <Form.Group controlId="lengthpossession">
                                      <Form.Control
                                        type="text"
                                        className={classes.optioncss}
                                        placeholder="Enter C of O number"
                                        value={cofoNumber}
                                        onChange={(e) =>
                                          setCofONumber(e.target.value)
                                        }
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                              ) : (
                                roless.cofo_number
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th>Property State</th>
                            <td>{roless.property_state}</td>
                          </tr>
                          <tr>
                            <th>Plot Number</th>
                            <td>{roless.plot_number}</td>
                          </tr>
                          <tr>
                            <th>Ownership Capacity</th>
                            <td>{roless.ownership_capacity}</td>
                          </tr>
                          <tr>
                            <th>Allocation Date</th>
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
                            <th>Service Amount</th>
                            <td>
                              {parseFloat(roless.amount).toLocaleString(
                                "en-US",
                                {
                                  minimumIntegerDigits: 1,
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}
                            </td>
                          </tr>
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
                              <th>Payment Status</th>
                              <th>Amount</th>
                              {/* <th>Action</th> */}
                            </tr>
                          </thead>
                          <tbody style={{ whiteSpace: "nowrap" }}>
                            {payment.map((item, index) => (
                              <tr key={index}>
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
                              </tr>
                            ))}
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
            <Modal
              show={download}
              onHide={handleDownloadClose}
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
                  Download C of O
                </Modal.Title>
                <Button variant="close" onClick={handleDownloadClose}></Button>
              </Modal.Header>
              <Modal.Body>
                <iframe
                  src="/certificate_of_occupancy"
                  width="100%"
                  height="600px"
                  style={{ border: "none" }}
                  title="Certificate of Occupancy"
                />
              </Modal.Body>
            </Modal>

            <Modal
              show={show50}
              onHide={handleClose50}
              animation={false}
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Upload Document</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form style={{ marginTop: 20 }}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <div className="table-responsive" style={{ marginTop: 20 }}>
                      <table className="table m-0 bg-white display table-bordered table-striped table-hover card-table">
                        <thead>
                          <tr>
                            <th>Description</th>
                            <th>Upload Document</th>

                            <th>
                              <div style={{ textAlign: "center" }}>
                                <div
                                  className="btn btn-sm printbtninv"
                                  onClick={() => handleAddRow()}
                                >
                                  <i
                                    className="fas fa-plus"
                                    style={{
                                      color: "#17a2b8",
                                      backgroundColor: "#afe1e9",
                                      padding: 2,
                                      borderColor: "#b0d1d6",
                                      borderRadius: 5,
                                      fontSize: 12,
                                    }}
                                  ></i>
                                </div>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row, index) => (
                            <tr key={index}>
                              <td>
                                <Form.Control
                                  type="text"
                                  rows={1}
                                  placeholder="Enter Description"
                                  value={row.description}
                                  onChange={(e) =>
                                    handleChange(
                                      index,
                                      "description",
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                              <td>
                                {/* <div className={classes.fileUpload} style={{ display: 'flex', width: '100%', alignItems: 'center' }} onClick={() => fileInputRefs[index]?.click()}>
                                                                            <img src={ImageIcon} alt="icon" className={classes.leftIcon} />
                                                                            <span className={classes.uploadText}>
                                                                                {row.file ? (row.file.name.length > 30 ? row.file.name.slice(0, 30) + "..." : row.file.name) : "Upload Document"}
                                                                            </span>
                                                                            <div className={classes.uploadButton}>
                                                                                <img src={UploadIcon} alt="upload" className={classes.uploadIcon} />
                                                                            </div>
                                                                            <input
                                                                                type="file"
                                                                                accept=".pdf"
                                                                                ref={(el) => (fileInputRefs[index] = el)}
                                                                                onChange={(e) => handleFileChange(index, e)}
                                                                                className={classes.hiddenFile}
                                                                                style={{ width: '35%' }}
                                                                            />
                                                                        </div> */}

                                <div
                                  className={classes.fileUpload}
                                  style={{
                                    display: "flex",
                                    width: "100%",
                                    alignItems: "center",
                                  }}
                                  onClick={() => fileInputRefs[index]?.click()}
                                >
                                  <img
                                    src={ImageIcon}
                                    alt="icon"
                                    className={classes.leftIcon}
                                  />
                                  <span className={classes.uploadText}>
                                    {row.file
                                      ? row.file.name.length > 30
                                        ? row.file.name.slice(0, 30) + "..."
                                        : row.file.name
                                      : "Upload Document"}
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
                                    ref={(el) => (fileInputRefs[index] = el)}
                                    onChange={(e) => handleFileChange(index, e)}
                                    className={classes.hiddenFile}
                                  />
                                </div>
                              </td>
                              <td style={{ textAlign: "center" }}>
                                <div
                                  className="btn btn-danger-soft btn-sm"
                                  onClick={() => handleRemoveRow(index)}
                                >
                                  <i
                                    className="far fa-trash-alt"
                                    style={{
                                      color: "#dc3545",
                                      backgroundColor: "#dc35451a",
                                      padding: 2,
                                      borderColor: "#dc35454d",
                                      borderRadius: 5,
                                      fontSize: 12,
                                    }}
                                  ></i>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div style={{ marginTop: 10 }} />
                  </Form.Group>
                </Form>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="danger" onClick={handleClose50}>
                  Go back
                </Button>
                <Button variant="success" onClick={addNewDocument}>
                  {paymentLoading ? (
                    <>
                      <Spinner size="sm" />
                      <span style={{ marginLeft: "5px" }}>
                        Adding document, Please wait...
                      </span>
                    </>
                  ) : (
                    "Upload Document"
                  )}
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal
              show={showUploadTCC}
              onHide={handleCloseTCC}
              animation={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Upload TCC</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form style={{ marginTop: 20 }}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleTccUpload}
                      style={{
                        height: 46,
                        border: "1px solid #c4c4c4",
                        width: "100%",
                        borderRadius: 8,
                        padding: 10,
                      }}
                    />
                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <div style={{ marginTop: 10 }} />
                  </Form.Group>
                </Form>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="success" onClick={handleUploadTcc}>
                  {paymentLoading ? (
                    <>
                      <Spinner size="sm" />
                      <span style={{ marginLeft: "5px" }}>
                        Uploading, Please wait...
                      </span>
                    </>
                  ) : (
                    "Upload TCC"
                  )}
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal
              show={applicationModal1}
              onHide={handleFirstModalClose}
              size="md"
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
                  New Application
                </Modal.Title>
                <Button
                  variant="close"
                  onClick={handleFirstModalClose}
                ></Button>
              </Modal.Header>
              <Modal.Body>
                <div className={classes.modConts}>
                  <p className={classes.timeTag}>2/3</p>
                  <img
                    src={TimeLineIcon2} // Replace with the actual path to your image
                    alt="timeline"
                    style={{
                      width: "258px",
                      height: "4px",
                    }}
                  />
                </div>
                <div>
                  <h1 className={classes.propText}>
                    New Land Purchase/Allocation Application
                  </h1>
                </div>

                <Container className="mt-4">
                  <Form>
                    <Row className="mb-3">
                      <Col>
                        <Form.Group controlId="option1">
                          <Form.Label className={classes.labelTxt}>
                            Land Scheme
                          </Form.Label>
                          <Form.Select className={classes.contOption}>
                            <option value="1">
                              Hillcrest Estate, Abeokuta
                            </option>
                            <option value="2">
                              President Muhammad Buhari Estate, Kobape, Abeokuta
                            </option>
                            <option value="3">
                              Building Our Future Together (BOFT) Commercial
                              Scheme
                            </option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col>
                        <Form.Group controlId="option2">
                          <Form.Label className={classes.labelTxt}>
                            Land Use
                          </Form.Label>
                          <Form.Select className={classes.contOption}>
                            <option value="1">Residential</option>
                            <option value="2">Commercial</option>
                            <option value="3">Agricultural</option>
                            <option value="4">Industrial</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </Container>

                <div className={classes.bottomBtnn}>
                  <div
                    onClick={handleCloseApplicationModal1}
                    className={classes.btn1}
                  >
                    <h1>Back</h1>
                  </div>
                  <div
                    className={classes.btn2}
                    onClick={handleApplicationModal2}
                  >
                    <h1>Next</h1>
                  </div>
                </div>
              </Modal.Body>
            </Modal>

            <Modal
              show={applicationModal2}
              onHide={handleSecondModalClose}
              size="md"
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
                  Land Allocation Bill
                </Modal.Title>
                <Button
                  variant="close"
                  onClick={handleSecondModalClose}
                ></Button>
              </Modal.Header>
              <Modal.Body>
                <div className={classes.modConts}>
                  <p className={classes.timeTag}>3/3</p>
                  <img
                    src={TimeLineIcon3} // Replace with the actual path to your image
                    alt="timeline"
                    style={{
                      width: "258px",
                      height: "4px",
                    }}
                  />
                </div>
                <div>
                  <h1 className={classes.propText}>
                    Land Allocation Application Form Payment
                  </h1>
                </div>

                <div className={classes.billCont}>
                  <div className={classes.billDet}>
                    <h1>Application Form Fee</h1>
                    <h2>₦ 50,000</h2>
                  </div>
                  {/* <div className={classes.billDet}>
                    <h1>Quantity</h1>
                    <h2>1</h2>
                  </div> */}
                  <div className={classes.billDet}>
                    <h1>Total Amount</h1>
                    <h2>₦ 50,000</h2>
                  </div>
                </div>

                <div className={classes.bottomBtnns}>
                  <div className={classes.btn2}>
                    <h1>Make Payment</h1>
                  </div>

                  <div className={classes.btn12}>
                    <h1>Generate Invoice</h1>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
            <div>
        
           
                         <div className={classes.allcards}>
                         
                            
                               {" "}
                               <div className={classes.card}>
                                 <div className={classes.cardContent}>
                                   <h4 className={classes.title}>
                                     Overall Amount Requested
                                   </h4>
                                   <p className={classes.amount}>
                                     ₦{"000,000,00"}
                                     <span className={classes.litnmbr}>.00</span>
                                   </p>
                                   <span className={classes.percentage}>▲ 00%</span>
                                 </div>
           
                                 {/* Mini Line Chart */}
                                 {/* <div className={classes.chartContainer}>
                                                <ResponsiveContainer width="100%" height={50}>
                                                  <LineChart data={"data"}>
                                                    <Line type="linear" dataKey="value" stroke="#22C55E" strokeWidth={2} dot={false} />
                                                  </LineChart>
                                                </ResponsiveContainer>
                                              </div> */}
                               </div>
                               <div className={classes.card}>
                                 <div className={classes.cardContent}>
                                   <h4 className={classes.title}>
                                   Total Amount Approved
                                   </h4>
                                   <p className={classes.amount}>
                                     ₦{"000,000,00"}
                                     <span className={classes.litnmbr}>.00</span>
                                   </p>
                                   <span className={classes.percentage}>▲ 00%</span>
                                 </div>
           
                                 {/* Mini Line Chart */}
                                 {/* <div className={classes.chartContainer}>
                                                <ResponsiveContainer width="100%" height={50}>
                                                  <LineChart data={"data"}>
                                                    <Line type="linear" dataKey="value" stroke="#22C55E" strokeWidth={2} dot={false} />
                                                  </LineChart>
                                                </ResponsiveContainer>
                                              </div> */}
                               </div>
                               <div className={classes.card}>
                                 <div className={classes.cardContent}>
                                   <h4 className={classes.title}>
                                   Total Amount Utilized
                                   </h4>
                                   <p className={classes.amount}>
                                     ₦{"000,000,00"}
                                     <span className={classes.litnmbr}>.00</span>
                                   </p>
                                   <span className={classes.percentage}>▲ 00%</span>
                                 </div>
           
                                 {/* Mini Line Chart */}
                                 {/* <div className={classes.chartContainer}>
                                                <ResponsiveContainer width="100%" height={50}>
                                                  <LineChart data={"data"}>
                                                    <Line type="linear" dataKey="value" stroke="#22C55E" strokeWidth={2} dot={false} />
                                                  </LineChart>
                                                </ResponsiveContainer>
                                              </div> */}
                               </div>
                            
                     
                         </div>
                       </div>
           

          
                    
                                <div
                                  className={
                                    isDarkMode
                                      ? classes.applicationHistory1
                                      : classes.applicationHistory
                                  }
                                >
                                  <div className={classes.hortrstns}>
                                    <h1 className={classes.recenttrsd}>My Payment</h1>
                                    <div className={classes.midDiv}>
                                      <div className={classes.divSearch}>
                                        <img
                                          src={search}
                                          alt="search"
                                          className={classes.searchIcon}
                                        />
                                        <input
                                          type="text"
                                          placeholder="Search"
                                          className={classes.search}
                                        />
                                      </div>
                                      <Form.Select
                                        id="status"
                                        style={{
                                          width: 100,
                                          height: 40,
                                          borderRadius: 8,
                                          fontSize: 12,
                                          border: "1px solid #E0E0E0",
                                          fontWeight: 400,
                                          color: "#4F4F4F",
                                          padding: "0.5rem",
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
                                        Pick date{" "}
                                        <img
                                          src={Calender}
                                          className={classes.imgss}
                                          alt="calender icon"
                                        />
                                      </button>
                    
                                      <label
                                        style={{
                                          fontSize: 14,
                                          color: " #828282",
                                          fontWeight: 600,
                                          gap: 10,
                                          borderRadius: 8,
                                          // backgroundColor: '#F2F2F2',
                                          marginLeft: 10,
                                        }}
                                      >
                                        <div className={classes.divBtn}>
                                          <div className={classes.divOne}>
                                            <div className={classes.stIC}>
                                              <p className={classes.stN}>Export</p>
                                              <img
                                                src={xport}
                                                alt="status"
                                                className={classes.filter}
                                              />
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
                                        <Placeholder className="w-75" />{" "}
                                        <Placeholder classes={{ width: "25%" }} />
                                      </>
                                    ) : tableData?.length === 0 ? (
                                      <div className={classes.notFound}>
                                        <img src={notransaction} alt="not-found" />
                                        <p>No Applications found</p>
                                      </div>
                                    ) : (
                                      <div>
                                        <table classes={{ width: "98%" }}>
                                          <thead classes={{ whiteSpace: "nowrap" }}>
                                            <tr>
                                              <th classes={{ color: isDarkMode && "white" }}>
                                                S/N
                                              </th>
                                              <th classes={{ color: isDarkMode && "white" }}>
                                                Application Number
                                              </th>
                                              <th classes={{ color: isDarkMode && "white" }}>
                                                Application Type
                                              </th>
                                              <th classes={{ color: isDarkMode && "white" }}>
                                                Submission Date
                                              </th>
                                              <th classes={{ color: isDarkMode && "white" }}>
                                                Application Status
                                              </th>
                                              <th classes={{ color: isDarkMode && "white" }}>
                                                Payment Status
                                              </th>
                                              <th classes={{ color: isDarkMode && "white" }}>
                                                Approval Required by
                                              </th>
                                              {/* <th classes={{ color: isDarkMode && "white" }}>Amount</th> */}
                                              <th></th>
                                            </tr>
                                          </thead>
                    
                                          <tbody style={{ whiteSpace: "wrap" }}>
                                            {tableData?.map((rowId, index) => (
                                              <tr
                                                key={rowId}
                                                style={{
                                                  backgroundColor:
                                                    index % 2 !== 0
                                                      ? "rgba(30, 165, 82, 0.1)"
                                                      : "transparent",
                                                }}
                                              >
                                                <td style={{ padding: 10 }}>{index + 1}</td>
                                                <td style={{ padding: 10 }}>{rowId.uuid}</td>
                                                <td style={{ padding: 10 }}>
                                                  {rowId?.description}
                                                </td>
                                                <td style={{ padding: 10 }}>
                                                  {formatDate(rowId.updated_at)}
                                                </td>
                                                <td style={{ padding: 10 }}>
                                                  {rowId.approval_status === 0
                                                    ? "Ongoing"
                                                    : "Completed"}
                                                </td>
                                                <td style={{ padding: 10 }}>
                                                  {rowId.payment_status === "0" ? "Unpaid" : "Paid"}
                                                </td>
                                                <td style={{ padding: 10 }}>
                                                  {rowId.payment_status === "0"
                                                    ? "Awaiting your Payment"
                                                    : rowId.payment_status === "1" &&
                                                      rowId.approval_status === "0"
                                                    ? rowId.role?.name
                                                    : rowId.payment_status === "1" &&
                                                      rowId.approval_status === "1"
                                                    ? "Approved"
                                                    : null}
                                                </td>
                                                {/* <td style={{ padding: 10 }}>₦528,861.00</td> */}
                                                <td
                                                  style={{ padding: 10 }}
                                                  className={classes.moreTxt}
                                                >
                                                  <div
                                                    style={{ position: "relative" }}
                                                    className={classes.menuWeb}
                                                  >
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
                                                          boxShadow:
                                                            "0px 4px 8px rgba(0, 0, 0, 0.2)",
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
                                                            whiteSpace: "nowrap",
                                                          }}
                                                          onClick={() => handleEyeClick5(rowId.id)}
                                                        >
                                                          <img
                                                            src={Printer}
                                                            alt="invoice"
                                                            style={{
                                                              width: "20px",
                                                              marginRight: "10px",
                                                            }}
                                                          />
                                                          View Invoice
                                                        </div>
                                                        <div
                                                          onClick={() => {
                                                            handleEyeClick(
                                                              rowId.id,
                                                              rowId?.apptype?.description
                                                            );
                                                            handleMoreClick(null);
                                                          }}
                                                          style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            padding: "5px 10px",
                                                            cursor: "pointer",
                                                            textAlign: "left",
                                                            whiteSpace: "nowrap",
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
                                                <th classes={{ color: isDarkMode && "white" }}>
                                                  S/N
                                                </th>
                                                <th classes={{ color: isDarkMode && "white" }}>
                                                  Application Number
                                                </th>
                                                <th classes={{ color: isDarkMode && "white" }}>
                                                  Application Type
                                                </th>
                                                <th classes={{ color: isDarkMode && "white" }}>
                                                  Submission Date
                                                </th>
                                                <th classes={{ color: isDarkMode && "white" }}>
                                                  Status
                                                </th>
                                                <th classes={{ color: isDarkMode && "white" }}>
                                                  Approval Required by
                                                </th>
                                                <th classes={{ color: isDarkMode && "white" }}>
                                                  Amount
                                                </th>
                                                <th></th>
                                              </tr>
                                            </thead>
                                            <tbody style={{ whiteSpace: "wrap" }}>
                                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                                                (rowId, index) => (
                                                  <tr
                                                    key={rowId}
                                                    style={{
                                                      backgroundColor:
                                                        index % 2 !== 0
                                                          ? "rgba(30, 165, 82, 0.1)"
                                                          : "transparent",
                                                    }}
                                                  >
                                                    <td style={{ padding: 10 }}>{rowId}</td>
                                                    <td style={{ padding: 10 }}>
                                                      ACME MEDICARE CLINICS LTD
                                                    </td>
                                                    <td style={{ padding: 10 }}>
                                                      January 2025 Monthly PAYE Returns
                                                    </td>
                                                    <td style={{ padding: 10 }}>₦528,861.00</td>
                                                    <td style={{ padding: 10 }}>₦528,861.00</td>
                                                    <td style={{ padding: 10 }}>0003000178320</td>
                                                    <td style={{ padding: 10 }}>
                                                      {/* <img
                                                              className={classes.statusIconsuccess}
                                                              src={succesful}
                                                              alt="status"
                                                          /> */}
                                                      <td
                                                        style={{ padding: 10 }}
                                                        className={classes.info1}
                                                      >
                                                        <p
                                                          className={`${classes["status-success"]} ${classes.info}`}
                                                        >
                                                          Approved
                                                        </p>
                                                      </td>
                                                    </td>
                    
                                                    <td
                                                      style={{ padding: 10 }}
                                                      className={classes.moreTxt}
                                                    >
                                                      <div
                                                        style={{ position: "relative" }}
                                                        className={classes.menuWeb}
                                                      >
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
                                                              boxShadow:
                                                                "0px 4px 8px rgba(0, 0, 0, 0.2)",
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
                                                                style={{
                                                                  width: "20px",
                                                                  marginRight: "10px",
                                                                }}
                                                              />
                                                              View Invoice
                                                            </div>
                                                          </div>
                                                        )}
                                                      </div>
                                                    </td>
                                                  </tr>
                                                )
                                              )}
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
                                          <label
                                            classes={{
                                              fontSize: 14,
                                              color: isDarkMode ? "#ffffff" : "#333333",
                                              fontWeight: 600,
                                              gap: 10,
                                            }}
                                            className="d-flex justify-content-start align-items-center"
                                          >
                                            Showing
                                            <Form.Select
                                              classes={{
                                                width: 114,
                                                height: 44,
                                                borderRadius: 8,
                                                fontSize: 14,
                                                fontWeight: 600,
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
                                              <option value={10}>10 entries</option>
                                              <option value={25}>25 entries</option>
                                              <option value={50}>50 entries</option>
                                              <option value={100}>100 entries</option>
                                            </Form.Select>
                                          </label>
                                        </div>
                                      </div>
                    
                                      <div className={classes.btmPagination}>
                                        <div classes={{ display: "flex" }}>
                                          <button
                                            classes={{
                                              textAlign: "center",
                                              border: "1px solid #F1F1F1",
                                              backgroundColor: "#fff",
                                              borderRadius: 8,
                                              height: "32px",
                                              width: "32px",
                                              fontWeight: 700,
                                              fontSize: 14,
                                              color: "#000000",
                                              cursor: "pointer",
                                            }}
                                            // onClick={handlePrevPage}
                                            disabled={currentPage === 1}
                                          >
                                            {"<"}
                                          </button>
                                          {[...Array(totalPages)].map((_, page) => {
                                          
                                            if (
                                              page < 3 ||
                                              page === currentPage - 1 ||
                                              page === totalPages - 1
                                            ) {
                                              return (
                                                <button
                                                  key={page + 1}
                                                  classes={{
                                                    textAlign: "center",
                                                    marginLeft: "0.4rem",
                                                    marginRight: "0.4rem",
                                                    fontSize: "14px",
                                                    fontWeight: 700,
                                                    color:
                                                      page + 1 === currentPage
                                                        ? "#ffffff"
                                                        : "#333333",
                                                    backgroundColor:
                                                      page + 1 === currentPage ? "#21B55A" : "#fff",
                                                    height: "32px",
                                                    borderRadius: "8px",
                                                    //   padding: '0.5rem',
                                                    border: "1px solid #F1F1F1",
                                                    width: "32px",
                                                    cursor: "pointer",
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
                                            classes={{
                                              textAlign: "center",
                                              border: "1px solid #F1F1F1",
                                              backgroundColor: "#fff",
                                              borderRadius: 8,
                                              height: "32px",
                                              width: "32px",
                                              fontWeight: 700,
                                              fontSize: 14,
                                              color: "#000000",
                                              cursor: "pointer",
                                            }}
                                            onClick={handleNextPage}
                                            disabled={currentPage === totalPages}
                                          >
                                            {">"}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  
                                </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllPayment;
