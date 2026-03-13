import React, { useState, useEffect, useRef } from "react";
import DashboardNav from "../../Components/Navigation.js/Navigation";
import Horheader from "../../Components/horheader/horheader";
import classes from "./NewApplications.module.css";
import PdfIcon from "../../Asset/pdf.svg";
import UploadIcon from "../../Asset/upload.png";
import agent from "../../Asset/agent.svg";
import Allocation from "../../Asset/allocation.png";
import Property from "../../Asset/property.png";
import Private from "../../Asset/privatecofo.png";
import Transaction from "../../Asset/transaction.png";
import Ratification from "../../Asset/ratification.png";
import Governor from "../../Asset/governor.png";
import LandSearch from "../../Asset/landsearch.png";
import HOC from "../../Asset/hoc.png";
import crop from "../../Asset/repoort.png";
import verified from "../../Asset/tick-circle.png";
import CurrencyInput from "react-currency-input-field";
import { useTheme } from '../../ThemeContext';
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
import { COUNTRIES, STATES, LGA } from "../../API/country";
// import NewApplications from '../New Application/NewApplicationns';
import Select from 'react-select';
import { FiCopy } from 'react-icons/fi';







const NewApplications = () => {
  const [loadingStates, setLoadingStates] = useState(false);
  const [cofO,setCofO] = useState(false)
  // const [loadingStates, setLoadingStates] = useState({});
  const [schemes, setSchemes] = useState([]);
  const [consentTypes, setConsentTypes] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [serviceFee, setServiceFee] = useState([]);
  const [caveatTypes, setCaveatTypes] = useState([]);
  const [measurement, setMeasurement] = useState([]);
  const [show, setShow] = useState(false);
  const [showSelection, setShowSelection] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [showCert, setShowCert] = useState(false);
  const [showScheme, setShowScheme] = useState(false);
  const [showCopy, setShowCopy] = useState(false);
  const [showChartInfo, setShowChartInfo] = useState(false);
  const [showLandInfo, setShowLandInfo] = useState(false);
  const [show30, setShow30] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [roleLoading, setRoleLoading] = useState(false);
  const [show10, setShow10] = useState(false);
  const [show20, setShow20] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseSelection = () => setShowSelection(false);
const [sizeError, setSizeError] = useState(false);
  const handleClosePaymentModal = () => setShowPaymentModal(false);
  const handleCloseCert = () => setShowCert(false);
  const handleCloseScheme = () => setShowScheme(false);
  const handleCloseCopy = () => setShowCopy(false);
  const handleCloseConfirm = () => setShowConfirm(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showCaveat, setShowCaveat] = useState(false);
  const handleShowSearch = () => setShowSearch(true);
  const handleShowSelection = () => setShowSelection(true);
  const handleShowPaymentModal = () => setShowPaymentModal(true);
  const handleShowCaveat = () => setShowCaveat(true);
  const handleCloseChartInfo = () => setShowChartInfo(false);
  const handleCloseLandInfo = () => setShowLandInfo(false);
  const handleClose30 = () => setShow30(false);
  const handleClose10 = () => setShow10(false);
  const handleClose20 = () => setShow20(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const [show56, setShow56] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleShow10 = () => setShow10(true);
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const handleCloseSearch = () => setShowSearch(false);
  const handleCloseCaveat = () => {
    console.log("Closing modal...");
    setShowCaveat(false);
  };
  const [show4, setShow4] = useState(false);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);
  const [show5, setShow5] = useState(false);
  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);
  const [show6, setShow6] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState('');
  const handleClose6 = () => setShow6(false);
  const handleShow6 = () => setShow6(true);
  const [show7, setShow7] = useState(false);
  const [show57, setShow57] = useState(false);
  const handleClose7 = () => setShow7(false);
  const handleClose57 = () => setShow57(false);
  const handleShow7 = () => setShow7(true);
  const handleShow57 = () => setShow57(true);
  const [show8, setShow8] = useState(false);
  const handleClose8 = () => setShow8(false);
  const handleShow8 = () => setShow8(true);
  const [bearer, setBearer] = useState("");
  const [userType, setUserType] = useState("");
  const [selectedScheme, setSelectedScheme] = useState("");
  const [cofoType, setCofoType] = useState([]);
  const [bearer1, setBearer1] = useState("");
  const [expensesConsent, setExpensesConsent] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const [responseData, setResponseData] = useState([]);
  const [responseData1, setResponseData1] = useState([]);
  const [responseData2, setResponseData2] = useState([]);
  const [responseData3, setResponseData3] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableData32, setTableData32] = useState([]);
  const [allApplications, setAllApplications] = useState([]);
  const [tableData1, setTableData1] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [propertySize, setPropertySize] = useState("");
  const [cofoNumber, setCofONumber] = useState("");
  const [selectedPropertyOwnership, setSelectedPropertyOwnership] =
    useState("");
  const [clockTime, setClockTime] = useState(false);
  const [personal, setPersonal] = useState({});
  const handleClockTime = () => {
    setClockTime(!clockTime);
  };
  
  const [showLandUseModal, setShowLandUseModal] = useState(false);
