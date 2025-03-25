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

// import axios from 'axios';
// import localStorage from '@react-native-async-storage/async-storage';

const images = [
  Allocation,
  Property,
  Private,
  Transaction,
  Ratification,
  Governor,
  LandSearch,
  HOC,
];




const NewApplications = () => {
  const [loadingStates, setLoadingStates] = useState({});
  const [schemes, setSchemes] = useState([]);
  const [consentTypes, setConsentTypes] = useState([]);
  const [caveatTypes, setCaveatTypes] = useState([]);
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
  const handleShowCert = () => setShowCert(true);
  const handleShowScheme = () => setShowScheme(true);
  const handleShowCopy = () => setShowCopy(true);
  const handleShowConfirm = () => setShowConfirm(true);
  const handleShowChartInfo = () => setShowChartInfo(true);
  const handleShowLandInfo = () => setShowLandInfo(true);
  const handleShow30 = () => setShow30(true);
  const [show1, setShow1] = useState(false);
  const [show56, setShow56] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleClose56 = () => setShow56(false);
  const handleShow1 = () => setShow1(true);
  const handleShow20 = () => setShow20(true);
  const handleShow56 = () => setShow56(true);
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
  const [cofoType, setCofoType] = useState([]);
  const [bearer1, setBearer1] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [imgError, setImgError] = useState("");
  // const [pageNumber, setPageNumber] = useState("");
  const [surveyPlanNumber, setSurveyPlanNumber] = useState("");
  const [surveyPlanCoordinates, setSurveyPlanCoordinates] = useState("");
  const [surveyorName, setSurveyorName] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [acquisitionType, setAcquisitionType] = useState("");
  const [structureNo, setStructureNo] = useState("");
  const [propertyOccupier, setPropertyOccupier] = useState("");
  const [propertyAcquisition, setPropertyAcquisition] = useState("");
  const [occupantsNo, setOccupantsNo] = useState("");
  const [ogunResident, setOgunResident] = useState("");
  const [volumeNo, setVolumeNo] = useState("");
  const [applicationName, setApplicationName] = useState("");
  const [paymentCode, setPaymentCode] = useState("");
  const [imgError1, setImgError1] = useState("");
  const [plotSize, setPlotSize] = useState("");
  const [selectedConsent, setSelectedConsent] = useState("");
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
  const [fileName, setFileName] = useState("Other Supporting documents");
  const [fileName10, setFileName10] = useState("Purchase Agreement");
  const [fileName30, setFileName30] = useState("Purchase Agreement");
  const [fileName20, setFileName20] = useState("Purchase Receipt");
  const [fileName40, setFileName40] = useState("Purchase Receipt");
  const [fileName1, setFileName1] = useState("Survey Plan");
  const [architectural, setArchitectural] = useState("Architectural Documents");
  const [title, setTitle] = useState("Title Documents");
  const [frontPhoto, setFrontPhoto] = useState(
    "Photograph of the photo(front view)"
  );
  const [structuralDrawing, setStructuralDrawing] =
    useState("Structural Drawing");
  const [fileName2, setFileName2] = useState("Certificate of Occupancy");
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
  const fileInputRef = useRef(null);
  const architecturalRef = useRef(null);
  const titleRef = useRef(null);
  const photoRef = useRef(null);
  const structuralRef = useRef(null);
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const fileInputRef4 = useRef(null);
  const fileInputRef5 = useRef(null);
  const fileInputRef6 = useRef(null);
  const fileInputRef10 = useRef(null);
  const fileInputRef20 = useRef(null);
  const fileInputRef30 = useRef(null);
  const fileInputRef40 = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleClick2 = () => {
    fileInputRef2.current.click();
  };
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
  const handleClick10 = () => {
    fileInputRef10.current.click();
  };
  const handleClick20 = () => {
    fileInputRef20.current.click();
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
  const handleArchitecturalClick = () => {
    architecturalRef.current.click();
  };
  const handleTitleClick = () => {
    titleRef.current.click();
  };
  const handlePhotoClick = () => {
    photoRef.current.click();
  };
  const handleStructuralClick = () => {
    structuralRef.current.click();
  };
  const navigate = useNavigate();
  const [benLoading, setBenLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
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
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const totalPages = 10; // Total number of pages
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleDropdown, setVisibleDropdown] = useState(null);

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

  const handleLandStatus = (e) => {
    setSelectedLandStatus(e.target.value);
    // setShowErrorMessage(false);
  };

  const handleProposedBuild = (e) => {
    setSelectedBuildingType(e.target.value);
    // setShowErrorMessage(false);
  };

  const handleLGAChange = (e) => {
    setSelectedLGA(e.target.value);
    // setShowErrorMessage(false);
  };

  const handleConsent = (e) => {
    setSelectedConsent(e.target.value);
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

  const handleStationChange = (e) => {
    const selectedId = e.target.value;
    const stationName =
      tableData1.find((item) => item.id.toString() === selectedId)
        ?.description || "";
    setSelectedStationName(stationName);
    setSelectedStation(e.target.value);
    console.log(stationName);
    // setShowErrorMessage(false);
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
  const handleGrantNature = (e) => {
    setSelectedNature(e.target.value);
    // setShowErrorMessage(false);
  };
  const handlePropOwnership = (e) => {
    setSelectedPropertyOwnership(e.target.value);
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
  const handleArchitecturalChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setImgError("File is larger than 2MB. Max upload size is 2MB.");
        setArchitectural("");
        return;
      }
      setArchitectural(file.name);
      setSelectedFile50([file]);
      setImgError("");
    }
  };
  const handleTitleChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setImgError("File is larger than 2MB. Max upload size is 2MB.");
        setTitle("");
        return;
      }
      setTitle(file.name);
      setSelectedFile60([file]);
      setImgError("");
    }
  };
  const handlePhotoChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setImgError("File is larger than 2MB. Max upload size is 2MB.");
        setFrontPhoto("");
        return;
      }
      setFrontPhoto(file.name);
      setSelectedFile70([file]);
      setImgError("");
    }
  };
  const handleStructuralDraw = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setImgError("File is larger than 2MB. Max upload size is 2MB.");
        setStructuralDrawing("");
        return;
      }
      // setFrontPhoto(file.name);
      setStructuralDrawing(file.name);
      setSelectedFile40([file]);
      setImgError("");
    }
  };

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
        setImgError("File is larger than 2MB. Max upload size is 2MB.");
        setFileName10("");
        return;
      } // Get the first selected file
      setFileName10(file.name); // Set the file name
      setSelectedFile30([file]);
      setImgError(""); // Store the file in state
    }
  };

  const handleFileChange20 = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setImgError("File is larger than 2MB. Max upload size is 2MB.");
        setFileName20("");
        return;
      } // Get the first selected file
      setFileName20(file.name); // Set the file name
      setSelectedFile20([file]);
      setImgError(""); // Store the file in state
    }
  };

  const handleFileChange3 = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setImgError("File is larger than 2MB. Max upload size is 2MB.");
        setFileName2("");
        return;
      } // Get the first selected file
      setFileName2(file.name); // Set the file name
      setSelectedFile3([file]);
      setImgError(""); // Store the file in state
    }
  };

  const handleFileChange4 = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setImgError("File is larger than 2MB. Max upload size is 2MB.");
        setFileName3("");
        return;
      } // Get the first selected file
      setFileName3(file.name); // Set the file name
      setSelectedFile4([file]);
      setImgError(""); // Store the file in state
    }
  };

  const handleFileChange6 = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setImgError("File is larger than 2MB. Max upload size is 2MB.");
        setFileName4("");
        return;
      } // Get the first selected file
      setFileName5(file.name); // Set the file name
      setSelectedFile4([file]);
      setImgError(""); // Store the file in state
    }
  };
  const handleFileChange7 = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setImgError1("File is larger than 2MB. Max upload size is 2MB.");
        setFileName6("");
        return;
      } // Get the first selected file
      setFileName6(file.name); // Set the file name
      setSelectedFile5([file]);
      setImgError1(""); // Store the file in state
    }
  };

  const handleFileChange5 = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setImgError1("File is larger than 2MB. Max upload size is 2MB.");
        setFileName4("");
        return;
      } // Get the first selected file
      setFileName4(file.name); // Set the file name
      setSelectedFile5([file]);
      setImgError1(""); // Store the file in state
    }
  };
  const handleFileChange30 = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setImgError1("File is larger than 2MB. Max upload size is 2MB.");
        setFileName30("");
        return;
      } // Get the first selected file
      setFileName30(file.name); // Set the file name
      setSelectedFile15([file]);
      setImgError1(""); // Store the file in state
    }
  };
  const handleFileChange40 = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setImgError1("File is larger than 2MB. Max upload size is 2MB.");
        setFileName40("");
        return;
      } // Get the first selected file
      setFileName40(file.name); // Set the file name
      setSelectedFile40([file]);
      setImgError1(""); // Store the file in state
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

  const handleClicks = (id, name) => {
    console.log("Clicked item:", id);

    setSelectedAppId(id);
    // setShowModal(true);

    const normalized = name.toLowerCase(); // Convert name to lowercase for case-insensitive matching

    switch (normalized) {
      case "land allocation":
        return handleShow30();
      case "scheme allocation":
        return handleShowScheme();
      case "land search":
        return handleShowSearch();
      case "caveat":
        return handleShowCaveat();

      case "confirmation / verification":
        return handleShow56();
      case "amnesty (prp)":
        return handleShow57();
      case "land search":
        return handleShowSearch();
      case "caveat":
        return handleShowCaveat();
      case "developed private c of o":
        return handleShow8();
      case "underdeveloped private c of o":
        return handleShow7();
      case "land ratification":
        return handleShow6();
      case "governor's consent":
        return handleShow5();
      case "certificate of occupancy":
        return handleShowCert();
      case "certified true copy":
        return handleShowCopy();
      case "confirmation":
        return handleShowConfirm();
      case "charting information":
        return handleShowChartInfo();
      case "land information":
        return handleShowLandInfo();
      default:
        console.log("No matching action for:", name);
        return null;
    }
  };
  const handleNewClicks = (id, name) => {
    console.log("Clicked item:", id);

    // setSelectedAppId(id);
    // setApplicationName(name);
    navigate('/land_ratification_application');
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


      // formData.append("allocation_date", allocationDate);
      formData.append("lga_of_land", selectedArea);
      formData.append("estimated_development_amount", totalAmount);
      formData.append("land_development_status", selectedDevelopment);
      formData.append("land_location", landLocation);
      formData.append("time_line", timeLine);
      formData.append("size_in_sqm", sizeSqm);
      formData.append("landuse_id", selectedLandUse);
      formData.append("proposed_residential_building", selectedBuildingType);
      formData.append("proposed_source_of_fund", selectedSource);

      // console.log(selectedFile);

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${bearer}`,
      };

      const response = await axios.post(
        `${BASE_URL}/application/make?type=${selectedAppId}`,
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
      // Swal.fire({
      //   icon: 'success',
      //   title: 'Success',
      //   text: response.data.message,
      // });

      handleShow10();
      handleClose30();
      // handleCloseCert();
      // handleClose5();
      handleClose();
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
          icon: "error",
          title: "Failed",
          text: JSON.stringify(error.response.data.message),
        });
      }
    } finally {
      setCreateLoading(false);
    }
  };
  const handleGenerateNewInvoice = async (id, name) => {
    if (name === "Certificate of Occupancy" && !selectedLandStatus) {
      setSelectedAppId(id); // Save id for later
      setShowSelection(true); // Open modal
      return;
    }

    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    try {
      const formData = new FormData();

      formData.append("service_id", id);

      if (selectedLandStatus) {
        formData.append("cofo_type", selectedLandStatus);
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

      handleShow10();

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
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
      setSelectedLandStatus(null);
    }
  };

  const handleErrorClose = () => {
    setShowModalError(false);
    handleShowPaymentModal();
  };

  const handleApplyApplication = async () => {
    setCreateLoading(true);
    try {
      const formData = new FormData();
      formData.append("service_id", selectedAppId);
      formData.append("code", paymentCode);

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${bearer}`,
      };

      const response = await axios.post(
        `${BASE_URL}/application/verify-payment`,
        formData,
        { headers }
      );
      const cofoName = response.data?.data?.cofo_type?.id
      setCofoType(cofoName);



      if (response.data && response.data.data && response.data.data.service) {
        const service = response.data.data.service;
        const serviceName = service.name;

        const routes = [
          "/governors_consent_application",
          "/certificate_of_occupancy_application",
          "/land_information_application",
          "/confirmation_application",
          "/land_search_application",
          "/caveat_application",
          "/charting_information_application",
          "/amnesty_(prp)_application",
          "/scheme_allocation_application",
          "/land_allocation_application",
          "/land_ratification_application",
        ];

        const formattedServiceName = serviceName
          .replace(/'/g, "")
          .replace(/\s+/g, "_")
          .toLowerCase();

        const matchedRoute = routes.find((route) =>
          route.includes(formattedServiceName)
        );

        if (matchedRoute) {
          if (formattedServiceName === "certificate_of_occupancy") {
            navigate(matchedRoute, {
              state: {
                serviceID: selectedAppId,
                paymentCode: paymentCode,
                cofoType: cofoName || null,
              },
            });
          } else {
            navigate(matchedRoute, {
              state: {
                serviceID: selectedAppId,
                paymentCode: paymentCode,
              },
            });
          }
        }
      }

      handleClosePaymentModal();
      setPaymentCode("");
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
          text: errorMessage,
          customClass: {
            title: classes.myTitle,
            popup: classes.myText,
            confirmButton: classes.myDeclineButton,
          },
          allowOutsideClick: false,
          preConfirm: () => {
            Swal.close();
          },
        });
        setPaymentCode("");
      }
    } finally {
      setCreateLoading(false);
    }
  };



  const createApplication20 = async () => {
    setCreateLoading(true);
    try {
      const formData = new FormData();
      if (selectedFile && selectedFile.length > 0) {
        formData.append("file", selectedFile[0]);
      }
      if (selectedFile2 && selectedFile2.length > 0) {
        formData.append("document", selectedFile2[0]);
      }

      if (selectedFile20 && selectedFile20.length > 0) {
        formData.append("purchase_receipt", selectedFile20[0]);
      }

      formData.append("land_scheme", selectedLandStatus);
      formData.append("size_in_sqm", propertySize);
      formData.append("landuse_id", selectedLandUse);
      formData.append("proposed_residential_building", selectedBuildingType);
      // formData.append("time_line", timeLine);
      formData.append("proposed_source_of_fund", selectedSource);
      // formData.append("allocation_date", allocationDate);
      // formData.append("lga_of_land", selectedArea);
      // formData.append("estimated_development_amount", totalAmount);
      // formData.append("land_development_status", selectedDevelopment);
      // formData.append("land_location", landLocation);

      // console.log(selectedFile);

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${bearer}`,
      };

      const response = await axios.post(
        `${BASE_URL}/application/make?type=${selectedAppId}`,
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
      // Swal.fire({
      //   icon: 'success',
      //   title: 'Success',
      //   text: response.data.message,
      // });

      handleShow10();
      handleCloseScheme();
      setAllocationDate("");
      setLandLocation("");
      setTimeLine("");
      setSelectedBuildingType("");
      setSelectedDevelopment("");
      setSelectedLGA("");
      setSelectedLandUse("");
      setSelectedSource("");
      setSelectedLandStatus("");
      setTotalAmount("");
      setSelectedFile("");
      setPropertySize("");
      setSelectedFile2("");
      setFileName1("Survey Plan");
      setFileName20("Purchase Receipt");
      setSelectedFile("");
      setSelectedFile20("");
      setFileName30("Purchase Agreement");
      setFileName("Other Supporting documents");
      setAttestation(false);
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
          icon: "error",
          title: "Failed",
          text: JSON.stringify(error.response.data.message),
        });
      }
    } finally {
      setCreateLoading(false);
    }
  };

  const createLandSearch = async () => {
    setCreateLoading(true);
    try {
      const formData = new FormData();
      formData.append("page_number", landLocation);
      formData.append("volume_number", timeLine);
      formData.append("date_issued", allocationDate);

      // console.log(selectedFile);

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${bearer}`,
      };

      const response = await axios.post(
        `${BASE_URL}/application/make?type=${selectedAppId}`,
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
      // Swal.fire({
      //   icon: 'success',
      //   title: 'Success',
      //   text: response.data.message,
      // });

      handleShow10();
      handleClose30();
      // handleCloseCert();
      // handleClose5();
      handleClose();
      setAllocationDate("");
      setLandLocation("");
      setTimeLine("");
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
          icon: "error",
          title: "Failed",
          text: JSON.stringify(error.response.data.message),
        });
      }
    } finally {
      setCreateLoading(false);
    }
  };

  const createApplication3 = async () => {
    setCreateLoading(true);
    try {
      const formData = new FormData();

      if (selectedFile3 && selectedFile3.length > 0) {
        formData.append("cofo_document", selectedFile3[0]);
      }

      formData.append("lga_of_land", selectedArea);
      formData.append("land_development_status", selectedDevelopment);
      formData.append("land_location", landLocation);
      formData.append("cofo_number", cofoNumber);
      formData.append("landuse_id", selectedLandUse);
      formData.append("proposed_residential_building", selectedBuildingType);
      formData.append("nature_of_grant", selectedNature);
      formData.append("size_in_plot", plotSize);
      formData.append("size_in_sqm", propertySize);
      formData.append("gov_consent_id", selectedConsent);

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${bearer}`,
      };

      const response = await axios.post(
        `${BASE_URL}/application/make?type=${selectedAppId}`,
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

      // Swal.fire({
      //   icon: 'success',
      //   title: 'Success',
      //   text: response.data.message,
      // });

      handleShow10();
      handleClose5();

      setSelectedLGA("");
      setLandLocation("");
      setCofONumber("");
      setSelectedDevelopment("");
      setSelectedLandUse("");
      setSelectedBuildingType("");
      setPlotSize("");
      setPropertySize("");
      setSelectedNature("");
      setFileName2("Certificate of Occupancy");
      setSelectedFile3("");

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
          icon: "error",
          title: "Failed",
          text: JSON.stringify(error.response.data.message),
        });
      }
    } finally {
      setCreateLoading(false);
    }
  };

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

      // formData.append("survey_plan", selectedFile[0]);
      // formData.append("purchase_agreement", selectedFile15[0]);
      // formData.append("purchase_receipt", selectedFile40[0]);
      // formData.append("land_receipt", selectedFile2[0]);
      // formData.append("allocation_date", allocationDate);
      formData.append("lga_of_land", selectedArea);
      formData.append("estimated_development_amount", totalAmount);
      formData.append("land_development_status", selectedDevelopment);
      formData.append("land_location", selectedLocation);
      formData.append("landuse_id", selectedLandUse);
      formData.append("proposed_residential_building", selectedBuildingType);
      formData.append("proposed_source_of_fund", selectedSource);
      formData.append("size_in_plot", sizePlot);
      formData.append("size_in_sqm", sizeSqm);
      // formData.append("premium_value", premiumAmount);
      // formData.append("tax_station_id", selectedStation);
      // formData.append("tax_station_name", selectedStationName);
      // formData.append("capital_contribution_value", capitalAmount);
      formData.append("price_bought_per_plot", documentAmount);
      // formData.append('location_id', selectedLocation);
      formData.append("location_name", selectedLocationName);
      // formData.append('area_id', selectedArea);
      formData.append("area_name", selectedAreaName);

      // console.log(selectedFile);

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${bearer}`,
      };

      const response = await axios.post(
        `${BASE_URL}/application/make?type=${selectedAppId}`,
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

      // Swal.fire({
      //   icon: 'success',
      //   title: 'Success',
      //   text: response.data.message,
      // });

      handleClose6();
      handleShow10();
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
          icon: "error",
          title: "Failed",
          text: JSON.stringify(error.response.data.message),
        });
      }
    } finally {
      setCreateLoading(false);
    }
  };
  const createAmensty = async () => {
    setCreateLoading(true);
    try {
      const formData = new FormData();

      if (selectedFile && selectedFile.length > 0) {
        formData.append("survey_plan", selectedFile[0]);
      }
      if (selectedFile50 && selectedFile50.length > 0) {
        formData.append("architectural_document", selectedFile50[0]);
      }
      if (selectedFile60 && selectedFile60.length > 0) {
        formData.append("title_documents", selectedFile60[0]);
      }
      if (selectedFile70 && selectedFile70.length > 0) {
        formData.append("font_view", selectedFile70[0]);
      }
      if (selectedFile40 && selectedFile40.length > 0) {
        formData.append("structural_draw", selectedFile40[0]);
      }
      // if (selectedFile40 && selectedFile40.length > 0) {
      //   formData.append("font_view", selectedFile40[0]);
      // }

      // if (selectedFile15 && selectedFile15.length > 0) {
      //   formData.append("purchase_agreement", selectedFile15[0]);
      // }
      // if (selectedFile40 && selectedFile40.length > 0) {
      //   formData.append("purchase_receipt", selectedFile40[0]);
      // }
      // if (selectedFile2 && selectedFile2.length > 0) {
      //   formData.append("land_receipt", selectedFile2[0]);
      // }

      // formData.append("survey_plan", selectedFile[0]);
      // formData.append("purchase_agreement", selectedFile15[0]);
      // formData.append("purchase_receipt", selectedFile40[0]);
      // formData.append("land_receipt", selectedFile2[0]);
      formData.append("allocation_date", allocationDate);
      formData.append("lga_of_land", selectedArea);
      formData.append("estimated_development_amount", totalAmount);
      formData.append("land_development_status", selectedDevelopment);
      formData.append("land_location", selectedLocation);
      formData.append("landuse_id", selectedLandUse);
      formData.append("proposed_residential_building", selectedBuildingType);
      formData.append("proposed_source_of_fund", selectedSource);
      formData.append("size_in_plot", sizePlot);
      formData.append("size_in_sqm", sizeSqm);
      // formData.append("premium_value", premiumAmount);
      formData.append("tax_station_id", selectedStation);
      formData.append("tax_station_name", selectedStationName);
      // formData.append("capital_contribution_value", capitalAmount);
      formData.append("price_bought_per_plot", documentAmount);
      // formData.append('location_id', selectedLocation);
      formData.append("location_name", selectedLocationName);
      // formData.append('area_id', selectedArea);
      formData.append("area_name", selectedAreaName);

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${bearer}`,
      };

      const response = await axios.post(
        `${BASE_URL}/application/make?type=${selectedAppId}`,
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

      // Swal.fire({
      //   icon: 'success',
      //   title: 'Success',
      //   text: response.data.message,
      // });

      // handleClose6();
      handleShow57();
      handleClose57();
      setSurveyPlanNumber("");
      setAcquisitionType("");
      setLandLocation("");
      setSelectedArea("");
      setStructureNo("");
      setOccupantsNo("");
      setSelectedLandUse("");
      setSelectedBuildingType("");
      setFileName1("Survey Plan");
      setSelectedFile("");
      setSelectedFile40("");
      setSelectedFile50("");
      setSelectedFile60("");
      setSelectedFile70("");
      setArchitectural("Architectural Documents");
      setTitle("Title Documents");
      setFrontPhoto("Photograph of the photo(front view)");

      // setAllocationDate("");
      // setSelectedDevelopment("");
      // setSelectedStation("");
      // setSelectedLocation("");
      // setCofONumber("");
      // setTimeLine("");
      // setSelectedDevelopment("");
      // setPlotSize("");
      // setSizePlot("");
      // setPropertySize("");
      // setSizeSqm("");
      // setSelectedLGA("");
      // setSelectedSource("");
      // setTotalAmount("");
      // setDocumentValue("");
      // setFileName("Survey Plan");
      // setFileName30("Purchase Agreement");
      // setSelectedFile15("");
      // setSelectedFile40("");
      // setFileName40();

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
          icon: "error",
          title: "Failed",
          text: JSON.stringify(error.response.data.message),
        });
      }
    } finally {
      setCreateLoading(false);
    }
  };

  const createTrueCopy = async () => {
    setCreateLoading(true);
    try {
      const formData = new FormData();

      formData.append("volume_number", volumeNumber);
      formData.append("page_number", pageNumber);

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${bearer}`,
      };

      const response = await axios.post(
        `${BASE_URL}/application/make?type=${selectedAppId}`,
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

      // Swal.fire({
      //   icon: 'success',
      //   title: 'Success',
      //   text: response.data.message,
      // });

      handleShowCopy();
      handleCloseCopy();

      setPageNumber("");
      setVolumeNumber("");

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
          icon: "error",
          title: "Failed",
          text: JSON.stringify(error.response.data.message),
        });
      }
    } finally {
      setCreateLoading(false);
    }
  };
  const createConfirm = async () => {
    setCreateLoading(true);
    try {
      const formData = new FormData();

      formData.append("volume_number", volumeNumber1);
      formData.append("page_number", pageNumber1);

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${bearer}`,
      };

      const response = await axios.post(
        `${BASE_URL}/application/make?type=${selectedAppId}`,
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

      // Swal.fire({
      //   icon: 'success',
      //   title: 'Success',
      //   text: response.data.message,
      // });

      // handleShowCopy();
      // handleCloseCopy();
      handleCloseConfirm();
      handleShowConfirm();
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
      setPageNumber1("");
      setVolumeNumber1("");

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
          icon: "error",
          title: "Failed",
          text: JSON.stringify(error.response.data.message),
        });
      }
    } finally {
      setCreateLoading(false);
    }
  };

  const createApplicatonCertified = async () => {
    setCreateLoading(true);
    try {
      const formData = new FormData();

      formData.append("volume_number", volumeNumber);
      formData.append("page_number", pageNumber);

      // console.log(selectedFile);

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${bearer}`,
      };

      const response = await axios.post(
        `${BASE_URL}/application/make?type=${selectedAppId}`,
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

      // Swal.fire({
      //   icon: 'success',
      //   title: 'Success',
      //   text: response.data.message,
      // });

      handleCloseCopy();
      handleShow10();
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
          icon: "error",
          title: "Failed",
          text: JSON.stringify(error.response.data.message),
        });
      }
    } finally {
      setCreateLoading(false);
    }
  };

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

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${bearer}`,
      };

      const response = await axios.post(
        `${BASE_URL}/application/make?type=${selectedAppId}`,
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

      // Swal.fire({
      //   icon: 'success',
      //   title: 'Success',
      //   text: response.data.message,
      // });

      handleClose8();
      handleCloseCert();
      handleShow10();
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
          icon: "error",
          title: "Failed",
          text: JSON.stringify(error.response.data.message),
        });
      }
    } finally {
      setCreateLoading(false);
    }
  };
  const createCaveatApplication = async () => {
    setCreateLoading(true);
    try {
      const formData = new FormData();
      formData.append("page_number", pageNumber);
      formData.append("volume_number", volumeNumber);
      formData.append("reason_for_caveat", reason);
      formData.append("caveat_id", selectedLandStatus);

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${bearer}`,
      };

      const response = await axios.post(
        `${BASE_URL}/application/make?type=${selectedAppId}`,
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

      // Swal.fire({
      //   icon: 'success',
      //   title: 'Success',
      //   text: response.data.message,
      // });

      handleClose8();
      handleCloseCert();
      handleShow10();
      setReason("");
      setVolumeNumber("");
      setPageNumber("");
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
          icon: "error",
          title: "Failed",
          text: JSON.stringify(error.response.data.message),
        });
      }
    } finally {
      setCreateLoading(false);
    }
  };

  const createChartInfomation = async () => {
    setCreateLoading(true);
    try {
      const formData = new FormData();
      if (selectedFile && selectedFile.length > 0) {
        formData.append("survey_plan", selectedFile[0]);
      }

      // formData.append("survey_plan", selectedFile[0]);
      formData.append("survey_number", surveyPlanNumber);
      formData.append("survey_coordinates", surveyPlanCoordinates);
      formData.append("property_address", propertyAddress);
      formData.append("size_in_plot", sizePlot);

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${bearer}`,
      };

      const response = await axios.post(
        `${BASE_URL}/application/make?type=${selectedAppId}`,
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

      // Swal.fire({
      //   icon: 'success',
      //   title: 'Success',
      //   text: response.data.message,
      // });
      // handleCloseCaveat("");
      // handleShowCaveat("");

      handleClose8();
      handleCloseChartInfo();
      handleShowChartInfo();
      handleShow10();
      setSurveyPlanNumber("");
      setSurveyPlanCoordinates("");
      setPropertyAddress("");
      setSizePlot("");
      setSelectedFile4("");
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
          icon: "error",
          title: "Failed",
          text: JSON.stringify(error.response.data.message),
        });
      }
    } finally {
      setCreateLoading(false);
    }
  };

  const createLandInfomation = async () => {
    setCreateLoading(true);
    try {
      const formData = new FormData();
      if (selectedFile4 && selectedFile4.length > 0) {
        formData.append("survey_plan", selectedFile[0]);
      }

      // formData.append("survey_plan", selectedFile[0]);
      formData.append("land_location", propertyAddress);
      formData.append("surveyor_name", surveyorName);
      formData.append("landuse_id", selectedLandUse);
      formData.append("survey_plan_number", surveyPlanNumber);
      formData.append("date_issued", selectedDate);

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${bearer}`,
      };

      const response = await axios.post(
        `${BASE_URL}/application/make?type=${selectedAppId}`,
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

      // Swal.fire({
      //   icon: 'success',
      //   title: 'Success',
      //   text: response.data.message,
      // });

      handleClose8();
      handleCloseLandInfo();
      handleShow10();
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
          icon: "error",
          title: "Failed",
          text: JSON.stringify(error.response.data.message),
        });
      }
    } finally {
      setCreateLoading(false);
    }
  };

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
      // formData.append('ownership_capacity', selectedPropertyOwnership);
      formData.append("property_state", selectedPropertyOwnership);
      formData.append("length_of_possession", possessionLength);
      formData.append("landstatus_id", selectedLandStatus);

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${bearer}`,
      };

      const response = await axios.post(
        `${BASE_URL}/application/make?type=${selectedAppId}`,
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

      // Swal.fire({
      //   icon: 'success',
      //   title: 'Success',
      //   text: response.data.message,
      // });

      handleClose7();
      handleShow10();
      handleCloseCert();
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
          icon: "error",
          title: "Failed",
          text: JSON.stringify(error.response.data.message),
        });
      }
    } finally {
      setCreateLoading(false);
    }
  };

  const handleOptionClick = (index) => {
    setSelectedOption(index);
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

  const handleMakePayment = () => {
    const payment = responseData.payment_url;
    navigate("responseData.payment_url");
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

  const handleClicks21 = (id, name) => {
    console.log("Clicked item:", name); // Logs the clicked name

    const normalized = name.toLowerCase(); // Convert name to lowercase for case-insensitive matching

    switch (normalized) {
      case "land allocation":
        return handleShow30();
      case "land search":
        return handleShowSearch();
      case "caveat":
        return handleShowCaveat();
      case "developed private c of o":
        return handleShow8();
      case "underdeveloped private c of o":
        return handleShow7();
      case "land ratification":
        return handleShow6();
      case "governor's consent":
        return handleShow5();
      case "certificate of occupancy":
        return handleShowCert();
      default:
        console.log("No matching action for:", name); // Log if no match is found
        return null;
    }
  };


  const handleContinueFromModal = () => {
    if (!selectedLandStatus) {
      Swal.fire({
        title: "Oops!",
        text: "Please select a type of C of O before continuing.",
        icon: "warning",
      });
      return;
    }

    // Fire the invoice generation with selected ID and Land Status
    handleGenerateNewInvoice(selectedAppId, "Certificate of Occupancy");

    // Optionally close the modal if desired
    setShowSelection(false);
  };


  // console.log(allApplications)
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
              {/* roleLoading */}
                {/* // ?  */}
                {/* // Display placeholders when loading */}
                  {/* // Array.from({ length: 10 }).map((_, index) => ( */}
                    {/* <div>
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
                    </div> */}
                  {/* // )) */}
                {/* // :  */}
                {/* // Display actual data when loading is false */}
                  {/* // allApplications.map((application, index) => ( */}
                    <div
                      // key={index}
                      className={classes.card}
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
                            className={classes.cardTitle}
                            style={{ wordWrap: "break-word" }}
                          >
                            {/* {application.name} Application */}
                            Building Permit Application
                          </h3>
                        </div>
                      </div>
                      <p
                        className={classes.textPrg}
                        style={{ wordWrap: "break-word" }}
                      >
                        To apply for{" "}
                        <span style={{ fontWeight: 700 }}>
                          Building Permit
                          {/* {application.name} */}
                        </span>
                        ; <br />
                        1. Click the Apply Button. <br />
                        {/* 2. Make your payment. */}
                        <br />
                        {/* 3. Click the Apply Button to continue your application */}
                        {/* process. */}
                        {/* {application.description} */}
                      </p>
                      <div className={classes.bottomBtn}>
                        {/* <Button
                          onClick={() =>
                            handleGenerateNewInvoice(application.id, application.name)
                          }
                          variant="success"
                          className={classes.invBtn}
                        >
                          {loadingStates[application.id] ? (
                            <>
                              <Spinner size="sm" />
                              <span style={{ marginLeft: "5px" }}>
                                Processing...
                              </span>
                            </>
                          ) : (
                            "Generate Invoice"
                          )}
                        </Button> */}
                        <Button
                          onClick={() =>
                            // handleNewClicks(application.id, application.name)
                            handleNewClicks()
                          }
                          variant="success"
                          className={classes.appBtn}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  {/* // ))} */}
            </div>
            </div>
            <Modal
              show={showPaymentModal}
              onHide={handleClosePaymentModal}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title style={{ fontWeight: 700 }}>
                  Payment Verification for {applicationName}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className={classes.content}>
                  <div className={classes.priceList}>
                    <div className={classes.row}>
                      <span>
                        To continue with this {applicationName} application, we
                        need to verify your payment status. Kindly enter below
                        your payment code to continue.
                      </span>
                    </div>
                  </div>
                </div>
                <Modal.Footer />
                <Col md={12}>
                  <Form.Group controlId="landLocation">
                    {/* <Form.Label style={{fontSize: 15, fontWeight: 700}}>
                                 Payment Code
                                </Form.Label> */}
                    <Form.Control
                      type="text"
                      className={classes.optioncss}
                      placeholder="Enter your payment code"
                      value={paymentCode}
                      onChange={(e) => setPaymentCode(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Modal.Body>
              <Modal.Footer />
              <div className={classes.btmBtn22}>
                <Button
                  onClick={handleApplyApplication}
                  variant="success"
                  className={classes.finBtnldk}
                  style={{ fontWeight: 700 }}
                >
                  {createLoading ? (
                    <>
                      <Spinner size="sm" />
                      <span style={{ marginLeft: "5px" }}>Processing...</span>
                    </>
                  ) : (
                    "Verify"
                  )}
                </Button>
              </div>
            </Modal>



            <Modal show={showModalSuccess} onHide={() => setShowModalSuccess(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
              </Modal.Header>
              <Modal.Body className={classes.modalbodynew}>
                <img src={verified} alt="Verify" className={classes.picverfied} />
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
              <Modal.Body style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} className={classes.modalbodynew21}>
                <img src={crop} style={{ height: 48, width: 48, objectFit: "contain" }} alt="error" />
                <p style={{ fontWeight: 700, marginTop: 17, fontSize: 16, color: "#000000" }}>Verification Failed</p>
                <p style={{ fontWeight: 400, marginTop: 17, fontSize: 14, color: "#2E2E2E" }}>{modalMessage}</p>
                <Button
                  style={{ borderRadius: 8, width: 185, height: 44, fontWeight: 500, marginTop: 20, fontSize: 16, color: "#fff", backgroundColor: "#D92D20" }}
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
                        {responseData.payment_code}
                      </span>
                    </div>
                    <Modal.Footer />
                    {/* <div className={classes.row}>
                  <span>Plot Size</span>
                  <span>1,000</span>
                </div> */}
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

                  {/* <div className={classes.facilities}>
                <h5 className="font-semibold mb-2">Facilities</h5>
                <ul>
                  <li> <img src={Markss} alt="green-tick icon" /> <span> Security - Perimeter Fencing </span></li>
                  <li> <img src={Markss} alt="green-tick icon" /> <span> Security - Grand Entry/Exit Security Gate System </span> </li>
                  <li> <img src={Markss} alt="green-tick icon" /> <span> Security - Street Lights </span>  </li>
                  <li> <img src={Markss} alt="green-tick icon" /> <span> Security - Camera and Surveillance System </span> </li>
                  <li> <img src={Markss} alt="green-tick icon" /> <span> Major Trunk Road and Drainage System </span> </li>
                  <li> <img src={Markss} alt="green-tick icon" /> <span> Minor Trunk Road and Drainage System </span> </li>
                  <li> <img src={Markss} alt="green-tick icon" /><span> Electrical Infrastructure and Disco Connectivity </span> </li>
                  <li> <img src={Markss} alt="green-tick icon" /> <span> Centralized Water System </span> </li>
                  <li> <img src={Markss} alt="green-tick icon" /> <span> Green Areas </span> </li>
                  <li><img src={Markss} alt="green-tick icon" /> <span> Internet Connectivity </span> </li>
                  <li> <img src={Markss} alt="green-tick icon" /> <span> Alternative Power </span> </li>
                  <li> <img src={Markss} alt="green-tick icon" /> <span> Civic and Event Centers </span> </li>
                  <li><img src={Markss} alt="green-tick icon" /> <span> Sports Arena and Gym Facilities </span> </li>
                </ul>
              </div>  */}
                </div>
              </Modal.Body>
              <Modal.Footer />
              <div className={classes.btmBtn22}>
                <Button
                  variant="success"
                  className={classes.finBtn}
                  onClick={() => window.open(paymentUrl, "_blank")}
                  style={{ marginLeft: "10px", fontWeight: 700 }}
                >
                  Make Payment (BPMS)
                </Button>
                {/* <Button
                  variant="success"
                  className={classes.finBtn}
                  disabled={parseFloat(0.0) < parseFloat(responseData.amount)}
                 
                  style={{
                    marginLeft: "10px",
                    display: "flex",
                    flexDirection: "column",
                    fontWeight: 700,
                  }}
                >
                  Make Payment (Wallet)
                  <span style={{ fontSize: "0.875rem" }}>
                    (Wallet Balance: 0.00)
                  </span>
                </Button> */}
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
              show={showCert}
              onHide={handleCloseCert}
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
                        New Application for Certificate Of Occupancy
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={handleCloseCert}
                      ></button>
                    </div>
                    <hr />
                    <Form>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="landUse">
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
                          </Form.Group>
                        </Col>
                      </Row>
                      {selectedLandStatus === "1" && (
                        <Container>
                          <Row className="mb-3">
                            <Col md={12}>
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
                          </Row>

                          <Row className="mb-3">
                            <Col md={12}>
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
                            <Col md={12}>
                              <Form.Group controlId="landLocation">
                                <Form.Label className={classes.labelTxt}>
                                  Length of time of possession of property
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className={classes.optioncss}
                                  placeholder="Length of time for which property has been in your possession"
                                  value={possessionLength}
                                  onChange={(e) =>
                                    setPossessionLength(e.target.value)
                                  }
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col md={12}>
                              <Form.Group controlId="landLocation">
                                <Form.Label className={classes.labelTxt}>
                                  State capacity in which you own the property{" "}
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className={classes.optioncss}
                                  placeholder="e.g self built, by purchase, in inheritance, or how else"
                                  value={propertyOwnership}
                                  onChange={(e) =>
                                    setPropertyOwnership(e.target.value)
                                  }
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col md={12}>
                              <Form.Group controlId="estimatedValue">
                                <Form.Label className={classes.labelTxt}>
                                  Estimated Present Value of property
                                </Form.Label>
                                <CurrencyInput
                                  id="value"
                                  name="value"
                                  value={presentValue}
                                  decimalsLimit={2}
                                  onValueChange={(value) =>
                                    setPresentValue(value)
                                  }
                                  prefix="₦"
                                  groupSeparator=","
                                  placeholder="Enter Estimated present value of property"
                                  className={`form-select ${classes.optioncss}`}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col md={12}>
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
                            <Col md={12}>
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
                          </Row>
                          <Row className="mb-3">
                            <Col md={12}>
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
                                  <option value="2">
                                    Industrial/Commercial
                                  </option>
                                  <option value="3">
                                    Civic/Religious/Charitable Programme
                                  </option>
                                  <option value="4">Agricultural</option>
                                </Form.Select>
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col md={12}>
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
                                <p style={{ fontSize: 12, color: "red" }}>
                                  {imgError}
                                </p>
                                {/* <Form.Control className={classes.optioncss} type="file" accept=".pdf" onChange={handleFileChange} /> */}
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col md={12}>
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
                              <p style={{ fontSize: 12, color: "red" }}>
                                {imgError1}
                              </p>
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
                                        Information supplied in this form is
                                        treated as strictly confidential. <br />
                                        I/We realise that it is an offense to
                                        make a false statement/claim in this
                                        form and that any allocation granted me
                                        on the basis of such false claim is
                                        revocable and may be revoked, and if a
                                        certificate of occupancy has been
                                        granted, such certificate must be
                                        revoked.
                                        <br />
                                        The Bureau of Lands and Survey accepts
                                        no responsibility for an application
                                        form not completed properly and for
                                        which reason such an application may be
                                        rejected. <br />
                                        I/We undertake to pay all necessary fees
                                        due to the preparation of a certificate
                                        of occupancy which may be issued
                                        consequent upon this application. <br />
                                        Should I withdraw the above application
                                        after making such deposit, I agree to
                                        forfeit the whole or such portion
                                        thereof as the Governor may decide.
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

                      {selectedLandStatus === "2" && (
                        <Container>
                          <Row className="mb-3">
                            <Col md={12}>
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
                          </Row>

                          <Row className="mb-3">
                            <Col md={12}>
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
                            <Col md={12}>
                              <Form.Group controlId="landLocation">
                                <Form.Label className={classes.labelTxt}>
                                  Length of time of possession of property
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className={classes.optioncss}
                                  placeholder="Length of time for which property has been in your possession"
                                  value={possessionLength}
                                  onChange={(e) =>
                                    setPossessionLength(e.target.value)
                                  }
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col md={12}>
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
                          <Row className="mb-3">
                            <Col md={12}>
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
                                  <option value="2">
                                    Industrial/Commercial
                                  </option>
                                  <option value="3">
                                    Civic/Religious/Charitable Programme
                                  </option>
                                  <option value="4">Agricultural</option>
                                </Form.Select>
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col md={12}>
                              <Form.Group controlId="sourceOfFunds">
                                <Form.Label className={classes.labelTxt}>
                                  Property Ownership
                                </Form.Label>
                                <Form.Select
                                  className={classes.optioncss}
                                  onChange={handlePropOwnership}
                                >
                                  <option value="">
                                    Select property ownership
                                  </option>
                                  <option value="freehold">Freehold</option>
                                  <option value="leasehold">Lease hold</option>
                                  <option value="mortgage">
                                    Subject to Mortgage
                                  </option>
                                </Form.Select>
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col md={12}>
                              <Form.Group controlId="estimatedValue">
                                <Form.Label className={classes.labelTxt}>
                                  How much money are you prepared to invest on
                                  developing the property or to continue
                                  developing it?
                                </Form.Label>
                                <CurrencyInput
                                  id="value"
                                  name="value"
                                  value={presentValue}
                                  decimalsLimit={2}
                                  onValueChange={(value) =>
                                    setPresentValue(value)
                                  }
                                  prefix="₦"
                                  groupSeparator=","
                                  placeholder="How much money are you prepared to invest on developing the property or to continue developing it?"
                                  className={`form-select ${classes.optioncss}`}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col md={12}>
                              <Form.Group controlId="proposedTimeline">
                                <Form.Label className={classes.labelTxt}>
                                  Give the approximate size of any other
                                  property owned by you in Ogun state
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
                            <Col md={12}>
                              <Form.Group controlId="proposedTimeline">
                                <Form.Label className={classes.labelTxt}>
                                  How soon are you prepared to make the
                                  investment?
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className={classes.optioncss}
                                  placeholder="Enter how soon are you prepared to make the investment?"
                                  value={tenement}
                                  onChange={(e) => setTenement(e.target.value)}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col md={12}>
                              <Form.Group controlId="surveyPlan">
                                <Form.Label className={classes.labelTxt}>
                                  Evidence of title (e.g conveyance, agreement,
                                  receipt e.t.c)
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
                                <p style={{ fontSize: 12, color: "red" }}>
                                  {imgError}
                                </p>
                                {/* <Form.Control className={classes.optioncss} type="file" accept=".pdf" onChange={handleFileChange} /> */}
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col md={12}>
                              <Form.Label className={classes.labelTxt}>
                                Attach site plan and state polt no, block no
                                where applicable
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
                              <p style={{ fontSize: 12, color: "red" }}>
                                {imgError1}
                              </p>
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
                                        Information supplied in this form is
                                        treated as strictly confidential. <br />
                                        I/We realise that it is an offense to
                                        make a false statement/claim in this
                                        form and that any allocation granted me
                                        on the basis of such false claim is
                                        revocable and may be revoked, and if a
                                        certificate of occupancy has been
                                        granted, such certificate must be
                                        revoked.
                                        <br />
                                        The Bureau of Lands and Survey accepts
                                        no responsibility for an application
                                        form not completed properly and for
                                        which reason such an application may be
                                        rejected. <br />
                                        I/We undertake to pay all necessary fees
                                        due to the preparation of a certificate
                                        of occupancy which may be issued
                                        consequent upon this application. <br />
                                        Should I withdraw the above application
                                        after making such deposit, I agree to
                                        forfeit the whole or such portion
                                        thereof as the Governor may decide.
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
                  </Container>
                </div>
              </Modal.Body>
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
                        Type of Certificate Of Occupancy
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

            <Modal
              show={showScheme}
              onHide={handleCloseScheme}
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
                        New Application for Scheme Allocation
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={handleCloseScheme}
                      ></button>
                    </div>
                    <hr />
                    <Form>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="landUse">
                            <Form.Label className={classes.labelTxt}>
                              Land Schemes
                            </Form.Label>
                            <Form.Select
                              className={classes.optioncss}
                              onChange={handleLandStatus}
                            >
                              <option value="">Select Land Scheme</option>
                              {schemes.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.title}
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
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="option3">
                            <Form.Label className={classes.labelTxt}>
                              Proposed Residential Building (Not Specified)
                            </Form.Label>
                            <Form.Select onChange={handleProposedBuild}>
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
                      {/* <Row className="mb-3">
                        <Col md={12}>
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
                      </Row> */}
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="proposedTimeline">
                            <Form.Label className={classes.labelTxt}>
                              Plot of land in SQM
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className={classes.optioncss}
                              placeholder="Enter Plot of land in sqm"
                              value={propertySize}
                              onChange={(e) => setPropertySize(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
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
                        <Col md={12}>
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
                            <p style={{ fontSize: 12, color: "red" }}>
                              {imgError}
                            </p>
                            {/* <Form.Control className={classes.optioncss} type="file" accept=".pdf" onChange={handleFileChange} /> */}
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Label className={classes.labelTxt}>
                            Other Supporting Document
                          </Form.Label>
                          <div
                            className={classes.fileUpload}
                            onClick={handleClick}
                          >
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
                          <p style={{ fontSize: 12, color: "red" }}>
                            {imgError1}
                          </p>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Label className={classes.labelTxt}>
                            Purchase Receipt
                          </Form.Label>
                          <div
                            className={classes.fileUpload}
                            onClick={handleClick20}
                          >
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
                          <p style={{ fontSize: 12, color: "red" }}>
                            {imgError1}
                          </p>
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
                                    Information supplied in this form is treated
                                    as strictly confidential. <br />
                                    I/We realise that it is an offense to make a
                                    false statement/claim in this form and that
                                    any allocation granted me on the basis of
                                    such false claim is revocable and may be
                                    revoked, and if a certificate of occupancy
                                    has been granted, such certificate must be
                                    revoked.
                                    <br />
                                    The Bureau of Lands and Survey accepts no
                                    responsibility for an application form not
                                    completed properly and for which reason such
                                    an application may be rejected. <br />
                                    I/We undertake to pay all necessary fees due
                                    to the preparation of a certificate of
                                    occupancy which may be issued consequent
                                    upon this application. <br />
                                    Should I withdraw the above application
                                    after making such deposit, I agree to
                                    forfeit the whole or such portion thereof as
                                    the Governor may decide.
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
                            onClick={createApplication20}
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
                  </Container>
                </div>
              </Modal.Body>
            </Modal>

            <Modal
              show={showChartInfo}
              onHide={handleCloseChartInfo}
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
                        New Application for Charting Information
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={handleCloseChartInfo}
                      ></button>
                    </div>
                    <hr />
                    <Form>
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
                            <Col md={12}>
                              <Form.Group controlId="landLocation">
                                <Form.Label className={classes.labelTxt}>
                                  Survey Plan Number
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className={classes.optioncss}
                                  placeholder="Enter Plan Number"
                                  value={surveyPlanNumber}
                                  onChange={(e) =>
                                    setSurveyPlanNumber(e.target.value)
                                  }
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col md={12}>
                              <Form.Group controlId="landLocation">
                                <Form.Label className={classes.labelTxt}>
                                  Survey Plan Coordinates
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className={classes.optioncss}
                                  placeholder="Enter Survey Plan Coordinates"
                                  value={surveyPlanCoordinates}
                                  onChange={(e) =>
                                    setSurveyPlanCoordinates(e.target.value)
                                  }
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col md={12}>
                              <Form.Group controlId="landLocation">
                                <Form.Label className={classes.labelTxt}>
                                  Property Address
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className={classes.optioncss}
                                  placeholder="Enter Property Address"
                                  value={propertyAddress}
                                  onChange={(e) =>
                                    setPropertyAddress(e.target.value)
                                  }
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          {/* <Row className="mb-3">
                            <Col md={12}>
                              <Form.Group controlId="estimatedValue">
                                <Form.Label className={classes.labelTxt}>
                                  Land Size
                                </Form.Label>
                                <CurrencyInput
                                  id="value"
                                  name="value"
                                  value={presentValue}
                                  decimalsLimit={2}
                                  onValueChange={value =>
                                    setPresentValue(value)
                                  }
                                  prefix="₦"
                                  groupSeparator=","
                                  placeholder="Enter Estimated present value of property"
                                  className={`form-select ${classes.optioncss}`}
                                />
                              </Form.Group>
                            </Col>
                          </Row> */}
                          <Row className="mb-3">
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
                                  onChange={(e) => setSizePlot(e.target.value)}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col md={12}>
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
                                <p style={{ fontSize: 12, color: "red" }}>
                                  {imgError}
                                </p>
                                {/* <Form.Control className={classes.optioncss} type="file" accept=".pdf" onChange={handleFileChange} /> */}
                              </Form.Group>
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
                                        Information supplied in this form is
                                        treated as strictly confidential. <br />
                                        I/We realise that it is an offense to
                                        make a false statement/claim in this
                                        form and that any allocation granted me
                                        on the basis of such false claim is
                                        revocable and may be revoked, and if a
                                        certificate of occupancy has been
                                        granted, such certificate must be
                                        revoked.
                                        <br />
                                        The Bureau of Lands and Survey accepts
                                        no responsibility for an application
                                        form not completed properly and for
                                        which reason such an application may be
                                        rejected. <br />
                                        I/We undertake to pay all necessary fees
                                        due to the preparation of a certificate
                                        of occupancy which may be issued
                                        consequent upon this application. <br />
                                        Should I withdraw the above application
                                        after making such deposit, I agree to
                                        forfeit the whole or such portion
                                        thereof as the Governor may decide.
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
                                onClick={createChartInfomation}
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
                  </Container>
                </div>
              </Modal.Body>
            </Modal>

            <Modal show={showLandInfo}
              onHide={handleCloseLandInfo}
              size="lg"
              centered
              animation={false}>
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
                        New Application for Land Information
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={handleCloseLandInfo}
                      ></button>
                    </div>
                    <hr />
                    <Form>
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
                            <Col md={12}>
                              <Form.Group controlId="landLocation">
                                <Form.Label className={classes.labelTxt}>
                                  Land Location
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className={classes.optioncss}
                                  placeholder="Enter Land Address"
                                  value={propertyAddress}
                                  onChange={(e) =>
                                    setPropertyAddress(e.target.value)
                                  }
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col md={12}>
                              <Form.Group controlId="landLocation">
                                <Form.Label className={classes.labelTxt}>
                                  Surveyor's Name
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className={classes.optioncss}
                                  placeholder="Enter Survey Plan Coordinates"
                                  value={surveyorName}
                                  onChange={(e) =>
                                    setSurveyorName(e.target.value)
                                  }
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col md={12}>
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
                          </Row>
                          <Row className="mb-3">
                            <Col md={12}>
                              <Form.Group controlId="surveyPlanNumber">
                                <Form.Label className={classes.labelTxt}>
                                  Survey Plan Number
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className={classes.optioncss}
                                  placeholder="Enter Plan Number"
                                  value={surveyPlanNumber}
                                  onChange={(e) =>
                                    setSurveyPlanNumber(e.target.value)
                                  }
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col md={12}>
                              <Form.Group controlId="landLocation">
                                <Form.Label className={classes.labelTxt}>
                                  Date
                                </Form.Label>
                                <Form.Control
                                  type="Date"
                                  className={classes.optioncss}
                                  value={selectedDate}
                                  onChange={(e) =>
                                    setSelectedDate(e.target.value)
                                  }
                                />
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
                            <Col md={12}>
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
                                <p style={{ fontSize: 12, color: "red" }}>
                                  {imgError}
                                </p>
                                {/* <Form.Control className={classes.optioncss} type="file" accept=".pdf" onChange={handleFileChange} /> */}
                              </Form.Group>
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
                                        Information supplied in this form is
                                        treated as strictly confidential. <br />
                                        I/We realise that it is an offense to
                                        make a false statement/claim in this
                                        form and that any allocation granted me
                                        on the basis of such false claim is
                                        revocable and may be revoked, and if a
                                        certificate of occupancy has been
                                        granted, such certificate must be
                                        revoked.
                                        <br />
                                        The Bureau of Lands and Survey accepts
                                        no responsibility for an application
                                        form not completed properly and for
                                        which reason such an application may be
                                        rejected. <br />
                                        I/We undertake to pay all necessary fees
                                        due to the preparation of a certificate
                                        of occupancy which may be issued
                                        consequent upon this application. <br />
                                        Should I withdraw the above application
                                        after making such deposit, I agree to
                                        forfeit the whole or such portion
                                        thereof as the Governor may decide.
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
                  </Container>
                </div>
              </Modal.Body>
            </Modal>

            <Modal
              show={show30}
              onHide={handleClose30}
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
                        New Land Allocation Application
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={handleClose30}
                      ></button>
                    </div>
                    <hr />
                    <Form>
                      <Row className="mb-3">
                        <Col md={12}>
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
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
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

                      {/* <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="allocationDate">
                            <Form.Label className={classes.labelTxt}>
                              Land Allocation Date
                            </Form.Label>
                            <Form.Control
                              type="date"
                              className={classes.optioncss}
                              value={allocationDate}
                              onChange={(e) =>
                                setAllocationDate(e.target.value)
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row> */}

                      <Row className="mb-3">
                        <Col md={12}>
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
                        <Col md={12}>
                          <Form.Group controlId="developmentStatus">
                            <Form.Label className={classes.labelTxt}>
                              Development Status of Land
                            </Form.Label>
                            <Form.Select
                              className={classes.optioncss}
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

                      <Row className="mb-3">
                        <Col md={12}>
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
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="option3">
                            <Form.Label className={classes.labelTxt}>
                              Proposed Residential Building (Not Specified)
                            </Form.Label>
                            <Form.Select onChange={handleProposedBuild}>
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
                        <Col md={12}>
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
                        <Col md={12}>
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
                        <Col md={12}>
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
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
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
                            <p style={{ fontSize: 12, color: "red" }}>
                              {imgError}
                            </p>
                            {/* <Form.Control className={classes.optioncss} type="file" accept=".pdf" onChange={handleFileChange} /> */}
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Label className={classes.labelTxt}>
                            Purchase Agreement
                          </Form.Label>
                          <div
                            className={classes.fileUpload}
                            onClick={handleClick10}
                          >
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
                          <p style={{ fontSize: 12, color: "red" }}>
                            {imgError1}
                          </p>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Label className={classes.labelTxt}>
                            Purchase Receipt
                          </Form.Label>
                          <div
                            className={classes.fileUpload}
                            onClick={handleClick20}
                          >
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
                          <p style={{ fontSize: 12, color: "red" }}>
                            {imgError1}
                          </p>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Label className={classes.labelTxt}>
                            Other Supporting Document
                          </Form.Label>
                          <div
                            className={classes.fileUpload}
                            onClick={handleClick}
                          >
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
                          <p style={{ fontSize: 12, color: "red" }}>
                            {imgError1}
                          </p>
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
                                    Information supplied in this form is treated
                                    as strictly confidential. <br />
                                    I/We realise that it is an offense to make a
                                    false statement/claim in this form and that
                                    any allocation granted me on the basis of
                                    such false claim is revocable and may be
                                    revoked, and if a certificate of occupancy
                                    has been granted, such certificate must be
                                    revoked.
                                    <br />
                                    The Bureau of Lands and Survey accepts no
                                    responsibility for an application form not
                                    completed properly and for which reason such
                                    an application may be rejected. <br />
                                    I/We undertake to pay all necessary fees due
                                    to the preparation of a certificate of
                                    occupancy which may be issued consequent
                                    upon this application. <br />
                                    Should I withdraw the above application
                                    after making such deposit, I agree to
                                    forfeit the whole or such portion thereof as
                                    the Governor may decide.
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
                  </Container>
                </div>
              </Modal.Body>
              {/* <Modal.Footer djdjkdkjdjkd>
                <Button variant="danger" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="success" onClick={createApplication} disabled={!isFormValid}>
                  {createLoading ? (
                    <>
                      <Spinner size="sm" />
                      <span style={{ marginLeft: "5px" }}>
                        creating new application, please wait...
                      </span>
                    </>
                  ) : (
                    "Submit Application"
                  )}
                  </Button>
               
              </Modal.Footer> */}
            </Modal>
            <Modal
              show={showSearch}
              onHide={handleCloseSearch}
              size="lg"
              centered
              animation={false}
            >
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
                      <h5 className="fw-bold">New Land Search Application</h5>
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={handleCloseSearch}
                      ></button>
                    </div>
                    <hr />
                    <Form>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="landLocation">
                            <Form.Label className={classes.labelTxt}>
                              Page Number
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className={classes.optioncss}
                              placeholder="Enter Page Number"
                              value={landLocation}
                              onChange={(e) => setLandLocation(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="proposedTimeline">
                            <Form.Label className={classes.labelTxt}>
                              Volume Number
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className={classes.optioncss}
                              placeholder="Enter Volume Number"
                              value={timeLine}
                              onChange={(e) => setTimeLine(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="allocationDate">
                            <Form.Label className={classes.labelTxt}>
                              Date Issued
                            </Form.Label>
                            <Form.Control
                              type="date"
                              className={classes.optioncss}
                              value={allocationDate}
                              onChange={(e) =>
                                setAllocationDate(e.target.value)
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
                            onClick={createLandSearch}
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
                  </Container>
                </div>
              </Modal.Body>
              {/* <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="success" onClick={createApplication} disabled={!isFormValid}>
                  {createLoading ? (
                    <>
                      <Spinner size="sm" />
                      <span style={{ marginLeft: "5px" }}>
                        creating new application, please wait...
                      </span>
                    </>
                  ) : (
                    "Submit Application"
                  )}
                  </Button>
               
              </Modal.Footer> */}
            </Modal>
            <Modal
              show={show1}
              onHide={handleClose1}
              size="lg"
              centered
              animation={false}
            >
              {/* <Modal.Header>
                <Modal.Title style={{
                  fontSize: 18,
                  color: "#333333",
                  fontWeight: 500
                }}>Land Allocation</Modal.Title>
                <Button variant="close" onClick={handleClose}></Button>
              </Modal.Header> */}
              <Modal.Header closeButton>
                <Modal.Title>Property Registration Programme</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h6>Contents</h6>
                {/* </div> */}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleClose1}>
                  Close
                </Button>
                {/* <Button variant="success"> </Button> */}
              </Modal.Footer>
            </Modal>
            <Modal
              show={showCaveat}
              onHide={handleCloseCaveat}
              size="lg"
              centered
              animation={false}
            >
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
                      <h5 className="fw-bold">New Caveat Application</h5>
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={handleCloseCaveat}
                      ></button>
                    </div>
                    <hr />
                    <Form>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="landLocation">
                            <Form.Label className={classes.labelTxt}>
                              Select Caveat Type
                            </Form.Label>
                            <Form.Select aria-label="Default select example">
                              <option>Open this select menu</option>
                              {caveatTypes.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="landLocation">
                            <Form.Label className={classes.labelTxt}>
                              Page Number
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className={classes.optioncss}
                              placeholder="Enter Page Number"
                              value={pageNumber}
                              onChange={(e) => setPageNumber(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="proposedTimeline">
                            <Form.Label className={classes.labelTxt}>
                              Volume Number
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className={classes.optioncss}
                              placeholder="Enter Volume Number"
                              value={volumeNumber}
                              onChange={(e) => setVolumeNumber(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="allocationDate">
                            <Form.Label>Reason for Caveat</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              value={reason}
                              onChange={(e) => setReason(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12} className="text-center">
                          <Button
                            className={classes.modBtnn}
                            variant="success"
                            onClick={createCaveatApplication}
                            disabled={!isFormValid}
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
                  </Container>
                </div>
              </Modal.Body>
              {/* <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="success" onClick={createApplication} disabled={!isFormValid}>
                  {createLoading ? (
                    <>
                      <Spinner size="sm" />
                      <span style={{ marginLeft: "5px" }}>
                        creating new application, please wait...
                      </span>
                    </>
                  ) : (
                    "Submit Application"
                  )}
                  </Button>
               
              </Modal.Footer> */}
            </Modal>
            <Modal
              show={show2}
              onHide={handleClose2}
              size="lg"
              centered
              animation={false}
            >
              {/* <Modal.Header>
                <Modal.Title style={{
                  fontSize: 18,
                  color: "#333333",
                  fontWeight: 500
                }}>Land Allocation</Modal.Title>
                <Button variant="close" onClick={handleClose}></Button>
              </Modal.Header> */}
              <Modal.Header closeButton>
                <Modal.Title>H.O.C</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h6>Contents</h6>
                {/* </div> */}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleClose2}>
                  Close
                </Button>
                {/* <Button variant="success"> </Button> */}
              </Modal.Footer>
            </Modal>
            <Modal
              show={show3}
              onHide={handleClose3}
              size="lg"
              centered
              animation={false}
            >
              {/* <Modal.Header>
                <Modal.Title style={{
                  fontSize: 18,
                  color: "#333333",
                  fontWeight: 500
                }}>Land Allocation</Modal.Title>
                <Button variant="close" onClick={handleClose}></Button>
              </Modal.Header> */}
              <Modal.Header closeButton>
                <Modal.Title>Land Allocation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h6>Contents</h6>
                {/* </div> */}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleClose3}>
                  Close
                </Button>
                {/* <Button variant="success"> </Button> */}
              </Modal.Footer>
            </Modal>
            <Modal
              show={show4}
              onHide={handleClose4}
              size="lg"
              centered
              animation={false}
            >
              {/* <Modal.Header>
                <Modal.Title style={{
                  fontSize: 18,
                  color: "#333333",
                  fontWeight: 500
                }}>Land Allocation</Modal.Title>
                <Button variant="close" onClick={handleClose}></Button>
              </Modal.Header> */}
              <Modal.Header closeButton>
                <Modal.Title>Property Registration Programme</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h6>Contents</h6>
                {/* </div> */}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleClose1}>
                  Close
                </Button>
                {/* <Button variant="success"> </Button> */}
              </Modal.Footer>
            </Modal>
            <Modal
              show={show5}
              onHide={handleClose5}
              size="lg"
              centered
              animation={false}
            >
              {/* <Modal.Header>
                <Modal.Title style={{
                  fontSize: 18,
                  color: "#333333",
                  fontWeight: 500
                }}>Land Allocation</Modal.Title>
                <Button variant="close" onClick={handleClose}></Button>
              </Modal.Header> */}
              {/* <Modal.Header closeButton>
                <Modal.Title>Governor’s Consent</Modal.Title>
              </Modal.Header> */}
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
                        New Application for Governor’s Consent
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={handleClose5}
                      ></button>
                    </div>
                    <hr />
                    <Form>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="lga">
                            <Form.Label className={classes.labelTxt}>
                              Type of Governor's Consent
                            </Form.Label>
                            <Form.Control
                              as="select"
                              className={`form-select ${classes.optioncss}`}
                              value={selectedConsent}
                              onChange={handleConsent}
                              required
                            >
                              <option value="">Select Type</option>
                              {consentTypes?.map((item, index) => (
                                <option
                                  key={index}
                                  value={item.id}
                                  name={item.name}
                                >
                                  {item.name}
                                </option>
                              ))}
                            </Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
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
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
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
                        <Col md={12}>
                          <Form.Group controlId="allocationDate">
                            <Form.Label className={classes.labelTxt}>
                              C of O Number
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className={classes.optioncss}
                              value={cofoNumber}
                              onChange={(e) => setCofONumber(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="developmentStatus">
                            <Form.Label className={classes.labelTxt}>
                              Development Status of Land
                            </Form.Label>
                            <Form.Select
                              className={classes.optioncss}
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

                      <Row className="mb-3">
                        <Col md={12}>
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
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="option3">
                            <Form.Label className={classes.labelTxt}>
                              Proposed Residential Building
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
                        <Col md={12}>
                          <Form.Group controlId="proposedTimeline">
                            <Form.Label className={classes.labelTxt}>
                              Property Size in Plot
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className={classes.optioncss}
                              placeholder="Enter Size in plot"
                              value={plotSize}
                              onChange={(e) => setPlotSize(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="proposedTimeline">
                            <Form.Label className={classes.labelTxt}>
                              Property Size in SQM
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className={classes.optioncss}
                              placeholder="Enter Size in SQM"
                              value={propertySize}
                              onChange={(e) => setPropertySize(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="sourceOfFunds">
                            <Form.Label className={classes.labelTxt}>
                              State nature of Grant
                            </Form.Label>
                            <Form.Select
                              className={classes.optioncss}
                              onChange={handleGrantNature}
                            >
                              <option value="">Select nature of grant</option>
                              <option value="sublease">Sublease</option>
                              <option value="assignment">Assignment</option>
                              <option value="mortgage">Mortgage</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Label className={classes.labelTxt}>
                            Certificate of Occupancy (CofO)
                          </Form.Label>
                          <div
                            className={classes.fileUpload}
                            onClick={handleClick2}
                          >
                            <img
                              src={ImageIcon}
                              alt="icon"
                              className={classes.leftIcon}
                            />
                            <span className={classes.uploadText}>
                              {fileName2.length > 30
                                ? fileName2.slice(0, 30) + "..."
                                : fileName2}
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
                              ref={fileInputRef2}
                              onChange={handleFileChange3}
                              className={classes.hiddenFile}
                            />
                          </div>
                          <p style={{ fontSize: 12, color: "red" }}>
                            {imgError}
                          </p>
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
                                    Information supplied in this form is treated
                                    as strictly confidential. <br />
                                    I/We realise that it is an offense to make a
                                    false statement/claim in this form and that
                                    any allocation granted me on the basis of
                                    such false claim is revocable and may be
                                    revoked, and if a certificate of occupancy
                                    has been granted, such certificate must be
                                    revoked.
                                    <br />
                                    The Bureau of Lands and Survey accepts no
                                    responsibility for an application form not
                                    completed properly and for which reason such
                                    an application may be rejected. <br />
                                    I/We undertake to pay all necessary fees due
                                    to the preparation of a certificate of
                                    occupancy which may be issued consequent
                                    upon this application. <br />
                                    Should I withdraw the above application
                                    after making such deposit, I agree to
                                    forfeit the whole or such portion thereof as
                                    the Governor may decide.
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
                            onClick={createApplication3}
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
                  </Container>
                </div>
              </Modal.Body>
              {/* <Modal.Footer>
                <Button variant="danger" onClick={handleClose5}>
                  Close
                </Button>
                <Button variant="success" onClick={createApplication3}>
                  {createLoading ? (
                    <>
                      <Spinner size="sm" />
                      <span style={{ marginLeft: "5px" }}>
                        creating new application, please wait...
                      </span>
                    </>
                  ) : (
                    "Submit Application"
                  )}
                  </Button>
                </Modal.Footer> */}
            </Modal>

            <Modal
              show={show6}
              onHide={handleClose6}
              size="lg"
              centered
              animation={false}
            >
              {/* <Modal.Header>
                <Modal.Title style={{
                  fontSize: 18,
                  color: "#333333",
                  fontWeight: 500
                }}>Land Allocation</Modal.Title>
                <Button variant="close" onClick={handleClose}></Button>
              </Modal.Header> */}
              {/* <Modal.Header closeButton>
                <Modal.Title>Land Ratification</Modal.Title>
              </Modal.Header> */}
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
                      <h5 className="fw-bold">Land Ratification Application</h5>
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={handleClose6}
                      ></button>
                    </div>
                    <hr />
                    <Form>
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
                        <Col md={12}>
                          <Form.Group controlId="lga">
                            <Form.Label className={classes.labelTxt}>
                              Area
                            </Form.Label>
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
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
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

                      {/* <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="landLocation">
                            <Form.Label className={classes.labelTxt}>
                              Location of Land
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className={classes.optioncss}
                              placeholder="Enter Land Location"
                              value={landLocation}
                              onChange={e => setLandLocation(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row> */}

                      {/* <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="allocationDate">
                            <Form.Label className={classes.labelTxt}>
                              Land Allocation Date
                            </Form.Label>
                            <Form.Control
                              type="date"
                              className={classes.optioncss}
                              value={allocationDate}
                              onChange={e => setAllocationDate(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row> */}

                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="developmentStatus">
                            <Form.Label className={classes.labelTxt}>
                              Development Status of Land
                            </Form.Label>
                            <Form.Select
                              className={classes.optioncss}
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

                      <Row className="mb-3">
                        <Col md={12}>
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
                        <Col md={12}>
                          <Form.Group controlId="option3">
                            <Form.Label className={classes.labelTxt}>
                              Proposed Residential Building
                            </Form.Label>
                            <Form.Select onChange={handleProposedBuild}>
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
                        <Col md={12}>
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
                        <Col md={12}>
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
                        <Col md={12}>
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
                        <Col md={12}>
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
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
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
                      {/* <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="estimatedValue">
                            <Form.Label className={classes.labelTxt}>
                              Capital Contribution Value{" "}
                              <span
                                style={{ fontSize: "13px", color: "#555555" }}
                              >
                                <b>(If it's Govt. allocated land)</b>
                              </span>
                            </Form.Label>
                            <CurrencyInput
                              id="capital-amount"
                              name="capitalAmoun"
                              value={capitalAmount}
                              decimalsLimit={2}
                              onValueChange={value => setCapitalAmount(value)}
                              prefix="₦"
                              groupSeparator=","
                              placeholder="Enter Amount"
                              className={`form-control ${classes.optioncss}`}
                            />
                          </Form.Group>
                        </Col>
                      </Row> */}
                      {/* <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="estimatedValue">
                            <Form.Label className={classes.labelTxt}>
                              Premium Value{" "}
                              <span
                                style={{ fontSize: "13px", color: "#555555" }}
                              >
                                <b>(If it's Govt. allocated land)</b>
                              </span>
                            </Form.Label>
                            <CurrencyInput
                              id="premium-amount"
                              name="premiumAmount"
                              value={premiumAmount}
                              decimalsLimit={2}
                              onValueChange={value => setPremiumValue(value)}
                              prefix="₦"
                              groupSeparator=","
                              placeholder="Enter Amount"
                              className={`form-control ${classes.optioncss}`}
                            />
                          </Form.Group>
                        </Col>
                      </Row> */}
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="estimatedValue">
                            <Form.Label className={classes.labelTxt}>
                              Document Value{" "}
                              <span
                                style={{ fontSize: "13px", color: "#555555" }}
                              >
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
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
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
                            <p style={{ fontSize: 12, color: "red" }}>
                              {imgError}
                            </p>
                            {/* <Form.Control className={classes.optioncss} type="file" accept=".pdf" onChange={handleFileChange} /> */}
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Label className={classes.labelTxt}>
                            Purchase Agreement
                          </Form.Label>
                          <div
                            className={classes.fileUpload}
                            onClick={handleClick30}
                          >
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
                          <p style={{ fontSize: 12, color: "red" }}>
                            {imgError1}
                          </p>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Label className={classes.labelTxt}>
                            Purchase Receipt
                          </Form.Label>
                          <div
                            className={classes.fileUpload}
                            onClick={handleClick40}
                          >
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
                          <p style={{ fontSize: 12, color: "red" }}>
                            {imgError1}
                          </p>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Label className={classes.labelTxt}>
                            Other Supporting Document
                          </Form.Label>
                          <div
                            className={classes.fileUpload}
                            onClick={handleClick}
                          >
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
                          <p style={{ fontSize: 12, color: "red" }}>
                            {imgError1}
                          </p>
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
                                    Information supplied in this form is treated
                                    as strictly confidential. <br />
                                    I/We realise that it is an offense to make a
                                    false statement/claim in this form and that
                                    any allocation granted me on the basis of
                                    such false claim is revocable and may be
                                    revoked, and if a certificate of occupancy
                                    has been granted, such certificate must be
                                    revoked.
                                    <br />
                                    The Bureau of Lands and Survey accepts no
                                    responsibility for an application form not
                                    completed properly and for which reason such
                                    an application may be rejected. <br />
                                    I/We undertake to pay all necessary fees due
                                    to the preparation of a certificate of
                                    occupancy which may be issued consequent
                                    upon this application. <br />
                                    Should I withdraw the above application
                                    after making such deposit, I agree to
                                    forfeit the whole or such portion thereof as
                                    the Governor may decide.
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
                  </Container>
                </div>
              </Modal.Body>
              {/* <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="success"> </Button>
              </Modal.Footer> */}
            </Modal>

            <Modal
              show={show57}
              onHide={handleClose57}
              size="lg"
              centered
              animation={false}
            >
              {/* <Modal.Header>
                <Modal.Title style={{
                  fontSize: 18,
                  color: "#333333",
                  fontWeight: 500
                }}>Land Allocation</Modal.Title>
                <Button variant="close" onClick={handleClose}></Button>
              </Modal.Header> */}
              {/* <Modal.Header closeButton>
                <Modal.Title>Land Ratification</Modal.Title>
              </Modal.Header> */}
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
                      <h5 className="fw-bold">Amnesty (PRP)</h5>
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={handleClose57}
                      ></button>
                    </div>
                    <hr />
                    <Form>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="pagenumber">
                            <Form.Label className={classes.labelTxt}>
                              Survey Plan Number
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className={classes.optioncss}
                              placeholder="Enter Survey Plan Number"
                              value={surveyPlanNumber}
                              onChange={(e) =>
                                setSurveyPlanNumber(e.target.value)
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="voulumenumber">
                            <Form.Label className={classes.labelTxt}>
                              Acquisition Type
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className={classes.optioncss}
                              placeholder="Enter Acquisition Type"
                              value={acquisitionType}
                              onChange={(e) =>
                                setAcquisitionType(e.target.value)
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="landLocation">
                            <Form.Label className={classes.labelTxt}>
                              Address of Development
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className={classes.optioncss}
                              placeholder="Enter address of development"
                              value={landLocation}
                              onChange={(e) => setLandLocation(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
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
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="landLocation">
                            <Form.Label className={classes.labelTxt}>
                              Number of Structures Existing on the Land
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className={classes.optioncss}
                              placeholder="Enter Number of structures"
                              value={structureNo}
                              onChange={(e) => setStructureNo(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="developmentStatus">
                            <Form.Label className={classes.labelTxt}>
                              Mode of Property Acquisition
                            </Form.Label>
                            <Form.Select className={classes.optioncss}>
                              <option value="">
                                Select mode of property acquisition
                              </option>
                              <option value="self built">Self Built</option>
                              <option value="purchased">Purchased</option>
                              <option value="inherited">Inherited</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="developmentStatus">
                            <Form.Label className={classes.labelTxt}>
                              Property Occupier
                            </Form.Label>
                            <Form.Select className={classes.optioncss}>
                              <option value="">Select property occupier</option>
                              <option value="owner">Owner</option>
                              <option value="tenanted">Tenanted</option>
                              <option value="owner and tenant">
                                Owner and Tenant
                              </option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="landLocation">
                            <Form.Label className={classes.labelTxt}>
                              Total Number of Occupants
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className={classes.optioncss}
                              placeholder="Enter Number of occupants"
                              value={occupantsNo}
                              onChange={(e) => setOccupantsNo(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
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
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="option3">
                            <Form.Label className={classes.labelTxt}>
                              Proposed Residential Building
                            </Form.Label>
                            <Form.Select onChange={handleProposedBuild}>
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
                        <Col md={12}>
                          <Form.Group controlId="option3">
                            <Form.Label className={classes.labelTxt}>
                              Resident in Ogun State
                            </Form.Label>
                            <Form.Select>
                              <option value="">Select Residency</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={12}>
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
                            <p style={{ fontSize: 12, color: "red" }}>
                              {imgError}
                            </p>
                            {/* <Form.Control className={classes.optioncss} type="file" accept=".pdf" onChange={handleFileChange} /> */}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="architecturalDocuments">
                            <Form.Label className={classes.labelTxt}>
                              Architectural Documents
                            </Form.Label>
                            <div
                              className={classes.fileUpload}
                              onClick={handleArchitecturalClick}
                            >
                              <img
                                src={ImageIcon}
                                alt="icon"
                                className={classes.leftIcon}
                              />
                              <span className={classes.uploadText}>
                                {architectural.length > 30
                                  ? architectural.slice(0, 30) + "..."
                                  : architectural}
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
                                ref={architecturalRef}
                                onChange={handleArchitecturalChange}
                                className={classes.hiddenFile}
                              />
                            </div>
                            <p style={{ fontSize: 12, color: "red" }}>
                              {imgError}
                            </p>
                            {/* <Form.Control className={classes.optioncss} type="file" accept=".pdf" onChange={handleFileChange} /> */}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="titleDocuments">
                            <Form.Label className={classes.labelTxt}>
                              Title Documents
                            </Form.Label>
                            <div
                              className={classes.fileUpload}
                              onClick={handleTitleClick}
                            >
                              <img
                                src={ImageIcon}
                                alt="icon"
                                className={classes.leftIcon}
                              />
                              <span className={classes.uploadText}>
                                {title.length > 30
                                  ? title.slice(0, 30) + "..."
                                  : title}
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
                                ref={titleRef}
                                onChange={handleTitleChange}
                                className={classes.hiddenFile}
                              />
                            </div>
                            <p style={{ fontSize: 12, color: "red" }}>
                              {imgError}
                            </p>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="titleDocuments">
                            <Form.Label className={classes.labelTxt}>
                              Photograph of the building(front view)
                            </Form.Label>
                            <div
                              className={classes.fileUpload}
                              onClick={handlePhotoClick}
                            >
                              <img
                                src={ImageIcon}
                                alt="icon"
                                className={classes.leftIcon}
                              />
                              <span className={classes.uploadText}>
                                {frontPhoto.length > 30
                                  ? frontPhoto.slice(0, 30) + "..."
                                  : frontPhoto}
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
                                ref={photoRef}
                                onChange={handlePhotoChange}
                                className={classes.hiddenFile}
                              />
                            </div>
                            <p style={{ fontSize: 12, color: "red" }}>
                              {imgError}
                            </p>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="structuralDrawings">
                            <Form.Label className={classes.labelTxt}>
                              Structural drawings
                            </Form.Label>
                            <div
                              className={classes.fileUpload}
                              onClick={handleStructuralClick}
                            >
                              <img
                                src={ImageIcon}
                                alt="icon"
                                className={classes.leftIcon}
                              />
                              <span className={classes.uploadText}>
                                {structuralDrawing.length > 30
                                  ? structuralDrawing.slice(0, 30) + "..."
                                  : structuralDrawing}
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
                                ref={structuralRef}
                                onChange={handleStructuralDraw}
                                className={classes.hiddenFile}
                              />
                            </div>
                            <p style={{ fontSize: 12, color: "red" }}>
                              {imgError}
                            </p>
                          </Form.Group>
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
                                    Information supplied in this form is treated
                                    as strictly confidential. <br />
                                    I/We realise that it is an offense to make a
                                    false statement/claim in this form and that
                                    any allocation granted me on the basis of
                                    such false claim is revocable and may be
                                    revoked, and if a certificate of occupancy
                                    has been granted, such certificate must be
                                    revoked.
                                    <br />
                                    The Bureau of Lands and Survey accepts no
                                    responsibility for an application form not
                                    completed properly and for which reason such
                                    an application may be rejected. <br />
                                    I/We undertake to pay all necessary fees due
                                    to the preparation of a certificate of
                                    occupancy which may be issued consequent
                                    upon this application. <br />
                                    Should I withdraw the above application
                                    after making such deposit, I agree to
                                    forfeit the whole or such portion thereof as
                                    the Governor may decide.
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
                            onClick={createAmensty}
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
                  </Container>
                </div>
              </Modal.Body>
              {/* <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="success"> </Button>
              </Modal.Footer> */}
            </Modal>

            <Modal
              show={showCopy}
              onHide={handleCloseCopy}
              size="lg"
              centered
              animation={false}
            >
              {/* <Modal.Header>
                <Modal.Title style={{
                  fontSize: 18,
                  color: "#333333",
                  fontWeight: 500
                }}>Land Allocation</Modal.Title>
                <Button variant="close" onClick={handleClose}></Button>
              </Modal.Header> */}
              {/* <Modal.Header closeButton>
                <Modal.Title>Land Ratification</Modal.Title>
              </Modal.Header> */}
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
                      <h5 className="fw-bold">Certifield True Copy</h5>
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={handleCloseCopy}
                      ></button>
                    </div>
                    <hr />
                    <Form>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="Page No">
                            <Form.Label className={classes.labelTxt}>
                              Page Number
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className={classes.optioncss}
                              placeholder="Enter Page Number"
                              value={pageNumber}
                              onChange={(e) => setPageNumber(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="Page No">
                            <Form.Label className={classes.labelTxt}>
                              Volume Number
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className={classes.optioncss}
                              placeholder="Enter Volume Number"
                              value={volumeNumber}
                              onChange={(e) => setVolumeNumber(e.target.value)}
                            />
                          </Form.Group>
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
                                    Information supplied in this form is treated
                                    as strictly confidential. <br />
                                    I/We realise that it is an offense to make a
                                    false statement/claim in this form and that
                                    any allocation granted me on the basis of
                                    such false claim is revocable and may be
                                    revoked, and if a certificate of occupancy
                                    has been granted, such certificate must be
                                    revoked.
                                    <br />
                                    The Bureau of Lands and Survey accepts no
                                    responsibility for an application form not
                                    completed properly and for which reason such
                                    an application may be rejected. <br />
                                    I/We undertake to pay all necessary fees due
                                    to the preparation of a certificate of
                                    occupancy which may be issued consequent
                                    upon this application. <br />
                                    Should I withdraw the above application
                                    after making such deposit, I agree to
                                    forfeit the whole or such portion thereof as
                                    the Governor may decide.
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
                            onClick={createTrueCopy}
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
                  </Container>
                </div>
              </Modal.Body>
              {/* <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="success"> </Button>
              </Modal.Footer> */}
            </Modal>

            <Modal
              show={showConfirm}
              onHide={handleCloseConfirm}
              size="lg"
              centered
              animation={false}
            >
              {/* <Modal.Header>
                <Modal.Title style={{
                  fontSize: 18,
                  color: "#333333",
                  fontWeight: 500
                }}>Land Allocation</Modal.Title>
                <Button variant="close" onClick={handleClose}></Button>
              </Modal.Header> */}
              {/* <Modal.Header closeButton>
                <Modal.Title>Land Ratification</Modal.Title>
              </Modal.Header> */}
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
                      <h5 className="fw-bold">Confirmation</h5>
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={handleCloseConfirm}
                      ></button>
                    </div>
                    <hr />
                    <Form>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="Page No">
                            <Form.Label className={classes.labelTxt}>
                              Page Number
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className={classes.optioncss}
                              placeholder="Enter Page Number"
                              value={pageNumber1}
                              onChange={(e) => setPageNumber1(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="Page No">
                            <Form.Label className={classes.labelTxt}>
                              Volume Number
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className={classes.optioncss}
                              placeholder="Enter Volume Number"
                              value={volumeNumber1}
                              onChange={(e) => setVolumeNumber1(e.target.value)}
                            />
                          </Form.Group>
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
                                    Information supplied in this form is treated
                                    as strictly confidential. <br />
                                    I/We realise that it is an offense to make a
                                    false statement/claim in this form and that
                                    any allocation granted me on the basis of
                                    such false claim is revocable and may be
                                    revoked, and if a certificate of occupancy
                                    has been granted, such certificate must be
                                    revoked.
                                    <br />
                                    The Bureau of Lands and Survey accepts no
                                    responsibility for an application form not
                                    completed properly and for which reason such
                                    an application may be rejected. <br />
                                    I/We undertake to pay all necessary fees due
                                    to the preparation of a certificate of
                                    occupancy which may be issued consequent
                                    upon this application. <br />
                                    Should I withdraw the above application
                                    after making such deposit, I agree to
                                    forfeit the whole or such portion thereof as
                                    the Governor may decide.
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
                            onClick={createConfirm}
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
                  </Container>
                </div>
              </Modal.Body>
              {/* <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="success"> </Button>
              </Modal.Footer> */}
            </Modal>

            <Modal
              show={show7}
              onHide={handleClose7}
              size="lg"
              centered
              animation={false}
            >
              {/* <Modal.Header>
                <Modal.Title style={{
                  fontSize: 18,
                  color: "#333333",
                  fontWeight: 500
                }}>Land Allocation</Modal.Title>
                <Button variant="close" onClick={handleClose}></Button>
              </Modal.Header> */}
              {/* <Modal.Header closeButton>
                <Modal.Title>Land Ratification</Modal.Title>
              </Modal.Header> */}
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
                        Under Developed Private C of O Application
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={handleClose7}
                      ></button>
                    </div>
                    <hr />
                    <Form>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="landLocation">
                            <Form.Label className={classes.labelTxt}>
                              Location of Land
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className={classes.optioncss}
                              placeholder="Enter Land Location"
                              value={landLocation}
                              onChange={(e) => setLandLocation(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="landLocation">
                            <Form.Label className={classes.labelTxt}>
                              Length of time of possession of property
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className={classes.optioncss}
                              placeholder="Length of time for which property has been in your possession"
                              value={possessionLength}
                              onChange={(e) =>
                                setPossessionLength(e.target.value)
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
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
                      <Row className="mb-3">
                        <Col md={12}>
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
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="sourceOfFunds">
                            <Form.Label className={classes.labelTxt}>
                              Property Ownership
                            </Form.Label>
                            <Form.Select
                              className={classes.optioncss}
                              onChange={handlePropOwnership}
                            >
                              <option value="">
                                Select property ownership
                              </option>
                              <option value="freehold">Freehold</option>
                              <option value="leasehold">Lease hold</option>
                              <option value="mortgage">
                                Subject to Mortgage
                              </option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="estimatedValue">
                            <Form.Label className={classes.labelTxt}>
                              How much money are you prepared to invest on
                              developing the property or to continue developing
                              it?
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
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="proposedTimeline">
                            <Form.Label className={classes.labelTxt}>
                              Give the approximate size of any other property
                              owned by you in Ogun state
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
                        <Col md={12}>
                          <Form.Group controlId="proposedTimeline">
                            <Form.Label className={classes.labelTxt}>
                              How soon are you prepared to make the investment?
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className={classes.optioncss}
                              placeholder="Enter how soon are you prepared to make the investment?"
                              value={tenement}
                              onChange={(e) => setTenement(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="surveyPlan">
                            <Form.Label className={classes.labelTxt}>
                              Evidence of title (e.g conveyance, agreement,
                              receipt e.t.c)
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
                            <p style={{ fontSize: 12, color: "red" }}>
                              {imgError}
                            </p>
                            {/* <Form.Control className={classes.optioncss} type="file" accept=".pdf" onChange={handleFileChange} /> */}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
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
                          <p style={{ fontSize: 12, color: "red" }}>
                            {imgError1}
                          </p>
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
                                    Information supplied in this form is treated
                                    as strictly confidential. <br />
                                    I/We realise that it is an offense to make a
                                    false statement/claim in this form and that
                                    any allocation granted me on the basis of
                                    such false claim is revocable and may be
                                    revoked, and if a certificate of occupancy
                                    has been granted, such certificate must be
                                    revoked.
                                    <br />
                                    The Bureau of Lands and Survey accepts no
                                    responsibility for an application form not
                                    completed properly and for which reason such
                                    an application may be rejected. <br />
                                    I/We undertake to pay all necessary fees due
                                    to the preparation of a certificate of
                                    occupancy which may be issued consequent
                                    upon this application. <br />
                                    Should I withdraw the above application
                                    after making such deposit, I agree to
                                    forfeit the whole or such portion thereof as
                                    the Governor may decide.
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
                    </Form>
                  </Container>
                </div>
              </Modal.Body>
              {/* <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="success"> </Button>
              </Modal.Footer> */}
            </Modal>
            <Modal
              show={show8}
              onHide={handleClose8}
              size="lg"
              centered
              animation={false}
            >
              {/* <Modal.Header>
                <Modal.Title style={{
                  fontSize: 18,
                  color: "#333333",
                  fontWeight: 500
                }}>Land Allocation</Modal.Title>
                <Button variant="close" onClick={handleClose}></Button>
              </Modal.Header> */}
              {/* <Modal.Header closeButton>
                <Modal.Title>Land Ratification</Modal.Title>
              </Modal.Header> */}
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
                        Developed Private C of O Application
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={handleClose8}
                      ></button>
                    </div>
                    <hr />
                    <Form>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="landLocation">
                            <Form.Label className={classes.labelTxt}>
                              Location of Land
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className={classes.optioncss}
                              placeholder="Enter Land Location"
                              value={landLocation}
                              onChange={(e) => setLandLocation(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="landLocation">
                            <Form.Label className={classes.labelTxt}>
                              Length of time of possession of property
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className={classes.optioncss}
                              placeholder="Length of time for which property has been in your possession"
                              value={possessionLength}
                              onChange={(e) =>
                                setPossessionLength(e.target.value)
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="landLocation">
                            <Form.Label className={classes.labelTxt}>
                              State capacity in which you own the property{" "}
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className={classes.optioncss}
                              placeholder="e.g self built, by purchase, in inheritance, or how else"
                              value={propertyOwnership}
                              onChange={(e) =>
                                setPropertyOwnership(e.target.value)
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
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
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
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
                        <Col md={12}>
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
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
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

                      <Row className="mb-3">
                        <Col md={12}>
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
                            <p style={{ fontSize: 12, color: "red" }}>
                              {imgError}
                            </p>
                            {/* <Form.Control className={classes.optioncss} type="file" accept=".pdf" onChange={handleFileChange} /> */}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
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
                          <p style={{ fontSize: 12, color: "red" }}>
                            {imgError1}
                          </p>
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
                                    Information supplied in this form is treated
                                    as strictly confidential. <br />
                                    I/We realise that it is an offense to make a
                                    false statement/claim in this form and that
                                    any allocation granted me on the basis of
                                    such false claim is revocable and may be
                                    revoked, and if a certificate of occupancy
                                    has been granted, such certificate must be
                                    revoked.
                                    <br />
                                    The Bureau of Lands and Survey accepts no
                                    responsibility for an application form not
                                    completed properly and for which reason such
                                    an application may be rejected. <br />
                                    I/We undertake to pay all necessary fees due
                                    to the preparation of a certificate of
                                    occupancy which may be issued consequent
                                    upon this application. <br />
                                    Should I withdraw the above application
                                    after making such deposit, I agree to
                                    forfeit the whole or such portion thereof as
                                    the Governor may decide.
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
                    </Form>
                  </Container>
                </div>
              </Modal.Body>
              {/* <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="success"> </Button>
              </Modal.Footer> */}
            </Modal>

            
          </div>
        </div>
      </div>
    </>
  );
};

export default NewApplications;
