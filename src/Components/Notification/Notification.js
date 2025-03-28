import React, { useState, useEffect } from "react";
import classes from "./Notification.module.css";
import { FaAccessibleIcon, XCircle, FileText } from "react-icons/fa";
import paySuccess from "../../Asset/paymentSuccess.svg";
import clock from "../../Asset/clock.svg";
import goto from "../../Asset/goto.svg";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidMessageRoundedError } from "react-icons/bi";
import { BASE_URL } from "../../API/Api";
import axios from "axios"
import notify from "../../Asset/notify.svg";
import SkeletonLoader from "./SkeletonLoader";
import { Placeholder } from "react-bootstrap";

const Notification = ({setOpenNotification,openNotification}) => {
  const navigate = useNavigate();
  const [bearer, setBearer] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [name, setName] = useState("");
  const [userData, setUserData] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [isLoading,setIsLoading] = useState(false)
  // const { logOut } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [customerImages, setCustomerImages] = useState("");
  const [personal, setPersonal] = useState({});

  const readData = async () => {
    try {
      const detail = await localStorage.getItem("userName");
      const details = await localStorage.getItem("userToken");
      const detailss = await localStorage.getItem("userData");
      const customerImageData = await localStorage.getItem("customerImage");
      console.log(customerImageData);

      if (detail !== null) {
        // const firstName = detail.split(' ')[0];
        setName(detail);
      }

      if (customerImageData !== null) {
        // console.log('This code runs')
        setCustomerImages(customerImageData || null);
        console.log(customerImageData);
      }

      if (details !== null) {
        setBearer(details);
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
        setIsLoading(true);
      const response = await axios.get(
        `${BASE_URL}/fetch_app_notifications`,
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
    finally{
        setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!bearer) return;

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Fetch every 30s

    return () => clearInterval(interval); // Cleanup on unmount
  }, [bearer]);

  const markAsRead = async (id) => {
    try {
      await axios.get(`${BASE_URL}/update_read_status?id=${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearer}`,
        },
      });

      // Remove the marked notification
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
      // Reload notifications
      fetchNotifications();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleNotificationClick = async (notif) => {
    try {
      // Mark as read
      await markAsRead(notif.id);
  
      // Navigate if the message contains "support ticket"
      if (notif.customer_message.toLowerCase().includes("support ticket")) {
        navigate("/support_tickets");
      }
    } catch (error) {
      console.error("Error handling notification click:", error);
    }
  };

  return (
    <div className={classes.backdrop} onClick={() => setOpenNotification(false)}>
      <div className={classes.panel} onClick={(e) => e.stopPropagation()}>
        <div className={classes.header}>
          <h3>Notification</h3>
          <button onClick={() => setOpenNotification(false)} className={classes.closeButton}>
            ✖
          </button>
        </div>
        <div className={classes.list}>
          {/* Notification Items */}
          {
            isLoading ? 
            <>
                <Placeholder xs={6} />
                <Placeholder xs={6} />
                <Placeholder xs={6} />
                <Placeholder xs={6} />
                <Placeholder className="w-75" /> <Placeholder style={{ width: '25%' }} />
                <Placeholder className="w-75" /> <Placeholder style={{ width: '25%' }} />
                <Placeholder className="w-75" /> <Placeholder style={{ width: '25%' }} />
                <Placeholder className="w-75" /> <Placeholder style={{ width: '25%' }} />
                </>
            : (
                notifications.length === 0 ? (
                  <div className={classes.notifyDiv}>
                      <img src={notify} alt="notification icon" className={classes.nty}/>
                      <h4 className={classes.ntyHead}>No notification yet</h4>
                      <p className={classes.ntyPrg}>You'll receive updates here about all your activities on the app</p>
                      </div>
                ) : (
                    notifications.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleNotificationClick(item)}
                      // onClick={() => console.log('hello')}
                        className={`${classes.notification} ${classes[item.type]}`}
                      >
                        <img src={paySuccess} alt="success-icon" />
                        <div className={classes.text}>
                          <p
                            style={{
                              fontWeight: item.read_status === "0" ? "normal" : "bold",
                            }}
                          >
                            {item.message}
                          </p>
                          <span className={classes.time}>
                            <img src={clock} alt="clock" />{" "}
                            {new Date(item.created_at).toLocaleString()}
                          </span>
                        </div>
                        <img src={goto} alt="goto" className={classes.goto} />
                      </div>
                    )))
            )
          }
          
        </div>
      </div>
    </div>
  );
};

export default Notification;