const [selectedLandUseType, setSelectedLandUseType] = useState("");
  const navigate = useNavigate();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState({});
  // const [detailsLoading, setDetailsLoading] = useState(false);
  const [benLoading, setBenLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const [createLoading, setCreateLoading] = useState(false);
  const [selectedLGA, setSelectedLGA] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedAreaName, setSelectedAreaName] = useState("");
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [selectedStation, setSelectedStation] = useState("");
  const [selectedStationName, setSelectedStationName] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedLocationName, setSelectedLocationName] = useState("");
  const [selectedDevelopment, setSelectedDevelopment] = useState("");
  const [selectedLandUse, setSelectedLandUse] = useState("");
  const [selectedLandStatus, setSelectedLandStatus] = useState("");
  const [selectedBuildingType, setSelectedBuildingType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [landLocation, setLandLocation] = useState("");
  const [pageNumber, setPageNumber] = useState("");
  const [pageNumber1, setPageNumber1] = useState("");
  const [volumeNumber1, setVolumeNumber1] = useState("");
  const [volumeNumber, setVolumeNumber] = useState("");
  const [reason, setReason] = useState("");
  const [capitalAmount, setCapitalAmount] = useState("");
  const [premiumAmount, setPremiumValue] = useState("");
  const [documentAmount, setDocumentValue] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [attestation, setAttestation] = useState(false);
  const [allocationDate, setAllocationDate] = useState("");
  const [timeLine, setTimeLine] = useState("");
  const [sizePlot, setSizePlot] = useState("");
  const [selectedNature, setSelectedNature] = useState("");
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
  const [selectedFile15, setSelectedFile15] = useState(null);
  const [selectedFile40, setSelectedFile40] = useState(null);
  const [selectedFile30, setSelectedFile30] = useState(null);
  const [selectedFile20, setSelectedFile20] = useState(null);
  const [selectedFile50, setSelectedFile50] = useState(null);
  const [selectedFile60, setSelectedFile60] = useState(null);
  const [selectedFile70, setSelectedFile70] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [allLands, setAllLands] = useState([]);
  const [serviceDetails, setServiceDetails] = useState({});
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const totalPages = 10; // Total number of pages
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleDropdown, setVisibleDropdown] = useState(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
const [selectedCustomerId, setSelectedCustomerId] = useState("");
const [customerSearch, setCustomerSearch] = useState("");
const [customersList, setCustomersList] = useState([]);
  const [selectedApp, setSelectedApp] = useState({ id: null, name: null });

 

  const readData = async () => {
    try {
      const detail = await localStorage.getItem("userName");
      const details = await localStorage.getItem("userToken");
      const detailss = await localStorage.getItem("userType");

      if (detail !== null) {
        // const firstName = detail.split(' ')[0];
        setName(detail);
      }

      if (details !== null) {
        setBearer(details);
      }
      if (detailss !== null) {
        setUserType(detailss);
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
  
const fetchServiceDetails = async (id, name, customerId = null, ) => {
    setDetailsLoading((prev) => ({ ...prev, [id]: true }));

    try {
        const endpoint = `${BASE_URL}/all-service-requirements`;
        
        // Always include service_id
        const params = { service_id: id };

        // For all users (both regular and agent)
        if (selectedLandUseType) {
            params.application_type = selectedLandUseType;
        }

        // Special case for Certificate of Occupancy
        if (name === "Private CofO") {
            params.cofo_type = selectedLandStatus;
        }
        if (name === "Land Information" || "Charting Information") {
            params.size_in_plot = sizePlot;
             params.size_in_sqm = selectedUnit;
        }

        if (name === "Land Ratification" || "Open Land Allocation") {
            params.size_in_plot = sizePlot;
        }
        
        if (name?.trim() === "Governor's Consent") {
            params.express_consent = expensesConsent;
            params.grant_type = selectedType;
        }
        if (name === "Scheme Allocation") {
            params.scheme_id = selectedScheme;
        }

        // Additional parameter for agents only
        if (userType === "agent") {
            params.customer_id = selectedCustomerId.value;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${bearer}`,
            },
            params: params
        };

        console.log("Request params:", params); // Debugging

        const response = await axios.get(endpoint, config);

        // Process response data
        const results = response.data?.data[0] || {};
        const resultss = results?.requirements || [];
        const resultsss = results?.service_fees || [];

        // Update state
        setServiceDetails(results);
        setRequirements(resultss);
        setServiceFee(resultsss);
        setShowConfirmationModal(true);
      

    } catch (error) {
        console.error("API Error:", error.response?.data?.message || "Error fetching data");
        setServiceDetails(null);
    } finally {
        setDetailsLoading((prev) => ({ ...prev, [id]: false }));
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

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/agent/clients`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearer}`,
          },
        }
      );

      const results = response.data?.data || [];
      setCustomersList(results);
      console.log(results);
    } catch (error) {
      console.error(error.response?.data?.message || "Error fetching data");
      setCustomersList([]);
    }
  };

  useEffect(() => {
    if (bearer) {
      fetchCaveatTypes();
      fetchGovernorsType();
      fetchServiceDetails();
      fetchCustomers();
    }
  }, [bearer]);

  const customerOptions = customersList.map(customer => ({
    value: customer.customer_id,
    label: customer.customer_name,
    
  }));

  

  const handleCustomers = (selectedOption) => {
setSelectedCustomerId(selectedOption)
}



  const filterOption = (option, inputValue) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase());

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
          `${BASE_URL}/customer/fetch-all-schemes`,
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

useEffect(() => {
  const appName = selectedApp?.name?.trim();
  const size = parseFloat(sizePlot);

  const timeout = setTimeout(() => {
    if (appName === "Land Ratification" && size > 5000) {
      Swal.fire({
        title: "Invalid Size",
        text: "Size of land exceeds limit for Land Ratification. Please apply for Open Land Allocation instead.",
        icon: "error",
        allowOutsideClick: true, // lets user click outside to close
        allowEscapeKey: true,
      });
      setSizeError(true);
    } else if (appName === "Open Land Allocation" && size > 0 && size < 5000) {
      Swal.fire({
        title: "Invalid Size",
        text: "Size of land is too small for Open Land Allocation. Please apply for Land Ratification instead.",
        icon: "error",
        allowOutsideClick: true,
        allowEscapeKey: true,
      });
      setSizeError(true);
    } else {
      setSizeError(false);
    }
  }, 1000); // 1000 ms = 1 second delay after typing

  return () => clearTimeout(timeout); // clean up on new input
}, [sizePlot, selectedApp]);



  const handleLandStatus = (e) => {
    setSelectedLandStatus(e.target.value);
    // setShowErrorMessage(false);
  };

  const handleScheme = (e) => {
    setSelectedScheme(e.target.value);
    // setShowErrorMessage(false);
  };

    const fetchMeasurement = async () => {
      // setRoleLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/get_land_sizes`, { headers });
        const results = response.data?.data;
        // console.log(results, "measurement");
        setMeasurement(results);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Redirect to login page if unauthorized
          // navigate("/");
        } else {
          const errorStatus = error.response?.data?.message;
          console.log(errorStatus);
          setMeasurement([]);
        }
      } finally {
        // setRoleLoading(false);
      }
    };

     useEffect(() => {
        if (bearer) {
          fetchMeasurement();
        }
      }, [bearer]);



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

 





  const handleGenerateNewInvoice = async (id, name) => {
    console.log(id,name)
    if (name === "Private CofO" && !selectedLandStatus) {
      setSelectedAppId(id); // Save id for later
      setShowSelection(true); // Open modal
      return;
    }
  
    setLoadingStates(true);
    // setLoadingStates((prev) => ({ ...prev, [id]: true }));
    try {
      const formData = new FormData();

      formData.append("service_id", id);
      // formData.append("application_type", selectedLandUseType);

      if (selectedLandStatus) {
        formData.append("cofo_type", selectedLandStatus);
      }
      if (selectedLandUseType) {
        formData.append("application_type", selectedLandUseType);
      }
      if (selectedApp?.name?.trim() === "Governor's Consent") {
        formData.append("express_consent", expensesConsent);
        formData.append("grant_type", selectedType);
      }
      if (selectedApp?.name?.trim() === "Governor's Consent Assignment") {
        formData.append("express_consent", expensesConsent);
        // formData.append("grant_type", selectedType);
      }
      if (selectedApp?.name?.trim() === "Governor's Consent Mortgage") {
        formData.append("express_consent", expensesConsent);
        // formData.append("grant_type", selectedType);
      }
      if (selectedApp?.name?.trim() === "Governor's Consent Sublease") {
        formData.append("express_consent", expensesConsent);
        // formData.append("grant_type", selectedType);
      }

      if (selectedApp?.name === "Land Information" || "Charting Information") {
            formData.append("size_in_plot", sizePlot);
            formData.append("size_in_sqm", selectedUnit);
        }
      if (selectedApp?.name === "Land Ratification" || "Open Land Allocation") {
            formData.append("size_in_plot", sizePlot);
        }
      
  if (selectedApp?.name === "Scheme Allocation") {
        formData.append("scheme_id", selectedScheme);
      }

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${bearer}`,
      };

      const response = await axios.post(
        `${BASE_URL}/application/generate-invoice`,
        formData,
        { headers }
      );

      const resultssss = response.data.data[0];
      const result = response.data.data[1];
      const resultss = response.data.data[2];
      const resultssxx = response.data.data[1].payment_url;
      const resultss12 = response.data.data[3];
      setResponseData(result);
      setResponseData1(resultss);
      setResponseData2(resultssss);
      setResponseData3(resultss12);
      setPaymentUrl(resultssxx);

      console.log(resultssxx);

      setShowConfirmationModal(false);
      handleShow10();
        setSelectedLandUseType('');
      
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
      setLoadingStates(false);
      // setLoadingStates((prev) => ({ ...prev, [id]: false }));
      setSelectedLandStatus(null);
    }
  };


  
  const handleAgentGenerateNewInvoice = async (id, name, customerId ) => {
    console.log(id, name)
    
    if (name === "Private CofO" && !selectedLandStatus) {
      setSelectedAppId(id); // Save id for later
      setShowSelection(true); // Open modal
      return;
    }

    setLoadingStates(true);
    // setLoadingStates((prev) => ({ ...prev, [id]: true }));
    try {
      const formData = new FormData();

      formData.append("service_id", id);
      formData.append("customer_id", customerId);
      // formData.append("application_type", selectedLandUseType);

      if (selectedLandStatus) {
        formData.append("cofo_type", selectedLandStatus);
      }
      if (selectedLandUseType) {
        formData.append("application_type", selectedLandUseType);
      }
      if (selectedApp?.name === "Scheme Allocation") {
        formData.append("scheme_id", selectedScheme);
      }
      if (selectedApp?.name?.trim() === "Governor's Consent") {
        formData.append("express_consent", expensesConsent);
        formData.append("grant_type", selectedType);
      }
      if (selectedApp?.name?.trim() === "Governor's Consent Assignment") {
        formData.append("express_consent", expensesConsent);
        // formData.append("grant_type", selectedType);
      }
      if (selectedApp?.name?.trim() === "Governor's Consent Mortgage") {
        formData.append("express_consent", expensesConsent);
        // formData.append("grant_type", selectedType);
      }
      if (selectedApp?.name?.trim() === "Governor's Consent Sublease") {
        formData.append("express_consent", expensesConsent);
        // formData.append("grant_type", selectedType);
      }

       if (selectedApp?.name === "Land Information" || "Charting Information") {
            formData.append("size_in_plot", sizePlot);
            formData.append("size_in_sqm", selectedUnit);
        }

         if (selectedApp?.name === "Land Ratification" || "Open Land Allocation") {
            formData.append("size_in_plot", sizePlot);
        }

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${bearer}`,
      };

      const response = await axios.post(
        `${BASE_URL}/agent/generate-invoice`,
        formData,
        { headers }
      );

      const resultssss = response.data.data[0];
      const result = response.data.data[1];
      const resultss = response.data.data[2];
      const resultssxx = response.data.data[1].payment_url;
      const resultss12 = response.data.data[3];
      setResponseData(result);
      setResponseData1(resultss);
      setResponseData2(resultssss);
      setResponseData3(resultss12);
      setPaymentUrl(resultssxx);

      console.log(resultssxx);

      setShowConfirmationModal(false);
      handleShow10();
      setSelectedLandUseType('');
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
      setLoadingStates(false);
      // setLoadingStates((prev) => ({ ...prev, [id]: false }));
      setSelectedLandStatus(null);
    }
  };



  const handleErrorClose = () => {
    setShowModalError(false);
    handleShowPaymentModal();
  };

 
  
  const handlePrevPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const handleGenerateInvoice = () => {
    navigate("/generated_invoice", {
      state: { responseData, responseData1, responseData2, responseData3 },
    });
    // navigate('/invoice-receipt');
  };



  const handleNextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, totalPages));
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
      const response = await axios.get(`${BASE_URL}/applications/all-services`, { headers });
      const results = response.data?.data?.apptypes;
  
      // 🔥 Filter out applications with id 5 and 10
      const filteredResults = results?.filter(app => app.id !== 5 && app.id !== 10);
  
      setAllApplications(results);
      console.log(results);
  
    } catch (error) {
      if (error.response && error.response.status === 401) {
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




  const handleContinueFromModal = () => {
   
    if (!selectedLandStatus) {
      Swal.fire({
        title: "Oops!",
        text: "Please select a type of C of O before continuing.",
        icon: "warning",
      });
      return;
    }
    fetchServiceDetails(selectedApp.id, "Private CofO");
    setShowConfirmationModal(true);
    
    
    setShowSelection(false);
  };

   const handleGovernorType = (e) => {
    setSelectedType(e.target.value);
    // setShowErrorMessage(false);
  };

  

  // console.log(allApplications)
  const { isDarkMode} = useTheme();
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
        
            <div style={{ marginTop: 20 }} />
            <div className={isDarkMode ? classes.layoutcardss : classes.layoutcards}>
              <div className={classes.servicesCont}>
                        <h2  className={isDarkMode ? classes.sectionTitles : classes.sectionTitle}> 
                          Services Offered by <span>MPPUD</span>
                          </h2>
                          <p className={isDarkMode ? classes.sectionSubtitles : classes.sectionSubtitle}>
                          Seamless urban planning at your fingertips! 
                          The Ministry of Physical Planning and Urban Development offers services such as 
                          land allocation, property registration processing, 
                          development control, and transaction tracking to ensure 
                          organized and sustainable growth and more with MPPUD.
                          </p>
                          </div>
                       
            <div className={classes.layoutcard}>
              {roleLoading
                ? // Display placeholders when loading
                  Array.from({ length: 10 }).map((_, index) => (
                    <div key={index}>
                      <Card>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                          <Placeholder as={Card.Title} animation="wavy">
                            <Placeholder xs={6} />
                          </Placeholder>
                          <Placeholder as={Card.Text} animation="wavy">
                            <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                            <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                            <Placeholder xs={8} />
                          </Placeholder>
                          <Placeholder.Button variant="primary" xs={6} />
                        </Card.Body>
                      </Card>
                    </div>
                  ))
                : // Display actual data when loading is false
                  allApplications.map((application, index) => (
                    <div
                      key={index}
                      className={isDarkMode ? classes.card1 : classes.card}
                      // onClick={() =>
                      //   handleClicks(application.id, application.name)
                      // }
                    >
                      <div className={classes.imageContt}>
                        {/* <img
                          src={images[index % images.length]}
                          alt="icon"
                          className={classes.icon}
                        /> */}
                        <div>
                          <h3
                            className={isDarkMode ? classes.cardTitle1 : classes.cardTitle}
                            style={{ wordWrap: "break-word" }}
                          >
                            {application.description} Application
                          </h3>
                        </div>
                      </div>
                      <p
                        className={isDarkMode ? classes.textPrg1 : classes.textPrg}
                        style={{ wordWrap: "break-word" }}
                      >
                        To apply for{" "}
                        <span style={{ fontWeight: 700 }}>
                          {application.description}
                        </span>
                        ; <br />
                        1. Click the Apply Button. <br />
                        2. Fill the required application.  <br />
                        3. Click on Preview and Submit the application.
                        {/* {application.description} */}
                      </p>
                      <div className={classes.bottomBtn}>
                        <Button
  onClick={() => {
    const selectedAppData = { id: application.id, name: application.name };
    setSelectedApp(selectedAppData);
   
    if (application.id == 4) {
      // window.open("https://www.marketplace.iledoola.inits.xyz/marketsquare", "_blank");
      navigate('/applications_building_permit');
      // setDetailsLoading(false);
    } else if (application.id == 9) {
      navigate('/applications_luc_towers_mass');
      // setDetailsLoading(false);
    } else if (application.id == 10) {
      navigate('/applications_luc_major_apps');
      // setDetailsLoading(false);
    } else if (application.id == 11) {
      navigate('/applications_opticsfibre_pipelines');
      // setDetailsLoading(false);
    } else if (application.id == 12) {
      navigate('/applications_master_plan_permit');
      // setDetailsLoading(false);
    } else if (application.id == 13) {
      navigate('/applications_plan_information');
      // setDetailsLoading(false);
    } else if (application.id == "⁠Split My Tokenised Property") {
      window.open("", "_blank");
      setDetailsLoading(false);
    }
    else if(application.name === "Private CofO") {
      setShowSelection(true);
    }
     else if (
      (application.name === "Power of Attorney" ||
       application.name === "Registration of Court Judgement" ||
       application.name === "Registration of Document/instrument" ||
       application.name === "Home Owners' Charter (HOC) New" ||
       application.name === "Home Owners' Charter (HOC) (PAID)" ||
       application.name === "Certified True Copy" ||
       application.name === "Caution") &&
      userType === "agent"
    ) {
      setShowCustomerModal(true); // Show customer modal first for agents
    }
   else if (
      application.name === "Power of Attorney" ||
      application.name === "Registration of Court Judgement" ||
      application.name === "Registration of Document/instrument" ||
      application.name === "Home Owners' Charter (HOC) New" ||
      application.name === "Home Owners' Charter (HOC) (PAID)" ||
      application.name === "Search" ||
      application.name === "Certified True Copy" ||
// application.name === "Land Information" ||
//        application.name === "Charting Information" ||
      application.name === "Caution"
    ) {
      fetchServiceDetails(application.id, application.name);
    }
    else if(userType === "agent") {
      // For agents, show customer selection modal first for other applications
      setShowCustomerModal(true);
    } 
    else {
      // Show land use modal first for regular users for other applications
      setShowLandUseModal(true);
    }
  }}
  variant="success"
  className={classes.appBtn}
>
  {detailsLoading[application.id] ? (
    <>
      <Spinner size="sm" />
    </>
  ) : (
    "Apply"
  )}
</Button>
                        {/* <Button
                          onClick={() =>
                            handleNewClicks(application.id, application.name)
                          }
                          variant="success"
                          className={classes.appBtn}
                        >
                          Apply
                        </Button> */}
                      </div>
                    </div>
                  ))}
            </div>
            </div>

            <Modal show={showCustomerModal} onHide={() => setShowCustomerModal(false)}>
  <Modal.Header style={{borderBottom: "none"}} closeButton>
    {/* <Modal.Title style={{fontSize: 20, fontWeight: 900, borderBottom: 'none'}}>Select Customer</Modal.Title> */}
  </Modal.Header>
  <Modal.Body>
  <Form.Label>Customer</Form.Label>
  <Select
      options={customerOptions}
      value={selectedCustomerId}
      // value={customerOptions.find(opt => opt.value === selectedCustomer?.id) || null}
      onChange={(selectedOption) => setSelectedCustomerId(selectedOption)}
      // onChange={handleCustomers}
      placeholder="Search customers..."
      // isClearable
      filterOption={filterOption}
    />
    {/* Only show Land Use Type dropdown if the application is NOT in the excluded list */}
{!(
  selectedApp.name === "Power of Attorney" ||
  selectedApp.name === "Registration of Court Judgement" ||
  selectedApp.name === "Registration of Document/instrument" ||
  selectedApp.name === "Home Owners' Charter (HOC) New" ||
  selectedApp.name === "Search" ||

  selectedApp.name === "Home Owners' Charter (HOC) (PAID)" ||
  selectedApp.name === "Caution"
) && (
  <>
  {selectedApp?.name !== "Land Information" && selectedApp?.name !== "Charting Information" ? (
  <>
    <Form.Label style={{ marginTop: 10 }}>Land Use Type</Form.Label>
    <Form.Select
      value={selectedLandUseType}
      onChange={(e) => setSelectedLandUseType(e.target.value)}
      className={classes.optioncss}
    >
      <option value="">Select Land Use Type</option>
      {allLands.map((land, index) => (
        <option key={index} value={land.id}>
          {land.name}
        </option>
      ))}
    </Form.Select>
      </>
) : null}
{(selectedApp?.name === "Land Information" || selectedApp?.name === "Charting Information" || selectedApp?.name === "Land Ratification" || selectedApp?.name === "Open Land Allocation") && (
  <>
    <Form.Label>Size of Land {" "}
  {["Land Ratification", "Open Land Allocation"].includes(selectedApp?.name) && "(In Square Meters)"}</Form.Label>
    <Form.Control
      type="number"
      className={classes.optioncss}
      // placeholder="Enter size of land in number e.g 2"
      value={sizePlot}
      onChange={(e) => setSizePlot(e.target.value)}
    />

   {!(["Land Ratification", "Open Land Allocation"].includes(selectedApp?.name)) && (
      <>
        <Form.Label>Unit Of Measurement of Land</Form.Label>
        <Form.Select 
          value={selectedUnit}
          className={classes.optioncss}
          onChange={(e) => setSelectedUnit(e.target.value)}
        >
          <option value="">Select Unit</option>
          {measurement.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Form.Select>
      </>
    )}
  </>
)}

     {selectedApp?.name?.trim() === "Governor's Consent" && (
  <>
    
    <Form.Label style={{ marginTop: 10 }}>Type of Governor's Consent</Form.Label>
     <Form.Select
                                 className={classes.optioncss}
                                 value={selectedType}
                                 onChange={handleGovernorType}
                               >
                                 <option value="">Select Type</option>
 {consentTypes.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
                               </Form.Select>

    <Form.Label style={{ marginTop: 10 }}>Consideration</Form.Label>
    <CurrencyInput
                   id="expensesConsent"
                   name="expressConsent"
                   value={expensesConsent}
                   decimalsLimit={2}
                    onValueChange={(value) => setExpensesConsent(value)}
                   prefix="₦"
                   groupSeparator=","
                  //  placeholder="Enter Amount"
                   className={`form-control ${classes.optioncss}`}
                 />
  </>
)}
     {selectedApp?.name?.trim() === "Governor's Consent Mortgage" && (
  <>
    
    <Form.Label style={{ marginTop: 10 }}>Consideration</Form.Label>
    <CurrencyInput
                   id="expensesConsent"
                   name="expressConsent"
                   value={expensesConsent}
                   decimalsLimit={2}
                    onValueChange={(value) => setExpensesConsent(value)}
                   prefix="₦"
                   groupSeparator=","
                  //  placeholder="Enter Amount"
                   className={`form-control ${classes.optioncss}`}
                 />

  </>
)}
     {selectedApp?.name?.trim() === "Governor's Consent Assignment" && (
  <>
    <Form.Label style={{ marginTop: 10 }}>Consideration</Form.Label>
    <CurrencyInput
                   id="expensesConsent"
                   name="expressConsent"
                   value={expensesConsent}
                   decimalsLimit={2}
                    onValueChange={(value) => setExpensesConsent(value)}
                   prefix="₦"
                   groupSeparator=","
                  //  placeholder="Enter Amount"
                   className={`form-control ${classes.optioncss}`}
                 />
  </>
)}
     {selectedApp?.name?.trim() === "Governor's Consent Sublease" && (
  <>
    <Form.Label style={{ marginTop: 10 }}>Consideration</Form.Label>
    <CurrencyInput
                   id="expensesConsent"
                   name="expressConsent"
                   value={expensesConsent}
                   decimalsLimit={2}
                    onValueChange={(value) => setExpensesConsent(value)}
                   prefix="₦"
                   groupSeparator=","
                  //  placeholder="Enter Amount"
                   className={`form-control ${classes.optioncss}`}
                 />
  </>
)}

{selectedApp?.name?.trim() === "Scheme Allocation" && (
  <>
   <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt} style={{marginTop: 10}}>
                                         Land Schemes
                                        </Form.Label>
                                        <Form.Select
                                        
                                          className={classes.optioncss}
  
                                          value={selectedScheme}
                                           onChange={handleScheme}
                                        >
                                          <option value="">Select Land Scheme</option>
                                          {schemes.map((item, index) => (
                                            <option key={index} value={item.id} label={item.description}>
                                              {item.description}
                                            </option>
                                          ))}
                                        </Form.Select>    
  </>
)}
  
  </>
)}
  </Modal.Body>
 <div className={classes.btmBtn111}>
    <Button 
    className={classes.cancBtn}
      variant="secondary" 
      onClick={() => setShowCustomerModal(false)}
    >
      Cancel
    </Button>
    <Button 
    className={classes.contBtn}
      variant="success" 
      disabled={!selectedCustomerId || sizeError}
      onClick={() => {
        if (selectedApp.name === "Private CofO") {
          setShowSelection(true);
        } else {
          fetchServiceDetails(selectedApp.id, selectedApp.name,  selectedUnit, sizePlot);
         
        }
        setShowCustomerModal(false);
      }}
    >
      Continue
    </Button>
    </div>
</Modal>

            <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)} centered>
  <Modal.Header className={classes.clsBtn} closeButton>
    <Modal.Title className={classes.appSTyle}>{selectedApp.name}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {/* {loadingStates ? (
      <Spinner animation="border" />
    ) : (
      <> */}
        <h1 className={classes.hdSTtyle}>Description</h1>
        <p className={classes.serviceStyle}>{serviceDetails?.description ? serviceDetails?.description : "No description for this application"}</p>
        <h1 className={classes.hdSTtyle}>Requirements</h1>
        <>
  {requirements.length > 0 ? (
    requirements.map((item, index) => (
      <div key={index} className={classes.reqrdd}>
        <img src={TickIcon} className={classes.tickCIR} />
        <p className={classes.requirementStylee}>{item.description}</p>
      </div>
    ))
  ) : (
    <p className={classes.requirementStylee} style={{ fontStyle: "italic", color: "#888" }}>
      Requirements has not been set for this application.
    </p>
  )}
</>

<h1 className={classes.hdSTtyle}>Service Fee</h1>
{serviceFee.length > 0 ? (
  <table style={{ borderCollapse: "collapse", width: "100%" }}>
    <thead style={{ whiteSpace: "nowrap" }}>
      <tr>
        <th style={{ border: "1px solid #000", padding: "4px", textAlign: "left" }}>Description</th>
        <th style={{ border: "1px solid #000", padding: "4px", textAlign: "right" }}>Amount</th>
      </tr>
    </thead>
    <tbody style={{ whiteSpace: "nowrap" }}>
      {serviceFee.map((item, index) => (
        <tr key={index}>
          <td
  style={{
    border: "1px solid #000",
    padding: "4px",
    wordWrap: "break-word",
    wordBreak: "break-word",
    whiteSpace: "normal",
    maxWidth: "200px" // optional: restricts width to force wrapping
  }}
>
  {item.description}
</td>

          <td
            style={{
              border: "1px solid #000",
              padding: "4px",
              textAlign: "right",
            }}
            className={isDarkMode ? classes.textThh : classes.textTh}
          >
            {new Intl.NumberFormat('en-NG', {
              style: 'currency',
              currency: 'NGN'
            }).format(item.amount)}
          </td>
        </tr>
      ))}

      {/* Total Row */}
      <tr>
        <td
          style={{
            border: "1px solid #000",
            padding: "4px",
            fontWeight: "bold",
            textAlign: "left",
          }}
        >
          Total:
        </td>
        <td
          style={{
            border: "1px solid #000",
            padding: "4px",
            textAlign: "right",
            fontWeight: "bold",
          }}
          className={classes.textTh}
        >
          {new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN'
          }).format(
            serviceFee.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0)
          )}
        </td>
      </tr>
    </tbody>
  </table>
) : (
  <p style={{ fontStyle: "italic", color: "#888" }}>
    Service fee has not been set for this application.
  </p>
)}


