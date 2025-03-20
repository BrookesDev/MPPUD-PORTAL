import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import classes from './Navigation.module.css';
import logo from '../../Asset/dashboardlogo.png';
import LogoWhite from '../../Asset/olarrrr-white.png';
import logo1 from '../../Asset/olarmslg (1).png';
import dshbrd from '../../Asset/category-2.png';
import dshbrdActive from '../../Asset/dashoard-icon.png';
import app from '../../Asset/folder-open.png';
import appActive from '../../Asset/folder-open-active.png';
import Invoices from '../../Asset/calendar.png';
import InvoicesActive from '../../Asset/calendar-active.png';
import wallet from '../../Asset/wallet.png';
import walletActive from '../../Asset/wallet-active.png';
import agentActive from '../../Asset/agent.svg';
import tickets from '../../Asset/tickets.png';
import ticketsActive from '../../Asset/tickets-active.png';
import Message from '../../Asset/message.png';
import MessageActive from '../../Asset/message-active.png';
import support from '../../Asset/message-question.png';
import supportActive from '../../Asset/message-active.png';
import setting from '../../Asset/setting-2.png';
import settingActive from '../../Asset/setting-2-active.png';
import login from '../../Asset/logout.png';
import reportActive from '../../Asset/report-active.png';
import reportInActive from '../../Asset/report-inactive.png';
import loginActive from '../../Asset/logout-active.png';
import report from '../../Asset/warning-2.png'
import { Modal, Button } from 'react-bootstrap';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import localforage from 'localforage';
import { BASE_URL } from '../../API/Api';
import axios from 'axios';
import { useTheme } from '../../ThemeContext';

