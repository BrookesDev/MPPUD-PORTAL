import React, { useState, useEffect, useRef } from "react";
import DashboardNav from "../../Components/Navigation.js/Navigation";
import Horheader from "../../Components/horheader/horheader";
import classes from "./NewApplications.module.css";
import PdfIcon from "../../Assets/pdf.svg";
import verified from "../../Assets/tick-circle.png";
import UploadIcon from "../../Assets/upload.png";
import crop from "../../Assets/repoort.png";
import agent from "../../Assets/agent.svg";
import Allocation from "../../Assets/allocation.png";
import Property from "../../Assets/property.png";
import Private from "../../Assets/privatecofo.png";
import Transaction from "../../Assets/transaction.png";
import Ratification from "../../Assets/ratification.png";
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
import PaidIcon from "../../Assets/completed.png";
import MoreIcon from "../../Assets/more.png";
import DownloadIcon from "../../Assets/download.png";
import TrackIcon from "../../Assets/track.png";
import NotPaidIcon from "../../Assets/Notpaid.png";
import Alert from "react-bootstrap/Alert";
import ContactIcon from "../../Assets/support.png";
import ViewIcon from "../../Assets/eye.png";
import InReviewIcon from "../../Assets/review.png";
import ReportIcon from "../../Assets/repoort.png";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../../API/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TimeLineIcon from "../../Assets/timeline.png";
import TimeLineIcon2 from "../../Assets/timeline2.png";
import TimeLineIcon3 from "../../Assets/timeline3.png";
import notransaction from "../../Assets/no-transaction-icon.svg";
import FirstIcon from "../../Assets/totalApp.png";
import SecondIcon from "../../Assets/notpaidd.png";
import ThirdIcon from "../../Assets/inrevieww.png";
import FourthIcon from "../../Assets/comp.png";
import PaymentIcon from "../../Assets/payment.png";
import TickIcon from "../../Assets/tick-circle.png";
import BuildingIcon from "../../Assets/buildings.png";
import { Row, Col } from "react-bootstrap";
import ImageIcon from "../../Assets/piclogo.png";
import { Navbar, Container, Button } from "react-bootstrap";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COUNTRIES, STATES, LGA } from "../../API/country";
// import NewApplications from '../New Application/NewApplicationns';

// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

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

const Amnesty = () => {
  const location = useLocation();
     const [showModalError, setShowModalError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { serviceID, paymentCode } = location.state || {};
  const [schemes, setSchemes] = useState([]);
  const [consentTypes, setConsentTypes] = useState([]);
  const [caveatTypes, setCaveatTypes] = useState([]);
  const [show, setShow] = useState(false);
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
  const handleClose = () => setShow(false);
  const handleCloseCert = () => setShowCert(false);
  const handleCloseScheme = () => setShowScheme(false);
  const handleCloseCopy = () => setShowCopy(false);
  const handleCloseConfirm = () => setShowConfirm(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showCaveat, setShowCaveat] = useState(false);
  const handleShowSearch = () => setShowSearch(true);
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
  const [bearer1, setBearer1] = useState("");
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
    const [showModalSuccess, setShowModalSuccess] = useState(false);
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

  console.log(selectedFile);

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
  const handleErrorOpen = () => {
    setShowModalError(true);
    // handleShowPaymentModal();
  };
  const createAmensty = async () => {
    console.log('Amnesty running')
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
      formData.append("tax_station_id", selectedStation);
      formData.append("tax_station_name", selectedStationName);
      formData.append("price_bought_per_plot", documentAmount);
      formData.append("location_name", selectedLocationName);
      formData.append("area_name", selectedAreaName);
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
      setModalMessage(response.data.message);
      handleErrorOpen()


      // Swal.fire({
      //   icon: 'success',
      //   title: 'Success',
      //   text: response.data.message,
      // });

      // handleClose6();

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
        setShowModalError(true);
        setModalMessage(JSON.stringify(error.response.data.message));
        // Swal.fire({
        //   icon: "error",
        //   title: "Failed",
        //   text: JSON.stringify(error.response.data.message),
        // });
      }
    } finally {
      setCreateLoading(false);
    }
  };


  const handleCloseSuccessModal = () => {
    setShowModalSuccess(false);
    navigate("/applications"); // Navigate after closing the modal
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
            <h4 className={classes.wlcm}>Amnesty Application</h4>
            <Form>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="pagenumber">
                    <Form.Label className={classes.labelTxt}>
                      Survey Plan Number
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className={classes.optioncss}
                      placeholder="Enter Survey Plan Number"
                      value={surveyPlanNumber}
                      onChange={(e) => setSurveyPlanNumber(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="voulumenumber">
                    <Form.Label className={classes.labelTxt}>
                      Acquisition Type
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className={classes.optioncss}
                      placeholder="Enter Acquisition Type"
                      value={acquisitionType}
                      onChange={(e) => setAcquisitionType(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
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
                <Col md={6}>
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
                <Col md={6}>
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
                <Col md={6}>
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
                <Col md={6}>
                  <Form.Group controlId="developmentStatus">
                    <Form.Label className={classes.labelTxt}>
                      Property Occupier
                    </Form.Label>
                    <Form.Select className={classes.optioncss}>
                      <option value="">Select property occupier</option>
                      <option value="owner">Owner</option>
                      <option value="tenanted">Tenanted</option>
                      <option value="owner and tenant">Owner and Tenant</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
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
                <Col md={6}>
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
                    <p style={{ fontSize: 12, color: "red" }}>{imgError}</p>
                    {/* <Form.Control className={classes.optioncss} type="file" accept=".pdf" onChange={handleFileChange} /> */}
                  </Form.Group>
                </Col>
                <Col md={6}>
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
                        {title.length > 30 ? title.slice(0, 30) + "..." : title}
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
                    <p style={{ fontSize: 12, color: "red" }}>{imgError}</p>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
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
                    <p style={{ fontSize: 12, color: "red" }}>{imgError}</p>
                  </Form.Group>
                </Col>
                <Col md={6}>
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
                    <p style={{ fontSize: 12, color: "red" }}>{imgError}</p>
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
            <Modal show={showModalSuccess} onHide={handleCloseSuccessModal}>
              <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
              </Modal.Header>
              <Modal.Body className={classes.modalbodynew}>
                <img
                  src={verified}
                  alt="Verify"
                  className={classes.picverfied}
                />
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
            <Modal
              show={showModalError}
              onHide={() => setShowModalError(false)}
            >
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

export default Amnesty;