<div className={classes.btmBtn}>
    <Button className={classes.btnCancell} variant="secondary" onClick={() => setShowConfirmationModal(false)}>
      Cancel
    </Button>
    <Button
  className={classes.btnProceedd}
  variant="success"
  onClick={() => {
    if (userType === "agent") {
  handleAgentGenerateNewInvoice(selectedApp.id, selectedApp.name, selectedCustomerId.value);
    } else {
      handleGenerateNewInvoice(
        selectedApp.id,
        selectedApp.name
      );
    }
  }}
>
     {loadingStates ? (
      <>
      <Spinner size="sm" />
      {/* <span style={{ marginLeft: "5px" }}>
        Processing...
      </span> */}
    </>
  ) : (
    "Continue"
  )}
    </Button>
    </div>

  </Modal.Body>
</Modal>

<Modal show={showLandUseModal} onHide={() => setShowLandUseModal(false)} centered>
  <Modal.Header style={{borderBottom: "none"}} closeButton>
    {/* <Modal.Title>Select Land Use Type</Modal.Title> */}
  </Modal.Header>
  <Modal.Body>
    <Form.Group controlId="landUseType">
     {selectedApp?.name !== "Land Information" && selectedApp?.name !== "Charting Information" ? (
  <>
    <Form.Label>Land Use Type</Form.Label>
    <Form.Select
      value={selectedLandUseType}
      onChange={(e) => setSelectedLandUseType(e.target.value)}
      className={classes.optioncss}
    >
      <option value="">Select Land Use Type</option>
      {allLands.map((land, index) => (
        <option key={index} value={land.id}>
          {land.name}
        </option>
      ))}
    </Form.Select>
  </>
) : null}
      {(selectedApp?.name === "Land Information" || selectedApp?.name === "Charting Information" || selectedApp?.name === "Land Ratification" || selectedApp?.name === "Open Land Allocation") && (
  <>
    <Form.Label style={{marginTop: 10}}>
  Size of Land{" "}
  {["Land Ratification", "Open Land Allocation"].includes(selectedApp?.name) && "(In Square Meters)"}
</Form.Label>
    <Form.Control
      type="number"
      className={classes.optioncss}
      // placeholder="Enter size of land in number e.g 2"
      value={sizePlot}
      onChange={(e) => setSizePlot(e.target.value)}
    />

    {/* Conditionally render Unit of Measurement only if not in the 3 excluded cases */}
    {!(["Land Ratification", "Open Land Allocation"].includes(selectedApp?.name)) && (
      <>
        <Form.Label>Unit Of Measurement of Land</Form.Label>
        <Form.Select 
          value={selectedUnit}
          className={classes.optioncss}
          onChange={(e) => setSelectedUnit(e.target.value)}
        >
          <option value="">Select Unit</option>
          {measurement.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Form.Select>
      </>
    )}
  </>
)}

       {selectedApp?.name?.trim() === "Governor's Consent" && (
        <>
        <Form.Label style={{ marginTop: 10 }}>Type of Governor's Consent</Form.Label>
     <Form.Select
                                 className={classes.optioncss}
                                 value={selectedType}
                                 onChange={handleGovernorType}
                               >
                                 <option value="">Select Type</option>
                                {consentTypes.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
                               </Form.Select>

  
    <Form.Label style={{ marginTop: 10 }}>Consideration</Form.Label>
     <CurrencyInput
                   id="expensesConsent"
                   name="expressConsent"
                   value={expensesConsent}
                   decimalsLimit={2}
                    onValueChange={(value) => setExpensesConsent(value)}
                   prefix="₦"
                   groupSeparator=","
                  //  placeholder="Enter Amount"
                   className={`form-control ${classes.optioncss}`}
                 />
    
  </>
)}
       {selectedApp?.name?.trim() === "Governor's Consent Assignment" && (
        <>
    <Form.Label style={{ marginTop: 10 }}>Consideration</Form.Label>
     <CurrencyInput
                   id="expensesConsent"
                   name="expressConsent"
                   value={expensesConsent}
                   decimalsLimit={2}
                    onValueChange={(value) => setExpensesConsent(value)}
                   prefix="₦"
                   groupSeparator=","
                  //  placeholder="Enter Amount"
                   className={`form-control ${classes.optioncss}`}
                 />
    
  </>
)}
       {selectedApp?.name?.trim() === "Governor's Consent Sublease" && (
        <>
    <Form.Label style={{ marginTop: 10 }}>Consideration</Form.Label>
     <CurrencyInput
                   id="expensesConsent"
                   name="expressConsent"
                   value={expensesConsent}
                   decimalsLimit={2}
                    onValueChange={(value) => setExpensesConsent(value)}
                   prefix="₦"
                   groupSeparator=","
                  //  placeholder="Enter Amount"
                   className={`form-control ${classes.optioncss}`}
                 />
    
  </>
)}
       {selectedApp?.name?.trim() === "Governor's Consent Mortgage" && (
        <>
    <Form.Label style={{ marginTop: 10 }}>Consideration</Form.Label>
     <CurrencyInput
                   id="expensesConsent"
                   name="expressConsent"
                   value={expensesConsent}
                   decimalsLimit={2}
                    onValueChange={(value) => setExpensesConsent(value)}
                   prefix="₦"
                   groupSeparator=","
                  //  placeholder="Enter Amount"
                   className={`form-control ${classes.optioncss}`}
                 />
    
  </>
)}
       {selectedApp?.name?.trim() === "Scheme Allocation" && (
  <>
   <Form.Label className={isDarkMode ? classes.labelTxt1 : classes.labelTxt} style={{marginTop: 10}}>
                                         Land Schemes
                                        </Form.Label>
                                        <Form.Select
                                        
                                          className={classes.optioncss}
  
                                          value={selectedScheme}
                                           onChange={handleScheme}
                                        >
                                          <option value="">Select Land Scheme</option>
                                          {schemes.map((item, index) => (
                                            <option key={index} value={item.id} label={item.description}>
                                              {item.description}
                                            </option>
                                          ))}
                                        </Form.Select>    
  </>
)}
    </Form.Group>
  </Modal.Body>
  <Modal.Footer>
    <Button 
      variant="secondary" 
      onClick={() => setShowLandUseModal(false)}
      className={classes.btnCancell}
    >
      Cancel
    </Button>
    <Button 
      variant="success" 
      onClick={() => {
        // if (!selectedLandUseType) {
        //   Swal.fire("Error", "Please select a land use type", "warning");
        //   return;
        // }
        setShowLandUseModal(false);
        
        // Now fetch service details with the selected land use type
        if (userType === "agent") {
          // For agents, we'll handle this in the customer modal flow
          setShowCustomerModal(true);
        } else {
          // For regular users, fetch service details with land use type
          fetchServiceDetails(selectedApp.id, selectedApp.name, selectedLandUseType, selectedUnit, sizePlot, selectedType);
        }
      }}
      className={classes.btnProceedd}
      disabled={sizeError}
    >
      Continue
    </Button>
  </Modal.Footer>
</Modal>
          
            

            <Modal show={showModalSuccess} onHide={() => setShowModalSuccess(false)}>
                      <Modal.Header closeButton>
                        <Modal.Title>Success</Modal.Title>
                      </Modal.Header>
                      <Modal.Body className={classes.modalbodynew}>
                        <img src={verified} alt="Verify"  className={classes.picverfied}/>
                        <div className={classes.textss}>
                        <p>{modalMessage}</p>
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
                    <Modal show={showModalError} onHide={handleErrorClose}>
                      <Modal.Header closeButton>
                        {/* <Modal.Title>Warning!</Modal.Title> */}
                      </Modal.Header>
                      <Modal.Body style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}  className={classes.modalbodynew21}>
                        <img src={crop} style={{height: 48, width: 48, objectFit: "contain"}} alt="error" />
                        <p style={{fontWeight: 700, marginTop: 17, fontSize: 16, color: "#000000"}}>Verification Failed</p>
                        <p style={{fontWeight: 400, marginTop: 17, fontSize: 14, color: "#2E2E2E"}}>{modalMessage}</p>
                        <Button
                        style={{borderRadius: 8, width: 185, height: 44, fontWeight: 500, marginTop: 20, fontSize: 16, color: "#fff", backgroundColor: "#D92D20"}}
                          className={classes.btnmodalerror}
                          variant="danger"
                          onClick={handleErrorClose}
                        >
                          Okay
                        </Button>
                      </Modal.Body>
                    </Modal>

            <Modal show={show10} onHide={handleClose10} centered>
              <Modal.Header closeButton>
                <Modal.Title>Application Invoice</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className={classes.content}>
                  <div className={classes.priceList}>
                    <div className={classes.row}>
                      <span>
                        Your application is in progress. It will be completed
                        upon the payment of relevant fees at this stage. Kindly
                        find the invoice details as shown below.
                      </span>
                    </div>
                    {/* <Modal.Footer /> */}
                    <div
                      style={{ marginTop: 10 }}
                      className={`${classes.row} ${classes.total}`}
                    >
                      <span
                        style={{
                          fontSize: 25,
                          color: "#21B55A",
                          marginTop: -10,
                        }}
                      >
                        Payment Code
                      </span>
                    </div>
                    <div className={classes.row}>
                    <span
  style={{
    fontSize: 18,
    fontWeight: 700,
    marginTop: -15,
  }}
>
  {responseData.payment_code}{" "}
  <span
    onClick={() => {
      navigator.clipboard.writeText(responseData.payment_code);
      alert('Copied to clipboard!');
    }}
    style={{
      fontSize: 10,
      cursor: "pointer",
      color: "green", // optional for visual cue
      marginLeft: 5
    }}
  >
    click to copy <FiCopy size={16} />
  </span>
</span>
                    </div>
                    <Modal.Footer />
                  
                    {responseData1.map((item, index) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>{item.name}</span>
                        <span>
                          {new Intl.NumberFormat("en-NG", {
                            style: "currency",
                            currency: "NGN",
                          }).format(item.amount)}
                        </span>
                      </div>
                    ))}
                    <div
                      style={{
                        background: "#F0F2F5",
                        padding: 9,
                        borderRadius: 5,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                      className={`${classes.row} ${classes.total}`}
                    >
                      <span>Total Amount</span>
                      <span style={{ fontWeight: 700 }}>
                        {new Intl.NumberFormat("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        }).format(responseData.amount)}
                      </span>
                    </div>
                  </div>

                 
                </div>
              </Modal.Body>
              <Modal.Footer />
              <div className={classes.btmBtn22}>
                <Button
                  variant="success"
                  className={classes.finBtn}
                  onClick={() => {
                    window.open(paymentUrl, "_blank");
                    navigate("/applications");
                  }}
                  style={{ marginLeft: "10px", fontWeight: 700 }}
                >
                  Make Payment (BPMS)
                </Button>
               
                <Button
                  variant="success"
                  className={classes.finBtn1}
                  onClick={handleGenerateInvoice}
                >
                  Generate Invoice
                </Button>
              </div>
            </Modal>

           
            <Modal
              show={showSelection}
              onHide={handleCloseSelection}
              size="lg"
              centered
              animation={false}
            >
              {/* <Modal.Header style={{backgroundColor: "#F9FAFB",}}> */}
              {/* <Modal.Title>Land Allocation</Modal.Title> */}
              {/* </Modal.Header> */}
              <Modal.Body
                style={{
                  overflowY: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#F9FAFB",
                }}
              >
                <div
                  style={{
                    width: "600px",
                    borderRadius: "18px",
                    // border: "0.2px solid #21B55A",
                    padding: "20px",
                    backgroundColor: "white",
                  }}
                >
                  <Container className="mt-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="fw-bold">
                       Private CofO Application
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={handleCloseSelection}
                      ></button>
                    </div>
                    <hr />
                    <Form>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="landUse">
                            <Form.Label className={classes.labelTxt}>
                             C of O Type
                            </Form.Label>
                            <Form.Select
                              className={classes.optioncss}
                              onChange={handleLandStatus}
                            >
                              <option value="">Select C of O Type</option>
                              {tableData32.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="landUse">
                            <Form.Label className={classes.labelTxt}>
                             Land Use Type
                            </Form.Label>
                            <Form.Select
        value={selectedLandUseType}
        onChange={(e) => setSelectedLandUseType(e.target.value)}
        className={classes.optioncss}
      >
        <option value="">Select Land Use Type</option>
        {allLands.map((land, index) => (
          <option key={index} value={land.id}>
            {land.name}
          </option>
        ))}
      </Form.Select>
      {userType === 'agent' && (
  <>
    <Form.Label style={{marginTop: 10}}>Customer</Form.Label>
    <Select
      options={customerOptions}
      value={selectedCustomerId}
      onChange={(selectedOption) => setSelectedCustomerId(selectedOption)}
      // placeholder="Search customers..."
      filterOption={filterOption}
    />
  </>
)}


                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                                          <Col md={12} className="text-center">
                                          <Button
  className={classes.modBtnn}
  variant="success"
  onClick={handleContinueFromModal}
>
  {loadingStates[selectedAppId] ? (
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
                  </Container>
                </div>
              </Modal.Body>
            </Modal>

            
            
           

         
          </div>
        </div>
      </div>
    </>
  );
};

export default NewApplications;