export default function DashboardNav({ show, handleClose }) {
    const [activeItem, setActiveItem] = useState('');
    const [hoveredItem, setHoveredItem] = useState(''); // Hover state
    const location = useLocation();
  const [bearer, setBearer] = useState('');
  const navigate = useNavigate();
    const { isDarkMode } = useTheme();
  
  const [userData, setUserData] = useState("");
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const readData = async () => {
        try {
            const detail = await localforage.getItem('userName');
            const details = await localforage.getItem('userToken');
             const detailx = await localforage.getItem("userType");
      
    
            if (detail !== null) {
                // const firstName = detail.split(' ')[0];
                setName(detail);
    
            }
    
            if (detailx !== null) {
                setUserData(detailx);
              }
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
    

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const handleCloseModal = () => {
        setShowLogoutModal(false);
    };

    const handleConfirmLogout = () => {
        // Add your logout logic here
        console.log('User logged out');
        setShowLogoutModal(false);
    };


    useEffect(() => {
        const pathname = location.pathname;
        const pathToItem = {
            '/dashboard': 'Dashboard',
            // ...(userData === "corporate" ? {"/user_management": "User Management"} : {}),
            '/applications': 'Applications',
            // '/invoices': 'Invoices',
            '/payments': 'Payments',
            '/support_tickets': 'Support',
            '/contact': 'Contacts',
            '/settings': 'Settings',
            '/faqs': 'FAQs',
            '/my_account': 'Account',
           
        };


        const active = Object.keys(pathToItem).find(key => pathname.startsWith(key));
        if (active) {
            setActiveItem(pathToItem[active]);
        }
    }, [location,userData]);

    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
    };

    const handleMouseEnter = (itemName) => {
        // console.log(itemName)
        setHoveredItem(itemName); 
        
        // Set the hovered item to trigger icon change
    };

    const handleMouseLeave = () => {
        setHoveredItem(''); // Reset hover state when not hovering
    };

    const getIcon = (itemName, defaultIcon, activeIcon) => {
        if (activeItem === itemName) {
            return hoveredItem === itemName ? defaultIcon : activeIcon; // Show default icon on hover, otherwise active icon
        }
        return defaultIcon; // Default icon for non-active items
    };


    // const navItems = [
    //     { to: '/dashboard', name: 'Dashboard', icon: [dshbrd, dshbrdActive] },
    //     ...(userData === "corporate" ? [{ to: "/user_management", name: "User Management", icon: [agentActive, agentActive] }] : []),
    //     { to: '/applications', name: 'Applications', icon: [app, appActive] },
    //     { to: '/invoices', name: 'Invoices', icon: [Invoices, InvoicesActive] },
    //     { to: '/payments', name: 'Payments', icon: [wallet, walletActive] },
    //     { to: '/support_tickets', name: 'Support Tickets', icon: [reportInActive, reportActive] },
    //     { to: '/contact', name: 'Contacts', icon: [support, supportActive] },
    //     { to: '/settings', name: 'Settings', icon: [setting, settingActive] },
    //     { to: '/login', name: 'Logout', icon: [login, loginActive] }
    // ];
    const navItems = [
        { to: '/dashboard', name: 'Dashboard', icon: [dshbrd, dshbrdActive] },
        { to: '/my_account', name: 'Account', icon: [Invoices, InvoicesActive] },
        { to: '/settings', name: 'Settings', icon: [setting, settingActive] },
        // { to: '/invoices', name: 'Invoices', icon: [Invoices, InvoicesActive] },
        { to: '/applications', name: 'Applications', icon: [app, appActive] },
        { to: '/faqs', name: 'FAQs', icon: [wallet, walletActive] },
        { to: '/support_tickets', name: 'Support', icon: [reportInActive, reportActive] },
        // { to: '/contact', name: 'Contacts', icon: [support, supportActive] },
       
        // { to: '/login', name: 'Logout', icon: [login, loginActive] }
    ];


    const handleLogout = async () => {
        setLoading(true);


        try {
            const response = await axios.post(
                `${BASE_URL}/logout`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${bearer}`
                    }
                }
            );

            navigate('/');
            //   toast.success(response.data.message);
        } catch (error) {
            let errorMessage = 'An error occurred. Please try again.';
            if (error.response) {
                if (error.response.status === 401) {
                    // navigate('/login');
                } else if (error.response.data && error.response.data.message) {
                    if (typeof error.response.data.message === 'string') {
                        errorMessage = error.response.data.message;
                    } else if (Array.isArray(error.response.data.message)) {
                        errorMessage = error.response.data.message.join('; ');
                    } else if (typeof error.response.data.message === 'object') {
                        errorMessage = JSON.stringify(error.response.data.message);
                    }
                }
            }
            //   toast.error(errorMessage);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

 
    



    return (
        <div

        >
            <div style={{backgroundColor: isDarkMode ? "black" : "#fff",}} className={classes.navbrd}>
                <div className={classes.navdshbrd}>
                    <div className={classes.logodiv}>
                        {/* <img src={logo} className={classes.logo} /> */}
                        <img src={isDarkMode ? LogoWhite : logo1} className={classes.logo} />
                        {/* <p style={{fontSize: 8, color: "#00000", fontWeight: 600}}>YOUR ONE-STOP SHOP FOR LAND ADMINISTRATION IN OGUN STATE</p> */}
                    </div>
                    {/* <hr style={{ borderTop: "2px dashed #21B55A", width: "100%" }} /> */}
                    <div className={classes.gnrlcls}>
                        {navItems.map(({ to, name, icon }) => {
                           
                         return(
                            <Link
                                key={name}
                                to={to}
                                className={`${classes.thetxt} ${isDarkMode? classes.sidebaritems : classes.sidebaritem} ${activeItem === name ? classes.active : ''}`}
                                onClick={() => {
                                    handleItemClick(name);
                                    if (name === 'Logout') handleLogoutClick();
                                }}
                                onMouseEnter={() => handleMouseEnter(name)}
                                
                                onMouseLeave={handleMouseLeave}
                                // style={{
                                //     marginBottom: name === "Support Tickets" ? "70px" : "0",
                                //     borderBottom: name === "Support Tickets" ? "1px solid #F5F5F5" : "none",
                                    

                                // }}
                            >
                                <img
                                    src={getIcon(name, icon[0], icon[1])}
                                    className={classes.icondshbrd}
                                    alt={name}
                                />
                                <p className={classes.dshbrdtxt}>{name}</p>
                            </Link>
                         )
                        })}
                    </div>
                </div>
            </div>

            <Modal show={showLogoutModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="text-center">
                    <img src="/path/to/your/image.png" alt="Logout Confirmation" className={classes.modalImage} />
                    <h5 className={classes.modalTitle}>Logout Confirmation</h5>
                    <p className={classes.modalSubText}>
                        Are you sure you want to logout? You will be required to log in again to access the platform.
                    </p>
                    <div className={classes.modalButtons}>
                        <Button variant="secondary" className={classes.modBtn} onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button variant="danger" className={classes.modBtn1} onClick={handleConfirmLogout}>
                            Logout
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            <Offcanvas show={show} onHide={handleClose} className="d-md-none" >
                <Offcanvas.Header closeButton className={classes.imgSpaadfce}>
                    <Offcanvas.Title><div className={classes.logodiv}>
                        <img src={logo} className={classes.logo} />
                       
                    </div></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className={classes.gnrlcls1}>
                        {navItems.map(({ to, name, icon }) => (
                            <Link
                                key={name}
                                to={to}
                                className={`${classes.thetxt} ${classes.sidebaritem} ${activeItem === name ? classes.active : ''}`}
                                onClick={() => {
                                    handleItemClick(name);
                                    if (name === 'Logout') handleLogout();
                                }}
                                onMouseEnter={() => handleMouseEnter(name)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <img
                                    src={getIcon(name, icon[0], icon[1])}
                                    className={classes.icondshbrd}
                                    alt={name}
                                />
                                <p className={classes.dshbrdtxtt}>{name}</p>
                            </Link>
                        ))}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}