import React, { useState, useEffect, useContext } from "react";
// import logo from '../../Asset/dashboardlogo.png'
import bell from "../../Asset/Bell.png";
import ProfileIcon from "../../Asset/Profile Icon.png";
import LogoutIcon from "../../Asset/logout.png";
import { BiSolidMessageRoundedError } from "react-icons/bi";
import arrowwn from "../../Asset/arrow-down.png";
// import avatar from '../../Asset/avatar.png'
// import dshbrd from '../../Asset/graph.png'
// import reg from '../../Asset/receipt-2.png'
// import bdata from '../../Asset/receipt-text.png'
// import elibry from '../../Asset/book.png'
import classes from "./horheader.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Button, Dropdown } from "react-bootstrap";
import localforage from 'localforage';
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { FaRegBell } from "react-icons/fa6";
import { BASE_URL } from "../../API/Api";
import axios from "axios";
import Notification from "../Notification/Notification";
import logo1 from '../../Asset/olarmslg (1).png';
import Modal from 'react-bootstrap/Modal';
import { useTheme } from "../../ThemeContext";

// import { Dropdown, DropdownButton } from "react-bootstrap";
// import { AuthContext } from '../../pages/utils/authContext';
// import { AuthContext } from '../../Pages/utils/authContext';
// import Dropdown from '../Select/Select';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Horheader() {
  const navigate = useNavigate();
  const [bearer, setBearer] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [name, setName] = useState("");
  const [userData, setUserData] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { isDarkMode } = useTheme();
  // const { logOut } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [customerImages, setCustomerImages] = useState("");
  const [personal, setPersonal] = useState({});
  const [openNotification, setOpenNotification] = useState(false);
  const [customerPicture, setCustomerPicture] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleToHome = () => navigate("/");
  const handleToLogin = () => navigate("/login");
  const handleShow = () => setShow(true);

  const readData = async () => {
    try {
      const detail = await localforage.getItem("userName");
      const details = await localforage.getItem("userToken");
      const detailss = await localforage.getItem("userData");
      const customerImageData = await localforage.getItem("customerImage");
      const customerPicture = await localforage.getItem("customerPicture");
      const firstName = await localforage.getItem("firstName");
      const lastName = await localforage.getItem("secondName");

      console.log(detail, "UserName")

      if (detail !== null) {
        // const firstName = detail.split(' ')[0];
        setName(detail);
      }
      if (firstName !== null) {
        setFirstName(firstName);
      }
      if (lastName !== null) {
        setLastName(lastName);
      }
      if (customerImageData !== null) {
        // console.log('This code runs')
        setCustomerImages(customerImageData || null);
        console.log(customerImageData);
      }

      if (details !== null) {
        setBearer(details);
      }
      if (customerPicture !== null) {
        setCustomerPicture(customerPicture);
      }

      if (detailss !== null) {
        setUserData(detailss);
      }
    } catch (e) {
      alert("Failed to fetch the input from storage");
    }
  };

  useEffect(() => {
    readData();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/customer/support-notifications`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearer}`,
          },
        }
      );

      const notif = response.data.data;
      // Filter unread messages
      const unreadMessages = response.data.data.filter(
        (msg) => !msg.read
      ).length;

      // Update the unread count state
      setUnreadCount(unreadMessages);
      setNotifications(notif);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    if (!bearer) return;

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Fetch every 30s

    return () => clearInterval(interval); // Cleanup on unmount
  }, [bearer]);

  const getRandomColor = () => {
    const colors = ["#ff4d4f", "#21B55A", "#007bff", "#f1c40f"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const markAsRead = async (uuid) => {
    try {
      await axios.post(`${BASE_URL}/update-read-status?uuid=${uuid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearer}`,
        },
      });

      // Remove the marked notification
      setNotifications((prev) => prev.filter((notif) => notif.uuid !== uuid));

      // Reload notifications
      fetchNotifications();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleNotificationClick = async (notif) => {
    try {
      // Mark as read
      await markAsRead(notif.uuid);

      // Navigate if the message contains "support ticket"
      if (notif.admin_message.toLowerCase().includes("support ticket")) {
        navigate("/support_tickets");
      }
    } catch (error) {
      console.error("Error handling notification click:", error);
    }
  };

  const toSentenceCase = (name) => {
    if (!name) return "";

    // Check if the name is already in sentence case
    const isSentenceCase = name
      .split(" ")
      .every(
        (word) =>
          word.charAt(0) === word.charAt(0).toUpperCase() &&
          word.slice(1) === word.slice(1).toLowerCase()
      );

    if (isSentenceCase) {
      return name;
    }

    // Convert to sentence case
    return name
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const dropdownOption = {
    label: "Logout",
    // onClick: logOut
  };

  // useEffect(() => {
  //     const readData = async () => {
  //         try {
  //             const value = await AsyncStorage.getItem('tokens');
  //             if (value !== null && value !== bearer) {
  //                 setBearer(value);
  //             }
  //         } catch (e) {
  //             alert('Failed to fetch the token from storage');
  //         }
  //     };
  //     readData();
  // }, [bearer]);

  // useEffect(() => {
  //     if (bearer) {
  //         const fetchJobDetails = async () => {
  //             setErrorMessage('');
  //             try {
  //                 const response = await axios.get('https://hr-api.emas.ng/api/employees/update/personal-details', {
  //                     headers: {
  //                         Authorization: `Bearer ${bearer}`,
  //                     },
  //                 });
  //                 setPersonal(response.data.data || []);
  //                 console.log(response.data);
  //             } catch (error) {
  //                 console.error('Error fetching job details:', error);
  //                 setErrorMessage('Failed to fetch job details');
  //             }
  //         };
  //         fetchJobDetails();
  //     }
  // }, [bearer]);

  // console.log(customerImage)



  return (
    <div



    //  className={classes.firstDav}
    >
      <Modal show={show} onHide={handleClose} size="m">
        {/* <Modal.Header closeButton> 
        <Modal.Title>Confirm Logout</Modal.Title>
      </Modal.Header > */}
        <Modal.Body>
          <div className={classes.logoutCont}>
            <div className={classes.logggg}>

              <img src={LogoutIcon} alt="logout" className={classes.logoutIcon} />
            </div>
            <h1> Logout Confirmation</h1>
            <p> Are you sure you want to log out? You will need to log in again to access your account.</p>
          </div>
        </Modal.Body>
        <div className={classes.btmBtnnn}>
          <Button className={classes.btncancel} variant="secondary" onClick={handleToLogin}>
            Cancel
          </Button>
          <Button className={classes.btnproceed} variant="danger" onClick={handleToHome}>
            Proceed
          </Button>
        </div>
      </Modal>

      <div style={{ zIndex: 1000 }}>
        {openNotification && (
          <Notification
            setOpenNotification={setOpenNotification}
            openNotification={openNotification}
          />
        )}
      </div>
      <div>
        <div style={{ backgroundColor: isDarkMode ? "black" : "#fff", }} className={classes.horinfodashbrd}>
          <div className={classes.stinfo}>
            {/* <p className={classes.stinfosts}>Welcome</p> */}
            {/* <p className={classes.stinfolvl}>{personal.first_name} {personal.last_name}</p> */}
          </div>

          <div className={classes.usrcnr}>
            <div className={isDarkMode ? classes.iconContainer12 : classes.iconContainer1}>
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="div"
                  style={{ position: "relative", cursor: "pointer" }}
                  bsPrefix="custom-toggle"
                  onClick={() => setOpenNotification(true)}
                >
                  <FaRegBell className="icons1" style={{ fontSize: "20px" }} />
                  {unreadCount > 0 && (
                    <Badge
                      bg="danger"
                      style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-5px",
                        fontSize: "12px",
                        borderRadius: "50%",
                        padding: "5px 8px",
                      }}
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </Dropdown.Toggle>
              </Dropdown>
            </div>
            <Dropdown style={{ display: "flex", justifyContent: "flex-end" }}>
              <Dropdown.Toggle className={isDarkMode ? classes.usrinfos : classes.usrinfo}>
                <img
                  src={customerImages || customerPicture || ProfileIcon}
                  alt="profile-picture"
                  className={classes.bel}
                  onError={(e) => (e.target.src = ProfileIcon)}
                />
                <span
                  style={{
                    fontSize: 14,
                    color: isDarkMode ? "white" : "#333333",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: 150,
                    fontWeight: 600,
                    marginLeft: 10,
                  }}
                >
                  {!name ? toSentenceCase(name) : `${toSentenceCase(firstName)} ${toSentenceCase(lastName)}`}
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>

                {/* <Dropdown.Item as={Link} to="/my_account" style={{fontSize:17,fontWeight:'500'}}>My Account</Dropdown.Item> */}
                {/* <Dropdown.Item as={Link} to="/settings" style={{fontSize:17,fontWeight:'500'}}>Settings</Dropdown.Item> */}
                {/* <Dropdown.Item as={Link} to="/contact" style={{ fontSize: 17, fontWeight: '500' }}>
                  Contact Us
                </Dropdown.Item> */}
                <Dropdown.Item style={{ fontSize: 17, fontWeight: '500' }} onClick={handleShow}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
}
